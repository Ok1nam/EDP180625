// client/src/pages/HabilitationTaxe.tsx

import React from 'react';
import { ShieldCheck, Download, School, FileText, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface HabilitationTaxeProps {
  navigate?: (page: string) => void;
}

export default function HabilitationTaxe({ navigate }: HabilitationTaxeProps) {
  return (
    <section id="habilitation-taxe" className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="flex items-center gap-3 mb-6 text-3xl font-bold text-gray-800">
        <ShieldCheck className="w-8 h-8 text-green-600" />
        Habilitation Taxe d'Apprentissage : Percevoir le Solde
      </h1>
      
      <p className="mb-8 text-lg text-gray-700 leading-relaxed">
        L'habilitation à percevoir le solde de la taxe d'apprentissage est une démarche essentielle pour les Écoles de Production. Ce solde représente 13% de la taxe et peut être directement versé par les entreprises aux établissements qu'elles soutiennent. Cette page vous fournit un exemple de formulaire pour vous accompagner dans ce processus.
      </p>

      {/* Section Le Solde de la Taxe d'Apprentissage */}
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-gray-700 flex items-center gap-2">
            <School className="w-5 h-5 text-blue-600" />
            Comprendre le Solde de la Taxe
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-gray-700 space-y-4">
          <p>
            Depuis la réforme de la formation professionnelle, la taxe d'apprentissage se décompose en deux parts distinctes :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>**Une part principale (87%) :** Collectée par les URSSAF et l'ACOSS pour financer l'apprentissage.</li>
            <li>**Le solde (13%) :** C'est le "hors quota" ou "solde", géré par la Caisse des Dépôts et Consignations (CDC) via la plateforme SOLTéA. Ce montant est versé par les entreprises aux établissements habilités qu'elles choisissent.</li>
          </ul>
          <p>
            Pour une École de Production, la capacité à percevoir ce solde est une source de financement directe et stratégique.
          </p>
        </CardContent>
      </Card>

      {/* Section L'Habilitation : Pourquoi et Comment */}
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-gray-700 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-orange-500" />
            Le processus d'Habilitation
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-gray-700 space-y-4">
          <p>
            Pour être habilitée à percevoir le solde, votre École de Production doit être inscrite sur la liste nationale des établissements et organismes de formation habilités. Cette inscription se fait généralement auprès de l'autorité compétente (comme la Délégation Régionale Académique à la Formation Professionnelle, Initiale et Continue - DRAFPIC).
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>**Critères d'éligibilité :** Les Écoles de Production sont éligibles en tant qu'organismes concourant aux missions de service public de l'enseignement technique.</li>
            <li>**La plateforme SOLTéA :** Une fois habilitée, votre école doit s'inscrire sur SOLTéA. C'est sur cette plateforme que les entreprises désignent les établissements qu'elles souhaitent soutenir.</li>
            <li>**Communication :** Il est crucial de communiquer à vos entreprises partenaires votre statut d'habilité et de les guider sur la procédure de versement via SOLTéA.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Section Téléchargement du Formulaire d'Exemple */}
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-gray-700 flex items-center gap-2">
            <Download className="w-5 h-5 text-blue-600" />
            Télécharger le Formulaire d'Habilitation
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-gray-700 space-y-4">
          <p>
            Pour vous aider à préparer votre demande d'habilitation, nous mettons à votre disposition un exemple de formulaire. Ce document vous permet de voir les informations requises par les autorités compétentes.
          </p>
          <div className="text-center">
            <a href="/fichiers/Annexe 17 - Exemple de formulaire de demande d'habilitation taxe apprentissage.pdf" download>
              <Button className="btn-primary">
                <FileText className="w-4 h-4 mr-2" />
                Télécharger le formulaire d'exemple
              </Button>
            </a>
          </div>
          <p className="italic text-sm text-gray-600 mt-4">
            **Note :** Il s'agit d'un document d'exemple. Le formulaire officiel est à demander auprès de votre DRAFPIC ou de l'autorité compétente de votre région.
          </p>
        </CardContent>
      </Card>

      {/* Bouton de retour à l'accueil */}
      {navigate && (
        <div className="text-center mt-8">
          <Button
            onClick={() => navigate('accueil')}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-lg"
          >
            Retour à l'accueil
          </Button>
        </div>
      )}
    </section>
  );
}