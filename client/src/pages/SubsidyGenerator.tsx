import React from 'react';
import { Download, FileText, Lightbulb, Users, ClipboardList } from "lucide-react";

// NOTE: The components are assumed to be available from a component library like shadcn/ui.
// For this example, we'll provide mock components to make the code runnable.
const Card = ({ children, className = '' }) => <div className={`bg-white rounded-xl shadow-lg border border-gray-200 ${className}`}>{children}</div>;
const CardContent = ({ children, className = '' }) => <div className={`p-6 ${className}`}>{children}</div>;
const CardHeader = ({ children, className = '' }) => <div className={`p-6 border-b border-gray-200 ${className}`}>{children}</div>;
const CardTitle = ({ children, className = '' }) => <h2 className={`text-xl font-semibold ${className}`}>{children}</h2>;
const Button = ({ children, className = '' }) => <button className={`px-4 py-2 rounded-md transition-colors duration-200 ${className}`}>{children}</button>;


const SubsidyGenerator: React.FC = () => {
  const subventionFilePath = "/fichiers/ANNEXE 13 - DOSSIER TYPE DE DEMANDE DE SUBVENTION.docx";

  return (
    <section id="subsidy-generator" className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="flex items-center gap-3 mb-6 text-3xl font-bold text-[#3C5F58]">
        <FileText className="w-8 h-8" />
        Dossier Type de Demande de Subvention
      </h1>

      <p className="mb-8 text-lg text-gray-700 leading-relaxed">
        Les demandes de subventions sont une étape cruciale mais souvent complexe. Chaque financeur a ses propres formulaires et attentes. Pour transformer cette contrainte en un levier d'efficacité, ce <span className="font-bold">modèle de dossier</span> constitue un outil stratégique à mettre à disposition de votre client.
      </p>
      
      {/* Section Pourquoi un modèle type ? */}
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-[#3C5F58] flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-orange-500" />
            La solution : un dossier centralisé
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-gray-700 space-y-4">
          <p>
            L'objectif de ce modèle est de centraliser les réponses aux questions les plus fréquentes des financeurs. En préparant en amont une base d'informations complètes sur l'école et le projet, il est possible de :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="font-bold">Pré-remplir 90% des formulaires</span> : La majorité du travail de rédaction est déjà faite, il ne reste que l'adaptation à chaque partenaire.</li>
            <li><span className="font-bold">Gagner un temps précieux</span> : Fini la recherche répétitive d'informations. L'essentiel du temps peut être consacré à la personnalisation des demandes.</li>
            <li><span className="font-bold">Assurer la cohérence des messages</span> : Garantir une communication homogène et professionnelle, renforçant la crédibilité du projet.</li>
          </ul>
        </CardContent>
      </Card>
      
      {/* Section Les types de financeurs */}
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-[#3C5F58] flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            Les Principaux Financeurs
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-gray-700 space-y-4">
            <p>Ce dossier est conçu pour s'adapter aux trois grandes catégories de partenaires :</p>
            <ul className="list-disc pl-5 space-y-2">
                <li><span className="font-bold">Partenaires Privés (Fondations, entreprises)</span> : Recherchent des projets à fort impact social, alignés avec leurs valeurs.</li>
                <li><span className="font-bold">Partenaires Publics (Régions, État)</span> : Soutiennent des projets inscrits dans les politiques publiques (formation, emploi, etc.). Le formulaire <span className="font-semibold">Cerfa 12156*06</span> est souvent la base de ces demandes.</li>
                <li><span className="font-bold">La Fédération (FNEP)</span> : Appuie les écoles qui contribuent à la dynamique du réseau et respectent les standards de qualité.</li>
            </ul>
        </CardContent>
      </Card>

      {/* Section Structure du dossier */}
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-[#3C5F58] flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-green-600" />
            Que contient ce modèle ?
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-gray-700 space-y-4">
          <p>Le dossier type est structuré en 6 parties claires pour couvrir tous les aspects de la demande :</p>
          <ul className="list-decimal pl-5 space-y-2 font-medium">
            <li>Informations générales sur la structure</li>
            <li>Présentation de l’École de Production</li>
            <li>Le projet spécifique objet de la demande de subvention</li>
            <li>Budget prévisionnel du projet</li>
            <li>Moyens humains et matériels de l’école</li>
            <li>Pièces justificatives à joindre</li>
          </ul>
        </CardContent>
      </Card>

      {/* Section Téléchargement */}
      <Card className="mb-8 shadow-lg border-2 border-[#3C5F58]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-[#2E5941] flex items-center gap-3">
            <Download className="w-6 h-6" /> Télécharger le Modèle de Dossier
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="text-base text-gray-800 flex-1">
            <p className="mb-2">
              Accédez au modèle complet au format Word pour préparer efficacement les futures demandes de financement.
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-bold">Conseil :</span> Utiliser ce document comme base de travail principale pour le client. Il doit être mis à jour régulièrement pour refléter la situation actuelle de l'école.
            </p>
          </div>
          <a
            href={subventionFilePath}
            download="ANNEXE_13_DOSSIER_TYPE_DE_DEMANDE_DE_SUBVENTION.docx"
            className="flex-shrink-0"
          >
            <Button className="flex items-center gap-2 py-3 px-6 text-lg bg-[#2E5941] text-white rounded-md hover:bg-[#3C5F58] transition-colors">
              <Download className="w-5 h-5" /> Télécharger
            </Button>
          </a>
        </CardContent>
      </Card>

    </section>
  );
}

export default SubsidyGenerator;
