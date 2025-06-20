// client/src/components/Navigation/Navigation.tsx

import { useState, useEffect } from "react";
import { 
  Home, 
  Wrench, 
  BarChart3, 
  BookOpen, 
  Phone,
  FileText, 
  Calculator,
  TrendingUp,
  Building,
  CheckSquare,
  DollarSign,
  Folder,
  Euro,
  PieChart,
  MapPin,
  Users,
  MessageCircle,
  Scale,
  Target,
  HelpCircle 
} from "lucide-react";

// IMPORTANT : Les `id` ici DOIVENT correspondre aux `path` dans les <Route> de App.tsx
// Ils doivent être des chemins d'URL valides (e.g., "accueil" devient "/accueil")
const menuStructure = [
  {
    id: "accueil", // ID logique pour le menu
    path: "/",     // Chemin de l'URL pour wouter
    label: "Accueil",
    icon: Home,
    items: [
      { id: "accueil", path: "/accueil", label: "Accueil", icon: Home }
    ]
  },
  {
    id: "outils",
    path: "/outils", // Peut-être une page générique pour 'Outils' ou juste un conteneur
    label: "Outils",
    icon: Wrench,
    items: [
      { id: "plan-comptable", path: "/plan-comptable", label: "Plan comptable adapté", icon: FileText },
      { id: "tva-coefficient", path: "/tva-coefficient", label: "Trame de calcul du coefficient de déduction de TVA", icon: Calculator },
      { id: "resultat-fiscal", path: "/resultat-fiscal", label: "Trame de calcul du résultat fiscal", icon: TrendingUp },
      { id: "arbre", path: "/arbre", label: "Arbre à la décision", icon: Target },
      { id: "statuts", path: "/statuts", label: "Générateur de statuts", icon: Building },
      { id: "criteres-label", path: "/criteres-label", label: "Liste de vérification des critères à remplir pour obtenir le label", icon: CheckSquare },
      { id: "budget-creation", path: "/budget-creation", label: "Trame de budget à la création", icon: DollarSign },
      { id: "subventions", path: "/subventions", label: "Dossier type demande subvention", icon: Folder },
      { id: "pret-subordonne", path: "/pret-subordonne", label: "Exemple de contrat de prêt subordonné", icon: FileText },
      { id: "habilitation-taxe", path: "/habilitation-taxe", label: "Exemple de formulaire de demande d'habilitation taxe apprentissage", icon: Euro },
      { id: "calculateurs", path: "/calculateurs", label: "Tableau calcul de coût", icon: Calculator },
      { id: "prix-vente", path: "/prix-vente", label: "Tableau de détermination du prix de vente des produits", icon: PieChart },
      { id: "rapport-adapte", path: "/rapport-adapte", label: "Modèle de rapport adapté", icon: FileText }
    ]
  },
  {
    id: "suivis",
    path: "/suivis", // Peut-être une page générique pour 'Suivis'
    label: "Suivis",
    icon: BarChart3,
    items: [
      { id: "suivi-subventions", path: "/suivi-subventions", label: "Suivi des subventions", icon: Euro },
      { id: "suivi-prets", path: "/suivi-prets", label: "Suivi des prêts", icon: DollarSign },
      { id: "partenariats", path: "/partenariats", label: "Suivi des partenariats", icon: Users },
      { id: "tableau-bord", path: "/tableau-bord", label: "Tableau de bord financier & extra-financier", icon: BarChart3 }
    ]
  },
  {
    id: "documentation",
    path: "/documentation", // Peut-être une page générique pour 'Documentation'
    label: "Documentation & Guides",
    icon: BookOpen,
    items: [
      { id: "methodo", path: "/methodo", label: "Méthodologie", icon: BookOpen },
      { id: "cartographie", path: "/cartographie", label: "Cartographie des écoles de production en France", icon: MapPin },
      { id: "organigramme", path: "/organigramme", label: "Exemple d'organigramme", icon: Building },
      { id: "entretiens", path: "/entretiens", label: "Entretiens effectués auprès des porteurs de projet", icon: MessageCircle },
      { id: "guide-tva", path: "/guide-tva", label: "Guide d'application de la TVA", icon: Scale },
      { id: "etude-marche", path: "/etude-marche", label: "Étude du marché du secteur sélectionné", icon: Target }
    ]
  },
  {
    id: "contact-et-aide", 
    path: "/contact-et-aide", // Peut-être une page générique pour 'Contact & Aide'
    label: "Contact & Aide",
    icon: HelpCircle, 
    items: [
      { id: "expert-comptable", path: "/expert-comptable", label: "Contact Expert-Comptable", icon: Calculator }, 
      { id: "edp", path: "/edp", label: "L'École de Production", icon: Building } 
    ]
  }
];

