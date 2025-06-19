// client/src/App.tsx

import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query"; // Gardez cet import
import { queryClient } from "./lib/queryClient"; // Gardez cet import
import { Toaster } from "@/components/ui/toaster"; // Gardez cet import
import { TooltipProvider } from "@/components/ui/tooltip"; // Gardez cet import
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
// import FloatingSave from "./components/FloatingSave"; // Cette ligne est maintenant supprimée
import LoginForm from "./components/LoginForm";
import Home from "./pages/Home";
import Tools from "./pages/Tools";
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
import { useState } from "react"; // Gardez cet import
import { useAuth } from "./hooks/useAuth";

// Renommez la fonction Router en Root ou MainApp pour plus de clarté
// C'est le composant qui contiendra toute votre application
function MainApplicationContent() { // Renommé de Router à MainApplicationContent
  const [currentPage, setCurrentPage] = useState("accueil");
  const { isAuthenticated, login } = useAuth();
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false); // État du menu burger

  const navigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsBurgerMenuOpen(false); // Ferme le menu burger lors de la navigation
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
      case "calculateurs": return <Calculators />;
      case "business-plan": return <BusinessPlan />;
      case "partenariats": return <PartnershipTracker />;
      case "couts-pedagogiques": return <PedagogicalCosts />;
      case "planification": return <TrainingPlanner />;
      case 'subventions': return <SubsidyGenerator />;
      case 'statuts': return <StatutsGenerator />;
      case "tableau-bord": return <Dashboard />;
      case "cartographie": return <LocationAnalysis />;
      case "guides": return <Guides />;
      case "methodo": return <Methodology />;
      case "annexes": return <Annexes />;
      case "expert-comptable": 
      case "resultat-fiscal": return <ResultatFiscal />;
      case "plan-comptable": return <PlanComptable />;
      case "tva-coefficient": return <TvaCoefficient />;
      case "edp": return <Contact />;
      case "budget-creation": return <Calculators />;
      case "criteres-label": return <CriteresLabel />;
      case "pret-subordonne": return <PretSubordonne />;
     case "habilitation-taxe": return <HabilitationTaxe />;
     case "entretiens": return <Entretiens />;
     case "organigramme": return <Organigramme />;

      // Pages en cours de développement
    
      case "prix-vente": return <UnderDevelopment title="Prix de vente des produits" />;
      case "rapport-adapte": return <UnderDevelopment title="Modèle de rapport adapté" />;
      case "suivi-subventions": return <UnderDevelopment title="Suivi des subventions" />;
      case "suivi-prets": return <UnderDevelopment title="Suivi des prêts" />;
  
      case "guide-tva": return <UnderDevelopment title="Guide d'application de la TVA" />;
      case "etude-marche": return <UnderDevelopment title="Étude de marché" />;
      
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

// Le composant App englobe maintenant MainApplicationContent avec tous les Providers
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <MainApplicationContent /> {/* ICI : On rend le composant qui contient le Header, Navigation, etc. */}
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;