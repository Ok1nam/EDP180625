// client/src/pages/PlanComptable.tsx

import { Download, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PlanComptable() {
  // Le chemin du fichier doit être relatif au dossier 'public' à la racine de votre projet.
  // Assurez-vous que votre fichier 'ECOLE_DE_PRODUCTION_MODELE.xlsx' est bien placé dans 'public/fichiers/'
  const excelFilePath = "/fichiers/ECOLE_DE_PRODUCTION_MODELE.xlsx"; 

  return (
    <section id="plan-comptable" className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="flex items-center gap-2 mb-6 text-3xl font-bold text-gray-800">
        <FileText className="w-8 h-8 text-primary" />
        Plan Comptable Adapté
      </h1>

      <p className="mb-8 text-lg text-gray-700 leading-relaxed">
        Ce plan comptable est spécifiquement conçu pour les Écoles de Production. Il vous offre une structure comptable optimisée pour les activités pédagogiques et de production, facilitant ainsi la gestion et le suivi financier de votre établissement.
      </p>

      {/* Section Importance et Méthodologie */}
      <Card className="mb-8 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Importance et Adaptabilité
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-700 space-y-4">
          <p>
            L'adaptation d'un plan comptable est cruciale pour refléter fidèlement la réalité économique de votre École de Production. Ce modèle prend en compte les spécificités de votre activité : la production de biens ou services par les élèves, les subventions spécifiques, et les charges liées à la formation.
          </p>
          <p>
            Il vous servira de base pour organiser vos comptes, enregistrer vos opérations et préparer vos états financiers. Nous vous encourageons à l'adapter précisément à votre contexte unique, notamment en ajoutant des sous-comptes pertinents pour un suivi détaillé.
          </p>
        </CardContent>
      </Card>

      {/* Section Téléchargement du fichier */}
      <Card className="mb-8 shadow-lg border-2 border-blue-500">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-blue-700 flex items-center gap-3">
            <Download className="w-6 h-6" /> Télécharger le Plan Comptable
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="text-base text-gray-800 flex-1">
            <p className="mb-2">
              Cliquez ci-dessous pour télécharger le fichier Excel du plan comptable.
            </p>
            <p className="text-sm text-gray-600">
              **Note importante :** Ce fichier Excel est un support commun utilisé par plusieurs de nos outils (plan comptable, coefficient de déduction TVA, résultat fiscal). Il est essentiel de le remplir avec les données spécifiques à votre école avant d'utiliser les calculateurs.
            </p>
          </div>
          <a
            href={excelFilePath} // Utilisation de la variable définie en haut
            download="PLAN_COMPTABLE_ECOLE_PRODUCTION.xlsx" // Nom du fichier suggéré au téléchargement
            className="flex-shrink-0"
          >
            <Button className="btn-primary flex items-center gap-2 py-3 px-6 text-lg">
              <Download className="w-5 h-5" /> Télécharger le fichier
            </Button>
          </a>
        </CardContent>
      </Card>

      {/* Section Conseils d'utilisation (Optionnel mais utile) */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Conseils d'utilisation
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-700 space-y-4">
          <p>
            Pour une utilisation optimale de ce plan comptable, nous vous recommandons de :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Revoir les comptes proposés et les adapter aux spécificités de vos activités.</li>
            <li>Ajouter des sous-comptes pour un suivi analytique précis de vos projets et filières.</li>
            <li>Collaborer avec votre expert-comptable pour valider les adaptations et assurer la conformité.</li>
            <li>Mettre à jour régulièrement ce plan en fonction de l'évolution de votre école.</li>
          </ul>
        </CardContent>
      </Card>
    </section>
  );
}