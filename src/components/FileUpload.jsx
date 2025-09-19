// src/components/FileUpload.jsx
import { useDropzone } from 'react-dropzone';
import { useFileStore } from '../store';

const MAX_FILES = 3;
const MAX_SIZE_MB = 20;

export default function FileUpload() {
  
  const addFiles = useFileStore(state => state.addFiles);
  const fileCount = useFileStore(state => state.files.length);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: addFiles,
    maxFiles: MAX_FILES - fileCount,
    maxSize: MAX_SIZE_MB * 1024 * 1024,
    disabled: fileCount >= MAX_FILES,
    accept: {
      'application/step': ['.step', '.stp'],
      'model/iges': ['.igs', '.iges'],
      'model/stl': ['.stl'],
      'application/octet-stream': ['.fbx'],
      'model/obj': ['.obj'],
    }
  });

  return (
    <div 
      {...getRootProps()} 
      className={`border-2 border-dashed border-border-light rounded-xl p-8 sm:p-12 w-full max-w-2xl bg-primary/5 text-center cursor-pointer transition-colors
        ${isDragActive ? 'border-primary' : ''}
        ${fileCount >= MAX_FILES ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-4">
        <svg className="text-primary" fill="currentColor" height="64" viewBox="0 0 256 256" width="64" xmlns="http://www.w3.org/2000/svg"><path d="M240,136v64a16,16,0,0,1-16,16H32a16,16,0,0,1-16-16V136a16,16,0,0,1,16-16H80a8,8,0,0,1,0,16H32v64H224V136H176a8,8,0,0,1,0-16h48A16,16,0,0,1,240,136ZM85.66,77.66,120,43.31V128a8,8,0,0,0,16,0V43.31l34.34,34.35a8,8,0,0,0,11.32-11.32l-48-48a8,8,0,0,0-11.32,0l-48,48A8,8,0,0,0,85.66,77.66Z"></path></svg>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight">Convert Your Files Effortlessly</h1>
        {fileCount < MAX_FILES ? (
          <p className="max-w-xl text-subtle-light">
            Drag & drop up to {MAX_FILES - fileCount} more file(s) here, or click to select files.
            <br />
            <span className="text-sm">(Max 20MB per file)</span>
          </p>
        ) : (
          <p className="max-w-xl text-primary font-bold">You've reached the 3-file limit.</p>
        )}

        <div className="mt-4 text-xs text-subtle-light/80">
          <p>
            <span className="font-bold">Supported formats:</span> .STP, .STEP, .IGS, .IGES, .FBX, .STL and .OBJ
          </p>
        </div>
      </div>
    </div>
  );
}