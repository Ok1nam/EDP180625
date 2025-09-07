import React from 'react';
import { Download, FileText, Share2, Award, PiggyBank, Users, Briefcase } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface RapportAdapteProps {
  navigate?: (page: string) => void;
}

const RapportAdapte: React.FC<RapportAdapteProps> = ({ navigate }) => {
  const rapportFilePath = "/fichiers/ANNEXE 21 - MODELE DE RAPPORT ADAPTE.pptx";

  return (
    <section id="rapport-adapte" className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="flex items-center gap-3 mb-6 text-3xl font-bold text-[#3C5F58]">
        <Share2 className="w-8 h-8 text-[#3C5F58]" />
        Modèle de rapport adapté aux partenaires de votre client
      </h1>
      
      <p className="mb-8 text-lg text-gray-700 leading-relaxed">
        Ce modèle de rapport est un outil stratégique conçu pour vous, expert-comptable. Il vous permet d'apporter une valeur ajoutée à la présentation de votre client auprès de ses parties prenantes. En fournissant ce rapport personnalisé, vous aidez l'école de production à communiquer de manière professionnelle sur ses activités et son impact, ce qui est fondamental pour entretenir la confiance avec ses partenaires (entreprises, collectivités, financeurs).
      </p>

      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-[#3C5F58] flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-gray-500" />
            Les objectifs de ce rapport pour votre mission
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-gray-700 space-y-4">
          <p>
            Un rapport d'activité bien structuré et adapté est un atout pour vous. Il vous permet de conseiller l'école de production pour :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="font-bold">Démontrer la valeur ajoutée</span> en mettant en lumière les succès pédagogiques et l'insertion professionnelle des jeunes.</li>
            <li><span className="font-bold">Rassurer les financeurs</span> en présentant une gestion saine et l'atteinte des objectifs grâce à vos analyses financières.</li>
            <li><span className="font-bold">Renforcer les partenariats</span> en maintenant un lien fort avec les entreprises et les collectivités locales.</li>
            <li><span className="font-bold">Faciliter les renouvellements</span> en créant un historique qui prouve l'efficacité des actions.</li>
            <li><span className="font-bold">Valoriser l'équipe</span> en mettant en avant le travail et l'engagement de tous les acteurs.</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-[#3C5F58] flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#3C5F58]" />
            Sections clés du rapport
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-gray-700 space-y-4">
          <p>
            Ce modèle de rapport est structuré autour des sections suivantes, essentielles pour une communication complète :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="font-bold">Synthèse exécutive :</span> un résumé des faits marquants et des réalisations clés.</li>
            <li><span className="font-bold">Activités pédagogiques :</span> nombre d'élèves, programmes suivis, succès aux examens, projets spécifiques.</li>
            <li><span className="font-bold">Activités de production :</span> types de commandes réalisées, chiffre d'affaires généré, compétences développées en atelier.</li>
            <li><span className="font-bold">Impact social et local :</span> taux d'insertion professionnelle, partenariats locaux, bénéfices pour le territoire.</li>
            <li><span className="font-bold">Gouvernance et organisation :</span> composition de l'équipe, de l’organigramme.</li>
            <li><span className="font-bold">Informations financières :</span> utilisation des fonds, budget prévisionnel vs. réalisé, perspectives.</li>
            <li><span className="font-bold">Perspectives :</span> projets futurs, objectifs pour l'année à venir.</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-8 shadow-lg border-2 border-[#2E5941]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-[#2E5941] flex items-center gap-3">
            <Download className="w-6 h-6" /> Télécharger le modèle de rapport
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="text-base text-gray-800 flex-1">
            <p className="mb-2">
              Ce support au format PowerPoint est prêt à être personnalisé avec les données de l'école de production de votre client. Il constitue une base de travail efficace pour gagner un temps précieux et optimiser la communication avec les partenaires.
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-bold">Conseil :</span> adaptez le niveau de détail et le langage aux attentes spécifiques de chaque partenaire pour un maximum d'impact.
            </p>
          </div>
          <a
            href={rapportFilePath}
            download="ANNEXE 21 - MODELE DE RAPPORT ADAPTE.pptx"
            className="flex-shrink-0"
          >
            <Button className="bg-[#2E5941] hover:bg-[#3C5F58] text-white flex items-center gap-2 py-3 px-6 text-lg">
              <Download className="w-5 h-5" /> Télécharger le modèle
            </Button>
          </a>
        </CardContent>
      </Card>

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

export default RapportAdapte;