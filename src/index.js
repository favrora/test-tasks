import React from 'react';
import { createRoot } from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import expandedFolders from './data/ExpandedFolders.json';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App expandedFolders={expandedFolders} />
  </React.StrictMode>
);

reportWebVitals();
