import express, { type Request, Response, NextFunction } from "express";
import fs from 'fs';
import path from 'path';
import { registerRoutes } from "./routes";
// Importez `log` depuis './vite' si vous en avez besoin pour les logs,
// mais `setupVite` et `serveStatic` ne sont plus nécessaires ici pour le backend déployé.
// Si log est la seule chose que vous utilisez de vite.ts, vous pouvez isoler son import.
import { log } from "./vite"; // Gardons log, mais retirons setupVite et serveStatic

// --- AJOUTEZ CES DEUX LIGNES POUR CORS ---
import cors from 'cors';
// ----------------------------------------

// Import de __dirname pour la compatibilité ESM si nécessaire pour d'autres usages
// Bien que pour ce fichier, il ne semble pas y avoir de path.join avec __dirname pour servir des statics.
// Si vous utilisez __dirname ailleurs dans ce fichier, ajoutez ces imports:
/*
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
*/

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// --- CONFIGURATION CORS AJOUTÉE ICI ---
// L'URL de votre frontend déployé sur Netlify (remplacez par la vraie URL !)
const NETLIFY_FRONTEND_URL = process.env.NETLIFY_FRONTEND_URL || 'http://localhost:5173';

app.use(cors({
  origin: NETLIFY_FRONTEND_URL, // Autorise uniquement votre frontend Netlify et localhost
  credentials: true, // Important si votre backend utilise des sessions ou cookies
}));
// ------------------------------------

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // --- PARTIE MODIFIÉE : Ne plus servir le frontend depuis le backend ---
  // if (app.get("env") === "development") {
  //   await setupVite(app, server);
  // } else {
  //   serveStatic(app);
  // }
  // -------------------------------------------------------------------

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  // MODIFIED: Changed port to 5001 and removed reusePort
  const port = 5001; // Changé le port à 5001
  server.listen({
    port,
    host: "0.0.0.0",
    // reusePort: true, // Supprimé cette ligne, car elle est souvent incompatible hors de Replit ou d'un environnement de cluster.
  }, () => {
    log(`serving on port ${port}`);
  });
})();