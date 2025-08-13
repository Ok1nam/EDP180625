import React, { useState } from "react";
import { FileText, Download, Euro, Building, Users, Target, CalendarDays, Percent, ClipboardList, Clock, UserRound, FileDown, File, PlusCircle, Trash2, Edit } from "lucide-react";
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

interface SubsidyApplication {
  id: string;
  projectTitle: string;
  programName: string;
  financeurType: 'Public' | 'Privé' | '';
  objectGrant: string;
  submissionDeadline: string;
  submissionDateActual: string;
  amountSolicited: number;
  amountObtained: number;
  notificationDate: string;
  advanceReceivedDate: string;
  advanceReceivedAmount: number;
  balanceReceivedAmount: number;
  justificatifs: string;
  justificatifsDeadline: string;
  currentStatus:
    'À préparer' | 'À déposer' |
    'Dossier déposé' | 'En instruction' | 'Accordé / Avance reçue' |
    'Refusé' | 'Clôturée / Reçue' | 'En attente de solde' | '';
  nextSteps: string;
  internalResponsible: string;
  fundingBody: string;
}

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
  'Clôturée / Reçue',
  'En attente de solde'
];

export default function SuiviSubvention() {
  const { toast } = useToast();
  const [savedData, setSavedData] = useLocalStorage<SubsidyApplication[]>('subsidy_applications', []);
  const [applications, setApplications] = useState<SubsidyApplication[]>(savedData);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

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
    fundingBody: '',
  });

  const [selectedFundingBody, setSelectedFundingBody] = useState<string>('');

  const totalReceivedAmount = (formData.advanceReceivedAmount || 0) + (formData.balanceReceivedAmount || 0);
  const completionRate = formData.amountObtained > 0 ? (totalReceivedAmount / formData.amountObtained) * 100 : 0;
  const remainingAmountToReceive = (formData.amountObtained || 0) - totalReceivedAmount;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: parseFloat(value) || 0 }));
  };

  const resetForm = () => {
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
      fundingBody: '',
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
            onClick={() => setShowForm(true)}
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
                <Label htmlFor="projectTitle" className="font-bold">Titre du projet de subvention</Label>
                <Input id="projectTitle" placeholder="Ex: Programme de formation pour la rentrée 2025" value={formData.projectTitle || ''} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fundingBody" className="font-bold">Organisme financeur</Label>
                <Select value={formData.fundingBody || ''} onValueChange={(value) => { setFormData(prev => ({ ...prev, fundingBody: value })); setSelectedFundingBody(value); }}>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="amountSolicited" className="font-bold">Montant sollicité (€)</Label>
                    <Input id="amountSolicited" type="number" placeholder="0" value={formData.amountSolicited || 0} onChange={handleNumberInputChange} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="amountObtained" className="font-bold">Montant accordé (€)</Label>
                    <Input id="amountObtained" type="number" placeholder="0" value={formData.amountObtained || 0} onChange={handleNumberInputChange} />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                  <Label htmlFor="submissionDeadline" className="font-bold">Date limite de dépôt</Label>
                  <Input id="submissionDeadline" type="date" value={formData.submissionDeadline || ''} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                  <Label htmlFor="submissionDateActual" className="font-bold">Date de dépôt</Label>
                  <Input id="submissionDateActual" type="date" value={formData.submissionDateActual || ''} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                  <Label htmlFor="notificationDate" className="font-bold">Date de notification</Label>
                  <Input id="notificationDate" type="date" value={formData.notificationDate || ''} onChange={handleInputChange} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="currentStatus" className="font-bold">Statut du dossier</Label>
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
                    <Label htmlFor="internalResponsible" className="font-bold">Responsable interne</Label>
                    <Input id="internalResponsible" placeholder="Ex: Jean Dupont" value={formData.internalResponsible || ''} onChange={handleInputChange} />
                </div>
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
                  <h3 className="text-xl font-bold text-gray-800">{app.projectTitle}</h3>
                  <p className="text-sm text-gray-500">
                    <Building className="inline-block w-4 h-4 mr-1 text-[#3C5F58]" />
                    {app.fundingBody} |
                    <Target className="inline-block w-4 h-4 mr-1 ml-2 text-blue-600" />
                    {app.programName}
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
                <div className="flex items-center gap-2"><Euro className="w-4 h-4 text-green-600" /><span className="font-bold">Montant accordé:</span> {app.amountObtained} €</div>
                <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-red-500" /><span className="font-bold">Statut:</span> {app.currentStatus}</div>
              </div>

              {app.amountObtained > 0 && (
                <>
                  <div className="flex items-center gap-2 mb-2 text-sm text-gray-700">
                      <Progress value={completionRate} className="w-full h-2 bg-gray-200" />
                      <span className="font-bold">{completionRate.toFixed(0)}% reçus</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-bold">Montant restant à recevoir:</span> {remainingAmountToReceive} €
                  </div>
                </>
              )}
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}