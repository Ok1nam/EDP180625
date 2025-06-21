// client/src/pages/Home.tsx

import React from 'react';
import { BriefcaseBusiness, Users, BarChart3, Rocket, Lightbulb, Scale, ChevronRight, BookOpen } from "lucide-react"; // Icônes adaptées au public expert-comptable
import { Card, CardContent } from "@/components/ui/card";

interface HomeProps {
  navigate: (page: string) => void;
}

export default function Home({ navigate }: HomeProps) {
  return (
    <section id="accueil-page" className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] bg-gray-50">
      {/* Section Hero/Bannière - Orientée Expert-Comptable */}
      <div className="relative w-full bg-gradient-to-br from-blue-800 to-purple-900 text-white py-24 px-4 sm:py-32 overflow-hidden shadow-xl">
        <div className="absolute inset-0 z-0 opacity-10">
          <svg className="w-full h-full" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="pattern-zigzag" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M0 0L5 5L0 10M5 0L10 5L5 10" stroke="#ffffff" strokeWidth="0.5" opacity="0.1" />
            </pattern>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-zigzag)" />
          </svg>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center animate-fade-in-up">
          {/* Nouveau titre : met l'expert-comptable au centre */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-5 leading-tight tracking-tight drop-shadow-lg">
            Expert-Comptable, facilitez l'accompagnement des Écoles de Production
          </h1>
          {/* Nouveau sous-titre : proposition de valeur pour l'expert-comptable */}
          <p className="text-xl sm:text-2xl opacity-95 mb-8 font-light max-w-3xl mx-auto">
            Découvrez une ressource complète : outils, méthodologies et guides conçus pour vous aider à conseiller vos clients dans la création et le pilotage de leur École de Production.
          </p>
          <a
            href="https://www.ecoles-de-production.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-lg font-semibold rounded-full text-purple-800 bg-white hover:bg-purple-100 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
          >
            Comprendre le modèle des Écoles de Production
            <ChevronRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Section Contexte et Problématique - Ton plus formel et ciblé */}
      <div className="max-w-4xl mx-auto my-20 px-6 bg-white p-8 rounded-lg shadow-lg border border-gray-100">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 text-center flex items-center justify-center gap-3">
            <BriefcaseBusiness className="w-8 h-8 text-blue-600" /> {/* Icône métier */}
            Contexte et Enjeu pour l'Expert-Comptable
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-6 border-b pb-6 border-gray-200">
          Ce site est le support de mon mémoire de Diplôme d'Expertise Comptable (DEC), dédié à la **démarche méthodologique d'accompagnement** des Écoles de Production par l'expert-comptable.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          Vous y trouverez une mine d'informations : outils pratiques, ressources documentaires et illustrations concrètes, pensés pour optimiser votre rôle de conseiller auprès de vos clients désireux de créer ou de pérenniser une École de Production.
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-800 p-5 rounded-md shadow-md">
          <p className="font-bold text-xl mb-3">La Problématique centrale de ce mémoire :</p>
          <p className="text-lg italic">"Comment l'expert-comptable peut-il accompagner au mieux un porteur de projet dans la création d'une école de production ainsi que dans son suivi financier et extra-financier ?"</p>
        </div>
      </div>

      {/* Nouvelle Section "Votre Valeur Ajoutée avec nos Outils" - Centrée sur le bénéfice expert-comptable */}
      <div className="max-w-screen-xl mx-auto my-20 px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-12 text-center flex items-center justify-center gap-3">
            <Lightbulb className="w-8 h-8 text-yellow-500" />
            Votre Valeur Ajoutée avec nos Outils
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Bénéfice 1: Renforcement de l'Expertise */}
          <Card className="p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 rounded-xl border border-blue-100">
            <CardContent className="flex flex-col items-center">
              <Scale className="w-14 h-14 text-blue-600 mb-5 bg-blue-50 p-2 rounded-full" />
              <h3 className="text-xl font-bold text-gray-800 mb-3">Renforcez votre Expertise</h3>
              <p className="text-gray-600 text-base leading-relaxed">
                Appuyez-vous sur des outils et des méthodologies fiables pour maîtriser les spécificités comptables des Écoles de Production.
              </p>
            </CardContent>
          </Card>

          {/* Bénéfice 2: Optimisation de l'Accompagnement Client */}
          <Card className="p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 rounded-xl border border-green-100">
            <CardContent className="flex flex-col items-center">
              <Users className="w-14 h-14 text-green-600 mb-5 bg-green-50 p-2 rounded-full" /> {/* Icône Users pour la relation client */}
              <h3 className="text-xl font-bold text-gray-800 mb-3">Optimisez l'Accompagnement Client</h3>
              <p className="text-gray-600 text-base leading-relaxed">
                Des ressources pratiques pour conseiller efficacement vos clients à chaque étape de leur projet d'école.
              </p>
            </CardContent>
          </Card>

          {/* Bénéfice 3: Pilotage Financier & Extra-financier */}
          <Card className="p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 rounded-xl border border-orange-100">
            <CardContent className="flex flex-col items-center">
              <BarChart3 className="w-14 h-14 text-orange-600 mb-5 bg-orange-50 p-2 rounded-full" />
              <h3 className="text-xl font-bold text-gray-800 mb-3">Maîtrisez le Pilotage</h3>
              <p className="text-gray-600 text-base leading-relaxed">
                Des indicateurs pertinents et des méthodes de suivi pour guider vos clients vers la performance.
              </p>
            </CardContent>
          </Card>

          {/* Bénéfice 4: Différenciation de votre Cabinet */}
          <Card className="p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 rounded-xl border border-purple-100">
            <CardContent className="flex flex-col items-center">
              <Rocket className="w-14 h-14 text-purple-600 mb-5 bg-purple-50 p-2 rounded-full" />
              <h3 className="text-xl font-bold text-gray-800 mb-3">Différenciez votre Cabinet</h3>
              <p className="text-gray-600 text-base leading-relaxed">
                Positionnez-vous comme expert sur un secteur d'activité en plein développement et à fort impact social.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Section "Accédez à des ressources dédiées" - Appel à l'action pour les experts-comptables */}
      <div className="max-w-2xl mx-auto my-20 px-6 text-center bg-blue-700 p-10 rounded-xl shadow-2xl text-white">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">Accédez à des ressources dédiées</h2>
        <p className="text-lg mb-8 opacity-95">
          Découvrez les outils et la documentation élaborés pour vous, experts-comptables, afin d'accompagner au mieux vos clients dans le secteur des Écoles de Production.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <a
            onClick={() => navigate('outils')}
            className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-lg font-semibold rounded-full bg-white text-blue-700 hover:bg-blue-100 transition-all duration-300 transform hover:scale-105 shadow-lg cursor-pointer"
          >
            Explorer les Outils Pratiques
            <ChevronRight className="ml-2 w-5 h-5" />
          </a>
          <a
            onClick={() => navigate('documentation')}
            className="inline-flex items-center justify-center px-8 py-3.5 border border-white text-lg font-semibold rounded-full text-white bg-transparent hover:bg-white hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105 shadow-lg cursor-pointer"
          >
            Consulter la Documentation Stratégique
            <ChevronRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}