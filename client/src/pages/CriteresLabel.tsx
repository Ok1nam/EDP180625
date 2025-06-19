// client/src/pages/CriteresLabel.tsx

import React, { useState, useEffect } from 'react';
import { CheckCircle, Award, Lightbulb, XCircle } from "lucide-react"; // Import des icônes pour la page
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox"; // Assurez-vous d'avoir ce composant de checkbox
import { Progress } from "@/components/ui/progress"; // Assurez-vous d'avoir ce composant de barre de progression
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

// Si la page a besoin de la fonction navigate, ajoutez-la aux props
interface CriteresLabelProps {
  navigate?: (page: string) => void; // Optionnel si la page n'a pas besoin de naviguer elle-même
}

// Définition des critères
interface Criterion {
  id: string;
  text: string;
  category: string; // Ex: Pédagogie, Gouvernance, Financier, etc.
}

const allCriteria: Criterion[] = [
  { id: 'critere-pedago-1', text: 'Mise en place de la pédagogie du "faire pour apprendre" (atelier-école).', category: 'Pédagogie' },
  { id: 'critere-pedago-2', text: 'Adoption d\'un référentiel de formation spécifique aux Écoles de Production.', category: 'Pédagogie' },
  { id: 'critere-pedago-3', text: 'Ratio élève/formateur respectant les normes de l\'Éducation Nationale.', category: 'Pédagogie' },
  { id: 'critere-gouvernance-1', text: 'Existence d\'une structure juridique associative (Loi 1901).', category: 'Gouvernance' },
  { id: 'critere-gouvernance-2', text: 'Présence d\'un Conseil d\'Administration actif et diversifié.', category: 'Gouvernance' },
  { id: 'critere-gouvernance-3', text: 'Engagement des entreprises locales dans la gouvernance de l\'école.', category: 'Gouvernance' },
  { id: 'critere-finances-1', text: 'Équilibre financier prévisionnel sur 3 ans (business plan).', category: 'Financier' },
  { id: 'critere-finances-2', text: 'Sources de financement diversifiées (subventions, produits de production, mécénat).', category: 'Financier' },
  { id: 'critere-finances-3', text: 'Suivi comptable rigoureux et conforme aux normes en vigueur.', category: 'Financier' },
  { id: 'critere-infrastructures-1', text: 'Locaux adaptés à l\'activité de production et à la formation.', category: 'Infrastructures' },
  { id: 'critere-infrastructures-2', text: 'Équipements professionnels et conformes aux métiers enseignés.', category: 'Infrastructures' },
  // Ajoutez d'autres critères ici...
  { id: 'critere-x', text: 'Critère X (à compléter).', category: 'Autres' },
  { id: 'critere-y', text: 'Critère Y (à compléter).', category: 'Autres' },
];

