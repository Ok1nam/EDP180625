import { useState } from "react";
import { FileText, Download, Euro, Building, Users, Target, CalendarDays, Percent, ClipboardList, Clock, UserRound, FileDown, File } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useLocalStorage } from "@/hooks/useLocalStorage";
// CORRECTION ICI : Le chemin d'import est maintenant correct
import { useToast } from "@/components/ui/toast";

interface SubsidyApplication {
  id: string; // Internal unique ID
  projectTitle: string; // ID / Nom unique pour identifier la subvention
  programName: string; // Nom de la Subvention / Appel à Projets

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
  justificatifs: string; // Justificatifs à Fournir
  justificatifsDeadline: string; // Date Limite Justificatifs
  currentStatus:
    'À préparer' | 'À déposer' |
    'Dossier déposé' | 'En instruction' | 'Accordé / Avance reçue' |
    'Refusé' | 'Clôturée / Reçue' | 'En attente de solde' | ''; // Statuts mis à jour
  nextSteps: string; // Prochaines Étapes / Notes CA
  internalResponsible: string; // Responsable Interne

  fundingBody: string; // Organisme Financeur
}

const fundingBodies = [
  { name: "Région", programs: ["Aide à la création", "Fonds formation", "Développement économique"] },
  { name: "État", programs: ["Plan de relance", "France 2030", "Fonds social européen"] },
  { name: "Europe", programs: ["FSE+", "FEDER", "Erasmus+"] },
  { name: "Pôle Emploi", programs: ["Action de formation", "POEI", "AFPR"] },
  { name: "OPCO", programs: ["Plan de développement", "Reconversion", "Alternance"] },
  { name: "Fondations", programs: ["Fondation de France", "Fondation Total", "Autres fondations"] },
  { name: "Autres", programs: [] } // Ajout de "Autres"
];

