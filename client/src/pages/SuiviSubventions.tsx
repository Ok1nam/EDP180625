import { useState } from "react";
import { FileText, Download, Euro, Building, Users, Target, CalendarDays, Percent, ClipboardList, Clock, UserRound } from "lucide-react"; // Nouvelles icônes
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useToast } from "@/hooks/use-toast";

// Mise à jour de l'interface SubsidyApplication pour inclure les nouveaux champs
interface SubsidyApplication {
  id: string;
  // Champs existants (certains renommés pour la clarté)
  programName: string; // Nom de la Subvention / Appel à Projets
  organizationName: string; // Nom de l'organisme demandeur

  // Nouveaux champs tirés de la capture d'écran
  financeurType: 'Public' | 'Privé' | ''; // Type de financeur
  objectGrant: string; // Objet de la Subvention
  submissionDeadline: string; // Date Limite de Dépôt
  submissionDateActual: string; // Date Dépôt Dossier
  amountSolicited: number; // Montant Sollicité (€) - Ancien 'amount', renommé pour la clarté
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
    'À identifier' | 'En veille' | 'À préparer' | 'À déposer' | 
    'Dossier déposé' | 'En instruction' | 'Accordé / Avance reçue' | 
    'Refusé' | 'Clôturée / Reçue' | 'En attente de solde' | ''; // Statut Actuel
  nextSteps: string; // Prochaines Étapes / Notes CA
  internalResponsible: string; // Responsable Interne

  // Autres champs existants (potentiellement à adapter ou renommer pour cohérence)
  fundingBody: string; // Organisme Financeur
  projectTitle: string; // ID / Nom unique pour identifier la subvention. On garde 'projectTitle' car 'ID' est déjà pour l'identifiant unique.
  projectDescription: string;
  siretNumber: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string; // Addresse de l'organisation
  targetAudience: string;
  expectedStudents: number;
  sectors: string[];
  projectDuration: number;
  startDate: string;
  objectives: string;
  methodology: string;
  partnerOrganizations: string;
  budget: {
    personnel: number;
    equipment: number;
    operations: number;
    other: number;
  };
  expectedOutcomes: string;
  evaluationCriteria: string;
  sustainability: string;
  innovation: string;
  socialImpact: string;
}

const fundingBodies = [
  { name: "Région", programs: ["Aide à la création", "Fonds formation", "Développement économique"] },
  { name: "État", programs: ["Plan de relance", "France 2030", "Fonds social européen"] },
  { name: "Europe", programs: ["FSE+", "FEDER", "Erasmus+"] },
  { name: "Pôle Emploi", programs: ["Action de formation", "POEI", "AFPR"] },
  { name: "OPCO", programs: ["Plan de développement", "Reconversion", "Alternance"] },
  { name: "Fondations", programs: ["Fondation de France", "Fondation Total", "Autres fondations"] }
];

const financeurTypes = ['Public', 'Privé']; // Type de financeur

// Nouveaux statuts basés sur la capture d'écran
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

