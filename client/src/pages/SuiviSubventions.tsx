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
// LA VOICI : LA CORRECTION BASÉE SUR VOTRE ANCIEN CODE
import { useToast } from "@/hooks/use-toast";

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
  balanceReceivedDate: string;
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
  // On remet l'appel au hook, qui est la bonne façon de faire
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
  });

  const [selectedFundingBody, setSelectedFundingBody] = useState<string>('');

  const totalReceivedAmount = (formData.advanceReceivedAmount || 0) + (formData.balanceReceivedAmount || 0);
  const completionRate = formData.amountObtained > 0 ? (totalReceivedAmount / formData.amountObtained) * 100 : 0;
  const remainingAmountToReceive = (formData.amountObtained || 0) - totalReceivedAmount;


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
  
  // Le reste du code est inchangé et correct
  return (
    <section>
      {/* ... Le JSX reste identique ... */}
    </section>
  )
}