import React from 'react';
import { Download, Target, Search, Lightbulb } from "lucide-react"; // Icônes pertinentes
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface EtudeMarcheProps {
  navigate?: (page: string) => void;
}

const EtudeMarche: React.FC<EtudeMarcheProps> = ({ navigate }) => {
  // On ne garde que le chemin vers le fichier Excel
  const etudeMarcheExcelPath = "/fichiers/ANNEXE 11 - ETUDE DE MARCHE DU SECTEUR SELECTIONNE.xlsm";

  return (
    <section id="etude-marche" className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="flex items-center gap-3 mb-6 text-3xl font-bold text-gray-800">
        <Target className="w-8 h-8 text-indigo-600" /> {/* Icône cible pour l'étude de marché */}
        Accompagner votre client dans son Étude de Marché
      </h1>
      
      <p className="mb-8 text-lg text-gray-700 leading-relaxed">
        Votre rôle en tant qu'expert-comptable est d'accompagner votre client, le porteur de projet d'École de Production, dans la structuration de sa démarche. Une <span className="font-bold">étude de marché solide</span> est indispensable pour la préparation du business plan et la validation du <span className="font-bold">modèle économique</span>. Elle permet de s'assurer que le projet est ancré dans une réalité territoriale et répond à de véritables besoins.
      </p>

      {/* Section Importance de l'Étude de Marché */}
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-gray-700 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-orange-500" />
            Pourquoi Guider une Étude de Marché ?
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-gray-700 space-y-4">
          <p>
            En tant que conseil, vous aidez votre client à :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="font-bold">Valider la pertinence du projet</span> : Confirmer l'existence d'un besoin avéré sur le marché local avant d'engager des financements.</li>
            <li><span className="font-bold">Identifier les opportunités et les risques</span> : Détecter des créneaux non exploités et évaluer la concurrence pour un positionnement stratégique.</li>
            <li><span className="font-bold">Établir des prévisions réalistes</span> : Utiliser des données objectives pour construire le business plan et les prévisionnels financiers.</li>
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
            Vous pouvez guider votre client à structurer son étude autour des axes suivants :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="font-bold">Analyse de l'offre locale</span> : Recenser les établissements de formation et d'insertion professionnelle pour identifier le paysage éducatif existant.</li>
            <li><span className="font-bold">Identification des besoins des entreprises</span> : Aider à mener des entretiens pour comprendre les métiers en tension et les attentes en matière de compétences.</li>
            <li><span className="font-bold">Évaluation des publics cibles</span> : Analyser les besoins des jeunes sans qualification pour définir l'offre pédagogique.</li>
            <li><span className="font-bold">Cartographie des partenariats</span> : Identifier les acteurs publics et privés susceptibles de soutenir le projet (financements, commandes, mécénat).</li>
          </ul>
        </CardContent>
      </Card>

      {/* Section Téléchargement du fichier .xlsm */}
      <Card className="mb-8 shadow-lg border-2 border-[#3C5F58]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-[#3C5F58] flex items-center gap-3">
            <Download className="w-6 h-6" /> Télécharger le Modèle d'Étude de Marché
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="text-base text-gray-800 flex-1">
            <p className="mb-2">
              Téléchargez le document d'étude de marché au format Excel pour analyser en détail les données du secteur et organiser la collecte d'informations.
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-bold">Conseil :</span> Ce fichier contient des données chiffrées essentielles pour construire le budget prévisionnel.
            </p>
          </div>
          <a
            href={etudeMarcheExcelPath}
            download="ANNEXE_11_ETUDE_DE_MARCHE_DU_SECTEUR_SELECTIONNE.xlsm"
            className="flex-shrink-0"
          >
            <Button className="flex items-center gap-2 py-3 px-6 text-lg bg-[#2E5941] text-white rounded-md hover:bg-[#3C5F58] transition-colors">
              <Download className="w-5 h-5" /> Télécharger le modèle
            </Button>
          </a>
        </CardContent>
      </Card>

      {navigate && (
        <div className="text-center mt-8">
          <Button
            onClick={() => navigate('accueil')}
            className="px-6 py-3 bg-[#2E5941] text-white rounded-md hover:bg-green-800 transition-colors text-lg"
          >
            Retour à l'accueil
          </Button>
        </div>
      )}
    </section>
  );
};

export default EtudeMarche;