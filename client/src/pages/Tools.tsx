import React from 'react';
import {
  Wrench,
  FileText,
  Calculator,
  TrendingUp,
  Target,
  Building,
  CheckSquare,
  DollarSign,
  Folder,
  Euro,
  PieChart,
  BarChart3 // AJOUTÉ : Icône nécessaire pour le tableau de bord
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

interface ToolsProps {
    navigate: (page: string) => void;
}

// La liste des outils inclut maintenant les suivis
const outils = [
    // Outils existants
    { id: "plan-comptable", label: "Plan comptable adapté", icon: FileText, description: "Accédez à un plan comptable spécifique pour les écoles de production." },
    { id: "tva-coefficient", label: "Trame de calcul du coefficient de déduction de TVA", icon: Calculator, description: "Calculez simplement votre coefficient de déduction de TVA." },
    { id: "resultat-fiscal", label: "Trame de calcul du résultat fiscal", icon: TrendingUp, description: "Estimez le résultat fiscal de votre école avec notre trame dédiée." },
    { id: "arbre", label: "Arbre à la décision", icon: Target, description: "Guide interactif pour vous aider dans vos décisions clés." },
    { id: "statuts", label: "Générateur de statuts", icon: Building, description: "Créez rapidement les statuts de votre association." },
    { id: "criteres-label", label: "Liste de vérification des critères à remplir pour obtenir le label", icon: CheckSquare, description: "Assurez-vous de respecter tous les critères pour le label." },
    { id: "budget-creation", label: "Trame de budget à la création", icon: DollarSign, description: "Élaborez votre budget prévisionnel pour le lancement de l'école." },
    { id: "subventions", label: "Dossier type demande subvention", icon: Folder, description: "Préparez votre dossier de demande de subvention avec ce modèle." },
    { id: "pret-subordonne", label: "Exemple de contrat de prêt subordonné", icon: FileText, description: "Modèle pour un contrat de prêt subordonné spécifique." },
    { id: "habilitation-taxe", label: "Exemple de formulaire de demande d'habilitation taxe apprentissage", icon: Euro, description: "Accédez au formulaire et aux instructions pour l'habilitation." },
    { id: "calculateurs", label: "Tableau calcul de coût", icon: Calculator, description: "Calculez et suivez vos coûts pédagogiques et de production." },
    { id: "prix-vente", label: "Tableau de détermination du prix de vente des produits", icon: PieChart, description: "Définissez une stratégie de prix pour les produits de votre école." },
    { id: "rapport-adapte", label: "Modèle de rapport adapté", icon: FileText, description: "Obtenez un modèle de rapport financier adapté à votre structure." },

    // ===============================================
    // AJOUT DES CARTES DE "SUIVIS"
    // ===============================================
    { id: "suivi-subventions", label: "Suivi des subventions", icon: Euro, description: "Gardez un œil sur l'état de vos demandes et l'utilisation de vos subventions." },
    { id: "suivi-prets", label: "Suivi des prêts", icon: DollarSign, description: "Gérez et visualisez l'échéancier et les remboursements de vos prêts." },
    { id: "tableau-bord", label: "Tableau de bord financier & extra-financier", icon: BarChart3, description: "Consultez un aperçu complet de la performance de votre école." }
];


const Tools: React.FC<ToolsProps> = ({ navigate }) => {
    return (
        <section id="tools-page" className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="flex items-center gap-2 mb-6 text-2xl font-bold text-[#3C5F58]">
                <Wrench className="w-6 h-6" />
                Nos Outils et Suivis
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {outils.map((outil) => (
                    <Card
                        key={outil.id}
                        className="card-hover cursor-pointer transition-transform duration-200 hover:scale-105"
                        onClick={() => navigate(outil.id)}
                    >
                        <CardContent className="p-6">
                            <h3 className="flex items-center gap-2 text-lg font-semibold mb-3 text-[#2E5941]">
                                <outil.icon className="w-6 h-6" />
                                {outil.label}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {outil.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default Tools;