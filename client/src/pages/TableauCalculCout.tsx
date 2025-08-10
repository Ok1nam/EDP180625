// client/src/pages/TableauCalculCout.tsx

import React from 'react';
import { Download, Calculator, BarChart2, Lightbulb, FileText, CheckCircle, Database } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TableauCalculCoutProps {
  navigate?: (page: string) => void;
}

const TableauCalculCout: React.FC<TableauCalculCoutProps> = ({ navigate }) => {
  const calculCoutFilePath = "/fichiers/ANNEXE 18 - Trame du Tableau de Calcul des Coûts.xlsx";

  return (
    <section id="tableau-calcul-cout" className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="flex items-center gap-3 mb-6 text-3xl font-bold text-gray-800">
        <Calculator className="w-8 h-8 text-blue-600" />
        Tableau de Calcul du Coût d'un Élève
      </h1>
      
      <p className="mb-8 text-lg text-gray-700 leading-relaxed">
        Construire un budget prévisionnel clair et structuré est une étape stratégique pour lancer votre École de Production. Notre modèle, inspiré des pratiques professionnelles, vous permet d’anticiper les besoins financiers, d’organiser vos dépenses et de vérifier la viabilité économique de votre projet sur plusieurs années.
      </p>

      {/* Section Prérequis Importants */}
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-gray-700 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-red-500" />
            Prérequis Importants
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-gray-700 space-y-4">
          <p className="font-semibold text-red-700">⚠️ Attention :</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>L'utilisation de cet outil est optimisée pour les écoles de production utilisant le plan comptable adapté proposé en Annexe 4.</li>
            <li>Seuls certains comptes de charges (classe 6) et de produits (classe 7) doivent être utilisés dans ce fichier.</li>
            <li>Les comptes d’actif et de passif (classes 1 à 5) ne sont pas intégrés.</li>
            <li>Les comptes d’amortissements sont exclus, car financés à 100 % par subventions d’investissement et neutralisés avec les quotes-parts correspondantes (conformément aux exigences de la FNEP).</li>
            <li>Les comptes de produits intégrés sont uniquement ceux relatifs aux ventes de l'activité de production.</li>
            <li>Les comptes de cessions d’immobilisations ne sont pas intégrés.</li>
            <li>L’activation des macros est nécessaire au bon fonctionnement de l’outil.</li>
            <li>Les cases de couleurs jaune clair sont les seules à devoir être complétées, le reste du tableau est automatisé.</li>
            <li>Le fichier est protégé sans mot de passe. Il peut être adapté à d’autres projets en personnalisant les intitulés ou les hypothèses. Il est conseillé de dupliquer l’original avant toute modification.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Section Objectif de l’annexe */}
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-gray-700 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-orange-500" />
            Objectif de l’annexe
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-gray-700 space-y-4">
          <p>
            L’Annexe 18 est un outil de calcul automatisé conçu pour exploiter les données issues du plan comptable adapté (cf. Annexe 4) et fournir une analyse détaillée des coûts de l’école de production. Elle permet de :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>**Importer et consolider les données comptables** filtrées depuis le plan comptable adapté, en intégrant uniquement les comptes de charges (classe 6) et de produits (classe 7) pertinents.</li>
            <li>**Traiter automatiquement la ventilation** des charges et produits déjà sectorisés dans le plan comptable adapté entre :
              <ul className="list-circle pl-5 mt-1">
                <li>secteur Production (T) : activités génératrices de recettes soumises à TVA,</li>
                <li>secteur Pédagogie (NT) : activités de formation exonérées,</li>
                <li>secteur Mutualisé (M) : charges communes à répartir.</li>
              </ul>
            </li>
            <li>**Calculer le coût total par secteur,** avec distinction claire entre activité de production et activité pédagogique, en intégrant charges directes et clé de répartition appliquée aux charges mutualisées.</li>
            <li>**Établir le coût moyen par élève,** basé sur les effectifs et hypothèses saisies, pour disposer d’un indicateur de suivi et de comparaison.</li>
            <li>**Produire des indicateurs de pilotage synthétiques,** exploitables pour :
              <ul className="list-circle pl-5 mt-1">
                <li>analyser l’évolution des coûts,</li>
                <li>justifier l’utilisation des ressources,</li>
                <li>appuyer les échanges avec financeurs et partenaires.</li>
              </ul>
            </li>
          </ul>
          <p className="italic text-sm text-gray-600 mt-4">
            Cet outil assure une exploitation fiable et standardisée des données comptables, garantissant la cohérence avec la structure définie dans l’Annexe 4 et facilitant la prise de décision stratégique.
          </p>
        </CardContent>
      </Card>

      {/* Section Construction de l'outil */}
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-gray-700 flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-purple-600" />
            Construction de l’outil
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-gray-700 space-y-4">
          <p className="font-semibold mb-3">L’Annexe 18 est composée de quatre onglets principaux :</p>
          
          <h4 className="font-bold flex items-center gap-2">
            <FileText className="w-4 h-4 text-gray-600" />
            Onglet "Saisie des données" :
          </h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>Permet de saisir ou d’importer les données issues de la comptabilité, selon la nomenclature du plan comptable adapté (Annexe 4).</li>
            <li>**Budget Année N :** à compléter une seule fois en début d’exercice.</li>
            <li>**Saisie trimestrielle :** chaque trimestre, reporter les montants de la balance comptable (exemple : pour le T1 si l’exercice coïncide avec l’année civile, période du 01/01/N au 31/03/N).</li>
            <li>Les comptes sont automatiquement classés par secteur d’activité (T, NT, M) selon leur codification.</li>
            <li>**Suivi et indicateurs :**
              <ul className="list-circle pl-5 mt-1">
                <li>La colonne Réel cumulé agrège automatiquement les montants saisis trimestre par trimestre.</li>
                <li>Les colonnes Écart (€) et Écart (%) permettent de mesurer l’avancement de chaque ligne par rapport au budget annuel.</li>
                <li>Un code couleur automatique signale visuellement les écarts : <span className="text-green-600 font-semibold">Vert</span> pour un dépassement de prévisions de produits, <span className="text-red-600 font-semibold">Rouge</span> pour un dépassement de budget sur les charges.</li>
              </ul>
            </li>
          </ul>

          <h4 className="font-bold flex items-center gap-2 mt-4">
            <Database className="w-4 h-4 text-gray-600" />
            Onglet "Ventilation des charges" :
          </h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>Cet onglet agrège l’ensemble des données par secteur — Production, Pédagogie et Mutualisé — afin de calculer automatiquement les charges directes de production, les charges directes pédagogiques et les charges mutualisées.</li>
            <li>Ces dernières sont ventilées de façon automatique selon une clé de répartition prédéfinie : **2/3 pour l’activité de production** et **1/3 pour l’activité pédagogique**, cette proportion étant fondée sur le temps passé et l’utilisation effective des ressources dans chaque secteur.</li>
            <li>Le tableau fournit également une synthèse claire permettant d’identifier le poids relatif de chaque secteur dans le budget global et de visualiser leur évolution dans le temps.</li>
          </ul>

          <h4 className="font-bold flex items-center gap-2 mt-4">
            <Calculator className="w-4 h-4 text-gray-600" />
            Onglet "Coût élève" :
          </h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>L’onglet « Coût élève » présente un récapitulatif automatique des coûts d'un élève par secteur d’activité.</li>
            <li>Les données sont déclinées en :
              <ul className="list-circle pl-5 mt-1">
                <li>Coût total par élève pour la production, la pédagogie et l’ensemble de l’école.</li>
                <li>Coût horaire par élève, calculé selon le volume horaire consacré à chaque secteur.</li>
              </ul>
            </li>
            <li>Ces indicateurs sont affichés en Budget Annuel et en Réel Cumulé, avec un suivi des écarts entre ces deux données pour le coût horaire (Seule donnée comparable si les 4 trimestres ne sont pas complétées).</li>
          </ul>

          <h4 className="font-bold flex items-center gap-2 mt-4">
            <BarChart2 className="w-4 h-4 text-gray-600" />
            Onglet "Indicateurs de pilotage" :
          </h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>Cet onglet regroupe automatiquement les indicateurs clés de performance de l’école, calculés à partir des données saisies dans les onglets précédents.</li>
            <li>Il présente notamment :
              <ul className="list-circle pl-5 mt-1">
                <li>Le chiffre d’affaires total et le chiffre d’affaires par élève.</li>
                <li>Les charges externes et charges de personnel totales.</li>
                <li>Le seuil de rentabilité de l’activité de production, exprimé en euros de chiffre d’affaires à atteindre.</li>
                <li>La marge brute et la marge nette sur l’activité de production, ainsi que leur pourcentage.</li>
              </ul>
            </li>
            <li>Les données sont affichées en Budget Annuel et en Réel Cumulé, avec calcul automatique des écarts en valeur et en pourcentage d’avancement.</li>
            <li>Un code couleur facilite la lecture : <span className="text-green-600 font-semibold">Vert</span> pour une performance ou économie favorable, <span className="text-red-600 font-semibold">Rouge</span> pour un écart négatif ou dépassement.</li>
            <li>Cet onglet permet ainsi de suivre la situation financière en temps réel et de détecter rapidement les écarts significatifs par rapport aux objectifs fixés initialement.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Section Téléchargement */}
      <Card className="mb-8 shadow-lg border-2 border-green-500">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-green-700 flex items-center gap-3">
            <Download className="w-6 h-6" /> Télécharger le Tableau de Calcul des Coûts
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="text-base text-gray-800 flex-1">
            <p className="mb-2">
              Accédez à notre modèle de tableau de calcul des coûts, un outil essentiel pour une gestion financière rigoureuse de votre École de Production. Ce fichier est au format `.xlsx`.
            </p>
            <p className="text-sm text-gray-600">
              **Recommandation :** Assurez-vous d'activer les macros pour le bon fonctionnement de l'outil.
            </p>
          </div>
          <a
            href={calculCoutFilePath}
            download="ANNEXE 18 - Trame du Tableau de Calcul des Coûts.xlsx"
            className="flex-shrink-0"
          >
            <Button className="btn-primary flex items-center gap-2 py-3 px-6 text-lg">
              <Download className="w-5 h-5" /> Télécharger le modèle
            </Button>
          </a>
        </CardContent>
      </Card>

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

export default TableauCalculCout;