// client/src/App.tsx

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// --- DÉBUT DES COMPOSANTS MOCK ---
// Pour que ce fichier soit autonome et ne plante pas, nous simulons ici
// l'existence des autres composants. Dans votre projet, les vrais fichiers
// seront importés à la place.

const queryClient = new QueryClient();

// Mocks pour les composants UI et hooks
const Toaster = () => <div className="hidden">Toaster</div>;
const TooltipProvider = ({ children }) => <>{children}</>;
const Header = ({ isBurgerMenuOpen, setIsBurgerMenuOpen }) => (
  <header className="bg-gray-800 text-white p-4 flex justify-between items-center sticky top-0 z-50">
    <h1 className="text-xl font-bold">École de Production</h1>
    <button onClick={() => setIsBurgerMenuOpen(!isBurgerMenuOpen)} className="md:hidden">
      Menu
    </button>
  </header>
);
const Navigation = ({ navigate, isBurgerMenuOpen, setIsBurgerMenuOpen }) => (
    <div className={`fixed top-0 right-0 h-full bg-gray-900 text-white w-64 transform transition-transform duration-300 z-40 ${isBurgerMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <p className="p-4">Menu de Navigation</p>
    </div>
);
const Footer = ({ navigate }) => <footer className="bg-gray-200 p-4 text-center text-sm">Footer</footer>;
const LoginForm = ({ onLogin }) => (
    <div className="flex items-center justify-center h-screen">
        <button onClick={onLogin} className="px-4 py-2 bg-blue-500 text-white rounded">Se Connecter</button>
    </div>
);
const AnalyticsTracker = () => {
    // Ce composant contiendrait la logique pour Google Analytics
    return null;
};
const useAuth = () => ({ isAuthenticated: true, login: () => console.log("Login...") });

// Mocks pour les pages (pour que les routes fonctionnent)
const PlaceholderPage = ({ pageName }) => <div className="p-8"><h1>{pageName}</h1><p>Contenu à venir...</p></div>;

const Home = ({ navigate }) => <PlaceholderPage pageName="Accueil" />;
const Tools = ({ navigate }) => <PlaceholderPage pageName="Outils" />;
const Suivis = ({ navigate }) => <PlaceholderPage pageName="Suivis" />;
const Questionnaire = ({ navigate }) => <PlaceholderPage pageName="Questionnaire" />;
const SubsidyGenerator = ({ navigate }) => <PlaceholderPage pageName="Générateur de Subventions" />;
const StatutsGenerator = ({ navigate }) => <PlaceholderPage pageName="Générateur de Statuts" />;
const UnderDevelopment = ({ title }) => <PlaceholderPage pageName={title} />;
const Dashboard = ({ navigate }) => <PlaceholderPage pageName="Tableau de Bord" />;
const LocationAnalysis = ({ navigate }) => <PlaceholderPage pageName="Cartographie" />;
const DocumentationPage = ({ navigate }) => <PlaceholderPage pageName="Documentation" />;
const Contact = ({ navigate }) => <PlaceholderPage pageName="Contact" />;
const ResultatFiscal = ({ navigate }) => <PlaceholderPage pageName="Résultat Fiscal" />;
const TvaCoefficient = ({ navigate }) => <PlaceholderPage pageName="Calcul TVA & TS" />;
const PlanComptable = ({ navigate }) => <PlaceholderPage pageName="Plan Comptable" />;
const CriteresLabel = ({ navigate }) => <PlaceholderPage pageName="Critères du Label" />;
const PretSubordonne = ({ navigate }) => <PlaceholderPage pageName="Prêt Subordonné" />;
const HabilitationTaxe = ({ navigate }) => <PlaceholderPage pageName="Habilitation Taxe d'Apprentissage" />;
const Entretiens = ({ navigate }) => <PlaceholderPage pageName="Entretiens" />;
const Organigramme = ({ navigate }) => <PlaceholderPage pageName="Organigramme" />;
const EtudeMarche = ({ navigate }) => <PlaceholderPage pageName="Étude de Marché" />;
const GuideTva = ({ navigate }) => <PlaceholderPage pageName="Guide TVA" />;
const SuiviPrets = ({ navigate }) => <PlaceholderPage pageName="Suivi des Prêts" />;
const SuiviSubventions = ({ navigate }) => <PlaceholderPage pageName="Suivi des Subventions" />;
const RapportAdapte = ({ navigate }) => <PlaceholderPage pageName="Rapport Adapté" />;
const PrixVenteProduits = ({ navigate }) => <PlaceholderPage pageName="Prix de Vente des Produits" />;
const TableauCalculCout = ({ navigate }) => <PlaceholderPage pageName="Tableau de Calcul de Coût" />;
const BudgetCreation = ({ navigate }) => <PlaceholderPage pageName="Budget de Création" />;
const EcoleDeProduction = ({ navigate }) => <PlaceholderPage pageName="L'École de Production" />;
const ContactEtAide = ({ navigate }) => <PlaceholderPage pageName="Contact & Aide" />;


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
      <main className="flex-1 px-4 sm:px-8 py-8 max-w-6xl mx-auto w-full">
        <Routes>
          {/* Routes conservées */}
          <Route path="/" element={<Home navigate={navigate} />} />
          <Route path="/accueil" element={<Home navigate={navigate} />} />

          {/* Outils */}
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
          <Route path="/prix-vente" element={<PrixVenteProduits navigate={navigate} />} />
          <Route path="/rapport-adapte" element={<RapportAdapte navigate={navigate} />} />
          
          {/* Suivis */}
          <Route path="/suivis" element={<Suivis navigate={navigate} />} />
          <Route path="/suivi-subventions" element={<SuiviSubventions navigate={navigate} />} />
          <Route path="/suivi-prets" element={<SuiviPrets navigate={navigate} />} />
          <Route path="/tableau-bord" element={<Dashboard navigate={navigate} />} />

          {/* Documentation & Guides */}
          <Route path="/documentation" element={<DocumentationPage navigate={navigate} />} />
          <Route path="/cartographie" element={<LocationAnalysis navigate={navigate} />} />
          <Route path="/organigramme" element={<Organigramme navigate={navigate} />} />
          <Route path="/entretiens" element={<Entretiens navigate={navigate} />} />
          <Route path="/guide-tva" element={<GuideTva navigate={navigate} />} />
          <Route path="/etude-marche" element={<EtudeMarche navigate={navigate} />} />

          {/* Contact & Aide */}
          <Route path="/contact-et-aide" element={<ContactEtAide navigate={navigate} />} />
          <Route path="/expert-comptable" element={<Contact navigate={navigate} />} />
          <Route path="/edp" element={<EcoleDeProduction navigate={navigate} />} />
          <Route path="/faq" element={<UnderDevelopment title="Foire Aux Questions (FAQ)" />} />
          <Route path="/support" element={<UnderDevelopment title="Support Technique" />} />
          <Route path="/contact" element={<Contact navigate={navigate} />} />
          
          {/* Route par défaut (404 ou redirige vers l'accueil) */}
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
