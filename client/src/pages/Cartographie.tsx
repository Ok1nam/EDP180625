import React from 'react';
import { Download, Globe, Briefcase } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface LocationAnalysisProps {
  navigate?: (page: string) => void;
}

const LocationAnalysis: React.FC<LocationAnalysisProps> = ({ navigate }) => {

  return (
    <section id="cartographie-edp" className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="flex items-center gap-3 mb-6 text-3xl font-bold text-[#3C5F58]">
        <Globe className="w-8 h-8 text-[#3C5F58]" />
        Cartographie des écoles de production
      </h1>
      
      <p className="mb-8 text-lg text-gray-700 leading-relaxed">
        En tant qu'expert-comptable, valider le choix d'implantation d'une future école de production est une étape cruciale de votre mission. Cette cartographie nationale est un outil essentiel pour vous permettre de visualiser les écoles existantes et les projets en cours, afin d'évaluer l'opportunité d'une nouvelle implantation dans une zone donnée.
      </p>

      {/* Section Lien vers la carte */}
      <Card className="mb-8 shadow-lg border-2 border-[#2E5941]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-[#2E5941] flex items-center gap-3">
            <Globe className="w-6 h-6" /> Consulter la carte du réseau
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="text-base text-gray-800 flex-1">
            <p className="mb-2">
              Cliquez sur le bouton ci-dessous pour accéder directement à la carte interactive du réseau des écoles de production en France.
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-bold">Conseil :</span> utilisez cette ressource pour étayer l'étude de marché de votre client et justifier le choix de sa zone d'implantation.
            </p>
          </div>
          <a 
            href="https://www.ecoles-de-production.com/le-reseau-des-ecoles/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex-shrink-0"
          >
            <Button className="bg-[#2E5941] hover:bg-[#3C5F58] text-white flex items-center gap-2 py-3 px-6 text-lg">
              <Globe className="w-5 h-5" /> Voir la carte
            </Button>
          </a>
        </CardContent>
      </Card>

      {navigate && (
        <div className="text-center mt-8">
          <Button
            onClick={() => navigate('accueil')}
            className="px-6 py-3 bg-[#2E5941] text-white rounded-md hover:bg-[#3C5F58] transition-colors text-lg"
          >
            Retour à l'accueil
          </Button>
        </div>
      )}
    </section>
  );
};

export default LocationAnalysis;