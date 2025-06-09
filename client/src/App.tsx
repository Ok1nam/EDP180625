import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import FloatingSave from "./components/FloatingSave";
import Home from "./pages/Home";
import Tools from "./pages/Tools";
import Questionnaire from "./pages/Questionnaire";
import Calculators from "./pages/Calculators";
import BusinessPlan from "./pages/BusinessPlan";
import Rentability from "./pages/Rentability";
import PartnershipTracker from "./pages/PartnershipTracker";
import Guides from "./pages/Guides";
import Methodology from "./pages/Methodology";
import Annexes from "./pages/Annexes";
import Contact from "./pages/Contact";
import { useState } from "react";

function Router() {
  const [currentPage, setCurrentPage] = useState("accueil");

  const navigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "accueil": return <Home navigate={navigate} />;
      case "outils": return <Tools navigate={navigate} />;
      case "arbre": return <Questionnaire navigate={navigate} />;
      case "calculateurs": return <Calculators />;
      case "business-plan": return <BusinessPlan />;
      case "rentabilite": return <Rentability />;
      case "partenariats": return <PartnershipTracker />;
      case "guides": return <Guides />;
      case "methodo": return <Methodology />;
      case "annexes": return <Annexes />;
      case "apropos": return <Contact />;
      default: return <Home navigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Navigation navigate={navigate} />
      <main className="flex-1 px-8 py-8 max-w-6xl mx-auto w-full">
        {renderCurrentPage()}
      </main>
      <Footer navigate={navigate} />
      <FloatingSave />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
