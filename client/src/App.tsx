// client/src/App.tsx

import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";
import Home from "./pages/Home";
import Tools from "./pages/Tools";
import Suivis from "./pages/Suivis";
import Questionnaire from "./pages/Questionnaire";
import SubsidyGenerator from "@/pages/SubsidyGenerator";
import StatutsGenerator from "./pages/StatutsGenerator";
import UnderDevelopment from "@/pages/UnderDevelopment";
import Dashboard from "./pages/Dashboard";
import LocationAnalysis from "./pages/LocationAnalysis";
import DocumentationPage from "./pages/DocumentationPage";
import Methodology from "./pages/Methodology";
import Contact from "./pages/Contact";
import ResultatFiscal from "./pages/ResultatFiscal";
import TvaCoefficient from "./pages/TvaCoefficient";
import PlanComptable from "./pages/PlanComptable";
import CriteresLabel from "./pages/CriteresLabel";
import PretSubordonne from "./pages/PretSubordonne"; // Ajout de l'import pour PretSubordonne
import { useState } from "react";
import { useAuth } from "./hooks/useAuth";
import AnalyticsTracker from './components/AnalyticsTracker'; 

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
          <Route path="/suivis" element={<Suivis navigate={navigate} />} />
          <Route path="/suivi-subventions" element={<SuiviSubventions navigate={navigate} />} />
          <Route path="/suivi-prets" element={<SuiviPrets navigate={navigate} />} />
          <Route path="/documentation" element={<DocumentationPage navigate={navigate} />} />
          <Route path="/methodo" element={<Methodology navigate={navigate} />} />
          <Route path="/cartographie" element={<LocationAnalysis navigate={navigate} />} />
          <Route path="/organigramme" element={<Organigramme navigate={navigate} />} />
          <Route path="/entretiens" element={<Entretiens navigate={navigate} />} />
          <Route path="/guide-tva" element={<GuideTva navigate={navigate} />} />
          <Route path="/etude-marche" element={<EtudeMarche navigate={navigate} />} />
          <Route path="/pret-subordonne" element={<PretSubordonne navigate={navigate} />} /> {/* Ajout de la route pour PretSubordonne */}
          
          {/* Les autres routes du dernier lot sont commentées pour l'instant */}
          {/*
          <Route path="/habilitation-taxe" element={<HabilitationTaxe navigate={navigate} />} />
          <Route path="/calculateurs" element={<TableauCalculCout navigate={navigate} />} />
          <Route path="/prix-vente" element={<PrixVenteProduits navigate={navigate} />} />
          <Route path="/rapport-adapte" element={<RapportAdapte navigate={navigate} />} />
          <Route path="/contact-et-aide" element={<ContactEtAide navigate={navigate} />} />
          <Route path="/expert-comptable" element={<Contact navigate={navigate} />} />
          <Route path="/edp" element={<EcoleDeProduction navigate={navigate} />} />
          <Route path="/faq" element={<UnderDevelopment title="Foire Aux Questions (FAQ)" navigate={navigate} />} />
          <Route path="/support" element={<UnderDevelopment title="Support Technique" navigate={navigate} />} />
          <Route path="/contact" element={<Contact navigate={navigate} />} />
          <Route path="/business-plan" element={<BusinessPlan navigate={navigate} />} />
          <Route path="/couts-pedagogiques" element={<PedagogicalCosts navigate={navigate} />} />
          <Route path="/planification" element={<TrainingPlanner navigate={navigate} />} />
          <Route path="/calculateurs" element={<Calculators navigate={navigate} />} />
          <Route path="/guides" element={<Guides navigate={navigate} />} />
          <Route path="/annexes" element={<Annexes navigate={navigate} />} />
          */}
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