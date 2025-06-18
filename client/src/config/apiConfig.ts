// client/src/config/apiConfig.ts

// Récupère la variable d'environnement VITE_API_URL définie sur Netlify
// Ou utilise 'http://localhost:5001' pour le développement local
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

// Vous pouvez aussi exporter d'autres routes spécifiques si vous voulez les centraliser
// Par exemple, si vous avez une route /api/users et /api/products
export const API_ROUTES = {
  users: `${API_BASE_URL}/api/users`,
  // Ajoutez d'autres routes spécifiques ici
  // exemple: products: `${API_BASE_URL}/api/products`,
  // exemple: login: `${API_BASE_URL}/api/login`,
};