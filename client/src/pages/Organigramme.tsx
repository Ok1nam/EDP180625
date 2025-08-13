import React from 'react';
import { Network, Users, Lightbulb, Workflow } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface OrganigrammeProps {
  navigate?: (page: string) => void;
}

const Organigramme: React.FC<OrganigrammeProps> = ({ navigate }) => {
  // Le chemin du fichier image est maintenant utilisé pour l'affichage direct
  const organigrammeImagePath = "/fichiers/ANNEXE 2 - EXEMPLE D'ORGANIGRAMME D'UNE ECOLE DE PRODUCTION.png";

  return (
    <section id="organigramme-type" className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="flex items-center gap-3 mb-6 text-3xl font-bold text-[#3C5F58]">
        <Network className="w-8 h-8 text-[#3C5F58]" />
        Exemple d'Organigramme d'une École de Production
      </h1>
      
      <p className="mb-8 text-lg text-gray-700 leading-relaxed">
        Ce modèle d'organigramme est un support pour vous, expert-comptable, afin d'aider votre client, l'École de Production, à structurer son équipe et à clarifier les rôles et les responsabilités. Une organisation claire est essentielle pour une gestion efficace et pour rassurer les parties prenantes.
      </p>

      {/* Section Pourquoi un Organigramme ? */}
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-[#3C5F58] flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-[#3C5F58]" />
            L'Importance de la Structure Organisationnelle
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-gray-700 space-y-4">
          <p>
            Un organigramme bien défini permet à l'École de Production de :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="font-bold">Clarifier les rôles et responsabilités :</span> Chaque membre de l'équipe sait quelle est sa place et ses missions.</li>
            <li><span className="font-bold">Optimiser la communication :</span> Facilite les échanges et la circulation de l'information.</li>
            <li><span className="font-bold">Identifier les besoins en recrutement :</span> Met en évidence les postes à pourvoir pour le bon fonctionnement.</li>
            <li><span className="font-bold">Faciliter la prise de décision :</span> En connaissant la chaîne de commandement.</li>
            <li><span className="font-bold">Présenter la structure aux partenaires :</span> Démontrer le sérieux et l'organisation de l'école.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Section Composantes Clés */}
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-[#3C5F58] flex items-center gap-2">
            <Users className="w-5 h-5 text-[#3C5F58]" />
            Les Fonctions Essentielles
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-gray-700 space-y-4">
          <p>
            Bien que chaque École de Production ait ses spécificités, un organigramme type inclut généralement les fonctions suivantes :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="font-bold">Conseil d'Administration / Bureau :</span> Définition des grandes orientations, validation stratégique.</li>
            <li><span className="font-bold">Direction :</span> Gestion globale de l'école, représentation, développement.</li>
            <li><span className="font-bold">Pédagogie :</span> Formateurs, encadrants techniques, responsables de formation.</li>
            <li><span className="font-bold">Production / Ateliers :</span> Maîtres de stage, chefs d'atelier, responsables qualité.</li>
            <li><span className="font-bold">Administration & Finance :</span> Gestionnaire, comptable, responsable RH.</li>
            <li><span className="font-bold">Relations Partenaires :</span> Chargé de développement partenarial, relations entreprises.</li>
            <li><span className="font-bold">Vie Scolaire / Accompagnement Social :</span> Suivi des élèves, orientation.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Section Affichage de l'image de l'organigramme */}
      {/* Cette carte remplace la section de téléchargement */}
      <Card className="mb-8 shadow-lg border-2 border-[#2E5941]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-[#2E5941] flex items-center gap-3">
            <Workflow className="w-6 h-6" /> Visualiser l'exemple d'organigramme
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 flex justify-center">
          <img 
            src={organigrammeImagePath} 
            alt="Exemple d'organigramme d'une École de Production" 
            className="w-full h-auto rounded-lg shadow-md"
          />
        </CardContent>
      </Card>

      {/* Bouton de retour à l'accueil */}
      {navigate && (
        <div className="text-center mt-8">
          <Button
            onClick={() => navigate('accueil')}
            className="px-6 py-3 bg-[#2E5941] text-white rounded-md hover:bg-[#3C5F58] transition-colors text-lg"
          >
            Retour à l'accueil
          </Button>
        </div>
      )}
    </section>
  );
};

export default Organigramme;
