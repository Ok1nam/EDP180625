// client/src/App.tsx

import React, { useState } from 'react';
import { Switch, Route, useLocation, Link } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// --- DÉBUT DES COMPOSANTS MOCK ---
// Pour résoudre les erreurs d'importation, nous créons des versions simplifiées
// des composants, pages et hooks directement dans ce fichier.

const queryClient = new QueryClient();

// Mocks pour les composants UI et hooks
const Toaster = () => <div>Toaster Placeholder</div>;
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

// Mocks pour les pages
const Home = ({ navigate }) => <div><h1>Page d'Accueil</h1></div>;
const Tools = ({ navigate }) => <div><h1>Page Outils</h1></div>;
const Suivis = ({ navigate }) => <div><h1>Page Suivis</h1></div>;
const Questionnaire = ({ navigate }) => <div><h1>Page Questionnaire</h1></div>;
const Calculators = ({ navigate }) => <div><h1>Page Calculators</h1></div>;
const BusinessPlan = ({ navigate }) => <div><h1>Page BusinessPlan</h1></div>;
const PartnershipTracker = ({ navigate }) => <div><h1>Page PartnershipTracker</h1></div>;
const PedagogicalCosts = ({ navigate }) => <div><h1>Page PedagogicalCosts</h1></div>;
const TrainingPlanner = ({ navigate }) => <div><h1>Page TrainingPlanner</h1></div>;
const SubsidyGenerator = ({ navigate }) => <div><h1>Page SubsidyGenerator</h1></div>;
const StatutsGenerator = ({ navigate }) => <div><h1>Page StatutsGenerator</h1></div>;
const UnderDevelopment = ({ title, navigate }) => <div><h1>Page en développement : {title}</h1></div>;
const Dashboard = ({ navigate }) => <div><h1>Page Dashboard</h1></div>;
const LocationAnalysis = ({ navigate }) => <div><h1>Page LocationAnalysis</h1></div>;
const DocumentationPage = ({ navigate }) => <div><h1>Page Documentation</h1></div>;
const Methodology = ({ navigate }) => <div><h1>Page Methodology</h1></div>;
const Contact = ({ navigate }) => <div><h1>Page Contact</h1></div>;
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
  const [, setLocation] = useLocation();

  const navigate = (path: string) => {
    setLocation(path);
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
        <Switch>
          <Route path="/" component={() => <Home navigate={navigate} />} />
          <Route path="/accueil" component={() => <Home navigate={navigate} />} />
          <Route path="/outils" component={() => <Tools navigate={navigate} />} />
          <Route path="/plan-comptable" component={() => <PlanComptable navigate={navigate} />} />
          <Route path="/tva-coefficient" component={() => <TvaCoefficient navigate={navigate} />} />
          <Route path="/arbre" component={() => <Questionnaire navigate={navigate} />} />
          <Route path="/statuts" component={() => <StatutsGenerator navigate={navigate} />} />
          <Route path="/criteres-label" component={() => <CriteresLabel navigate={navigate} />} />
          <Route path="/budget-creation" component={() => <BudgetCreation navigate={navigate} />} />
          <Route path="/subventions" component={() => <SubsidyGenerator navigate={navigate} />} />
          <Route path="/pret-subordonne" component={() => <PretSubordonne navigate={navigate} />} />
          <Route path="/habilitation-taxe" component={() => <HabilitationTaxe navigate={navigate} />} />
          <Route path="/calculateurs" component={() => <TableauCalculCout navigate={navigate} />} />
          <Route path="/prix-vente" component={() => <PrixVenteProduits navigate={navigate} />} />
          <Route path="/rapport-adapte" component={() => <RapportAdapte navigate={navigate} />} />
          <Route path="/suivis" component={() => <Suivis navigate={navigate} />} />
          <Route path="/suivi-subventions" component={() => <SuiviSubventions navigate={navigate} />} />
          <Route path="/suivi-prets" component={() => <SuiviPrets navigate={navigate} />} />
          <Route path="/partenariats" component={() => <PartnershipTracker navigate={navigate} />} />
          <Route path="/tableau-bord" component={() => <Dashboard navigate={navigate} />} />
          <Route path="/documentation" component={() => <DocumentationPage navigate={navigate} />} />
          <Route path="/methodo" component={() => <Methodology navigate={navigate} />} />
          <Route path="/cartographie" component={() => <LocationAnalysis navigate={navigate} />} />
          <Route path="/organigramme" component={() => <Organigramme navigate={navigate} />} />
          <Route path="/entretiens" component={() => <Entretiens navigate={navigate} />} />
          <Route path="/guide-tva" component={() => <GuideTva navigate={navigate} />} />
          <Route path="/etude-marche" component={() => <EtudeMarche navigate={navigate} />} />
          <Route path="/contact-et-aide" component={() => <ContactEtAide navigate={navigate} />} />
          <Route path="/expert-comptable" component={() => <Contact navigate={navigate} />} /> 
          <Route path="/edp" component={() => <EcoleDeProduction navigate={navigate} />} /> 
          <Route path="/faq" component={() => <UnderDevelopment title="Foire Aux Questions (FAQ)" navigate={navigate} />} />
          <Route path="/support" component={() => <UnderDevelopment title="Support Technique" navigate={navigate} />} />
          <Route path="/contact" component={() => <Contact navigate={navigate} />} />
          <Route path="/business-plan" component={() => <BusinessPlan navigate={navigate} />} />
          <Route path="/couts-pedagogiques" component={() => <PedagogicalCosts navigate={navigate} />} />
          <Route path="/planification" component={() => <TrainingPlanner navigate={navigate} />} />
          <Route>
            {() => <Home navigate={navigate} />}
          </Route>
        </Switch>
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
        <MainApplicationContent />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
