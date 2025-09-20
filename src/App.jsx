// src/App.jsx
import { useFileStore, API_URL } from './store';
import FileUpload from './components/FileUpload';

//const API_URL = 'http://localhost:8000';

const formatBytes = (bytes, decimals = 2) => {
  if (!+bytes) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

const getOutputFilename = (originalName) => {
  if (!originalName) return "converted_file.glb";
  return originalName.replace(/\.[^/.]+$/, ".glb");
};

export default function App() {
  const { files, isConverting, startConversion, deleteFile, downloadAllAsZip } = useFileStore();

  const pendingFilesCount = files.filter(f => f.status === 'pending').length;
  const allDone = files.length > 0 && files.every(f => f.status === 'complete' || f.status === 'error');

  return (
  <div className="w-full max-w-4xl flex flex-col items-center">
    <FileUpload />
    
    {files.length > 0 && (
      <div className="mt-8 w-full max-w-2xl">
        <h3 className="text-xl font-bold mb-4">Uploaded Files</h3>
        {files.map(file => (
          <div key={file.id} className="bg-primary/5 p-4 rounded-lg mb-4 flex items-center gap-4">
            <div className="flex-grow">
              <p className="font-bold">{file.name || 'Unknown File'}</p>
              <p className="text-sm text-subtle-light">{formatBytes(file.size)}</p>
              {(file.status !== 'pending' && file.status !== 'error') && (
                <div className="w-full bg-border-light rounded-full h-2.5 mt-2"><div className="bg-primary h-2.5 rounded-full" style={{ width: `${file.progress}%` }}></div></div>
              )}
              {file.status === 'uploading' && <p className="text-sm text-subtle-light mt-1">Uploading...</p>}
              {file.status === 'converting' && <p className="text-sm text-subtle-light mt-1">Converting...</p>}
              {file.status === 'error' && <p className="text-sm text-red-500 mt-1">{file.error}</p>}
            </div>
            <div className="flex items-center gap-2">
              {file.status === 'pending' && <button onClick={() => deleteFile(file.id)} className="text-gray-500 hover:text-red-500"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg></button>}
              {file.status === 'complete' && <a href={`${API_URL}${file.downloadUrl}`} download={getOutputFilename(file.name)} className="text-primary hover:opacity-80"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg></a>}
            </div>
          </div>
        ))}
        
        <div className="mt-6 flex justify-end">
          {allDone ? (
            <button onClick={downloadAllAsZip} className="bg-green-600 text-white text-base font-bold rounded-lg h-12 px-8 hover:opacity-90">Download All as ZIP</button>
          ) : (
            <button onClick={startConversion} disabled={pendingFilesCount === 0 || isConverting} className="bg-primary text-white text-base font-bold rounded-lg h-12 px-8 hover:opacity-90 disabled:opacity-50">{isConverting ? 'Converting...' : `Convert ${pendingFilesCount} File(s)`}</button>
          )}
        </div>
        </div>
      )}
    </div>
  );
}