import React, { useState } from 'react';
import { Calculator, DollarSign, Euro, Percent, Package, Users, Factory, LineChart, RefreshCcw, Lightbulb, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface PrixVenteProduitsProps {
  navigate?: (page: string) => void;
}

const PrixVenteProduits: React.FC<PrixVenteProduitsProps> = ({ navigate }) => {
  const { toast } = useToast();

  // Inputs
  const [rawMaterialsCost, setRawMaterialsCost] = useState<number | ''>(''); // Coût matières premières
  const [directLaborHours, setDirectLaborHours] = useState<number | ''>(''); // Heures main d'œuvre directe
  const [hourlyLaborRate, setHourlyLaborRate] = useState<number | ''>(''); // Taux horaire main d'œuvre
  const [indirectCosts, setIndirectCosts] = useState<number | ''>(''); // Coûts indirects de production
  const [desiredMarginPercentage, setDesiredMarginPercentage] = useState<number | ''>(''); // Marge souhaitée (%)
  const [tvaRate, setTvaRate] = useState<number | ''>(20); // Taux de TVA (%)

  // Outputs
  const [unitCostPrice, setUnitCostPrice] = useState<number | null>(null); // Coût de revient unitaire
  const [sellingPriceExVAT, setSellingPriceExVAT] = useState<number | null>(null); // Prix de vente HT
  const [sellingPriceIncVAT, setSellingPriceIncVAT] = useState<number | null>(null); // Prix de vente TTC
  const [unitMarginAmount, setUnitMarginAmount] = useState<number | null>(null); // Marge unitaire (€)

  const calculatePrices = () => {
    // Convertir les inputs en nombres, ou 0 si vides
    const rmCost = Number(rawMaterialsCost) || 0;
    const dlHours = Number(directLaborHours) || 0;
    const hlRate = Number(hourlyLaborRate) || 0;
    const indCosts = Number(indirectCosts) || 0;
    const marginPc = Number(desiredMarginPercentage) || 0;
    const vatR = Number(tvaRate) || 0;

    if (rmCost === 0 && dlHours === 0 && indCosts === 0) {
      toast({
        title: "Attention",
        description: "Veuillez entrer au moins un coût (matières premières, main d'œuvre ou coûts indirects).",
        variant: "destructive",
      });
      resetCalculations(); // Réinitialise les résultats si les inputs sont invalides
      return;
    }

    // 1. Calcul du coût de revient unitaire
    const totalDirectLaborCost = dlHours * hlRate;
    const calculatedUnitCostPrice = rmCost + totalDirectLaborCost + indCosts;
    setUnitCostPrice(calculatedUnitCostPrice);

    // 2. Calcul du prix de vente hors taxes (PVHT)
    // PVHT = Coût de revient / (1 - Marge souhaitée en décimal)
    let calculatedSellingPriceExVAT: number;
    if (marginPc >= 100) {
      // Pour éviter une division par zéro ou par un nombre négatif si la marge est trop élevée
      toast({
        title: "Marge irréaliste",
        description: "Une marge de 100% ou plus est irréaliste pour le calcul du prix de vente. Veuillez ajuster la marge.",
        variant: "destructive",
      });
      resetCalculations();
      return;
    }
    const marginFactor = 1 - (marginPc / 100);
    calculatedSellingPriceExVAT = calculatedUnitCostPrice / marginFactor;
    setSellingPriceExVAT(calculatedSellingPriceExVAT);

    // 3. Calcul du prix de vente toutes taxes comprises (PVTTC)
    const calculatedSellingPriceIncVAT = calculatedSellingPriceExVAT * (1 + (vatR / 100));
    setSellingPriceIncVAT(calculatedSellingPriceIncVAT);

    // 4. Calcul de la marge unitaire (€)
    const calculatedUnitMarginAmount = calculatedSellingPriceExVAT - calculatedUnitCostPrice;
    setUnitMarginAmount(calculatedUnitMarginAmount);
  };

  const resetAll = () => {
    setRawMaterialsCost('');
    setDirectLaborHours('');
    setHourlyLaborRate('');
    setIndirectCosts('');
    setDesiredMarginPercentage('');
    setTvaRate(20); // Remettre à 20% par défaut
    resetCalculations();
  };

  const resetCalculations = () => {
    setUnitCostPrice(null);
    setSellingPriceExVAT(null);
    setSellingPriceIncVAT(null);
    setUnitMarginAmount(null);
  };

  // Le chemin vers le fichier du tableau, mis à jour
  const prixDeRevientFilePath = "/fichiers/ANNEXE 19 - TABLEAU DE DETERMINATION DU PRIX DE VENTE DES PRODUITS.xlsx";

  return (
    <section id="prix-vente-produits" className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="flex items-center gap-3 mb-6 text-3xl font-bold text-[#3C5F58]">
        <Calculator className="w-8 h-8 text-[#3C5F58]" />
        Calcul du Prix de Vente des Productions
      </h1>
      
      <p className="mb-8 text-lg text-gray-700 leading-relaxed">
        Ce simulateur est un outil essentiel pour vous, expert-comptable, afin d’aider votre client École de Production à déterminer avec précision le coût de revient complet d’un produit et à fixer un prix de vente compétitif. Il est basé sur la méthodologie détaillée dans le <span
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


      <Card className="mb-6 shadow-lg">
        <CardHeader className="bg-[#F0F7F6] border-b">
          <CardTitle className="text-xl font-bold text-[#3C5F58] flex items-center gap-2">
            <DollarSign className="w-5 h-5" /> Simulateur de Prix de Vente
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-5">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="raw-materials">Coût des Matières Premières (€)</Label>
              <Input
                id="raw-materials"
                type="number"
                value={rawMaterialsCost}
                onChange={(e) => setRawMaterialsCost(e.target.value === '' ? '' : parseFloat(e.target.value))}
                placeholder="Ex: 50"
              />
            </div>
            <div>
              <Label htmlFor="direct-labor-hours">Heures de Main d'Œuvre Directe (Élèves)</Label>
              <Input
                id="direct-labor-hours"
                type="number"
                value={directLaborHours}
                onChange={(e) => setDirectLaborHours(e.target.value === '' ? '' : parseFloat(e.target.value))}
                placeholder="Ex: 2.5 (heures)"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="hourly-labor-rate">Taux Horaire Main d'Œuvre Directe (€/heure)</Label>
              <Input
                id="hourly-labor-rate"
                type="number"
                value={hourlyLaborRate}
                onChange={(e) => setHourlyLaborRate(e.target.value === '' ? '' : parseFloat(e.target.value))}
                placeholder="Ex: 20"
              />
            </div>
            <div>
              <Label htmlFor="indirect-costs">Consommables, Sous-traitance, Charges Indirectes (€)</Label>
              <Input
                id="indirect-costs"
                type="number"
                value={indirectCosts}
                onChange={(e) => setIndirectCosts(e.target.value === '' ? '' : parseFloat(e.target.value))}
                placeholder="Ex: 15"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="desired-margin">Marge Commerciale Souhaitée (%)</Label>
              <Input
                id="desired-margin"
                type="number"
                value={desiredMarginPercentage}
                onChange={(e) => setDesiredMarginPercentage(e.target.value === '' ? '' : parseFloat(e.target.value))}
                placeholder="Ex: 30"
              />
            </div>
            <div>
              <Label htmlFor="tva-rate">Taux de TVA (%)</Label>
              <Input
                id="tva-rate"
                type="number"
                value={tvaRate}
                onChange={(e) => setTvaRate(e.target.value === '' ? '' : parseFloat(e.target.value))}
                placeholder="Ex: 20"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={calculatePrices} className="bg-[#2E5941] hover:bg-[#3C5F58] text-white flex items-center gap-2">
              <Calculator className="w-5 h-5" /> Calculer les Prix
            </Button>
            <Button onClick={resetAll} variant="outline" className="btn-secondary flex items-center gap-2 border-gray-300 hover:bg-gray-100 text-gray-700">
              <RefreshCcw className="w-4 h-4" /> Réinitialiser
            </Button>
          </div>
        </CardContent>
      </Card>

      {unitCostPrice !== null && (
        <Card className="mb-6 shadow-lg border-2 border-[#2E5941]">
          <CardHeader className="bg-[#F0F7F6] border-b">
            <CardTitle className="text-xl font-bold text-[#3C5F58] flex items-center gap-2">
              <LineChart className="w-5 h-5" /> Résultats des Calculs
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-lg text-gray-700 font-semibold">Coût de Revient Unitaire:</p>
                <p className="text-2xl font-bold text-[#2E5941]">
                  {unitCostPrice.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                </p>
                <p className="text-sm text-gray-500">
                  (Matières Premières + Main d'Œuvre Directe + Charges Indirectes)
                </p>
              </div>
              <div>
                <p className="text-lg text-gray-700 font-semibold">Marge Unitaire Souhaitée:</p>
                <p className="text-2xl font-bold text-[#2E5941]">
                  {unitMarginAmount?.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) || 'N/A'}
                </p>
                <p className="text-sm text-gray-500">
                  ({desiredMarginPercentage}% de marge sur le coût de revient)
                </p>
              </div>
            </div>

            <hr className="my-4 border-gray-200" />

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-lg text-gray-700 font-semibold">Prix de Vente Hors Taxes (PVHT):</p>
                <p className="text-3xl font-bold text-[#2E5941]">
                  {sellingPriceExVAT?.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) || 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-lg text-gray-700 font-semibold">Prix de Vente Toutes Taxes Comprises (PVTTC):</p>
                <p className="text-3xl font-bold text-[#2E5941]">
                  {sellingPriceIncVAT?.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) || 'N/A'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

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
