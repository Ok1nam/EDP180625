// client/src/pages/ContactEtAide.tsx

import React from 'react';
import {
  HelpCircle, // Icône principale pour la page Contact & Aide
  Mail, // Pour contacter
  School // Icône pour Écoles de Production
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ContactEtAideProps {
  navigate: (page: string) => void;
}

// Définition des options de contact et d'aide simplifiées
const optionsAide = [
  { 
    id: "contact", 
    label: "Contacter l'Expert-Comptable", 
    icon: Mail, 
    description: "Posez vos questions ou envoyez-nous un message direct à Laura Gombaud." 
  },
  { 
    id: "edp", // CORRECTION ICI : L'ID est maintenant "edp" pour correspondre à App.tsx
    label: "Qu'est-ce qu'une École de Production ?", 
    icon: School, 
    description: "Découvrez le modèle unique des Écoles de Production et leur pédagogie." 
  },
];

const ContactEtAide: React.FC<ContactEtAideProps> = ({ navigate }) => {
  return (
    <section id="contact-et-aide-page" className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="flex items-center gap-2 mb-6 text-3xl font-bold text-gray-800">
        <HelpCircle className="w-8 h-8 text-purple-600" />
        Contact & Aide
      </h1>
      
      <p className="mb-8 text-lg text-gray-700 leading-relaxed">
        Vous avez des questions spécifiques sur le projet d'École de Production ou besoin d'informations sur l'accompagnement ?
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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