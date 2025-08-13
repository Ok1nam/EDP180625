import { useState } from "react";
import { Plus, Banknote, Building2, CalendarDays, Percent, TrendingUp, HandCoins, ArrowRightFromLine, Wallet, Hourglass, FileText, Download, FileDown, File, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useToast } from "@/hooks/use-toast";

// Interface pour un prêt ou un financement
interface Loan {
  id: string;
  loanReference: string;
  lenderName: string;
  contactPerson?: string; // Ajout du contact
  typeOfLoan: 'Amortissable' | 'In Fine' | 'Ligne de Trésorerie / Découvert' | 'Prêt d\'Honneur' | 'Prêt Participatif' | '';
  objectOfLoan: string;
  agreementDate: string;
  initialAmount: number;
  interestRatePercentage?: number;
  durationYears?: number;
  repaymentFrequency: 'Mensuelle' | 'Trimestrielle' | 'Semestrielle' | 'Annuelle' | '';
  startDate: string;
  endDate?: string;
  installmentAmount?: number;
  capitalRepaidToDate: number;
  interestPaidToDate: number;
  guarantees: string;
  specialConditions: string;
  status: 'demande_en_cours' | 'accorde' | 'en_cours_remboursement' | 'rembourse' | 'refuse' | '';
  nextInstallmentDate?: string;
  notesInternal: string;
  internalResponsible: string;
  lastUpdate: string;
}