interface NavigationProps {
  navigate: (path: string) => void; // navigate prendra un chemin d'URL
  isBurgerMenuOpen: boolean; 
  setIsBurgerMenuOpen: (isOpen: boolean) => void; 
}

export default function Navigation({ navigate, isBurgerMenuOpen, setIsBurgerMenuOpen }: NavigationProps) { 
  const [isOpen, setIsOpen] = useState(isBurgerMenuOpen);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  useEffect(() => {
    // console.log("Navigation.tsx: Prop isBurgerMenuOpen received:", isBurgerMenuOpen, "setting local isOpen to:", isBurgerMenuOpen);
    setIsOpen(isBurgerMenuOpen);
  }, [isBurgerMenuOpen]);

  const handleItemClick = (path: string, isSectionHeader: boolean) => {
    // console.log("Navigation.tsx: Item clicked, path:", path, "isSectionHeader:", isSectionHeader);
    if (isSectionHeader) {
      setOpenSubmenu(openSubmenu === path ? null : path); // Utilise le path pour le sous-menu
    } else {
      navigate(path); // Navigue directement via wouter
      // console.log("Navigation.tsx: Navigating, setting isOpen and setIsBurgerMenuOpen to false.");
      setIsOpen(false); 
      setOpenSubmenu(null); 
      setIsBurgerMenuOpen(false); 
    }
  };

  return (
    <nav 
      className={`fixed top-0 right-0 w-80 h-full bg-gray-800 transition-transform duration-300 pt-16 z-40 shadow-lg overflow-y-auto ${
        isOpen ? 'transform translate-x-0' : 'transform translate-x-full'
      }`}
    >
      {/* console.log("Navigation.tsx: Current isOpen state for rendering:", isOpen, "Applied classes:", `transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`) */}
      <ul className="list-none">
        {menuStructure.map((section) => (
          <li key={section.id} className="border-b border-gray-600">
            <button
              // Passe le 'path' de la section ou du premier item pour la navigation/ouverture du sous-menu
              onClick={() => section.items.length > 1 
                               ? handleItemClick(section.path, true) 
                               : handleItemClick(section.items[0].path, false)}
              className="w-full flex items-center justify-between gap-3 p-4 text-white text-lg hover:bg-gray-700 transition-colors duration-200 text-left font-semibold"
            >
              <span className="flex items-center gap-3">
                {section.icon && <section.icon className="w-5 h-5" />} 
                {section.label}
              </span>
              {section.items.length > 1 && (
                <span className={`transform transition-transform duration-200 ${
                  openSubmenu === section.path ? 'rotate-90' : '' // Utilise le 'path' pour vérifier l'état du sous-menu
                }`}>
                  ▶
                </span>
              )}
            </button>
            
            {section.items.length > 1 && openSubmenu === section.path && ( // Utilise le 'path' pour vérifier l'état du sous-menu
              <ul className="bg-gray-700">
                {section.items.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => handleItemClick(item.path, false)} // Passe le 'path' de l'item
                      className="w-full flex items-center gap-3 pl-12 pr-4 py-3 text-white text-sm hover:bg-gray-600 transition-colors duration-200 text-left"
                    >
                      {item.icon && <item.icon className="w-4 h-4" />}
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