// client/src/App.tsx

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// --- DÉBUT DES COMPOSANTS MOCK ---
// Pour résoudre les erreurs d'importation, nous créons des versions simplifiées
// des composants et des pages directement dans ce fichier.

const queryClient = new QueryClient();

// Mocks pour les composants UI et hooks
const Toaster = () => <div className="toaster-placeholder">Toasts</div>;
const TooltipProvider = ({ children }) => <>{children}</>;
const Header = ({ isBurgerMenuOpen, setIsBurgerMenuOpen }) => (
  <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
    <h1>Header</h1>
    <button onClick={() => setIsBurgerMenuOpen(!isBurgerMenuOpen)}>Menu</button>
  </header>
);
const Navigation = ({ navigate, isBurgerMenuOpen }) => (
  <nav className={`bg-gray-700 text-white w-64 h-full fixed top-0 left-0 transform ${isBurgerMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform`}>
    <ul className="p-4">
      <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/accueil'); }}>Accueil</a></li>
      <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/outils'); }}>Outils</a></li>
    </ul>
  </nav>
);
const Footer = ({ navigate }) => <footer className="bg-gray-800 text-white p-4 text-center">Footer</footer>;
const LoginForm = ({ onLogin }) => (
  <div className="p-4">
    <h2>Login</h2>
    <button onClick={onLogin}>Log In</button>
  </div>
);
const AnalyticsTracker = () => null; // Mock pour le suivi analytique

// Mocks pour les pages restantes
const Home = ({ navigate }) => <div><h1>Page d'Accueil</h1></div>;
const Tools = ({ navigate }) => <div><h1>Page Outils</h1></div>;
const Suivis = ({ navigate }) => <div><h1>Page Suivis</h1></div>;
const Questionnaire = ({ navigate }) => <div><h1>Page Questionnaire</h1></div>;
const SubsidyGenerator = ({ navigate }) => <div><h1>Page SubsidyGenerator</h1></div>;
const StatutsGenerator = ({ navigate }) => <div><h1>Page StatutsGenerator</h1></div>;
const UnderDevelopment = ({ title, navigate }) => <div><h1>Page en développement : {title}</h1></div>;
const Dashboard = ({ navigate }) => <div><h1>Page Dashboard</h1></div>;
const LocationAnalysis = ({ navigate }) => <div><h1>Page LocationAnalysis</h1></div>;
const DocumentationPage = ({ navigate }) => <div><h1>Page Documentation</h1></div>;
const Contact = ({ navigate }) => <div><h1>Page Contact</h1></div>;
const ResultatFiscal = ({ navigate }) => <div><h1>Page ResultatFiscal</h1></div>;
const TvaCoefficient = ({ navigate }) => <div><h1>Page TvaCoefficient</h1></div>;
const PlanComptable = ({ navigate }) => <div><h1>Page PlanComptable</h1></div>;
const CriteresLabel = ({ navigate }) => <div><h1>Page CriteresLabel</h1></div>;
const PretSubordonne = ({ navigate }) => <div><h1>Page PretSubordonne</h1></div>;
const HabilitationTaxe = ({ navigate }) => <div><h1>Page HabilitationTaxe</h1></div>;
const Entretiens = ({ navigate }) => <div><h1>Page Entretiens</h1></div>;
const Organigramme = ({ navigate }) => <div><h1>Page Organigramme</h1></div>;
const EtudeMarche = ({ navigate }) => <div><h1>Page EtudeMarche</h1></div>;
const GuideTva = ({ navigate }) => <div><h1>Page GuideTva</h1></div>;
const SuiviPrets = ({ navigate }) => <div><h1>Page SuiviPrets</h1></div>;
const SuiviSubventions = ({ navigate }) => <div><h1>Page SuiviSubventions</h1></div>;
const RapportAdapte = ({ navigate }) => <div><h1>Page RapportAdapte</h1></div>;
const PrixVenteProduits = ({ navigate }) => <div><h1>Page PrixVenteProduits</h1></div>;
const TableauCalculCout = ({ navigate }) => <div><h1>Page TableauCalculCout</h1></div>;
const BudgetCreation = ({ navigate }) => <div><h1>Page BudgetCreation</h1></div>;
const EcoleDeProduction = ({ navigate }) => <div><h1>Page EcoleDeProduction</h1></div>;
const ContactEtAide = ({ navigate }) => <div><h1>Page ContactEtAide</h1></div>;

// Mock pour le hook d'authentification
const useAuth = () => ({
  isAuthenticated: true, // Simule un utilisateur authentifié
  login: () => console.log("Login action"),
});

// --- FIN DES COMPOSANTS MOCK ---

function MainApplicationContent() {
  const { isAuthenticated, login } = useAuth();
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const navigateRR = useNavigate();

  const navigate = (path: string) => {
    navigateRR(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsBurgerMenuOpen(false);
  };

  if (!isAuthenticated) {
    return <LoginForm onLogin={login} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header isBurgerMenuOpen={isBurgerMenuOpen} setIsBurgerMenuOpen={setIsBurgerMenuOpen} />
      <Navigation navigate={navigate} isBurgerMenuOpen={isBurgerMenuOpen} setIsBurgerMenuOpen={setIsBurgerMenuOpen} />
      <main className="flex-1 px-8 py-8 max-w-6xl mx-auto w-full">
        <Routes>
          {/* Routes conservées */}
          <Route path="/" element={<Home navigate={navigate} />} />
          <Route path="/accueil" element={<Home navigate={navigate} />} />
          <Route path="/outils" element={<Tools navigate={navigate} />} />
          <Route path="/plan-comptable" element={<PlanComptable navigate={navigate} />} />
          <Route path="/tva-coefficient" element={<TvaCoefficient navigate={navigate} />} />
          <Route path="/resultat-fiscal" element={<ResultatFiscal navigate={navigate} />} />
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
          <Route path="/suivis" element={<Suivis navigate={navigate} />} />
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
          <Route path="/faq" element={<UnderDevelopment title="Foire Aux Questions (FAQ)" navigate={navigate} />} />
          <Route path="/support" element={<UnderDevelopment title="Support Technique" navigate={navigate} />} />
          <Route path="/contact" element={<Contact navigate={navigate} />} />
          
          {/* Route par défaut */}
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
