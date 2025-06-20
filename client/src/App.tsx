// client/src/App.tsx

import { Switch, Route } from "wouter";
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
import Calculators from "./pages/Calculators"; 
import BusinessPlan from "./pages/BusinessPlan";
import PartnershipTracker from "./pages/PartnershipTracker";
import PedagogicalCosts from "./pages/PedagogicalCosts";
import TrainingPlanner from "./pages/TrainingPlanner";
import SubsidyGenerator from "@/pages/SubsidyGenerator";
import StatutsGenerator from "@/pages/StatutsGenerator";
import UnderDevelopment from "@/pages/UnderDevelopment"; 
import Dashboard from "./pages/Dashboard";
import LocationAnalysis from "./pages/LocationAnalysis";
import Guides from "./pages/Guides";
import DocumentationPage from "./pages/DocumentationPage";
import Methodology from "./pages/Methodology";
import Annexes from "./pages/Annexes";
import Contact from "./pages/Contact";
import ResultatFiscal from "./pages/ResultatFiscal";
import TvaCoefficient from "./pages/TvaCoefficient";
import PlanComptable from "./pages/PlanComptable";
import CriteresLabel from "./pages/CriteresLabel";
import PretSubordonne from "./pages/PretSubordonne";
import HabilitationTaxe from "./pages/HabilitationTaxe";
import Entretiens from "./pages/Entretiens";
import Organigramme from "./pages/Organigramme";
import EtudeMarche from "./pages/EtudeMarche";
import GuideTva from "./pages/GuideTva";
import SuiviPrets from "./pages/SuiviPrets";
import SuiviSubventions from "./pages/SuiviSubventions"; 
import RapportAdapte from "./pages/RapportAdapte";
import PrixVenteProduits from "./pages/PrixVenteProduits";
import TableauCalculCout from "./pages/TableauCalculCout";
import BudgetCreation from "./pages/BudgetCreation";
import EcoleDeProduction from "./pages/EcoleDeProduction";
import ContactEtAide from "./pages/ContactEtAide"; 
import { useState, useEffect } from "react"; 
import { useAuth } from "./hooks/useAuth";

function MainApplicationContent() {
  const [currentPage, setCurrentPage] = useState("accueil");
  const { isAuthenticated, login } = useAuth();
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false); 

  useEffect(() => {
    console.log("App.tsx: isBurgerMenuOpen changed to", isBurgerMenuOpen);
  }, [isBurgerMenuOpen]);

  const navigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsBurgerMenuOpen(false); 
    console.log("App.tsx: Navigation triggered, closing menu.");
  };

  if (!isAuthenticated) {
    return <LoginForm onLogin={login} />;
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "accueil": return <Home navigate={navigate} />;
      case "outils": return <Tools navigate={navigate} />;
      case "suivis": return <Suivis navigate={navigate} />;
      case "arbre": return <Questionnaire navigate={navigate} />;
      case "documentation": return <DocumentationPage navigate={navigate} />;
      case "calculateurs": return <TableauCalculCout navigate={navigate} />; 
      case "budget-creation": return <BudgetCreation navigate={navigate} />; 
      case "business-plan": return <BusinessPlan navigate={navigate} />;
      case "partenariats": return <PartnershipTracker navigate={navigate} />;
      case "couts-pedagogiques": return <PedagogicalCosts navigate={navigate} />;
      case "planification": return <TrainingPlanner navigate={navigate} />;
      case 'subventions': return <SubsidyGenerator navigate={navigate} />;
      case 'statuts': return <StatutsGenerator navigate={navigate} />;
      case "tableau-bord": return <Dashboard navigate={navigate} />;
      case "cartographie": return <LocationAnalysis navigate={navigate} />;
      case "guides": return <Guides navigate={navigate} />;
      case "methodo": return <Methodology navigate={navigate} />;
      case "annexes": return <Annexes navigate={navigate} />;
      case "expert-comptable": return <Contact navigate={navigate} />; 
      case "resultat-fiscal": return <ResultatFiscal navigate={navigate} />;
      case "plan-comptable": return <PlanComptable navigate={navigate} />;
      case "tva-coefficient": return <TvaCoefficient navigate={navigate} />;
      case "edp": return <EcoleDeProduction navigate={navigate} />; 
      case "criteres-label": return <CriteresLabel navigate={navigate} />;
      case "pret-subordonne": return <PretSubordonne navigate={navigate} />;
      case "habilitation-taxe": return <HabilitationTaxe navigate={navigate} />; 
      case "entretiens": return <Entretiens navigate={navigate} />;
      case "organigramme": return <Organigramme navigate={navigate} />;
      case "etude-marche": return <EtudeMarche navigate={navigate} />;
      case "guide-tva": return <GuideTva navigate={navigate} />;
      case "suivi-prets": return <SuiviPrets navigate={navigate} />;
      case "suivi-subventions": return <SuiviSubventions navigate={navigate} />;
      case "rapport-adapte": return <RapportAdapte navigate={navigate} />;
      case "prix-vente": return <PrixVenteProduits navigate={navigate} />;
      
      case "contact-et-aide": return <ContactEtAide navigate={navigate} />;
      case "faq": return <UnderDevelopment title="Foire Aux Questions (FAQ)" navigate={navigate} />;
      case "support": return <UnderDevelopment title="Support Technique" navigate={navigate} />;
      case "contact": return <Contact navigate={navigate} />;

      default: return <Home navigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header isBurgerMenuOpen={isBurgerMenuOpen} setIsBurgerMenuOpen={setIsBurgerMenuOpen} />
      {/* CORRECTION ICI : Utilise isBurgerMenuOpen et setIsBurgerMenuOpen */}
      <Navigation navigate={navigate} isBurgerMenuOpen={isBurgerMenuOpen} setIsBurgerMenuOpen={setIsBurgerMenuOpen} />
      <main className="flex-1 px-8 py-8 max-w-6xl mx-auto w-full">
        {renderCurrentPage()}
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