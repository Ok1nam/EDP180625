// client/src/pages/TvaCoefficient.tsx

import React from 'react';
import { Download, Percent, Calculator } from "lucide-react"; // Import des icônes
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TvaCoefficientProps {
    navigate: (page: string) => void; // Ajout de la prop navigate
}

const TvaCoefficient: React.FC<TvaCoefficientProps> = ({ navigate }) => {
  // Le chemin du fichier doit être relatif au dossier 'public' à la racine de votre projet.
  const excelFilePath = "/fichiers/ECOLE_DE_PRODUCTION_MODELE.xlsx"; 

  return (
    <section id="tva-coefficient" className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="flex items-center gap-2 mb-6 text-3xl font-bold text-gray-800">
        <Percent className="w-8 h-8 text-primary" /> {/* Icône plus pertinente pour la TVA/pourcentage */}
        Trame de Calcul du Coefficient de Déduction de TVA
      </h1>

      <p className="mb-8 text-lg text-gray-700 leading-relaxed">
        Le calcul du coefficient de déduction de TVA est un aspect fiscal essentiel pour les Écoles de Production réalisant à la fois des activités assujetties à la TVA et des activités exonérées. Ce coefficient permet de déterminer la part de TVA déductible sur les dépenses communes.
      </p>

      {/* Section Méthodologie détaillée */}
      <Card className="mb-8 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <Calculator className="w-5 h-5" /> {/* Icône pour le calcul */}
            Méthodologie et Importance du Coefficient
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-700 space-y-4">
          <p>
            Le coefficient de déduction de TVA est calculé pour les biens et services utilisés de manière mixte (pour des opérations soumises à TVA et des opérations non soumises ou exonérées). Il est composé de trois éléments :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              **Coefficient d'assujettissement :** La proportion d'utilisation des biens et services pour des opérations situées dans le champ d'application de la TVA.
            </li>
            <li>
              **Coefficient de taxation :** La proportion d'utilisation des biens et services pour des opérations ouvrant droit à déduction.
            </li>
            <li>
              **Coefficient d'admission :** Qui tient compte des exclusions spécifiques (ex: dépenses de logement).
            </li>
          </ul>
          <p>
            Pour les Écoles de Production, ce calcul est particulièrement pertinent en raison de la nature mixte de leurs activités (vente de produits/services assujettie et formation/pédagogie souvent exonérée). Le fichier Excel vous guide dans la détermination de ce coefficient pour optimiser la récupération de TVA.
          </p>
          <p className="font-semibold text-gray-800 mt-4">
            Ce coefficient doit être mis à jour annuellement ou à chaque modification significative des activités de l'école.
          </p>
        </CardContent>
      </Card>

      {/* Section Téléchargement du fichier */}
      <Card className="mb-8 shadow-lg border-2 border-blue-500">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-blue-700 flex items-center gap-3">
            <Download className="w-6 h-6" /> Télécharger la Trame de Calcul
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="text-base text-gray-800 flex-1">
            <p className="mb-2">
              Cliquez ci-dessous pour télécharger le fichier Excel qui vous permettra de calculer votre coefficient de déduction de TVA.
            </p>
            <p className="text-sm text-gray-600">
              **Note importante :** Ce fichier Excel est un support commun utilisé par plusieurs de nos outils (<span
                className="text-blue-600 hover:underline cursor-pointer"
                onClick={() => navigate('plan-comptable')}
              >
                plan comptable
              </span>, <span
                className="text-blue-600 hover:underline cursor-pointer"
                onClick={() => navigate('tva-coefficient')} // Lien vers cette page
              >
                coefficient de déduction TVA
              </span>, et <span
                className="text-blue-600 hover:underline cursor-pointer"
                onClick={() => navigate('resultat-fiscal')}
              >
                résultat fiscal
              </span>). Il est essentiel de le remplir avec les données spécifiques à votre école avant d'utiliser les calculateurs.
            </p>
          </div>
          <a
            href={excelFilePath}
            download="TRAME_COEFFICIENT_TVA_MODELE.xlsx" // Nom du fichier suggéré au téléchargement
            className="flex-shrink-0"
          >
            <Button className="btn-primary flex items-center gap-2 py-3 px-6 text-lg">
              <Download className="w-5 h-5" /> Télécharger le fichier
            </Button>
          </a>
        </CardContent>
      </Card>

      {/* Section Conseils d'optimisation (Optionnel mais utile) */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <Percent className="w-5 h-5" />
            Conseils d'Optimisation Fiscale
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-700 space-y-4">
          <p>
            Pour une gestion optimale de la TVA :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Distinguez précisément vos recettes assujetties et non assujetties/exonérées.</li>
            <li>Suivez rigoureusement l'affectation de vos dépenses (totalement assujetties, totalement non assujetties, mixtes).</li>
            <li>Conservez tous les justificatifs pour vos opérations ouvrant droit à déduction.</li>
            <li>Consultez votre expert-comptable pour valider vos calculs et pour toute question spécifique sur la TVA applicable à votre école.</li>
          </ul>
          <p>
            Une bonne maîtrise de ce coefficient permet d'éviter des redressements et d'optimiser votre trésorerie.
          </p>
        </CardContent>
      </Card>
    </section>
  );
};

export default TvaCoefficient;