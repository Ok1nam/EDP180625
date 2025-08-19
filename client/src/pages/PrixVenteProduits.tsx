import React from 'react';
import { Calculator, Download, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface PrixVenteProduitsProps {
  navigate?: (page: string) => void;
}

const PrixVenteProduits: React.FC<PrixVenteProduitsProps> = ({ navigate }) => {
  const { toast } = useToast();

  // Le chemin vers le fichier du tableau
  const prixDeRevientFilePath = "/fichiers/ANNEXE 19 - TABLEAU DE DETERMINATION DU PRIX DE VENTE DES PRODUITS.xlsx";

  return (
    <section id="prix-vente-produits" className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="flex items-center gap-3 mb-6 text-3xl font-bold text-[#3C5F58]">
        <Calculator className="w-8 h-8 text-[#3C5F58]" />
        Calcul du Prix de Vente des Productions
      </h1>
      
      <p className="mb-8 text-lg text-gray-700 leading-relaxed">
        Cet outil est essentiel pour vous, expert-comptable, afin d’aider votre client École de Production à déterminer avec précision le coût de revient complet d’un produit et à fixer un prix de vente compétitif. Il est basé sur la méthodologie détaillée dans le <span
          className="text-[#3C5F58] hover:underline cursor-pointer font-medium"
          onClick={() => navigate && navigate('tableau-calcul-cout')}
        >Tableau de Calcul des Coûts</span>.
      </p>

      {/* Section Objectifs */}
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-[#3C5F58] flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-[#3C5F58]" />
            Objectifs de l'outil pour votre client
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-gray-700 space-y-4">
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="font-bold">Calculer précisément le coût de revient complet</span> d’un produit fabriqué, en intégrant toutes les charges liées à sa réalisation (matières premières, consommables, sous-traitance et main-d'œuvre des élèves).</li>
            <li><span className="font-bold">Déterminer un prix de vente adapté</span>, prenant en compte la marge brute ou nette souhaitée, ainsi que la réalité du marché.</li>
            <li><span className="font-bold">Contribuer au pilotage de la rentabilité</span> de l’activité de production de l’EDP, en fournissant une vision claire des coûts et marges par produit.</li>
            <li><span className="font-bold">Servir d’aide à la décision</span> dans la négociation commerciale, en mesurant l’impact de différentes hypothèses de coûts et de prix.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Téléchargement du tableau */}
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-[#3C5F58] flex items-center gap-2">
            <Download className="w-5 h-5 text-[#3C5F58]" />
            Télécharger le Tableau de Calcul du Prix de Revient
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-center">
          <p className="mb-4">
            Pour une approche plus détaillée, ce tableau de calcul du prix de revient est un outil essentiel pour une gestion financière rigoureuse de l'École de Production de votre client. Il est fourni au format `.xlsx`.
          </p>
          <a href={prixDeRevientFilePath} download="ANNEXE 19 - TABLEAU DE DETERMINATION DU PRIX DE VENTE DES PRODUITS.xlsx">
            <Button className="bg-[#2E5941] hover:bg-[#3C5F58] text-white">
              <Download className="w-4 h-4 mr-2" />
              Télécharger le Tableau
            </Button>
          </a>
          <p className="italic text-sm text-gray-600 mt-4">
            <span className="font-bold">Conseil :</span> Utilisez ce tableau pour affiner les stratégies de prix et maximiser la rentabilité de l'EDP.
          </p>
        </CardContent>
      </Card>

      {/* Bouton de retour à l'accueil */}
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

export default PrixVenteProduits;
