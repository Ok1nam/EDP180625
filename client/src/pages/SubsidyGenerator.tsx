import { useState } from "react";
import { FileText, Download, Euro, Building, Users, Target, CalendarDays, Percent, ClipboardList, Clock, UserRound } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useToast } from "@/hooks/use-toast";

// Nouvelle interface mise à jour pour inclure tous les champs du dossier type
interface SubsidyApplication {
  id: string;
  // Partie 1: Informations générales sur la structure
  organizationName: string;
  acronym?: string;
  legalStatus: string;
  siretNumber: string;
  rnaNumber?: string;
  schoolAddress?: string;
  legalRepresentativeName?: string;
  legalRepresentativeFunction?: string;
  contactPersonName?: string;
  contactPersonEmail?: string;
  contactPersonPhone?: string;
  creationDate?: string;
  website?: string;
  isEligibleForMecenat: boolean;
  totalProductsLastYear?: number;
  hasPreviousSupport?: boolean;
  previousSupportDetails?: string;
  accountingClosingDate?: string;
  volunteerCount?: number;
  employeeCount?: number;
  uaiNumber?: string;
  // Ces deux champs sont des champs de texte pour simplifier l'intégration du tableau
  mainFinancialPartnersPublic?: string;
  mainFinancialPartnersPrivate?: string;

  // Partie 2: Présentation de l'école de production
  missionStatement?: string;
  historyAndGenesis?: string;
  targetAudience?: string;
  targetAudienceDetails?: string;
  pedagogicalModel?: string;
  workshopsAndTrades?: string;
  diplomaPrepared?: string;
  currentStudentCount?: number;
  graduatesPerYear?: number;
  professionalInsertionRate?: string;
  territorialAnchorage?: string;
  localPartnerships?: string;
  employmentPartnerships?: string;

  // Partie 3: Le projet spécifique
  projectTitle: string;
  fundingPurpose: string[];
  contextAndJustification?: string;
  thematicAreas: string[];
  projectDescriptionSummary?: string;
  concernedDepartments?: string;
  concernedCities?: string;
  territoryCharacteristics: string[];
  beneficiaryAgeRanges: { range: string; proportion: number | null }[];
  projectDuration: string;
  projectDescriptionDetailed?: string;
  socialNeedsAnswered?: string;
  realizationsAndImpactsLastYear?: string;
  beneficiaryCountLastYear?: number;
  hoursOfSupportPerStudentLastYear?: number;
  supportDurationRequested?: string;
  concernedYears?: string;
  targetBeneficiaryCount?: number;
  targetHoursOfSupportPerStudent?: number;
  targetImpacts?: string;
  isCollaborativeProject: boolean;
  collaboratorsDetails?: string;
  projectInterlocutorName?: string;
  projectInterlocutorFunction?: string;
  projectInterlocutorEmail?: string;
  projectInterlocutorPhone?: string;
  projectInterlocutorSecondaryPhone?: string;
  mobilizedPartners?: string;
  difficulties?: string;
  desiredSupport: string[];
  synergies?: string;
  vision10Years?: string;

  // Partie 4: Budget prévisionnel
  projectBudgetYear1?: number;
  projectBudgetYear2?: number;
  projectBudgetYear3?: number;
  totalProjectCost?: number;
  fundingRequestedYear1?: number;
  fundingRequestedYear2?: number;
  fundingRequestedYear3?: number;
  totalAmountSolicited: number;
  acquiredFundingSource1?: string;
  acquiredFundingSource2?: string;
  acquiredFundingSource3?: string;
  totalAcquiredFunding?: number;

  // Partie 5: Moyens humains et matériels
  teamDescription?: string;
  premisesAndEquipment?: string;

