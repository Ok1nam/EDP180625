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
// Importez toutes vos pages ici
import Home from "./pages/Home";
import Tools from "./pages/Tools";
import Suivis from "./pages/Suivis";
import Questionnaire from "./pages/Questionnaire";
// Pages retirées : Calculators, BusinessPlan, PartnershipTracker, PedagogicalCosts, TrainingPlanner
import SubsidyGenerator from "@/pages/SubsidyGenerator";
import StatutsGenerator from "@/pages/StatutsGenerator";
import UnderDevelopment from "@/pages/UnderDevelopment";
import Dashboard from "./pages/Dashboard";
import LocationAnalysis from "./pages/LocationAnalysis";
// Pages retirées : Guides, Methodology, Annexes
import DocumentationPage from "./pages/DocumentationPage";
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
import { useState } from "react";
import { useAuth } from "./hooks/useAuth";
import AnalyticsTracker from './components/AnalyticsTracker'; // Importe le nouveau composant

function MainApplicationContent() {
  const { isAuthenticated, login } = useAuth();
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const navigateRR = useNavigate(); // Hook de React Router DOM pour la navigation

  // La fonction navigate utilisera navigateRR de react-router-dom
  const navigate = (path: string) => {
    navigateRR(path); // Change l'URL et déclenche le rendu de la route correspondante
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsBurgerMenuOpen(false); // S'assure que le menu burger se ferme à la navigation
  };

  if (!isAuthenticated) {
    return <LoginForm onLogin={login} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header isBurgerMenuOpen={isBurgerMenuOpen} setIsBurgerMenuOpen={setIsBurgerMenuOpen} />
      <Navigation navigate={navigate} isBurgerMenuOpen={isBurgerMenuOpen} setIsBurgerMenuOpen={setIsBurgerMenuOpen} />
      <main className="flex-1 px-8 py-8 max-w-6xl mx-auto w-full">
        {/* Utilisation de Routes et Route pour le routage avec React Router DOM */}
        <Routes>
          {/* Route par défaut pour la page d'accueil */}
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
          <Route path="/calculateurs" element={<TableauCalculCout navigate={navigate} />} />
          <Route path="/prix-vente" element={<PrixVenteProduits navigate={navigate} />} />
          <Route path="/rapport-adapte" element={<RapportAdapte navigate={navigate} />} />

          {/* Suivis */}
          <Route path="/suivis" element={<Suivis navigate={navigate} />} />
          <Route path="/suivi-subventions" element={<SuiviSubventions navigate={navigate} />} />
          <Route path="/suivi-prets" element={<SuiviPrets navigate={navigate} />} />
          {/* Route retirée : /partenariats */}
          <Route path="/tableau-bord" element={<Dashboard navigate={navigate} />} />

          {/* Documentation & Guides */}
          <Route path="/documentation" element={<DocumentationPage navigate={navigate} />} />
          {/* Route retirée : /methodo */}
          <Route path="/cartographie" element={<LocationAnalysis navigate={navigate} />} />
          <Route path="/organigramme" element={<Organigramme navigate={navigate} />} />
          <Route path="/entretiens" element={<Entretiens navigate={navigate} />} />
          <Route path="/guide-tva" element={<GuideTva navigate={navigate} />} />
          <Route path="/etude-marche" element={<EtudeMarche navigate={navigate} />} />
          {/* Route retirée : /guides, /annexes */}

          {/* Contact & Aide */}
          <Route path="/contact-et-aide" element={<ContactEtAide navigate={navigate} />} />
          <Route path="/expert-comptable" element={<Contact navigate={navigate} />} />
          <Route path="/edp" element={<EcoleDeProduction navigate={navigate} />} />
          <Route path="/faq" element={<UnderDevelopment title="Foire Aux Questions (FAQ)" navigate={navigate} />} />
          <Route path="/support" element={<UnderDevelopment title="Support Technique" navigate={navigate} />} />
          <Route path="/contact" element={<Contact navigate={navigate} />} />

          {/* Routes pour les pages qui étaient gérées par currentPage mais qui n'ont pas de lien direct dans le menu. */}
          {/* Routes retirées : /business-plan, /couts-pedagogiques, /planification */}

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
        <Router> {/* Encadre l'application entière avec BrowserRouter */}
          <AnalyticsTracker /> {/* Place AnalyticsTracker ici pour qu'il puisse accéder à useLocation */}
          <MainApplicationContent />
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;