export default function SuiviPrets() {
  const { toast } = useToast();
  const [savedLoans, setSavedLoans] = useLocalStorage<Loan[]>('loans_data', []);
  const [loans, setLoans] = useState<Loan[]>(savedLoans);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Initialisation du formData avec des valeurs par défaut / vides pour les nouveaux prêts
  const [formData, setFormData] = useState<Partial<Loan>>({
    loanReference: '',
    lenderName: '',
    contactPerson: '', // Initialisation du nouveau champ
    typeOfLoan: '',
    objectOfLoan: '',
    agreementDate: '',
    initialAmount: 0,
    interestRatePercentage: 0,
    durationYears: 0,
    repaymentFrequency: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    installmentAmount: 0,
    capitalRepaidToDate: 0,
    interestPaidToDate: 0,
    guarantees: '',
    specialConditions: '',
    status: 'demande_en_cours',
    nextInstallmentDate: '',
    notesInternal: '',
    internalResponsible: '',
    lastUpdate: new Date().toISOString().split('T')[0],
  });

  const loanTypesOptions = [
    { value: 'Amortissable', label: 'Amortissable', icon: <Banknote className="w-4 h-4 mr-2" /> },
    { value: 'In Fine', label: 'In Fine', icon: <HandCoins className="w-4 h-4 mr-2" /> },
    { value: 'Ligne de Trésorerie / Découvert', label: 'Ligne de Trésorerie / Découvert', icon: <Wallet className="w-4 h-4 mr-2" /> },
    { value: 'Prêt d\'Honneur', label: 'Prêt d\'Honneur', icon: <TrendingUp className="w-4 h-4 mr-2" /> },
    { value: 'Prêt Participatif', label: 'Prêt Participatif', icon: <Building2 className="w-4 h-4 mr-2" /> }
  ];

  const repaymentFrequencyOptions = ['Mensuelle', 'Trimestrielle', 'Semestrielle', 'Annuelle'];

  const statusOptions = [
    { value: 'demande_en_cours', label: 'Demande en cours', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'accorde', label: 'Accordé', color: 'bg-blue-100 text-blue-800' },
    { value: 'en_cours_remboursement', label: 'En cours de remboursement', color: 'bg-green-100 text-green-800' },
    { value: 'rembourse', label: 'Remboursé', color: 'bg-gray-100 text-gray-800' },
    { value: 'refuse', label: 'Refusé', color: 'bg-red-100 text-red-800' }
  ];

  const remainingCapital = (formData.initialAmount || 0) - (formData.capitalRepaidToDate || 0);

  const resetForm = () => {
    setFormData({
      loanReference: '',
      lenderName: '',
      contactPerson: '',
      typeOfLoan: '',
      objectOfLoan: '',
      agreementDate: '',
      initialAmount: 0,
      interestRatePercentage: 0,
      durationYears: 0,
      repaymentFrequency: '',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      installmentAmount: 0,
      capitalRepaidToDate: 0,
      interestPaidToDate: 0,
      guarantees: '',
      specialConditions: '',
      status: 'demande_en_cours',
      nextInstallmentDate: '',
      notesInternal: '',
      internalResponsible: '',
      lastUpdate: new Date().toISOString().split('T')[0],
    });
    setEditingId(null);
    setShowForm(false);
  };

  const saveLoan = () => {
    if (!formData.loanReference || !formData.lenderName || !formData.initialAmount || !formData.startDate || !formData.status) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir les champs obligatoires (ID/Nom du Prêt, Organisme Prêteur, Montant Initial, Date de Déblocage, Statut).",
        variant: "destructive"
      });
      return;
    }

    const loan: Loan = {
      id: editingId || Date.now().toString(),
      loanReference: formData.loanReference,
      lenderName: formData.lenderName,
      contactPerson: formData.contactPerson || '',
      typeOfLoan: formData.typeOfLoan || '',
      objectOfLoan: formData.objectOfLoan || '',
      agreementDate: formData.agreementDate || '',
      initialAmount: formData.initialAmount || 0,
      interestRatePercentage: formData.interestRatePercentage,
      durationYears: formData.durationYears,
      repaymentFrequency: formData.repaymentFrequency || '',
      startDate: formData.startDate,
      endDate: formData.endDate || '',
      installmentAmount: formData.installmentAmount,
      capitalRepaidToDate: formData.capitalRepaidToDate || 0,
      interestPaidToDate: formData.interestPaidToDate || 0,
      guarantees: formData.guarantees || '',
      specialConditions: formData.specialConditions || '',
      status: formData.status,
      nextInstallmentDate: formData.nextInstallmentDate || '',
      notesInternal: formData.notesInternal || '',
      internalResponsible: formData.internalResponsible || '',
      lastUpdate: new Date().toISOString().split('T')[0]
    };

    let updatedLoans;
    if (editingId) {
      updatedLoans = loans.map(l => l.id === editingId ? loan : l);
    } else {
      updatedLoans = [...loans, loan];
    }

    setLoans(updatedLoans);
    setSavedLoans(updatedLoans);
    resetForm();

    toast({
      title: "Financement sauvegardé",
      description: `${loan.loanReference} a été ${editingId ? 'modifié' : 'ajouté'} avec succès.`,
    });
  };

  const editLoan = (loan: Loan) => {
    setFormData({
      ...loan,
      initialAmount: loan.initialAmount || 0,
      interestRatePercentage: loan.interestRatePercentage || 0,
      durationYears: loan.durationYears || 0,
      installmentAmount: loan.installmentAmount || 0,
      capitalRepaidToDate: loan.capitalRepaidToDate || 0,
      interestPaidToDate: loan.interestPaidToDate || 0,
    });
    setEditingId(loan.id);
    setShowForm(true);
  };

  const deleteLoan = (id: string) => {
    const updatedLoans = loans.filter(l => l.id !== id);
    setLoans(updatedLoans);
    setSavedLoans(updatedLoans);
    
    toast({
      title: "Financement supprimé",
      description: "Le financement a été supprimé avec succès.",
    });
  };

  const getStatusColor = (status: string) => {
    return statusOptions.find(s => s.value === status)?.color || 'bg-gray-100 text-gray-800';
  };

  const getStatsData = () => {
    const totalLoans = loans.length;
    const activeLoans = loans.filter(l => l.status === 'accorde' || l.status === 'en_cours_remboursement').length;
    const totalAmountCommitted = loans.reduce((sum, l) => sum + l.initialAmount, 0);
    const totalRemainingCapital = loans.reduce((sum, l) => {
      const currentRemaining = (l.initialAmount || 0) - (l.capitalRepaidToDate || 0);
      return sum + currentRemaining;
    }, 0);
    
    const today = new Date().toISOString().split('T')[0];
    const nextPaymentLoan = loans
      .filter(l => (l.status === 'accorde' || l.status === 'en_cours_remboursement') && l.nextInstallmentDate && l.nextInstallmentDate >= today)
      .sort((a, b) => (a.nextInstallmentDate || '').localeCompare(b.nextInstallmentDate || ''))[0];

    return { 
      totalLoans, 
      activeLoans, 
      totalAmountCommitted,
      totalRemainingCapital,
      nextPaymentDate: nextPaymentLoan ? nextPaymentLoan.nextInstallmentDate : null,
      nextPaymentLender: nextPaymentLoan ? nextPaymentLoan.lenderName : null,
      nextPaymentLoanReference: nextPaymentLoan ? nextPaymentLoan.loanReference : null,
    };
  };

  const stats = getStatsData();

  const exportToCSV = () => {
    if (loans.length === 0) {
      toast({
        title: "Export impossible",
        description: "Aucun dossier de prêt à exporter.",
        variant: "destructive"
      });
      return;
    }

    const headers = [
      "ID Prêt",
      "Nom du Prêt / Ligne de Crédit",
      "Organisme Prêteur",
      "Contact",
      "Type de Prêt",
      "Objet du Prêt",
      "Date Octroi",
      "Montant Initial du Prêt (€)",
      "Taux d'intérêt (%)",
      "Durée (années)",
      "Périodicité Remboursement",
      "Date de Déblocage",
      "Date de Fin Prévue",
      "Montant Échéance (€)",
      "Capital Remboursé à Date (€)",
      "Intérêts Payés à Date (€)",
      "Capital Restant Dû (€)",
      "Garanties",
      "Conditions Particulières",
      "Notes / Suivi",
      "Statut",
      "Prochaine Échéance",
      "Responsable Interne",
      "Dernière Mise à Jour"
    ];

    const rows = loans.map(loan => {
      const loanRemainingCapital = (loan.initialAmount || 0) - (loan.capitalRepaidToDate || 0);

      return [
        `"${loan.id}"`,
        `"${loan.loanReference.replace(/"/g, '""')}"`,
        `"${loan.lenderName.replace(/"/g, '""')}"`,
        `"${(loan.contactPerson || '').replace(/"/g, '""')}"`,
        `"${loan.typeOfLoan.replace(/"/g, '""')}"`,
        `"${loan.objectOfLoan.replace(/"/g, '""')}"`,
        loan.agreementDate,
        loan.initialAmount,
        loan.interestRatePercentage || '',
        loan.durationYears || '',
        `"${loan.repaymentFrequency.replace(/"/g, '""')}"`,
        loan.startDate,
        loan.endDate || '',
        loan.installmentAmount || '',
        loan.capitalRepaidToDate || 0,
        loan.interestPaidToDate || 0,
        parseFloat(loanRemainingCapital.toFixed(2)),
        `"${loan.guarantees.replace(/"/g, '""')}"`,
        `"${loan.specialConditions.replace(/"/g, '""')}"`,
        `"${loan.notesInternal.replace(/"/g, '""')}"`,
        `"${statusOptions.find(s => s.value === loan.status)?.label.replace(/"/g, '""')}"`,
        loan.nextInstallmentDate || '',
        `"${loan.internalResponsible.replace(/"/g, '""')}"`,
        loan.lastUpdate
      ];
    });

    const csvContent = [
      headers.join(';'),
      ...rows.map(row => row.join(';'))
    ].join('\n');

    const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csvContent], { type: 'text/csv;charset=utf-8-bom;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `suivi_prets_${new Date().toISOString().split('T')[0]}.csv`;
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
    const filePath = '/fichiers/TABLEAU DE SUIVI DES PRETS.xlsx';
    const a = document.createElement('a');
    a.href = filePath;
    a.download = `TABLEAU DE SUIVI DES PRETS.xlsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    toast({
      title: "Téléchargement Modèle",
      description: "Votre modèle Excel a été téléchargé.",
    });
  };

  return (
    <section id="suivi-prets" className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="flex items-center gap-3 mb-6 text-3xl font-bold text-[#3C5F58]">
        <Banknote className="w-8 h-8 text-[#3C5F58]" />
        Suivi des <span className="text-[#2E5941]">Financements</span> et Prêts
      </h1>
      
      <p className="mb-6 text-lg text-gray-700 leading-relaxed">
        Gérez et suivez l'ensemble des financements (prêts bancaires, prêts subordonnés, apports personnels, subventions de collectivités) reçus ou en cours de demande pour votre École de Production. Cet outil vous aide à <span className="font-bold">garder une trace de toutes les transactions de prêt</span>.
      </p>

      <div className="bg-gray-50 border-l-4 border-gray-200 text-gray-800 p-4 mb-6 rounded-md" role="alert">
        <h3 className="font-semibold text-lg mb-2">Conseil pour le suivi des prêts :</h3>
        <p className="text-sm leading-relaxed">
          Pour le suivi du capital restant dû, vous devrez régulièrement mettre à jour les champs "<span className="font-bold">Capital Remboursé à Date</span>" et "<span className="font-bold">Intérêts Payés à Date</span>" après chaque échéance de remboursement. Le "Capital Restant Dû" sera alors calculé automatiquement.
        </p>
        <div className="flex mt-4">
            <Button
                onClick={downloadExcelTemplate}
                className="bg-[#2E5941] hover:bg-[#3C5F58] text-white"
            >
                <File className="w-4 h-4 mr-2" />
                Télécharger le modèle Excel
            </Button>
        </div>
      </div>

      {/* Cartes de Statistiques */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <Card className="shadow-sm">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-[#3C5F58]">{stats.totalLoans}</div>
            <div className="text-sm text-gray-600">Total financements</div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-[#2E5941]">
              {stats.totalAmountCommitted.toLocaleString('fr-FR')} €
            </div>
            <div className="text-sm text-gray-600">Montant total initial</div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {stats.totalRemainingCapital.toLocaleString('fr-FR')} €
            </div>
            <div className="text-sm text-gray-600">Capital Restant Dû total</div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-4 text-center">
            {stats.nextPaymentDate ? (
              <>
                <div className="text-xl font-bold text-orange-600">
                  {new Date(stats.nextPaymentDate).toLocaleDateString('fr-FR')}
                </div>
                <div className="text-sm text-gray-600">
                  Prochaine échéance (<span className="font-semibold">{stats.nextPaymentLoanReference}</span>)
                </div>
              </>
            ) : (
              <>
                <div className="text-2xl font-bold text-gray-400">-</div>
                <div className="text-sm text-gray-600">Aucune échéance à venir</div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-[#3C5F58]">Liste des Financements</h2>
        <div className="flex gap-3">
          <Button
            onClick={exportToCSV}
            className="bg-[#2E5941] hover:bg-[#3C5F58] text-white"
            disabled={loans.length === 0}
          >
            <FileDown className="w-4 h-4 mr-2" />
            Exporter CSV
          </Button>
          <Button 
            onClick={() => { resetForm(); setShowForm(true); }}
            className="flex items-center gap-2 py-3 px-6 text-lg bg-[#2E5941] hover:bg-[#3C5F58] transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter un financement
          </Button>
        </div>
      </div>

      {showForm && (
        <Card className="mb-6 shadow-md">
          <CardHeader className="bg-gray-50 border-b">
            <CardTitle className="text-xl font-bold text-[#3C5F58] flex items-center gap-2">
              <Banknote className="w-5 h-5 text-orange-500" />
              {editingId ? 'Modifier un financement' : 'Ajouter un nouveau financement'}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {/* Section 1: Identification du Financement */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-bold text-[#3C5F58] mb-4">1. Identification du Financement</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="loan-reference" className="font-bold">ID / Nom du Prêt <span className="text-red-500">*</span></Label>
                  <Input
                    id="loan-reference"
                    value={formData.loanReference || ''}
                    onChange={(e) => setFormData({...formData, loanReference: e.target.value})}
                    placeholder="Ex: Prêt BPI Innovation 2025"
                  />
                </div>
                <div>
                  <Label htmlFor="lender-name" className="font-bold">Nom de l'organisme / Source <span className="text-red-500">*</span></Label>
                  <Input
                    id="lender-name"
                    value={formData.lenderName || ''}
                    onChange={(e) => setFormData({...formData, lenderName: e.target.value})}
                    placeholder="Ex: Banque XYZ, Région ABC"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <Label htmlFor="contact-person" className="font-bold">Personne de contact</Label>
                  <Input
                    id="contact-person"
                    value={formData.contactPerson || ''}
                    onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                    placeholder="Nom du contact chez le prêteur"
                  />
                </div>
                <div>
                  <Label htmlFor="object-of-loan" className="font-bold">Objet du Prêt</Label>
                  <Input
                    id="object-of-loan"
                    value={formData.objectOfLoan || ''}
                    onChange={(e) => setFormData({...formData, objectOfLoan: e.target.value})}
                    placeholder="Ex: Achat d'équipement, besoin en fonds de roulement"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Conditions Financières */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-bold text-[#3C5F58] mb-4">2. Conditions Financières</h3>
              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <Label className="font-bold">Type de Prêt <span className="text-red-500">*</span></Label>
                  <Select
                    value={formData.typeOfLoan || ''}
                    onValueChange={(value) => setFormData({...formData, typeOfLoan: value as any})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir un type de prêt" />
                    </SelectTrigger>
                    <SelectContent>
                      {loanTypesOptions.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center">
                            {type.icon} {type.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="initial-amount" className="font-bold">Montant Initial (€) <span className="text-red-500">*</span></Label>
                  <Input
                    id="initial-amount"
                    type="number"
                    value={formData.initialAmount || ''}
                    onChange={(e) => setFormData({...formData, initialAmount: parseFloat(e.target.value) || 0})}
                    placeholder="Ex: 100000"
                  />
                </div>
                <div>
                  <Label htmlFor="interest-rate-percentage" className="font-bold">Taux d'intérêt annuel (%)</Label>
                  <Input
                    id="interest-rate-percentage"
                    type="number"
                    step="0.01"
                    value={formData.interestRatePercentage || ''}
                    onChange={(e) => setFormData({...formData, interestRatePercentage: parseFloat(e.target.value) || 0})}
                    placeholder="Ex: 1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="duration-years" className="font-bold">Durée (années)</Label>
                  <Input
                    id="duration-years"
                    type="number"
                    value={formData.durationYears || ''}
                    onChange={(e) => setFormData({...formData, durationYears: parseFloat(e.target.value) || 0})}
                    placeholder="Ex: 7"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Suivi et Échéances */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-bold text-[#3C5F58] mb-4">3. Suivi et Échéances</h3>
              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="startDate" className="font-bold">Date de Déblocage <span className="text-red-500">*</span></Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate || ''}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="next-installment-date" className="font-bold">Prochaine Échéance</Label>
                  <Input
                    id="next-installment-date"
                    type="date"
                    value={formData.nextInstallmentDate || ''}
                    onChange={(e) => setFormData({...formData, nextInstallmentDate: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="capital-repaid-to-date" className="font-bold">Capital Remboursé à Date (€)</Label>
                  <Input
                    id="capital-repaid-to-date"
                    type="number"
                    step="any"
                    value={formData.capitalRepaidToDate || 0}
                    onChange={(e) => setFormData({...formData, capitalRepaidToDate: parseFloat(e.target.value) || 0})}
                    placeholder="Ex: 10000"
                  />
                </div>
                <div>
                  <Label htmlFor="remaining-capital" className="font-bold">Capital Restant Dû (€)</Label>
                  <Input
                    id="remaining-capital"
                    type="number"
                    value={parseFloat(remainingCapital.toFixed(2))}
                    readOnly
                    className="bg-gray-100"
                  />
                </div>
              </div>
            </div>

            {/* Section 4: Statut et Conditions */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-bold text-[#3C5F58] mb-4">4. Statut et Conditions</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="status" className="font-bold">Statut <span className="text-red-500">*</span></Label>
                  <Select
                    value={formData.status || 'demande_en_cours'}
                    onValueChange={(value) => setFormData({...formData, status: value as any})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner le statut" />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map(status => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="internal-responsible" className="font-bold">Responsable Interne</Label>
                  <Input
                    id="internal-responsible"
                    value={formData.internalResponsible || ''}
                    onChange={(e) => setFormData({...formData, internalResponsible: e.target.value})}
                    placeholder="Ex: Expert-comptable, Directeur..."
                  />
                </div>
              </div>
              <div className="mt-4">
                <Label htmlFor="notes-internal" className="font-bold">Notes / Suivi (pour le cabinet)</Label>
                <Textarea
                  id="notes-internal"
                  value={formData.notesInternal || ''}
                  onChange={(e) => setFormData({...formData, notesInternal: e.target.value})}
                  placeholder="Commentaires divers, rappels, contacts clés chez le prêteur, éléments à surveiller..."
                  rows={3}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button onClick={resetForm} variant="outline" className="text-red-500 hover:text-red-600 border-red-500">
                Annuler
              </Button>
              <Button onClick={saveLoan} className="bg-[#2E5941] hover:bg-[#3C5F58]">
                {editingId ? 'Modifier le financement' : 'Ajouter le financement'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Liste des financements */}
      <div className="grid gap-4 mt-8">
        {loans.length > 0 ? (
          loans.map(loan => {
            const loanRemainingCapital = (loan.initialAmount || 0) - (loan.capitalRepaidToDate || 0);

            return (
              <Card key={loan.id} className="shadow-sm hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-800">{loan.loanReference}</h3>
                        <Badge className={getStatusColor(loan.status)}>
                          {statusOptions.find(s => s.value === loan.status)?.label}
                        </Badge>
                        <Badge variant="outline" className="text-sm">
                          {loan.typeOfLoan}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-1"><span className="font-semibold">Organisme :</span> {loan.lenderName}</p>
                      <p className="text-gray-600 mb-1"><span className="font-semibold">Montant initial :</span> {loan.initialAmount?.toLocaleString('fr-FR')} €</p>
                      <p className="text-2xl font-bold text-red-600 mt-2">
                        {parseFloat(loanRemainingCapital.toFixed(2)).toLocaleString('fr-FR')} €
                      </p>
                      <p className="text-sm text-gray-600">Capital Restant Dû</p>
                      {loan.nextInstallmentDate && (
                        <p className="text-sm text-gray-600 flex items-center gap-1 mt-2">
                          <CalendarDays className="w-4 h-4 text-gray-500" /> <span className="font-semibold">Prochaine échéance :</span> {new Date(loan.nextInstallmentDate).toLocaleDateString('fr-FR')}
                        </p>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => editLoan(loan)}>
                        <Edit className="w-4 h-4 mr-2" /> Modifier
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => deleteLoan(loan.id)}>
                        <Trash2 className="w-4 h-4 mr-2" /> Supprimer
                      </Button>
                    </div>
                  </div>
                  {loan.objectOfLoan && <p className="text-sm text-gray-500 italic mb-2"><span className="font-semibold">Objet :</span> {loan.objectOfLoan}</p>}
                  {loan.notesInternal && <p className="text-sm text-gray-500 italic">Notes : {loan.notesInternal}</p>}
                  <p className="text-xs text-gray-400 mt-2">Dernière mise à jour : {new Date(loan.lastUpdate).toLocaleDateString('fr-FR')}</p>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <div className="text-center text-gray-500 p-8 border-2 border-dashed rounded-lg mt-8">
            <p>Aucun financement enregistré pour le moment. Cliquez sur "<span className="font-bold">Ajouter un financement</span>" pour commencer.</p>
          </div>
        )}
      </div>
    </section>
  );
}