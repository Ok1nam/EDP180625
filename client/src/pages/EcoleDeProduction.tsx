import React from 'react';
import { School, Building2, Users, Lightbulb, Handshake, DollarSign, ArrowLeft, FileText, ExternalLink } from "lucide-react"; 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface EcoleDeProductionProps {
  navigate?: (page: string) => void;
}

const EcoleDeProduction: React.FC<EcoleDeProductionProps> = ({ navigate }) => {
  return (
    <section id="ecole-de-production" className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="flex items-center gap-3 mb-6 text-3xl font-bold text-[#3C5F58]">
        <School className="w-8 h-8 text-[#3C5F58]" />
        L'École de Production : Un Modèle Unique
      </h1>
      
      <p className="mb-8 text-lg text-gray-700 leading-relaxed">
        Ce document présente le modèle d'une École de Production, à destination de l'expert-comptable. Il s'agit d'une démarche pédagogique innovante basée sur le "Faire pour Apprendre", combinant formation professionnelle, production de biens et services réels, et insertion socio-économique.
      </p>

      {/* Section : Qu'est-ce qu'une École de Production ? */}
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-[#3C5F58] flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#3C5F58]" />
            Une Pédagogie par le "Faire pour Apprendre"
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-gray-700 space-y-4">
          <p>
            Au cœur du concept se trouve l'apprentissage par la pratique. Les élèves produisent des biens ou des services commandés par des clients réels, et ce, dans des conditions professionnelles :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="font-bold">Travail sur commandes réelles :</span> Les jeunes réalisent des produits ou services qui seront vendus, donnant un sens concret à leur apprentissage.</li>
            <li><span className="font-bold">Encadrement professionnel :</span> Les élèves sont accompagnés par des "Maîtres Professionnels" qui sont à la fois formateurs et chefs de production.</li>
            <li><span className="font-bold">Acquisition de compétences :</span> Ils développent des savoir-faire techniques, mais aussi des compétences transversales (autonomie, esprit d'équipe, rigueur).</li>
            <li><span className="font-bold">Rythme adapté :</span> La pédagogie s'adapte au rythme d'apprentissage de chacun, favorisant la réussite de tous.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Section : Les Bénéfices */}
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-[#3C5F58] flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-[#3C5F58]" />
            Un Modèle Gagnant-Gagnant
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-gray-700 space-y-4">
          <p>
            Les Écoles de Production bénéficient à plusieurs acteurs :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#3C5F58]" />
                <span className="font-bold">Pour les Jeunes :</span> Une insertion professionnelle réussie, une motivation accrue par le concret, et l'acquisition d'une véritable culture d'entreprise.
              </div>
            </li>
            <li>
              <div className="flex items-center gap-2">
                <Handshake className="w-4 h-4 text-[#3C5F58]" />
                <span className="font-bold">Pour les Entreprises :</span> Accès à des jeunes qualifiés et opérationnels, formés aux besoins réels du marché du travail, et une contribution à la RSE.
              </div>
            </li>
            <li>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-[#3C5F58]" />
                <span className="font-bold">Pour le Territoire :</span> Développement des compétences locales, lutte contre le décrochage scolaire, dynamisme économique et social.
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>
      
      {/* Lien vers le site officiel */}
      <div className="text-center mt-8">
        <a href="https://www.ecoles-de-production.com/" target="_blank" rel="noopener noreferrer">
          <Button className="px-6 py-3 bg-[#2E5941] text-white rounded-md hover:bg-[#3C5F58] transition-colors text-lg flex items-center gap-2">
            En savoir plus sur les Écoles de Production
            <ExternalLink className="w-5 h-5" />
          </Button>
        </a>
      </div>

      {/* Bouton de retour à l'accueil */}
      <div className="flex flex-wrap justify-center gap-4 mt-8">
        {navigate && (
          <Button
            onClick={() => navigate('accueil')}
            className="px-6 py-3 bg-[#2E5941] text-white rounded-md hover:bg-[#3C5F58] transition-colors text-lg flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour à l'accueil
          </Button>
        )}
      </div>
    </section>
  );
};

export default EcoleDeProduction;