// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Layout from './components/Layout.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import DataPrivacy from './pages/DataPrivacy.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="data-privacy" element={<DataPrivacy />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)