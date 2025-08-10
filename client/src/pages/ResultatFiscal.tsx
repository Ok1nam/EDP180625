// client/src/pages/ResultatFiscal.tsx

import React from 'react';
import { Download, FileText, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ResultatFiscalProps {
    navigate: (page: string) => void; // Prop navigate ajoutée
}

const ResultatFiscal: React.FC<ResultatFiscalProps> = ({ navigate }) => {
  // Chemin mis à jour vers le nouveau fichier Excel
  const excelFilePath = "/fichiers/ANNEXE 6 ET 7 - Trame calcul coefficient déduction et résultat fiscal 080825.xlsm";

  return (
    <section id="resultat-fiscal" className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="flex items-center gap-2 mb-6 text-3xl font-bold text-gray-800">
        <TrendingUp className="w-8 h-8 text-primary" />
        Trame de Calcul du Résultat Fiscal
      </h1>

      <p className="mb-8 text-lg text-gray-700 leading-relaxed">
        En tant qu'expert-comptable, maîtriser le calcul du résultat fiscal de votre client, une École de Production, est fondamental. Cette trame est conçue pour vous guider à travers les ajustements nécessaires entre le résultat comptable et le résultat imposable, en intégrant les spécificités fiscales propres à ces établissements.
      </p>

      <Card className="mb-8 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Méthodologie du Calcul
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-700 space-y-4">
          <p>
            Le résultat fiscal se détermine à partir du résultat comptable (avant impôt) de l'École de Production, en y appliquant des **retraitements extra-comptables**. Ces retraitements sont indispensables pour aligner le résultat comptable avec les règles fiscales, qui peuvent différer des normes comptables.
          </p>
          <p>
            Les principaux types de retraitements à considérer sont :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              **Réintégrations :** Il s'agit d'ajouter au résultat comptable les charges qui sont déductibles d'un point de vue comptable mais non admises fiscalement (ex: certaines amortissements non-déductibles, amendes, pénalités, etc.).
            </li>
            <li>
              **Déductions :** Inversement, il faut soustraire du résultat comptable les produits non imposables ou les charges non déduites comptablement mais admises fiscalement (ex: certains produits financiers non imposables, reprises de provisions réglementées, etc.).
            </li>
          </ul>
          <p>
            Notre fichier Excel vous accompagnera pas à pas dans l'identification et l'application de ces ajustements, vous permettant d'obtenir un résultat fiscal précis et conforme pour l'établissement.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8 shadow-lg border-2 border-blue-500">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-blue-700 flex items-center gap-3">
            <Download className="w-6 h-6" /> Télécharger la Trame de Calcul
          </CardTitle>
G        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="text-base text-gray-800 flex-1">
            <p className="mb-2">
              Cliquez ci-dessous pour télécharger le fichier Excel qui vous permettra de calculer le résultat fiscal de votre client.
            </p>
            <p className="text-sm text-gray-600">
              **Note importante :** Ce fichier Excel est **lié** à plusieurs de nos outils. Il est essentiel de le remplir avec les données spécifiques de l'École de Production de votre client avant d'utiliser les calculateurs.
            </p>
          </div>
          <a
            href={excelFilePath}
            download="ANNEXE 6 ET 7 - Trame calcul coefficient déduction et résultat fiscal 080825.xlsm" // Nom du fichier Excel mis à jour
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
            Points Clés et Bonnes Pratiques
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-700 space-y-4">
          <p>
            Pour garantir la justesse de votre calcul du résultat fiscal et la conformité des déclarations :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Toujours partir du bilan et compte de résultat comptable finalisé de l'établissement.</li>
            <li>Identifier méticuleusement toutes les charges et produits pouvant faire l'objet de retraitements fiscaux spécifiques aux organismes sans but lucratif ou aux Écoles de Production.</li>
            <li>Rester informé des évolutions de la législation fiscale en vigueur.</li>
            <li>N'hésitez pas à solliciter l'avis d'un spécialiste en droit fiscal pour les situations complexes ou pour la validation finale.</li>
          </ul>
          <p>
            Ce document est un outil d'aide ; il ne saurait se substituer à une consultation juridique ou fiscale approfondie.
          </p>
        </CardContent>
      </Card>
    </section>
  );
};

export default ResultatFiscal;