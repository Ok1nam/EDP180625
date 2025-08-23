import React, { useState } from "react";
import { FileText, Download, Building, User, Gavel, FileText as FileWord, Euro, Briefcase, Lightbulb } from "lucide-react";

// NOTE: The components are assumed to be available from a component library like shadcn/ui.
const Card = ({ children, className = '' }) => <div className={`bg-white rounded-xl shadow-lg border border-gray-200 ${className}`}>{children}</div>;
const CardContent = ({ children, className = '' }) => <div className={`p-6 ${className}`}>{children}</div>;
const CardHeader = ({ children, className = '' }) => <div className={`p-6 border-b border-gray-200 ${className}`}>{children}</div>;
const CardTitle = ({ children, className = '' }) => <h2 className={`text-xl font-semibold ${className}`}>{children}</h2>;
const Input = ({ id, type = "text", value, onChange, placeholder, className = '' }) => <input id={id} type={type} value={value} onChange={onChange} placeholder={placeholder} className={`w-full px-3 py-2 border rounded-md focus:ring-[#3C5F58] focus:border-[#3C5F58] ${className}`} />;
const Label = ({ children, htmlFor, className = '' }) => <label htmlFor={htmlFor} className={`block font-medium text-gray-700 ${className}`}>{children}</label>;
const Button = ({ children, onClick, disabled = false, className = '' }) => <button onClick={onClick} disabled={disabled} className={`px-4 py-2 rounded-md transition-colors duration-200 ${className}`}>{children}</button>;

const useToast = () => ({ toast: (options) => console.log('Toast:', options) });

interface StatutsData {
  associationName: string;
  presidentName: string;
  secretaireName: string;
  adressePostale: string;
  codePostal: string;
  ville: string;
  clotureExerciceDate: string;
  cloturePremierExerciceDate: string;
  dureePremierExercice: 'supérieur' | 'inférieur' | null;
}

interface StatutsGeneratorProps {
    navigate: (page: string) => void;
}

