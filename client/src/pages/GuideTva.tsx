import React from 'react';
import { Download, Scale, FileText, Lightbulb, Briefcase, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface GuideTvaProps {
  navigate?: (page: string) => void;
}

const GuideTva: React.FC<GuideTvaProps> = ({ navigate }) => {
  // ✅ Corrigé ici : ajout de l'apostrophe dans le nom du fichier
  const guideTvaFilePath = "/fichiers/ANNEXE 5 - GUIDE D'APPLICATION DE LA TVA.pdf";

  return (
    <section id="guide-tva" className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="flex items-center gap-3 mb-6 text-3xl font-bold text-[#3C5F58]">
        <Scale className="w-8 h-8 text-[#3C5F58]" />
        Guide d'application de la TVA
      </h1>
      
      <p className="mb-8 text-lg text-gray-700 leading-relaxed">
        En tant qu'expert-comptable, la gestion de la taxe sur la valeur ajoutée (TVA) pour une école de production est un enjeu de conformité majeur. En raison de la nature mixte de leurs activités (formation et production), une vigilance particulière est requise. Ce guide a pour but de vous aider à clarifier ces enjeux pour le compte de votre client.
      </p>

      {/* Section Principes de la TVA et Écoles de Production */}
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-[#3C5F58] flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-gray-500" />
            Le contexte TVA des écoles de production
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-gray-700 space-y-4">
          <p>
            Les écoles de production sont souvent confrontées à une problématique de <span className="font-bold">TVA mixte</span>, avec :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="font-bold">des activités exonérées :</span> les activités pédagogiques et de formation, lorsqu'elles sont exercées dans le cadre de leurs statuts, sont généralement exonérées de TVA.</li>
            <li><span className="font-bold">des activités assujetties :</span> la vente de biens ou de services produits par les élèves est soumise à la TVA dès lors qu'elle est en concurrence avec le secteur commercial.</li>
          </ul>
          <p>
            Cette dualité nécessite une gestion rigoureuse pour garantir la conformité fiscale et optimiser la déduction de la TVA sur les achats.
          </p>
        </CardContent>
      </Card>

      {/* Section Contenu du Guide */}
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-[#3C5F58] flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#3C5F58]" />
            Contenu du guide
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-gray-700 space-y-4">
          <p>
            Le guide d'application de la TVA aborde les points essentiels suivants pour vous accompagner dans votre mission :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="font-bold">les principes fondamentaux de la TVA</span> applicables aux associations.</li>
            <li><span className="font-bold">les règles spécifiques</span> aux écoles de production et aux activités mixtes.</li>
            <li>la détermination du <span
                className="text-[#3C5F58] hover:underline cursor-pointer font-medium"
                onClick={() => navigate && navigate('tva-coefficient')}
              >
                coefficient de déduction de TVA
              </span>, un point clé pour la gestion fiscale.
            </li>
            <li><span className="font-bold">les obligations déclaratives</span> et les bonnes pratiques pour éviter les erreurs.</li>
            <li>des <span className="font-bold">exemples concrets</span> pour illustrer les situations courantes.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Section Téléchargement du guide */}
      <Card className="mb-8 shadow-lg border-2 border-[#2E5941]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-[#2E5941] flex items-center gap-3">
            <Download className="w-6 h-6" /> Télécharger le guide complet
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="text-base text-gray-800 flex-1">
            <p className="mb-2">
              Obtenez le guide détaillé pour maîtriser l'application de la TVA au sein d'une école de production que vous accompagnez.
            </p>
          </div>
          <a
            href={guideTvaFilePath}
            download="ANNEXE 5 - GUIDE D'APPLICATION DE LA TVA.pdf"
            className="flex-shrink-0"
          >
            <Button className="bg-[#2E5941] hover:bg-[#3C5F58] text-white flex items-center gap-2 py-3 px-6 text-lg">
              <Download className="w-5 h-5" /> Télécharger le guide
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

export default GuideTva;