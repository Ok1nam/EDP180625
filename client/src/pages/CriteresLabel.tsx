import React, { useState, useEffect } from 'react';
import { CheckCircle, Award, Lightbulb, XCircle, Download, Briefcase } from "lucide-react"; 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface CriteresLabelProps {
  navigate?: (page: string) => void;
}

interface Criterion {
  id: string;
  text: string;
  category: string;
}

const allCriteria: Criterion[] = [
  // 1. Structure et statut juridique
  { id: 'critere-1-1', text: 'L\'école est portée par une association loi 1901 (ou équivalent à but non lucratif).', category: 'Structure et statut juridique' },
  { id: 'critere-1-2', text: 'Un Conseil d\'administration est constitué, actif et impliqué.', category: 'Structure et statut juridique' },
  { id: 'critere-1-3', text: 'L\'école dispose d\'un règlement intérieur clair et conforme.', category: 'Structure et statut juridique' },
  { id: 'critere-1-4', text: 'CAdm/COPIL d\'au moins 6 membres divers (entreprises, éducation, territoire), signataires de la charte éthique.', category: 'Structure et statut juridique' },
  { id: 'critere-1-5', text: 'Réunions CAdm/COPIL ≥ 3 fois/an avec comptes-rendus.', category: 'Structure et statut juridique' },
  { id: 'critere-1-6', text: 'CAdm/COPIL garant du label et du suivi des actions correctives post-audit.', category: 'Structure et statut juridique' },
  { id: 'critere-1-7', text: 'Nomination de représentants au sein de la FNEP.', category: 'Structure et statut juridique' },
  { id: 'critere-1-8', text: 'Comptes annuels certifiés, rapports d\'activités et qualitatif remis à la FNEte.', category: 'Structure et statut juridique' },
  { id: 'critere-1-9', text: 'Comptabilité analytique certifiée, organigramme et traçabilité des opérations (COPIL).', category: 'Structure et statut juridique' },
  { id: 'critere-1-10', text: 'Emplois temps plein pour direction et maîtres-professionnels (sauf démarrage).', category: 'Structure et statut juridique' },

  // 2. Projet pédagogique conforme
  { id: 'critere-2-1', text: 'Respect du principe du "Faire pour apprendre".', category: 'Projet pédagogique conforme' },
  { id: 'critere-2-2', text: 'Répartition des temps: 2/3 du temps en atelier, 1/3 en enseignement général.', category: 'Projet pédagogique conforme' },
  { id: 'critere-2-3', text: 'Accompagnement renforcé des jeunes sur le plan humain et éducatif.', category: 'Projet pédagogique conforme' },
  { id: 'critere-2-4', text: 'Possibilité pour les jeunes de préparer un diplôme reconnu (CAP, Bac Pro, etc.).', category: 'Projet pédagogique conforme' },
  { id: 'critere-2-5', text: 'Les enseignants et maîtres professionnels sont formés ou encadrés.', category: 'Projet pédagogique conforme' },
  { id: 'critere-2-6', text: 'Parcours d\'au moins 2 ans avec visée éducative, humaine et professionnelle.', category: 'Projet pédagogique conforme' },
  { id: 'critere-2-7', text: 'Pédagogie adaptée aux jeunes en difficulté scolaire.', category: 'Projet pédagogique conforme' },
  { id: 'critere-2-8', text: 'Coordination régulière entre maîtres-professionnels et enseignants généraux.', category: 'Projet pédagogique conforme' },
  { id: 'critere-2-9', text: 'Évaluation continue (tableau de compétences).', category: 'Projet pédagogique conforme' },
  { id: 'critere-2-10', text: 'Travail collectif encouragé (binômes, entraide).', category: 'Projet pédagogique conforme' },
  { id: 'critere-2-11', text: 'Temps de relecture/réflexion pour auto-évaluation.', category: 'Projet pédagogique conforme' },
  { id: 'critere-2-12', text: 'Éducation au savoir-être (éthique, sécurité, qualité).', category: 'Projet pédagogique conforme' },
  { id: 'critere-2-13', text: 'Sentiment d\'appartenance à l\'école.', category: 'Projet pédagogique conforme' },
  { id: 'critere-2-14', text: 'Dispositif d\'accompagnement post-sortie (réseau d\'anciens élèves).', category: 'Projet pédagogique conforme' },

  // 3. Activité de production réelle
  { id: 'critere-3-1', text: 'L\'école réalise une production concrète répondant à de vraies commandes clients.', category: 'Activité de production réelle' },
  { id: 'critere-3-2', text: 'L\'activité est régulière, encadrée et structurée comme en entreprise.', category: 'Activité de production réelle' },
  { id: 'critere-3-3', text: 'L\'atelier est sûr, équipé et opérationnel dès l\'ouverture.', category: 'Activité de production réelle' },
  { id: 'critere-3-4', text: 'Volume de ventes conséquent.', category: 'Activité de production réelle' },
  { id: 'critere-3-5', text: 'Tarification au prix du marché.', category: 'Activité de production réelle' },
  { id: 'critere-3-6', text: 'Clientèle diversifiée.', category: 'Activité de production réelle' },

  // 4. Équipe qualifiée
  { id: 'critere-4-1', text: 'Un directeur est désigné.', category: 'Équipe qualifiée' },
  { id: 'critere-4-2', text: 'Présence d\'au moins un maître-professionnel expérimenté (min. 2 ans métier, 5 ans entreprise).', category: 'Équipe qualifiée' },
  { id: 'critere-4-3', text: 'Maîtres professionnels formés aux spécificités FNEP.', category: 'Équipe qualifiée' },
  { id: 'critere-4-4', text: 'Recrutement ou partenariat avec des enseignants de matières générales.', category: 'Équipe qualifiée' },
  { id: 'critere-4-5', text: 'Répartition claire des rôles au sein de l\'équipe.', category: 'Équipe qualifiée' },
  { id: 'critere-4-6', text: 'Contacts professionnels pour les formateurs (clients, fournisseurs...).', category: 'Équipe qualifiée' },
  { id: 'critere-4-7', text: 'Contacts professionnels pour les élèves (visites, rencontres, stages courts).', category: 'Équipe qualifiée' },

  // 5. Ancrage territorial
  { id: 'critere-5-1', text: 'Une étude de besoin local a été menée.', category: 'Ancrage territorial' },
  { id: 'critere-5-2', text: 'Des entreprises partenaires ont été identifiées (commandes, mécénat, accueil, stages).', category: 'Ancrage territorial' },
  { id: 'critere-5-3', text: 'Les collectivités locales sont informées et (idéalement) soutiennent le projet.', category: 'Ancrage territorial' },

  // 6. Modèle économique viable
  { id: 'critere-6-1', text: 'Plan de financement établi pour 5 ans minimum.', category: 'Modèle économique viable' },
  { id: 'critere-6-2', text: 'Financement mixte: subventions publiques / mécénat / production / autres.', category: 'Modèle économique viable' },
  { id: 'critere-6-3', text: 'Budget prévisionnel réaliste et pessimiste, tenant compte des charges fixes et de l\'amortissement.', category: 'Modèle économique viable' },
  { id: 'critere-6-4', text: 'Objectif d\'équilibre progressif entre activité économique et subventions.', category: 'Modèle économique viable' },
  { id: 'critere-6-5', text: 'L\'école a un outil de pilotage budgétaire fiable.', category: 'Modèle économique viable' },
  { id: 'critere-6-6', text: 'L\'école est dotée de ressources financières assurant sa pérennité à moyen terme.', category: 'Modèle économique viable' },

  // 7. Démarches administratives et reconnaissance
  { id: 'critere-7-1', text: 'Déclaration auprès du Rectorat / DREETS/DRAFPIC selon les régions.', category: 'Démarches administratives et reconnaissance' },
  { id: 'critere-7-2', text: 'Demande de code UAI (identification administrative d\'un établissement scolaire).', category: 'Démarches administratives et reconnaissance' },
  { id: 'critere-7-3', text: 'Démarche de reconnaissance auprès de la FNEP engagée.', category: 'Démarches administratives et reconnaissance' },
  { id: 'critere-7-4', text: 'Présentation d\'un projet éducatif, statuts et prévisionnel d\'activité.', category: 'Démarches administratives et reconnaissance' },

  // 8. Adhésion aux valeurs du réseau
  { id: 'critere-8-1', text: 'Adhésion aux valeurs de la FNEP.', category: 'Adhésion aux valeurs du réseau' },
  { id: 'critere-8-2', text: 'Volonté de participer à la dynamique de réseau (partage, mutualisation, formations).', category: 'Adhésion aux valeurs du réseau' },
  { id: 'critere-8-3', text: 'Participation prévue à la formation des équipes et porteurs.', category: 'Adhésion aux valeurs du réseau' },
];

