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

// Les composants UI de base pour les cartes et le bouton
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
      { id: "TVACoefficient", path: "/tva-coefficient", label: "Trame d’aide au calcul TVA, TS et résultat fiscal", icon: Calculator, description: "Un outil unique pour calculer le coefficient de TVA, la taxe sur les salaires et le résultat fiscal." },
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

// Composant pour l'en-tête et la navigation (fusionné)
const Header = ({ navigate, isBurgerMenuOpen, setIsBurgerMenuOpen }) => (
  <header className="sticky top-0 bg-[#3C5F58] text-white p-4 flex justify-between items-center shadow-md z-50">
    <div className="flex items-center gap-4">
      <span className="text-xl font-bold">
        Ecole de Production
      </span>
    </div>
    <button
      onClick={() => setIsBurgerMenuOpen(!isBurgerMenuOpen)}
      className="md:hidden p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors duration-200"
      aria-label="Toggle navigation menu"
    >
      {isBurgerMenuOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
  </header>
);

// Composant de navigation (fusionné)
const Navigation = ({ navigate, isBurgerMenuOpen, setIsBurgerMenuOpen }) => {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  useEffect(() => {
    // Si le menu burger se ferme, on ferme aussi les sous-menus
    if (!isBurgerMenuOpen) {
      setOpenSubmenu(null);
    }
  }, [isBurgerMenuOpen]);

  const handleItemClick = (path: string, isSectionHeader: boolean) => {
    if (isSectionHeader) {
      setOpenSubmenu(openSubmenu === path ? null : path);
    } else {
      navigate(path);
      setIsBurgerMenuOpen(false);
      setOpenSubmenu(null);
    }
  };

  return (
    <nav
      className={`fixed top-0 right-0 w-80 h-full bg-gray-800 transition-transform duration-300 pt-16 z-40 shadow-lg overflow-y-auto ${
        isBurgerMenuOpen ? "transform translate-x-0" : "transform translate-x-full"
      }`}
    >
      <ul className="list-none">
        {menuStructure.map((section: MenuSection) => (
          <li key={section.id} className="border-b border-gray-600">
            <button
              onClick={() =>
                section.items.length > 1
                  ? handleItemClick(section.path, true)
                  : handleItemClick(section.items[0].path, false)
              }
              className="w-full flex items-center justify-between gap-3 p-4 text-white text-lg hover:bg-gray-700 transition-colors duration-200 text-left font-semibold"
            >
              <span className="flex items-center gap-3">
                {section.icon && <section.icon className="w-5 h-5" />}
                {section.label}
              </span>
              {section.items.length > 1 && (
                <span
                  className={`transform transition-transform duration-200 ${
                    openSubmenu === section.path ? "rotate-90" : ""
                  }`}
                >
                  ▶
                </span>
              )}
            </button>
            {section.items.length > 1 && openSubmenu === section.path && (
              <ul className="bg-gray-700">
                {section.items.map((item: MenuItem) => (
                  <li key={item.id}>
                    <button
                      onClick={() => handleItemClick(item.path, false)}
                      className="w-full flex items-center gap-3 pl-12 pr-4 py-3 text-white text-sm hover:bg-gray-600 transition-colors duration-200 text-left"
                    >
                      {item.icon && <item.icon className="w-4 h-4" />}
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

// Composant Outils (fusionné)
const ToolsPage = ({ navigate }) => {
  const outilsSection = menuStructure.find(section => section.id === "outils");

  if (!outilsSection) {
    return <div>Erreur : La section "Outils" n'a pas été trouvée.</div>;
  }

  return (
    <section id="tools-page" className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="flex items-center gap-2 mb-6 text-2xl font-bold text-[#3C5F58]">
        <Wrench className="w-6 h-6" />
        Nos Outils et Suivis
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {outilsSection.items.map((outil) => (
          <Card key={outil.id} onClick={() => navigate(outil.path)}>
            <CardContent>
              <h3 className="flex items-center gap-2 text-lg font-semibold mb-3 text-[#2E5941]">
                <outil.icon className="w-6 h-6" />
                {outil.label}
              </h3>
              <p className="text-gray-600 leading-relaxed">
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
const App = () => {
  const [currentPage, setCurrentPage] = useState("outils");
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  // Gère la navigation et la fermeture du menu
  const navigate = (path) => {
    // Logic for routing based on path, we'll just use a simple switch for now
    const section = menuStructure.flatMap(sec => sec.items).find(item => item.path === path);
    if (section) {
      setCurrentPage(section.id);
    }
    setIsBurgerMenuOpen(false);
  };

  const renderContent = () => {
    switch (currentPage) {
      case "outils":
        return <ToolsPage navigate={navigate} />;
      // Ajoutez d'autres cas pour d'autres pages si nécessaire
      default:
        return (
          <div className="p-8 text-center text-gray-500">
            Contenu pour {currentPage} non implémenté.
          </div>
        );
    }
  };

  return (
    <div className="font-sans antialiased text-gray-900 bg-gray-50 min-h-screen">
      <style>{`
        body { font-family: 'Inter', sans-serif; }
      `}</style>
      <Header navigate={navigate} isBurgerMenuOpen={isBurgerMenuOpen} setIsBurgerMenuOpen={setIsBurgerMenuOpen} />
      <Navigation navigate={navigate} isBurgerMenuOpen={isBurgerMenuOpen} setIsBurgerMenuOpen={setIsBurgerMenuOpen} />
      <main className="p-4 pt-20 transition-all duration-300">
        {renderContent()}
      </main>
      {isBurgerMenuOpen && (
        <div
          onClick={() => setIsBurgerMenuOpen(false)}
          className="fixed inset-0 bg-black opacity-50 z-30"
        ></div>
      )}
    </div>
  );
};

export default App;
