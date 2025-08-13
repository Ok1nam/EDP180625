import React from 'react';
import {
  HelpCircle, 
  Mail, 
  School 
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ContactEtAideProps {
  navigate: (page: string) => void;
}

const optionsAide = [
  { 
    id: "contact", 
    label: "Contacter l'Expert-Comptable stagiaire", 
    icon: Mail, 
    description: "Posez vos questions ou envoyez-nous un message direct à Laura Gombaud." 
  },
  { 
    id: "edp", 
    label: "Qu'est-ce qu'une École de Production ?", 
    icon: School, 
    description: "Découvrez le modèle unique des Écoles de Production et leur pédagogie." 
  },
];

const ContactEtAide: React.FC<ContactEtAideProps> = ({ navigate }) => {
  return (
    <section id="contact-et-aide-page" className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="flex items-center gap-2 mb-6 text-3xl font-bold text-[#3C5F58]">
        <HelpCircle className="w-8 h-8" />
        Contact & Aide
      </h1>
      
      <p className="mb-8 text-lg text-gray-700 leading-relaxed">
        Vous avez des questions spécifiques sur le projet d'École de Production ou besoin d'informations sur l'accompagnement ?
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {optionsAide.map((option) => (
          <Card
            key={option.id}
            className="card-hover cursor-pointer transition-transform duration-200 hover:scale-105"
            onClick={() => navigate(option.id)} 
          >
            <CardContent className="p-6">
              <h3 className="flex items-center gap-2 text-lg font-semibold mb-3 text-[#2E5941]">
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