import React from 'react';
import {
  Wrench,
  FileText,
  Calculator,
  TrendingUp,
  Building,
  CheckSquare,
  DollarSign,
  Folder,
  Euro,
  PieChart,
  BarChart3,
  Target,
} from "lucide-react";

// On simule les composants Card pour que le code soit fonctionnel
const Card = ({ children, onClick }) => (
  <div
    className="bg-white rounded-xl shadow-lg border border-gray-200 cursor-pointer transition-transform duration-200 hover:scale-105"
    onClick={onClick}
  >
    {children}
  </div>
);

const CardContent = ({ children }) => <div className="p-6">{children}</div>;

// Données originales des outils
const outils = [
    { id: "plan-comptable", path: "/plan-comptable", label: "Plan comptable adapté", icon: FileText, description: "Accédez à un plan comptable spécifique pour les écoles de production." },
    { id: "tva-coefficient", path: "/tva-coefficient", label: "Trame de calcul du coefficient de déduction de TVA", icon: Calculator, description: "Calculez simplement votre coefficient de déduction de TVA." },
    { id: "resultat-fiscal", path: "/resultat-fiscal", label: "Trame de calcul du résultat fiscal", icon: TrendingUp, description: "Estimez le résultat fiscal de votre école avec notre trame dédiée." },
    { id: "arbre", path: "/arbre", label: "Arbre à la décision", icon: Target, description: "Cet outil, conçu sous forme d'arbre décisionnel, permet de poser un diagnostic structuré sur le projet (pédagogique, économique, équipe, ancrage territorial, etc.). Son objectif est de sécuriser le démarrage en orientant l'accompagnement et en identifiant les freins à lever." },
    { id: "statuts", path: "/statuts", label: "Générateur de statuts", icon: Building, description: "Créez les statuts de votre association en vous assurant de leur conformité légale." },
    { id: "criteres-label", path: "/criteres-label", label: "Liste de vérification des critères à remplir pour obtenir le label", icon: CheckSquare, description: "Assurez-vous de respecter tous les critères pour le label." },
    { id: "budget-creation", path: "/budget-creation", label: "Trame de budget à la création", icon: DollarSign, description: "Élaborez votre budget prévisionnel pour le lancement de l'école." },
    { id: "etude-marche", path: "/etude-marche", label: "Étude du marché du secteur sélectionné", icon: Target, description: "Étudiez le marché de votre secteur pour prendre des décisions éclairées." },
    { id: "subventions", path: "/subventions", label: "Dossier type demande subvention", icon: Folder, description: "Préparez votre dossier de demande de subvention avec ce modèle." },
    { id: "suivi-subventions", path: "/suivi-subventions", label: "Suivi des subventions", icon: Euro, description: "Assurez le suivi de vos demandes de subventions et de leur utilisation." },
    { id: "suivi-prets", path: "/suivi-prets", label: "Suivi des prêts", icon: DollarSign, description: "Suivez l'évolution et l'état d'avancement de vos prêts." },
    { id: "pret-subordonne", path: "/pret-subordonne", label: "Exemple de contrat de prêt subordonné", icon: FileText, description: "Modèle pour un contrat de prêt subordonné spécifique." },
    { id: "habilitation-taxe", path: "/habilitation-taxe", label: "Exemple de formulaire de demande d'habilitation taxe apprentissage", icon: Euro, description: "Accédez au formulaire et aux instructions pour l'habilitation." },
    { id: "calculateurs", path: "/calculateurs", label: "Tableau calcul de coût", icon: Calculator, description: "Calculez et suivez vos coûts pédagogiques et de production." },
    { id: "prix-vente", path: "/prix-vente", label: "Tableau de détermination du prix de vente des produits", icon: PieChart, description: "Définissez une stratégie de prix pour les produits de votre école." },
    { id: "tableau-bord", path: "/tableau-bord", label: "Tableau de bord financier & extra-financier", icon: BarChart3, description: "Consultez un aperçu complet de la performance de votre école." },
    { id: "rapport-adapte", path: "/rapport-adapte", label: "Modèle de rapport adapté", icon: FileText, description: "Obtenez un modèle de rapport financier adapté à votre structure." },
];

// Le composant de la page Outils
const ToolsPage = ({ navigate }) => {
  return (
    <section id="tools-page" className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="flex items-center gap-2 mb-6 text-3xl font-bold text-[#3C5F58]">
        <Wrench className="w-8 h-8" />
        Nos Outils et Suivis
      </h1>
      <p className="mb-8 text-lg text-gray-700 leading-relaxed">
        Cette section regroupe l'ensemble des outils pratiques et des modèles de suivi conçus pour accompagner la création et le pilotage d'une École de Production. Chaque outil a été pensé pour répondre à une étape clé du projet, de la structuration juridique au suivi financier.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {outils.map((outil) => (
          <Card key={outil.id} onClick={() => navigate(outil.path)}>
            <CardContent>
              <h3 className="flex items-center gap-3 text-lg font-semibold my-4 text-[#2E5941]">
                <outil.icon className="w-6 h-6 flex-shrink-0" />
                {outil.label}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {outil.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

// Composant principal pour l'affichage et la prévisualisation
export default function App() {
  // La fonction navigate est simulée ici pour l'exemple.
  const navigate = (path) => {
    console.log(`Navigation vers : ${path}`);
  };

  return <ToolsPage navigate={navigate} />;
}
