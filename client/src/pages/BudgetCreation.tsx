import React from 'react';
import { Download, DollarSign, PieChart, Lightbulb, Briefcase } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface BudgetCreationProps {
  navigate?: (page: string) => void;
}

const BudgetCreation: React.FC<BudgetCreationProps> = ({ navigate }) => {
  // Correction du chemin pour pointer vers le bon fichier
  const budgetCreationFilePath = "/fichiers/ANNEXE 12 - TRAME DE BUDGET A LA CREATION.xlsm";

  return (
    <section id="budget-creation" className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="flex items-center gap-3 mb-6 text-3xl font-bold text-gray-800">
        <DollarSign className="w-8 h-8 text-[#3C5F58]" />
        Budget prévisionnel de création
      </h1>
      
      <p className="mb-8 text-lg text-gray-700 leading-relaxed">
        En tant qu'expert-comptable, vous jouez un rôle stratégique dans l'élaboration d'un <span className="font-bold">modèle économique viable</span> pour votre client, l'école de production. Cet outil est conçu pour vous permettre de traduire leur projet éducatif en une stratégie financière solide, facilitant ainsi leur lancement et leur pérennité.
      </p>

      {/* Section Pourquoi un budget de création ? */}
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-[#3C5F58] flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-gray-500" />
            Pourquoi cet outil pour votre client ?
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-gray-700 space-y-4">
          <p>
            Ce modèle Excel automatisé est votre allié pour :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="font-bold">Évaluer les besoins de financement :</span> accompagner l'école dans l'identification précise des ressources financières initiales, cruciales pour le lancement.</li>
            <li><span className="font-bold">Anticiper les charges :</span> détailler les coûts fixes et variables pour une gestion financière rigoureuse, en vous appuyant sur des données claires.</li>
            <li><span className="font-bold">Sécuriser le projet :</span> utiliser cet outil comme un levier pour s'assurer de la viabilité économique à long terme, en ajustant la stratégie en amont.</li>
            <li><span className="font-bold">Démarrer avec une feuille de route financière :</span> offrir à votre client une base de référence structurée pour le suivi et le pilotage de son activité.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Section Composantes Clés */}
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-[#3C5F58] flex items-center gap-2">
            <PieChart className="w-5 h-5 text-blue-600" />
            Les éléments du modèle prévisionnel
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-gray-700 space-y-4">
          <p>
            Ce modèle intègre les spécificités du secteur et vous permet d'analyser en détail :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="font-bold">Investissements de départ :</span> aménagement de l'atelier, équipements, et autres coûts de création.</li>
            <li><span className="font-bold">Dépenses de fonctionnement :</span> frais courants (salaires, loyer, assurances...).</li>
            <li><span className="font-bold">Produits de l'activité de production :</span> estimation des recettes issues de la production des élèves.</li>
            <li><span className="font-bold">Ressources externes :</span> subventions, mécénat et contributions de partenaires.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Section Téléchargement */}
      <Card className="mb-8 shadow-lg border-2 border-[#3C5F58]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-[#2E5941] flex items-center gap-3">
            <Download className="w-6 h-6" /> Télécharger le modèle de budget de création
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="text-base text-gray-800 flex-1">
            <p className="mb-2">
              Accédez à notre modèle de budget prévisionnel interactif au format .xlsm (Excel avec macros) pour préparer et sécuriser le financement de l'école de production.
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-bold">Conseil :</span> adaptez ce modèle pour qu'il soit un outil de pilotage proactif, en lien direct avec les indicateurs de performance de l'école.
            </p>
          </div>
          <a
            href={budgetCreationFilePath}
            download="ANNEXE 12 - TRAME DE BUDGET A LA CREATION.xlsm"
            className="flex-shrink-0"
          >
            <Button className="btn-primary flex items-center gap-2 py-3 px-6 text-lg bg-[#2E5941] hover:bg-[#3C5F58]">
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

export default BudgetCreation;