  // Anciens champs conservés pour cohérence si besoin, à adapter
  programName?: string;
  financeurType: 'Public' | 'Privé' | 'Autres' | '';
  objectGrant?: string;
  submissionDeadline?: string;
  submissionDateActual?: string;
  amountObtained?: number;
  notificationDate?: string;
  advanceReceivedDate?: string;
  advanceReceivedAmount?: number;
  balanceReceivedDate?: string;
  balanceReceivedAmount?: number;
  totalReceivedAmount?: number;
  completionRate?: number;
  justificatifs?: string;
  justificatifsDeadline?: string;
  currentStatus:
    'À identifier' | 'En veille' | 'À préparer' | 'À déposer' |
    'Dossier déposé' | 'En instruction' | 'Accordé / Avance reçue' |
    'Refusé' | 'Clôturée / Reçue' | 'En attente de solde' | '';
  nextSteps?: string;
  internalResponsible?: string;
}

const fundingBodies = [
  { name: "Région", programs: ["Aide à la création", "Fonds formation", "Développement économique"] },
  { name: "État", programs: ["Plan de relance", "France 2030", "Fonds social européen"] },
  { name: "Europe", programs: ["FSE+", "FEDER", "Erasmus+"] },
  { name: "Pôle Emploi", programs: ["Action de formation", "POEI", "AFPR"] },
  { name: "OPCO", programs: ["Plan de développement", "Reconversion", "Alternance"] },
  { name: "Fondations", programs: ["Fondation de France", "Fondation Total", "Autres fondations"] }
];

const financeurTypes = ['Public', 'Privé', 'Autres'];

const statusOptions = [
  'À identifier',
  'En veille',
  'À préparer',
  'À déposer',
  'Dossier déposé',
  'En instruction',
  'Accordé / Avance reçue',
  'Refusé',
  'Clôturée / Reçue',
  'En attente de solde'
];

const territoryCharacteristicsOptions = [
  "Quartier politique de la ville",
  "REP/REP+",
  "Zone rurale",
  "Zone péri-urbaine",
  "Zone urbaine",
  "Cité éducative",
  "Autres"
];

const fundingPurposeOptions = [
  "Fonctionnement général de l'association",
  "Acquisition d'équipements",
  "Aménagement des locaux"
];

const thematicAreasOptions = [
  "Action en faveur de l'orientation des jeunes",
  "Formations pour les jeunes (numériques, techniques, liée à l'industrie) ou actions de formation pour les enseignants",
  "Insertion professionnelle (préparation aux stages et à l'emploi, y compris pour les réfugiés...)"
];

const projectDurations = [
  "Projet pilote sur 1 an",
  "Projet de 1 à 3 ans",
  "Projet à plus de 3 ans"
];

const desiredSupportOptions = [
  "Soutien financier",
  "Mécénat de compétences",
  "Réseau/connexions",
  "Visibilité/communication",
  "Autres"
];

const ageRanges = ["12 à 15 ans", "16 à 18 ans", "19 à 25 ans"];

