import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// --- AJOUTEZ CES DEUX LIGNES EN HAUT ---
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// ------------------------------------

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({ jsxRuntime: "automatic" })],
  // Définir la racine de l'application Vite comme étant le dossier 'client'
  root: path.resolve(__dirname, 'client'),

  build: {
    // Le dossier de sortie 'dist' sera à la racine du projet EDP180625
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true, // Vider 'dist' avant chaque build
    rollupOptions: {
      // Chemin d'entrée vers votre fichier HTML principal du frontend
      input: path.resolve(__dirname, 'client/index.html'),
    },
  },
  // Spécifier le dossier public (pour les assets statiques comme vite.svg, logo.webp, etc.)
  publicDir: path.resolve(__dirname, 'client/public'),

  resolve: {
    alias: {
      // Configurer les alias pour vos dossiers
      "@": path.resolve(__dirname, "client/src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
});