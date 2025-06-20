// client/src/pages/RapportAdapte.tsx

import React from 'react';
import { Download, FileText, Share2, Award, PiggyBank, Users } from "lucide-react"; // Icônes pertinentes
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface RapportAdapteProps {
  navigate?: (page: string) => void;
}

// Le composant est directement défini ici
const RapportAdapte: React.FC<RapportAdapteProps> = ({ navigate }) => { // CORRECTION: J'ai laissé cette ligne telle quelle mais j'ai enlevé l'export en double plus bas
  // Le chemin du fichier doit être relatif au dossier 'public' à la racine de votre projet.
  // Assurez-vous que votre fichier de rapport est bien placé dans 'public/fichiers/'
  const rapportFilePath = "/fichiers/MODELE_RAPPORT_PARTENAIRES_EDP.pptx"; // Ou .docx, .pdf

  return (
    <section id="rapport-adapte" className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="flex items-center gap-3 mb-6 text-3xl font-bold text-gray-800">
        <Share2 className="w-8 h-8 text-indigo-600" /> {/* Icône de partage */}
        Modèle de Rapport Adapté aux Partenaires
      </h1>
      
      <p className="mb-8 text-lg text-gray-700 leading-relaxed">
        La communication transparente et régulière est fondamentale pour entretenir la confiance avec vos partenaires (entreprises, collectivités, financeurs, familles). Ce modèle de rapport est conçu pour vous aider à présenter de manière claire et complète les activités, les réalisations et les impacts de votre École de Production.
      </p>

      {/* Section Pourquoi un rapport adapté ? */}
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-gray-700 flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-500" />
            L'Importance d'un Rapport Complet
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-gray-700 space-y-4">
          <p>
            Un rapport d'activité bien structuré et adapté aux besoins de vos partenaires vous permet de :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>**Démontrer la valeur ajoutée :** Mettre en lumière les succès pédagogiques et l'insertion professionnelle des jeunes.</li>
            <li>**Rassurer les financeurs :** Présenter une gestion saine et l'atteinte des objectifs grâce à vos <span
                className="text-blue-600 hover:underline cursor-pointer font-medium"
                onClick={() => navigate && navigate('suivi-prets')}
              >
                suivis financiers
              </span> et <span
                className="text-blue-600 hover:underline cursor-pointer font-medium"
                onClick={() => navigate && navigate('suivi-subventions')}
              >
                de subventions
              >
              </span>.
            </li>
            <li>**Renforcer les partenariats :** Maintenir un lien fort avec les entreprises et les collectivités.</li>
            <li>**Faciliter les renouvellements :** Créer un historique prouvant l'efficacité de vos actions.</li>
            <li>**Valoriser votre équipe :** Mettre en avant le travail et l'engagement de tous les acteurs de l'école.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Section Contenu Recommandé du Rapport */}
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-gray-700 flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-600" />
            Sections Clés du Rapport
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-gray-700 space-y-4">
          <p>
            Notre modèle de rapport est conçu pour inclure les sections suivantes, essentielles pour une École de Production :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>**Synthèse Exécutive :** Un résumé des faits marquants et des réalisations clés.</li>
            <li>**Activités Pédagogiques :** Nombre d'élèves, programmes suivis, succès aux examens, projets spécifiques.</li>
            <li>**Activités de Production :** Types de commandes réalisées, chiffre d'affaires généré, compétences développées en atelier.</li>
            <li>**Impact Social et Local :** Taux d'insertion professionnelle, partenariats locaux, bénéfices pour le territoire.</li>
            <li>**Gouvernance et Organisation :** Composition de l'équipe, de l'<span
                className="text-blue-600 hover:underline cursor-pointer font-medium"
                onClick={() => navigate && navigate('organigramme')}
              >
                organigramme
              </span>.
            </li>
            <li>**Informations financières :** Utilisation des fonds, budget prévisionnel vs. réalisé, perspectives.</li>
            <li>**Perspectives :** Projets futurs, objectifs pour l'année à venir.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Section Téléchargement du modèle */}
      <Card className="mb-8 shadow-lg border-2 border-blue-500">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-blue-700 flex items-center gap-3">
            <Download className="w-6 h-6" /> Télécharger le Modèle de Rapport
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="text-base text-gray-800 flex-1">
            <p className="mb-2">
              Obtenez un modèle de rapport d'activité complet, prêt à être personnalisé avec les données de votre École de Production. Ce support vous fera gagner un temps précieux.
            </p>
            <p className="text-sm text-gray-600">
              **Conseil :** Adaptez le niveau de détail et le langage aux attentes spécifiques de chaque type de partenaire.
            </p>
          </div>
          <a
            href={rapportFilePath}
            download="MODELE_RAPPORT_PARTENAIRES_ECOLE_PRODUCTION.pptx" // Nom du fichier suggéré
            className="flex-shrink-0"
          >
            <Button className="btn-primary flex items-center gap-2 py-3 px-6 text-lg">
              <Download className="w-5 h-5" /> Télécharger le modèle
            </Button>
          </a>
        </CardContent>
      </Card>

      {/* Bouton de retour à l'accueil */}
      {navigate && (
        <div className="text-center mt-8">
          <Button
            onClick={() => navigate('accueil')}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-lg"
          >
            Retour à l'accueil
          </Button>
        </div>
      )}
    </section>
  );
};

export default RapportAdapte; // CORRECTION: C'est le seul export par défaut qui doit exister