import { useState } from "react";
import { Plus, Banknote, Building2, CalendarDays, Percent, TrendingUp, HandCoins, ArrowRightFromLine, Wallet, Hourglass, FileText, Download, FileDown, File } from "lucide-react"; // Ajout de FileText, Download, FileDown, File pour l'export
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useToast } from "@/hooks/use-toast";

// Interface pour un prêt ou un financement - MISE À JOUR
interface Loan {
  id: string;
  loanReference: string; // ID / Nom unique pour identifier le prêt (Nom du Prêt / Ligne de Crédit)
  lenderName: string; // Nom de l'organisme prêteur / source de financement
  typeOfLoan: 'Amortissable' | 'In Fine' | 'Ligne de Trésorerie / Découvert' | 'Prêt d\'Honneur' | 'Prêt Participatif' | ''; // Type de Prêt
  objectOfLoan: string; // Objet du Prêt
  agreementDate: string; // Date Octroi
  initialAmount: number; // Montant Initial du Prêt
  interestRatePercentage?: number; // Taux d'intérêt annuel (%)
  durationYears?: number; // Durée (années)
  repaymentFrequency: 'Mensuelle' | 'Trimestrielle' | 'Semestrielle' | 'Annuelle' | ''; // Périodicité Remboursement
  startDate: string; // Date de déblocage (anciennement startDate)
  endDate?: string; // Date de fin de remboursement prévue
  installmentAmount?: number; // Montant de l'échéance (anciennement monthlyPayment)
  capitalRepaidToDate: number; // Capital Remboursé à Date
  interestPaidToDate: number; // Intérêts Payés à Date
  // remainingCapital: number; // CHAMP CALCULÉ, NE PAS STOCKER
  guarantees: string; // Garanties
  specialConditions: string; // Conditions Particulières
  status: 'demande_en_cours' | 'accorde' | 'en_cours_remboursement' | 'rembourse' | 'refuse' | ''; // Statut
  nextInstallmentDate?: string; // Prochaine échéance de paiement (anciennement nextPaymentDate)
  notesInternal: string; // Notes / Suivi
  internalResponsible: string; // Responsable Interne
  lastUpdate: string; // Date de dernière mise à jour de l'entrée
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
    typeOfLoan: '',
    objectOfLoan: '',
    agreementDate: '',
    initialAmount: 0,
    interestRatePercentage: 0,
    durationYears: 0,
    repaymentFrequency: '',
    startDate: new Date().toISOString().split('T')[0], // Date de déblocage par défaut à aujourd'hui
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

  // Calcul du Capital Restant Dû
  const remainingCapital = (formData.initialAmount || 0) - (formData.capitalRepaidToDate || 0);

