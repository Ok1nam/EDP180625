import { Home, Wrench, Calculator, Route, Book, Folder, Mail, FileText, TrendingUp, Handshake } from "lucide-react";

interface FooterProps {
  navigate: (page: string) => void;
}

export default function Footer({ navigate }: FooterProps) {
  const footerLinks = [
    { id: "accueil", label: "Accueil", icon: Home },
    { id: "outils", label: "Outils", icon: Wrench },
    { id: "suivis", label: "Calculateurs", icon: Calculator },
    { id: "documentation", label: "Documentation & Guides", icon: FileText },
    { id: "contact", label: "Contact & Aide", icon: TrendingUp },

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