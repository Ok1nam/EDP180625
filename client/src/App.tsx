// client/src/App.tsx

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Initialisation de React Query Client
const queryClient = new QueryClient();

// --- Composants de remplacement (placeholders) ---
// Ces composants remplacent les fichiers externes qui n'ont pas pu être trouvés.

const Header = ({ isBurgerMenuOpen, setIsBurgerMenuOpen }) => (
  <header className="bg-gray-800 text-white p-4 text-center">
    <h1>Header</h1>
    <button onClick={() => setIsBurgerMenuOpen(!isBurgerMenuOpen)} className="md:hidden">Menu</button>
  </header>
);

const Navigation = ({ navigate, isBurgerMenuOpen }) => (
  <nav className={`bg-gray-700 text-white p-4 ${isBurgerMenuOpen ? 'block' : 'hidden'} md:block`}>
    <ul className="flex flex-col md:flex-row justify-center gap-4">
      <li><button onClick={() => navigate('/accueil')} className="hover:underline">Accueil</button></li>
      <li><button onClick={() => navigate('/outils')} className="hover:underline">Outils</button></li>
      <li><button onClick={() => navigate('/documentation')} className="hover:underline">Documentation</button></li>
      <li><button onClick={() => navigate('/contact-et-aide')} className="hover:underline">Contact</button></li>
    </ul>
  </nav>
);

const Footer = ({ navigate }) => (
  <footer className="bg-gray-800 text-white p-4 text-center mt-auto">
    <p>Footer</p>
  </footer>
);

const AnalyticsTracker = () => {
  // Ce composant peut rester vide pour la correction des erreurs d'importation.
  return null;
};

// --- Pages de remplacement (placeholders) ---
const createPlaceholderPage = (name) => ({ navigate }) => (
    <div className="p-4 border rounded-lg bg-gray-50">
        <h2 className="text-2xl font-bold mb-2">{name}</h2>
        <p>Contenu de la page "{name}".</p>
        <button onClick={() => navigate('/accueil')} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Retour à l'accueil</button>
    </div>
);

const Home = createPlaceholderPage("Accueil");
const Tools = createPlaceholderPage("Page Outils");
const Questionnaire = createPlaceholderPage("Arbre à la Décision");
const SubsidyGenerator = createPlaceholderPage("Dossier Type Subvention");
const StatutsGenerator = createPlaceholderPage("Modèle Statuts");
const Dashboard = createPlaceholderPage("Tableau de Bord");
const LocationAnalysis = createPlaceholderPage("Cartographie");
const DocumentationPage = createPlaceholderPage("Page Documentation");
const Contact = createPlaceholderPage("Contact Expert Comptable");
const TvaCoefficient = createPlaceholderPage("Coefficient TVA");
const PlanComptable = createPlaceholderPage("Plan Comptable");
const CriteresLabel = createPlaceholderPage("Labellisation");
const PretSubordonne = createPlaceholderPage("Prêt Subordonné");
const HabilitationTaxe = createPlaceholderPage("Taxe Apprentissage");
const Entretiens = createPlaceholderPage("Entretiens");
const Organigramme = createPlaceholderPage("Organigramme");
const EtudeMarche = createPlaceholderPage("Étude de Marché");
const GuideTva = createPlaceholderPage("Guide TVA");
const SuiviPrets = createPlaceholderPage("Suivi des Prêts");
const SuiviSubventions = createPlaceholderPage("Suivi des Subventions");
const RapportAdapte = createPlaceholderPage("Rapport Adapté");
const PrixVenteProduits = createPlaceholderPage("Tableau Prix de Vente des Produits");
const TableauCalculCout = createPlaceholderPage("Tableau Calcul de Coût");
const BudgetCreation = createPlaceholderPage("Budget de Création");
const EcoleDeProduction = createPlaceholderPage("Contact EDP");
const ContactEtAide = createPlaceholderPage("Page Contact et Aide");

// --- Composants de l'interface utilisateur (remplacés par des fragments) ---
const Toaster = () => <div id="toaster-placeholder" />;
const TooltipProvider = ({ children }) => <>{children}</>;


function MainApplicationContent() {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const navigateRR = useNavigate();

  const navigate = (path) => {
    navigateRR(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsBurgerMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header isBurgerMenuOpen={isBurgerMenuOpen} setIsBurgerMenuOpen={setIsBurgerMenuOpen} />
      <Navigation navigate={navigate} isBurgerMenuOpen={isBurgerMenuOpen} setIsBurgerMenuOpen={setIsBurgerMenuOpen} />
      <main className="flex-1 px-4 sm:px-8 py-8 max-w-6xl mx-auto w-full">
        <Routes>
          <Route path="/" element={<Home navigate={navigate} />} />
          <Route path="/accueil" element={<Home navigate={navigate} />} />
          <Route path="/outils" element={<Tools navigate={navigate} />} />
          <Route path="/plan-comptable" element={<PlanComptable navigate={navigate} />} />
          <Route path="/tva-coefficient" element={<TvaCoefficient navigate={navigate} />} />
          <Route path="/arbre" element={<Questionnaire navigate={navigate} />} />
          <Route path="/statuts" element={<StatutsGenerator navigate={navigate} />} />
          <Route path="/criteres-label" element={<CriteresLabel navigate={navigate} />} />
          <Route path="/budget-creation" element={<BudgetCreation navigate={navigate} />} />
          <Route path="/subventions" element={<SubsidyGenerator navigate={navigate} />} />
          <Route path="/pret-subordonne" element={<PretSubordonne navigate={navigate} />} />
          <Route path="/habilitation-taxe" element={<HabilitationTaxe navigate={navigate} />} />
          <Route path="/calculateurs" element={<TableauCalculCout navigate={navigate} />} />
          <Route path="/prix-vente" element={<PrixVenteProduits navigate={navigate} />} />
          <Route path="/rapport-adapte" element={<RapportAdapte navigate={navigate} />} />
          <Route path="/suivi-subventions" element={<SuiviSubventions navigate={navigate} />} />
          <Route path="/suivi-prets" element={<SuiviPrets navigate={navigate} />} />
          <Route path="/tableau-bord" element={<Dashboard navigate={navigate} />} />
          <Route path="/documentation" element={<DocumentationPage navigate={navigate} />} />
          <Route path="/cartographie" element={<LocationAnalysis navigate={navigate} />} />
          <Route path="/organigramme" element={<Organigramme navigate={navigate} />} />
          <Route path="/entretiens" element={<Entretiens navigate={navigate} />} />
          <Route path="/guide-tva" element={<GuideTva navigate={navigate} />} />
          <Route path="/etude-marche" element={<EtudeMarche navigate={navigate} />} />
          <Route path="/contact-et-aide" element={<ContactEtAide navigate={navigate} />} />
          <Route path="/expert-comptable" element={<Contact navigate={navigate} />} />
          <Route path="/edp" element={<EcoleDeProduction navigate={navigate} />} />
          <Route path="/contact" element={<Contact navigate={navigate} />} />
          <Route path="*" element={<Home navigate={navigate} />} />
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

