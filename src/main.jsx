import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { seedDatabase } from './firebase/seedData.js';

// Seed Firestore with initial data (safe to call multiple times — skips if data exists)
seedDatabase().catch(console.error);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
