// client/src/pages/Entretiens.tsx

import React from 'react';
import { MessageSquareText, Users, Lightbulb, TrendingUp, Handshake, Quote } from "lucide-react"; // Icônes pertinentes
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface EntretiensProps { // Correction de l'interface
  navigate?: (page: string) => void;
}

const Entretiens: React.FC<EntretiensProps> = ({ navigate }) => { // Correction du nom de la fonction
  return (
    <section id="entretiens-porteurs-projets" className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="flex items-center gap-3 mb-6 text-3xl font-bold text-gray-800">
        <MessageSquareText className="w-8 h-8 text-purple-600" /> {/* Icône de bulle de dialogue */}
        Entretiens avec les Porteurs de Projets
      </h1>
      
      <p className="mb-8 text-lg text-gray-700 leading-relaxed">
        Au cœur de cette démarche d'accompagnement se trouvent des échanges privilégiés avec ceux qui donnent vie aux Écoles de Production. Nous avons mené une série d'entretiens approfondis avec des porteurs de projets à différents stades de développement, afin de recueillir leurs expériences, leurs défis et leurs meilleures pratiques.
      </p>

      {/* Section Objectifs des Entretiens */}
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-gray-700 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            Notre Démarche et Objectifs
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-gray-700 space-y-4">
          <p>
            Ces entretiens qualitatifs visaient à :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>**Comprendre les motivations :** Identifier les raisons profondes derrière l'engagement dans la création d'une École de Production.</li>
            <li>**Analyser les parcours :** Recueillir les étapes clés, les réussites et les embûches rencontrées.</li>
            <li>**Cerner les besoins :** Détecter les attentes spécifiques en matière d'accompagnement, notamment sur les aspects financiers, juridiques et organisationnels.</li>
            <li>**Identifier les facteurs clés de succès :** Tirer des enseignements des expériences réussies.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Section Thèmes Abordés */}
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-gray-700 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-orange-500" />
            Les Thèmes Principaux
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-gray-700 space-y-4">
          <p>
            Les discussions ont couvert un large éventail de sujets, essentiels à la création et au pilotage d'une École de Production :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>**Genèse du projet :** Comment l'idée est-elle née ? Quelles sont les premières étapes ?</li>
            <li>**Financement :** Sources de financement initiales et récurrentes, défis liés à la trésorerie.</li>
            <li>**Aspects juridiques et administratifs :** Choix de la structure, démarches d'habilitation, conformité.</li>
            <li>**Ressources humaines :** Recrutement de l'équipe pédagogique et administrative.</li>
            <li>**Relations avec les entreprises :** Partenariats, recherche de commandes, insertion professionnelle des jeunes.</li>
            <li>**Pilotage et suivi :** Indicateurs clés, gestion des imprévus, vision à long terme.</li>
            <li>**Défis et succès :** Les obstacles majeurs et les moments de satisfaction.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Section Enseignements Clés (Exemples ou placeholders) */}
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-gray-700 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            Enseignements et Retours d'Expérience
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-gray-700 space-y-4">
          <p>
            Ces entretiens ont révélé des points récurrents et des pratiques inspirantes. Les principaux enseignements seront synthétisés ici pour offrir une vision concrète des réalités du terrain.
          </p>
          {/* Exemple de bloc témoignage - à remplacer par de vrais extraits ou une synthèse */}
          <div className="bg-gray-50 border-l-4 border-gray-300 text-gray-700 p-4 italic mt-4">
            <Quote className="inline-block w-5 h-5 mr-2 text-gray-500" />
            <p>"La persévérance est la clé. Il faut s'entourer des bonnes personnes et ne pas sous-estimer le temps nécessaire à la mise en place."</p>
            <p className="text-right text-sm font-semibold mt-2">- Un porteur de projet anonyme</p>
          </div>
          <div className="bg-gray-50 border-l-4 border-gray-300 text-gray-700 p-4 italic mt-4">
            <Quote className="inline-block w-5 h-5 mr-2 text-gray-500" />
            <p>"L'expert-comptable a joué un rôle crucial, non seulement pour les chiffres, mais aussi pour structurer la réflexion globale."</p>
            <p className="text-right text-sm font-semibold mt-2">- Un autre porteur de projet</p>
          </div>
          <p className="italic text-sm text-gray-600 mt-4">
            (Synthèse détaillée des entretiens et témoignages supplémentaires en cours de rédaction.)
          </p>
        </CardContent>
      </Card>

      {/* Section Lien avec la Méthodologie */}
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-gray-700 flex items-center gap-2">
            <Handshake className="w-5 h-5 text-green-700" />
            Impact sur notre Démarche Méthodologique
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-gray-700 space-y-4">
          <p>
            Les précieuses informations recueillies lors de ces entretiens ont directement nourri l'élaboration de la méthodologie d'accompagnement proposée sur ce site. Elles nous ont permis d'adapter les outils et les conseils aux réalités et aux besoins concrets des porteurs de projets.
          </p>
          <p>
            Pour explorer les différentes étapes de notre accompagnement, visitez la page : <span
                className="text-blue-600 hover:underline cursor-pointer font-medium"
                onClick={() => navigate && navigate('methodo')}
              >
                Notre Méthodologie
              </span>.
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
};

export default Entretiens;