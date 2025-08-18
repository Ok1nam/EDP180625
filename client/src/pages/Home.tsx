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
      <div className="relative w-full bg-gradient-to-br from-[#184D31] to-[#3C5F58] text-white py-24 px-4 sm:py-32 overflow-hidden shadow-xl">
        <div className="absolute inset-0 z-0 opacity-10">
          <svg className="w-full h-full" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="pattern-zigzag" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M0 0L5 5L0 10M5 0L10 5L5 10" stroke="#ffffff" strokeWidth="0.5" opacity="0.1" />
            </pattern>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-zigzag)" />
          </svg>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center animate-fade-in-up">
          {/* Titre accrocheur avec l'enjeu social */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-5 leading-tight tracking-tight drop-shadow-lg">
            42%<sup>*</sup> des jeunes sans diplôme restent au chômage.<br/>
            <span className="text-green-200">L'École de Production change la donne.</span>
          </h1>
          {/* Source ajoutée ici */}
          <p className="text-xs sm:text-sm text-green-200 opacity-70 mt-2">
            * Source : Insee, enquête Emploi 2023
          </p>
          {/* Sous-titre : positionnement expert */}
          <p className="text-xl sm:text-2xl opacity-95 mt-8 mb-8 font-light max-w-3xl mx-auto">
            Expert-comptable, découvrez la méthodologie complète pour accompagner vos clients dans ce modèle hybride innovant : du montage financier au pilotage opérationnel.
          </p>
        </div>
      </div>

      {/* Section Contexte et Problématique - Plus percutante */}
      <div className="max-w-4xl mx-auto my-20 px-6 bg-white p-8 rounded-lg shadow-lg border border-gray-100">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 text-center flex items-center justify-center gap-3">
          <BriefcaseBusiness className="w-8 h-8 text-[#184D31]" />
          Un modèle hybride, des défis spécifiques
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-md">
            <h3 className="font-bold text-lg text-red-800 mb-3">Les défis structurels</h3>
            <ul className="text-gray-700 space-y-2">
              <li>• Fragilité du financement en phase de démarrage</li>
              <li>• Équilibre délicat entre mission sociale et logique entrepreneuriale</li>
              <li>• Complexité comptable et fiscale du modèle hybride</li>
              <li>• Charge administrative souvent sous-estimée</li>
            </ul>
          </div>

          {/* NOUVELLE SECTION MODIFIÉE */}
          <div className="bg-green-50 border-l-4 border-[#184D31] p-6 rounded-md">
            <h3 className="font-bold text-lg text-[#184D31] mb-3">Votre Levier d'Action Stratégique</h3>
            <ul className="text-gray-700 space-y-2">
              <li>• <strong>Sécuriser</strong> le montage financier du projet</li>
              <li>• <strong>Structurer</strong> un cadre comptable et fiscal sur-mesure</li>
              <li>• <strong>Piloter</strong> la double performance : sociale et économique</li>
              <li>• <strong>Garantir</strong> la pérennité du modèle grâce à des outils de suivi adaptés</li>
            </ul>
          </div>
        </div>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Ce site constitue le support de mon mémoire de DEC, proposant une <strong>méthodologie opérationnelle</strong> pour accompagner les Écoles de Production. Vous y trouverez tous les outils, annexes et études de cas nécessaires pour maîtriser ce secteur en pleine expansion.
        </p>

        <div className="bg-[#184D31] bg-opacity-10 border-l-4 border-[#184D31] text-gray-800 p-6 rounded-md shadow-md">
          <p className="font-bold text-xl mb-3">La problématique de ce mémoire :</p>
          <p className="text-lg italic">"Comment l'expert-comptable peut-il accompagner au mieux un porteur de projet dans la création d'une école de production ainsi que dans son suivi financier et extra-financier ?"</p>
        </div>
      </div>

      {/* Section CTA avec les 3 volets méthodologiques */}
      <div className="max-w-6xl mx-auto my-20 px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">Une méthodologie en 3 volets</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Découvrez l'approche structurée issue de mon mémoire DEC, illustrée par 2 études de cas réelles : École Alpha (métallurgie) et École Bêta (menuiserie).
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 text-center">
            <div className="w-16 h-16 bg-[#184D31] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-8 h-8 text-[#184D31]" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">1. Comprendre</h3>
            <p className="text-gray-600">Le modèle hybride, ses spécificités comptables, fiscales et administratives.</p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 text-center">
            <div className="w-16 h-16 bg-[#184D31] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Rocket className="w-8 h-8 text-[#184D31]" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">2. Accompagner</h3>
            <p className="text-gray-600">L'étude de faisabilité, le budget prévisionnel et la mobilisation des financements.</p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 text-center">
            <div className="w-16 h-16 bg-[#184D31] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
              <BarChart3 className="w-8 h-8 text-[#184D31]" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">3. Piloter</h3>
            <p className="text-gray-600">Les tableaux de bord et indicateurs financiers et extra-financiers.</p>
          </div>
        </div>

        <div className="text-center bg-[#184D31] p-10 rounded-xl shadow-2xl text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Accédez aux annexes de mon mémoire</h2>
          <p className="text-lg mb-8 opacity-95">
            Outils opérationnels, grilles d'analyse, modèles de documents : tout ce dont vous avez besoin pour accompagner vos clients Écoles de Production.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a
              onClick={() => navigate('outils')}
              className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-lg font-semibold rounded-full bg-white text-[#184D31] hover:bg-green-50 transition-all duration-300 transform hover:scale-105 shadow-lg cursor-pointer"
            >
              Explorer les Outils Pratiques
              <ChevronRight className="ml-2 w-5 h-5" />
            </a>
            <a
              onClick={() => navigate('documentation')}
              className="inline-flex items-center justify-center px-8 py-3.5 border border-white text-lg font-semibold rounded-full text-white bg-transparent hover:bg-white hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105 shadow-lg cursor-pointer"
            >
              Documentation & Guides
              <ChevronRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}