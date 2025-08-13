import React from 'react';
import { Download, DollarSign, PieChart, Clock, FileText, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface BudgetCreationProps {
  navigate?: (page: string) => void;
}

const BudgetCreation: React.FC<BudgetCreationProps> = ({ navigate }) => {
  const budgetCreationFilePath = "/fichiers/ANNEXE 12 BUDGET ECOLE DE PRODUCTION VT09082025.xlsm";

  return (
    <section id="budget-creation" className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="flex items-center gap-3 mb-6 text-3xl font-bold text-gray-800">
        <DollarSign className="w-8 h-8 text-[#3C5F58]" />
        Budget Prévisionnel de Création
      </h1>
      
      <p className="mb-8 text-lg text-gray-700 leading-relaxed">
        La mise en place d'un budget prévisionnel est une étape cruciale pour l'élaboration d'un <span className="font-bold">modèle économique viable</span> dès le lancement de votre projet. Ce document vous permet de planifier les ressources et les dépenses nécessaires, en servant de base pour votre <span className="font-bold">dossier de financement</span> et pour la définition de votre stratégie financière initiale.
      </p>

      {/* Section Pourquoi un budget de création ? */}
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-[#3C5F58] flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-orange-500" />
            Pourquoi un Budget de Création ?
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-gray-700 space-y-4">
          <p>
            Ce modèle Excel automatisé est conçu pour vous aider à :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="font-bold">Évaluer les besoins de financement</span> : Identifier les ressources financières initiales pour le lancement et la pérennité de l'école.</li>
            <li><span className="font-bold">Anticiper les charges</span> : Détailler les coûts fixes et variables pour une gestion financière rigoureuse.</li>
            <li><span className="font-bold">Sécuriser le projet</span> : S'assurer de la viabilité économique à long terme et ajuster la stratégie si nécessaire.</li>
            <li><span className="font-bold">Présenter un dossier solide</span> : Fournir un document chiffré et cohérent aux banques, investisseurs et partenaires.</li>
            <li><span className="font-bold">Démarrer avec une feuille de route financière</span> : Établir une base de référence pour le suivi et l'ajustement futurs.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Section Composantes Clés */}
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-[#3C5F58] flex items-center gap-2">
            <PieChart className="w-5 h-5 text-blue-600" />
            Les Éléments du Modèle Prévisionnel
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-gray-700 space-y-4">
          <p>
            Le modèle intègre :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="font-bold">Investissements de départ</span> : Aménagement de l'atelier, équipements, et autres coûts de création.</li>
            <li><span className="font-bold">Dépenses de fonctionnement</span> : Frais courants (salaires, loyer, assurances...).</li>
            <li><span className="font-bold">Produits de l'activité de production</span> : Estimation des recettes issues de la production des élèves.</li>
            <li><span className="font-bold">Ressources externes</span> : Subventions, mécénat et contributions de partenaires.</li>
            <li><span className="font-bold">Flux de trésorerie</span> : Prévision des entrées et sorties d'argent sur plusieurs années.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Section Téléchargement */}
      <Card className="mb-8 shadow-lg border-2 border-purple-500">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-purple-700 flex items-center gap-3">
            <Download className="w-6 h-6" /> Télécharger le Modèle de Budget de Création
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="text-base text-gray-800 flex-1">
            <p className="mb-2">
              Accédez à notre modèle de budget prévisionnel interactif au format .xlsm (Excel avec macros) pour préparer et sécuriser le financement de votre École de Production.
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-bold">Conseil :</span> Adaptez ce modèle pour qu'il soit un outil de pilotage proactif, en lien direct avec les indicateurs de performance de votre école.
            </p>
          </div>
          <a
            href={budgetCreationFilePath}
            download="BUDGET_ECOLE_DE_PRODUCTION_MODELE.xlsm"
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