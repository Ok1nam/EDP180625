// client/src/pages/StatutsGenerator.tsx

import React, { useState } from "react"; // Importez React
import { FileText, Download, Building, User, Gavel } from "lucide-react"; // Ajout de Gavel pour les statuts
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea"; // Plus besoin de Textarea si l'objet est fixe
import { useToast } from "@/hooks/use-toast";

interface StatutsData {
  associationName: string;
  presidentName: string;
  secretaireName: string;
  siegeSocial: string;
  // Les champs 'objet', 'duree', 'montantCotisation' sont supprimés du formulaire
  // mais leurs valeurs par défaut seront dans le template.
}

interface StatutsGeneratorProps {
    navigate: (page: string) => void; // Ajout de la prop navigate
}

const StatutsGenerator: React.FC<StatutsGeneratorProps> = ({ navigate }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<StatutsData>({
    associationName: '',
    presidentName: '',
    secretaireName: '',
    siegeSocial: '',
  });

  const [showPreview, setShowPreview] = useState(false);

  const handleInputChange = (field: keyof StatutsData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateStatuts = () => {
    // Valeurs par défaut pour les champs supprimés du formulaire
    const defaultObjet = `
- De mettre en œuvre la pédagogie du "faire pour apprendre" et de former des jeunes aux métiers par la production de biens ou de services.
- De contribuer à l'insertion professionnelle et sociale des jeunes, notamment ceux éloignés du système scolaire classique.
- De développer l'autonomie, la responsabilisation et le savoir-faire des élèves par la réalisation de commandes réelles pour des clients.
- De participer au développement économique local en répondant aux besoins des entreprises du territoire.
- De toute autre activité concourant directement ou indirectement à la réalisation de son objet social.`;

    const defaultDuree = '99'; // Durée par défaut
    const defaultCotisation = 'Le montant des cotisations est fixé annuellement par l\'assemblée générale sur proposition du conseil d\'administration.'; // Texte par défaut pour les cotisations

    const statutsTemplate = `
STATUTS DE L'ASSOCIATION
${formData.associationName || "[NOM DE L'ASSOCIATION]"}

ARTICLE 1 - DÉNOMINATION
Il est fondé entre les adhérents aux présents statuts une association régie par la loi du 1er juillet 1901 et le décret du 16 août 1901, ayant pour titre :
${formData.associationName || "[NOM DE L'ASSOCIATION]"}

ARTICLE 2 - OBJET
Cette association a pour objet :${defaultObjet}

ARTICLE 3 - SIÈGE SOCIAL
Le siège social est fixé à :
${formData.siegeSocial || '[ADRESSE DU SIÈGE SOCIAL]'}
Il pourra être transféré par simple décision du conseil d'administration.

ARTICLE 4 - DURÉE
La durée de l'association est de ${defaultDuree} années à compter de sa déclaration en préfecture.

ARTICLE 5 - COMPOSITION
L'association se compose de :
- Membres fondateurs
- Membres d'honneur
- Membres actifs ou adhérents
- Membres bienfaiteurs

ARTICLE 6 - ADMISSION
Pour faire partie de l'association, il faut être agréé par le Conseil d'Administration, qui statue lors de chacune de ses réunions sur les demandes d'admission présentées.

ARTICLE 7 - MEMBRES - COTISATIONS
${defaultCotisation}

ARTICLE 8 - RADIATIONS
La qualité de membre se perd par :
- La démission
- Le décès
- La radiation prononcée par le conseil d'administration pour motif grave, ou pour non-paiement des cotisations après mise en demeure restée sans effet.

ARTICLE 9 - RESSOURCES
Les ressources de l'association comprennent :
- Le montant des cotisations.
- Les subventions de l'État, des régions, des départements, des communes et de toutes autres collectivités publiques ou privées.
- Les produits des activités de production réalisées par les élèves.
- Les revenus des biens et valeurs appartenant à l'association.
- Les dons manuels et legs, ainsi que les produits de toute autre ressource autorisée par la loi et les règlements en vigueur.

ARTICLE 10 - CONSEIL D'ADMINISTRATION
L'association est dirigée par un conseil d'administration composé de [NOMBRE DE MEMBRES] membres au minimum et [NOMBRE DE MEMBRES] au maximum, élus pour [DURÉE DU MANDAT, ex: 3] années par l'Assemblée Générale. Les membres sont rééligibles.

ARTICLE 11 - BUREAU
Le conseil d'administration élit parmi ses membres, à la majorité absolue, un bureau composé de :
- Un(e) président(e) : ${formData.presidentName || '[NOM DU PRÉSIDENT]'}
- Un(e) ou plusieurs vice-président(s) (facultatif)
- Un(e) secrétaire : ${formData.secretaireName || '[NOM DU SECRÉTAIRE]'}
- Un(e) secrétaire adjoint(e) (facultatif)
- Un(e) trésorier(ère)
- Un(e) trésorier(ère) adjoint(e) (facultatif)

ARTICLE 12 - RÉUNIONS DU CONSEIL D'ADMINISTRATION
Le conseil d'administration se réunit au moins une fois tous les six mois, sur convocation du président, ou sur la demande du quart de ses membres. Les décisions sont prises à la majorité des voix des présents ou représentés.

ARTICLE 13 - ASSEMBLÉE GÉNÉRALE ORDINAIRE
L'assemblée générale ordinaire comprend tous les membres de l'association à jour de leurs cotisations.
Elle se réunit au moins une fois par an, dans les [DÉLAI, ex: six] mois qui suivent la clôture de l'exercice, sur convocation du président.

ARTICLE 14 - ASSEMBLÉE GÉNÉRALE EXTRAORDINAIRE
Si besoin est, ou sur la demande de la moitié plus un des membres inscrits, le président peut convoquer une assemblée générale extraordinaire. Les modalités de convocation et de vote sont identiques à celles de l'assemblée générale ordinaire, sauf disposition contraire des présents statuts.

ARTICLE 15 - RÈGLEMENT INTÉRIEUR
Un règlement intérieur peut être établi par le conseil d'administration, qui le fait alors approuver par l'assemblée générale. Ce règlement est destiné à fixer les divers points non prévus par les présents statuts, notamment ceux qui ont trait à l'administration interne de l'association.

ARTICLE 16 - DISSOLUTION
En cas de dissolution prononcée selon les modalités prévues à l'article 14, un ou plusieurs liquidateurs sont nommés par l'assemblée générale extraordinaire, et l'actif net, s'il y a lieu, est dévolu à un organisme ayant un but non lucratif et reconnu d'utilité publique, conformément aux décisions de ladite assemblée, et aux dispositions légales en vigueur.

Fait à ${formData.siegeSocial ? formData.siegeSocial.split(',')[0].trim() || '[VILLE]' : '[VILLE]'}, le [DATE DU JOUR]

Le Président,                          Le Secrétaire,
${formData.presidentName || '[NOM DU PRÉSIDENT]'}                    ${formData.secretaireName || '[NOM DU SECRÉTAIRE]'}

Signature :                           Signature :
`;

    return statutsTemplate;
  };

  const downloadStatuts = () => {
    if (!formData.associationName || !formData.presidentName || !formData.secretaireName || !formData.siegeSocial) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez remplir au minimum le nom de l'association, le président, le secrétaire et le siège social.",
        variant: "destructive"
      });
      return;
    }

    const statutsContent = generateStatuts();
    const blob = new Blob([statutsContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Statuts_${formData.associationName.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Statuts générés",
      description: "Les statuts ont été téléchargés avec succès.",
    });
  };

  const resetForm = () => {
    setFormData({
      associationName: '',
      presidentName: '',
      secretaireName: '',
      siegeSocial: '',
    });
    setShowPreview(false);
  };

  const isFormValid = formData.associationName && formData.presidentName && formData.secretaireName && formData.siegeSocial;

  return (
    <section id="statuts-generator" className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="flex items-center gap-2 mb-6 text-3xl font-bold text-gray-800">
        <Gavel className="w-8 h-8 text-primary" /> {/* Icône Gavel */}
        Générateur de Statuts d'Association (Loi 1901)
      </h1>
      
      <p className="mb-8 text-lg text-gray-700 leading-relaxed">
        Ce générateur vous aide à pré-remplir les statuts fondamentaux pour la création de votre École de Production sous forme associative (Loi 1901). Ces statuts sont une base solide, que vous pourrez adapter et compléter selon les spécificités de votre projet.
      </p>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Formulaire */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="w-5 h-5" />
              Informations Clés de l'Association
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="association-name">Nom de l'association *</Label>
              <Input
                id="association-name"
                value={formData.associationName}
                onChange={(e) => handleInputChange('associationName', e.target.value)}
                placeholder="Ex: École de Production des Artisans de Demain"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="siege-social">Siège social *</Label>
              <Input
                id="siege-social"
                value={formData.siegeSocial}
                onChange={(e) => handleInputChange('siegeSocial', e.target.value)}
                placeholder="Ex: 123 rue de l'Apprentissage, 75000 Paris"
                className="mt-1"
              />
            </div>
            
            {/* Note sur l'objet social */}
            <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-800 p-3 shadow-sm">
              <p className="font-semibold mb-1">Objet de l'association (pré-rempli) :</p>
              <p className="text-sm">
                L'objet social, essentiel pour une École de Production, est déjà formulé dans les statuts générés pour inclure la pédagogie du "faire", la formation aux métiers et l'insertion professionnelle. Vous pourrez l'affiner si nécessaire.
                Pour plus d'informations sur la création et les enjeux d'une École de Production, consultez notre section <span
                    className="text-blue-600 hover:underline cursor-pointer font-medium"
                    onClick={() => navigate('documentation')}
                >
                    Documentation & Guides
                </span>.
              </p>
            </div>

            {/* Note sur la durée */}
            <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-800 p-3 shadow-sm">
              <p className="font-semibold mb-1">Durée de l'association (pré-remplie) :</p>
              <p className="text-sm">
                La durée de l'association est fixée à 99 ans par défaut, ce qui est une pratique courante pour les associations à but non lucratif.
              </p>
            </div>

            {/* Note sur les cotisations */}
            <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-800 p-3 shadow-sm">
              <p className="font-semibold mb-1">Cotisations (pré-remplies) :</p>
              <p className="text-sm">
                Les statuts prévoient que le montant des cotisations sera fixé annuellement par l'assemblée générale. Cela offre une flexibilité pour les futurs ajustements.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Dirigeants et actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Informations sur les Dirigeants
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="president">Nom du président *</Label>
              <Input
                id="president"
                value={formData.presidentName}
                onChange={(e) => handleInputChange('presidentName', e.target.value)}
                placeholder="Ex: Madame/Monsieur Dupont"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="secretaire">Nom du secrétaire *</Label>
              <Input
                id="secretaire"
                value={formData.secretaireName}
                onChange={(e) => handleInputChange('secretaireName', e.target.value)}
                placeholder="Ex: Madame/Monsieur Martin"
                className="mt-1"
              />
            </div>

            <div className="pt-4 space-y-3">
              <Button 
                onClick={() => setShowPreview(!showPreview)}
                className="w-full btn-secondary"
                disabled={!isFormValid}
              >
                {showPreview ? 'Masquer l\'aperçu' : 'Aperçu des statuts'}
              </Button>
              
              <Button 
                onClick={downloadStatuts}
                className="w-full btn-primary"
                disabled={!isFormValid}
              >
                <Download className="w-4 h-4 mr-2" />
                Télécharger les statuts (fichier .txt)
              </Button>
              
              <Button 
                onClick={resetForm}
                className="w-full btn-secondary"
              >
                Réinitialiser le formulaire
              </Button>
            </div>

            {!isFormValid && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-4">
                <p className="text-sm text-yellow-800">
                  <strong>Champs obligatoires :</strong> Veuillez renseigner le nom de l'association, le nom du président, le nom du secrétaire et l'adresse du siège social.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Aperçu */}
      {showPreview && isFormValid && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Aperçu des statuts générés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-lg max-h-[60vh] overflow-y-auto border border-gray-200">
              <pre className="whitespace-pre-wrap text-sm font-mono text-gray-800">
                {generateStatuts()}
              </pre>
            </div>
            <p className="text-xs text-gray-500 mt-2">
                N'oubliez pas d'adapter les sections entre crochets `[...]` avant utilisation.
            </p>
          </CardContent>
        </Card>
      )}

      <Card className="mt-6 shadow-sm">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
              <FileText className="inline-block w-6 h-6 mr-2 text-blue-600" />
              Conseils importants pour la création de votre association
          </h3>
          <div className="text-base text-gray-700 space-y-3">
            <p>
              **Objet social :** L'objet social est le cœur de votre association. La formule pré-remplie est adaptée aux Écoles de Production. Si votre projet a des spécificités uniques, n'hésitez pas à l'affiner pour qu'il reflète précisément toutes vos activités. Un objet clair évite les ambiguïtés et est important pour l'obtention de certaines aides ou labels (comme les <span
                className="text-blue-600 hover:underline cursor-pointer font-medium"
                onClick={() => navigate('criteres-label')}
            >
                critères de labellisation
            </span>).
            </p>
            <p>
              **Ressources :** L'article 9 sur les ressources est très important pour une École de Production, car il doit inclure non seulement les cotisations et subventions, mais aussi les **produits des activités de production** des élèves.
            </p>
            <p>
              **Déclaration :** Une fois les statuts signés par tous les membres fondateurs, vous devez déclarer votre association en préfecture ou sous-préfecture, ou en ligne via le site service-public.fr.
            </p>
            <p>
              **Règlement Intérieur :** Il est fortement recommandé de créer un règlement intérieur après la création des statuts. Il précise les règles de fonctionnement interne non abordées dans les statuts (ex: modalités d'adhésion, rôles des commissions, vie de l'établissement).
            </p>
            <p className="text-sm italic text-gray-600 mt-4">
              Ce générateur fournit un modèle. Pour une conformité totale et adaptée à votre situation spécifique, notamment pour les aspects fiscaux et comptables complexes, il est vivement conseillé de consulter un expert-comptable.
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default StatutsGenerator;