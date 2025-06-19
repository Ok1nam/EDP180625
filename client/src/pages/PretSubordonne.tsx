// client/src/pages/PretSubordonne.tsx

import React from 'react';
import { Handshake, PiggyBank, FileText, Lightbulb, Calculator } from "lucide-react"; // Icônes pertinentes
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PretSubordonneProps {
  navigate?: (page: string) => void;
}

export default function PretSubordonne({ navigate }: PretSubordonneProps) {
  return (
    <section id="pret-subordonne" className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="flex items-center gap-3 mb-6 text-3xl font-bold text-gray-800">
        <Handshake className="w-8 h-8 text-blue-600" /> {/* Icône de poignée de main ou partenariat */}
        Le Prêt Subordonné : Un Financement Stratégique pour votre École de Production
      </h1>
      
      <p className="mb-8 text-lg text-gray-700 leading-relaxed">
        Le prêt subordonné est un outil de financement hybride, à mi-chemin entre les fonds propres et les dettes bancaires classiques. Il représente un levier essentiel pour renforcer la structure financière des jeunes entreprises et associations, notamment les Écoles de Production, en offrant une flexibilité et une sécurité supplémentaires aux prêteurs.
      </p>

      {/* Section Qu'est-ce qu'un Prêt Subordonné ? */}
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-gray-700 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-orange-500" />
            Comprendre le Prêt Subordonné
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-gray-700 space-y-4">
          <p>
            Un prêt subordonné est un emprunt dont le remboursement est "subordonné" à celui des autres dettes de l'entité. Concrètement, en cas de difficultés financières ou de liquidation, les créanciers ordinaires (banques, fournisseurs, etc.) sont remboursés avant les créanciers du prêt subordonné.
          </p>
          <p>
            Cette particularité le rend attractif pour les banques et autres prêteurs, car il renforce la capacité d'endettement de l'école sans diluer le capital. Il est souvent considéré comme quasi-fonds propres par les institutions financières, améliorant ainsi les ratios de solvabilité de l'école.
          </p>
        </CardContent>
      </Card>

      {/* Section Avantages pour une École de Production */}
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-gray-700 flex items-center gap-2">
            <PiggyBank className="w-5 h-5 text-green-600" />
            Avantages clés pour votre École
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-gray-700 space-y-4">
          <ul className="list-disc pl-5 space-y-2">
            <li>**Renforcement des fonds propres :** Bien qu'étant une dette, il est assimilé à des quasi-fonds propres, améliorant la solidité financière.</li>
            <li>**Facilite l'accès à d'autres financements :** Il rassure les banques traditionnelles et encourage l'obtention de prêts complémentaires.</li>
            <li>**Flexibilité de remboursement :** Souvent, le remboursement du capital n'intervient qu'après plusieurs années, laissant du temps à l'école pour développer ses activités.</li>
            <li>**Coût potentiellement plus élevé :** En contrepartie du risque plus élevé pour le prêteur, le taux d'intérêt peut être supérieur à celui des prêts classiques.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Section Éléments à considérer (Placeholders) */}
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-gray-700 flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-600" />
            Points Cruciaux et Outils
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-gray-700 space-y-4">
          <p>
            Avant de contracter un prêt subordonné, il est impératif d'analyser attentivement plusieurs aspects :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              **Business Plan Robuste :** Votre <span 
                className="text-blue-600 hover:underline cursor-pointer font-medium"
                onClick={() => navigate && navigate('business-plan')}
              >
                business plan
              </span> doit démontrer la viabilité à long terme de l'école et sa capacité à générer des flux de trésorerie suffisants pour le remboursement.
            </li>
            <li>**Conditions du prêt :** Durée, taux d'intérêt, clauses de remboursement anticipé, et éventuelles garanties spécifiques.</li>
            <li>**Impact sur les ratios financiers :** Comment le prêt affectera-t-il votre bilan et vos indicateurs de performance ?</li>
          </ul>

          <h3 className="text-lg font-semibold mt-6 mb-3 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-gray-600" />
            Simulateur et Documentation (à venir)
          </h3>
          <p>
            Cette section proposera à terme des ressources pour vous aider :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Un simulateur pour estimer l'impact d'un prêt subordonné sur vos finances.</li>
            <li>Des modèles de contrats types ou des listes de documents requis.</li>
            <li>Un guide détaillé sur les différentes sources de financement possibles pour les écoles de production.</li>
          </ul>
          <p className="italic text-sm text-gray-600 mt-4">
            (Contenu interactif et ressources supplémentaires en cours de développement.)
          </p>
        </CardContent>
      </Card>

      {/* Bouton de retour à l'accueil */}
      {navigate && (
        <div className="text-center mt-8">
          <Button
            onClick={() => navigate('accueil')}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-lg"
          >
            Retour à l'accueil
          </Button>
        </div>
      )}
    </section>
  );
}