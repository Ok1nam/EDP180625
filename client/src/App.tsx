// client/src/App.tsx

import { Switch, Route } from "wouter";
// ... autres imports ...
import Header from "./components/Header";
import Navigation from "./components/Navigation";
// ... autres imports ...
import { useState } from "react"; // Assurez-vous que useState est importé ici si ce n'est pas le cas

function Router() {
  const [currentPage, setCurrentPage] = useState("accueil");
  const { isAuthenticated, login } = useAuth();
  // --- NOUVEL ETAT POUR LE MENU BURGER ---
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  // ---------------------------------------

  const navigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // --- FERMER LE MENU BURGER LORS DE LA NAVIGATION ---
    setIsBurgerMenuOpen(false); // Ferme le menu burger quand on navigue
    // --------------------------------------------------
  };

  if (!isAuthenticated) {
    return <LoginForm onLogin={login} />;
  }

  const renderCurrentPage = () => {
    // ... votre switch case existant ...
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* --- PASSER isBurgerMenuOpen et setIsBurgerMenuOpen au Header --- */}
      <Header isMenuOpen={isBurgerMenuOpen} setIsMenuOpen={setIsBurgerMenuOpen} />
      {/* --- PASSER isBurgerMenuOpen et setIsBurgerMenuOpen au Navigation --- */}
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
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;