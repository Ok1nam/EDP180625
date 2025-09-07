import React from 'react';
import { Download, Percent, Calculator, FileText, Briefcase } from "lucide-react"; 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TvaCoefficientProps {
    navigate: (page: string) => void;
}

const TvaCoefficient: React.FC<TvaCoefficientProps> = ({ navigate }) => {
  // ✅ Chemin et nom du fichier mis à jour ici
  const excelFilePath = "/fichiers/ANNEXE 6-7 - TRAME D'AIDE AU CALCUL DE LA TVA, DE LA TS ET DU RESULTAT FISCAL.xlsm"; 

  return (
    <section id="tva-coefficient" className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="flex items-center gap-2 mb-6 text-3xl font-bold text-[#3C5F58]">
        <Percent className="w-8 h-8" />
        Trame d’aide au calcul TVA, TS et résultat fiscal
      </h1>

      <p className="mb-8 text-lg text-gray-700 leading-relaxed">
        La gestion fiscale d’une école de production présente des spécificités importantes. En tant qu'expert-comptable, il est essentiel de déterminer avec rigueur la part de TVA déductible, le coefficient d'assujettissement à la taxe sur les salaires et le résultat fiscal de votre client. Cette trame de calcul est un outil indispensable pour formaliser et justifier ces trois aspects clés.
      </p>

      <Card className="mb-8 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center gap-2 text-[#2E5941]">
            <Calculator className="w-5 h-5" />
            Comprendre les calculs fiscaux
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-700 space-y-4">
          <p>
            Cet outil vous guide sur trois calculs essentiels pour une école de production :
          </p>
          <ul className="list-disc pl-5 space-y-3">
            <li>
              <span className="font-bold">Coefficient de déduction de TVA :</span> il permet de calculer la proportion de TVA récupérable sur les dépenses mixtes (utilisées pour l'activité pédagogique exonérée et l'activité de production soumise).
            </li>
            <li>
              <span className="font-bold">Coefficient d'assujettissement à la taxe sur les salaires (TS) :</span> ce ratio est crucial pour déterminer la part des salaires soumise à cette taxe.
            </li>
            <li>
              <span className="font-bold">Résultat fiscal :</span> la trame vous aide à déterminer le résultat fiscal de l'activité lucrative, en partant du résultat comptable et en appliquant les réintégrations et déductions fiscales propres au statut de l'association.
            </li>
          </ul>
        </CardContent>
      </Card>
        
      <Card className="mb-8 shadow-lg border-2 border-[#2E5941]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-[#2E5941] flex items-center gap-3">
            <Download className="w-6 h-6" /> Télécharger la trame de calcul
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="text-base text-gray-800 flex-1">
            <p className="mb-2">
              Téléchargez la trame de calcul Excel pour vous aider à déterminer le coefficient de déduction de TVA, le coefficient d'assujettissement à la taxe sur les salaires et le résultat fiscal de votre client.
            </p>
            <p className="text-sm text-gray-600 font-bold">
              Note importante : ce fichier est lié à plusieurs de nos outils. Il est essentiel de le remplir avec les données spécifiques de l'école avant d'utiliser les calculateurs.
            </p>
          </div>
          <a
            href={excelFilePath}
            // ✅ Nom du fichier pour le téléchargement mis à jour ici
            download="ANNEXE 6-7 - TRAME D'AIDE AU CALCUL DE LA TVA, DE LA TS ET DU RESULTAT FISCAL.xlsm"
            className="flex-shrink-0"
          >
            <Button className="bg-[#2E5941] hover:bg-[#3C5F58] text-white flex items-center gap-2 py-3 px-6 text-lg">
              <Download className="w-5 h-5" /> Télécharger le fichier
            </Button>
          </a>
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center gap-2 text-[#2E5941]">
            <FileText className="w-5 h-5" />
            Conseils pour une gestion rigoureuse
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-700 space-y-4">
          <p>
            Pour garantir la conformité fiscale et sécuriser les déclarations de votre client, une attention particulière doit être portée sur les points suivants :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="font-bold">Sectorisation comptable :</span> une séparation claire des activités (lucratives et non lucratives) est la base de tous ces calculs.</li>
            <li><span className="font-bold">Identification des recettes :</span> séparez rigoureusement les recettes assujetties à la TVA de celles qui sont exonérées.</li>
            <li><span className="font-bold">Suivi des dépenses :</span> assurez un suivi analytique précis de l'affectation des dépenses mutualisées.</li>
            <li><span className="font-bold">Calcul annuel :</span> les coefficients sont déterminés à la clôture de l'exercice et s'appliquent à titre provisoire pour l'année suivante, avec une régularisation en fin d'année.</li>
          </ul>
        </CardContent>
      </Card>
    </section>
  );
};

export default TvaCoefficient;