import React from 'react';
import { Handshake, Download, FileText, PiggyBank, Briefcase } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PretSubordonneProps {
  navigate?: (page: string) => void;
}

export default function PretSubordonne({ navigate }: PretSubordonneProps) {
  return (
    <section id="pret-subordonne" className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="flex items-center gap-3 mb-6 text-3xl font-bold text-[#3C5F58]">
        <Handshake className="w-8 h-8 text-[#3C5F58]" />
        Le prêt subordonné : un levier financier pour votre client
      </h1>

      <p className="mb-8 text-lg text-gray-700 leading-relaxed">
        Le prêt subordonné est un outil de financement hybride qui peut considérablement renforcer la structure financière de votre client. En tant qu'expert-comptable, vous pouvez présenter ce modèle de contrat à l'école de production pour sécuriser ses premières années d’activité. C'est un moyen d'améliorer sa solvabilité perçue, sans alourdir immédiatement la charge de remboursement.
      </p>

      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-[#3C5F58] flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-gray-500" />
            Les bénéfices pour le montage financier de votre client
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-gray-700">
          <p className="mb-4">
            Ce type de financement présente plusieurs atouts que vous pouvez mettre en avant :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="font-bold">Renforcer la solidité financière :</span> bien qu'il s'agisse d'une dette, le prêt subordonné est assimilé à des quasi-fonds propres, ce qui rassure les autres financeurs.</li>
            <li><span className="font-bold">Faciliter l’accès à d’autres financements :</span> ce type de prêt peut servir de levier pour obtenir des prêts bancaires complémentaires.</li>
            <li><span className="font-bold">Alléger la pression sur la trésorerie :</span> les remboursements peuvent être différés, ce qui laisse du temps à l'école pour atteindre son équilibre économique.</li>
            <li><span className="font-bold">Encadrer le risque :</span> les modalités de subordination assurent que ce prêt est remboursé après les autres dettes, ce qui le rend plus flexible pour l’emprunteur.</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-[#3C5F58] flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#3C5F58]" />
            Les éléments clés du modèle pour votre analyse
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-gray-700">
          <p className="mb-4">
            Le modèle de contrat inclus dans cet outil vous permettra d'analyser en détail :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="font-bold">la durée et les modalités de remboursement :</span> souvent longues (7 à 10 ans), avec possibilité de différé.</li>
            <li><span className="font-bold">les conditions financières :</span> taux d’intérêt fixe, calcul et échéancier détaillés.</li>
            <li><span className="font-bold">les clauses de subordination :</span> remboursement après désintéressement des autres créanciers.</li>
            <li><span className="font-bold">les obligations de l’emprunteur :</span> utilisation des fonds, respect des conditions FNEP, reporting régulier.</li>
            <li><span className="font-bold">les références juridiques :</span> code monétaire et financier, code de commerce, plan comptable général.</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-[#3C5F58] flex items-center gap-2">
            <Download className="w-5 h-5 text-[#3C5F58]" />
            Télécharger le modèle de contrat
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-center">
          <p className="mb-4">
            Téléchargez ce modèle de contrat complet, conforme aux exigences des partenaires institutionnels. Il est fourni au format .docx pour que vous puissiez l'adapter spécifiquement au projet de votre client.
          </p>
          <a href="/fichiers/ANNEXE 16 - EXEMPLE DE CONTRAT DE PRET SUBORDONNE.docx" download="ANNEXE 16 - EXEMPLE DE CONTRAT DE PRET SUBORDONNE.docx">
            <Button className="bg-[#2E5941] hover:bg-[#3C5F58] text-white">
              <Download className="w-4 h-4 mr-2" />
              Télécharger le fichier .docx
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
}