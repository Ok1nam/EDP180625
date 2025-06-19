// client/src/pages/CriteresLabel.tsx

import React from 'react';

// Si la page a besoin de la fonction navigate, ajoutez-la aux props
interface CriteresLabelProps {
  navigate?: (page: string) => void; // Optionnel si la page n'a pas besoin de naviguer elle-même
}

export default function CriteresLabel({ navigate }: CriteresLabelProps) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Critères pour obtenir le label</h1>
      <p className="text-gray-700 leading-relaxed">
        Contenu détaillé des critères à remplir pour l'obtention du label d'école de production.
        Ici, vous ajouterez toutes les informations, listes, tableaux, etc.
      </p>
      {/* Exemple de bouton pour naviguer si besoin, en utilisant la prop navigate */}
      {navigate && (
        <button
          onClick={() => navigate('accueil')}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Retour à l'accueil
        </button>
      )}
    </div>
  );
}