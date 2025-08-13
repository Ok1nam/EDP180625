import {
  Home,
  Wrench,
  FileText,
  HelpCircle
} from "lucide-react";

interface FooterProps {
  navigate: (page: string) => void;
}

export default function Footer({ navigate }: FooterProps) {
  const footerLinks = [
    { id: "accueil", label: "Accueil", icon: Home },
    { id: "outils", label: "Outils", icon: Wrench },
    { id: "documentation", label: "Documentation & Guides", icon: FileText },
    { id: "contact-et-aide", label: "Contact & Aide", icon: HelpCircle },
  ];

  return (
    // Mise à jour de la couleur de fond en bg-[#B68E3F]
    // Ajustement de la couleur du texte pour une meilleure lisibilité
    <footer className="bg-[#B68E3F] text-gray-900 py-8 text-center mt-16">
      <nav className="mb-6">
        <ul className="flex justify-center gap-6 md:gap-10 flex-wrap px-4">
          {footerLinks.map(({ id, label }) => (
            <li key={id}>
              <button
                onClick={() => navigate(id)}
                // Ajustement de la couleur du texte pour le lien
                className="text-gray-900 hover:text-white transition-colors duration-200 text-sm md:text-base"
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
            {/* Ajustement de la couleur du texte pour la lisibilité */}
            <div className="text-sm text-gray-900">
              © 2025 Laura Gombaud – Soutenance DEC
            </div>
          </div>
        </div>
    </footer>
  );
}
