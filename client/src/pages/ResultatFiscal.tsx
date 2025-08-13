import React from 'react';
import { Download, FileText, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ResultatFiscalProps {
    navigate: (page: string) => void;
}

const ResultatFiscal: React.FC<ResultatFiscalProps> = ({ navigate }) => {
  // Chemin mis à jour vers le nouveau fichier Excel
  const excelFilePath = "/fichiers/ANNEXE 6 ET 7 - Trame calcul coefficient déduction et résultat fiscal 080825.xlsm";

  return (
    <section id="resultat-fiscal" className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="flex items-center gap-2 mb-6 text-3xl font-bold text-gray-800">
        <TrendingUp className="w-8 h-8 text-[#3C5F58]" />
        Trame de Calcul du Résultat Fiscal : de l'approche comptable à la réalité fiscale
      </h1>

      <p className="mb-8 text-lg text-gray-700 leading-relaxed">
        En tant qu'expert-comptable, la détermination du résultat fiscal d'une École de Production est une étape fondamentale. Elle exige une méthodologie rigoureuse pour concilier le résultat comptable et le résultat imposable. Cette trame est un outil essentiel pour identifier et appliquer les retraitements extra-comptables spécifiques à ces établissements, garantissant ainsi une déclaration fiscale précise et conforme.
      </p>

      <Card className="mb-8 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center gap-2 text-[#3C5F58]">
            <FileText className="w-5 h-5 text-[#3C5F58]" />
            Méthodologie du Calcul
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-700 space-y-4">
          <p>
            Le résultat fiscal est calculé à partir du résultat comptable (avant impôt), en y apportant des <span className="font-bold">ajustements extra-comptables</span>. Ces retraitements sont indispensables pour se conformer aux règles fiscales qui peuvent différer des normes comptables.
          </p>
          <p>
            Les principaux retraitements à considérer sont :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <span className="font-bold">Réintégrations</span> : Il s'agit d'ajouter au résultat comptable les charges qui, bien que déductibles comptablement, ne sont pas admises fiscalement (ex : certaines amortissements, amendes, pénalités...).
            </li>
            <li>
              <span className="font-bold">Déductions</span> : À l'inverse, il faut soustraire du résultat comptable les produits non imposables ou les charges non déduites comptablement mais admises fiscalement (ex : produits financiers non imposables, reprises de provisions réglementées...).
            </li>
          </ul>
          <p>
            Notre fichier Excel vous guide pas à pas dans l'application de ces ajustements, vous permettant ainsi d'obtenir un résultat fiscal fiable et conforme.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8 shadow-lg border-2 border-[#3C5F58]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-[#3C5F58] flex items-center gap-3">
            <Download className="w-6 h-6" /> Télécharger la Trame de Calcul
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="text-base text-gray-800 flex-1">
            <p className="mb-2">
              Téléchargez le fichier Excel qui vous permettra de calculer le résultat fiscal de votre client.
            </p>
            <p className="text-sm text-gray-600">
              Note importante : Ce fichier est <span className="font-bold">lié</span> à plusieurs de nos outils. Il est essentiel de le remplir avec les données spécifiques de l'École de Production de votre client avant d'utiliser les calculateurs.
            </p>
          </div>
          <a
            href={excelFilePath}
            download="ANNEXE 6 ET 7 - Trame calcul coefficient déduction et résultat fiscal 080825.xlsm" // Nom du fichier Excel mis à jour
            className="flex-shrink-0"
          >
            <Button className="flex items-center gap-2 py-3 px-6 text-lg bg-[#2E5941] text-white rounded-md hover:bg-[#3C5F58] transition-colors">
              <Download className="w-5 h-5" /> Télécharger le fichier
            </Button>
          </a>
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center gap-2 text-[#3C5F58]">
            <FileText className="w-5 h-5 text-[#3C5F58]" />
            Points Clés et Bonnes Pratiques
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-700 space-y-4">
          <p>
            Pour garantir la justesse de votre calcul et la conformité des déclarations :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Point de départ : Basez-vous toujours sur le bilan et le compte de résultat comptable finalisé de l'établissement.</li>
            <li>Identification des retraitements : Identifiez méticuleusement toutes les charges et produits pouvant faire l'objet de retraitements fiscaux, spécifiques aux organismes sans but lucratif ou aux Écoles de Production.</li>
            <li>Veille fiscale : Restez informé des évolutions de la législation fiscale en vigueur.</li>
            <li>Validation : Pour les situations complexes, n'hésitez pas à solliciter l'avis d'un spécialiste en droit fiscal.</li>
          </ul>
          <p>
            Ce document est un outil d'aide et de formalisation ; il ne saurait se substituer à une consultation juridique ou fiscale approfondie.
          </p>
          <div className="text-center mt-8">
            <Button
              onClick={() => navigate('accueil')}
              className="px-6 py-3 bg-[#2E5941] text-white rounded-md hover:bg-[#3C5F58] transition-colors text-lg"
            >
              Retour à l'accueil
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default ResultatFiscal;