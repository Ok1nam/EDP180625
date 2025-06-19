// client/src/pages/DocumentationPage.tsx

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
    { id: "methodo", label: "Méthodologie", icon: BookOpen, description: "Accédez à la méthodologie complète pour la création et la gestion d'une école de production." },
    { id: "cartographie", label: "Cartographie des écoles de production en France", icon: MapPin, description: "Explorez la carte interactive des écoles de production existantes sur le territoire." },
    { id: "organigramme", label: "Exemple d'organigramme", icon: Building, description: "Utilisez un modèle d'organigramme pour structurer votre équipe." },
    { id: "entretiens", label: "Entretiens effectués auprès des porteurs de projet", icon: MessageCircle, description: "Consultez les retours d'expériences de porteurs de projet." },
    { id: "guide-tva", label: "Guide d'application de la TVA", icon: Scale, description: "Comprenez les spécificités de l'application de la TVA pour votre structure." },
    { id: "etude-marche", label: "Étude du marché du secteur sélectionné", icon: Target, description: "Analysez la pertinence de votre projet grâce à une étude de marché type." }
];

const DocumentationPage: React.FC<DocumentationPageProps> = ({ navigate }) => {
    return (
        <section id="documentation-page">
            <h1 className="flex items-center gap-2 mb-6 text-2xl font-bold text-gray-800">
                <BookOpen className="w-6 h-6" /> {/* Icône principale de la page Documentation & Guides */}
                Documentation & Guides
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {documentationItems.map((item) => (
                    <Card
                        key={item.id}
                        className="card-hover cursor-pointer"
                        onClick={() => navigate(item.id)} // Navigue vers la page spécifique
                    >
                        <CardContent className="p-6">
                            <h3 className="flex items-center gap-2 text-lg font-semibold mb-3 text-primary">
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