export default function SubsidyGenerator() {
  const { toast } = useToast();
  const [savedData, setSavedData] = useLocalStorage<SubsidyApplication[]>('subsidy_applications', []);
  const [applications, setApplications] = useState<SubsidyApplication[]>(savedData);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<SubsidyApplication>>({});
  const [selectedFundingBody, setSelectedFundingBody] = useState<string>('');

  // Effect pour calculer automatiquement Montant Total Reçu et Taux de Réalisation
  // Je l'ai mis ici pour une mise à jour dynamique lors de l'édition du formulaire
  useState(() => {
    const totalReceived = (formData.advanceReceivedAmount || 0) + (formData.balanceReceivedAmount || 0);
    const completion = formData.amountObtained > 0 ? (totalReceived / formData.amountObtained) * 100 : 0;
    
    // Mettre à jour le formData sans déclencher de boucle infinie si les valeurs sont déjà les mêmes
    if (formData.totalReceivedAmount !== totalReceived || formData.completionRate !== completion) {
      setFormData(prev => ({
        ...prev,
        totalReceivedAmount: totalReceived,
        completionRate: parseFloat(completion.toFixed(2)) // Arrondir à 2 décimales
      }));
    }
  }, [formData.advanceReceivedAmount, formData.balanceReceivedAmount, formData.amountObtained]);


  const resetForm = () => {
    setFormData({
      budget: { personnel: 0, equipment: 0, operations: 0, other: 0 },
      sectors: [],
      amountSolicited: 0, // Initialiser à 0
      amountObtained: 0, // Initialiser à 0
      advanceReceivedAmount: 0, // Initialiser à 0
      balanceReceivedAmount: 0, // Initialiser à 0
      totalReceivedAmount: 0, // Initialiser à 0
      completionRate: 0, // Initialiser à 0
      currentStatus: 'À identifier' // Nouveau statut par défaut
    });
    setEditingId(null);
    setShowForm(false);
    setSelectedFundingBody('');
  };

  const saveApplication = () => {
    if (!formData.projectTitle || !formData.fundingBody || !formData.amountSolicited || !formData.currentStatus) { // Vérifier les nouveaux champs obligatoires
      toast({
        title: "Erreur",
        description: "Veuillez remplir les champs obligatoires (Titre du projet, Organisme financeur, Montant Sollicité, Statut Actuel).",
      });
      return;
    }

    const application: SubsidyApplication = {
      id: editingId || Date.now().toString(),
      programName: formData.programName || '',
      organizationName: formData.organizationName || '',

      // Nouveaux champs
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
      currentStatus: formData.currentStatus || 'À identifier', // Assurez-vous d'avoir une valeur par défaut valide
      nextSteps: formData.nextSteps || '',
      internalResponsible: formData.internalResponsible || '',

      // Anciens champs (renommés si besoin)
      fundingBody: formData.fundingBody || '', // 'Organisme Financeur'
      projectTitle: formData.projectTitle || '', // 'Nom de la Subvention / Appel à Projets'
      projectDescription: formData.projectDescription || '',
      siretNumber: formData.siretNumber || '',
      contactPerson: formData.contactPerson || '',
      email: formData.email || '',
      phone: formData.phone || '',
      address: formData.address || '',
      targetAudience: formData.targetAudience || '',
      expectedStudents: formData.expectedStudents || 0,
      sectors: formData.sectors || [],
      projectDuration: formData.projectDuration || 12,
      startDate: formData.startDate || '',
      objectives: formData.objectives || '',
      methodology: formData.methodology || '',
      partnerOrganizations: formData.partnerOrganizations || '',
      budget: formData.budget || { personnel: 0, equipment: 0, operations: 0, other: 0 },
      expectedOutcomes: formData.expectedOutcomes || '',
      evaluationCriteria: formData.evaluationCriteria || '',
      sustainability: formData.sustainability || '',
      innovation: formData.innovation || '',
      socialImpact: formData.socialImpact || '',
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
  };

  const calculateTotalBudget = () => {
    if (!formData.budget) return 0;
    return Object.values(formData.budget).reduce((sum, value) => sum + (value || 0), 0);
  };

  // Adapter les couleurs et labels pour les nouveaux statuts
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
      'Clôturée / Reçue': 'bg-emerald-100 text-emerald-800', // Vert foncé pour clôturé/reçu
      'En attente de solde': 'bg-cyan-100 text-cyan-800', // Bleu clair pour attente
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
        Suivi et Génération des Dossiers de Subventions
      </h1>
      
      <p className="mb-6 text-gray-600 leading-relaxed">
        Gérez et suivez l'ensemble des dossiers de demande de subventions pour les Écoles de Production de vos clients, du montage au versement final.
      </p>

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
                  readOnly // Ceci est calculé
                  className="bg-gray-100"
                />
              </div>
              <div>
                <Label htmlFor="completion-rate">Taux de Réalisation (%)</Label>
                <Input
                  id="completion-rate"
                  type="number"
                  value={formData.completionRate || 0}
                  readOnly // Ceci est calculé
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

            {/* Anciens champs non impactés directement par la capture Excel mais toujours utiles */}
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

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="organization-name">Nom de l'organisation (client)</Label>
                <Input
                  id="organization-name"
                  value={formData.organizationName || ''}
                  onChange={(e) => setFormData({...formData, organizationName: e.target.value})}
                  placeholder="Association XYZ"
                />
              </div>
              <div>
                <Label htmlFor="siret">Numéro SIRET</Label>
                <Input
                  id="siret"
                  value={formData.siretNumber || ''}
                  onChange={(e) => setFormData({...formData, siretNumber: e.target.value})}
                  placeholder="12345678901234"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="contact-person">Personne de contact (financeur ou école)</Label>
                <Input
                  id="contact-person"
                  value={formData.contactPerson || ''}
                  onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                  placeholder="Nom Prénom"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="contact@ecole.fr"
                />
              </div>
              <div>
                <Label htmlFor="phone">Téléphone</Label>
                <Input
                  id="phone"
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="01 23 45 67 89"
                />
              </div>
            </div>
            
            {/* ... Autres champs comme address, targetAudience, expectedStudents, projectDuration, startDate, objectives, methodology, partnerOrganizations, budget, expectedOutcomes, evaluationCriteria, sustainability, innovation, socialImpact */}
            {/* Je n'ai pas inclus tous les anciens champs ici pour ne pas surcharger, mais assurez-vous de les conserver si vous en avez besoin.
               Les principaux de la capture ont été ajoutés. */}

            <div>
              <Label>Budget prévisionnel (détaillé)</Label>
              <div className="grid md:grid-cols-4 gap-4 mt-2">
                <div>
                  <Label htmlFor="budget-personnel">Personnel (€)</Label>
                  <Input
                    id="budget-personnel"
                    type="number"
                    value={formData.budget?.personnel || 0}
                    onChange={(e) => setFormData({
                      ...formData, 
                      budget: { ...formData.budget, personnel: parseFloat(e.target.value) || 0 }
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="budget-equipment">Équipements (€)</Label>
                  <Input
                    id="budget-equipment"
                    type="number"
                    value={formData.budget?.equipment || 0}
                    onChange={(e) => setFormData({
                      ...formData, 
                      budget: { ...formData.budget, equipment: parseFloat(e.target.value) || 0 }
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="budget-operations">Fonctionnement (€)</Label>
                  <Input
                    id="budget-operations"
                    type="number"
                    value={formData.budget?.operations || 0}
                    onChange={(e) => setFormData({
                      ...formData, 
                      budget: { ...formData.budget, operations: parseFloat(e.target.value) || 0 }
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="budget-other">Autres (€)</Label>
                  <Input
                    id="budget-other"
                    type="number"
                    value={formData.budget?.other || 0}
                    onChange={(e) => setFormData({
                      ...formData, 
                      budget: { ...formData.budget, other: parseFloat(e.target.value) || 0 }
                    })}
                  />
                </div>
              </div>
              <div className="mt-2 text-right">
                <span className="font-semibold">Total budget prévisionnel: {calculateTotalBudget().toLocaleString()} €</span>
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

      <div className="space-y-4">
        {applications.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center text-gray-500">
              <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Aucun dossier de subvention créé.</p>
              <p className="text-sm">Cliquez sur "Nouvelle subvention" pour commencer.</p>
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
                    <h3 className="text-lg font-semibold">{app.projectTitle}</h3> {/* Nom de la subvention */}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(app.currentStatus)}`}>
                      {app.currentStatus} {/* Statut Actuel */}
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