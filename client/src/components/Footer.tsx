import {
  Home,
  Wrench,
  BarChart3, // Icône pour Suivis
  FileText, // Pour Documentation & Guides
  HelpCircle // NOUVEAU : Icône pour Contact & Aide
} from "lucide-react";

interface FooterProps {
  navigate: (page: string) => void;
}

export default function Footer({ navigate }: FooterProps) {
  const footerLinks = [
    { id: "accueil", label: "Accueil", icon: Home },
    { id: "outils", label: "Outils", icon: Wrench },
    { id: "suivis", label: "Suivis", icon: BarChart3 },
    // J'ai renommé le label pour mieux correspondre à la page intermédiaire DocumentationPage
    { id: "documentation", label: "Documentation & Guides", icon: FileText },
    // MODIFIÉ ICI : L'ID pointe maintenant vers la nouvelle page intermédiaire
    { id: "contact-et-aide", label: "Contact & Aide", icon: HelpCircle }, // NOUVEAU ID et NOUVELLE ICÔNE
  ];

  return (
    <footer className="bg-gray-800 text-white py-8 text-center mt-16">
      <nav className="mb-6">
        <ul className="flex justify-center gap-6 md:gap-10 flex-wrap px-4">
          {footerLinks.map(({ id, label }) => (
            <li key={id}>
              <button
                onClick={() => navigate(id)}
                className="text-blue-200 hover:text-white transition-colors duration-200 text-sm md:text-base"
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="border-t border-gray-600 mt-8 pt-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <img
              src="/logo-edp.png"
              alt="Logo EDP"
              className="w-8 h-8 object-contain"
            />
            <div className="text-sm text-blue-300">
              © 2025 Laura Gombaud – Soutenance DEC
            </div>
          </div>
        </div>
    </footer>
  );
}