import React from 'react';
import { FileText, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SubsidyGenerator: React.FC = () => {
  const subventionFilePath = "/fichiers/ANNEXE 13 - DOSSIER TYPE DE DEMANDE DE SUBVENTION.docx";

  return (
    <section id="subsidy-generator" className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="flex items-center gap-3 mb-6 text-3xl font-bold text-[#3C5F58]">
        <FileText className="w-8 h-8" />
        Dossier Type de Demande de Subvention
      </h1>

      <p className="mb-8 text-lg text-gray-700 leading-relaxed">
        La constitution d'un dossier de demande de subvention est une étape clé pour sécuriser les financements de votre projet. Pour vous accompagner, nous mettons à votre disposition un <span className="font-bold">modèle type à télécharger</span>. Ce document a pour but de <span className="font-bold">structurer votre démarche</span> et de rassembler toutes les informations essentielles généralement requises par les organismes financeurs.
      </p>

      {/* Bouton de téléchargement du modèle de dossier de subvention */}
      <Card className="mb-8 shadow-lg border-2 border-[#3C5F58]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-[#3C5F58] flex items-center gap-3">
            <Download className="w-6 h-6" /> Télécharger le Modèle de Dossier
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="text-base text-gray-800 flex-1">
            <p className="mb-2">
              Téléchargez notre modèle de dossier de demande de subvention au format Word.
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-bold">Conseil :</span> Utilisez ce document comme une base de travail pour organiser vos informations avant de les reporter sur les plateformes ou formulaires spécifiques à chaque financeur.
            </p>
          </div>
          <a
            href={subventionFilePath}
            download="ANNEXE_13_DOSSIER_TYPE_DE_DEMANDE_DE_SUBVENTION.docx"
            className="flex-shrink-0"
          >
            <Button className="flex items-center gap-2 py-3 px-6 text-lg bg-[#2E5F41] text-white rounded-md hover:bg-[#3C5F58] transition-colors">
              <Download className="w-5 h-5" /> Télécharger le modèle
            </Button>
          </a>
        </CardContent>
      </Card>

    </section>
  );
}

export default SubsidyGenerator;