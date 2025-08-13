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
  const etudeMarcheFilePath = "/fichiers/ANNEXE 11 ETUDE DE MARCHE.docx"; // Ou .docx, .pdf selon le format

  return (
    <section id="etude-marche" className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="flex items-center gap-3 mb-6 text-3xl font-bold text-gray-800">
        <Target className="w-8 h-8 text-indigo-600" /> {/* Icône cible pour l'étude de marché */}
        Réaliser votre Étude de Marché
      </h1>
      
      <p className="mb-8 text-lg text-gray-700 leading-relaxed">
        L'étude de marché est une étape fondamentale pour l'ancrage territorial de votre École de Production. Elle vous permet de valider la pertinence du projet, de vérifier l'existence de <span className="font-bold">besoins locaux non couverts</span>, et d'établir une <span className="font-bold">stratégie d'implantation</span> cohérente avec les dynamiques économiques et sociales de votre territoire.
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
            <li><span className="font-bold">Valider la pertinence du projet</span> : Confirmer qu'il existe un besoin avéré pour une nouvelle offre de formation-production.</li>
            <li><span className="font-bold">Identifier les partenaires locaux</span> : Détecter les entreprises, collectivités et associations avec lesquelles collaborer.</li>
            <li><span className="font-bold">Comprendre le paysage économique</span> : Analyser les filières, les métiers en tension et les opportunités d'emploi sur le territoire.</li>
            <li><span className="font-bold">Positionner l'école stratégiquement</span> : S'assurer que le projet s'insère de manière complémentaire et non concurrentielle avec l'existant.</li>
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
            <li><span className="font-bold">Analyse de l'offre de formation existante</span> : Recenser les dispositifs de formation professionnelle et d'insertion présents sur le territoire.</li>
            <li><span className="font-bold">Identification des besoins des entreprises</span> : Mener des entretiens avec les acteurs économiques pour connaître leurs besoins en compétences et en main d'œuvre.</li>
            <li><span className="font-bold">Évaluation des publics cibles</span> : Analyser les besoins des jeunes sans qualification ou en décrochage scolaire.</li>
            <li><span className="font-bold">Analyse des partenariats potentiels</span> : Identifier les acteurs publics et privés susceptibles de soutenir le projet (financements, commandes, stages).</li>
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
              Téléchargez notre modèle d'étude de marché au format Word pour vous aider à structurer votre analyse locale. Ce document est un guide de travail pour la collecte et l'organisation de vos informations.
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-bold">Conseil :</span> Ce modèle est une base à adapter. La pertinence de votre étude dépendra de la qualité des données collectées sur votre territoire.
            </p>
          </div>
          <a
            href={etudeMarcheFilePath}
            download="MODELE_ETUDE_MARCHE_ECOLE_PRODUCTION.docx"
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