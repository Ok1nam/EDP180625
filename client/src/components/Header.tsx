import { Menu, X } from "lucide-react";

interface HeaderProps {
  isBurgerMenuOpen: boolean;
  setIsBurgerMenuOpen: (isOpen: boolean) => void;
}

export default function Header({ isBurgerMenuOpen, setIsBurgerMenuOpen }: HeaderProps) {
  const toggleMenu = () => {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  };

  return (
    // Remplacement de header-gradient par la couleur de fond bg-[#B68E3F]
    // Ajustement de la couleur du texte pour une meilleure lisibilité
    <header className="bg-[#B68E3F] text-gray-900 p-4 md:p-8 min-h-[120px] flex items-center justify-between relative">
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
  className="burger w-12 h-12 flex items-center justify-center cursor-pointer z-50 transition-all duration-300"
  onClick={toggleMenu}
  aria-label="Toggle navigation menu"
>
  {isBurgerMenuOpen ? (
    // On agrandit l'icône ici aussi
    <X className="w-10 h-10 text-gray-900" />
  ) : (
    // Et ici
    <Menu className="w-10 h-10 text-gray-900" />
  )}
      </button>
    </header>
  );
}