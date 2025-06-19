// client/src/pages/Tools.tsx

import React from 'react';
import { FileText, Calculator, TrendingUp, Target, Building, CheckSquare, DollarSign, Folder, Euro, PieChart } from "lucide-react";

const outils = [
    { id: "plan-comptable", label: "Plan comptable adapté", icon: FileText },
    { id: "tva-coefficient", label: "Trame de calcul du coefficient de déduction de TVA", icon: Calculator },
    { id: "resultat-fiscal", label: "Trame de calcul du résultat fiscal", icon: TrendingUp },
    { id: "arbre", label: "Arbre à la décision", icon: Target },
    { id: "statuts", label: "Générateur de statuts", icon: Building },
    { id: "criteres-label", label: "Liste de vérification des critères à remplir pour obtenir le label", icon: CheckSquare },
    { id: "budget-creation", label: "Trame de budget à la création", icon: DollarSign },
    { id: "subventions", label: "Dossier type demande subvention", icon: Folder },
    { id: "pret-subordonne", label: "Exemple de contrat de prêt subordonné", icon: FileText },
    { id: "habilitation-taxe", label: "Exemple de formulaire de demande d'habilitation taxe apprentissage", icon: Euro },
    { id: "calculateurs", label: "Tableau calcul de coût", icon: Calculator },
    { id: "prix-vente", label: "Tableau de détermination du prix de vente des produits", icon: PieChart },
    { id: "rapport-adapte", label: "Modèle de rapport adapté", icon: FileText }
];

interface OutilsPageProps {
    navigate: (page: string) => void;
}

const OutilsPage: React.FC<OutilsPageProps> = ({ navigate }) => {
    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Outils d'évaluation</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {outils.map((outil) => (
                    <div
                        key={outil.id}
                        onClick={() => navigate(outil.id)}
                        className="p-4 rounded-md border border-gray-200 hover:shadow-md transition-shadow duration-300 cursor-pointer"
                    >
                        <div className="flex items-center gap-2">
                            <outil.icon className="w-5 h-5 text-blue-500" />
                            <h2 className="text-lg font-semibold text-gray-700">{outil.label}</h2>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OutilsPage;