export default function CriteresLabel({ navigate }: CriteresLabelProps) {
  const [checkedCriteria, setCheckedCriteria] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('checkedCriteria');
    return saved ? JSON.parse(saved) : {};
  });

  const [progressValue, setProgressValue] = useState(0);

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

  const groupedCriteria = allCriteria.reduce((acc, criterion) => {
    (acc[criterion.category] = acc[criterion.category] || []).push(criterion);
    return acc;
  }, {} as Record<string, Criterion[]>);

  const totalCriteria = allCriteria.length;
  const completedCriteriaCount = Object.values(checkedCriteria).filter(Boolean).length;
  const checklistPath = "/fichiers/ANNEXE 10 - LISTE DE VERIFICATION DES CRITERES A REMPLIR POUR OBTENIR LE LABEL.docx";

  return (
    <section id="criteres-label" className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="flex items-center gap-2 mb-6 text-3xl font-bold text-gray-800">
        <Award className="w-8 h-8 text-[#3C5F58]" />
        Checklist de labellisation pour votre client
      </h1>
      
      <p className="mb-8 text-lg text-gray-700 leading-relaxed">
        En tant qu'expert-comptable, vous êtes un acteur clé dans le processus de labellisation de l'École de Production que vous accompagnez. Cette checklist est votre outil de pilotage pour vérifier la conformité de leur projet et les guider vers l'obtention du label de la Fédération Nationale des Écoles de Production (FNEP).
      </p>

      {/* Barre de progression */}
      <Card className="mb-8 p-6 shadow-md">
        <CardTitle className="mb-4 text-xl font-semibold flex items-center gap-2 text-[#3C5F58]">
            <CheckCircle className="w-5 h-5 text-[#3C5F58]" />
            Avancement du dossier
        </CardTitle>
        <div className="flex items-center gap-4">
          <Progress value={progressValue} className="w-full h-3 bg-[#2E5941]" />
          <span className="font-semibold text-gray-800">{completedCriteriaCount}/{totalCriteria} ({progressValue.toFixed(0)}%)</span>
        </div>
        {progressValue === 100 && (
          <p className="mt-4 text-center text-[#2E5941] font-bold text-lg animate-bounce">
            🎉 Bravo ! Le dossier de votre client semble prêt à être présenté.
          </p>
        )}
      </Card>

      {/* Section de téléchargement corrigée */}
      <Card className="mb-8 shadow-lg border-2 border-[#3C5F58]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-[#2E5941] flex items-center gap-3">
            <Download className="w-6 h-6" /> Télécharger la checklist pour votre client
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="text-base text-gray-800 flex-1">
            <p className="mb-2">
              Téléchargez la version Word (.docx) de cette liste de vérification pour un suivi hors ligne ou pour la partager facilement avec votre client et son équipe.
            </p>
            <p className="text-sm text-gray-600">
                Vous pourrez y ajouter vos notes et observations pour chaque critère, facilitant ainsi la préparation du dossier de labellisation.
            </p>
          </div>
          <a
            href={checklistPath}
            download="ANNEXE 10 - LISTE DE VERIFICATION DES CRITERES A REMPLIR POUR OBTENIR LE LABEL.docx"
            className="flex-shrink-0"
          >
            <Button className="flex items-center gap-2 py-3 px-6 text-lg bg-[#2E5941] text-white rounded-md hover:bg-[#3C5F58] transition-colors">
              <Download className="w-5 h-5" /> Télécharger la checklist
            </Button>
          </a>
        </CardContent>
      </Card>

      {/* Liste des critères par catégorie */}
      {Object.entries(groupedCriteria).map(([category, criteria]) => (
        <Card key={category} className="mb-6 shadow-sm">
          <CardHeader className="bg-gray-50 border-b">
            <CardTitle className="text-xl font-bold text-[#3C5F58] flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-gray-500" />
              {category}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {criteria.map(criterion => (
              <div key={criterion.id} className="flex items-start space-x-3">
                <Checkbox
                  id={criterion.id}
                  checked={!!checkedCriteria[criterion.id]}
                  onCheckedChange={(checked) => handleCheckboxChange(criterion.id, checked === true)}
                  className="mt-1 border-[#3C5F58] data-[state=checked]:bg-[#2E5941] data-[state=checked]:text-white"
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
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-[#3C5F58]">
            <Lightbulb className="w-5 h-5 text-blue-600" />
            Votre rôle et conseils pour la labellisation
          </h3>
          <div className="text-base text-gray-700 space-y-3">
            <p>
              L'obtention du label "École de Production" est un gage de qualité pour votre client, lui ouvrant la voie à des financements spécifiques et à une meilleure visibilité auprès des entreprises. Votre expertise est indispensable pour l'aider à structurer son projet.
            </p>
            <p>
              <span className="font-bold">Documentation :</span> Accompagnez l'école dans la constitution des preuves documentaires nécessaires pour chaque critère coché. Les bilans financiers, les statuts et les comptes-rendus de CA sont essentiels.
            </p>
            <p>
              <span className="font-bold">Conseil stratégique :</span> En plus de la conformité, votre analyse critique du modèle économique et de l'organisation aide votre client à anticiper l'audit de labellisation. Utilisez cette checklist comme base pour vos recommandations.
            </p>
            <p>
              <span className="font-bold">Collaboration :</span> Facilitez la coordination entre l'équipe de l'école et la FNEP, en vous assurant que tous les aspects, notamment financiers et administratifs, sont en ordre.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Bouton de retour à l'accueil */}
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
}