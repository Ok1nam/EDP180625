// src/main.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx'; // Assurez-vous que le chemin est correct
import './index.css';

import ReactGA from 'react-ga4';

// Remplace "TON_ID_DE_MESURE_ICI" par l'ID de mesure que tu as obtenu de Google Analytics (ex: G-XXXXXXXXXX)
const GA_MEASUREMENT_ID = "TON_ID_DE_MESURE_ICI";
ReactGA.initialize(GA_MEASUREMENT_ID);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
