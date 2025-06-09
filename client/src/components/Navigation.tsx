import { useState, useEffect } from "react";
import { Home, Wrench, Calculator, Route, Book, Folder, Mail, FileText, TrendingUp, Handshake, GraduationCap, Calendar, Euro, BarChart3, MapPin } from "lucide-react";

interface NavigationProps {
  navigate: (page: string) => void;
}

export default function Navigation({ navigate }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleToggle = (event: CustomEvent) => {
      setIsOpen(event.detail);
    };

    window.addEventListener('toggleNavigation', handleToggle as EventListener);
    
    return () => {
      window.removeEventListener('toggleNavigation', handleToggle as EventListener);
    };
  }, []);

  const handleNavClick = (page: string) => {
    navigate(page);
    setIsOpen(false);
    // Reset burger menu state
    const event = new CustomEvent('toggleNavigation', { detail: false });
    window.dispatchEvent(event);
  };

  const menuItems = [
    { id: "accueil", label: "Accueil", icon: Home },
    { id: "tableau-bord", label: "Tableau de Bord", icon: BarChart3 },
    { id: "outils", label: "Outils", icon: Wrench },
    { id: "calculateurs", label: "Calculateurs", icon: Calculator },
    { id: "business-plan", label: "Business Plan", icon: FileText },
    { id: "rentabilite", label: "Rentabilité", icon: TrendingUp },
    { id: "partenariats", label: "Partenariats", icon: Handshake },
    { id: "couts-pedagogiques", label: "Coûts Pédagogiques", icon: GraduationCap },
    { id: "planification", label: "Planification", icon: Calendar },
    { id: "subventions", label: "Subventions", icon: Euro },
    { id: "implantation", label: "Implantation", icon: MapPin },
    { id: "methodo", label: "Méthodologie", icon: Route },
    { id: "guides", label: "Guides", icon: Book },
    { id: "annexes", label: "Annexes", icon: Folder },
    { id: "apropos", label: "Contact", icon: Mail },
  ];

  return (
    <nav 
      className={`fixed top-0 right-0 w-80 h-full bg-gray-800 transition-transform duration-300 pt-16 z-40 shadow-lg ${
        isOpen ? 'transform translate-x-0' : 'transform translate-x-full'
      }`}
    >
      <ul className="list-none">
        {menuItems.map(({ id, label, icon: Icon }) => (
          <li key={id} className="border-b border-gray-600">
            <button
              onClick={() => handleNavClick(id)}
              className="w-full flex items-center gap-3 p-4 text-white text-lg hover:bg-gray-700 transition-colors duration-200 text-left"
            >
              <Icon className="w-5 h-5" />
              {label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
