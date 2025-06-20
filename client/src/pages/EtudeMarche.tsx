// client/src/pages/EtudeMarche.tsx

import React from 'react';
import { Download, Target, Search, FileText, Lightbulb } from "lucide-react"; // Icônes pertinentes
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface EtudeMarcheProps {
  navigate?: (page: string) => void;
}

const EtudeMarche: React.FC<EtudeMarcheProps> = ({ navigate }) => {
  // Le chemin du fichier doit être relatif au dossier 'public' à la racine de votre projet.
  // Assurez-vous que votre fichier d'étude de marché est bien placé dans 'public/fichiers/'
  const etudeMarcheFilePath = "/fichiers/ETUDE_MARCHE_MODELE.xlsx"; // Ou .docx, .pdf selon le format

  return (
    <section id="etude-marche" className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="flex items-center gap-3 mb-6 text-3xl font-bold text-gray-800">
        <Target className="w-8 h-8 text-indigo-600" /> {/* Icône cible pour l'étude de marché */}
        Réaliser votre Étude de Marché
      </h1>
      
      <p className="mb-8 text-lg text-gray-700 leading-relaxed">
        L'étude de marché est une étape fondamentale dans la création de votre École de Production. Elle vous permet de valider la pertinence de votre projet, d'identifier les besoins locaux, d'analyser la concurrence et de définir votre positionnement stratégique. Un marché bien compris est la clé d'une implantation réussie.
      </p>

      {/* Section Importance de l'Étude de Marché */}
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-gray-700 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-orange-500" />
            Pourquoi une Étude de Marché ?
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-gray-700 space-y-4">
          <p>
            Une étude de marché approfondie vous permet de :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>**Confirmer le besoin :** S'assurer qu'il y a une demande suffisante pour la formation et la production proposées par l'école.</li>
            <li>**Identifier les opportunités :** Détecter des créneaux non exploités ou des partenariats potentiels.</li>
            <li>**Connaître la concurrence :** Comprendre le paysage éducatif et économique local pour mieux se différencier.</li>
            <li>**Établir des prévisions réalistes :** Alimenter votre <span
                className="text-blue-600 hover:underline cursor-pointer font-medium"
                onClick={() => navigate && navigate('business-plan')}
              >
                business plan
              </span> avec des données objectives.
            </li>
            <li>**Convaincre les partenaires :** Présenter un projet solide et argumenté aux financeurs et entreprises.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Section Éléments clés de l'Étude */}
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-gray-700 flex items-center gap-2">
            <Search className="w-5 h-5 text-purple-600" />
            Les Composantes de l'Étude
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-gray-700 space-y-4">
          <p>
            Une étude de marché pour une École de Production devrait inclure :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>**Analyse de l'offre de formation :** Quels sont les établissements existants, leurs formations, leurs spécificités ?</li>
            <li>**Analyse des besoins des entreprises :** Quels sont les métiers en tension sur le territoire ? Quelles compétences sont recherchées ?</li>
            <li>**Analyse de la demande des jeunes :** Quels sont leurs centres d'intérêt, leurs difficultés, leurs aspirations professionnelles ?</li>
            <li>**Étude des partenaires potentiels :** Identification des entreprises, collectivités, associations pouvant soutenir le projet.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Section Téléchargement du fichier */}
      <Card className="mb-8 shadow-lg border-2 border-blue-500">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-blue-700 flex items-center gap-3">
            <Download className="w-6 h-6" /> Télécharger notre Modèle d'Étude de Marché
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="text-base text-gray-800 flex-1">
            <p className="mb-2">
              Téléchargez notre modèle pour vous aider à structurer et réaliser votre étude de marché spécifique aux Écoles de Production. Ce document contient des sections clés et des questions directrices.
            </p>
            <p className="text-sm text-gray-600">
              **Note :** Ce modèle est une base à adapter. La qualité de votre étude dépendra de la pertinence des informations collectées et de votre analyse locale.
            </p>
          </div>
          <a
            href={etudeMarcheFilePath}
            download="MODELE_ETUDE_MARCHE_ECOLE_PRODUCTION.xlsx" // Ou .docx, .pdf
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

export default EtudeMarche;