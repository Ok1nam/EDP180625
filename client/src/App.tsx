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
import { useState } from "react";
import { useAuth } from "./hooks/useAuth";

function MainApplicationContent() {
  const [currentPage, setCurrentPage] = useState("accueil");
  const { isAuthenticated, login } = useAuth();
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  const navigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsBurgerMenuOpen(false);
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
      case "calculateurs": return <Calculators navigate={navigate} />; // Passer navigate
      case "business-plan": return <BusinessPlan navigate={navigate} />; // Passer navigate
      case "partenariats": return <PartnershipTracker navigate={navigate} />; // Passer navigate
      case "couts-pedagogiques": return <PedagogicalCosts navigate={navigate} />; // Passer navigate
      case "planification": return <TrainingPlanner navigate={navigate} />; // Passer navigate
      case 'subventions': return <SubsidyGenerator navigate={navigate} />; // Passer navigate
      case 'statuts': return <StatutsGenerator navigate={navigate} />; // Passer navigate
      case "tableau-bord": return <Dashboard navigate={navigate} />; // Passer navigate
      case "cartographie": return <LocationAnalysis navigate={navigate} />; // Passer navigate
      case "guides": return <Guides navigate={navigate} />; // Passer navigate
      case "methodo": return <Methodology navigate={navigate} />; // Passer navigate
      case "annexes": return <Annexes navigate={navigate} />; // Passer navigate
      case "expert-comptable": return <Contact navigate={navigate} />; // Si Contact est ici, passer navigate
      case "resultat-fiscal": return <ResultatFiscal navigate={navigate} />; // Passer navigate
      case "plan-comptable": return <PlanComptable navigate={navigate} />; // Passer navigate
      case "tva-coefficient": return <TvaCoefficient navigate={navigate} />; // Passer navigate
      case "edp": return <Contact navigate={navigate} />; // Passer navigate
      case "budget-creation": return <Calculators navigate={navigate} />; // Passer navigate
      case "criteres-label": return <CriteresLabel navigate={navigate} />; // Passer navigate
      case "pret-subordonne": return <PretSubordonne navigate={navigate} />; // Passer navigate
      case "habilitation-taxe": return <HabilitationTaxe navigate={navigate} />; // Passer navigate
      case "entretiens": return <Entretiens navigate={navigate} />; // Passer navigate
      case "organigramme": return <Organigramme navigate={navigate} />; // Passer navigate

      // Pages en cours de développement (Vérifier si elles ont des props navigate si elles deviennent de vraies pages)
      case "prix-vente": return <UnderDevelopment title="Prix de vente des produits" navigate={navigate} />; // Passer navigate si vous utilisez la prop dans UnderDevelopment
      case "rapport-adapte": return <UnderDevelopment title="Modèle de rapport adapté" navigate={navigate} />; // Passer navigate
      case "suivi-subventions": return <UnderDevelopment title="Suivi des subventions" navigate={navigate} />;
      case "suivi-prets": return <UnderDevelopment title="Suivi des prêts" navigate={navigate} />;
      case "guide-tva": return <UnderDevelopment title="Guide d'application de la TVA" navigate={navigate} />;
      case "etude-marche": return <UnderDevelopment title="Étude de marché" navigate={navigate} />;
      
      default: return <Home navigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header isMenuOpen={isBurgerMenuOpen} setIsMenuOpen={setIsBurgerMenuOpen} />
      <Navigation navigate={navigate} isMenuOpen={isBurgerMenuOpen} setIsMenuOpen={setIsBurgerMenuOpen} />
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