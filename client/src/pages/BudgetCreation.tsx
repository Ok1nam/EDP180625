// client/src/pages/BudgetCreation.tsx

import React from 'react';
import { Download, DollarSign, PieChart, Clock, FileText, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface BudgetCreationProps {
  navigate?: (page: string) => void;
}

const BudgetCreation: React.FC<BudgetCreationProps> = ({ navigate }) => {
  const budgetCreationFilePath = "/fichiers/BUDGET_CREATION_MODELE.xlsx"; // Assurez-vous que ce fichier existe dans public/fichiers/

  return (
    <section id="budget-creation" className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="flex items-center gap-3 mb-6 text-3xl font-bold text-gray-800">
        <DollarSign className="w-8 h-8 text-green-600" />
        Budget Prévisionnel de Création
      </h1>
      
      <p className="mb-8 text-lg text-gray-700 leading-relaxed">
        L'élaboration d'un budget prévisionnel détaillé est une étape incontournable pour la création d'une École de Production. Ce document anticipe l'ensemble des recettes et des dépenses sur les premières années d'activité, et permet de valider la faisabilité financière de votre projet.
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
            Un budget de création bien construit vous permet de :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>**Estimer les besoins en financement :** Déterminer le capital de départ nécessaire.</li>
            <li>**Anticiper la rentabilité :** Projeter les flux de trésorerie et le résultat attendu.</li>
            <li>**Convaincre les financeurs :** Présenter une vision claire et chiffrée du modèle économique.</li>
            <li>**Planifier les dépenses :** Gérer les coûts de démarrage et les charges récurrentes.</li>
            <li>**Fixer des objectifs réalistes :** Servir de feuille de route financière pour les premières années.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Section Composantes Clés */}
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-gray-700 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-blue-600" />
            Les Éléments du Budget Prévisionnel
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-gray-700 space-y-4">
          <p>
            Notre modèle inclut généralement les postes suivants :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>**Investissements Initiaux :** Locaux, équipements d'atelier, matériel pédagogique.</li>
            <li>**Charges de Personnel :** Salaires des formateurs, personnel administratif.</li>
            <li>**Charges de Fonctionnement :** Énergie, assurances, fournitures, entretien.</li>
            <li>**Produits de la Production :** Chiffre d'affaires estimé des ventes de produits/services.</li>
            <li>**Subventions et Autres Financements :** <span 
                className="text-blue-600 hover:underline cursor-pointer font-medium"
                onClick={() => navigate && navigate('suivi-subventions')}
              >
                Aides publiques
              </span>, <span 
                className="text-blue-600 hover:underline cursor-pointer font-medium"
                onClick={() => navigate && navigate('suivi-prets')}
              >
                prêts
              </span>, mécénat.</li>
            <li>**Fonds de Roulement :** Liquidités nécessaires pour couvrir les dépenses courantes avant que l'école ne génère suffisamment de revenus.</li>
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
              Obtenez notre modèle de budget prévisionnel de création pour planifier et structurer les aspects financiers de votre future École de Production.
            </p>
            <p className="text-sm text-gray-600">
              **Conseil :** Adaptez ce modèle à la spécificité de votre projet et aux exigences des organismes de financement que vous sollicitez.
            </p>
          </div>
          <a
            href={budgetCreationFilePath}
            download="BUDGET_CREATION_ECOLE_PRODUCTION.xlsx"
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