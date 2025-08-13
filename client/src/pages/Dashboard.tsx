import React from 'react';
import { Lightbulb, Download, BarChart2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TableauDeBordProps {
  navigate?: (page: string) => void;
}

const TableauDeBord: React.FC<TableauDeBordProps> = ({ navigate }) => {
  // Le chemin du fichier a été mis à jour avec le nouveau nom
  const tableauDeBordFilePath = "/fichiers/ANNEXE 20 - TABLEAU DE BORD FINANCIER ET EXTRA-FINANCIER.xlsx";

  return (
    <section id="tableau-de-bord" className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="flex items-center gap-3 mb-6 text-3xl font-bold text-[#3C5F58]">
        <BarChart2 className="w-8 h-8 text-[#3C5F58]" />
        Tableau de Bord Financier & Extra-Financier
      </h1>
      
      <p className="mb-8 text-lg text-gray-700 leading-relaxed">
        Ce tableau de bord est un outil de pilotage crucial, conçu pour vous, expert-comptable, afin de présenter à votre client un aperçu clair et synthétique de la santé financière et de l'impact social de son École de Production. Il complète le rapport annuel en intégrant des indicateurs clés pour la prise de décision stratégique.
      </p>

      {/* Section Objectifs de l’outil */}
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-[#3C5F58] flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-[#3C5F58]" />
            Objectifs de l'outil pour votre client
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-gray-700 space-y-4">
          <p>
            Ce tableau de bord est conçu pour aider l’École de Production à :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="font-bold">Mesurer la performance financière</span> en suivant des indicateurs essentiels comme l’équilibre financier, la rentabilité de la production, ou le coût élève.</li>
            <li><span className="font-bold">Évaluer l’impact extra-financier</span>, en incluant des métriques liées à l’insertion professionnelle, au taux de décrochage, ou au niveau de qualification obtenu par les élèves.</li>
            <li><span className="font-bold">Faciliter le reporting et la communication</span> avec les partenaires et financeurs, en leur fournissant une vision complète et transparente de l’activité de l’EDP.</li>
            <li><span className="font-bold">Anticiper les besoins et les risques</span> en analysant les tendances et en ajustant la stratégie de l’école de production en conséquence.</li>
          </ul>
          <p className="italic text-sm text-gray-600 mt-4">
            Cet outil est indispensable pour transformer les données brutes en informations exploitables, garantissant une gestion proactive et un dialogue constructif avec les parties prenantes.
          </p>
        </CardContent>
      </Card>

      {/* Section Téléchargement */}
      <Card className="mb-8 shadow-lg border-2 border-[#2E5941]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-[#2E5941] flex items-center gap-3">
            <Download className="w-6 h-6 text-[#2E5941]" /> Télécharger le Modèle de Tableau de Bord
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="text-base text-gray-800 flex-1">
            <p className="mb-2">
              Accédez à notre modèle de tableau de bord financier et extra-financier, un outil prêt à l'emploi pour le suivi et le pilotage de l'École de Production de votre client. Ce fichier est au format `.xlsx`.
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-bold">Recommandation :</span> Adaptez les indicateurs à la spécificité de votre client pour un pilotage optimal.
            </p>
          </div>
          <a
            href={tableauDeBordFilePath}
            download="ANNEXE 20 - TABLEAU DE BORD FINANCIER ET EXTRA-FINANCIER.xlsx"
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
