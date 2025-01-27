import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Use type assertion to ensure `document.getElementById('root')` is of type `HTMLElement`
const rootElement = document.getElementById('root') as HTMLElement;

// Create a root and render the app
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);