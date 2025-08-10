// client/src/pages/TableauCalculCout.tsx

import React from 'react';
import { Download, Calculator, Lightbulb, BarChart2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TableauCalculCoutProps {
  navigate?: (page: string) => void;
}

const TableauCalculCout: React.FC<TableauCalculCoutProps> = ({ navigate }) => {
  const calculCoutFilePath = "/fichiers/ANNEXE 18 - Trame du Tableau de Calcul des Coûts.xlsx";

  return (
    <section id="tableau-calcul-cout" className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="flex items-center gap-3 mb-6 text-3xl font-bold text-gray-800">
        <Calculator className="w-8 h-8 text-blue-600" />
        Tableau de Calcul des Coûts : Le coût d'un élève
      </h1>
      
      <p className="mb-8 text-lg text-gray-700 leading-relaxed">
        Ce tableau est un outil de calcul automatisé conçu pour déterminer avec précision le coût d'un élève et le coût horaire de la formation. Il est essentiel pour une gestion financière rigoureuse et pour établir le <span
          className="text-blue-600 hover:underline cursor-pointer font-medium"
          onClick={() => navigate && navigate('prix-vente')}
        >coût de revient de vos productions</span>.
      </p>

      {/* Section Objectif de l’outil */}
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-gray-700 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-orange-500" />
            Objectif de l’annexe
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-gray-700 space-y-4">
          <p>
            L’Annexe 18 est un outil conçu pour exploiter les données comptables (Annexe 4) et fournir une analyse détaillée des coûts de l’école de production. Elle permet de :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>**Importer et consolider les données comptables** filtrées, en intégrant uniquement les comptes de charges (classe 6) et de produits (classe 7) pertinents.</li>
            <li>**Traiter automatiquement la ventilation** des charges et produits entre secteur Production, Pédagogie et Mutualisé.</li>
            <li>**Calculer le coût total par secteur,** en intégrant charges directes et clé de répartition appliquée aux charges mutualisées.</li>
            <li>**Établir le coût moyen par élève,** basé sur les effectifs et hypothèses saisies, pour disposer d’un indicateur de suivi et de comparaison.</li>
            <li>**Produire des indicateurs de pilotage synthétiques,** exploitables pour analyser l’évolution des coûts et appuyer les échanges avec les partenaires.</li>
          </ul>
          <p className="italic text-sm text-gray-600 mt-4">
            Cet outil assure une exploitation fiable et standardisée des données comptables, garantissant la cohérence avec la structure définie dans l’Annexe 4 et facilitant la prise de décision stratégique.
          </p>
        </CardContent>
      </Card>

      {/* Section Téléchargement */}
      <Card className="mb-8 shadow-lg border-2 border-green-500">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-green-700 flex items-center gap-3">
            <Download className="w-6 h-6" /> Télécharger le Tableau de Calcul des Coûts
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="text-base text-gray-800 flex-1">
            <p className="mb-2">
              Accédez à notre modèle de tableau de calcul des coûts, un outil essentiel pour une gestion financière rigoureuse de votre École de Production. Ce fichier est au format `.xlsx`.
            </p>
            <p className="text-sm text-gray-600">
              **Recommandation :** Assurez-vous d'activer les macros pour le bon fonctionnement de l'outil.
            </p>
          </div>
          <a
            href={calculCoutFilePath}
            download="ANNEXE 18 - Trame du Tableau de Calcul des Coûts.xlsx"
            className="flex-shrink-0"
          >
            <Button className="btn-primary flex items-center gap-2 py-3 px-6 text-lg">
              <Download className="w-5 h-5" /> Télécharger le modèle
            </Button>
          </a>
        </CardContent>
      </Card>

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

export default TableauCalculCout;