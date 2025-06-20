// client/src/pages/Organigramme.tsx

import React from 'react';
import { Network, Users, Download, Lightbulb, Workflow } from "lucide-react"; // Icônes pertinentes
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface OrganigrammeProps { // Correction de l'interface
  navigate?: (page: string) => void;
}

const Organigramme: React.FC<OrganigrammeProps> = ({ navigate }) => { // Correction du nom de la fonction
  // Le chemin du fichier doit être relatif au dossier 'public' à la racine de votre projet.
  // Assurez-vous que votre fichier d'organigramme est bien placé dans 'public/fichiers/'
  const organigrammeFilePath = "/fichiers/ORGANIGRAMME_TYPE_ECOLE_PRODUCTION.pptx"; // Ou .docx, .pdf, .vsd etc.

  return (
    <section id="organigramme-type" className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="flex items-center gap-3 mb-6 text-3xl font-bold text-gray-800">
        <Network className="w-8 h-8 text-green-600" /> {/* Icône de réseau ou structure */}
        Organigramme Type d'une École de Production
      </h1>
      
      <p className="mb-8 text-lg text-gray-700 leading-relaxed">
        Structurer votre École de Production est essentiel pour une gestion efficace et une répartition claire des rôles. Un organigramme type sert de point de départ pour visualiser les différentes fonctions et les liens hiérarchiques et fonctionnels au sein de votre établissement.
      </p>

      {/* Section Pourquoi un Organigramme ? */}
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-gray-700 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-orange-500" />
            L'Importance de la Structure Organisationnelle
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-gray-700 space-y-4">
          <p>
            Un organigramme bien défini permet de :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>**Clarifier les rôles et responsabilités :** Chaque membre de l'équipe sait quelle est sa place et ses missions.</li>
            <li>**Optimiser la communication :** Facilite les échanges et la circulation de l'information.</li>
            <li>**Identifier les besoins en recrutement :** Met en évidence les postes à pourvoir pour le bon fonctionnement.</li>
            <li>**Faciliter la prise de décision :** En connaissant la chaîne de commandement.</li>
            <li>**Présenter la structure aux partenaires :** Démontrer le sérieux et l'organisation de l'école.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Section Composantes Clés */}
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-gray-700 flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-600" />
            Les Fonctions Essentielles
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-gray-700 space-y-4">
          <p>
            Bien que chaque École de Production ait ses spécificités, un organigramme type inclut généralement les fonctions suivantes :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>**Conseil d'Administration / Bureau :** Définition des grandes orientations, validation stratégique.</li>
            <li>**Direction :** Gestion globale de l'école, représentation, développement.</li>
            <li>**Pédagogie :** Formateurs, encadrants techniques, responsables de formation.</li>
            <li>**Production / Ateliers :** Maîtres de stage, chefs d'atelier, responsables qualité.</li>
            <li>**Administration & Finance :** Gestionnaire, comptable, responsable RH.</li>
            <li>**Relations Partenaires :** Chargé de développement partenarial, relations entreprises.</li>
            <li>**Vie Scolaire / Accompagnement Social :** Suivi des élèves, orientation.</li>
          </ul>
          <p>
            Le modèle proposé vous offre une base pour adapter ces fonctions à la taille et à la maturité de votre projet.
          </p>
        </CardContent>
      </Card>

      {/* Section Téléchargement du fichier */}
      <Card className="mb-8 shadow-lg border-2 border-blue-500">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-blue-700 flex items-center gap-3">
            <Download className="w-6 h-6" /> Télécharger notre Modèle d'Organigramme
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="text-base text-gray-800 flex-1">
            <p className="mb-2">
              Obtenez un modèle d'organigramme prêt à être personnalisé. Ce document vous aidera à visualiser et à formaliser la structure de votre future École de Production.
            </p>
            <p className="text-sm text-gray-600">
              **Conseil :** N'hésitez pas à faire évoluer votre organigramme à mesure que votre école grandit et que de nouvelles fonctions apparaissent.
            </p>
          </div>
          <a
            href={organigrammeFilePath}
            download="ORGANIGRAMME_TYPE_ECOLE_PRODUCTION.pptx" // Nom du fichier suggéré
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

export default Organigramme;