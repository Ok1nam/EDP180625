// client/src/pages/Home.tsx

import React from 'react';
import { BookOpen, Wrench, BarChart3, Rocket, Lightbulb, CheckSquare, Scale } from "lucide-react"; // Importez les icônes nécessaires pour les valeurs
import { Card, CardContent } from "@/components/ui/card"; // Pour un style cohérent

interface HomeProps {
  navigate: (page: string) => void;
}

export default function Home({ navigate }: HomeProps) {
  return (
    <section id="accueil-page" className="flex flex-col items-center justify-center text-center">
      {/* Section Hero/Bannière */}
      <div className="relative w-full bg-gradient-to-r from-blue-700 to-blue-500 text-white py-16 px-4 sm:py-24">
        {/* Vous pouvez ajouter une image de fond ici si vous en avez une */}
        {/* <img src="/path/to/your-hero-image.jpg" alt="École de Production" className="absolute inset-0 w-full h-full object-cover opacity-30" /> */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
            Votre guide pour la création et le pilotage d'une École de Production
          </h1>
          <p className="text-xl sm:text-2xl opacity-90 mb-8">
            Découvrez les outils et les méthodologies développés dans le cadre du Diplôme d'Expertise Comptable.
          </p>
          <a
            href="https://www.ecolesdeproduction.com/" // Remplacez par l'URL exacte si différente
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-gray-100 transition-colors duration-200 shadow-lg"
          >
            Visiter le site officiel des Écoles de Production
          </a>
        </div>
      </div>

      {/* Section Contexte et Problématique (inchangée, elle est importante pour votre mémoire) */}
      <div className="max-w-4xl mx-auto my-12 px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center justify-center gap-2">
            <BookOpen className="w-7 h-7 text-primary" />
            Contexte et Problématique
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Bienvenue sur le site de présentation du mémoire relatif à l'accompagnement à la création d'une École de Production par un expert-comptable.
          Ce site constitue un support à la rédaction du mémoire dans le cadre de l'obtention du Diplôme d'Expertise Comptable (DEC).
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Vous y trouverez différents outils, ressources et illustrations conçus pour faciliter l'accompagnement des porteurs de projet dans la création et le pilotage d'une école de production.
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-800 p-4 shadow-sm" role="alert">
          <p className="font-semibold mb-2">Problématique :</p>
          <p>"Comment l'expert-comptable peut-il accompagner au mieux un porteur de projet dans la création d'une école de production ainsi que dans son suivi financier et extra-financier ?"</p>
        </div>
      </div>

      {/* Nouvelle Section "Pourquoi ce site ?" / "Nos Valeurs" */}
      <div className="max-w-6xl mx-auto my-16 px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center justify-center gap-2">
            <Lightbulb className="w-7 h-7 text-primary" />
            Ce que nous offrons : Un accompagnement sur mesure
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Valeur 1: Expertise Comptable */}
          <Card className="p-6 text-left shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardContent className="flex flex-col items-center text-center">
              <Scale className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Expertise Comptable</h3>
              <p className="text-gray-600">
                Des outils et des conseils conçus par un expert-comptable pour une gestion financière et administrative solide.
              </p>
            </CardContent>
          </Card>

          {/* Valeur 2: Simplicité & Efficacité */}
          <Card className="p-6 text-left shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardContent className="flex flex-col items-center text-center">
              <Wrench className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Outils Pratiques</h3>
              <p className="text-gray-600">
                Des ressources claires, concises et directement applicables pour vous accompagner à chaque étape.
              </p>
            </CardContent>
          </Card>

          {/* Valeur 3: Suivi et Pilotage */}
          <Card className="p-6 text-left shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardContent className="flex flex-col items-center text-center">
              <BarChart3 className="w-12 h-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Pilotage Stratégique</h3>
              <p className="text-gray-600">
                Des méthodes et des indicateurs pour un suivi performant et une prise de décision éclairée.
              </p>
            </CardContent>
          </Card>

          {/* Valeur 4: Réussite du Projet */}
          <Card className="p-6 text-left shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardContent className="flex flex-col items-center text-center">
              <Rocket className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Accompagnement Complet</h3>
              <p className="text-gray-600">
                Un soutien adapté de la phase de création jusqu'au développement continu de votre école.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Vous pouvez ajouter une section "Explorer nos Catégories" si vous voulez un CTA direct vers les pages listes */}
      <div className="max-w-4xl mx-auto my-16 px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Commencez votre exploration</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <a
            onClick={() => navigate('outils')}
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 shadow-lg cursor-pointer"
          >
            Explorer les Outils
          </a>
          <a
            onClick={() => navigate('documentation')}
            className="inline-flex items-center justify-center px-6 py-3 border border-blue-600 text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 transition-colors duration-200 shadow-lg cursor-pointer"
          >
            Consulter la Documentation
          </a>
        </div>
      </div>

    </section>
  );
}