export default function SubsidyGenerator() {
  const { toast } = useToast();
  const [savedData, setSavedData] = useLocalStorage<SubsidyApplication[]>('subsidy_applications', []);
  const [applications, setApplications] = useState<SubsidyApplication[]>(savedData);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<SubsidyApplication>>({
    fundingPurpose: [],
    thematicAreas: [],
    territoryCharacteristics: [],
    beneficiaryAgeRanges: ageRanges.map(range => ({ range, proportion: null })),
    desiredSupport: [],
    currentStatus: 'À identifier',
    isEligibleForMecenat: false,
    hasPreviousSupport: false,
    isCollaborativeProject: false,
  });
  const [selectedFundingBody, setSelectedFundingBody] = useState<string>('');

  const resetForm = () => {
    setFormData({
      fundingPurpose: [],
      thematicAreas: [],
      territoryCharacteristics: [],
      beneficiaryAgeRanges: ageRanges.map(range => ({ range, proportion: null })),
      desiredSupport: [],
      currentStatus: 'À identifier',
      isEligibleForMecenat: false,
      hasPreviousSupport: false,
      isCollaborativeProject: false,
    });
    setEditingId(null);
    setShowForm(false);
    setSelectedFundingBody('');
  };

  const handleCheckboxChange = (field: keyof SubsidyApplication, value: string, checked: boolean) => {
    setFormData(prev => {
      const currentValues = (prev[field] as string[] | undefined) || [];
      const updatedValues = checked
        ? [...currentValues, value]
        : currentValues.filter(v => v !== value);
      return { ...prev, [field]: updatedValues };
    });
  };

  const handleAgeRangeChange = (range: string, proportion: number | null) => {
    setFormData(prev => {
      const updatedRanges = (prev.beneficiaryAgeRanges || ageRanges.map(r => ({ range: r, proportion: null })))
        .map(item => item.range === range ? { ...item, proportion } : item);
      return { ...prev, beneficiaryAgeRanges: updatedRanges };
    });
  };

  const saveApplication = () => {
    if (!formData.projectTitle || !formData.organizationName || !formData.totalAmountSolicited) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir les champs obligatoires (Nom du projet, Nom de l'organisation, Montant sollicité).",
      });
      return;
    }

    const application: SubsidyApplication = {
      id: editingId || Date.now().toString(),
      ...formData,
      organizationName: formData.organizationName || '',
      projectTitle: formData.projectTitle || '',
      legalStatus: formData.legalStatus || '',
      siretNumber: formData.siretNumber || '',
      totalAmountSolicited: formData.totalAmountSolicited || 0,
      currentStatus: formData.currentStatus || 'À identifier',
      fundingPurpose: formData.fundingPurpose || [],
      thematicAreas: formData.thematicAreas || [],
      territoryCharacteristics: formData.territoryCharacteristics || [],
      beneficiaryAgeRanges: formData.beneficiaryAgeRanges || [],
      projectDuration: formData.projectDuration || '',
      desiredSupport: formData.desiredSupport || [],
      isEligibleForMecenat: formData.isEligibleForMecenat ?? false,
      hasPreviousSupport: formData.hasPreviousSupport ?? false,
      isCollaborativeProject: formData.isCollaborativeProject ?? false,
      financeurType: formData.financeurType || '',
    } as SubsidyApplication;

    let updatedApplications;
    if (editingId) {
      updatedApplications = applications.map(a => a.id === editingId ? application : a);
    } else {
      updatedApplications = [...applications, application];
    }

    setApplications(updatedApplications);
    setSavedData(updatedApplications);
    resetForm();

    toast({
      title: "Dossier sauvegardé",
      description: `${application.projectTitle} a été ${editingId ? 'modifié' : 'créé'} avec succès.`,
    });
  };

  const editApplication = (app: SubsidyApplication) => {
    setFormData(app);
    setEditingId(app.id);
    setSelectedFundingBody(app.fundingBody || '');
    setShowForm(true);
  };

  const deleteApplication = (id: string) => {
    const updatedApplications = applications.filter(a => a.id !== id);
    setApplications(updatedApplications);
    setSavedData(updatedApplications);

    toast({
      title: "Dossier supprimé",
      description: "Le dossier de subvention a été supprimé.",
    });
  };

  const generateDocument = (appId: string) => {
    toast({
      title: "Génération en cours",
      description: "Génération du dossier PDF en cours...",
    });
  };

  const getStatusColor = (status: SubsidyApplication['currentStatus']) => {
    const colors = {
      'À identifier': 'bg-gray-100 text-gray-800',
      'En veille': 'bg-blue-100 text-blue-800',
      'À préparer': 'bg-yellow-100 text-yellow-800',
      'À déposer': 'bg-orange-100 text-orange-800',
      'Dossier déposé': 'bg-purple-100 text-purple-800',
      'En instruction': 'bg-indigo-100 text-indigo-800',
      'Accordé / Avance reçue': 'bg-green-100 text-green-800',
      'Refusé': 'bg-red-100 text-red-800',
      'Clôturée / Reçue': 'bg-emerald-100 text-emerald-800',
      'En attente de solde': 'bg-cyan-100 text-cyan-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const calculateStats = () => {
    const total = applications.length;
    const deposited = applications.filter(a => a.currentStatus === 'Dossier déposé').length;
    const approved = applications.filter(a => a.currentStatus === 'Accordé / Avance reçue' || a.currentStatus === 'Clôturée / Reçue').length;
    const totalAmountSolicited = applications.reduce((sum, a) => sum + (a.totalAmountSolicited || 0), 0);
    const totalAmountObtained = applications.reduce((sum, a) => sum + (a.amountObtained || 0), 0);

    return { total, deposited, approved, totalAmountSolicited, totalAmountObtained };
  };

  const stats = calculateStats();

  return (
    <section id="subsidy-generator">
      <h1 className="flex items-center gap-2 mb-6 text-2xl font-bold text-gray-800">
        <FileText className="w-6 h-6" />
        Suivi et Génération des Dossiers de Subventions
      </h1>

      <p className="mb-6 text-gray-600 leading-relaxed">
        Gérez et suivez l'ensemble des dossiers de demande de subventions pour les Écoles de Production de vos clients, du montage au versement final.
      </p>

      <div className="grid md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-sm text-gray-600">Total dossiers</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.deposited}</div>
            <div className="text-sm text-gray-600">Dossiers déposés</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
            <div className="text-sm text-gray-600">Dossiers acceptés</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-indigo-600">{stats.totalAmountSolicited.toLocaleString()} €</div>
            <div className="text-sm text-gray-600">Montant sollicité</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-emerald-600">{stats.totalAmountObtained.toLocaleString()} €</div>
            <div className="text-sm text-gray-600">Montant obtenu</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Liste des subventions</h2>
        <Button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="btn-primary"
        >
          Nouvelle subvention
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{editingId ? 'Modifier' : 'Nouveau'} dossier de subvention</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Section 1: Informations générales sur la structure */}
            <h3 className="text-lg font-semibold mt-4">1. Informations générales sur la structure</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="organization-name">Nom de la structure *</Label>
                <Input id="organization-name" value={formData.organizationName || ''} onChange={(e) => setFormData({...formData, organizationName: e.target.value})} placeholder="Ex: Association L'École de la Réussite" />
              </div>
              <div>
                <Label htmlFor="acronym">Sigle (si applicable)</Label>
                <Input id="acronym" value={formData.acronym || ''} onChange={(e) => setFormData({...formData, acronym: e.target.value})} />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="legal-status">Statut juridique *</Label>
                <Input id="legal-status" value={formData.legalStatus || ''} onChange={(e) => setFormData({...formData, legalStatus: e.target.value})} placeholder="Ex: Association Loi 1901" />
              </div>
              <div>
                <Label htmlFor="creation-date">Date de création de la structure</Label>
                <Input id="creation-date" type="date" value={formData.creationDate || ''} onChange={(e) => setFormData({...formData, creationDate: e.target.value})} />
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="siret">Numéro SIRET *</Label>
                <Input id="siret" value={formData.siretNumber || ''} onChange={(e) => setFormData({...formData, siretNumber: e.target.value})} placeholder="12345678901234" />
              </div>
              <div>
                <Label htmlFor="rna">Numéro RNA</Label>
                <Input id="rna" value={formData.rnaNumber || ''} onChange={(e) => setFormData({...formData, rnaNumber: e.target.value})} />
              </div>
              <div>
                <Label htmlFor="uai">Numéro UAI</Label>
                <Input id="uai" value={formData.uaiNumber || ''} onChange={(e) => setFormData({...formData, uaiNumber: e.target.value})} />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="address-siege">Adresse du siège social</Label>
                <Input id="address-siege" value={formData.address || ''} onChange={(e) => setFormData({...formData, address: e.target.value})} />
              </div>
              <div>
                <Label htmlFor="address-locaux">Adresse des locaux de l'école</Label>
                <Input id="address-locaux" value={formData.schoolAddress || ''} onChange={(e) => setFormData({...formData, schoolAddress: e.target.value})} />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="legal-representative-name">Nom et fonction du représentant légal</Label>
                <Input id="legal-representative-name" value={formData.legalRepresentativeName || ''} onChange={(e) => setFormData({...formData, legalRepresentativeName: e.target.value})} placeholder="Nom Prénom, Fonction" />
              </div>
              <div>
                <Label htmlFor="website">Site internet de la structure</Label>
                <Input id="website" value={formData.website || ''} onChange={(e) => setFormData({...formData, website: e.target.value})} />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="mecenat"
                checked={formData.isEligibleForMecenat}
                onCheckedChange={(checked) => setFormData({...formData, isEligibleForMecenat: checked as boolean})}
              />
              <Label htmlFor="mecenat">Éligibilité au mécénat au sens de l'article 238 bis du code général des Impôts ?</Label>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="total-products">Total des produits (dernier exercice clos)</Label>
                <Input id="total-products" type="number" value={formData.totalProductsLastYear || ''} onChange={(e) => setFormData({...formData, totalProductsLastYear: parseFloat(e.target.value) || 0})} />
              </div>
              <div>
                <Label htmlFor="volunteer-count">Nombre de bénévoles (dernier exercice clos)</Label>
                <Input id="volunteer-count" type="number" value={formData.volunteerCount || ''} onChange={(e) => setFormData({...formData, volunteerCount: parseInt(e.target.value) || 0})} />
              </div>
              <div>
                <Label htmlFor="employee-count">Nombre de salariés (dernier exercice clos)</Label>
                <Input id="employee-count" type="number" value={formData.employeeCount || ''} onChange={(e) => setFormData({...formData, employeeCount: parseInt(e.target.value) || 0})} />
              </div>
            </div>
            <div>
              <Label htmlFor="financial-partners-public">Principaux partenaires financiers publics</Label>
              <Textarea id="financial-partners-public" value={formData.mainFinancialPartnersPublic || ''} onChange={(e) => setFormData({...formData, mainFinancialPartnersPublic: e.target.value})} placeholder="Nom de l'acteur, Type d'acteur, % dans le budget total" rows={3} />
            </div>
            <div>
              <Label htmlFor="financial-partners-private">Principaux partenaires financiers privés</Label>
              <Textarea id="financial-partners-private" value={formData.mainFinancialPartnersPrivate || ''} onChange={(e) => setFormData({...formData, mainFinancialPartnersPrivate: e.target.value})} placeholder="Nom de l'acteur, Type d'acteur, % dans le budget total" rows={3} />
            </div>

            {/* Section 2: Présentation de l'école de production */}
            <h3 className="text-lg font-semibold mt-4">2. Présentation de l'école de production</h3>
            <div>
              <Label htmlFor="mission-statement">Mission(s) de la structure</Label>
              <Textarea id="mission-statement" value={formData.missionStatement || ''} onChange={(e) => setFormData({...formData, missionStatement: e.target.value})} placeholder="Décrire la mission de l'école" rows={3} />
            </div>
            <div>
              <Label htmlFor="history-genesis">Historique et genèse</Label>
              <Textarea id="history-genesis" value={formData.historyAndGenesis || ''} onChange={(e) => setFormData({...formData, historyAndGenesis: e.target.value})} placeholder="Quand et comment l'école a-t-elle été créée ?" rows={3} />
            </div>
            <div>
              <Label htmlFor="target-audience">Public cible</Label>
              <Textarea id="target-audience" value={formData.targetAudienceDetails || ''} onChange={(e) => setFormData({...formData, targetAudienceDetails: e.target.value})} placeholder="Qui sont les jeunes accueillis ? (Âge, niveau scolaire à l'entrée, situation sociale.)" rows={3} />
            </div>

            {/* Section 3: Le projet spécifique */}
            <h3 className="text-lg font-semibold mt-4">3. Le projet spécifique objet de la demande</h3>
            <div>
              <Label htmlFor="project-title">Titre du projet *</Label>
              <Input id="project-title" value={formData.projectTitle || ''} onChange={(e) => setFormData({...formData, projectTitle: e.target.value})} placeholder="Ex: Projet d'acquisition de machines numériques" />
            </div>
            <div>
              <Label>Objet du besoin de financement</Label>
              <div className="flex flex-col space-y-2 mt-2">
                {fundingPurposeOptions.map(option => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      id={`funding-purpose-${option}`}
                      checked={formData.fundingPurpose?.includes(option)}
                      onCheckedChange={(checked) => handleCheckboxChange('fundingPurpose', option, checked as boolean)}
                    />
                    <Label htmlFor={`funding-purpose-${option}`}>{option}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="project-description-summary">Descriptif synthétique du projet (max 1000 caractères)</Label>
              <Textarea id="project-description-summary" value={formData.projectDescriptionSummary || ''} onChange={(e) => setFormData({...formData, projectDescriptionSummary: e.target.value})} rows={4} maxLength={1000} />
            </div>
            <div>
              <Label>Thématique principale adressée par le projet</Label>
              <div className="flex flex-col space-y-2 mt-2">
                {thematicAreasOptions.map(option => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      id={`thematic-area-${option}`}
                      checked={formData.thematicAreas?.includes(option)}
                      onCheckedChange={(checked) => handleCheckboxChange('thematicAreas', option, checked as boolean)}
                    />
                    <Label htmlFor={`thematic-area-${option}`}>{option}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Durée du projet</Label>
                <Select
                  value={formData.projectDuration || ''}
                  onValueChange={(value) => setFormData({...formData, projectDuration: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir la durée" />
                  </SelectTrigger>
                  <SelectContent>
                    {projectDurations.map(duration => (
                      <SelectItem key={duration} value={duration}>
                        {duration}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="support-duration">Durée du soutien demandé (ex: 24 mois)</Label>
                <Input id="support-duration" value={formData.supportDurationRequested || ''} onChange={(e) => setFormData({...formData, supportDurationRequested: e.target.value})} />
              </div>
            </div>
            <div>
              <Label htmlFor="detailed-description">Descriptif détaillé du projet (max 2500 caractères)</Label>
              <Textarea id="detailed-description" value={formData.projectDescriptionDetailed || ''} onChange={(e) => setFormData({...formData, projectDescriptionDetailed: e.target.value})} rows={6} maxLength={2500} />
            </div>
            <div>
              <Label>Soutien souhaité du partenaire</Label>
              <div className="flex flex-col space-y-2 mt-2">
                {desiredSupportOptions.map(option => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      id={`desired-support-${option}`}
                      checked={formData.desiredSupport?.includes(option)}
                      onCheckedChange={(checked) => handleCheckboxChange('desiredSupport', option, checked as boolean)}
                    />
                    <Label htmlFor={`desired-support-${option}`}>{option}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Section 4: Budget prévisionnel du projet */}
            <h3 className="text-lg font-semibold mt-4">4. Budget prévisionnel du projet</h3>
            <p className="text-sm text-gray-500">
              Note: Le détail du budget prévisionnel des 3 années est à joindre au dossier.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="budget-an1">Année 1 (€)</Label>
                <Input id="budget-an1" type="number" value={formData.projectBudgetYear1 || ''} onChange={(e) => setFormData({...formData, projectBudgetYear1: parseFloat(e.target.value) || 0})} />
              </div>
              <div>
                <Label htmlFor="budget-an2">Année 2 (€)</Label>
                <Input id="budget-an2" type="number" value={formData.projectBudgetYear2 || ''} onChange={(e) => setFormData({...formData, projectBudgetYear2: parseFloat(e.target.value) || 0})} />
              </div>
              <div>
                <Label htmlFor="budget-an3">Année 3 (€)</Label>
                <Input id="budget-an3" type="number" value={formData.projectBudgetYear3 || ''} onChange={(e) => setFormData({...formData, projectBudgetYear3: parseFloat(e.target.value) || 0})} />
              </div>
            </div>
            <div>
              <Label htmlFor="total-cost">Coût total du projet (sur la durée du soutien) *</Label>
              <Input id="total-cost" type="number" value={formData.totalProjectCost || ''} onChange={(e) => setFormData({...formData, totalProjectCost: parseFloat(e.target.value) || 0})} />
            </div>
            <div>
              <Label htmlFor="total-solicited">Montant total sollicité *</Label>
              <Input id="total-solicited" type="number" value={formData.totalAmountSolicited || ''} onChange={(e) => setFormData({...formData, totalAmountSolicited: parseFloat(e.target.value) || 0})} />
            </div>

            {/* Section 5: Moyens humains et matériels de l'école */}
            <h3 className="text-lg font-semibold mt-4">5. Moyens humains et matériels de l'école</h3>
            <div>
              <Label htmlFor="team-description">Équipe pédagogique et administrative</Label>
              <Textarea id="team-description" value={formData.teamDescription || ''} onChange={(e) => setFormData({...formData, teamDescription: e.target.value})} placeholder="Organigramme simplifié, nombre de formateurs..." rows={3} />
            </div>
            <div>
              <Label htmlFor="premises-equipment">Locaux et équipements généraux</Label>
              <Textarea id="premises-equipment" value={formData.premisesAndEquipment || ''} onChange={(e) => setFormData({...formData, premisesAndEquipment: e.target.value})} placeholder="Description des ateliers, salles de cours, équipements..." rows={3} />
            </div>

            {/* Anciens champs de suivi, déplacés ici */}
            <h3 className="text-lg font-semibold mt-4">Suivi du dossier</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="current-status">Statut Actuel *</Label>
                <Select
                  value={formData.currentStatus || ''}
                  onValueChange={(value) => setFormData({...formData, currentStatus: value as any})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner le statut" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map(status => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="internal-responsible">Responsable Interne (École)</Label>
                <Input
                  id="internal-responsible"
                  value={formData.internalResponsible || ''}
                  onChange={(e) => setFormData({...formData, internalResponsible: e.target.value})}
                  placeholder="Ex: Directeur, Responsable Administratif..."
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Button onClick={saveApplication} className="btn-primary">
                {editingId ? 'Modifier' : 'Créer'}
              </Button>
              <Button onClick={resetForm} className="btn-secondary">
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {!showForm && applications.length > 0 && (
        <div className="space-y-4">
          {applications.map(app => (
            <Card key={app.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {app.projectTitle}
                </CardTitle>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(app.currentStatus)}`}>
                  {app.currentStatus}
                </span>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{app.totalAmountSolicited.toLocaleString()} €</div>
                <p className="text-xs text-gray-500">{app.organizationName} - {app.legalStatus}</p>
                <div className="flex space-x-2 mt-4">
                  <Button size="sm" onClick={() => editApplication(app)}>Modifier</Button>
                  <Button size="sm" variant="destructive" onClick={() => deleteApplication(app.id)}>Supprimer</Button>
                  <Button size="sm" variant="outline" onClick={() => generateDocument(app.id)}>
                    <Download className="w-4 h-4 mr-2" />Générer
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!showForm && applications.length === 0 && (
        <div className="text-center text-gray-500 p-8 border-2 border-dashed rounded-lg">
          <p>Aucun dossier de subvention enregistré. <Button variant="link" onClick={() => setShowForm(true)} className="p-0 text-blue-600">Commencez-en un nouveau</Button>.</p>
        </div>
      )}
    </section>
  );
}