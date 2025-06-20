// client/src/pages/ContactEtAide.tsx

import React from 'react';
import {
  HelpCircle, // Icône principale pour la page Contact & Aide
  Mail, // Pour contacter
  MessageSquare, // Pour FAQ
  Bug, // Pour signaler un problème
  FileText, // Pour documentation
  BookOpen // Pour méthodologie
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ContactEtAideProps {
  navigate: (page: string) => void;
}

// Définition des options de contact et d'aide
const optionsAide = [
  { id: "contact", label: "Contactez-nous", icon: Mail, description: "Posez vos questions ou envoyez-nous un message direct." },
  { id: "faq", label: "Foire Aux Questions (FAQ)", icon: MessageSquare, description: "Trouvez des réponses aux questions les plus fréquentes." },
  { id: "support", label: "Signaler un problème / Support", icon: Bug, description: "Obtenez de l'aide technique ou signalez un bug." },
  { id: "documentation", label: "Documentation Générale", icon: FileText, description: "Consultez l'ensemble de la documentation de l'application." },
  { id: "methodo", label: "Notre Méthodologie", icon: BookOpen, description: "Découvrez la démarche et les principes de l'accompagnement." },
];

const ContactEtAide: React.FC<ContactEtAideProps> = ({ navigate }) => {
  return (
    <section id="contact-et-aide-page">
      <h1 className="flex items-center gap-2 mb-6 text-3xl font-bold text-gray-800">
        <HelpCircle className="w-8 h-8 text-purple-600" />
        Contact & Aide
      </h1>
      
      <p className="mb-8 text-lg text-gray-700 leading-relaxed">
        Besoin d'aide ou d'informations ? Explorez les options ci-dessous pour trouver la ressource ou le contact adapté à votre besoin.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {optionsAide.map((option) => (
          <Card
            key={option.id}
            className="card-hover cursor-pointer"
            onClick={() => navigate(option.id)} // Navigue vers la page correspondante
          >
            <CardContent className="p-6">
              <h3 className="flex items-center gap-2 text-lg font-semibold mb-3 text-primary">
                <option.icon className="w-6 h-6" />
                {option.label}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {option.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ContactEtAide;