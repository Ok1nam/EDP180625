// client/src/pages/TvaCoefficient.tsx

import React from 'react';
import { Download, Percent, Calculator, FileText } from "lucide-react"; 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TvaCoefficientProps {
    navigate: (page: string) => void;
}

const TvaCoefficient: React.FC<TvaCoefficientProps> = ({ navigate }) => {
  // Le chemin du fichier est mis à jour avec le nouveau nom.
  const excelFilePath = "/fichiers/ANNEXE 6 ET 7 - Trame calcul coefficient déduction et résultat fiscal 080825.xlsm"; 

  return (
    <section id="tva-coefficient" className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="flex items-center gap-2 mb-6 text-3xl font-bold text-gray-800">
        <Percent className="w-8 h-8 text-primary" />
        Trame de Calcul du Coefficient de Déduction de TVA
      </h1>

      <p className="mb-8 text-lg text-gray-700 leading-relaxed">
        [cite_start]Ce document est un outil de référence pour vous, expert-comptable, afin de formaliser le calcul du coefficient de déduction de TVA de votre client, une École de Production[cite: 4, 67]. [cite_start]En raison de leur double activité (pédagogique exonérée et productive soumise à TVA), une approche rigoureuse est nécessaire pour déterminer la part de TVA récupérable sur les dépenses mixtes[cite: 3].
      </p>

      {/* Section Méthodologie détaillée */}
      <Card className="mb-8 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Comprendre le Coefficient de Déduction
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-700 space-y-4">
          <p>
            [cite_start]Le coefficient de déduction est crucial pour les redevables partiels comme les Écoles de Production[cite: 26, 28]. [cite_start]Il permet de calculer la proportion de TVA récupérable sur les dépenses utilisées conjointement pour des activités exonérées et taxables[cite: 26].
          </p>
          <p>
            [cite_start]Ce coefficient est la résultante de trois composantes[cite: 29]:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              [cite_start]**Coefficient d'assujettissement (CSA)** : Mesure l'utilisation des biens pour des opérations imposables[cite: 30].
            </li>
            <li>
              [cite_start]**Coefficient de taxation (CT)** : Tient compte du régime des recettes, taxables ou exonérées[cite: 30].
            </li>
            <li>
              [cite_start]**Coefficient d'admission (CA)** : Indique si la TVA est exclue par nature (ex. : véhicules de tourisme)[cite: 31].
            </li>
          </ul>
          <p>
            [cite_start]Pour les Écoles de Production, le CSA et le CA sont généralement à 100 %, sauf cas particuliers[cite: 32]. Le coefficient de déduction correspond donc directement au **coefficient de taxation**, qui est calculé par la formule suivante :
          </p>
          <p className="font-bold text-center my-4 text-blue-700">
            [cite_start]Coefficient de déduction = Recettes soumises à TVA / Recettes totales [cite: 35]
          </p>
          <p className="text-sm text-gray-600">
            [cite_start]*Les recettes soumises à TVA incluent les ventes de biens et services et certaines subventions affectées à des opérations imposables[cite: 36]. [cite_start]Les recettes totales comprennent toutes les recettes, y compris les subventions pédagogiques et les dons[cite: 37].*
          </p>
        </CardContent>
      </Card>
        
      {/* Section Téléchargement du fichier */}
      <Card className="mb-8 shadow-lg border-2 border-blue-500">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-blue-700 flex items-center gap-3">
            <Download className="w-6 h-6" /> Télécharger la Trame de Calcul
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="text-base text-gray-800 flex-1">
            <p className="mb-2">
              Téléchargez la trame de calcul Excel pour vous aider à déterminer le coefficient de déduction de votre client.
            </p>
            <p className="text-sm text-gray-600">
              **Note importante :** Ce fichier est un support commun à plusieurs de nos outils. Il est essentiel de le remplir avec les données spécifiques de l'école avant d'utiliser les calculateurs. [cite_start]Pour une compréhension complète du contexte fiscal, nous vous invitons à consulter l'annexe[cite: 1]: <span
                className="text-blue-600 hover:underline cursor-pointer"
                onClick={() => navigate('guide-tva')}
              >
                Guide d'application de la TVA
              </span>.
            </p>
          </div>
          <a
            href={excelFilePath}
            download="ANNEXE 6 ET 7 - Trame calcul coefficient déduction et résultat fiscal 080825.xlsm" // Nom du fichier mis à jour
            className="flex-shrink-0"
          >
            <Button className="btn-primary flex items-center gap-2 py-3 px-6 text-lg">
              <Download className="w-5 h-5" /> Télécharger le fichier
            </Button>
          </a>
        </CardContent>
      </Card>

      {/* Section Conseils d'optimisation */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Conseils pour une gestion rigoureuse
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-700 space-y-4">
          <p>
            Pour assurer la conformité fiscale et sécuriser les déclarations de TVA de votre client :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            [cite_start]<li>Veillez à la distinction précise des recettes assujetties et exonérées[cite: 14].</li>
            [cite_start]<li>Assurez un suivi rigoureux de l'affectation des dépenses et conservez tous les justificatifs[cite: 52, 54].</li>
            [cite_start]<li>Le coefficient est déterminé annuellement à la clôture de l'exercice et utilisé à titre provisoire pour l'année suivante[cite: 38].</li>
            [cite_start]<li>Une régularisation est effectuée en fin d'exercice lorsque le coefficient définitif est connu[cite: 39, 50].</li>
            [cite_start]<li>Pour la première année d'exercice, il est prudent de ne pas récupérer la TVA sur les dépenses mutualisées, le droit à déduction ne s'exerçant qu'après la première clôture[cite: 41, 42].</li>
          </ul>
        </CardContent>
      </Card>
    </section>
  );
};

export default TvaCoefficient;