const StatutsGenerator: React.FC<StatutsGeneratorProps> = ({ navigate }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<StatutsData>({
    associationName: '',
    presidentName: '',
    secretaireName: '',
    adressePostale: '',
    codePostal: '',
    ville: '',
    clotureExerciceDate: '',
    cloturePremierExerciceDate: '',
    dureePremierExercice: null,
  });

  const [showPreview, setShowPreview] = useState(false);

  const handleInputChange = (field: keyof Omit<StatutsData, 'dureePremierExercice'>, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRadioChange = (value: 'supérieur' | 'inférieur') => {
    setFormData(prev => ({
      ...prev,
      dureePremierExercice: value,
    }));
  };

  const generateStatuts = () => {
    const siegeSocialComplet = `${formData.adressePostale || '[adresse postale]'}, ${formData.codePostal || '[code postal]'} ${formData.ville || '[ville]'}`;
    const dateDuJour = new Date().toLocaleDateString('fr-FR');
    
    const exerciceSocialText = `L'exercice social commence le 1er septembre et se termine le 31 août de chaque année.
Par exception, le premier exercice social, débutant à la date de déclaration en préfecture, prendra fin le ${formData.cloturePremierExerciceDate || '[date de clôture du premier exercice]'}. Il aura donc une durée ${formData.dureePremierExercice || '[supérieure ou inférieure]'} à 12 mois.`;

    const statutsTemplate = `
STATUTS DE L'ASSOCIATION
${formData.associationName || "[nom de l'association]"}

TITRE I-OBJET ET COMPOSITION

Article 1 - Dénomination
Il est fondé, entre les adhérents aux présents statuts, une association régie par la loi du 1er juillet 1901 et le décret du 16 août 1901, ayant pour titre :
${formData.associationName || "[nom de l'association]"}

Article 2 - Objet
L'association a pour objet de:
- Former des jeunes, à partir de 15 ans, aux métiers techniques en associant enseignement général, enseignement professionnel et mise en situation réelle de production;
- Faciliter l'insertion professionnelle de ses élèves et stagiaires, notamment en lien avec les entreprises et acteurs économiques du territoire;
- Promouvoir la pédagogie du "faire pour apprendre", propre aux écoles de production, incluant la production réelle de biens et services destinés à des clients (entreprises, collectivités, particuliers, etc.);
- Accompagner les jeunes dans leur développement personnel, social et professionnel, en favorisant autonomie, citoyenneté, esprit d'équipe et mobilité;
- Accueillir, en fonction de ses moyens, des adultes dans le cadre de la formation continue ou de reconversion;
- Développer toute activité connexe ou complémentaire liée à la formation technique, à l'insertion ou à l'éducation.

Article 3 - Moyens d'action
Pour atteindre son objet, l'association met en œuvre notamment :
- La gestion d'établissements, d'ateliers ou de structures de formation;
- La conclusion de conventions, partenariats, ou adhésions avec tout organisme public ou privé;
- L'organisation d'actions pédagogiques, de conférences, de manifestations, d'ateliers, ou d'événements;
- La production, la vente ou la sous-traitance de biens et services réalisés dans le cadre pédagogique;
- Toute autre activité ou moyen conforme à son objet.

Article 4 - Siège social
Le siège social est fixé à ${siegeSocialComplet}.
Il peut être transféré sur simple décision du Conseil d'Administration, ratifiée à la prochaine assemblée générale.

Article 5 - Durée
La durée de l'association est illimitée.

TITRE II-COMPOSITION DE L'ASSOCIATION

Article 6 - Membres
L'association se compose de:
- Membres fondateurs: signataires des statuts ou personnes reconnues comme telles lors de l'assemblée générale constitutive;
- Membres actifs personnes participant régulièrement à la vie de l'association, à jour de leur cotisation;
- Membres d'honneur: personnes ayant rendu des services signalés à l'association, nommées par le Conseil d'Administration (CA), dispensées de cotisation;
- Membres bienfaiteurs personnes physiques ou morales soutenant financièrement ou matériellement l'association.

Article 7 - Admission
La qualité de membre s'acquiert sur demande écrite, acceptation des présents statuts et du règlement intérieur, et approbation du CA. Le CA peut refuser une admission, avec avis motivé à l'intéressé.

Article 8 - Perte de la qualité de membre
La qualité de membre se perd par :
- Démission écrite adressée au président(e);
- Décès (personne physique) ou dissolution (personne morale);
- Radiation prononcée par le CA pour motif grave, l'intéressé ayant été invité à présenter sa défense.

Article 9 - Cotisations
Le montant des cotisations est fixé chaque année par l'Assemblée Générale (AG), sur proposition du CA.

TITRE III - ADMINISTRATION ET FONCTIONNEMENT

Article 10- Conseil d'Administration
L'association est administrée par un Conseil d'Administration composé de 6 à 15 membres, élus pour 3 ans, renouvelables par tiers chaque année. Le CA choisit parmi ses membres, au scrutin secret ou à main levée, un bureau composé au minimum d'un président(e), d'un secrétaire(e), et d'un trésorier(e). Les fonctions de président et trésorier ne sont pas cumulables.

Article 11- Réunion du Conseil d'Administration
Le CA se réunit au moins deux fois par an, sur convocation du président(e) ou à la demande du tiers de ses membres. Les décisions sont prises à la majorité des membres présents ou représentés; en cas de partage, la voix du président(e) est prépondérante. Le quorum est fixé à la moitié des membres. Un membre du CA ne peut détenir plus d'une procuration.

Article 12- Pouvoirs du Conseil d'Administration
Le CA a tous pouvoirs pour l'administration de l'association, à l'exception de ceux réservés à l'AG. Il statue notamment sur :
- L'admission et la radiation des membres;
- L'embauche et la révocation du directeur(trice), s'il y a lieu;
- L'approbation du budget et des comptes;
- Les grandes orientations stratégiques;
- La modification du règlement intérieur.

Article 13 - Assemblées Générales
L'Assemblée Générale ordinaire réunit au moins une fois par an tous les membres, sur convocation du président(e). Elle entend les rapports moraux et financiers, approuve les comptes et délibère sur les questions à l'ordre du jour. Les décisions sont prises à la majorité simple des membres présents ou représentés, sauf disposition statutaire contraire.
L'Assemblée Générale extraordinaire peut être convoquée pour statuer sur la modification des statuts ou la dissolution de l'association. Elle délibère à la majorité des deux tiers.

Article 14- Procès-verbaux
Les délibérations du CA et des AG sont consignées dans des procès-verbaux signés par le président(e) et le secrétaire(e).

Article 15- Gratuité du mandat
Les fonctions d'administrateur, de membre du bureau, et plus généralement de membre, sont exercées à titre bénévole. Les frais engagés dans le cadre d'un mandat peuvent être remboursés sur justificatifs.

TITRE IV-RESSOURCES DE L'ASSOCIATION

Article 16- Ressources
Les ressources de l'association comprennent:
- Les cotisations et dons des membres;
- Les subventions publiques ou privées ;
- Les produits des activités économiques (vente, sous-traitance, etc.);
- Les revenus des biens ou capitaux propres;
- Toute autre ressource autorisée par la loi.

TITRE V-EXERCICE SOCIAL ET COMPTABILITÉ

Article 17- Exercice Social
${(formData.clotureExerciceDate || formData.cloturePremierExerciceDate || formData.dureePremierExercice) ? exerciceSocialText : "L'exercice social débute le 1er septembre et s'achève le 31 août de chaque année. Le premier exercice est clos le 31 août de l'année de sa création."}

TITRE VI-AFFILIATION, RÈGLEMENTS ET DISSOLUTION

Article 18 - Affiliation
L'association peut adhérer à toute fédération, union ou groupement par décision du CA, en particulier à la Fédération Nationale des Écoles de Production.

Article 19 - Règlement intérieur
Un règlement intérieur peut être établi par le CA, soumis à l'approbation de l'AG, pour préciser les modalités non prévues par les statuts.

Article 20- Dissolution
En cas de dissolution, prononcée par une AG extraordinaire, un ou plusieurs liquidateurs sont nommés. L'actif net est dévolu à un organisme poursuivant un but non lucratif, désigné par l'AG extraordinaire.

Fait à ${formData.ville || '[ville signature statuts]'}, le ${dateDuJour || '[date signature statuts]'}

Le Président(e):                          Le Secrétaire(e):
${formData.presidentName || '[nom prénom président(e)]'}                    ${formData.secretaireName || '[nom prénom secrétaire(e)]'}

Signature :                           Signature :
`;
    return statutsTemplate;
  };

  const downloadStatuts = () => {
    if (!formData.associationName || !formData.presidentName || !formData.secretaireName || !formData.adressePostale || !formData.codePostal || !formData.ville) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez remplir tous les champs obligatoires (nom de l'association, dirigeants et adresse complète).",
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
      adressePostale: '',
      codePostal: '',
      ville: '',
      clotureExerciceDate: '',
      cloturePremierExerciceDate: '',
      dureePremierExercice: null,
    });
    setShowPreview(false);
  };

  const isFormValid = formData.associationName && formData.presidentName && formData.secretaireName && formData.adressePostale && formData.codePostal && formData.ville;

  const docxFilePath = "/fichiers/ANNEXE 9 - MODELE DE STATUTS.docx";

  return (
    <section id="statuts-generator" className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="flex items-center gap-2 mb-6 text-3xl font-bold text-gray-800">
        <Gavel className="w-8 h-8 text-[#3C5F58]" />
        Générateur de statuts pour votre client (Association loi 1901)
      </h1>
      
      <p className="mb-4 text-lg text-gray-700 leading-relaxed">
        En tant qu'expert-comptable, vous êtes un acteur clé dans la constitution de la structure juridique de votre client. Utilisez ce modèle pour préparer les statuts de l'école de production. Il est conçu pour une association loi 1901 et s'appuie sur les recommandations de la fédération pour garantir la compatibilité avec le label et la reconnaissance d'intérêt général.
      </p>
      <p className="mb-8 text-lg text-gray-700 leading-relaxed">
        Remplissez les champs ci-dessous avec les informations du projet. Vous pourrez ensuite télécharger un fichier .txt à adapter aux spécificités du dossier avant la signature et la déclaration.
      </p>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#3C5F58]">
              <Building className="w-5 h-5" />
              informations clés de l'association
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="association-name"><span className="font-bold">nom de l'association *</span></Label>
              <Input
                id="association-name"
                value={formData.associationName}
                onChange={(e) => handleInputChange('associationName', e.target.value)}
                placeholder="Ex: École de production des artisans de demain"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="adresse-postale"><span className="font-bold">adresse postale *</span></Label>
              <Input
                id="adresse-postale"
                value={formData.adressePostale}
                onChange={(e) => handleInputChange('adressePostale', e.target.value)}
                placeholder="Ex: 123 rue de l'apprentissage"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="code-postal"><span className="font-bold">code postal *</span></Label>
              <Input
                id="code-postal"
                value={formData.codePostal}
                onChange={(e) => handleInputChange('codePostal', e.target.value)}
                placeholder="Ex: 75000"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="ville"><span className="font-bold">ville *</span></Label>
              <Input
                id="ville"
                value={formData.ville}
                onChange={(e) => handleInputChange('ville', e.target.value)}
                placeholder="Ex: Paris"
                className="mt-1"
              />
            </div>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-800 p-3 shadow-sm">
              <p className="font-semibold mb-1">objet social (pré-rempli) :</p>
              <p className="text-sm">
                L'objet social, essentiel pour une école de production, est déjà formulé pour affirmer un but éducatif et inclure l'activité lucrative accessoire. Il pourra être affiné si nécessaire.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#3C5F58]">
              <User className="w-5 h-5" />
              informations sur les dirigeants
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="president"><span className="font-bold">nom et prénom du président(e) *</span></Label>
              <Input
                id="president"
                value={formData.presidentName}
                onChange={(e) => handleInputChange('presidentName', e.target.value)}
                placeholder="Ex: Madame/Monsieur Dupont"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="secretaire"><span className="font-bold">nom et prénom du secrétaire(e) *</span></Label>
              <Input
                id="secretaire"
                value={formData.secretaireName}
                onChange={(e) => handleInputChange('secretaireName', e.target.value)}
                placeholder="Ex: Madame/Monsieur Martin"
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#3C5F58]">
              <Euro className="w-5 h-5" />
              informations financières & exercice social
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="cloture-exercice"><span className="font-bold">date de clôture d'exercice</span></Label>
              <Input
                id="cloture-exercice"
                type="text"
                value={formData.clotureExerciceDate}
                onChange={(e) => handleInputChange('clotureExerciceDate', e.target.value)}
                placeholder="Ex: 31 août"
                className="mt-1"
              />
              <p className="text-sm text-gray-500 mt-1">
                La date de clôture par défaut est le 31 août, recommandée pour les écoles de production. Si une autre date est souhaitée, l'inscrire ici.
              </p>
            </div>
            <div>
              <Label htmlFor="cloture-premier-exercice"><span className="font-bold">date de clôture du premier exercice</span></Label>
              <Input
                id="cloture-premier-exercice"
                type="text"
                value={formData.cloturePremierExerciceDate}
                onChange={(e) => handleInputChange('cloturePremierExerciceDate', e.target.value)}
                placeholder="Ex: 31 août 2025"
                className="mt-1"
              />
              <p className="text-sm text-gray-500 mt-1">
                Le premier exercice peut avoir une durée différente de 12 mois. Indiquer ici sa date de clôture.
              </p>
            </div>
            <div>
              <Label><span className="font-bold">durée du premier exercice</span></Label>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="duree-superieur"
                    name="duree-premier-exercice"
                    checked={formData.dureePremierExercice === 'supérieur'}
                    onChange={() => handleRadioChange('supérieur')}
                    className="h-4 w-4 text-[#3C5F58] focus:ring-[#3C5F58]"
                  />
                  <label htmlFor="duree-superieur" className="ml-2 text-sm text-gray-700">supérieure à 12 mois</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="duree-inferieur"
                    name="duree-premier-exercice"
                    checked={formData.dureePremierExercice === 'inférieur'}
                    onChange={() => handleRadioChange('inférieur')}
                    className="h-4 w-4 text-[#3C5F58] focus:ring-[#3C5F58]"
                  />
                  <label htmlFor="duree-inferieur" className="ml-2 text-sm text-gray-700">inférieure à 12 mois</label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="pt-4 space-y-3 mt-6">
        <Button 
          onClick={() => setShowPreview(!showPreview)}
          className="w-full bg-gray-400 text-white rounded-md hover:bg-gray-500 transition-colors py-3 px-6 text-lg"
          disabled={!isFormValid}
        >
          {showPreview ? 'Masquer l\'aperçu' : 'Aperçu des statuts'}
        </Button>
        
        <Button 
          onClick={downloadStatuts}
          className="w-full bg-[#2E5941] text-white rounded-md hover:bg-[#3C5F58] transition-colors py-3 px-6 text-lg"
          disabled={!isFormValid}
        >
          <Download className="w-4 h-4 mr-2" />
          télécharger les statuts (.txt)
        </Button>

        <a
          href={docxFilePath}
          download="ANNEXE 9 - MODELE DE STATUTS.docx"
          className="block"
        >
          <Button 
            className="w-full bg-gray-400 text-white rounded-md hover:bg-gray-500 transition-colors py-3 px-6 text-lg flex items-center gap-2"
          >
            <FileWord className="w-4 h-4" />
            télécharger le modèle à remplir (.docx)
          </Button>
        </a>
        
        <Button 
          onClick={resetForm}
          className="w-full bg-gray-400 text-white rounded-md hover:bg-gray-500 transition-colors py-3 px-6 text-lg"
        >
          réinitialiser le formulaire
        </Button>
      </div>

      {!isFormValid && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-4">
          <p className="text-sm text-yellow-800">
            <span className="font-bold">champs obligatoires :</span> veuillez renseigner le nom de l'association, les noms des dirigeants et l'adresse complète.
          </p>
        </div>
      )}

      {showPreview && isFormValid && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>aperçu des statuts générés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-lg max-h-[60vh] overflow-y-auto border border-gray-200">
              <pre className="whitespace-pre-wrap text-sm font-mono text-gray-800">
                {generateStatuts()}
              </pre>
            </div>
            <p className="text-xs text-gray-500 mt-2">
                N'oubliez pas d'adapter les sections entre crochets `[...]` avant utilisation, notamment le nombre de membres et la durée du mandat du CA.
            </p>
          </CardContent>
        </Card>
      )}

      <Card className="mt-6 shadow-sm">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4 text-[#3C5F58] flex items-center gap-2">
              <Lightbulb className="w-6 h-6 mr-2 text-[#3C5F58]" />
              points de vigilance pour la création de l'association de votre client
          </h3>
          <div className="text-base text-gray-700 space-y-3">
            <p>
              <span className="font-bold">objet social :</span> l'objet social est le cœur du projet associatif. La formule pré-remplie est adaptée aux écoles de production. Il est essentiel que l'objet statutaire affirme un but éducatif et une gestion désintéressée pour faciliter l'obtention de la reconnaissance d'intérêt général. Si le projet du client a des spécificités uniques, l'objet social devra être affiné.
            </p>
            <p>
              <span className="font-bold">ressources :</span> le modèle intègre les produits des activités économiques des élèves (vente, sous-traitance) comme une ressource de l'association. Cela est crucial pour le statut d'école de production.
            </p>
            <p>
              <span className="font-bold">déclaration :</span> une fois les statuts signés par les membres fondateurs, l'association doit être déclarée en préfecture ou sous-préfecture, ou en ligne. Votre rôle est d'accompagner votre client dans cette démarche administrative.
            </p>
            <p>
              <span className="font-bold">règlement intérieur :</span> il est fortement recommandé d'établir un règlement intérieur pour préciser les modalités de fonctionnement interne non prévues par les statuts.
            </p>
            <p className="text-sm italic text-gray-600 mt-4">
              Ce générateur fournit une trame adaptable selon le contexte local. Pour une conformité totale et adaptée à la situation spécifique du projet, notamment pour les aspects fiscaux et comptables complexes, il est vivement conseillé de consulter un expert.
            </p>
          </div>
        </CardContent>
      </Card>
      
      <div className="text-center mt-8">
        <Button
            onClick={() => navigate('accueil')}
            className="px-6 py-3 bg-[#2E5941] text-white rounded-md hover:bg-[#3C5F58] transition-colors text-lg"
        >
            retour à l'accueil
        </Button>
      </div>
    </section>
  );
};

export default StatutsGenerator;