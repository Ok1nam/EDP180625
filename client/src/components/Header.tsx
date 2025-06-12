import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Trigger navigation toggle in parent
    const event = new CustomEvent('toggleNavigation', { detail: !isMenuOpen });
    window.dispatchEvent(event);
  };

  return (
    <header className="header-gradient text-white p-4 md:p-8 min-h-[120px] flex items-center justify-between relative">
      <div className="logo max-w-[70%] text-sm md:text-base leading-relaxed">
        Proposition d'une démarche méthodologique d'accompagnement par l'expert-comptable dans la création et le pilotage d'une école de production
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