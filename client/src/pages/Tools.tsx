import React, { useState, useEffect } from 'react';
import {
  Home,
  Wrench,
  BarChart3,
  BookOpen,
  FileText,
  Calculator,
  TrendingUp,
  Building,
  CheckSquare,
  DollarSign,
  Folder,
  Euro,
  PieChart,
  MapPin,
  MessageCircle,
  Scale,
  Target,
  HelpCircle,
  Menu,
  X,
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

// Définition des types pour les éléments du menu
interface MenuItem {
  id: string;
  path: string;
  label: string;
  icon: any;
  description?: string;
}

interface MenuSection {
  id: string;
  path: string;
  label: string;
  icon: any;
  items: MenuItem[];
}

// Structure unique du menu et des pages
const menuStructure: MenuSection[] = [
  {
    id: "accueil",
    path: "/accueil",
    label: "Accueil",
    icon: Home,
    items: [{ id: "accueil", path: "/accueil", label: "Accueil", icon: Home }],
  },
  {
    id: "outils",
    path: "/outils",
    label: "Outils",
    icon: Wrench,
    items: [
      { id: "plan-comptable", path: "/plan-comptable", label: "Plan comptable adapté", icon: FileText, description: "Accédez à un plan comptable spécifique pour les écoles de production." },
      { id: "tva-coefficient", path: "/tva-coefficient", label: "Trame d’aide au calcul TVA, TS et résultat fiscal", icon: Calculator, description: "Un outil unique pour calculer le coefficient de TVA, la taxe sur les salaires et le résultat fiscal." },
      { id: "arbre", path: "/arbre", label: "Arbre à la décision", icon: Target, description: "Cet outil, conçu sous forme d'arbre décisionnel, permet de poser un diagnostic structuré sur le projet (pédagogique, économique, équipe, ancrage territorial, etc.). Son objectif est de sécuriser le démarrage en orientant l'accompagnement et en identifiant les freins à lever." },
      { id: "statuts", path: "/statuts", label: "Générateur de statuts", icon: Building, description: "Créez les statuts de votre association en vous assurant de leur conformité légale." },
      { id: "criteres-label", path: "/criteres-label", label: "Liste de vérification des critères du label", icon: CheckSquare, description: "Assurez-vous de respecter tous les critères pour l'obtention du label." },
      { id: "budget-creation", path: "/budget-creation", label: "Trame de budget à la création", icon: DollarSign, description: "Élaborez votre budget prévisionnel pour le lancement de l'école." },
      { id: "etude-marche", path: "/etude-marche", label: "Étude du marché du secteur", icon: Target, description: "Étudiez le marché de votre secteur pour prendre des décisions éclairées." },
      { id: "subventions", path: "/subventions", label: "Dossier type demande subvention", icon: Folder, description: "Préparez votre dossier de demande de subvention avec ce modèle." },
      { id: "suivi-subventions", path: "/suivi-subventions", label: "Suivi des subventions", icon: Euro, description: "Assurez le suivi de vos demandes de subventions et de leur utilisation." },
      { id: "suivi-prets", path: "/suivi-prets", label: "Suivi des prêts", icon: DollarSign, description: "Suivez l'évolution et l'état d'avancement de vos prêts." },
      { id: "pret-subordonne", path: "/pret-subordonne", label: "Exemple de contrat de prêt subordonné", icon: FileText, description: "Modèle pour un contrat de prêt subordonné spécifique." },
      { id: "habilitation-taxe", path: "/habilitation-taxe", label: "Demande d'habilitation taxe apprentissage", icon: Euro, description: "Accédez au formulaire et aux instructions pour l'habilitation." },
      { id: "calculateurs", path: "/calculateurs", label: "Tableau calcul de coût", icon: Calculator, description: "Calculez et suivez vos coûts pédagogiques et de production." },
      { id: "prix-vente", path: "/prix-vente", label: "Détermination du prix de vente", icon: PieChart, description: "Définissez une stratégie de prix pour les produits de votre école." },
      { id: "tableau-bord", path: "/tableau-bord", label: "Tableau de bord financier & extra-financier", icon: BarChart3, description: "Consultez un aperçu complet de la performance de votre école." },
      { id: "rapport-adapte", path: "/rapport-adapte", label: "Modèle de rapport adapté", icon: FileText, description: "Obtenez un modèle de rapport financier adapté à votre structure." },
    ],
  },
  {
    id: "documentation",
    path: "/documentation",
    label: "Documentation",
    icon: BookOpen,
    items: [
      { id: "cartographie", path: "/cartographie", label: "Cartographie des écoles de production en France", icon: MapPin, description: "Visualisez les emplacements des écoles de production." },
      { id: "organigramme", path: "/organigramme", label: "Exemple d'organigramme", icon: Building, description: "Modèle d'organigramme pour une École de Production." },
      { id: "entretiens", path: "/entretiens", label: "Entretiens effectués auprès des porteurs de projet", icon: MessageCircle, description: "Retours d'expériences de porteurs de projet." },
      { id: "guide-tva", path: "/guide-tva", label: "Guide d'application de la TVA", icon: Scale, description: "Guide complet sur la gestion de la TVA." },
    ],
  },
  {
    id: "contact-et-aide",
    path: "/contact-et-aide",
    label: "Contact & Aide",
    icon: HelpCircle,
    items: [
      { id: "expert-comptable", path: "/expert-comptable", label: "Contact Expert-Comptable stagiaire", icon: Calculator, description: "Coordonnées de l'expert-comptable stagiaire." },
      { id: "edp", path: "/edp", label: "L'École de Production", icon: Building, description: "Informations générales sur les Écoles de Production." },
    ],
  },
];

// Composant de la page Outils
const ToolsPage = ({ navigate }) => {
  const outilsSection = menuStructure.find(section => section.id === "outils");

  if (!outilsSection) {
    return <div>Erreur : La section "Outils" n'a pas été trouvée.</div>;
  }

  return (
    <section id="tools-page" className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="flex items-center gap-2 mb-6 text-3xl font-bold text-[#3C5F58]">
        <Wrench className="w-8 h-8" />
        Outils et Suivis
      </h1>
      <p className="mb-8 text-lg text-gray-700 leading-relaxed">
        Cette section regroupe l'ensemble des outils pratiques et des modèles de suivi conçus pour accompagner la création et le pilotage d'une École de Production. Chaque outil a été pensé pour répondre à une étape clé du projet, de la structuration juridique au suivi financier.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {outilsSection.items.map((outil) => (
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

// Le composant principal de l'application
export default function App() {
  const [currentPage, setCurrentPage] = useState("outils");

  // La fonction navigate simule la navigation en changeant l'état
  const navigate = (path) => {
    const pageId = path.replace('/', '');
    console.log(`Navigation vers : ${pageId}`);
    // Dans une vraie application, cela serait géré par un routeur.
    // Pour la démo, on ne change pas de page visible mais on logue l'action.
    // Si vous voulez simuler un changement de page, vous pourriez faire :
    // setCurrentPage(pageId);
  };

  // Le rendu se concentre sur la page Outils
  return <ToolsPage navigate={navigate} />;
}
