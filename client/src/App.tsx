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
import EtudeMarche from "./pages/EtudeMarche"; // Nouveau : Import de la page EtudeMarche
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
      case "calculateurs": return <Calculators navigate={navigate} />;
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
      case "edp": return <Contact navigate={navigate} />;
      case "budget-creation": return <Calculators navigate={navigate} />;
      case "criteres-label": return <CriteresLabel navigate={navigate} />;
      case "pret-subordonne": return <PretSubordonne navigate={navigate} />;
      case "habilitation-taxe": return <HabilitationTaxe navigate={navigate} />;
      case "entretiens": return <Entretiens navigate={navigate} />;
      case "organigramme": return <Organigramme navigate={navigate} />;
      // Les pages dupliquées ci-dessous ont été supprimées pour plus de clarté
      // case "calculateurs": return <Calculators navigate={navigate} />; // Duplicata
      // case "business-plan": return <BusinessPlan navigate={navigate} />; // Duplicata
      // ... (autres duplicatas)

      // Nouvelle page "etude-marche"
      case "etude-marche": return <EtudeMarche navigate={navigate} />;
      
      // Pages en cours de développement (maintenant que "etude-marche" est gérée)
      case "prix-vente": return <UnderDevelopment title="Prix de vente des produits" navigate={navigate} />;
      case "rapport-adapte": return <UnderDevelopment title="Modèle de rapport adapté" navigate={navigate} />;
      case "suivi-subventions": return <UnderDevelopment title="Suivi des subventions" navigate={navigate} />;
      case "suivi-prets": return <UnderDevelopment title="Suivi des prêts" navigate={navigate} />;
      case "guide-tva": return <UnderDevelopment title="Guide d'application de la TVA" navigate={navigate} />;
      // case "etude-marche": return <UnderDevelopment title="Étude de marché" navigate={navigate} />; // Ancien et supprimé

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