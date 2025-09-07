import React from 'react';
import { Network, Users, Lightbulb, Workflow, Download, Briefcase } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface OrganigrammeProps {
  navigate?: (page: string) => void;
}

const Organigramme: React.FC<OrganigrammeProps> = ({ navigate }) => {
  // ✅ CHEMIN CORRECT : Relatif au dossier "public"
  const organigrammePdfPath = "/fichiers/ANNEXE 2 - EXEMPLE D'ORGANIGRAMME D'UNE ECOLE DE PRODUCTION.pdf";

  return (
    <section id="organigramme-type" className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="flex items-center gap-3 mb-6 text-3xl font-bold text-[#3C5F58]">
        <Network className="w-8 h-8 text-[#3C5F58]" />
        Exemple d'organigramme pour l'école de production de votre client
      </h1>
      
      <p className="mb-8 text-lg text-gray-700 leading-relaxed">
        En tant qu'expert-comptable, vous savez qu'une structure organisationnelle claire est essentielle pour la bonne gestion d'un projet. Cet exemple d'organigramme est un outil pratique pour aider votre client, l'école de production, à clarifier les rôles et les responsabilités au sein de son équipe. Une organisation bien définie est un gage de crédibilité pour les financeurs et les partenaires.
      </p>

      {/* ... (Les autres sections restent identiques) ... */}
      
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-[#3C5F58] flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-gray-500" />
            L'importance de la structure pour le pilotage
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-gray-700 space-y-4">
          <p>
            Ce modèle vous permettra d'accompagner votre client à :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="font-bold">Clarifier les rôles et responsabilités :</span> pour vous assurer que les missions sont bien réparties, notamment pour la partie administrative et financière.</li>
            <li><span className="font-bold">Optimiser la communication :</span> en identifiant les circuits de l'information pour une collaboration plus fluide.</li>
            <li><span className="font-bold">Identifier les besoins en recrutement :</span> en mettant en évidence les postes clés pour une croissance saine et contrôlée.</li>
            <li><span className="font-bold">Faciliter la prise de décision :</span> en comprenant la chaîne hiérarchique et les processus de validation.</li>
            <li><span className="font-bold">Présenter une structure solide :</span> pour renforcer le dossier de l'école auprès des partenaires et des financeurs.</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-[#3C5F58] flex items-center gap-2">
            <Users className="w-5 h-5 text-[#3C5F58]" />
            Les fonctions essentielles
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-gray-700 space-y-4">
          <p>
            Ce modèle intègre les fonctions typiques d'une école de production et vous aide à :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="font-bold">Conseil d'administration / bureau :</span> définir le rôle du conseil et des organes de gouvernance.</li>
            <li><span className="font-bold">Direction :</span> identifier la place de la gestion globale de l'école.</li>
            <li><span className="font-bold">Pédagogie :</span> structurer l'équipe des enseignants généraux et vacataires.</li>
            <li><span className="font-bold">Production / ateliers :</span> clarifier le rôle des maîtres professionnels.</li>
            <li><span className="font-bold">Administration & finance :</span> positionner les rôles clés que vous accompagnez (gestionnaire, comptable).</li>
            <li><span className="font-bold">Relations partenaires :</span> organiser le développement des partenariats stratégiques.</li>
            <li><span className="font-bold">Vie scolaire / accompagnement social :</span> intégrer les fonctions de soutien aux élèves.</li>
          </ul>
        </CardContent>
      </Card>


      {/* ✅ SECTION CORRIGÉE pour afficher le PDF */}
      <Card className="mb-8 shadow-lg border-2 border-[#2E5941]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-[#2E5941] flex items-center gap-3">
            <Workflow className="w-6 h-6" /> Visualiser l'exemple d'organigramme
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 flex justify-center">
          <iframe 
            src={organigrammePdfPath}
            title="Exemple d'organigramme d'une école de production"
            className="w-full h-[600px] rounded-lg shadow-md" // Ajustez la hauteur (h) si besoin
          />
        </CardContent>
      </Card>

      {/* Section de téléchargement (déjà correcte avec le bon chemin) */}
      <Card className="mb-8 shadow-lg border-2 border-[#3C5F58]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-[#2E5941] flex items-center gap-3">
            <Download className="w-6 h-6" /> Télécharger le modèle pour votre client
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="text-base text-gray-800 flex-1">
            <p className="mb-2">
              Téléchargez ce modèle d'organigramme au format PDF pour l'adapter à la structure spécifique de l'école de votre client.
            </p>
          </div>
          <a
            href={organigrammePdfPath}
            download="ANNEXE 2 - EXEMPLE D'ORGANIGRAMME D'UNE ECOLE DE PRODUCTION.pdf"
            className="flex-shrink-0"
          >
            <Button className="flex items-center gap-2 py-3 px-6 text-lg bg-[#2E5941] text-white rounded-md hover:bg-[#3C5F58] transition-colors">
              <Download className="w-5 h-5" /> Télécharger le modèle
            </Button>
          </a>
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