const financeurTypes = ['Public', 'Privé'];

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

  // CORRECTION ICI : Suppression des clés en double
  const [formData, setFormData] = useState<Partial<SubsidyApplication>>({
    amountSolicited: 0,
    amountObtained: 0,
    advanceReceivedAmount: 0,
    balanceReceivedAmount: 0,
    currentStatus: 'À préparer',
    financeurType: '',
    objectGrant: '',
    submissionDeadline: '',
    submissionDateActual: '',
    notificationDate: '',
    advanceReceivedDate: '',
    balanceReceivedDate: '',
    justificatifs: '',
    justificatifsDeadline: '',
    nextSteps: '',
    internalResponsible: '',
    programName: '',
    projectTitle: '',
  });

  const [selectedFundingBody, setSelectedFundingBody] = useState<string>('');

  // CALCULS des valeurs dérivées (Montant Total Reçu, Taux de Réalisation)
  const totalReceivedAmount = (formData.advanceReceivedAmount || 0) + (formData.balanceReceivedAmount || 0);
  const completionRate = formData.amountObtained > 0 ? (totalReceivedAmount / formData.amountObtained) * 100 : 0;
  const remainingAmountToReceive = (formData.amountObtained || 0) - totalReceivedAmount;


  const resetForm = () => {
    // CORRECTION ICI : Suppression des clés en double
    setFormData({
      amountSolicited: 0,
      amountObtained: 0,
      advanceReceivedAmount: 0,
      balanceReceivedAmount: 0,
      currentStatus: 'À préparer',
      financeurType: '',
      objectGrant: '',
      submissionDeadline: '',
      submissionDateActual: '',
      notificationDate: '',
      advanceReceivedDate: '',
      balanceReceivedDate: '',
      justificatifs: '',
      justificatifsDeadline: '',
      nextSteps: '',
      internalResponsible: '',
      programName: '',
      projectTitle: '',
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
        variant: "destructive"
      });
      return;
    }

    const application: SubsidyApplication = {
      id: editingId || Date.now().toString(),
      programName: formData.programName || '',

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
      justificatifs: formData.justificatifs || '',
      justificatifsDeadline: formData.justificatifsDeadline || '',
      currentStatus: formData.currentStatus || 'À préparer',
      nextSteps: formData.nextSteps || '',
      internalResponsible: formData.internalResponsible || '',

      fundingBody: formData.fundingBody || '',
      projectTitle: formData.projectTitle || '',
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
    setFormData({
      id: app.id,
      programName: app.programName,
      financeurType: app.financeurType,
      objectGrant: app.objectGrant,
      submissionDeadline: app.submissionDeadline,
      submissionDateActual: app.submissionDateActual,
      amountSolicited: app.amountSolicited,
      amountObtained: app.amountObtained,
      notificationDate: app.notificationDate,
      advanceReceivedDate: app.advanceReceivedDate,
      advanceReceivedAmount: app.advanceReceivedAmount,
      balanceReceivedDate: app.balanceReceivedDate,
      balanceReceivedAmount: app.balanceReceivedAmount,
      justificatifs: app.justificatifs,
      justificatifsDeadline: app.justificatifsDeadline,
      currentStatus: app.currentStatus,
      nextSteps: app.nextSteps,
      internalResponsible: app.internalResponsible,
      fundingBody: app.fundingBody,
      projectTitle: app.projectTitle,
    });
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

  const sanitizeCSVValue = (value: string | number | undefined | null): string => {
    if (value === undefined || value === null) {
      return '';
    }
    const str = String(value);
    // Escape double quotes and enclose in quotes to handle commas and other special characters
    return `"${str.replace(/"/g, '""')}"`;
  };

  const exportToCSV = () => {
    if (applications.length === 0) {
      toast({
        title: "Export impossible",
        description: "Aucun dossier de subvention à exporter.",
        variant: "destructive"
      });
      return;
    }

    const headers = [
      "ID",
      "Nom de la subvention / Appel à projets",
      "Organisme financeur",
      "Type de financeur",
      "Objet de la subvention",
      "Date limite de dépôt",
      "Date dépôt dossier",
      "Montant sollicité (€)",
      "Montant obtenu (€)",
      "Date notification (accord/refus)",
      "Date réception avance",
      "Montant perçu avance (€)",
      "Date réception solde",
      "Montant perçu solde (€)",
      "Montant total reçu (€)",
      "Montant restant à percevoir (€)",
      "Taux de réalisation (%)",
      "Justificatifs à fournir",
      "Date limite justificatifs",
      "Statut actuel",
      "Prochaines étapes / Notes CA",
      "Responsable interne",
    ];

    const rows = applications.map(app => {
      const appTotalReceivedAmount = (app.advanceReceivedAmount || 0) + (app.balanceReceivedAmount || 0);
      const appCompletionRate = app.amountObtained > 0 ? (appTotalReceivedAmount / app.amountObtained) * 100 : 0;
      const appRemainingAmount = (app.amountObtained || 0) - appTotalReceivedAmount;

      return [
        sanitizeCSVValue(app.projectTitle),
        sanitizeCSVValue(app.programName),
        sanitizeCSVValue(app.fundingBody),
        sanitizeCSVValue(app.financeurType),
        sanitizeCSVValue(app.objectGrant),
        sanitizeCSVValue(app.submissionDeadline),
        sanitizeCSVValue(app.submissionDateActual),
        sanitizeCSVValue(app.amountSolicited),
        sanitizeCSVValue(app.amountObtained),
        sanitizeCSVValue(app.notificationDate),
        sanitizeCSVValue(app.advanceReceivedDate),
        sanitizeCSVValue(app.advanceReceivedAmount),
        sanitizeCSVValue(app.balanceReceivedDate),
        sanitizeCSVValue(app.balanceReceivedAmount),
        sanitizeCSVValue(parseFloat(appTotalReceivedAmount.toFixed(2))),
        sanitizeCSVValue(parseFloat(appRemainingAmount.toFixed(2))),
        sanitizeCSVValue(parseFloat(appCompletionRate.toFixed(2))),
        sanitizeCSVValue(app.justificatifs),
        sanitizeCSVValue(app.justificatifsDeadline),
        sanitizeCSVValue(app.currentStatus),
        sanitizeCSVValue(app.nextSteps),
        sanitizeCSVValue(app.internalResponsible),
      ].join(';');
    });

    const csvContent = [
      headers.map(sanitizeCSVValue).join(';'),
      ...rows
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

  const downloadExcelTemplate = () => {
    const filePath = '/fichiers/ANNEXE 14 TABLEAU DE SUIVI DES SUBVENTIONS.xlsx';
    const a = document.createElement('a');
    a.href = filePath;
    a.download = `ANNEXE 14 TABLEAU DE SUIVI DES SUBVENTIONS.xlsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    toast({
      title: "Téléchargement Modèle",
      description: "Votre modèle Excel a été téléchargé.",
    });
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
    return colors[status] || 'bg-gray-100 text-gray-800';
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
                <File className="w-4 h-4 mr-2" />
                Télécharger le modèle Excel
            </Button>
        </div>
      </div>

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
                  disabled={!selectedFundingBody || selectedFundingBody === 'Autres'}
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
                  value={parseFloat(totalReceivedAmount.toFixed(2))}
                  readOnly
                  className="bg-gray-100"
                />
              </div>
              <div>
                <Label htmlFor="completion-rate">Taux de Réalisation (%)</Label>
                <Input
                  id="completion-rate"
                  type="number"
                  value={parseFloat(completionRate.toFixed(2))}
                  readOnly
                  className="bg-gray-100"
                />
              </div>
            </div>

            {/* Montant restant à percevoir */}
            <div>
              <Label htmlFor="remaining-amount">Montant restant à percevoir (€)</Label>
              <Input
                id="remaining-amount"
                type="number"
                value={parseFloat(remainingAmountToReceive.toFixed(2))}
                readOnly
                className="bg-gray-100"
              />
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

        {applications.map(app => {
          const appTotalReceivedAmount = (app.advanceReceivedAmount || 0) + (app.balanceReceivedAmount || 0);
          const appCompletionRate = app.amountObtained > 0 ? (appTotalReceivedAmount / app.amountObtained) * 100 : 0;
          const appRemainingAmount = (app.amountObtained || 0) - appTotalReceivedAmount;


          return (
            <Card key={app.id} className="card-hover transition-shadow duration-200 hover:shadow-lg">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{app.projectTitle}</h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(app.currentStatus)}`}>
                        {app.currentStatus}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-1">Organisme : {app.fundingBody} ({app.financeurType})</p>
                    {app.programName && <p className="text-gray-600 mb-1">Programme : {app.programName}</p>}
                    <p className="text-gray-600 mb-1">Montant Sollicité : {app.amountSolicited.toLocaleString('fr-FR')} €</p>
                    <p className="text-gray-600 mb-1">Montant Obtenu : {app.amountObtained.toLocaleString('fr-FR')} €</p>
                    <p className="text-gray-600 mb-1">Montant Total Reçu : {appTotalReceivedAmount.toLocaleString('fr-FR')} €</p>
                    <p className="text-gray-600 mb-1">Montant restant à percevoir : {appRemainingAmount.toLocaleString('fr-FR')} €</p>
                    <p className="text-gray-600 mb-1">Taux de Réalisation : {parseFloat(appCompletionRate.toFixed(2))} %</p>
                  </div>

                  <div className="flex-shrink-0 flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => editApplication(app)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Modifier
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteApplication(app.id)}
                    >
                      Supprimer
                    </Button>
                  </div>
                </div>

                {app.objectGrant && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-500 font-medium">Objet :</p>
                    <p className="text-sm text-gray-700">{app.objectGrant}</p>
                  </div>
                )}
                {app.nextSteps && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 font-medium">Prochaines Étapes :</p>
                    <p className="text-sm text-gray-700">{app.nextSteps}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}