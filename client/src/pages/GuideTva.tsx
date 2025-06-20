// client/src/pages/GuideTva.tsx

import React from 'react';
import { Download, Scale, FileText, Lightbulb, Info } from "lucide-react"; // Icônes pertinentes
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface GuideTvaProps {
  navigate?: (page: string) => void;
}

const GuideTva: React.FC<GuideTvaProps> = ({ navigate }) => {
  // Le chemin du fichier doit être relatif au dossier 'public' à la racine de votre projet.
  // Assurez-vous que votre fichier de guide TVA est bien placé dans 'public/fichiers/'
  const guideTvaFilePath = "/fichiers/GUIDE_APPLICATION_TVA_MODELE.pdf"; // Ou .docx, .xlsx

  return (
    <section id="guide-tva" className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="flex items-center gap-3 mb-6 text-3xl font-bold text-gray-800">
        <Scale className="w-8 h-8 text-blue-600" /> {/* Icône de balance ou TVA */}
        Guide d'Application de la TVA
      </h1>
      
      <p className="mb-8 text-lg text-gray-700 leading-relaxed">
        La Taxe sur la Valeur Ajoutée (TVA) est un impôt indirect complexe, et son application pour les associations et Écoles de Production peut générer des interrogations. Ce guide a pour objectif de clarifier les règles de la TVA spécifiques à votre structure, notamment en ce qui concerne les activités mixtes.
      </p>

      {/* Section Principes de la TVA et Écoles de Production */}
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-gray-700 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-orange-500" />
            Comprendre la TVA et votre École
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-gray-700 space-y-4">
          <p>
            Les Écoles de Production, par la nature de leurs activités (formation pédagogique et production de biens/services), sont souvent confrontées à une problématique de **TVA mixte**.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>**Activités Exonérées :** Les activités purement pédagogiques ou de formation sont généralement exonérées de TVA.</li>
            <li>**Activités Assujetties :** La vente de biens ou de services issus de la production des élèves, lorsqu'elle est réalisée dans des conditions de concurrence avec le secteur commercial, est soumise à la TVA.</li>
          </ul>
          <p>
            Cette dualité nécessite une gestion rigoureuse pour garantir la conformité fiscale et optimiser la déduction de la TVA sur vos achats.
          </p>
        </CardContent>
      </Card>

      {/* Section Contenu du Guide */}
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-gray-700 flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-600" />
            Ce que vous trouverez dans le Guide
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-gray-700 space-y-4">
          <p>
            Notre guide d'application de la TVA aborde les points essentiels pour vous aider :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Les principes fondamentaux de la TVA applicable aux associations.</li>
            <li>Les règles spécifiques aux Écoles de Production et aux activités mixtes.</li>
            <li>La détermination du <span
                className="text-blue-600 hover:underline cursor-pointer font-medium"
                onClick={() => navigate && navigate('tva-coefficient')}
              >
                coefficient de déduction de TVA
              </span>.
            </li>
            <li>Les obligations déclaratives et les bonnes pratiques pour éviter les erreurs.</li>
            <li>Des exemples concrets pour illustrer les situations courantes.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Section Téléchargement du guide */}
      <Card className="mb-8 shadow-lg border-2 border-blue-500">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-blue-700 flex items-center gap-3">
            <Download className="w-6 h-6" /> Télécharger le Guide Complet
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="text-base text-gray-800 flex-1">
            <p className="mb-2">
              Obtenez votre guide détaillé pour maîtriser l'application de la TVA au sein de votre École de Production.
            </p>
            <p className="text-sm text-gray-600">
              **Recommandation :** Ce guide est une aide précieuse, mais n'hésitez pas à consulter un expert-comptable pour des conseils personnalisés et pour valider vos pratiques.
            </p>
          </div>
          <a
            href={guideTvaFilePath}
            download="GUIDE_APPLICATION_TVA_ECOLE_PRODUCTION.pdf" // Nom du fichier suggéré
            className="flex-shrink-0"
          >
            <Button className="btn-primary flex items-center gap-2 py-3 px-6 text-lg">
              <Download className="w-5 h-5" /> Télécharger le guide
            </Button>
          </a>
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
};

export default GuideTva;