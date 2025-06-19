// client/src/components/Header/Header.tsx

import { Menu, X } from "lucide-react";
// --- RETIREZ L'IMPORT DE useState, et le CustomEvent ---
// import { useState } from "react"; // REMOVE THIS LINE IF IT'S THE ONLY USE OF useState

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

export default function Header({ isMenuOpen, setIsMenuOpen }: HeaderProps) {
  // --- RETIREZ LA DÉFINITION DE L'ÉTAT LOCAL isMenuOpen ---
  // const [isMenuOpen, setIsMenuOpen] = useState(false); // REMOVE THIS LINE

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // --- RETIREZ LE CustomEvent ICI ---
    // const event = new CustomEvent('toggleNavigation', { detail: !isMenuOpen });
    // window.dispatchEvent(event);
  };

  return (
    // CHANGEMENT ICI : remplacement de "header-gradient" par "bg-indigo-700"
    <header className="bg-indigo-700 text-white p-4 md:p-8 min-h-[120px] flex items-center justify-between relative">
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
        {isMenuOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Menu className="w-6 h-6 text-white" />
        )}
      </button>
    </header>
  );
}