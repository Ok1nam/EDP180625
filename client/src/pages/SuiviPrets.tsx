// client/src/pages/SuiviPrets.tsx

import { useState } from "react";
import { Plus, Banknote, Building2, CalendarDays, Percent, TrendingUp, HandCoins, ArrowRightFromLine, Wallet, Hourglass } from "lucide-react"; // Icônes pertinentes
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
  lenderName: string; // Nom de l'organisme prêteur / source de financement
  contactPerson?: string; // Personne de contact (optionnel)
  loanType: 'bancaire' | 'subordonne' | 'apport_personnel' | 'collectivite' | 'autre'; // Type de financement
  amount: number; // Montant total
  interestRate?: number; // Taux d'intérêt annuel (pour les prêts)
  startDate: string; // Date de déblocage / accord
  endDate?: string; // Date de fin de remboursement prévue
  monthlyPayment?: number; // Montant de la mensualité (pour les prêts)
  status: 'demande_en_cours' | 'accorde' | 'en_cours_remboursement' | 'rembourse' | 'refuse'; // Statut
  notes?: string;
  nextPaymentDate?: string; // Prochaine échéance de paiement
  lastUpdate: string; // Date de dernière mise à jour de l'entrée
}

export default function SuiviPrets() {
  const { toast } = useToast();
  const [savedLoans, setSavedLoans] = useLocalStorage<Loan[]>('loans_data', []);
  const [loans, setLoans] = useState<Loan[]>(savedLoans);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Loan>>({});

  const loanTypes = [
    { value: 'bancaire', label: 'Prêt Bancaire', icon: <Banknote className="w-4 h-4 mr-2" /> },
    { value: 'subordonne', label: 'Prêt Subordonné', icon: <HandCoins className="w-4 h-4 mr-2" /> },
    { value: 'apport_personnel', label: 'Apport Personnel', icon: <Wallet className="w-4 h-4 mr-2" /> },
    { value: 'collectivite', label: 'Financement Collectivité', icon: <Building2 className="w-4 h-4 mr-2" /> },
    { value: 'autre', label: 'Autre Financement', icon: <Hourglass className="w-4 h-4 mr-2" /> }
  ];

  const statusOptions = [
    { value: 'demande_en_cours', label: 'Demande en cours', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'accorde', label: 'Accordé', color: 'bg-blue-100 text-blue-800' },
    { value: 'en_cours_remboursement', label: 'En cours de remboursement', color: 'bg-green-100 text-green-800' },
    { value: 'rembourse', label: 'Remboursé', color: 'bg-gray-100 text-gray-800' },
    { value: 'refuse', label: 'Refusé', color: 'bg-red-100 text-red-800' }
  ];

  const resetForm = () => {
    setFormData({
      loanType: 'bancaire',
      status: 'demande_en_cours',
      amount: 0,
      interestRate: 0,
      monthlyPayment: 0,
      startDate: new Date().toISOString().split('T')[0], // Set default start date to today
    });
    setEditingId(null);
    setShowForm(false);
  };

  const saveLoan = () => {
    if (!formData.lenderName || !formData.amount || !formData.startDate) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir les champs obligatoires (Nom du prêteur, Montant, Date de début).",
      });
      return;
    }

    const loan: Loan = {
      id: editingId || Date.now().toString(),
      lenderName: formData.lenderName || '',
      contactPerson: formData.contactPerson || '',
      loanType: formData.loanType || 'bancaire',
      amount: formData.amount || 0,
      interestRate: formData.interestRate,
      startDate: formData.startDate || '',
      endDate: formData.endDate || '',
      monthlyPayment: formData.monthlyPayment,
      status: formData.status || 'demande_en_cours',
      notes: formData.notes || '',
      nextPaymentDate: formData.nextPaymentDate || '',
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
      description: `${loan.lenderName} a été ${editingId ? 'modifié' : 'ajouté'} avec succès.`,
    });
  };

  const editLoan = (loan: Loan) => {
    setFormData(loan);
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
    const totalAmountCommitted = loans.reduce((sum, l) => sum + l.amount, 0);
    
    // Trouver la prochaine échéance la plus proche pour un prêt actif
    const today = new Date().toISOString().split('T')[0];
    const nextPaymentLoan = loans
      .filter(l => (l.status === 'accorde' || l.status === 'en_cours_remboursement') && l.nextPaymentDate && l.nextPaymentDate >= today)
      .sort((a, b) => (a.nextPaymentDate || '').localeCompare(b.nextPaymentDate || ''))[0];

    return { 
      totalLoans, 
      activeLoans, 
      totalAmountCommitted,
      nextPaymentDate: nextPaymentLoan ? nextPaymentLoan.nextPaymentDate : null,
      nextPaymentLender: nextPaymentLoan ? nextPaymentLoan.lenderName : null,
    };
  };

  const stats = getStatsData();

  return (
    <section id="suivi-prets" className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="flex items-center gap-3 mb-6 text-3xl font-bold text-gray-800">
        <Banknote className="w-8 h-8 text-green-600" />
        Suivi des Financements et Prêts
      </h1>
      
      <p className="mb-6 text-lg text-gray-700 leading-relaxed">
        Gérez et suivez l'ensemble des financements (prêts bancaires, prêts subordonnés, apports personnels, subventions de collectivités) reçus ou en cours de demande pour votre École de Production.
      </p>

      {/* Cartes de Statistiques */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <Card className="shadow-sm">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.totalLoans}</div>
            <div className="text-sm text-gray-600">Financements enregistrés</div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {stats.totalAmountCommitted.toLocaleString('fr-FR')} €
            </div>
            <div className="text-sm text-gray-600">Montant total engagé</div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.activeLoans}</div>
            <div className="text-sm text-gray-600">Financements actifs</div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-4 text-center">
            {stats.nextPaymentDate ? (
              <>
                <div className="text-2xl font-bold text-red-600">
                  {new Date(stats.nextPaymentDate).toLocaleDateString('fr-FR')}
                </div>
                <div className="text-sm text-gray-600">Prochaine échéance ({stats.nextPaymentLender})</div>
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
        <Button 
          onClick={() => { resetForm(); setShowForm(true); }}
          className="btn-primary flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Ajouter un financement
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6 shadow-lg">
          <CardHeader className="bg-gray-50 border-b">
            <CardTitle className="text-xl font-bold text-gray-700">{editingId ? 'Modifier' : 'Nouveau'} Financement</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="lender-name">Nom de l'organisme / Source *</Label>
                <Input
                  id="lender-name"
                  value={formData.lenderName || ''}
                  onChange={(e) => setFormData({...formData, lenderName: e.target.value})}
                  placeholder="Ex: Banque XYZ, Région ABC, M. Dupont"
                />
              </div>
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

            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <Label>Type de financement *</Label>
                <Select
                  value={formData.loanType || 'bancaire'}
                  onValueChange={(value) => setFormData({...formData, loanType: value as any})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {loanTypes.map(type => (
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
                <Label htmlFor="amount">Montant Total (€) *</Label>
                <Input
                  id="amount"
                  type="number"
                  value={formData.amount || ''}
                  onChange={(e) => setFormData({...formData, amount: parseFloat(e.target.value) || 0})}
                  placeholder="Ex: 100000"
                />
              </div>
              <div>
                <Label htmlFor="interest-rate">Taux d'intérêt annuel (%)</Label>
                <Input
                  id="interest-rate"
                  type="number"
                  step="0.01"
                  value={formData.interestRate || ''}
                  onChange={(e) => setFormData({...formData, interestRate: parseFloat(e.target.value) || 0})}
                  placeholder="Ex: 1.5"
                />
              </div>
              <div>
                <Label htmlFor="monthly-payment">Mensualité (€)</Label>
                <Input
                  id="monthly-payment"
                  type="number"
                  step="any"
                  value={formData.monthlyPayment || ''}
                  onChange={(e) => setFormData({...formData, monthlyPayment: parseFloat(e.target.value) || 0})}
                  placeholder="Ex: 850.25"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="start-date">Date de Déblocage / Accord *</Label>
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
                <Label htmlFor="next-payment-date">Prochaine Échéance</Label>
                <Input
                  id="next-payment-date"
                  type="date"
                  value={formData.nextPaymentDate || ''}
                  onChange={(e) => setFormData({...formData, nextPaymentDate: e.target.value})}
                />
              </div>
            </div>

            <div>
              <Label>Statut *</Label>
              <Select
                value={formData.status || 'demande_en_cours'}
                onValueChange={(value) => setFormData({...formData, status: value as any})}
              >
                <SelectTrigger>
                  <SelectValue />
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
              <Label htmlFor="notes">Notes complémentaires</Label>
              <Textarea
                id="notes"
                value={formData.notes || ''}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                placeholder="Conditions spécifiques, historique des échanges..."
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
          loans.map(loan => (
            <Card key={loan.id} className="card-hover transition-shadow duration-200 hover:shadow-lg">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">{loan.lenderName}</h3>
                      <Badge className={getStatusColor(loan.status)}>
                        {statusOptions.find(s => s.value === loan.status)?.label}
                      </Badge>
                      <Badge variant="outline" className="text-sm">
                        {loanTypes.find(t => t.value === loan.loanType)?.label}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      {loan.contactPerson && (
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-gray-500" />
                          Contact: {loan.contactPerson}
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <CalendarDays className="w-4 h-4 text-gray-500" />
                        Débloqué le: {new Date(loan.startDate).toLocaleDateString('fr-FR')}
                        {loan.endDate && ` (Fin prévue: ${new Date(loan.endDate).toLocaleDateString('fr-FR')})`}
                      </div>
                      {(loan.loanType === 'bancaire' || loan.loanType === 'subordonne') && loan.interestRate !== undefined && (
                        <div className="flex items-center gap-2">
                          <Percent className="w-4 h-4 text-gray-500" />
                          Taux: {loan.interestRate.toLocaleString('fr-FR')}% annuel
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">{loan.amount.toLocaleString('fr-FR')} €</div>
                    <div className="text-xs text-gray-600">Montant total</div>
                    {loan.monthlyPayment !== undefined && (
                      <div className="text-sm text-gray-600">{loan.monthlyPayment.toLocaleString('fr-FR')} €/mois</div>
                    )}
                  </div>
                </div>

                {loan.notes && (
                  <div className="bg-gray-50 p-3 rounded-lg mb-3">
                    <p className="text-sm italic text-gray-700">{loan.notes}</p>
                  </div>
                )}

                {loan.nextPaymentDate && (loan.status === 'accorde' || loan.status === 'en_cours_remboursement') && (
                  <div className="flex items-center gap-2 text-sm text-red-600 mb-3 font-medium">
                    <ArrowRightFromLine className="w-4 h-4" />
                    Prochaine échéance: {new Date(loan.nextPaymentDate).toLocaleDateString('fr-FR')}
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
          ))
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