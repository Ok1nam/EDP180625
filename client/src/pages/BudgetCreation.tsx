// client/src/pages/BudgetCreation.tsx

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
        <DollarSign className="w-8 h-8 text-green-600" />
        Budget Prévisionnel de Création
      </h1>
      
      <p className="mb-8 text-lg text-gray-700 leading-relaxed">
        Construire un budget prévisionnel clair et structuré est une étape stratégique pour lancer votre École de Production. Notre modèle, inspiré des pratiques professionnelles, vous permet d’anticiper les besoins financiers, d’organiser vos dépenses et de vérifier la viabilité économique de votre projet sur plusieurs années.
      </p>

      {/* Section Pourquoi un budget de création ? */}
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-gray-700 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-orange-500" />
            Pourquoi un Budget de Création ?
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-gray-700 space-y-4">
          <p>
            Ce modèle Excel automatisé est conçu pour vous aider à :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>**Évaluer le financement initial** : Identifier précisément le capital nécessaire pour lancer l’activité.</li>
            <li>**Projeter la performance** : Simuler la trésorerie, le chiffre d’affaires et le résultat sur 3 à 5 ans.</li>
            <li>**Rassurer vos partenaires** : Présenter un dossier chiffré et cohérent aux banques, investisseurs ou collectivités.</li>
            <li>**Planifier vos charges** : Anticiper salaires, achats de matériel, frais de fonctionnement et investissements.</li>
            <li>**Piloter vos objectifs** : Utiliser le prévisionnel comme tableau de bord pour suivre et ajuster votre trajectoire financière.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Section Composantes Clés */}
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-gray-700 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-blue-600" />
            Les Éléments du Modèle Prévisionnel
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-gray-700 space-y-4">
          <p>
            Le modèle intègre :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>**Investissements Initiaux** : Aménagement des locaux, équipements techniques, matériel pédagogique.</li>
            <li>**Charges de Personnel** : Rémunérations des formateurs et de l’équipe administrative.</li>
            <li>**Charges de Fonctionnement** : Énergie, assurances, fournitures, entretien.</li>
            <li>**Produits de la Production** : Estimations de ventes de produits ou prestations.</li>
            <li>**Subventions et Financements** : Aides publiques, mécénat, prêts bancaires.</li>
            <li>**Fonds de Roulement** : Trésorerie nécessaire pour absorber le décalage entre dépenses et recettes.</li>
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
              **Conseil :** Personnalisez chaque poste selon vos spécificités et les critères des financeurs que vous ciblez.
            </p>
          </div>
          <a
            href={budgetCreationFilePath}
            download="BUDGET_ECOLE_DE_PRODUCTION_MODELE.xlsm"
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

export default BudgetCreation;