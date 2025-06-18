// Assurez-vous que ce fichier est situé dans client/src/lib/ (ou un dossier similaire)

import { QueryClient, QueryFunction } from "@tanstack/react-query";

// --- NOUVELLE LIGNE : Définition de l'URL de base de l'API ---
// Ceci prendra la variable d'environnement VITE_API_URL si elle est définie (sur Netlify)
// Ou utilisera 'http://localhost:5001' pour le développement local.
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
// -------------------------------------------------------------

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string, // Cette 'url' sera maintenant un chemin relatif (par exemple '/api/users')
  data?: unknown | undefined,
): Promise<Response> {
  // --- MODIFICATION ICI : Préfixe l'URL avec API_BASE_URL ---
  const fullUrl = `${API_BASE_URL}${url}`;
  // ----------------------------------------------------------
  const res = await fetch(fullUrl, { // Utilise fullUrl
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    // queryKey[0] est l'URL. On s'attend à ce que ce soit un chemin relatif (ex: '/api/items')
    const relativeUrl = queryKey[0] as string;
    // --- MODIFICATION ICI : Préfixe l'URL avec API_BASE_URL ---
    const fullUrl = `${API_BASE_URL}${relativeUrl}`;
    // ----------------------------------------------------------

    const res = await fetch(fullUrl, { // Utilise fullUrl
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});