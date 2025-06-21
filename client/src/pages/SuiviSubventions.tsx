import { useState } from "react";
import { FileText, Download, Euro, Building, Users, Target, CalendarDays, Percent, ClipboardList, Clock, UserRound, FileDown, File } from "lucide-react"; // FileExcel remplacé par File
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useToast } from "@/hooks/use-toast";

// Mise à jour de l'interface SubsidyApplication pour retirer les champs
interface SubsidyApplication {
  id: string;
  programName: string; // Nom de la Subvention / Appel à Projets
  organizationName: string; // Nom de l'organisme demandeur (gardé pour l'export, mais pas dans le formulaire)

  financeurType: 'Public' | 'Privé' | ''; // Type de financeur
  objectGrant: string; // Objet de la Subvention
  submissionDeadline: string; // Date Limite de Dépôt
  submissionDateActual: string; // Date Dépôt Dossier
  amountSolicited: number; // Montant Sollicité (€)
  amountObtained: number; // Montant Obtenu (€)
  notificationDate: string; // Date Notification (Accord/Refus)
  advanceReceivedDate: string; // Date Réception Avance (€)
  advanceReceivedAmount: number; // Montant de l'avance reçue
  balanceReceivedDate: string; // Date Réception Solde (€)
  balanceReceivedAmount: number; // Montant du solde reçu
  totalReceivedAmount: number; // Montant Total Reçu (€)
  completionRate: number; // Taux de Réalisation (%)
  justificatifs: string; // Justificatifs à Fournir
  justificatifsDeadline: string; // Date Limite Justificatifs
  currentStatus:
    'À préparer' | 'À déposer' |
    'Dossier déposé' | 'En instruction' | 'Accordé / Avance reçue' |
    'Refusé' | 'Clôturée / Reçue' | 'En attente de solde' | ''; // Statuts mis à jour
  nextSteps: string; // Prochaines Étapes / Notes CA
  internalResponsible: string; // Responsable Interne

  fundingBody: string; // Organisme Financeur
  projectTitle: string; // ID / Nom unique pour identifier la subvention.
  projectDescription: string; // Gardé pour l'export, mais pas dans le formulaire

  // Les champs suivants sont retirés du formulaire, mais peuvent être gardés dans l'interface si vous comptez les exporter
  // (même s'ils sont vides dans le formulaire du site) ou s'ils sont peuplés par d'autres moyens.
  // Pour la clarté, je les retire aussi de l'interface SubsidyApplication pour vraiment les supprimer.
  // Si vous voulez les garder pour l'export avec des valeurs vides, remettez-les ici.
  // siretNumber: string;
  // contactPerson: string;
  // email: string;
  // phone: string;
  // address: string;
  // targetAudience: string;
  // expectedStudents: number;
  // sectors: string[];
  // projectDuration: number;
  // startDate: string;
  // objectives: string;
  // methodology: string;
  // partnerOrganizations: string;
  // budget: {
  //   personnel: number;
  //   equipment: number;
  //   operations: number;
  //   other: number;
  // };
  // expectedOutcomes: string;
  // evaluationCriteria: string;
  // sustainability: string;
  // innovation: string;
  // socialImpact: string;
}

const fundingBodies = [
  { name: "Région", programs: ["Aide à la création", "Fonds formation", "Développement économique"] },
  { name: "État", programs: ["Plan de relance", "France 2030", "Fonds social européen"] },
  { name: "Europe", programs: ["FSE+", "FEDER", "Erasmus+"] },
  { name: "Pôle Emploi", programs: ["Action de formation", "POEI", "AFPR"] },
  { name: "OPCO", programs: ["Plan de développement", "Reconversion", "Alternance"] },
  { name: "Fondations", programs: ["Fondation de France", "Fondation Total", "Autres fondations"] }
];

const financeurTypes = ['Public', 'Privé'];

