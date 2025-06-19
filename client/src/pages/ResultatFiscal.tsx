// client/src/pages/ResultatFiscal.tsx

import React from 'react';
import { Download, FileText, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ResultatFiscalProps {
    navigate: (page: string) => void; // Prop navigate ajoutée
}

const ResultatFiscal: React.FC<ResultatFiscalProps> = ({ navigate }) => {
  const excelFilePath = "/fichiers/ECOLE_DE_PRODUCTION_MODELE.xlsx";

  return (
    <section id="resultat-fiscal" className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="flex items-center gap-2 mb-6 text-3xl font-bold text-gray-800">
        <TrendingUp className="w-8 h-8 text-primary" />
        Trame de Calcul du Résultat Fiscal
      </h1>

      <p className="mb-8 text-lg text-gray-700 leading-relaxed">
        Comprendre et calculer le résultat fiscal est une étape essentielle pour toute École de Production. Cette trame vous guide à travers les ajustements nécessaires entre le résultat comptable et le résultat imposable, en tenant compte des spécificités fiscales propres à votre statut.
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
            Le résultat fiscal se détermine à partir du résultat comptable (avant impôt) en lui appliquant des **retraitements extra-comptables**. Ces retraitements sont nécessaires pour respecter les règles fiscales qui peuvent différer des règles comptables.
          </p>
          <p>
            Les principaux types de retraitements sont :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              **Réintégrations :** Ajout au résultat comptable de charges qui sont déductibles d'un point de vue comptable mais non admises fiscalement (ex: certaines amortissements non-déductibles, amendes, etc.).
            </li>
            <li>
              **Déductions :** Soustraction du résultat comptable de produits non imposables ou de charges non déduites comptablement mais admises fiscalement (ex: produits non imposables, provisions réglementées, etc.).
            </li>
          </ul>
          <p>
            Notre fichier Excel vous accompagnera pas à pas dans l'identification et l'application de ces ajustements, afin d'obtenir un résultat fiscal précis et conforme.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8 shadow-lg border-2 border-blue-500">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-blue-700 flex items-center gap-3">
            <Download className="w-6 h-6" /> Télécharger la Trame de Calcul
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="text-base text-gray-800 flex-1">
            <p className="mb-2">
              Cliquez ci-dessous pour télécharger le fichier Excel qui vous permettra de calculer votre résultat fiscal.
            </p>
            <p className="text-sm text-gray-600">
              **Note importante :** Ce fichier Excel est un support commun utilisé par plusieurs de nos outils (<span
                className="text-blue-600 hover:underline cursor-pointer"
                onClick={() => navigate('plan-comptable')} // Lien vers Plan Comptable
              >
                plan comptable
              </span>, <span
                className="text-blue-600 hover:underline cursor-pointer"
                onClick={() => navigate('tva-coefficient')} // Lien vers Coefficient TVA
              >
                coefficient de déduction TVA
              </span>, et <span
                className="text-blue-600 hover:underline cursor-pointer"
                onClick={() => navigate('resultat-fiscal')} // Lien vers cette page (optionnel)
              >
                résultat fiscal
              </span>). Il est essentiel de le remplir avec les données spécifiques à votre école avant d'utiliser les calculateurs.
            </p>
          </div>
          <a
            href={excelFilePath}
            download="TRAME_RESULTAT_FISCAL_MODELE.xlsx"
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
            Pour garantir la justesse de votre calcul du résultat fiscal :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Toujours partir de votre bilan et compte de résultat comptable finalisé.</li>
            <li>Bien identifier toutes les charges et produits qui peuvent faire l'objet de retraitements fiscaux.</li>
            <li>Consulter régulièrement la législation fiscale en vigueur, qui peut évoluer.</li>
            <li>Ne pas hésiter à solliciter l'aide de votre expert-comptable pour les cas complexes ou la validation finale.</li>
          </ul>
          <p>
            Ce document est un outil d'aide ; il ne remplace pas l'expertise d'un professionnel du droit fiscal.
          </p>
        </CardContent>
      </Card>
    </section>
  );
};

export default ResultatFiscal;