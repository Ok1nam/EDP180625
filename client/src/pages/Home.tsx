// client/src/pages/Home.tsx

import React from 'react';
import { BookOpen, Wrench, BarChart3, Rocket, Lightbulb, Scale, ChevronRight } from "lucide-react"; // Ajout de ChevronRight pour les boutons
import { Card, CardContent } from "@/components/ui/card";

interface HomeProps {
  navigate: (page: string) => void;
}

export default function Home({ navigate }: HomeProps) {
  return (
    <section id="accueil-page" className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] bg-gray-50">
      {/* Section Hero/Bannière - Plus de hauteur, dégradé dynamique, texte plus grand */}
      <div className="relative w-full bg-gradient-to-br from-blue-700 to-indigo-900 text-white py-24 px-4 sm:py-32 overflow-hidden shadow-xl">
        <div className="absolute inset-0 z-0 opacity-10">
          {/* Optionnel : Ajouter un motif de fond subtil pour la bannière */}
          <svg className="w-full h-full" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="pattern-zigzag" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M0 0L5 5L0 10M5 0L10 5L5 10" stroke="#ffffff" strokeWidth="0.5" opacity="0.1" />
            </pattern>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-zigzag)" />
          </svg>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-5 leading-tight tracking-tight drop-shadow-lg">
            Propulsez votre École de Production avec des outils d'Expert-Comptable
          </h1>
          <p className="text-xl sm:text-2xl opacity-95 mb-8 font-light max-w-3xl mx-auto">
            Découvrez les méthodologies éprouvées et les ressources clés pour une création et un pilotage financier et extra-financier optimaux.
          </p>
          <a
            href="https://www.ecoles-de-production.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-lg font-semibold rounded-full text-blue-800 bg-white hover:bg-blue-100 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
          >
            Découvrir les Écoles de Production
            <ChevronRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Section Contexte et Problématique - Design épuré, meilleure lisibilité */}
      <div className="max-w-4xl mx-auto my-20 px-6 bg-white p-8 rounded-lg shadow-lg border border-gray-100">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 text-center flex items-center justify-center gap-3">
            <BookOpen className="w-8 h-8 text-blue-600" />
            Contexte et Problématique
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-6 border-b pb-6 border-gray-200">
          Bienvenue sur ce site, support essentiel de mon mémoire de Diplôme d'Expertise Comptable (DEC). Il présente une démarche méthodologique complète pour l'accompagnement à la création et au pilotage d'une École de Production.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          Explorez une collection d'outils, de ressources et d'illustrations pratiques, conçus pour simplifier et optimiser l'accompagnement des porteurs de projet à chaque étape de leur initiative.
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-800 p-5 rounded-md shadow-md">
          <p className="font-bold text-xl mb-3">La Question Centrale :</p>
          <p className="text-lg italic">"Comment l'expert-comptable peut-il accompagner au mieux un porteur de projet dans la création d'une école de production ainsi que dans son suivi financier et extra-financier ?"</p>
        </div>
      </div>

      {/* Nouvelle Section "Nos Valeurs Clés : Un accompagnement sur mesure" - Cartes plus stylisées */}
      <div className="max-w-screen-xl mx-auto my-20 px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-12 text-center flex items-center justify-center gap-3">
            <Lightbulb className="w-8 h-8 text-yellow-500" />
            Nos Valeurs Clés : Un accompagnement sur mesure
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Valeur 1: Expertise Comptable */}
          <Card className="p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 rounded-xl border border-blue-100">
            <CardContent className="flex flex-col items-center">
              <Scale className="w-14 h-14 text-blue-600 mb-5 bg-blue-50 p-2 rounded-full" />
              <h3 className="text-xl font-bold text-gray-800 mb-3">Expertise Comptable</h3>
              <p className="text-gray-600 text-base leading-relaxed">
                Des outils et des conseils issus d'une expertise reconnue pour une gestion financière et administrative solide de votre école.
              </p>
            </CardContent>
          </Card>

          {/* Valeur 2: Outils Pratiques & Accessibles */}
          <Card className="p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 rounded-xl border border-green-100">
            <CardContent className="flex flex-col items-center">
              <Wrench className="w-14 h-14 text-green-600 mb-5 bg-green-50 p-2 rounded-full" />
              <h3 className="text-xl font-bold text-gray-800 mb-3">Outils Pratiques & Accessibles</h3>
              <p className="text-gray-600 text-base leading-relaxed">
                Des ressources concises, claires et directement applicables pour vous guider efficacement à chaque phase du projet.
              </p>
            </CardContent>
          </Card>

          {/* Valeur 3: Pilotage Stratégique & Performant */}
          <Card className="p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 rounded-xl border border-orange-100">
            <CardContent className="flex flex-col items-center">
              <BarChart3 className="w-14 h-14 text-orange-600 mb-5 bg-orange-50 p-2 rounded-full" />
              <h3 className="text-xl font-bold text-gray-800 mb-3">Pilotage Stratégique & Performant</h3>
              <p className="text-gray-600 text-base leading-relaxed">
                Des méthodes éprouvées et des indicateurs pertinents pour un suivi continu et des décisions éclairées.
              </p>
            </CardContent>
          </Card>

          {/* Valeur 4: Accompagnement Holistique */}
          <Card className="p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 rounded-xl border border-purple-100">
            <CardContent className="flex flex-col items-center">
              <Rocket className="w-14 h-14 text-purple-600 mb-5 bg-purple-50 p-2 rounded-full" />
              <h3 className="text-xl font-bold text-gray-800 mb-3">Accompagnement Holistique</h3>
              <p className="text-gray-600 text-base leading-relaxed">
                Un soutien complet et personnalisé, de la conception initiale au développement durable de votre École de Production.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Section "Prêt à commencer ?" - Appel à l'action plus direct */}
      <div className="max-w-2xl mx-auto my-20 px-6 text-center bg-blue-600 p-10 rounded-xl shadow-2xl text-white">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">Prêt à propulser votre projet ?</h2>
        <p className="text-lg mb-8 opacity-95">
          Accédez à une mine d'informations et d'outils pour concrétiser et optimiser la création de votre École de Production.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <a
            onClick={() => navigate('outils')}
            className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-lg font-semibold rounded-full bg-white text-blue-700 hover:bg-blue-100 transition-all duration-300 transform hover:scale-105 shadow-lg cursor-pointer"
          >
            Explorer les Outils
            <ChevronRight className="ml-2 w-5 h-5" />
          </a>
          <a
            onClick={() => navigate('documentation')}
            className="inline-flex items-center justify-center px-8 py-3.5 border border-white text-lg font-semibold rounded-full text-white bg-transparent hover:bg-white hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105 shadow-lg cursor-pointer"
          >
            Consulter la Documentation
            <ChevronRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}