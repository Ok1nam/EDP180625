// client/src/pages/TableauCalculCout.tsx

import React from 'react';
import { Download, Calculator, BarChart2, Lightbulb, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TableauCalculCoutProps {
  navigate?: (page: string) => void;
}

const TableauCalculCout: React.FC<TableauCalculCoutProps> = ({ navigate }) => {
  const calculCoutFilePath = "/fichiers/TABLEAU_CALCUL_COUT_MODELE.xlsx"; // Assurez-vous que ce fichier existe dans public/fichiers/

  return (
    <section id="tableau-calcul-cout" className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="flex items-center gap-3 mb-6 text-3xl font-bold text-gray-800">
        <Calculator className="w-8 h-8 text-blue-600" />
        Tableau de Calcul des Coûts
      </h1>
      
      <p className="mb-8 text-lg text-gray-700 leading-relaxed">
        Maîtriser vos coûts est fondamental pour la viabilité économique de votre École de Production. Ce tableau vous permet d'analyser en détail les différentes catégories de dépenses (matières premières, main d'œuvre, charges fixes et variables) et de déterminer précisément le coût de revient de vos formations et produits.
      </p>

      {/* Section Importance */}
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-gray-700 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-orange-500" />
            L'Importance du Suivi des Coûts
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-gray-700 space-y-4">
          <p>
            Un suivi précis des coûts vous aide à :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>**Fixer des prix justes :** Définir un <span 
                className="text-blue-600 hover:underline cursor-pointer font-medium"
                onClick={() => navigate && navigate('prix-vente')}
              >
                prix de vente
              </span> compétitif et rentable pour vos productions.</li>
            <li>**Optimiser les dépenses :** Identifier les postes de coûts élevés et chercher des leviers de réduction.</li>
            <li>**Évaluer la rentabilité :** Mesurer la performance financière de chaque activité ou produit.</li>
            <li>**Prendre des décisions éclairées :** Orienter les choix stratégiques de l'école (investissements, diversification).</li>
          </ul>
        </CardContent>
      </Card>

      {/* Section Contenu du Tableau */}
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-gray-700 flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-purple-600" />
            Ce que contient le Tableau
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-gray-700 space-y-4">
          <p>
            Notre modèle de tableau de calcul des coûts est structuré pour vous permettre d'analyser :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>**Coûts Directs :** Matières premières, salaires directs liés à la production.</li>
            <li>**Coûts Indirects :** Loyers, énergie, amortissements, frais administratifs, etc.</li>
            <li>**Charges de Structure :** Dépenses fixes nécessaires au fonctionnement de l'école.</li>
            <li>**Coût de Revient Unitaire :** Coût total par élève formé ou par produit fabriqué.</li>
            <li>**Point Mort :** Le seuil de chiffre d'affaires à atteindre pour couvrir l'ensemble des coûts.</li>
          </ul>
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
              Obtenez notre modèle de tableau de calcul des coûts, un outil essentiel pour une gestion financière rigoureuse de votre École de Production.
            </p>
            <p className="text-sm text-gray-600">
              **Recommandation :** Utilisez ce tableau en complément de votre <span 
                className="text-blue-600 hover:underline cursor-pointer font-medium"
                onClick={() => navigate && navigate('business-plan')}
              >
                business plan
              </span> pour une vision financière complète.
            </p>
          </div>
          <a
            href={calculCoutFilePath}
            download="TABLEAU_CALCUL_COUT_ECOLE_PRODUCTION.xlsx"
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