// client/src/App.tsx

import { Switch, Route, useLocation } from "wouter"; // Ajout de useLocation
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";
// Importez toutes vos pages ici, comme vous le faites déjà
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
import { useState } from "react";
import { useAuth } from "./hooks/useAuth";

function MainApplicationContent() {
  // Supprimez currentPage et setCurrentPage car wouter gérera l'état de la route
  // const [currentPage, setCurrentPage] = useState("accueil"); 
  const { isAuthenticated, login } = useAuth();
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const [, setLocation] = useLocation(); // Hook de wouter pour changer l'URL

  // La fonction navigate utilisera setLocation de wouter
  const navigate = (path: string) => {
    setLocation(path); // Change l'URL et déclenche le rendu de la route correspondante
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
        {/* Utilisation de Switch et Route pour le routage */}
        <Switch>
          {/* Route par défaut pour la page d'accueil */}
          <Route path="/" component={() => <Home navigate={navigate} />} />
          <Route path="/accueil" component={() => <Home navigate={navigate} />} />

          {/* Outils */}
          <Route path="/outils" component={() => <Tools navigate={navigate} />} /> {/* Si vous avez une page Outils générique */}
          <Route path="/plan-comptable" component={() => <PlanComptable navigate={navigate} />} />
          <Route path="/tva-coefficient" component={() => <TvaCoefficient navigate={navigate} />} />
          <Route path="/resultat-fiscal" component={() => <ResultatFiscal navigate={navigate} />} />
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

          {/* Suivis */}
          <Route path="/suivis" component={() => <Suivis navigate={navigate} />} /> {/* Si vous avez une page Suivis générique */}
          <Route path="/suivi-subventions" component={() => <SuiviSubventions navigate={navigate} />} />
          <Route path="/suivi-prets" component={() => <SuiviPrets navigate={navigate} />} />
          <Route path="/partenariats" component={() => <PartnershipTracker navigate={navigate} />} />
          <Route path="/tableau-bord" component={() => <Dashboard navigate={navigate} />} />

          {/* Documentation & Guides */}
          <Route path="/documentation" component={() => <DocumentationPage navigate={navigate} />} /> {/* Si vous avez une page Documentation générique */}
          <Route path="/methodo" component={() => <Methodology navigate={navigate} />} />
          <Route path="/cartographie" component={() => <LocationAnalysis navigate={navigate} />} />
          <Route path="/organigramme" component={() => <Organigramme navigate={navigate} />} />
          <Route path="/entretiens" component={() => <Entretiens navigate={navigate} />} />
          <Route path="/guide-tva" component={() => <GuideTva navigate={navigate} />} />
          <Route path="/etude-marche" component={() => <EtudeMarche navigate={navigate} />} />

          {/* Contact & Aide */}
          <Route path="/contact-et-aide" component={() => <ContactEtAide navigate={navigate} />} /> {/* Si vous avez une page Contact & Aide générique */}
          <Route path="/expert-comptable" component={() => <Contact navigate={navigate} />} /> 
          <Route path="/edp" component={() => <EcoleDeProduction navigate={navigate} />} /> 
          <Route path="/faq" component={() => <UnderDevelopment title="Foire Aux Questions (FAQ)" navigate={navigate} />} />
          <Route path="/support" component={() => <UnderDevelopment title="Support Technique" navigate={navigate} />} />
          <Route path="/contact" component={() => <Contact navigate={navigate} />} />
          
          {/* Routes pour les pages qui étaient gérées par currentPage mais qui n'ont pas de lien direct dans le menu.
              Celles-ci peuvent être consolidées si elles sont incluses dans le menu ou si elles ne sont plus utilisées. */}
          <Route path="/business-plan" component={() => <BusinessPlan navigate={navigate} />} />
          <Route path="/couts-pedagogiques" component={() => <PedagogicalCosts navigate={navigate} />} />
          <Route path="/planification" component={() => <TrainingPlanner navigate={navigate} />} />
          
          {/* Route par défaut (404 ou redirige vers l'accueil) */}
          <Route>
            {/* Si aucune route ne correspond, affiche la page d'accueil ou une page 404 */}
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