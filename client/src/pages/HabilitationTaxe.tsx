import React from 'react';
import { ShieldCheck, Download, FileText, BookOpen, Lightbulb, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface HabilitationTaxeProps {
  navigate?: (page: string) => void;
}

export default function HabilitationTaxe({ navigate }: HabilitationTaxeProps) {
  return (
    <section id="habilitation-taxe" className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="flex items-center gap-3 mb-6 text-3xl font-bold text-[#3C5F58]">
        <ShieldCheck className="w-8 h-8 text-[#3C5F58]" />
        Habilitation Taxe d'Apprentissage : Le Guide SOLTéA
      </h1>
      
      <p className="mb-8 text-lg text-gray-700 leading-relaxed">
        Depuis 2024, la procédure d’habilitation pour percevoir le solde de la taxe d’apprentissage a été entièrement dématérialisée via la plateforme nationale SOLTéA. Le formulaire CERFA n°10103*03 n’est plus en usage. Ce guide a pour objectif d’accompagner les Écoles de Production (EdP) dans leur démarche pour bénéficier de cette ressource essentielle.
      </p>

      {/* Objectifs du guide */}
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-[#3C5F58] flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#3C5F58]" />
            Objectifs de ce guide
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-gray-700">
          <p className="mb-4">Ce document pratique, inspiré du guide utilisateur officiel de SOLTéA, est adapté aux spécificités des Écoles de Production. Il :</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="font-bold">détaille les étapes clés</span> du dépôt de demande sur la plateforme SOLTéA,</li>
            <li><span className="font-bold">précise les éléments attendus</span> (informations, pièces justificatives, formations RNCP...),</li>
            <li><span className="font-bold">alerte sur les points de vigilance</span> pour éviter les rejets ou retards,</li>
            <li><span className="font-bold">rappelle les références réglementaires</span> à connaître pour comprendre le processus.</li>
          </ul>
        </CardContent>
      </Card>
      
      {/* A savoir */}
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-[#3C5F58] flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-[#3C5F58]" />
            Points de vigilance
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-gray-700">
          <p className="italic text-sm">
            L’habilitation obtenue via SOLTéA n’est effective qu’après publication officielle des listes par les services de l’État en région (préfectures) ou par arrêté ministériel, généralement entre avril et mai.
          </p>
        </CardContent>
      </Card>

      {/* Section Téléchargement du Guide */}
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-[#3C5F58] flex items-center gap-2">
            <Download className="w-5 h-5 text-[#3C5F58]" />
            Télécharger le document d'Habilitation
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-gray-700 space-y-4">
          <p className="text-center">
            Ce document vous accompagne pas à pas dans votre démarche d'habilitation sur la plateforme SOLTéA.
          </p>
          <div className="flex justify-center items-center">
            {/* Bouton pour télécharger le guide PDF (uniquement) */}
            <a href="/fichiers/Annexe 17 - Exemple de formulaire de demande d'habilitation taxe apprentissage.pdf" download>
              <Button className="bg-[#2E5941] hover:bg-[#3C5F58] text-white">
                <FileText className="w-4 h-4 mr-2" />
                Télécharger le guide (PDF)
              </Button>
            </a>
          </div>
          <p className="italic text-sm text-gray-600 mt-4 text-center">
            Pour plus d'informations, vous pouvez vous rendre sur la <a href="https://soltea.education.gouv.fr" target="_blank" rel="noopener noreferrer" className="text-[#3C5F58] hover:underline inline-flex items-center gap-1">plateforme SOLTéA <ExternalLink size={14}/></a>.
          </p>
        </CardContent>
      </Card>

      {/* Bouton de retour à l'accueil */}
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