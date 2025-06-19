// client/src/pages/HabilitationTaxe.tsx

import React from 'react';
import { ShieldCheck, School, FileText, Lightbulb, Search } from "lucide-react"; // Icônes pertinentes
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface HabilitationTaxeProps { // Correction de l'interface ici
  navigate?: (page: string) => void;
}

export default function HabilitationTaxe({ navigate }: HabilitationTaxeProps) { // Correction du nom de la fonction ici
  return (
    <section id="habilitation-taxe" className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="flex items-center gap-3 mb-6 text-3xl font-bold text-gray-800">
        <ShieldCheck className="w-8 h-8 text-green-600" /> {/* Icône de bouclier avec coche pour l'habilitation */}
        Habilitation Taxe d'Apprentissage : Un Enjeu Majeur
      </h1>
      
      <p className="mb-8 text-lg text-gray-700 leading-relaxed">
        La taxe d'apprentissage est un impôt dû par les entreprises, dont l'objectif est de financer le développement de l'apprentissage et des formations technologiques et professionnelles. Pour les Écoles de Production, être habilitée à percevoir cette taxe est une source de financement vitale. Cette page vous guide sur les aspects clés de cette habilitation.
      </p>

      {/* Section Comprendre la Taxe d'Apprentissage */}
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-gray-700 flex items-center gap-2">
            <School className="w-5 h-5 text-blue-600" />
            La Taxe d'Apprentissage en bref
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-gray-700 space-y-4">
          <p>
            La taxe d'apprentissage est un levier financier essentiel pour le développement des compétences et l'adéquation formation-emploi. Elle se compose de deux parts :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>**La part principale (87%) :** Destinée au financement des formations par apprentissage.</li>
            <li>**Le solde (13%) :** Il est directement versé par les entreprises aux établissements et formations qu'elles choisissent de soutenir (hors apprentissage), à condition qu'ils soient habilités à le percevoir. C'est cette part qui est particulièrement pertinente pour les Écoles de Production.</li>
          </ul>
          <p>
            Depuis 2023, la collecte et le reversement du solde de la taxe d'apprentissage sont gérés par l'URSSAF et la Caisse des Dépôts et Consignations via la plateforme SOLTéA.
          </p>
        </CardContent>
      </Card>

      {/* Section L'Habilitation : Pourquoi et Comment */}
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-gray-700 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-orange-500" />
            Obtenir et Maintenir l'Habilitation
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-gray-700 space-y-4">
          <p>
            Pour qu'une École de Production puisse bénéficier du solde de la taxe d'apprentissage, elle doit être explicitement répertoriée comme établissement ou organisme habilité à percevoir cette contribution.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>**Critères d'éligibilité :** Les Écoles de Production sont généralement éligibles en tant qu'organismes concourant aux missions de service public de l'enseignement technique ou supérieur. Il est crucial de s'assurer que votre école est bien inscrite sur la liste nationale des établissements habilités.</li>
            <li>**Processus :** L'inscription et la mise à jour des informations se font via des plateformes dédiées. Une vérification régulière de votre statut est recommandée.</li>
            <li>**Communication aux entreprises :** Une fois habilitée, votre école doit informer les entreprises partenaires de sa capacité à percevoir le solde de la taxe d'apprentissage et les guider sur la procédure de versement via SOLTéA.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Section Outils de Vérification et Ressources (Placeholders) */}
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-gray-700 flex items-center gap-2">
            <Search className="w-5 h-5 text-purple-600" />
            Vérification et Documentation
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-gray-700 space-y-4">
          <p>
            Assurez-vous que votre École de Production est bien répertoriée et que toutes vos informations sont à jour pour maximiser vos chances de percevoir la taxe d'apprentissage.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              **Vérificateur d'habilitation (à venir) :** Un outil pour rechercher rapidement le statut d'habilitation de votre école via son SIRET ou son nom.
            </li>
            <li>
              **Guide des procédures (à venir) :** Un pas-à-pas pour l'inscription sur SOLTéA et les bonnes pratiques de communication aux entreprises.
            </li>
            <li>
              **Ressources officielles :** Liens directs vers les sites de l'URSSAF, la Caisse des Dépôts et Consignations (SOLTéA) et le Ministère du Travail.
              <a href="https://www.soltea.education.gouv.fr/" target="_blank" rel="noopener noreferrer" className="block mt-2 text-blue-600 hover:underline">
                Accéder à la plateforme SOLTéA <FileText className="inline-block ml-1 w-4 h-4" />
              </a>
            </li>
          </ul>
          <p className="italic text-sm text-gray-600 mt-4">
            (Outils interactifs et informations complémentaires en cours de développement.)
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