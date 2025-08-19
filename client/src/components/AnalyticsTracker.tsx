// src/components/AnalyticsTracker.tsx

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

/**
 * AnalyticsTracker est un composant qui utilise React Router's useLocation
 * pour détecter les changements d'URL et envoyer des événements de "pageview"
 * à Google Analytics 4 via react-ga4.
 * Il doit être placé à l'intérieur de BrowserRouter.
 */
const AnalyticsTracker: React.FC = () => {
  const location = useLocation(); // Hook de React Router DOM pour obtenir l'objet location

  useEffect(() => {
    // Vérifie si ReactGA est bien initialisé avant d'envoyer l'événement
    if (ReactGA.is
        && typeof ReactGA.isInitialized === 'function'
        && ReactGA.isInitialized()) {
      // Envoie un événement de type 'pageview' à Google Analytics
      // L'URL de la page est construite à partir de pathname et search (paramètres de requête)
      ReactGA.send({ hitType: 'pageview', page: location.pathname + location.search });
      console.log('Pageview sent:', location.pathname + location.search); // Pour le débogage
    }
  }, [location]); // L'effet se réexécute chaque fois que l'objet location change

  return null; // Ce composant ne rend rien visuellement
};

export default AnalyticsTracker;
