import React from 'react';
import { Lightbulb, Download, BarChart2, Briefcase } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TableauDeBordProps {
  navigate?: (page: string) => void;
}

const TableauDeBord: React.FC<TableauDeBordProps> = ({ navigate }) => {
  const tableauDeBordFilePath = "/fichiers/ANNEXE 20 - TABLEAU DE BORD FINANCIER ET EXTRA-FINANCIER.xlsm";

  return (
    <section id="tableau-de-bord" className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="flex items-center gap-3 mb-6 text-3xl font-bold text-[#3C5F58]">
        <BarChart2 className="w-8 h-8 text-[#3C5F58]" />
        Tableau de bord pour le pilotage de votre client
      </h1>
      
      <p className="mb-8 text-lg text-gray-700 leading-relaxed">
        En tant qu'expert-comptable, ce tableau de bord est votre allié pour offrir un suivi stratégique à l'école de production que vous conseillez. Il vous permet de transformer les données brutes en un aperçu clair et synthétique de sa santé financière et de son impact social, facilitant ainsi vos recommandations et la prise de décision de votre client.
      </p>

      {/* Section Objectifs de l’outil */}
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-[#3C5F58] flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-gray-500" />
            Les bénéfices pour votre mission
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-gray-700 space-y-4">
          <p>
            Ce modèle est conçu pour vous aider à :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="font-bold">Analyser la performance financière</span> en suivant des indicateurs essentiels comme l’équilibre financier, la rentabilité de la production ou le coût par élève.</li>
            <li><span className="font-bold">Évaluer l'impact social et extra-financier</span> en intégrant des métriques clés pour les financeurs (taux de décrochage, qualification des élèves) et ainsi valoriser le bilan de l'école.</li>
            <li><span className="font-bold">Faciliter le reporting</span> auprès des partenaires et financeurs, en leur fournissant une vision complète et transparente de l’activité de l’école de production.</li>
            <li><span className="font-bold">Anticiper les besoins et les risques</span> de l'école en analysant les tendances et en justifiant vos conseils stratégiques.</li>
          </ul>
          <p className="italic text-sm text-gray-600 mt-4">
            Cet outil vous permet d'aller au-delà de la comptabilité traditionnelle pour devenir un véritable partenaire stratégique du développement de l'école de production.
          </p>
        </CardContent>
      </Card>

      {/* Section Téléchargement */}
      <Card className="mb-8 shadow-lg border-2 border-[#2E5941]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-[#2E5941] flex items-center gap-3">
            <Download className="w-6 h-6 text-[#2E5941]" /> Télécharger le modèle de tableau de bord
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="text-base text-gray-800 flex-1">
            <p className="mb-2">
              Accédez à ce modèle de tableau de bord au format `.xlsm`, un outil prêt à l'emploi pour le suivi et le pilotage de votre client École de Production.
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-bold">Conseil de pro :</span> Adaptez les indicateurs aux spécificités de l'école pour un pilotage optimal, en incluant des variables que vous jugez pertinentes pour leur activité.
            </p>
          </div>
          <a
            href={tableauDeBordFilePath}
            download="ANNEXE 20 - TABLEAU DE BORD FINANCIER ET EXTRA-FINANCIER.xlsm"
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

export default TableauDeBord;