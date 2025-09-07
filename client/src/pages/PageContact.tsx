import React from 'react';
import {
  HelpCircle, 
  Mail, 
  School,
  User,
  Briefcase
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ContactEtAideProps {
  navigate: (page: string) => void;
}

const optionsAide = [
  { 
    id: "expert-comptable", 
    label: "Contacter l'auteure du mémoire", 
    icon: User, 
    description: "Envoyez un message direct à Laura Gombaud pour obtenir un conseil ou une précision." 
  },
  { 
    id: "edp", 
    label: "Qu'est-ce qu'une école de production ?", 
    icon: School, 
    description: "Découvrez le modèle unique des écoles de production pour mieux le présenter à votre client." 
  },
];

const ContactEtAide: React.FC<ContactEtAideProps> = ({ navigate }) => {
  return (
    <section id="contact-et-aide-page" className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="flex items-center gap-2 mb-6 text-3xl font-bold text-[#3C5F58]">
        <HelpCircle className="w-8 h-8" />
        Contact et aide
      </h1>
      
      <p className="mb-8 text-lg text-gray-700 leading-relaxed">
        Vous avez des questions spécifiques sur le projet d'école de production ou besoin d'informations pour accompagner votre client ? Retrouvez ici les contacts pour vous aider.
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