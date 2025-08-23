// client/src/pages/Suivis.tsx

import React from 'react';
import {
  BarChart3,
  Euro,
  DollarSign,
  Users,
  Briefcase
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

interface SuivisProps {
    navigate: (page: string) => void;
}

const suivis = [
    { id: "suivi-subventions", label: "suivi des subventions", icon: Euro, description: "Un outil pour vous aider à suivre l'état des demandes et l'utilisation des subventions." },
    { id: "suivi-prets", label: "suivi des prêts", icon: DollarSign, description: "Gérez et visualisez l'échéancier et les remboursements des prêts contractés par l'école." },
    { id: "partenariats", label: "suivi des partenariats", icon: Users, description: "Centralisez les informations et les actions liées aux entreprises partenaires de votre client." },
    { id: "tableau-bord", label: "tableau de bord financier & extra-financier", icon: BarChart3, description: "Consultez un aperçu complet de la performance de votre client, pour une analyse plus fine." }
];

const Suivis: React.FC<SuivisProps> = ({ navigate }) => {
    return (
        <section id="suivis-page">
            <h1 className="flex items-center gap-2 mb-6 text-2xl font-bold text-gray-800">
                <Briefcase className="w-6 h-6" />
                Nos outils de suivi et de pilotage pour votre mission
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {suivis.map((suivi) => (
                    <Card
                        key={suivi.id}
                        className="card-hover cursor-pointer"
                        onClick={() => navigate(suivi.id)}
                    >
                        <CardContent className="p-6">
                            <h3 className="flex items-center gap-2 text-lg font-semibold mb-3 text-primary">
                                <suivi.icon className="w-6 h-6" />
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

export default Suivis;