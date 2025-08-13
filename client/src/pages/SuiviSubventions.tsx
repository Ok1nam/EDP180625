import React, { useState, useEffect } from "react";
import { FileText, Download, Euro, Building, Users, Target, CalendarDays, Percent, ClipboardList, Clock, UserRound, PlusCircle, Trash2, Edit, CheckSquare, XSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

// Définition de l'interface complète pour une demande de subvention
interface SubsidyApplication {
  id: string; // Numéro unique
  grantName: string; // Nom de la subvention
  fundingBody: string; // Organisme financeur
  programName: string; // Nom du programme
  financeurType: 'Public' | 'Privé' | ''; // Type de financeur
  objectGrant: string; // Objet de la subvention
  submissionDeadline: string; // Date limite de dépôt
  submissionDateActual: string; // Date effective de dépôt
  amountSolicited: number; // Montant sollicité
  amountObtained: number; // Montant obtenu
  notificationDate: string; // Date de notification
  advanceReceivedDate: string; // Date réception avance
  advanceReceivedAmount: number; // Montant perçu avance
  balanceReceivedDate: string; // Date réception solde
  balanceReceivedAmount: number; // Montant perçu solde
  justificatifsRequired: boolean; // Justificatifs à fournir (Oui / Non)
  justificatifsDeadline: string; // Date limite justificatifs
  currentStatus:
    'À préparer' | 'À déposer' |
    'Dossier déposé' | 'En instruction' | 'Accordé / Avance reçue' |
    'Refusé' | 'Clôturé / Reçu' | 'En attente de solde' | ''; // Statut actuel
  nextSteps: string; // Prochaines étapes / Notes CA
  internalResponsible: string; // Responsable interne
}

// Données de base pour les organismes et programmes (pour les Select)
const fundingBodies = [
  { name: "Région", programs: ["Aide à la création", "Fonds formation", "Développement économique"] },
  { name: "État", programs: ["Plan de relance", "France 2030", "Fonds social européen"] },
  { name: "Europe", programs: ["FSE+", "FEDER", "Erasmus+"] },
  { name: "Pôle Emploi", programs: ["Action de formation", "POEI", "AFPR"] },
  { name: "OPCO", programs: ["Plan de développement", "Reconversion", "Alternance"] },
  { name: "Fondations", programs: ["Fondation de France", "Fondation Total", "Autres fondations"] },
  { name: "Autres", programs: [] }
];

const financeurTypes = ['Public', 'Privé'];

const statusOptions = [
  'À préparer',
  'À déposer',
  'Dossier déposé',
  'En instruction',
  'Accordé / Avance reçue',
  'Refusé',
  'Clôturé / Reçu',
  'En attente de solde'
];

export default function SuiviSubvention() {
  const { toast } = useToast();
  // J'ai remplacé le hook useLocalStorage par une logique intégrée pour éviter l'erreur de compilation
  const [applications, setApplications] = useState<SubsidyApplication[]>(() => {
    try {
      const item = window.localStorage.getItem('subsidy_applications');
      return item ? JSON.parse(item) : [];
    } catch (error) {
      console.error(error);
      return [];
    }
  });
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // État du formulaire avec tous les champs
  const [formData, setFormData] = useState<Partial<SubsidyApplication>>({
    id: '',
    grantName: '',
    fundingBody: '',
    programName: '',
    financeurType: '',
    objectGrant: '',
    submissionDeadline: '',
    submissionDateActual: '',
    amountSolicited: 0,
    amountObtained: 0,
    notificationDate: '',
    advanceReceivedDate: '',
    advanceReceivedAmount: 0,
    balanceReceivedDate: '',
    balanceReceivedAmount: 0,
    justificatifsRequired: false,
    justificatifsDeadline: '',
    currentStatus: 'À préparer',
    nextSteps: '',
    internalResponsible: '',
  });

  const [selectedFundingBody, setSelectedFundingBody] = useState<string>('');

  // Synchronise les données avec le localStorage à chaque changement
  useEffect(() => {
    try {
      window.localStorage.setItem('subsidy_applications', JSON.stringify(applications));
    } catch (error) {
      console.error(error);
    }
  }, [applications]);

  // Calculs dynamiques pour le taux de réalisation et le montant restant
  const totalReceivedAmount = (formData.advanceReceivedAmount || 0) + (formData.balanceReceivedAmount || 0);
  const completionRate = formData.amountObtained && formData.amountObtained > 0 ? (totalReceivedAmount / formData.amountObtained) * 100 : 0;
  const remainingAmountToReceive = (formData.amountObtained || 0) - totalReceivedAmount;

  // Gestion des changements d'input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: parseFloat(value) || 0 }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, justificatifsRequired: checked }));
  };

  const resetForm = () => {
    setFormData({
      id: '',
      grantName: '',
      fundingBody: '',
      programName: '',
      financeurType: '',
      objectGrant: '',
      submissionDeadline: '',
      submissionDateActual: '',
      amountSolicited: 0,
      amountObtained: 0,
      notificationDate: '',
      advanceReceivedDate: '',
      advanceReceivedAmount: 0,
      balanceReceivedDate: '',
      balanceReceivedAmount: 0,
      justificatifsRequired: false,
      justificatifsDeadline: '',
      currentStatus: 'À préparer',
      nextSteps: '',
      internalResponsible: '',
    });
    setEditingId(null);
    setShowForm(false);
    setSelectedFundingBody('');
  };

  const saveApplication = () => {
    // Vérification des champs obligatoires
    if (!formData.grantName || !formData.fundingBody || !formData.amountSolicited || !formData.currentStatus) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir les champs obligatoires (Nom de la subvention, Organisme financeur, Montant sollicité, Statut actuel).",
        variant: "destructive"
      });
      return;
    }

    const application: SubsidyApplication = {
      id: editingId || Date.now().toString(),
      grantName: formData.grantName || '',
      fundingBody: formData.fundingBody || '',
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
      justificatifsRequired: formData.justificatifsRequired || false,
      justificatifsDeadline: formData.justificatifsDeadline || '',
      currentStatus: formData.currentStatus || 'À préparer',
      nextSteps: formData.nextSteps || '',
      internalResponsible: formData.internalResponsible || '',
    };

    let updatedApplications;
    if (editingId) {
      updatedApplications = applications.map(a => a.id === editingId ? application : a);
    } else {
      updatedApplications = [...applications, application];
    }

    setApplications(updatedApplications);
    resetForm();

    toast({
      title: "Dossier sauvegardé",
      description: `${application.grantName} a été ${editingId ? 'modifié' : 'créé'} avec succès.`,
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

    toast({
      title: "Dossier supprimé",
      description: "Le dossier de subvention a été supprimé.",
    });
  };
  
  return (
    <section id="suivi-subvention" className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="flex items-center gap-3 mb-6 text-3xl font-bold text-gray-800">
        <Euro className="w-8 h-8 text-[#3C5F58]" />
        Suivi des Dossiers de Subventions
      </h1>

      <p className="mb-8 text-lg text-gray-700 leading-relaxed">
        Cet outil vous permet de gérer de manière centralisée les dossiers de subventions pour votre École de Production. Suivez l'état de chaque demande, les montants sollicités et reçus, et les échéances importantes pour assurer un <span className="font-bold">modèle économique pérenne</span>.
      </p>

      {!showForm ? (
        <div className="mb-8">
          <Button
            onClick={() => { setShowForm(true); resetForm(); }}
            className="flex items-center gap-2 py-3 px-6 text-lg bg-[#2E5941] hover:bg-[#3C5F58] transition-colors"
          >
            <PlusCircle className="w-5 h-5" /> Ajouter un nouveau dossier
          </Button>
        </div>
      ) : (
        <Card className="mb-8 shadow-md p-6">
          <CardHeader className="bg-gray-50 border-b -mx-6 -mt-6 mb-6 px-6 py-4">
            <CardTitle className="text-xl font-bold text-[#3C5F58] flex items-center gap-2">
              <FileText className="w-5 h-5 text-orange-500" />
              {editingId ? 'Modifier un dossier' : 'Créer un nouveau dossier'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="grantName" className="font-bold">Nom de la subvention / Appel à projets</Label>
                <Input id="grantName" placeholder="Ex: Programme de formation pour la rentrée 2025" value={formData.grantName || ''} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fundingBody" className="font-bold">Organisme financeur</Label>
                <Select value={formData.fundingBody || ''} onValueChange={(value) => { setFormData(prev => ({ ...prev, fundingBody: value, programName: '' })); setSelectedFundingBody(value); }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un organisme" />
                  </SelectTrigger>
                  <SelectContent>
                    {fundingBodies.map(body => (
                      <SelectItem key={body.name} value={body.name}>{body.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            {selectedFundingBody && fundingBodies.find(b => b.name === selectedFundingBody)?.programs.length > 0 && (
                <div className="space-y-2">
                    <Label htmlFor="programName" className="font-bold">Nom du programme</Label>
                    <Select value={formData.programName || ''} onValueChange={(value) => setFormData(prev => ({ ...prev, programName: value }))}>
                        <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez un programme" />
                        </SelectTrigger>
                        <SelectContent>
                            {fundingBodies.find(b => b.name === selectedFundingBody)?.programs.map(program => (
                                <SelectItem key={program} value={program}>{program}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="financeurType" className="font-bold">Type de financeur</Label>
                    <Select value={formData.financeurType || ''} onValueChange={(value: 'Public' | 'Privé') => setFormData(prev => ({ ...prev, financeurType: value }))}>
                        <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez le type" />
                        </SelectTrigger>
                        <SelectContent>
                            {financeurTypes.map(type => (
                                <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="objectGrant" className="font-bold">Objet de la subvention</Label>
                    <Input id="objectGrant" placeholder="Ex: Financement de l'équipement atelier" value={formData.objectGrant || ''} onChange={handleInputChange} />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                  <Label htmlFor="amountSolicited" className="font-bold">Montant sollicité (€)</Label>
                  <Input id="amountSolicited" type="number" placeholder="0" value={formData.amountSolicited || 0} onChange={handleNumberInputChange} />
              </div>
              <div className="space-y-2">
                  <Label htmlFor="amountObtained" className="font-bold">Montant obtenu (€)</Label>
                  <Input id="amountObtained" type="number" placeholder="0" value={formData.amountObtained || 0} onChange={handleNumberInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notificationDate" className="font-bold">Date de notification (accord/refus)</Label>
                <Input id="notificationDate" type="date" value={formData.notificationDate || ''} onChange={handleInputChange} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                  <Label htmlFor="submissionDeadline" className="font-bold">Date limite de dépôt</Label>
                  <Input id="submissionDeadline" type="date" value={formData.submissionDeadline || ''} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                  <Label htmlFor="submissionDateActual" className="font-bold">Date effective de dépôt</Label>
                  <Input id="submissionDateActual" type="date" value={formData.submissionDateActual || ''} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="internalResponsible" className="font-bold">Responsable interne</Label>
                <Input id="internalResponsible" placeholder="Ex: Jean Dupont" value={formData.internalResponsible || ''} onChange={handleInputChange} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <Label htmlFor="advanceReceivedDate" className="font-bold">Date réception avance</Label>
                <Input id="advanceReceivedDate" type="date" value={formData.advanceReceivedDate || ''} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="advanceReceivedAmount" className="font-bold">Montant perçu avance (€)</Label>
                <Input id="advanceReceivedAmount" type="number" placeholder="0" value={formData.advanceReceivedAmount || 0} onChange={handleNumberInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="balanceReceivedDate" className="font-bold">Date réception solde</Label>
                <Input id="balanceReceivedDate" type="date" value={formData.balanceReceivedDate || ''} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="balanceReceivedAmount" className="font-bold">Montant perçu solde (€)</Label>
                <Input id="balanceReceivedAmount" type="number" placeholder="0" value={formData.balanceReceivedAmount || 0} onChange={handleNumberInputChange} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="flex items-center space-x-2">
                <Checkbox id="justificatifsRequired" checked={formData.justificatifsRequired} onCheckedChange={handleCheckboxChange} />
                <Label htmlFor="justificatifsRequired" className="font-bold">Justificatifs à fournir</Label>
              </div>
              {formData.justificatifsRequired && (
                <div className="space-y-2">
                  <Label htmlFor="justificatifsDeadline" className="font-bold">Date limite justificatifs</Label>
                  <Input id="justificatifsDeadline" type="date" value={formData.justificatifsDeadline || ''} onChange={handleInputChange} />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentStatus" className="font-bold">Statut actuel</Label>
              <Select value={formData.currentStatus || ''} onValueChange={(value: any) => setFormData(prev => ({ ...prev, currentStatus: value }))}>
                  <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un statut" />
                  </SelectTrigger>
                  <SelectContent>
                      {statusOptions.map(status => (
                          <SelectItem key={status} value={status}>{status}</SelectItem>
                      ))}
                  </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nextSteps" className="font-bold">Prochaines étapes / Notes CA</Label>
              <Textarea id="nextSteps" placeholder="Ex: préparer un rendez-vous avec le financeur, présenter l'avancement au prochain CA." value={formData.nextSteps || ''} onChange={handleInputChange} />
            </div>

            <div className="flex justify-end gap-2">
              <Button onClick={resetForm} variant="outline" className="text-red-500 hover:text-red-600 border-red-500">
                Annuler
              </Button>
              <Button onClick={saveApplication} className="bg-[#2E5941] hover:bg-[#3C5F58]">
                Sauvegarder le dossier
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {applications.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-[#3C5F58] mt-8 mb-4">Dossiers en cours</h2>
          {applications.map(app => (
            <Card key={app.id} className="p-6 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{app.grantName}</h3>
                  <p className="text-sm text-gray-500">
                    <Building className="inline-block w-4 h-4 mr-1 text-[#3C5F58]" />
                    {app.fundingBody} | {app.programName}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => editApplication(app)}>
                    <Edit className="w-4 h-4 text-blue-500" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => deleteApplication(app.id)}>
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-700 mb-4">
                <div className="flex items-center gap-2"><Euro className="w-4 h-4 text-green-600" /><span className="font-bold">Montant sollicité:</span> {app.amountSolicited} €</div>
                <div className="flex items-center gap-2"><Euro className="w-4 h-4 text-green-600" /><span className="font-bold">Montant obtenu:</span> {app.amountObtained} €</div>
                <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-red-500" /><span className="font-bold">Statut:</span> {app.currentStatus}</div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-gray-600 mb-4">
                <div className="flex items-center gap-2"><CalendarDays className="w-4 h-4 text-indigo-500" /><span className="font-bold">Dépôt:</span> {app.submissionDateActual}</div>
                <div className="flex items-center gap-2"><UserRound className="w-4 h-4 text-gray-500" /><span className="font-bold">Responsable:</span> {app.internalResponsible}</div>
                <div className="flex items-center gap-2"><Download className="w-4 h-4 text-orange-500" /><span className="font-bold">Avance reçue:</span> {app.advanceReceivedAmount} € ({app.advanceReceivedDate})</div>
                <div className="flex items-center gap-2"><Download className="w-4 h-4 text-orange-500" /><span className="font-bold">Solde perçu:</span> {app.balanceReceivedAmount} € ({app.balanceReceivedDate})</div>
                <div className="flex items-center gap-2">
                  {app.justificatifsRequired ? (
                      <><CheckSquare className="w-4 h-4 text-green-500" /><span className="font-bold">Justificatifs requis:</span> Oui ({app.justificatifsDeadline})</>
                  ) : (
                      <><XSquare className="w-4 h-4 text-red-500" /><span className="font-bold">Justificatifs requis:</span> Non</>
                  )}
                </div>
              </div>

              {app.amountObtained > 0 && (
                <>
                  <div className="flex items-center gap-2 mb-2 text-sm text-gray-700">
                      <Progress value={completionRate} className="w-full h-2 bg-gray-200" />
                      <span className="font-bold">{completionRate.toFixed(0)}% perçu</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-sm text-gray-600">
                    <span className="font-bold">Montant total perçu:</span> {(app.advanceReceivedAmount || 0) + (app.balanceReceivedAmount || 0)} €
                    <span className="font-bold">Montant restant:</span> {(app.amountObtained || 0) - ((app.advanceReceivedAmount || 0) + (app.balanceReceivedAmount || 0))} €
                  </div>
                </>
              )}
              {app.nextSteps && (
                <div className="mt-4 text-sm text-gray-700">
                  <span className="font-bold block mb-1">Prochaines étapes / Notes CA:</span>
                  <p className="text-gray-600">{app.nextSteps}</p>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}