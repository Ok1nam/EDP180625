import React from 'react';
import { Calculator, Download, Lightbulb, Briefcase } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface PrixVenteProduitsProps {
  navigate?: (page: string) => void;
}

const PrixVenteProduits: React.FC<PrixVenteProduitsProps> = ({ navigate }) => {
  const { toast } = useToast();

  const prixDeRevientFilePath = "/fichiers/ANNEXE 19 - TABLEAU DE DETERMINATION DU PRIX DE VENTE DES PRODUITS.xlsx";

  return (
    <section id="prix-vente-produits" className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="flex items-center gap-3 mb-6 text-3xl font-bold text-[#3C5F58]">
        <Calculator className="w-8 h-8 text-[#3C5F58]" />
        Tableau de détermination du prix de vente des produits
      </h1>
      
      <p className="mb-8 text-lg text-gray-700 leading-relaxed">
        Cet outil est essentiel pour vous, expert-comptable, afin d’aider votre client, l'école de production, à déterminer avec précision le coût de revient complet d’un produit et à fixer un prix de vente compétitif. Il se base sur le coût horaire d'un élève, détaillé dans l'outil précédent, le <span
          className="text-[#3C5F58] hover:underline cursor-pointer font-bold"
          // ✅ Corrigé ici : le nom de la page correspond maintenant à "TableauCalculCout"
          onClick={() => navigate && navigate('TableauCalculCout')}
        >tableau de calcul des coûts</span>.
      </p>

      {/* Section Objectifs */}
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-[#3C5F58] flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-gray-500" />
            Objectifs de l'outil pour votre mission
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-gray-700 space-y-4">
          <p>
            Ce modèle est conçu pour vous aider à :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="font-bold">Calculer précisément le coût de revient complet :</span> d’un produit fabriqué, en intégrant toutes les charges liées à sa réalisation (matières premières, consommables, sous-traitance et main-d'œuvre des élèves).</li>
            <li><span className="font-bold">Déterminer un prix de vente adapté :</span> en prenant en compte la marge brute ou nette souhaitée, ainsi que la réalité du marché.</li>
            <li><span className="font-bold">Contribuer au pilotage de la rentabilité :</span> de l’activité de production de l’EDP, en fournissant une vision claire des coûts et marges par produit.</li>
            <li><span className="font-bold">Servir d’aide à la décision :</span> dans la négociation commerciale, en mesurant l’impact de différentes hypothèses de coûts et de prix.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Téléchargement du tableau */}
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-[#3C5F58] flex items-center gap-2">
            <Download className="w-5 h-5 text-[#3C5F58]" />
            Télécharger le tableau de détermination du prix de vente des produits
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-center">
          <p className="mb-4">
            Pour une approche plus détaillée, cet outil est essentiel pour une gestion financière rigoureuse de l'école de production de votre client.
          </p>
          <a href={prixDeRevientFilePath} download="ANNEXE 19 - TABLEAU DE DETERMINATION DU PRIX DE VENTE DES PRODUITS.xlsx">
            <Button className="bg-[#2E5941] hover:bg-[#3C5F58] text-white">
              <Download className="w-4 h-4 mr-2" />
              Télécharger le tableau
            </Button>
          </a>
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
