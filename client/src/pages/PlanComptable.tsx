// client/src/pages/PlanComptable.tsx

import React from 'react';
import { Download, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PlanComptableProps {
    navigate: (page: string) => void;
}

const PlanComptable: React.FC<PlanComptableProps> = ({ navigate }) => {
  // Changement du chemin du fichier pour correspondre au nouveau nom
  const excelFilePath = "/fichiers/ANNEXE 4 - EXEMPLE DE PLAN COMPTABLE ADAPTE.xlsx";

  return (
    <section id="plan-comptable" className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="flex items-center gap-2 mb-6 text-3xl font-bold text-gray-800">
        <FileText className="w-8 h-8 text-primary" />
        Plan Comptable Adapté
      </h1>

      <p className="mb-8 text-lg text-gray-700 leading-relaxed">
        Ce plan comptable est spécifiquement conçu pour accompagner la comptabilité d'une **École de Production**. En tant qu'expert-comptable, cet outil vous permet d'avoir une structure comptable optimisée pour les spécificités des activités pédagogiques et de production de ce type de client, facilitant ainsi la gestion et le suivi financier de leur établissement.
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
            L'adaptation d'un plan comptable est cruciale pour refléter fidèlement la réalité économique d'une École de Production. Ce modèle est conçu pour vous servir de base, en prenant en compte les spécificités de leur activité : la production de biens ou services par les élèves, les subventions spécifiques, et les charges liées à la formation.
          </p>
          <p>
            Il vous servira de base pour organiser leurs comptes, enregistrer leurs opérations et préparer leurs états financiers. N'hésitez pas à l'adapter précisément au contexte unique de votre client, notamment en ajoutant des sous-comptes pertinents pour un suivi détaillé et un reporting sur mesure.
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
            Pour une utilisation optimale de ce plan comptable, nous vous recommandons de :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Revoir les comptes proposés et les adapter aux spécificités des activités de votre client.</li>
            <li>Ajouter des sous-comptes pour un suivi analytique précis de leurs projets et filières.</li>
            <li>Valider les adaptations avec le responsable de l'école pour assurer la cohérence et l'adhésion.</li>
            <li>Mettre à jour régulièrement ce plan en fonction de l'évolution de l'école.</li>
          </ul>
        </CardContent>
      </Card>
    </section>
  );
};

export default PlanComptable;