// client/src/pages/Suivis.tsx

import React from 'react';
import {
  BarChart3, // Icône principale pour la page Suivis
  Euro,
  DollarSign,
  Users
} from "lucide-react"; // Importez toutes les icônes nécessaires

// Import des composants UI de Shadcn/ui
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SuivisProps { // Renommé de SuivisPageProps à SuivisProps
    navigate: (page: string) => void;
}

// Définition de la structure des données des suivis, basée sur votre menuStructure
const suivis = [
    { id: "suivi-subventions", label: "Suivi des subventions", icon: Euro, description: "Gardez un œil sur l'état de vos demandes et l'utilisation de vos subventions." },
    { id: "suivi-prets", label: "Suivi des prêts", icon: DollarSign, description: "Gérez et visualisez l'échéancier et les remboursements de vos prêts." },
    { id: "partenariats", label: "Suivi des partenariats", icon: Users, description: "Centralisez les informations et les actions liées à vos partenaires." },
    { id: "tableau-bord", label: "Tableau de bord financier & extra-financier", icon: BarChart3, description: "Consultez un aperçu complet de la performance de votre école." }
];


const Suivis: React.FC<SuivisProps> = ({ navigate }) => { // Renommé de SuivisPage à Suivis
    return (
        <section id="suivis-page">
            <h1 className="flex items-center gap-2 mb-6 text-2xl font-bold text-gray-800">
                <BarChart3 className="w-6 h-6" /> {/* Icône principale de la page Suivis */}
                Nos Suivis et Tableaux de Bord
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {suivis.map((suivi) => (
                    <Card
                        key={suivi.id}
                        className="card-hover cursor-pointer"
                        onClick={() => navigate(suivi.id)} // Navigue vers la page du suivi
                    >
                        <CardContent className="p-6">
                            <h3 className="flex items-center gap-2 text-lg font-semibold mb-3 text-primary">
                                <suivi.icon className="w-6 h-6" /> {/* Icône spécifique au suivi */}
                                {suivi.label}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {suivi.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default Suivis; // Exportez le composant Suivis