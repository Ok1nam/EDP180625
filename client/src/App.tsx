// client/src/App.tsx

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Home, Wrench, BarChart3, BookOpen, FileText, Calculator, TrendingUp,
  Building, CheckSquare, DollarSign, Folder, Euro, PieChart, MapPin,
  MessageCircle, Scale, Target, HelpCircle, Menu, X
} from "lucide-react";

// --- DÉBUT DE LA CONFIGURATION AUTONOME ---
// Pour que ce fichier fonctionne seul, nous simulons les composants et pages ici.
// Dans votre projet, les vrais fichiers seront utilisés.

const queryClient = new QueryClient();

// Mocks pour les composants UI et hooks
const Toaster = () => <div className="hidden">Toaster</div>;
const TooltipProvider = ({ children }) => <>{children}</>;
const LoginForm = ({ onLogin }) => (
    <div className="flex items-center justify-center h-screen">
        <button onClick={onLogin} className="px-4 py-2 bg-blue-500 text-white rounded">Se Connecter</button>
    </div>
);
const AnalyticsTracker = () => {
    // Ce composant contiendra la logique pour Google Analytics
    return null;
};
const useAuth = () => ({ isAuthenticated: true, login: () => console.log("Login...") });

// Mocks pour les pages (pour que les routes fonctionnent)
const PlaceholderPage = ({ pageName, navigate }) => (
    <div className="p-8 bg-white rounded-lg shadow">
        <h1 className="text-2xl font-bold text-gray-800">{pageName}</h1>
        <p className="text-gray-600 mt-2">Le contenu pour cette page est géré dans son propre fichier (`{pageName}.tsx`).</p>
    </div>
);

// --- COMPOSANTS DE L'APPLICATION ---

