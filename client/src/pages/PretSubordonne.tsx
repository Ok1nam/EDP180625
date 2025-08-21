import React from 'react';
import { Handshake, Download, FileText, PiggyBank } from "lucide-react";
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
        Le Prêt Subordonné : un levier stratégique pour votre École de Production
      </h1>

      <p className="mb-8 text-lg text-gray-700 leading-relaxed">
        Le prêt subordonné est un outil de financement hybride, situé entre les fonds propres et les dettes bancaires classiques. Pour une École de Production, il représente un moyen efficace de sécuriser les premières années d’activité, en renforçant la structure financière sans alourdir immédiatement la charge de remboursement.
      </p>

      {/* Section Pourquoi recourir à un Prêt Subordonné ? */}
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-[#3C5F58] flex items-center gap-2">
            <PiggyBank className="w-5 h-5 text-[#3C5F58]" />
            Pourquoi recourir à un Prêt Subordonné ?
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-gray-700">
          <p className="mb-4">
            Ce type de financement présente plusieurs atouts pour les porteurs de projet :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="font-bold">Renforcer la solidité financière</span> : Bien que classé en dette, il est souvent assimilé à des quasi-fonds propres, améliorant la perception de solvabilité par les financeurs.</li>
            <li><span className="font-bold">Faciliter l’accès à d’autres financements</span> : Il rassure les banques et organismes publics, ouvrant la porte à des prêts complémentaires.</li>
            <li><span className="font-bold">Alléger la pression sur la trésorerie</span> : Les remboursements peuvent être différés, laissant du temps pour que l’école atteigne sa vitesse de croisière.</li>
            <li><span className="font-bold">Encadrer le risque</span> : Les modalités de subordination assurent que ce prêt est remboursé après les autres dettes, ce qui le rend plus souple pour l’emprunteur.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Section Les éléments clés du modèle de contrat */}
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-[#3C5F58] flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#3C5F58]" />
            Les éléments clés du modèle de contrat
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-gray-700">
          <p className="mb-4">
            Le modèle de contrat inclus dans cet outil précise notamment :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="font-bold">Durée et modalités de remboursement</span> : Souvent longues (7 à 10 ans), avec possibilité de différé.</li>
            <li><span className="font-bold">Conditions financières</span> : Taux d’intérêt fixe, calcul et échéancier détaillés.</li>
            <li><span className="font-bold">Clauses de subordination</span> : Remboursement après désintéressement des autres créanciers.</li>
            <li><span className="font-bold">Obligations de l’emprunteur</span> : Utilisation des fonds, respect des conditions FNEP, reporting régulier.</li>
            <li><span className="font-bold">Références juridiques</span> : Code monétaire et financier, Code de commerce, Plan Comptable Général.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Téléchargement du document original */}
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-[#3C5F58] flex items-center gap-2">
            <Download className="w-5 h-5 text-[#3C5F58]" />
            Télécharger le Modèle de Contrat
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-center">
          <p className="mb-4">
            Accédez à notre modèle complet de contrat, conforme aux exigences des partenaires institutionnels (Banque des Territoires, France Active, etc.). Il est fourni au format .docx pour être adapté à votre projet.
          </p>
          {/* Le lien de téléchargement a été mis à jour avec le nouveau nom de fichier */}
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