  const resetForm = () => {
    setFormData({
      loanReference: '',
      lenderName: '',
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
      lastUpdate: new Date().toISOString().split('T')[0] // Date de dernière mise à jour
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
      ...loan, // Copie toutes les propriétés existantes
      // Assurez-vous que les champs numériques sont bien des nombres
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
    const totalAmountCommitted = loans.reduce((sum, l) => sum + l.initialAmount, 0); // Utilise initialAmount

    // Calcul du capital restant dû total
    const totalRemainingCapital = loans.reduce((sum, l) => {
      const currentRemaining = (l.initialAmount || 0) - (l.capitalRepaidToDate || 0);
      return sum + currentRemaining;
    }, 0);
    
    // Trouver la prochaine échéance la plus proche pour un prêt actif
    const today = new Date().toISOString().split('T')[0];
    const nextPaymentLoan = loans
      .filter(l => (l.status === 'accorde' || l.status === 'en_cours_remboursement') && l.nextInstallmentDate && l.nextInstallmentDate >= today)
      .sort((a, b) => (a.nextInstallmentDate || '').localeCompare(b.nextInstallmentDate || ''))[0];

    return { 
      totalLoans, 
      activeLoans, 
      totalAmountCommitted,
      totalRemainingCapital, // Ajout de la stat du capital restant dû total
      nextPaymentDate: nextPaymentLoan ? nextPaymentLoan.nextInstallmentDate : null,
      nextPaymentLender: nextPaymentLoan ? nextPaymentLoan.lenderName : null,
      nextPaymentLoanReference: nextPaymentLoan ? nextPaymentLoan.loanReference : null, // Ajout de la référence du prêt
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

    // Définir les en-têtes (colonnes) du fichier CSV, correspondant à votre tableau Excel
    const headers = [
      "ID Prêt",
      "Nom du Prêt / Ligne de Crédit",
      "Organisme Prêteur",
      "Type de Prêt",
      "Objet du Prêt",
      "Date Octroi",
      "Montant Initial du Prêt (€)",
      "Taux d'intérêt (%)",
      "Durée (années)",
      "Périodicité Remboursement",
      "Date de Déblocage", // Ancien "startDate"
      "Date de Fin Prévue", // Ancien "endDate"
      "Montant Échéance (€)", // Ancien "monthlyPayment"
      "Capital Remboursé à Date (€)",
      "Intérêts Payés à Date (€)",
      "Capital Restant Dû (€)", // CALCULÉ POUR L'EXPORT
      "Garanties",
      "Conditions Particulières",
      "Notes / Suivi",
      "Statut",
      "Prochaine Échéance",
      "Responsable Interne",
      "Dernière Mise à Jour"
    ];

    const rows = loans.map(loan => {
      // Calculer le capital restant dû pour l'export
      const loanRemainingCapital = (loan.initialAmount || 0) - (loan.capitalRepaidToDate || 0);

      return [
        `"${loan.id}"`, // Utiliser l'ID interne ou une référence si différente
        `"${loan.loanReference.replace(/"/g, '""')}"`,
        `"${loan.lenderName.replace(/"/g, '""')}"`,
        `"${loan.typeOfLoan.replace(/"/g, '""')}"`,
        `"${loan.objectOfLoan.replace(/"/g, '""')}"`,
        loan.agreementDate,
        loan.initialAmount,
        loan.interestRatePercentage || '', // Gérer les valeurs optionnelles
        loan.durationYears || '',
        `"${loan.repaymentFrequency.replace(/"/g, '""')}"`,
        loan.startDate,
        loan.endDate || '',
        loan.installmentAmount || '',
        loan.capitalRepaidToDate || 0,
        loan.interestPaidToDate || 0,
        parseFloat(loanRemainingCapital.toFixed(2)), // Formatage du calcul
        `"${loan.guarantees.replace(/"/g, '""')}"`,
        `"${loan.specialConditions.replace(/"/g, '""')}"`,
        `"${loan.notesInternal.replace(/"/g, '""')}"`,
        `"${statusOptions.find(s => s.value === loan.status)?.label.replace(/"/g, '""')}"`, // Exporter le label du statut
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
    const headers = [
      "ID Prêt",
      "Nom du Prêt / Ligne de Crédit",
      "Organisme Prêteur",
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

    const csvContent = new Uint8Array([0xEF, 0xBB, 0xBF]) + headers.join(';');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8-bom;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `modele_suivi_prets.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Téléchargement Modèle",
      description: "Le modèle Excel a été téléchargé.",
    });
  };


  return (
    <section id="suivi-prets" className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="flex items-center gap-3 mb-6 text-3xl font-bold text-gray-800">
        <Banknote className="w-8 h-8 text-green-600" />
        Suivi des Financements et Prêts
      </h1>
      
      <p className="mb-6 text-lg text-gray-700 leading-relaxed">
        Gérez et suivez l'ensemble des financements (prêts bancaires, prêts subordonnés, apports personnels, subventions de collectivités) reçus ou en cours de demande pour votre École de Production.
      </p>

      <div className="bg-blue-50 border-l-4 border-blue-200 text-blue-800 p-4 mb-6" role="alert">
        <h3 className="font-semibold text-lg mb-2">Conseil pour le suivi des prêts :</h3>
        <p className="text-sm leading-relaxed">
          Pour le suivi du capital restant dû, vous devrez régulièrement mettre à jour les champs "Capital Remboursé à Date" et "Intérêts Payés à Date" après chaque échéance de remboursement. Le "Capital Restant Dû" sera alors calculé automatiquement.
        </p>
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

      {/* Cartes de Statistiques */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <Card className="shadow-sm">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.totalLoans}</div>
            <div className="text-sm text-gray-600">Total financements</div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {stats.totalAmountCommitted.toLocaleString('fr-FR')} €
            </div>
            <div className="text-sm text-gray-600">Montant total initial</div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {stats.totalRemainingCapital.toLocaleString('fr-FR')} €
            </div>
            <div className="text-sm text-gray-600">Capital Restant Dû total</div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-4 text-center">
            {stats.nextPaymentDate ? (
              <>
                <div className="text-2xl font-bold text-red-600">
                  {new Date(stats.nextPaymentDate).toLocaleDateString('fr-FR')}
                </div>
                <div className="text-sm text-gray-600">
                  Prochaine échéance ({stats.nextPaymentLoanReference})
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
        <h2 className="text-xl font-semibold text-gray-800">Liste des Financements</h2>
        <div className="flex gap-3">
          <Button
            onClick={exportToCSV}
            className="btn-secondary"
            disabled={loans.length === 0}
          >
            <FileDown className="w-4 h-4 mr-2" />
            Exporter CSV
          </Button>
          <Button 
            onClick={() => { resetForm(); setShowForm(true); }}
            className="btn-primary flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter un financement
          </Button>
        </div>
      </div>

      {showForm && (
        <Card className="mb-6 shadow-lg">
          <CardHeader className="bg-gray-50 border-b">
            <CardTitle className="text-xl font-bold text-gray-700">{editingId ? 'Modifier' : 'Nouveau'} Financement</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {/* Nom du Prêt / Ligne de Crédit */}
            <div>
              <Label htmlFor="loan-reference">ID / Nom du Prêt *</Label>
              <Input
                id="loan-reference"
                value={formData.loanReference || ''}
                onChange={(e) => setFormData({...formData, loanReference: e.target.value})}
                placeholder="Ex: Prêt BPI Innovation 2025"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Organisme Prêteur */}
              <div>
                <Label htmlFor="lender-name">Nom de l'organisme / Source *</Label>
                <Input
                  id="lender-name"
                  value={formData.lenderName || ''}
                  onChange={(e) => setFormData({...formData, lenderName: e.target.value})}
                  placeholder="Ex: Banque XYZ, Région ABC, M. Dupont"
                />
              </div>
              {/* Personne de contact */}
              <div>
                <Label htmlFor="contact-person">Personne de contact (optionnel)</Label>
                <Input
                  id="contact-person"
                  value={formData.contactPerson || ''}
                  onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                  placeholder="Nom du contact chez le prêteur"
                />
              </div>
            </div>

            {/* Type de Prêt & Objet du Prêt */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Type de Prêt *</Label>
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
                <Label htmlFor="object-of-loan">Objet du Prêt</Label>
                <Input
                  id="object-of-loan"
                  value={formData.objectOfLoan || ''}
                  onChange={(e) => setFormData({...formData, objectOfLoan: e.target.value})}
                  placeholder="Ex: Achat d'équipement, besoin en fonds de roulement"
                />
              </div>
            </div>

            {/* Montant Initial, Taux d'intérêt, Durée, Périodicité */}
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="initial-amount">Montant Initial du Prêt (€) *</Label>
                <Input
                  id="initial-amount"
                  type="number"
                  value={formData.initialAmount || ''}
                  onChange={(e) => setFormData({...formData, initialAmount: parseFloat(e.target.value) || 0})}
                  placeholder="Ex: 100000"
                />
              </div>
              <div>
                <Label htmlFor="interest-rate-percentage">Taux d'intérêt annuel (%)</Label>
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
                <Label htmlFor="duration-years">Durée (années)</Label>
                <Input
                  id="duration-years"
                  type="number"
                  value={formData.durationYears || ''}
                  onChange={(e) => setFormData({...formData, durationYears: parseFloat(e.target.value) || 0})}
                  placeholder="Ex: 7"
                />
              </div>
              <div>
                <Label>Périodicité Remboursement</Label>
                <Select
                  value={formData.repaymentFrequency || ''}
                  onValueChange={(value) => setFormData({...formData, repaymentFrequency: value as any})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir une périodicité" />
                  </SelectTrigger>
                  <SelectContent>
                    {repaymentFrequencyOptions.map(freq => (
                      <SelectItem key={freq} value={freq}>
                        {freq}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Dates : Octroi, Déblocage, Fin Prévue, Prochaine Échéance */}
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="agreement-date">Date Octroi</Label>
                <Input
                  id="agreement-date"
                  type="date"
                  value={formData.agreementDate || ''}
                  onChange={(e) => setFormData({...formData, agreementDate: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="start-date">Date de Déblocage *</Label>
                <Input
                  id="start-date"
                  type="date"
                  value={formData.startDate || ''}
                  onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="end-date">Date de Fin Prévue</Label>
                <Input
                  id="end-date"
                  type="date"
                  value={formData.endDate || ''}
                  onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="next-installment-date">Prochaine Échéance</Label>
                <Input
                  id="next-installment-date"
                  type="date"
                  value={formData.nextInstallmentDate || ''}
                  onChange={(e) => setFormData({...formData, nextInstallmentDate: e.target.value})}
                />
              </div>
            </div>

            {/* Montant Échéance, Capital Remboursé, Intérêts Payés, Capital Restant Dû (CALCULÉ) */}
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="installment-amount">Montant Échéance (€)</Label>
                <Input
                  id="installment-amount"
                  type="number"
                  step="any"
                  value={formData.installmentAmount || ''}
                  onChange={(e) => setFormData({...formData, installmentAmount: parseFloat(e.target.value) || 0})}
                  placeholder="Ex: 850.25"
                />
              </div>
              <div>
                <Label htmlFor="capital-repaid-to-date">Capital Remboursé à Date (€)</Label>
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
                <Label htmlFor="interest-paid-to-date">Intérêts Payés à Date (€)</Label>
                <Input
                  id="interest-paid-to-date"
                  type="number"
                  step="any"
                  value={formData.interestPaidToDate || 0}
                  onChange={(e) => setFormData({...formData, interestPaidToDate: parseFloat(e.target.value) || 0})}
                  placeholder="Ex: 500"
                />
              </div>
              <div>
                <Label htmlFor="remaining-capital">Capital Restant Dû (€)</Label>
                <Input
                  id="remaining-capital"
                  type="number"
                  value={parseFloat(remainingCapital.toFixed(2))} // Calculé ici
                  readOnly
                  className="bg-gray-100"
                />
              </div>
            </div>

            {/* Garanties & Conditions Particulières */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="guarantees">Garanties</Label>
                <Textarea
                  id="guarantees"
                  value={formData.guarantees || ''}
                  onChange={(e) => setFormData({...formData, guarantees: e.target.value})}
                  placeholder="Ex: Caution personnelle, hypothèque, gage sur matériel..."
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="special-conditions">Conditions Particulières</Label>
                <Textarea
                  id="special-conditions"
                  value={formData.specialConditions || ''}
                  onChange={(e) => setFormData({...formData, specialConditions: e.target.value})}
                  placeholder="Ex: Clauses spécifiques du contrat, clause de révision de taux..."
                  rows={3}
                />
              </div>
            </div>

            {/* Statut, Notes / Suivi, Responsable Interne */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Statut *</Label>
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
                <Label htmlFor="internal-responsible">Responsable Interne</Label>
                <Input
                  id="internal-responsible"
                  value={formData.internalResponsible || ''}
                  onChange={(e) => setFormData({...formData, internalResponsible: e.target.value})}
                  placeholder="Ex: Expert-comptable, Directeur..."
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="notes-internal">Notes / Suivi (pour le cabinet)</Label>
              <Textarea
                id="notes-internal"
                value={formData.notesInternal || ''}
                onChange={(e) => setFormData({...formData, notesInternal: e.target.value})}
                placeholder="Commentaires divers, rappels, contacts clés chez le prêteur, éléments à surveiller..."
                rows={3}
              />
            </div>

            <div className="flex gap-3">
              <Button onClick={saveLoan} className="btn-primary">
                {editingId ? 'Modifier le financement' : 'Ajouter le financement'}
              </Button>
              <Button onClick={resetForm} variant="outline" className="btn-secondary">
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Liste des financements */}
      <div className="grid gap-4">
        {loans.length > 0 ? (
          loans.map(loan => {
            // Calcul du capital restant dû pour l'affichage de chaque carte
            const loanRemainingCapital = (loan.initialAmount || 0) - (loan.capitalRepaidToDate || 0);

            return (
              <Card key={loan.id} className="card-hover transition-shadow duration-200 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{loan.loanReference}</h3>
                        <Badge className={getStatusColor(loan.status)}>
                          {statusOptions.find(s => s.value === loan.status)?.label}
                        </Badge>
                        <Badge variant="outline" className="text-sm">
                          {loan.typeOfLoan}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-gray-500" />
                          Organisme: {loan.lenderName} {loan.contactPerson && `(Contact: ${loan.contactPerson})`}
                        </div>
                        <div className="flex items-center gap-2">
                          <CalendarDays className="w-4 h-4 text-gray-500" />
                          Octroi: {loan.agreementDate ? new Date(loan.agreementDate).toLocaleDateString('fr-FR') : 'N/A'} - Déblocage: {new Date(loan.startDate).toLocaleDateString('fr-FR')}
                          {loan.endDate && ` (Fin prévue: ${new Date(loan.endDate).toLocaleDateString('fr-FR')})`}
                        </div>
                        {loan.interestRatePercentage !== undefined && (
                          <div className="flex items-center gap-2">
                            <Percent className="w-4 h-4 text-gray-500" />
                            Taux: {loan.interestRatePercentage.toLocaleString('fr-FR')}% annuel {loan.durationYears && `(${loan.durationYears} ans)`} {loan.repaymentFrequency && `(${loan.repaymentFrequency})`}
                          </div>
                        )}
                        {loan.objectOfLoan && (
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-gray-500" />
                            Objet: {loan.objectOfLoan}
                          </div>
                        )}
                        {loan.guarantees && (
                          <div className="flex items-center gap-2">
                            <HandCoins className="w-4 h-4 text-gray-500" />
                            Garanties: {loan.guarantees}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">{loan.initialAmount.toLocaleString('fr-FR')} €</div>
                      <div className="text-xs text-gray-600">Montant Initial</div>
                      {loan.installmentAmount !== undefined && (
                        <div className="text-sm text-gray-600">{loan.installmentAmount.toLocaleString('fr-FR')} €/échéance</div>
                      )}
                      {loanRemainingCapital !== undefined && (
                        <div className="text-md font-semibold text-purple-600">Restant Dû: {parseFloat(loanRemainingCapital.toFixed(2)).toLocaleString('fr-FR')} €</div>
                      )}
                      {loan.capitalRepaidToDate !== undefined && (
                          <div className="text-sm text-gray-600">Capital remboursé: {loan.capitalRepaidToDate.toLocaleString('fr-FR')} €</div>
                      )}
                      {loan.interestPaidToDate !== undefined && (
                          <div className="text-sm text-gray-600">Intérêts payés: {loan.interestPaidToDate.toLocaleString('fr-FR')} €</div>
                      )}
                    </div>
                  </div>

                  {loan.specialConditions && (
                    <div className="bg-blue-50 p-3 rounded-lg mb-3 border border-blue-200">
                      <p className="text-sm italic text-blue-800">
                        <span className="font-semibold">Conditions Particulières:</span> {loan.specialConditions}
                      </p>
                    </div>
                  )}

                  {loan.notesInternal && (
                    <div className="bg-gray-50 p-3 rounded-lg mb-3">
                      <p className="text-sm italic text-gray-700">
                        <span className="font-semibold">Notes / Suivi:</span> {loan.notesInternal}
                      </p>
                    </div>
                  )}

                  {loan.nextInstallmentDate && (loan.status === 'accorde' || loan.status === 'en_cours_remboursement') && (
                    <div className="flex items-center gap-2 text-sm text-red-600 mb-3 font-medium">
                      <ArrowRightFromLine className="w-4 h-4" />
                      Prochaine échéance: {new Date(loan.nextInstallmentDate).toLocaleDateString('fr-FR')}
                    </div>
                  )}
                   <div className="flex justify-between items-center text-xs text-gray-500">
                      <div>
                          Dernière mise à jour: {new Date(loan.lastUpdate).toLocaleDateString('fr-FR')}
                      </div>
                      <div className="flex gap-2">
                          <Button
                              onClick={() => editLoan(loan)}
                              className="btn-secondary text-xs px-3 py-1"
                              variant="outline"
                          >
                              Modifier
                          </Button>
                          <Button
                              onClick={() => deleteLoan(loan.id)}
                              className="btn-danger text-xs px-3 py-1"
                              variant="destructive"
                          >
                              Supprimer
                          </Button>
                      </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <Card>
            <CardContent className="p-8 text-center text-gray-500">
              <Banknote className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Aucun financement enregistré pour le moment.</p>
              <p className="text-sm">Cliquez sur "Ajouter un financement" pour commencer à suivre vos prêts.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}