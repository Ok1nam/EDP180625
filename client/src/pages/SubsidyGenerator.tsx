import React, { useState } from "react";
import { FileText, Download, Euro, Building, Users, Target, CalendarDays, Percent, ClipboardList, Clock, UserRound, PlusCircle, Edit, Trash2, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

// Interface pour un dossier de subvention
interface SubsidyApplication {
  id: string;
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
  mainFinancialPartnersPublic?: string;
  mainFinancialPartnersPrivate?: string;
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
  teamDescription?: string;
  premisesAndEquipment?: string;
  fundingBody: string;
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

const SubsidyGenerator: React.FC = () => {
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
    totalAmountSolicited: 0,
    projectTitle: '',
    organizationName: '',
    legalStatus: '',
    siretNumber: '',
    fundingBody: '',
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
      totalAmountSolicited: 0,
      projectTitle: '',
      organizationName: '',
      legalStatus: '',
      siretNumber: '',
      fundingBody: '',
    });
    setEditingId(null);
    setShowForm(false);
    setSelectedFundingBody('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id.replace(/-/g, '')]: value }));
  };
  
  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id.replace(/-/g, '')]: parseFloat(value) || 0 }));
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
    if (!formData.projectTitle || !formData.organizationName || !formData.totalAmountSolicited || !formData.fundingBody) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir les champs obligatoires (Nom du projet, Nom de l'organisation, Organisme financeur de la subvention, Montant sollicité).",
        variant: "destructive",
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
      fundingBody: formData.fundingBody || '',
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

  const calculateStats = () => {
    const total = applications.length;
    const deposited = applications.filter(a => a.currentStatus === 'Dossier déposé').length;
    const approved = applications.filter(a => a.currentStatus === 'Accordé / Avance reçue' || a.currentStatus === 'Clôturée / Reçue').length;
    const totalAmountSolicited = applications.reduce((sum, a) => sum + (a.totalAmountSolicited || 0), 0);
    const totalAmountObtained = applications.reduce((sum, a) => sum + (a.amountObtained || 0), 0);
    return { total, deposited, approved, totalAmountSolicited, totalAmountObtained };
  };

  const stats = calculateStats();
  
  const subventionFilePath = "/fichiers/ANNEXE 13 - DOSSIER TYPE DE DEMANDE DE SUBVENTION.docx";

  return (
    <section id="subsidy-generator" className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="flex items-center gap-3 mb-6 text-3xl font-bold text-[#3C5F58]">
        <FileText className="w-8 h-8" />
        Suivi et Génération des Dossiers de Subventions
      </h1>

      <p className="mb-8 text-lg text-gray-700 leading-relaxed">
        Cet outil vous permet de gérer de manière centralisée les dossiers de subventions, du montage initial au suivi des versements, en passant par l'envoi des justificatifs. Un tableau de bord interactif vous aide à <span className="font-bold">piloter vos ressources</span> et à assurer la <span className="font-bold">viabilité de votre modèle économique</span>.
      </p>

      {/* Bouton de téléchargement du modèle de dossier de subvention */}
      <Card className="mb-8 shadow-lg border-2 border-[#3C5F58]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-[#3C5F58] flex items-center gap-3">
            <Download className="w-6 h-6" /> Télécharger un modèle de dossier de subvention
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="text-base text-gray-800 flex-1">
            <p className="mb-2">
              Téléchargez notre modèle type de dossier de demande de subvention au format Word.
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-bold">Conseil :</span> Ce modèle est un point de départ pour organiser les informations clés avant de les transférer sur les formulaires spécifiques des organismes financeurs.
            </p>
          </div>
          <a
            href={subventionFilePath}
            download="ANNEXE_13_DOSSIER_TYPE_DE_DEMANDE_DE_SUBVENTION.docx"
            className="flex-shrink-0"
          >
            <Button className="flex items-center gap-2 py-3 px-6 text-lg bg-[#2E5941] text-white rounded-md hover:bg-[#3C5F58] transition-colors">
              <Download className="w-5 h-5" /> Télécharger le modèle
            </Button>
          </a>
        </CardContent>
      </Card>

      {showForm && (
        <Button onClick={() => setShowForm(false)} variant="ghost" className="mb-4 text-[#2E5941] hover:bg-gray-100">
          <ArrowLeft className="mr-2 w-4 h-4" /> Retour au tableau de bord
        </Button>
      )}

      {!showForm && (
        <>
          <div className="grid md:grid-cols-5 gap-4 mb-6">
            <Card className="shadow-sm">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-[#3C5F58]">{stats.total}</div>
                <div className="text-sm text-gray-600">Dossiers totaux</div>
              </CardContent>
            </Card>
            <Card className="shadow-sm">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{stats.deposited}</div>
                <div className="text-sm text-gray-600">Dossiers déposés</div>
              </CardContent>
            </Card>
            <Card className="shadow-sm">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
                <div className="text-sm text-gray-600">Dossiers acceptés</div>
              </CardContent>
            </Card>
            <Card className="shadow-sm">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-indigo-600">{stats.totalAmountSolicited.toLocaleString()} €</div>
                <div className="text-sm text-gray-600">Montant sollicité</div>
              </CardContent>
            </Card>
            <Card className="shadow-sm">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-emerald-600">{stats.totalAmountObtained.toLocaleString()} €</div>
                <div className="text-sm text-gray-600">Montant obtenu</div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-[#3C5F58]">Liste des subventions</h2>
            <Button
              onClick={() => { resetForm(); setShowForm(true); }}
              className="flex items-center gap-2 py-3 px-6 text-lg bg-[#2E5941] hover:bg-[#3C5F58] transition-colors"
            >
              <PlusCircle className="w-5 h-5" />
              Nouveau dossier
            </Button>
          </div>
        </>
      )}

      {showForm && (
        <Card className="mb-6 shadow-md">
          <CardHeader className="bg-gray-50 border-b">
            <CardTitle className="text-xl font-bold text-[#3C5F58] flex items-center gap-2">
              <FileText className="w-5 h-5 text-orange-500" />
              {editingId ? 'Modifier un dossier existant' : 'Créer un nouveau dossier'}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {/* Section 1: Informations générales sur la structure */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-bold text-[#3C5F58] mb-4">1. Informations générales sur la structure</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="organization-name" className="font-bold">Nom de la structure <span className="text-red-500">*</span></Label>
                  <Input id="organization-name" value={formData.organizationName || ''} onChange={(e) => setFormData({...formData, organizationName: e.target.value})} placeholder="Ex: Association L'École de la Réussite" />
                </div>
                <div>
                  <Label htmlFor="acronym" className="font-bold">Sigle (si applicable)</Label>
                  <Input id="acronym" value={formData.acronym || ''} onChange={(e) => setFormData({...formData, acronym: e.target.value})} />
                </div>
                <div>
                  <Label htmlFor="legal-status" className="font-bold">Statut juridique <span className="text-red-500">*</span></Label>
                  <Input id="legal-status" value={formData.legalStatus || ''} onChange={(e) => setFormData({...formData, legalStatus: e.target.value})} placeholder="Ex: Association Loi 1901" />
                </div>
                <div>
                  <Label htmlFor="creation-date" className="font-bold">Date de création de la structure</Label>
                  <Input id="creation-date" type="date" value={formData.creationDate || ''} onChange={(e) => setFormData({...formData, creationDate: e.target.value})} />
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-4 mt-4">
                <div>
                  <Label htmlFor="siret" className="font-bold">Numéro SIRET <span className="text-red-500">*</span></Label>
                  <Input id="siret" value={formData.siretNumber || ''} onChange={(e) => setFormData({...formData, siretNumber: e.target.value})} placeholder="12345678901234" />
                </div>
                <div>
                  <Label htmlFor="rna" className="font-bold">Numéro RNA</Label>
                  <Input id="rna" value={formData.rnaNumber || ''} onChange={(e) => setFormData({...formData, rnaNumber: e.target.value})} />
                </div>
                <div>
                  <Label htmlFor="uai" className="font-bold">Numéro UAI</Label>
                  <Input id="uai" value={formData.uaiNumber || ''} onChange={(e) => setFormData({...formData, uaiNumber: e.target.value})} />
                </div>
              </div>
            </div>

            {/* Section 2: Présentation de l'école de production */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-bold text-[#3C5F58] mb-4">2. Présentation de l'école de production</h3>
              <div>
                <Label htmlFor="mission-statement" className="font-bold">Mission(s) de la structure</Label>
                <Textarea id="mission-statement" value={formData.missionStatement || ''} onChange={handleInputChange} placeholder="Décrire la mission de l'école" rows={3} />
              </div>
              <div className="mt-4">
                <Label htmlFor="target-audience" className="font-bold">Public cible</Label>
                <Textarea id="target-audience" value={formData.targetAudienceDetails || ''} onChange={handleInputChange} placeholder="Qui sont les jeunes accueillis ? (Âge, niveau scolaire à l'entrée, situation sociale.)" rows={3} />
              </div>
            </div>

            {/* Section 3: Le projet spécifique objet de la demande */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-bold text-[#3C5F58] mb-4">3. Le projet spécifique objet de la demande</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fundingBody" className="font-bold">Organisme financeur de la subvention <span className="text-red-500">*</span></Label>
                  <Select
                    value={selectedFundingBody}
                    onValueChange={(value) => {
                      setSelectedFundingBody(value);
                      setFormData({...formData, fundingBody: value});
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir un organisme" />
                    </SelectTrigger>
                    <SelectContent>
                      {fundingBodies.map(body => (
                        <SelectItem key={body.name} value={body.name}>
                          {body.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="project-title" className="font-bold">Titre du projet <span className="text-red-500">*</span></Label>
                  <Input id="project-title" value={formData.projectTitle || ''} onChange={handleInputChange} placeholder="Ex: Projet d'acquisition de machines numériques" />
                </div>
              </div>
              <div className="mt-4">
                <Label className="font-bold">Objet du besoin de financement</Label>
                <div className="flex flex-wrap gap-4 mt-2">
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
            </div>

            {/* Section 4: Budget prévisionnel du projet */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-bold text-[#3C5F58] mb-4">4. Budget prévisionnel du projet</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="total-cost" className="font-bold">Coût total du projet (sur la durée du soutien) <span className="text-red-500">*</span></Label>
                  <Input id="total-cost" type="number" value={formData.totalProjectCost || ''} onChange={handleNumberInputChange} />
                </div>
                <div>
                  <Label htmlFor="total-solicited" className="font-bold">Montant total sollicité <span className="text-red-500">*</span></Label>
                  <Input id="total-solicited" type="number" value={formData.totalAmountSolicited || ''} onChange={handleNumberInputChange} />
                </div>
              </div>
            </div>

            {/* Section 5: Suivi du dossier (champs conservés et ajustés) */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-bold text-[#3C5F58] mb-4">5. Suivi du dossier</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="current-status" className="font-bold">Statut Actuel <span className="text-red-500">*</span></Label>
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
                  <Label htmlFor="internal-responsible" className="font-bold">Responsable Interne (École)</Label>
                  <Input
                    id="internal-responsible"
                    value={formData.internalResponsible || ''}
                    onChange={handleInputChange}
                    placeholder="Ex: Directeur, Responsable Administratif..."
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button onClick={resetForm} variant="outline" className="text-red-500 hover:text-red-600 border-red-500">
                Annuler
              </Button>
              <Button onClick={saveApplication} className="bg-[#2E5941] hover:bg-[#3C5F58]">
                {editingId ? 'Modifier' : 'Créer'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {!showForm && applications.length > 0 && (
        <div className="space-y-4 mt-8">
          {applications.map(app => (
            <Card key={app.id} className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-bold text-gray-800">
                  {app.fundingBody}
                </CardTitle>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(app.currentStatus)}`}>
                  {app.currentStatus}
                </span>
              </CardHeader>
              <CardContent>
                <p className="text-md font-bold text-gray-700">{app.projectTitle}</p>
                <p className="text-2xl font-bold text-blue-600 mt-2">{app.totalAmountSolicited.toLocaleString()} €</p>
                <p className="text-xs text-gray-500 mt-1">{app.organizationName}</p>
                <div className="flex space-x-2 mt-4">
                  <Button size="sm" className="bg-[#2E5941] hover:bg-[#3C5F58]" onClick={() => editApplication(app)}>
                    <Edit className="w-4 h-4 mr-2" /> Modifier
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-500 border-red-500 hover:text-red-600" onClick={() => deleteApplication(app.id)}>
                    <Trash2 className="w-4 h-4 mr-2" /> Supprimer
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!showForm && applications.length === 0 && (
        <div className="text-center text-gray-500 p-8 border-2 border-dashed rounded-lg mt-8">
          <p>Aucun dossier de subvention enregistré. <Button variant="link" onClick={() => setShowForm(true)} className="p-0 text-[#3C5F58] hover:text-[#2E5941]">Commencez-en un nouveau</Button>.</p>
        </div>
      )}
    </section>
  );
}

export default SubsidyGenerator;
