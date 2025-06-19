// client/src/components/Navigation/Navigation.tsx

import { useState, useEffect } from "react";
// ... autres imports lucide-react ...

interface NavigationProps {
  navigate: (page: string) => void;
  // --- NOUVELLES PROPS POUR LE MENU BURGER ---
  isMenuOpen: boolean; // Reçu du parent
  setIsMenuOpen: (isOpen: boolean) => void; // Reçu du parent
  // ------------------------------------------
}

export default function Navigation({ navigate, isMenuOpen, setIsMenuOpen }: NavigationProps) {
  // --- L'ÉTAT LOCAL 'isOpen' NE CONTRÔLE PLUS isMenuOpen du Header ---
  // Il contrôle toujours l'ouverture de la nav elle-même.
  const [isOpen, setIsOpen] = useState(false); // Gardez ceci pour la navigation latérale
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  // --- RETIREZ TOUT LE useEffect QUI GÈRE LE CustomEvent 'toggleNavigation' ---
  // useEffect(() => {
  //   const handleToggle = (event: CustomEvent) => {
  //     setIsOpen(event.detail);
  //   };
  //   window.addEventListener('toggleNavigation', handleToggle as EventListener);
  //   return () => {
  //     window.removeEventListener('toggleNavigation', handleToggle as EventListener);
  //   };
  // }, []);
  // ----------------------------------------------------------------------

  const handleNavClick = (page: string) => {
    navigate(page);
    setIsOpen(false); // Ferme le panneau de navigation latéral
    setOpenSubmenu(null);
    // --- UTILISEZ LA PROP POUR FERMER LE MENU BURGER DU HEADER ---
    setIsMenuOpen(false); // Ceci mettra à jour l'état du Header à "fermé"
    // --- RETIREZ LE CustomEvent ICI ---
    // const event = new CustomEvent('toggleNavigation', { detail: false });
    // window.dispatchEvent(event);
  };

  const toggleSubmenu = (submenu: string) => {
    setOpenSubmenu(openSubmenu === submenu ? null : submenu);
  };

  const menuStructure = [
    // ... votre structure de menu ...
  ];

  return (
    <nav 
      className={`fixed top-0 right-0 w-80 h-full bg-gray-800 transition-transform duration-300 pt-16 z-40 shadow-lg overflow-y-auto ${
        isOpen ? 'transform translate-x-0' : 'transform translate-x-full'
      }`}
    >
      <ul className="list-none">
        {menuStructure.map((section) => (
          <li key={section.id} className="border-b border-gray-600">
            <button
              onClick={() => section.items.length > 1 ? toggleSubmenu(section.id) : handleNavClick(section.items[0].id)}
              className="w-full flex items-center justify-between gap-3 p-4 text-white text-lg hover:bg-gray-700 transition-colors duration-200 text-left font-semibold"
            >
              <span className="flex items-center gap-3">
                <section.icon className="w-5 h-5" />
                {section.label}
              </span>
              {section.items.length > 1 && (
                <span className={`transform transition-transform duration-200 ${
                  openSubmenu === section.id ? 'rotate-90' : ''
                }`}>
                  ▶
                </span>
              )}
            </button>
            
            {section.items.length > 1 && openSubmenu === section.id && (
              <ul className="bg-gray-700">
                {section.items.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className="w-full flex items-center gap-3 pl-12 pr-4 py-3 text-white text-sm hover:bg-gray-600 transition-colors duration-200 text-left"
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}