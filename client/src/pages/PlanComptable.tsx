import React from 'react';
import { Download, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PlanComptableProps {
    navigate: (page: string) => void;
}

const PlanComptable: React.FC<PlanComptableProps> = ({ navigate }) => {
  const excelFilePath = "/fichiers/ANNEXE 4 - EXEMPLE DE PLAN COMPTABLE ADAPTE.xlsx";

  return (
    <section id="plan-comptable" className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="flex items-center gap-2 mb-6 text-3xl font-bold text-gray-800">
        <FileText className="w-8 h-8 text-primary" />
        Plan Comptable Adapté : un outil stratégique pour la gestion des Écoles de Production
      </h1>

      <p className="mb-8 text-lg text-gray-700 leading-relaxed">
        L'accompagnement d'une École de Production nécessite une approche comptable sur mesure, capable de refléter la dualité de sa mission : la formation des jeunes et l'activité économique. Ce plan comptable, élaboré spécifiquement pour ces structures, est une base de travail essentielle pour l'expert-comptable. Il vous permet de structurer la comptabilité de manière optimisée, en prenant en compte les spécificités uniques de leur modèle économique.
      </p>

      <Card className="mb-8 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Importance et Adaptabilité
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-700 space-y-4">
          <p>
            Ce modèle de plan comptable n'est pas un simple document, c'est un levier de pilotage. Il a été conçu pour vous aider à traduire la réalité de l'École de Production dans une structure comptable logique et cohérente. Il intègre notamment les comptes nécessaires pour :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Gérer les flux financiers liés aux activités de production.</li>
            <li>Enregistrer les subventions de fonctionnement et d'investissement.</li>
            <li>Suivre les charges de formation et les coûts pédagogiques.</li>
          </ul>
          <p>
            Nous vous encourageons vivement à l'utiliser comme point de départ, en l'affinant par la création de sous-comptes analytiques. Cette personnalisation est la clé pour offrir à votre client un reporting financier sur mesure, facilitant ainsi les prises de décision et la communication avec les parties prenantes.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8 shadow-lg border-2 border-blue-500">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-blue-700 flex items-center gap-3">
            <Download className="w-6 h-6" /> Télécharger le Plan Comptable
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="text-base text-gray-800 flex-1">
            <p className="mb-2">
              Cliquez ci-dessous pour télécharger le fichier Excel du plan comptable.
            </p>
            <p className="text-sm text-gray-600">
              **Note importante :** Ce fichier Excel est un support commun utilisé par plusieurs de nos outils pour les Écoles de Production. Il est essentiel de le remplir avec les données spécifiques de votre client avant d'utiliser les calculateurs associés.
            </p>
          </div>
          <a
            href={excelFilePath}
            download="ANNEXE 4 - EXEMPLE DE PLAN COMPTABLE ADAPTE.xlsx"
            className="flex-shrink-0"
          >
            <Button className="btn-primary flex items-center gap-2 py-3 px-6 text-lg">
              <Download className="w-5 h-5" /> Télécharger le fichier
            </Button>
          </a>
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Conseils d'utilisation
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-700 space-y-4">
          <p>
            Pour tirer le meilleur parti de cet outil, suivez ces quelques recommandations :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Adaptez le plan aux spécificités de votre client. Chaque école a des activités de production et des besoins de suivi uniques.</li>
            <li>Validez les choix comptables avec la direction de l'école. L'implication du dirigeant est primordiale pour la pertinence et l'adhésion au système.</li>
            <li>Considérez ce plan comme un document vivant. Mettez-le à jour régulièrement pour qu'il suive l'évolution de l'école, l'ajout de nouvelles filières ou de nouvelles subventions.</li>
          </ul>
        </CardContent>
      </Card>
    </section>
  );
};

export default PlanComptable;
