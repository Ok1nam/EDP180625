// client/src/App.tsx

import React, { useState } from 'react';
import { Switch, Route, useLocation, Link } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Download, Percent, Calculator, FileText as FileTextIcon } from "lucide-react"; 

// --- DÉBUT DES COMPOSANTS MOCK ---
// Pour résoudre les erreurs d'importation, nous créons des versions simplifiées
// des composants et des pages directement dans ce fichier.

const queryClient = new QueryClient();

// Mocks pour les composants UI
const Header = ({ isBurgerMenuOpen, setIsBurgerMenuOpen }) => (
  <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
    <h1>Header</h1>
    <button onClick={() => setIsBurgerMenuOpen(!isBurgerMenuOpen)}>Menu</button>
  </header>
);
const Navigation = ({ navigate, isBurgerMenuOpen }) => (
  <nav className={`bg-gray-700 text-white w-64 h-full fixed top-0 left-0 transform ${isBurgerMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform`}>
    <ul className="p-4">
      <li><Link href="/accueil" onClick={() => navigate('/accueil')}>Accueil</Link></li>
      <li><Link href="/outils" onClick={() => navigate('/outils')}>Outils</Link></li>
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
const Card = ({ children, className = '' }) => <div className={`bg-white rounded-xl shadow-lg border border-gray-200 ${className}`}>{children}</div>;
const CardContent = ({ children, className = '' }) => <div className={`p-6 ${className}`}>{children}</div>;
const CardHeader = ({ children, className = '' }) => <div className={`p-6 border-b ${className}`}>{children}</div>;
const CardTitle = ({ children, className = '' }) => <h2 className={`text-xl font-bold ${className}`}>{children}</h2>;
const Button = ({ children, className = '', ...props }) => <button className={`px-4 py-2 rounded-md ${className}`} {...props}>{children}</button>;


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
const Guides = ({ navigate }) => <div><h1>Page Guides</h1></div>;
const DocumentationPage = ({ navigate }) => <div><h1>Page Documentation</h1></div>;
const Methodology = ({ navigate }) => <div><h1>Page Methodology</h1></div>;
const Annexes = ({ navigate }) => <div><h1>Page Annexes</h1></div>;
const Contact = ({ navigate }) => <div><h1>Page Contact</h1></div>;

const TvaCoefficient: React.FC<{ navigate: (page: string) => void }> = ({ navigate }) => {
  const excelFilePath = "/fichiers/ANNEXE 6 ET 7 - Trame calcul coefficient déduction et résultat fiscal 080825.xlsm"; 

  return (
    <section id="tva-coefficient" className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="flex items-center gap-2 mb-6 text-3xl font-bold text-[#3C5F58]">
        <Percent className="w-8 h-8" />
        Trame d’aide au calcul TVA, TS et résultat fiscal
      </h1>

      <p className="mb-8 text-lg text-gray-700 leading-relaxed">
        La gestion fiscale d’une École de Production présente des spécificités importantes. En raison de leur double activité, il est essentiel de déterminer avec rigueur non seulement la part de TVA déductible, mais aussi le coefficient d'assujettissement à la taxe sur les salaires et le résultat fiscal. Cette trame de calcul est un outil indispensable pour vous, expert-comptable, afin de formaliser et justifier ces trois aspects clés pour votre client.
      </p>

      <Card className="mb-8 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center gap-2 text-[#2E5941]">
            <Calculator className="w-5 h-5" />
            Comprendre les Calculs Fiscaux
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-700 space-y-4">
          <p>
            Cet outil vous guide sur trois calculs essentiels pour une École de Production :
          </p>
          <ul className="list-disc pl-5 space-y-3">
            <li>
              <span className="font-bold">Coefficient de déduction de TVA :</span> Il permet de calculer la proportion de TVA récupérable sur les dépenses mixtes (utilisées pour l'activité pédagogique exonérée et l'activité de production soumise).
            </li>
            <li>
              <span className="font-bold">Coefficient d'assujettissement à la Taxe sur les Salaires (TS) :</span> Ce ratio est crucial pour déterminer la part des salaires soumise à cette taxe.
            </li>
            <li>
              <span className="font-bold">Résultat Fiscal :</span> La trame vous aide à déterminer le résultat fiscal de l'activité lucrative, en partant du résultat comptable et en appliquant les réintégrations et déductions fiscales propres au statut de l'association.
            </li>
          </ul>
        </CardContent>
      </Card>
        
      <Card className="mb-8 shadow-lg border-2 border-[#2E5941]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-[#2E5941] flex items-center gap-3">
            <Download className="w-6 h-6" /> Télécharger la Trame de Calcul
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="text-base text-gray-800 flex-1">
            <p className="mb-2">
              Téléchargez la trame de calcul Excel pour vous aider à déterminer le coefficient de déduction de TVA, le coefficient d'assujettissement à la taxe sur les salaires et le résultat fiscal de votre client.
            </p>
            <p className="text-sm text-gray-600 font-bold">
              Note importante : Ce fichier est lié à plusieurs de nos outils. Il est essentiel de le remplir avec les données spécifiques de l'école avant d'utiliser les calculateurs.
            </p>
          </div>
          <a
            href={excelFilePath}
            download="ANNEXE 6 ET 7 - Trame calcul coefficient déduction et résultat fiscal 080825.xlsm"
            className="flex-shrink-0"
          >
            <Button className="bg-[#2E5941] hover:bg-[#3C5F58] text-white flex items-center gap-2 py-3 px-6 text-lg">
              <Download className="w-5 h-5" /> Télécharger le fichier
            </Button>
          </a>
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center gap-2 text-[#2E5941]">
            <FileTextIcon className="w-5 h-5" />
            Conseils pour une gestion rigoureuse
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-700 space-y-4">
          <p>
            Pour garantir la conformité fiscale et sécuriser les déclarations de votre client, une attention particulière doit être portée sur les points suivants :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li className="font-bold">Sectorisation comptable : Une séparation claire des activités (lucratives et non lucratives) est la base de tous ces calculs.</li>
            <li className="font-bold">Identification des recettes : Séparez rigoureusement les recettes assujetties à la TVA de celles qui sont exonérées.</li>
            <li className="font-bold">Suivi des dépenses : Assurez un suivi analytique précis de l'affectation des dépenses mutualisées.</li>
            <li className="font-bold">Calcul annuel : Les coefficients sont déterminés à la clôture de l'exercice et s'appliquent à titre provisoire pour l'année suivante, avec une régularisation en fin d'année.</li>
          </ul>
        </CardContent>
      </Card>
    </section>
  );
};

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
