import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GoogleSheetsService from './services/GoogleSheetsService';
import GoogleDriveService from './services/GoogleDriveService';
import GoogleCalendarService from './services/GoogleCalendarService';

// Load Google APIs
const loadGoogleApis = async () => {
  try {
    // Load the Google API client library
    await new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });

    // Initialize Google API client
    await window.gapi.load('client', async () => {
      try {
        // Initialize all services
        await Promise.all([
          GoogleSheetsService.initialize(),
          GoogleDriveService.initialize(),
          GoogleCalendarService.initialize()
        ]);
        console.log('Google APIs initialized successfully');
      } catch (error) {
        console.error('Error initializing Google APIs:', error);
      }
    });
  } catch (error) {
    console.error('Error loading Google API client library:', error);
  }
};

// Initialize Google APIs
loadGoogleApis();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