export default function CriteresLabel({ navigate }: CriteresLabelProps) {
  // État pour stocker quels critères sont cochés
  const [checkedCriteria, setCheckedCriteria] = useState<Record<string, boolean>>(() => {
    // Initialisation depuis le localStorage pour persistance
    const saved = localStorage.getItem('checkedCriteria');
    return saved ? JSON.parse(saved) : {};
  });

  // Pour l'animation de la barre de progression
  const [progressValue, setProgressValue] = useState(0);

  // Mettre à jour le localStorage et la progression à chaque changement
  useEffect(() => {
    localStorage.setItem('checkedCriteria', JSON.stringify(checkedCriteria));
    const totalCriteria = allCriteria.length;
    const completedCriteria = Object.values(checkedCriteria).filter(Boolean).length;
    const newProgress = totalCriteria > 0 ? (completedCriteria / totalCriteria) * 100 : 0;
    setProgressValue(newProgress);
  }, [checkedCriteria]);

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setCheckedCriteria(prev => ({
      ...prev,
      [id]: checked
    }));
  };

  // Grouper les critères par catégorie pour un affichage plus clair
  const groupedCriteria = allCriteria.reduce((acc, criterion) => {
    (acc[criterion.category] = acc[criterion.category] || []).push(criterion);
    return acc;
  }, {} as Record<string, Criterion[]>);

  const totalCriteria = allCriteria.length;
  const completedCriteriaCount = Object.values(checkedCriteria).filter(Boolean).length;

  return (
    <section id="criteres-label" className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="flex items-center gap-2 mb-6 text-3xl font-bold text-gray-800">
        <Award className="w-8 h-8 text-yellow-500" /> {/* Icône Award pour le label */}
        Critères d'Obtention du Label "École de Production"
      </h1>
      
      <p className="mb-8 text-lg text-gray-700 leading-relaxed">
        Pour qu'une École de Production puisse prétendre au label officiel, elle doit répondre à un ensemble de critères stricts couvrant la pédagogie, la gouvernance, les finances et les infrastructures. Utilisez cette liste interactive pour suivre votre progression.
      </p>

      {/* Barre de progression */}
      <Card className="mb-8 p-6 shadow-md">
        <CardTitle className="mb-4 text-xl font-semibold flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Progression de votre labellisation
        </CardTitle>
        <div className="flex items-center gap-4">
          <Progress value={progressValue} className="w-full h-3 bg-gray-200" />
          <span className="font-semibold text-gray-800">{completedCriteriaCount}/{totalCriteria} ({progressValue.toFixed(0)}%)</span>
        </div>
        {progressValue === 100 && (
          <p className="mt-4 text-center text-green-600 font-bold text-lg animate-bounce">
            🎉 Félicitations ! Tous les critères sont cochés. Votre dossier est prêt !
          </p>
        )}
      </Card>

      {/* Liste des critères par catégorie */}
      {Object.entries(groupedCriteria).map(([category, criteria]) => (
        <Card key={category} className="mb-6 shadow-sm">
          <CardHeader className="bg-gray-50 border-b">
            <CardTitle className="text-xl font-bold text-gray-700 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-orange-500" /> {/* Icône pour les catégories */}
              {category}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {criteria.map(criterion => (
              <div key={criterion.id} className="flex items-start space-x-3">
                <Checkbox
                  id={criterion.id}
                  checked={!!checkedCriteria[criterion.id]} // Convertir undefined/null en false
                  onCheckedChange={(checked) => handleCheckboxChange(criterion.id, checked === true)} // S'assurer que 'checked' est un boolean
                  className="mt-1"
                />
                <Label htmlFor={criterion.id} className="text-base text-gray-800 cursor-pointer flex-1 leading-relaxed">
                  {criterion.text}
                </Label>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}

      {/* Section Information et conseils */}
      <Card className="mt-8 shadow-md">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-gray-800">
            <Lightbulb className="w-5 h-5 text-blue-600" />
            Conseils pour la labellisation
          </h3>
          <div className="text-base text-gray-700 space-y-3">
            <p>
              L'obtention du label "École de Production" est un gage de qualité et de reconnaissance, ouvrant la voie à des financements spécifiques et à une meilleure visibilité.
            </p>
            <p>
              **Documentation :** Assurez-vous de pouvoir fournir toutes les preuves documentaires nécessaires pour chaque critère coché (bilans financiers, procès-verbaux de CA, programmes pédagogiques, etc.).
            </p>
            <p>
              **Accompagnement :** N'hésitez pas à vous faire accompagner par des experts ou le réseau national des Écoles de Production pour préparer votre dossier de labellisation. Le <span
                  className="text-blue-600 hover:underline cursor-pointer font-medium"
                  onClick={() => navigate && navigate('expert-comptable')}
              >
                  rôle de l'expert-comptable
              </span> est crucial pour les aspects financiers et organisationnels.
            </p>
            <p>
              **Audit :** Le processus de labellisation implique généralement un audit approfondi de votre structure et de vos pratiques. Une bonne préparation est clé.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Bouton de retour à l'accueil */}
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
}