// Statuts mis à jour (sans "À identifier" et "En veille")
const statusOptions = [
  'À préparer',
  'À déposer',
  'Dossier déposé',
  'En instruction',
  'Accordé / Avance reçue',
  'Refusé',
  'Clôturée / Reçue',
  'En attente de solde'
];

export default function SuiviSubvention() {
  const { toast } = useToast();
  const [savedData, setSavedData] = useLocalStorage<SubsidyApplication[]>('subsidy_applications', []);
  const [applications, setApplications] = useState<SubsidyApplication[]>(savedData);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<SubsidyApplication>>({});
  const [selectedFundingBody, setSelectedFundingBody] = useState<string>('');

  useState(() => {
    const totalReceived = (formData.advanceReceivedAmount || 0) + (formData.balanceReceivedAmount || 0);
    const completion = formData.amountObtained > 0 ? (totalReceived / formData.amountObtained) * 100 : 0;

    if (formData.totalReceivedAmount !== totalReceived || formData.completionRate !== completion) {
      setFormData(prev => ({
        ...prev,
        totalReceivedAmount: parseFloat(totalReceived.toFixed(2)),
        completionRate: parseFloat(completion.toFixed(2))
      }));
    }
  }, [formData.advanceReceivedAmount, formData.balanceReceivedAmount, formData.amountObtained]);


  const resetForm = () => {
    setFormData({
      // Pas de budget, secteurs etc. car retirés de l'interface
      amountSolicited: 0,
      amountObtained: 0,
      advanceReceivedAmount: 0,
      balanceReceivedAmount: 0,
      totalReceivedAmount: 0,
      completionRate: 0,
      currentStatus: 'À préparer', // Nouveau statut par défaut le plus précoce
      financeurType: '',
      objectGrant: '',
      submissionDeadline: '',
      submissionDateActual: '',
      notificationDate: '',
      advanceReceivedDate: '',
      advanceReceivedAmount: 0,
      balanceReceivedDate: '',
      balanceReceivedAmount: 0,
      justificatifs: '',
      justificatifsDeadline: '',
      nextSteps: '',
      internalResponsible: '',
      organizationName: '', // Gardé pour la sauvegarde/export
      projectDescription: '' // Gardé pour la sauvegarde/export
    });
    setEditingId(null);
    setShowForm(false);
    setSelectedFundingBody('');
  };

  const saveApplication = () => {
    if (!formData.projectTitle || !formData.fundingBody || !formData.amountSolicited || !formData.currentStatus) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir les champs obligatoires (Nom de la Subvention, Organisme financeur, Montant Sollicité, Statut Actuel).",
      });
      return;
    }

    const application: SubsidyApplication = {
      id: editingId || Date.now().toString(),
      programName: formData.programName || '',
      organizationName: formData.organizationName || '', // Toujours inclus même si non dans le form

      financeurType: formData.financeurType || '',
      objectGrant: formData.objectGrant || '',
      submissionDeadline: formData.submissionDeadline || '',
      submissionDateActual: formData.submissionDateActual || '',
      amountSolicited: formData.amountSolicited || 0,
      amountObtained: formData.amountObtained || 0,
      notificationDate: formData.notificationDate || '',
      advanceReceivedDate: formData.advanceReceivedDate || '',
      advanceReceivedAmount: formData.advanceReceivedAmount || 0,
      balanceReceivedDate: formData.balanceReceivedDate || '',
      balanceReceivedAmount: formData.balanceReceivedAmount || 0,
      totalReceivedAmount: formData.totalReceivedAmount || 0,
      completionRate: formData.completionRate || 0,
      justificatifs: formData.justificatifs || '',
      justificatifsDeadline: formData.justificatifsDeadline || '',
      currentStatus: formData.currentStatus || 'À préparer',
      nextSteps: formData.nextSteps || '',
      internalResponsible: formData.internalResponsible || '',

      fundingBody: formData.fundingBody || '',
      projectTitle: formData.projectTitle || '',
      projectDescription: formData.projectDescription || '', // Toujours inclus même si non dans le form

      // Les champs suivants sont explicitement exclus de la sauvegarde si retirés de l'interface
      // Vous devrez ajuster si vous les voulez dans l'export avec des valeurs vides par défaut
      // siretNumber: '', contactPerson: '', email: '', phone: '', address: '',
      // targetAudience: '', expectedStudents: 0, sectors: [], projectDuration: 0,
      // startDate: '', objectives: '', methodology: '', partnerOrganizations: '',
      // budget: { personnel: 0, equipment: 0, operations: 0, other: 0 },
      // expectedOutcomes: '', evaluationCriteria: '', sustainability: '', innovation: '', socialImpact: ''
    };

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
    setSelectedFundingBody(app.fundingBody);
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
    // FUTURE: Implémenter ici la logique de génération PDF détaillée (librairie, etc.)
  };

  // --- NOUVELLE FONCTION POUR L'EXPORT CSV ---
  const exportToCSV = () => {
    if (applications.length === 0) {
      toast({
        title: "Export impossible",
        description: "Aucun dossier de subvention à exporter.",
        variant: "destructive"
      });
      return;
    }

    // Définir les en-têtes (colonnes) du fichier CSV, correspondant à votre modèle Excel
    // L'ordre est important ici pour correspondre à votre tableau
    // J'ai inclus TOUS les champs de l'interface SubsidyApplication pour l'export, même ceux non visibles dans le formulaire simplifié,
    // car ils sont potentiellement des colonnes de votre modèle Excel complet.
    const headers = [
      "ID Subvention", // projectTitle est utilisé comme ID unique pour l'export
      "Organisme Financeur",
      "Type de Financeur",
      "Nom du Programme",
      "Objet de la Subvention",
      "Date Limite de Dépôt",
      "Date Dépôt Dossier",
      "Montant Sollicité (€)",
      "Montant Obtenu (€)",
      "Date Notification (Accord/Refus)",
      "Date Réception Avance (€)",
      "Montant Avance (€)",
      "Date Réception Solde (€)",
      "Montant Solde (€)",
      "Montant Total Reçu (€)",
      "Taux de Réalisation (%)",
      "Justificatifs à Fournir",
      "Date Limite Justificatifs",
      "Statut Actuel",
      "Prochaines Étapes / Notes CA",
      "Responsable Interne (École)",
      // Rubriques retirées de l'input form, mais gardées dans l'export si elles existent dans l'interface
      "Nom de l'Organisation", // Gardé pour l'export
      "Description du Projet", // Gardé pour l'export
      "Numéro SIRET",
      "Personne de Contact",
      "Email de Contact",
      "Téléphone de Contact",
      "Adresse de l'Organisation",
      "Public Cible",
      "Étudiants Visés",
      "Secteurs",
      "Durée Projet (mois)",
      "Date Début Projet",
      "Objectifs du Projet",
      "Méthodologie",
      "Organisations Partenaires",
      "Budget Personnel (€)",
      "Budget Équipements (€)",
      "Budget Fonctionnement (€)",
      "Budget Autres (€)",
      "Résultats Attendus",
      "Critères d'Évaluation",
      "Pérennité",
      "Innovation",
      "Impact Social"
    ];

    // Mapper les données des applications à l'ordre des en-têtes
    const rows = applications.map(app => [
      `"${app.projectTitle.replace(/"/g, '""')}"`,
      `"${app.fundingBody.replace(/"/g, '""')}"`,
      `"${app.financeurType.replace(/"/g, '""')}"`,
      `"${app.programName.replace(/"/g, '""')}"`,
      `"${app.objectGrant.replace(/"/g, '""')}"`,
      app.submissionDeadline,
      app.submissionDateActual,
      app.amountSolicited,
      app.amountObtained,
      app.notificationDate,
      app.advanceReceivedDate,
      app.advanceReceivedAmount,
      app.balanceReceivedDate,
      app.balanceReceivedAmount,
      app.totalReceivedAmount,
      app.completionRate,
      `"${app.justificatifs.replace(/"/g, '""')}"`,
      app.justificatifsDeadline,
      `"${app.currentStatus.replace(/"/g, '""')}"`,
      `"${app.nextSteps.replace(/"/g, '""')}"`,
      `"${app.internalResponsible.replace(/"/g, '""')}"`,

      // Valeurs pour les champs retirés du formulaire mais potentiellement présents dans l'export
      `"${(app as any).organizationName ? (app as any).organizationName.replace(/"/g, '""') : ''}"`,
      `"${(app as any).projectDescription ? (app as any).projectDescription.replace(/"/g, '""') : ''}"`,
      `"${(app as any).siretNumber ? (app as any).siretNumber.replace(/"/g, '""') : ''}"`,
      `"${(app as any).contactPerson ? (app as any).contactPerson.replace(/"/g, '""') : ''}"`,
      `"${(app as any).email ? (app as any).email.replace(/"/g, '""') : ''}"`,
      `"${(app as any).phone ? (app as any).phone.replace(/"/g, '""') : ''}"`,
      `"${(app as any).address ? (app as any).address.replace(/"/g, '""') : ''}"`,
      `"${(app as any).targetAudience ? (app as any).targetAudience.replace(/"/g, '""') : ''}"`,
      (app as any).expectedStudents || 0,
      `"${(app as any).sectors && (app as any).sectors.length > 0 ? (app as any).sectors.join(', ').replace(/"/g, '""') : ''}"`,
      (app as any).projectDuration || 0,
      (app as any).startDate || '',
      `"${(app as any).objectives ? (app as any).objectives.replace(/"/g, '""') : ''}"`,
      `"${(app as any).methodology ? (app as any).methodology.replace(/"/g, '""') : ''}"`,
      `"${(app as any).partnerOrganizations ? (app as any).partnerOrganizations.replace(/"/g, '""') : ''}"`,
      (app as any).budget?.personnel || 0,
      (app as any).budget?.equipment || 0,
      (app as any).budget?.operations || 0,
      (app as any).budget?.other || 0,
      `"${(app as any).expectedOutcomes ? (app as any).expectedOutcomes.replace(/"/g, '""') : ''}"`,
      `"${(app as any).evaluationCriteria ? (app as any).evaluationCriteria.replace(/"/g, '""') : ''}"`,
      `"${(app as any).sustainability ? (app as any).sustainability.replace(/"/g, '""') : ''}"`,
      `"${(app as any).innovation ? (app as any).innovation.replace(/"/g, '""') : ''}"`,
      `"${(app as any).socialImpact ? (app as any).socialImpact.replace(/"/g, '""') : ''}"`
    ]);

    const csvContent = [
      headers.join(';'),
      ...rows.map(row => row.join(';'))
    ].join('\n');

    const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csvContent], { type: 'text/csv;charset=utf-8-bom;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `suivi_subventions_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Export CSV",
      description: "Le fichier CSV a été généré et téléchargé.",
    });
  };
  // --- FIN DE LA NOUVELLE FONCTION POUR L'EXPORT CSV ---

  // --- NOUVELLE FONCTION POUR TÉLÉCHARGER LE MODÈLE EXCEL VIERGE ---
  const downloadExcelTemplate = () => {
    // Les en-têtes du fichier Excel modèle doivent correspondre exactement aux colonnes que vous voulez
    // dans votre modèle vierge. Ce sont les mêmes que les headers CSV.
    const headers = [
      "ID Subvention",
      "Organisme Financeur",
      "Type de Financeur",
      "Nom du Programme",
      "Objet de la Subvention",
      "Date Limite de Dépôt",
      "Date Dépôt Dossier",
      "Montant Sollicité (€)",
      "Montant Obtenu (€)",
      "Date Notification (Accord/Refus)",
      "Date Réception Avance (€)",
      "Montant Avance (€)",
      "Date Réception Solde (€)",
      "Montant Solde (€)",
      "Montant Total Reçu (€)",
      "Taux de Réalisation (%)",
      "Justificatifs à Fournir",
      "Date Limite Justificatifs",
      "Statut Actuel",
      "Prochaines Étapes / Notes CA",
      "Responsable Interne (École)",
      "Nom de l'Organisation",
      "Description du Projet",
      "Numéro SIRET",
      "Personne de Contact",
      "Email de Contact",
      "Téléphone de Contact",
      "Adresse de l'Organisation",
      "Public Cible",
      "Étudiants Visés",
      "Secteurs",
      "Durée Projet (mois)",
      "Date Début Projet",
      "Objectifs du Projet",
      "Méthodologie",
      "Organisations Partenaires",
      "Budget Personnel (€)",
      "Budget Équipements (€)",
      "Budget Fonctionnement (€)",
      "Budget Autres (€)",
      "Résultats Attendus",
      "Critères d'Évaluation",
      "Pérennité",
      "Innovation",
      "Impact Social"
    ];

    const csvContent = new Uint8Array([0xEF, 0xBB, 0xBF]) + headers.join(';'); // Juste les headers, avec BOM

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8-bom;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `modele_suivi_subventions.csv`; // Nom du fichier modèle
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Téléchargement Modèle",
      description: "Le modèle Excel a été téléchargé.",
    });
  };
  // --- FIN DE LA NOUVELLE FONCTION POUR TÉLÉCHARGER LE MODÈLE EXCEL VIERGE ---

  const calculateTotalBudget = () => {
    // Ce calcul n'est plus pertinent si le budget est retiré du formulaire
    return 0; // Ou vous pouvez laisser le champ budget si c'est seulement la visualisation qui est retirée
  };

  const getStatusColor = (status: SubsidyApplication['currentStatus']) => {
    const colors = {
      'À préparer': 'bg-yellow-100 text-yellow-800',
      'À déposer': 'bg-orange-100 text-orange-800',
      'Dossier déposé': 'bg-purple-100 text-purple-800',
      'En instruction': 'bg-indigo-100 text-indigo-800',
      'Accordé / Avance reçue': 'bg-green-100 text-green-800',
      'Refusé': 'bg-red-100 text-red-800',
      'Clôturée / Reçue': 'bg-emerald-100 text-emerald-800',
      'En attente de solde': 'bg-cyan-100 text-cyan-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800'; // Fallback au cas où
  };

  const calculateStats = () => {
    const total = applications.length;
    const deposited = applications.filter(a => a.currentStatus === 'Dossier déposé').length;
    const approved = applications.filter(a => a.currentStatus === 'Accordé / Avance reçue' || a.currentStatus === 'Clôturée / Reçue').length;
    const totalAmountSolicited = applications.reduce((sum, a) => sum + a.amountSolicited, 0);
    const totalAmountObtained = applications.reduce((sum, a) => sum + a.amountObtained, 0);

    return { total, deposited, approved, totalAmountSolicited, totalAmountObtained };
  };

  const stats = calculateStats();

  return (
    <section id="subsidy-generator">
      <h1 className="flex items-center gap-2 mb-6 text-2xl font-bold text-gray-800">
        <FileText className="w-6 h-6" />
        Suivi des Dossiers de Subventions
      </h1>

      {/* Texte d'explication */}
      <div className="bg-blue-50 border-l-4 border-blue-200 text-blue-800 p-4 mb-6" role="alert">
        <h3 className="font-semibold text-lg mb-2">Bienvenue sur votre outil de suivi des subventions !</h3>
        <p className="text-sm leading-relaxed">
          En tant qu'expert-comptable, vous avez deux options pour gérer les subventions de vos clients :
        </p>
        <ul className="list-disc list-inside text-sm mt-2 space-y-1">
          <li>
            **Option 1 : Suivi sur le site.** Remplissez et mettez à jour les informations des subventions directement via le formulaire ci-dessous. Vous pourrez exporter toutes les données au format CSV à tout moment pour les analyser ou les intégrer à vos outils.
          </li>
          <li>
            **Option 2 : Travailler sur Excel.** Téléchargez le modèle Excel vierge que nous mettons à votre disposition. Remplissez-le à votre convenance, puis copiez/collez les données dans le site si vous souhaitez les visualiser ici plus tard (cette fonctionnalité d'import n'est pas encore développée, mais elle peut l'être si besoin).
          </li>
        </ul>
        <div className="flex mt-4">
            <Button
                onClick={downloadExcelTemplate}
                className="btn-secondary text-sm"
            >
                <File className="w-4 h-4 mr-2" /> {/* Icône File utilisée ici */}
                Télécharger le modèle Excel
            </Button>
        </div>
      </div>

      {/* Statistiques adaptées */}
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
        <div className="flex gap-3">
            <Button
                onClick={exportToCSV}
                className="btn-secondary"
                disabled={applications.length === 0}
            >
                <FileDown className="w-4 h-4 mr-2" />
                Exporter CSV
            </Button>
            <Button
                onClick={() => { resetForm(); setShowForm(true); }}
                className="btn-primary"
            >
                Nouvelle subvention
            </Button>
        </div>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{editingId ? 'Modifier' : 'Nouveau'} dossier de subvention</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* ID / Nom de la Subvention / Appel à Projets */}
            <div>
              <Label htmlFor="project-title">Nom de la Subvention / Appel à Projets *</Label>
              <Input
                id="project-title"
                value={formData.projectTitle || ''}
                onChange={(e) => setFormData({...formData, projectTitle: e.target.value})}
                placeholder="Ex: Aide à la création d'entreprise 2025"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Organisme Financeur */}
              <div>
                <Label>Organisme financeur *</Label>
                <Select
                  value={selectedFundingBody}
                  onValueChange={(value) => {
                    setSelectedFundingBody(value);
                    setFormData({...formData, fundingBody: value, programName: ''});
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
              {/* Type de financeur */}
              <div>
                <Label>Type de financeur *</Label>
                <Select
                  value={formData.financeurType || ''}
                  onValueChange={(value) => setFormData({...formData, financeurType: value as any})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir un type" />
                  </SelectTrigger>
                  <SelectContent>
                    {financeurTypes.map(type => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Programme de financement et Objet de la Subvention */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="program-name">Nom du programme (si applicable)</Label>
                <Select
                  value={formData.programName || ''}
                  onValueChange={(value) => setFormData({...formData, programName: value})}
                  disabled={!selectedFundingBody}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir un programme" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedFundingBody && fundingBodies
                      .find(body => body.name === selectedFundingBody)
                      ?.programs.map(program => (
                        <SelectItem key={program} value={program}>
                          {program}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="object-grant">Objet de la Subvention</Label>
                <Input
                  id="object-grant"
                  value={formData.objectGrant || ''}
                  onChange={(e) => setFormData({...formData, objectGrant: e.target.value})}
                  placeholder="Ex: Financement d'équipements pédagogiques"
                />
              </div>
            </div>

            {/* Montant Sollicité et Montant Obtenu */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="amount-solicited">Montant Sollicité (€) *</Label>
                <Input
                  id="amount-solicited"
                  type="number"
                  value={formData.amountSolicited || 0}
                  onChange={(e) => setFormData({...formData, amountSolicited: parseFloat(e.target.value) || 0})}
                  placeholder="50000"
                />
              </div>
              <div>
                <Label htmlFor="amount-obtained">Montant Obtenu (€)</Label>
                <Input
                  id="amount-obtained"
                  type="number"
                  value={formData.amountObtained || 0}
                  onChange={(e) => setFormData({...formData, amountObtained: parseFloat(e.target.value) || 0})}
                  placeholder="45000"
                />
              </div>
            </div>

            {/* Dates importantes */}
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="submission-deadline">Date Limite de Dépôt</Label>
                <Input
                  id="submission-deadline"
                  type="date"
                  value={formData.submissionDeadline || ''}
                  onChange={(e) => setFormData({...formData, submissionDeadline: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="submission-date-actual">Date Dépôt Dossier</Label>
                <Input
                  id="submission-date-actual"
                  type="date"
                  value={formData.submissionDateActual || ''}
                  onChange={(e) => setFormData({...formData, submissionDateActual: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="notification-date">Date Notification (Accord/Refus)</Label>
                <Input
                  id="notification-date"
                  type="date"
                  value={formData.notificationDate || ''}
                  onChange={(e) => setFormData({...formData, notificationDate: e.target.value})}
                />
              </div>
            </div>

            {/* Réceptions des fonds */}
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="advance-date">Date Réception Avance</Label>
                <Input
                  id="advance-date"
                  type="date"
                  value={formData.advanceReceivedDate || ''}
                  onChange={(e) => setFormData({...formData, advanceReceivedDate: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="advance-amount">Montant Avance (€)</Label>
                <Input
                  id="advance-amount"
                  type="number"
                  value={formData.advanceReceivedAmount || 0}
                  onChange={(e) => setFormData({...formData, advanceReceivedAmount: parseFloat(e.target.value) || 0})}
                />
              </div>
              <div>
                <Label htmlFor="balance-date">Date Réception Solde</Label>
                <Input
                  id="balance-date"
                  type="date"
                  value={formData.balanceReceivedDate || ''}
                  onChange={(e) => setFormData({...formData, balanceReceivedDate: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="balance-amount">Montant Solde (€)</Label>
                <Input
                  id="balance-amount"
                  type="number"
                  value={formData.balanceReceivedAmount || 0}
                  onChange={(e) => setFormData({...formData, balanceReceivedAmount: parseFloat(e.target.value) || 0})}
                />
              </div>
            </div>

            {/* Montant Total Reçu et Taux de Réalisation (calculés automatiquement) */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="total-received">Montant Total Reçu (€)</Label>
                <Input
                  id="total-received"
                  type="number"
                  value={formData.totalReceivedAmount || 0}
                  readOnly
                  className="bg-gray-100"
                />
              </div>
              <div>
                <Label htmlFor="completion-rate">Taux de Réalisation (%)</Label>
                <Input
                  id="completion-rate"
                  type="number"
                  value={formData.completionRate || 0}
                  readOnly
                  className="bg-gray-100"
                />
              </div>
            </div>

            {/* Justificatifs et Date Limite Justificatifs */}
            <div>
              <Label htmlFor="justificatifs">Justificatifs à Fournir</Label>
              <Textarea
                id="justificatifs"
                value={formData.justificatifs || ''}
                onChange={(e) => setFormData({...formData, justificatifs: e.target.value})}
                placeholder="Ex: Bilans N-1, N-2; Comptes de résultat; Rapport d'activité 2024..."
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="justificatifs-deadline">Date Limite Justificatifs</Label>
              <Input
                id="justificatifs-deadline"
                type="date"
                value={formData.justificatifsDeadline || ''}
                onChange={(e) => setFormData({...formData, justificatifsDeadline: e.target.value})}
              />
            </div>

            {/* Statut Actuel et Responsable Interne */}
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

            {/* Prochaines Étapes / Notes CA */}
            <div>
              <Label htmlFor="next-steps">Prochaines Étapes / Notes (pour le CA)</Label>
              <Textarea
                id="next-steps"
                value={formData.nextSteps || ''}
                onChange={(e) => setFormData({...formData, nextSteps: e.target.value})}
                placeholder="Ex: Prévoir RDV avec financeur le JJ/MM; Impact de 5K€ sur budget N+1..."
                rows={3}
              />
            </div>

            {/* Champs gardés pour la sauvegarde/export mais retirés du formulaire d'entrée */}
            {/* Nom de l'Organisation (client) - Input gardé pour le formulaire */}
            <div>
              <Label htmlFor="organization-name">Nom de l'organisation (client)</Label>
              <Input
                id="organization-name"
                value={formData.organizationName || ''}
                onChange={(e) => setFormData({...formData, organizationName: e.target.value})}
                placeholder="Association XYZ"
              />
            </div>
            {/* Description du projet - Textarea gardé pour le formulaire */}
            <div>
              <Label htmlFor="project-description">Description générale du projet</Label>
              <Textarea
                id="project-description"
                value={formData.projectDescription || ''}
                onChange={(e) => setFormData({...formData, projectDescription: e.target.value})}
                placeholder="Présentation générale du projet d'école de production..."
                rows={4}
              />
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

      <div className="space-y-4">
        {applications.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center text-gray-500">
              <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Aucun dossier de subvention créé.</p>
              <p className="text-sm">Cliquez sur "Nouvelle subvention" pour commencer ou téléchargez le modèle Excel.</p>
            </CardContent>
          </Card>
        )}

        {/* Affichage des applications dans une carte résumée */}
        {applications.map(app => (
          <Card key={app.id} className="card-hover">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{app.projectTitle}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(app.currentStatus)}`}>
                      {app.currentStatus}
                    </span>
                  </div>
                  <div className="grid md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4" />
                      {app.fundingBody} ({app.financeurType}) - {app.programName}
                    </div>
                    <div className="flex items-center gap-2">
                      <Euro className="w-4 h-4" />
                      Demandé: {app.amountSolicited.toLocaleString()} €
                    </div>
                    <div className="flex items-center gap-2">
                      <Euro className="w-4 h-4" />
                      Obtenu: {app.amountObtained.toLocaleString()} €
                    </div>
                    <div className="flex items-center gap-2">
                      <Percent className="w-4 h-4" />
                      Réalisé: {app.completionRate}%
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="w-4 h-4" />
                      Dépôt effectif: {app.submissionDateActual ? new Date(app.submissionDateActual).toLocaleDateString('fr-FR') : 'N/A'}
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarDays className="w-4 h-4" />
                      Limite justificatifs: {app.justificatifsDeadline ? new Date(app.justificatifsDeadline).toLocaleDateString('fr-FR') : 'N/A'}
                    </div>
                     <div className="flex items-center gap-2">
                      <UserRound className="w-4 h-4" />
                      Resp. interne: {app.internalResponsible || 'N/A'}
                    </div>
                  </div>

                  {app.nextSteps && (
                    <p className="text-sm text-gray-700 mb-3">
                      <span className="font-semibold">Prochaines étapes / Notes CA:</span> {app.nextSteps}
                    </p>
                  )}
                  {app.justificatifs && (
                    <p className="text-sm text-gray-700 mb-3">
                      <span className="font-semibold">Justificatifs:</span> {app.justificatifs}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-xs text-gray-500">
                  {app.notificationDate && `Notifié le ${new Date(app.notificationDate).toLocaleDateString('fr-FR')}`}
                  {app.totalReceivedAmount > 0 && ` • Reçu: ${app.totalReceivedAmount.toLocaleString()} €`}
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => generateDocument(app.id)}
                    className="btn-primary text-xs px-3 py-1"
                  >
                    <Download className="w-3 h-3 mr-1" />
                    Générer PDF
                  </Button>
                  <Button
                    onClick={() => editApplication(app)}
                    className="btn-secondary text-xs px-3 py-1"
                  >
                    Modifier
                  </Button>
                  <Button
                    onClick={() => deleteApplication(app.id)}
                    className="btn-danger text-xs px-3 py-1"
                  >
                    Supprimer
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}