const Header = ({ isBurgerMenuOpen, setIsBurgerMenuOpen }) => (
  <header className="sticky top-0 bg-[#3C5F58] text-white p-4 flex justify-between items-center shadow-md z-50">
    <div className="flex items-center gap-4">
      <span className="text-xl font-bold">École de Production</span>
    </div>
    <button onClick={() => setIsBurgerMenuOpen(!isBurgerMenuOpen)} className="md:hidden p-2 rounded-md hover:bg-white/20">
      {isBurgerMenuOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
  </header>
);

const menuStructure = [
    {
        id: "accueil", path: "/accueil", label: "Accueil", icon: Home,
        items: [{ id: "accueil", path: "/accueil", label: "Accueil", icon: Home }],
    },
    {
        id: "outils", path: "/outils", label: "Outils", icon: Wrench,
        items: [
            { id: "plan-comptable", path: "/plan-comptable", label: "Plan comptable adapté", icon: FileText },
            { id: "tva-coefficient", path: "/tva-coefficient", label: "Trame d’aide au calcul TVA, TS et résultat fiscal", icon: Calculator },
            { id: "arbre", path: "/arbre", label: "Arbre à la décision", icon: Target },
            { id: "statuts", path: "/statuts", label: "Générateur de statuts", icon: Building },
            { id: "criteres-label", path: "/criteres-label", label: "Liste de vérification des critères du label", icon: CheckSquare },
            { id: "budget-creation", path: "/budget-creation", label: "Trame de budget à la création", icon: DollarSign },
            { id: "etude-marche", path: "/etude-marche", label: "Étude du marché du secteur", icon: Target },
            { id: "subventions", path: "/subventions", label: "Dossier type demande subvention", icon: Folder },
            { id: "suivi-subventions", path: "/suivi-subventions", label: "Suivi des subventions", icon: Euro },
            { id: "suivi-prets", path: "/suivi-prets", label: "Suivi des prêts", icon: DollarSign },
            { id: "pret-subordonne", path: "/pret-subordonne", label: "Exemple de contrat de prêt subordonné", icon: FileText },
            { id: "habilitation-taxe", path: "/habilitation-taxe", label: "Demande d'habilitation taxe apprentissage", icon: Euro },
            { id: "prix-vente", path: "/prix-vente", label: "Détermination du prix de vente", icon: PieChart },
            { id: "tableau-bord", path: "/tableau-bord", label: "Tableau de bord financier & extra-financier", icon: BarChart3 },
            { id: "rapport-adapte", path: "/rapport-adapte", label: "Modèle de rapport adapté", icon: FileText },
        ],
    },
    {
        id: "documentation", path: "/documentation", label: "Documentation", icon: BookOpen,
        items: [
            { id: "cartographie", path: "/cartographie", label: "Cartographie des écoles", icon: MapPin },
            { id: "organigramme", path: "/organigramme", label: "Exemple d'organigramme", icon: Building },
            { id: "entretiens", path: "/entretiens", label: "Entretiens porteurs de projet", icon: MessageCircle },
            { id: "guide-tva", path: "/guide-tva", label: "Guide d'application de la TVA", icon: Scale },
        ],
    },
    {
        id: "contact-et-aide", path: "/contact-et-aide", label: "Contact & Aide", icon: HelpCircle,
        items: [
            { id: "expert-comptable", path: "/expert-comptable", label: "Contact Expert-Comptable", icon: Calculator },
            { id: "edp", path: "/edp", label: "L'École de Production", icon: Building },
        ],
    },
];

const Navigation = ({ navigate, isBurgerMenuOpen, setIsBurgerMenuOpen }) => {
  const [openSubmenu, setOpenSubmenu] = useState(null);

  useEffect(() => {
    if (!isBurgerMenuOpen) setOpenSubmenu(null);
  }, [isBurgerMenuOpen]);

  const handleItemClick = (path, hasSubItems) => {
    if (hasSubItems) {
      setOpenSubmenu(openSubmenu === path ? null : path);
    } else {
      navigate(path);
      setIsBurgerMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 right-0 w-80 h-full bg-gray-800 transition-transform duration-300 pt-16 z-40 shadow-lg overflow-y-auto ${isBurgerMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
      <ul className="list-none">
        {menuStructure.map((section) => (
          <li key={section.id} className="border-b border-gray-600">
            <button onClick={() => handleItemClick(section.path, section.items.length > 1)} className="w-full flex items-center justify-between gap-3 p-4 text-white text-lg hover:bg-gray-700 text-left font-semibold">
              <span className="flex items-center gap-3"><section.icon className="w-5 h-5" />{section.label}</span>
              {section.items.length > 1 && <span className={`transform transition-transform duration-200 ${openSubmenu === section.path ? "rotate-90" : ""}`}>▶</span>}
            </button>
            {section.items.length > 1 && openSubmenu === section.path && (
              <ul className="bg-gray-700">
                {section.items.map((item) => (
                  <li key={item.id}>
                    <button onClick={() => handleItemClick(item.path, false)} className="w-full flex items-center gap-3 pl-12 pr-4 py-3 text-white text-sm hover:bg-gray-600 text-left">
                      {item.icon && <item.icon className="w-4 h-4" />}{item.label}
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

const Footer = ({ navigate }) => (
    <footer className="bg-gray-200 p-4 text-center text-sm text-gray-600 mt-auto">
        © 2025 - Mémoire DEC - Tous droits réservés
    </footer>
);

function MainApplicationContent() {
  const { isAuthenticated, login } = useAuth();
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const navigateRR = useNavigate();

  const navigate = (path) => {
    navigateRR(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsBurgerMenuOpen(false);
  };

  if (!isAuthenticated) {
    return <LoginForm onLogin={login} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header isBurgerMenuOpen={isBurgerMenuOpen} setIsBurgerMenuOpen={setIsBurgerMenuOpen} />
      <Navigation navigate={navigate} isBurgerMenuOpen={isBurgerMenuOpen} setIsBurgerMenuOpen={setIsBurgerMenuOpen} />
      <main className="flex-1 px-4 sm:px-8 py-8 max-w-6xl mx-auto w-full">
        <Routes>
          <Route path="/" element={<PlaceholderPage pageName="Accueil" navigate={navigate} />} />
          <Route path="/accueil" element={<PlaceholderPage pageName="Accueil" navigate={navigate} />} />
          <Route path="/outils" element={<PlaceholderPage pageName="Outils" navigate={navigate} />} />
          <Route path="/plan-comptable" element={<PlaceholderPage pageName="Plan Comptable" navigate={navigate} />} />
          <Route path="/tva-coefficient" element={<PlaceholderPage pageName="TVA, TS et Résultat Fiscal" navigate={navigate} />} />
          <Route path="/arbre" element={<PlaceholderPage pageName="Arbre à la décision" navigate={navigate} />} />
          <Route path="/statuts" element={<PlaceholderPage pageName="Générateur de statuts" navigate={navigate} />} />
          <Route path="/criteres-label" element={<PlaceholderPage pageName="Critères du Label" navigate={navigate} />} />
          <Route path="/budget-creation" element={<PlaceholderPage pageName="Budget de Création" navigate={navigate} />} />
          <Route path="/subventions" element={<PlaceholderPage pageName="Dossier de Subvention" navigate={navigate} />} />
          <Route path="/pret-subordonne" element={<PlaceholderPage pageName="Prêt Subordonné" navigate={navigate} />} />
          <Route path="/habilitation-taxe" element={<PlaceholderPage pageName="Habilitation Taxe d'Apprentissage" navigate={navigate} />} />
          <Route path="/prix-vente" element={<PlaceholderPage pageName="Prix de Vente" navigate={navigate} />} />
          <Route path="/rapport-adapte" element={<PlaceholderPage pageName="Rapport Adapté" navigate={navigate} />} />
          <Route path="/suivis" element={<PlaceholderPage pageName="Suivis" navigate={navigate} />} />
          <Route path="/suivi-subventions" element={<PlaceholderPage pageName="Suivi des Subventions" navigate={navigate} />} />
          <Route path="/suivi-prets" element={<PlaceholderPage pageName="Suivi des Prêts" navigate={navigate} />} />
          <Route path="/tableau-bord" element={<PlaceholderPage pageName="Tableau de Bord" navigate={navigate} />} />
          <Route path="/documentation" element={<PlaceholderPage pageName="Documentation" navigate={navigate} />} />
          <Route path="/cartographie" element={<PlaceholderPage pageName="Cartographie" navigate={navigate} />} />
          <Route path="/organigramme" element={<PlaceholderPage pageName="Organigramme" navigate={navigate} />} />
          <Route path="/entretiens" element={<PlaceholderPage pageName="Entretiens" navigate={navigate} />} />
          <Route path="/guide-tva" element={<PlaceholderPage pageName="Guide TVA" navigate={navigate} />} />
          <Route path="/etude-marche" element={<PlaceholderPage pageName="Étude de Marché" navigate={navigate} />} />
          <Route path="/contact-et-aide" element={<PlaceholderPage pageName="Contact & Aide" navigate={navigate} />} />
          <Route path="/expert-comptable" element={<PlaceholderPage pageName="Contact Expert-Comptable" navigate={navigate} />} />
          <Route path="/edp" element={<PlaceholderPage pageName="L'École de Production" navigate={navigate} />} />
          <Route path="/faq" element={<PlaceholderPage pageName="FAQ" navigate={navigate} />} />
          <Route path="/support" element={<PlaceholderPage pageName="Support" navigate={navigate} />} />
          <Route path="/contact" element={<PlaceholderPage pageName="Contact" navigate={navigate} />} />
          <Route path="*" element={<PlaceholderPage pageName="Page non trouvée" navigate={navigate} />} />
        </Routes>
      </main>
      <Footer navigate={navigate} />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router>
          <AnalyticsTracker />
          <MainApplicationContent />
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
