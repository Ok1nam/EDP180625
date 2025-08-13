import React from 'react';
import {
  BookOpen, // Icône principale pour la page Documentation & Guides
  MapPin,
  Building,
  MessageCircle,
  Scale,
  Target
} from "lucide-react"; // Importez toutes les icônes nécessaires

// Import des composants UI de Shadcn/ui
import { Card, CardContent } from "@/components/ui/card";

interface DocumentationPageProps {
    navigate: (page: string) => void;
}

// Définition de la structure des données des éléments de documentation et guides
// Basée sur la section "documentation" de votre menuStructure
const documentationItems = [
    { id: "cartographie", label: "Cartographie des écoles de production en France", icon: MapPin, description: "Explorez la carte interactive des écoles de production existantes sur le territoire." },
    { id: "organigramme", label: "Exemple d'organigramme", icon: Building, description: "Utilisez un modèle d'organigramme pour structurer votre équipe." },
    { id: "entretiens", label: "Entretiens effectués auprès des porteurs de projet", icon: MessageCircle, description: "Consultez les retours d'expériences de porteurs de projet." },
    { id: "guide-tva", label: "Guide d'application de la TVA", icon: Scale, description: "Comprenez les spécificités de l'application de la TVA pour votre structure." }
];

const DocumentationPage: React.FC<DocumentationPageProps> = ({ navigate }) => {
    return (
        <section id="documentation-page" className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="flex items-center gap-2 mb-6 text-2xl font-bold text-[#3C5F58]">
                <BookOpen className="w-6 h-6" /> {/* Icône principale de la page Documentation & Guides */}
                Documentation & Guides
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {documentationItems.map((item) => (
                    <Card
                        key={item.id}
                        className="card-hover cursor-pointer transition-transform duration-200 hover:scale-105"
                        onClick={() => navigate(item.id)} // Navigue vers la page spécifique
                    >
                        <CardContent className="p-6">
                            <h3 className="flex items-center gap-2 text-lg font-semibold mb-3 text-[#2E5941]">
                                <item.icon className="w-6 h-6" /> {/* Icône spécifique à l'élément */}
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