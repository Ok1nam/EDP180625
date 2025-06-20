// client/src/pages/EcoleDeProduction.tsx

import React from 'react';
import { School, Building2, Users, Lightbulb, Handshake, DollarSign, ArrowLeft, FileText } from "lucide-react"; 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface EcoleDeProductionProps {
  navigate?: (page: string) => void;
}

const EcoleDeProduction: React.FC<EcoleDeProductionProps> = ({ navigate }) => {
  return (
    <section id="ecole-de-production" className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="flex items-center gap-3 mb-6 text-3xl font-bold text-gray-800">
        <School className="w-8 h-8 text-indigo-600" />
        L'École de Production : Un Modèle Unique
      </h1>
      
      <p className="mb-8 text-lg text-gray-700 leading-relaxed">
        Les Écoles de Production offrent une pédagogie innovante et concrète, basée sur le "Faire pour Apprendre". Elles forment des jeunes aux métiers techniques en répondant à de véritables commandes d'entreprises. Ce modèle unique combine formation professionnelle, production réelle et insertion socio-économique.
      </p>

      {/* Section : Qu'est-ce qu'une École de Production ? */}
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-blue-50 border-b">
          <CardTitle className="text-xl font-bold text-blue-700 flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Une Pédagogie par le "Faire"
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-gray-700 space-y-4">
          <p>
            Au cœur du concept de l'École de Production se trouve l'apprentissage par la pratique. Les élèves produisent des biens ou des services commandés par des clients réels, et ce, dans des conditions professionnelles :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>**Travail sur commandes réelles :** Les jeunes réalisent des produits ou services qui seront vendus, ce qui donne un sens concret à leur apprentissage.</li>
            <li>**Encadrement professionnel :** Les élèves sont accompagnés par des "Maîtres Professionnels" qui sont à la fois formateurs et chefs de production.</li>
            <li>**Acquisition de compétences :** Ils développent des savoir-faire techniques, mais aussi des compétences transversales (autonomie, esprit d'équipe, rigueur).</li>
            <li>**Rythme adapté :** La pédagogie s'adapte au rythme d'apprentissage de chacun, favorisant la réussite de tous.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Section : Les Bénéfices */}
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-green-50 border-b">
          <CardTitle className="text-xl font-bold text-green-700 flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
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
                <Users className="w-4 h-4 text-green-600" />
                **Pour les Jeunes :** Une insertion professionnelle réussie (souvent 100% à l'emploi ou en poursuite d'études), une motivation accrue par le concret, et l'acquisition d'une véritable culture d'entreprise.
              </div>
            </li>
            <li>
              <div className="flex items-center gap-2">
                <Handshake className="w-4 h-4 text-green-600" />
                **Pour les Entreprises :** Accès à des jeunes qualifiés et opérationnels, formés aux besoins réels du marché du travail, et une contribution à la RSE.
              </div>
            </li>
            <li>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                **Pour le Territoire :** Développement des compétences locales, lutte contre le décrochage scolaire, dynamisme économique et social.
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Boutons de navigation */}
      <div className="flex flex-wrap justify-center gap-4 mt-8">
        {navigate && (
          <>
            <Button
              onClick={() => navigate('questionnaire')}
              className="btn-secondary flex items-center gap-2 px-6 py-3 text-lg"
              variant="outline"
            >
              <Lightbulb className="w-5 h-5" />
              Tester mon projet d'EDP
            </Button>
            <Button
              onClick={() => navigate('methodo')}
              className="btn-secondary flex items-center gap-2 px-6 py-3 text-lg"
              variant="outline"
            >
              <FileText className="w-5 h-5" /> 
              Voir la Méthodologie
            </Button>
            <Button
              onClick={() => navigate('accueil')}
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-lg flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Retour à l'accueil
            </Button>
          </>
        )}
      </div>
    </section>
  );
};

export default EcoleDeProduction;