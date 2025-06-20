// client/src/components/Header/Header.tsx

import { Menu, X } from "lucide-react";

interface HeaderProps {
  isBurgerMenuOpen: boolean; // RENOMMÉ pour correspondre à App.tsx
  setIsBurgerMenuOpen: (isOpen: boolean) => void; // RENOMMÉ pour correspondre à App.tsx
}

export default function Header({ isBurgerMenuOpen, setIsBurgerMenuOpen }: HeaderProps) { // Utilise les nouveaux noms de props
  const toggleMenu = () => {
    setIsBurgerMenuOpen(!isBurgerMenuOpen); // Utilise les nouveaux noms de props
  };

  return (
    // RESTAURÉ : header-gradient pour le fond
    <header className="header-gradient text-white p-4 md:p-8 min-h-[120px] flex items-center justify-between relative">
      <div className="flex items-center gap-4 max-w-[70%]">
        <img 
          src="/logo-edp.png" 
          alt="Logo EDP" 
          className="w-12 h-12 md:w-16 md:h-16 object-contain flex-shrink-0"
        />
        <div className="text-sm md:text-base leading-relaxed">
          Proposition d'une démarche méthodologique d'accompagnement par l'expert-comptable dans la création et le pilotage d'une école de production
        </div>
      </div>

      <button
        className="burger w-8 h-6 flex flex-col justify-between cursor-pointer z-50 transition-all duration-300"
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
      >
        {isBurgerMenuOpen ? ( // Utilise le nouveau nom de prop
          <X className="w-6 h-6 text-white" />
        ) : (
          <Menu className="w-6 h-6 text-white" />
        )}
      </button>
    </header>
  );
}