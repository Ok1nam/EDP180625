// client/src/components/Navigation/Navigation.tsx

import { useState, useEffect } from "react"; // Assurez-vous que useEffect est bien importé
// ... autres imports lucide-react ...

interface NavigationProps {
  navigate: (page: string) => void;
  isMenuOpen: boolean; // Reçu du parent
  setIsMenuOpen: (isOpen: boolean) => void; // Reçu du parent
}

export default function Navigation({ navigate, isMenuOpen, setIsMenuOpen }: NavigationProps) {
  // L'état 'isOpen' de Navigation doit refléter la prop 'isMenuOpen'
  const [isOpen, setIsOpen] = useState(isMenuOpen); // Initialisation avec la prop

  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  // --- NOUVEAU useEffect pour synchroniser isOpen avec isMenuOpen ---
  useEffect(() => {
    setIsOpen(isMenuOpen);
  }, [isMenuOpen]); // Déclenche ce useEffect chaque fois que isMenuOpen change
  // ------------------------------------------------------------------

  const handleNavClick = (page: string) => {
    navigate(page);
    setIsOpen(false); // Ferme le panneau de navigation latéral
    setOpenSubmenu(null);
    setIsMenuOpen(false); // Ceci mettra à jour l'état du Header à "fermé"
  };

  const toggleSubmenu = (submenu: string) => {
    setOpenSubmenu(openSubmenu === submenu ? null : submenu);
  };

  const menuStructure = [
    // ... votre structure de menu ...
  ];
console.log("menuStructure content:", menuStructure); 

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