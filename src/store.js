// src/store.js
import { create } from 'zustand';
import axios from 'axios';
import JSZip from 'jszip';

const API_URL = 'http://localhost:8000';

export const useFileStore = create((set, get) => ({
  files: [],
  isConverting: false,

  addFiles: (acceptedFiles) => {
    const newFiles = acceptedFiles.map(file => Object.assign(file, {
      id: Math.random().toString(36).substring(2, 9),
      status: 'pending',
      progress: 0,
    }));
    set(state => ({
      files: [...state.files, ...newFiles].slice(0, 3)
    }));
  },

  deleteFile: (id) => {
    set(state => ({
      files: state.files.filter(file => file.id !== id)
    }));
  },

  updateFileState: (id, newState) => {
    set(state => ({
      files: state.files.map(file =>
        file.id === id ? Object.assign(file, newState) : file
      )
    }));
  },

  startConversion: async () => {
    set({ isConverting: true });

    const filesToConvert = get().files.filter(f => f.status === 'pending');

    set(state => ({
      files: state.files.map(file =>
        filesToConvert.some(ftc => ftc.id === file.id)
          ? Object.assign(file, { status: 'uploading' })
          : file
      )
    }));

    // Use Promise.all to wait for all uploads to finish
    const uploadPromises = filesToConvert.map(file => {
      const formData = new FormData();
      formData.append('file', file);
      
      return axios.post(`${API_URL}/convert`, formData, {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          get().updateFileState(file.id, { progress });
        },
      }).then(response => {
        get().updateFileState(file.id, { status: 'converting', taskId: response.data.task_id });
        get().pollConversionStatus(file.id, response.data.task_id);
      }).catch(error => {
        console.error('Upload failed for file:', file.name, error);
        get().updateFileState(file.id, { status: 'error', error: 'Upload failed' });
      });
    });
    
    // --- FINAL FIX ---
    // After all uploads are initiated, reset the converting flag.
    await Promise.all(uploadPromises);
    set({ isConverting: false });
  },

  pollConversionStatus: (fileId, taskId) => {
    const interval = setInterval(async () => {
      try {
        const response = await axios.get(`${API_URL}/status/${taskId}`);
        const { state, details } = response.data;

        if (state === 'SUCCESS') {
          clearInterval(interval);
          get().updateFileState(fileId, { status: 'complete', progress: 100, downloadUrl: response.data.download_url });
        } else if (state === 'FAILURE') {
          clearInterval(interval);
          get().updateFileState(fileId, { status: 'error', error: details.error || 'Conversion failed' });
        }
      } catch (error) {
        clearInterval(interval);
        get().updateFileState(fileId, { status: 'error', error: 'Status check failed' });
      }
    }, 3000);
  },
  
  downloadAllAsZip: async () => {
    const zip = new JSZip();
    const completedFiles = get().files.filter(f => f.status === 'complete');
    
    const promises = completedFiles.map((file, index) =>
      axios.get(`${API_URL}${file.downloadUrl}`, { responseType: 'blob' })
        .then(response => {
          const fileName = file.name ? file.name.replace(/\.[^/.]+$/, ".glb") : `file_${index + 1}.glb`;
          zip.file(fileName, response.data);
        })
    );
    
    await Promise.all(promises);
    
    zip.generateAsync({ type: 'blob' }).then(content => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(content);
      link.download = 'converted_files.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  },
}));