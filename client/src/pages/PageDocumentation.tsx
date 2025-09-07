import React from 'react';
import {
  BookOpen,
  MapPin,
  Building,
  MessageCircle,
  Scale,
  Briefcase
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

interface DocumentationPageProps {
    navigate: (page: string) => void;
}

const documentationItems = [
    { id: "cartographie", label: "Cartographie des écoles de production en France", icon: MapPin, description: "Explorez la carte interactive du réseau pour valider le choix d'implantation de votre client." },
    { id: "organigramme", label: "Exemple d'organigramme", icon: Building, description: "Un modèle pour aider votre client à structurer son équipe et clarifier les rôles." },
    { id: "entretiens", label: "Entretiens avec des porteurs de projet", icon: MessageCircle, description: "Consultez les retours d'expériences de porteurs de projet pour affiner vos conseils." },
    { id: "guide-tva", label: "Guide d'application de la TVA", icon: Scale, description: "Comprenez les spécificités de l'application de la TVA pour la structure de votre client." }
];

const DocumentationPage: React.FC<DocumentationPageProps> = ({ navigate }) => {
    return (
        <section id="documentation-page" className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="flex items-center gap-2 mb-6 text-2xl font-bold text-[#3C5F58]">
                <BookOpen className="w-6 h-6" />
                Documentation & guides pour votre mission
            </h1>
            <p className="mb-8 text-lg text-gray-700 leading-relaxed">
                Retrouvez ici les documents clés pour accompagner votre client, l'école de production. Ces guides et modèles vous fourniront les bases nécessaires pour le conseil et la structuration du projet.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {documentationItems.map((item) => (
                    <Card
                        key={item.id}
                        className="card-hover cursor-pointer transition-transform duration-200 hover:scale-105"
                        onClick={() => navigate(item.id)}
                    >
                        <CardContent className="p-6">
                            <h3 className="flex items-center gap-2 text-lg font-semibold mb-3 text-[#2E5941]">
                                <item.icon className="w-6 h-6" />
                                {item.label}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {item.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default DocumentationPage;