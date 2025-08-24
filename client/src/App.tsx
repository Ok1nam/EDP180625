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
import PlanComptable from "./pages/PlanComptable";
import TvaCoefficient from "./pages/TvaCoefficient";
import ResultatFiscal from "./pages/ResultatFiscal"; // Ajout de l'import pour ResultatFiscal
import Questionnaire from "./pages/Questionnaire"; // Ajout de l'import pour Questionnaire
import StatutsGenerator from "./pages/StatutsGenerator"; // Ajout de l'import pour StatutsGenerator
import CriteresLabel from "./pages/CriteresLabel"; // Ajout de l'import pour CriteresLabel
import BudgetCreation from "./pages/BudgetCreation"; // Ajout de l'import pour BudgetCreation
import SubsidyGenerator from "@/pages/SubsidyGenerator"; // Ajout de l'import pour SubsidyGenerator
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
          <Route path="/resultat-fiscal" element={<ResultatFiscal navigate={navigate} />} /> {/* Ajout de la route pour ResultatFiscal */}
          <Route path="/arbre" element={<Questionnaire navigate={navigate} />} /> {/* Ajout de la route pour Questionnaire */}
          <Route path="/statuts" element={<StatutsGenerator navigate={navigate} />} /> {/* Ajout de la route pour StatutsGenerator */}
          <Route path="/criteres-label" element={<CriteresLabel navigate={navigate} />} /> {/* Ajout de la route pour CriteresLabel */}
          <Route path="/budget-creation" element={<BudgetCreation navigate={navigate} />} /> {/* Ajout de la route pour BudgetCreation */}
          <Route path="/subventions" element={<SubsidyGenerator navigate={navigate} />} /> {/* Ajout de la route pour SubsidyGenerator */}
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