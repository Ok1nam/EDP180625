import React from 'react';
import { Download, Calculator, Lightbulb, Briefcase } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TableauCalculCoutProps {
  navigate?: (page: string) => void;
}

const TableauCalculCout: React.FC<TableauCalculCoutProps> = ({ navigate }) => {
  const calculCoutFilePath = "/fichiers/ANNEXE 18 - TABLEAU CALCUL DE COUT.xlsx";

  return (
    <section id="tableau-calcul-cout" className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="flex items-center gap-3 mb-6 text-3xl font-bold text-[#3C5F58]">
        <Calculator className="w-8 h-8 text-[#3C5F58]" />
        Tableau de calcul des coûts : le coût d'un élève
      </h1>
      
      <p className="mb-8 text-lg text-gray-700 leading-relaxed">
        Ce tableau est un outil de calcul automatisé conçu pour vous, expert-comptable. Il permet de déterminer avec précision le coût d'un élève et de mettre en avant les principaux indicateurs de production pour l'école que vous accompagnez. Cet outil est essentiel pour une gestion financière rigoureuse et pour établir le <span
          className="text-[#3C5F58] hover:underline cursor-pointer font-medium"
          onClick={() => navigate && navigate('prix-vente')}
        >coût de revient des productions de votre client</span>.
      </p>

      {/* Section Objectif de l’outil */}
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-[#3C5F58] flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-gray-500" />
            Objectif de l’outil pour votre mission
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-gray-700 space-y-4">
          <p>
            L’annexe 18 est un outil conçu pour exploiter les données comptables de l'école (Annexe 4) et fournir une analyse détaillée des coûts. Il vous permet de :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="font-bold">Importer et consolider les données comptables :</span> en intégrant uniquement les comptes de charges (classe 6) et de produits (classe 7) pertinents pour votre analyse.</li>
            <li><span className="font-bold">Traiter automatiquement la ventilation :</span> des charges et produits entre secteur Production, Pédagogie et Mutualisé.</li>
            <li><span className="font-bold">Calculer le coût total par secteur :</span> en intégrant charges directes et clé de répartition appliquée aux charges mutualisées.</li>
            <li><span className="font-bold">Établir le coût moyen par élève :</span> basé sur les effectifs et hypothèses saisies, pour disposer d’un indicateur de suivi et de comparaison pour votre client.</li>
            <li><span className="font-bold">Produire des indicateurs de pilotage synthétiques :</span> exploitables pour analyser l’évolution des coûts et appuyer les échanges avec les partenaires.</li>
          </ul>
          <p className="italic text-sm text-gray-600 mt-4">
            Cet outil assure une exploitation fiable et standardisée des données comptables de l'école de production, garantissant la cohérence avec la structure définie dans l’Annexe 4 et facilitant la prise de décision stratégique pour votre client.
          </p>
        </CardContent>
      </Card>

      {/* Section Téléchargement */}
      <Card className="mb-8 shadow-lg border-2 border-[#2E5941]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-[#2E5941] flex items-center gap-3">
            <Download className="w-6 h-6 text-[#2E5941]" /> Télécharger le tableau de calcul des coûts
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="text-base text-gray-800 flex-1">
            <p className="mb-2">
              Accédez à notre modèle de tableau de calcul des coûts, un outil essentiel pour une gestion financière rigoureuse et le pilotage de l'école de production de votre client. 
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-bold">Recommandation :</span> assurez-vous d'activer les macros pour le bon fonctionnement de l'outil.
            </p>
          </div>
          <a
            href={calculCoutFilePath}
            download="ANNEXE 18 - TABLEAU CALCUL DE COUT.xlsx"
            className="flex-shrink-0"
          >
            <Button className="bg-[#2E5941] hover:bg-[#3C5F58] text-white flex items-center gap-2 py-3 px-6 text-lg">
              <Download className="w-5 h-5" /> Télécharger le modèle
            </Button>
          </a>
        </CardContent>
      </Card>

      {navigate && (
        <div className="text-center mt-8">
          <Button
            onClick={() => navigate('accueil')}
            className="px-6 py-3 bg-[#2E5941] text-white rounded-md hover:bg-[#3C5F58] transition-colors text-lg"
          >
            Retour à l'accueil
          </Button>
        </div>
      )}
    </section>
  );
};

export default TableauCalculCout;