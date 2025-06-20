// client/src/pages/SuiviSubventions.tsx

import { useState } from "react";
import { Plus, Handshake, CalendarDays, ClipboardCheck, DollarSign, Hourglass, CheckCircle2, XCircle, FileText } from "lucide-react"; // Icônes pertinentes
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useToast } from "@/hooks/use-toast";

// Interface pour une subvention
interface Subsidy {
  id: string;
  subsidyName: string; // Nom de la subvention (ex: Subvention Région XYZ)
  grantor: string; // Organisme subventionneur
  contactPerson?: string; // Personne de contact (optionnel)
  amountRequested: number; // Montant demandé
  amountGranted?: number; // Montant accordé (si différent)
  applicationDate: string; // Date de la demande
  decisionDate?: string; // Date de la décision
  paymentDate?: string; // Date du versement (peut être une seule ou la première)
  status: 'en_cours_demande' | 'demande_deposee' | 'en_attente_decision' | 'accordee' | 'versee' | 'refusee' | 'cloturee'; // Statut
  notes?: string;
  requiredDocuments?: string; // Documents à fournir / fournis
  lastUpdate: string; // Date de dernière mise à jour de l'entrée
}

interface SuiviSubventionsProps {
  navigate?: (page: string) => void;
}

const SuiviSubventions: React.FC<SuiviSubventionsProps> = ({ navigate }) => {
  const { toast } = useToast();
  const [savedSubsidies, setSavedSubsidies] = useLocalStorage<Subsidy[]>('subsidies_data', []);
  const [subsidies, setSubsidies] = useState<Subsidy[]>(savedSubsidies);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Subsidy>>({});

  const statusOptions = [
    { value: 'en_cours_demande', label: 'En cours de préparation', color: 'bg-gray-100 text-gray-800' },
    { value: 'demande_deposee', label: 'Demande déposée', color: 'bg-blue-100 text-blue-800' },
    { value: 'en_attente_decision', label: 'En attente de décision', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'accordee', label: 'Accordée', color: 'bg-green-100 text-green-800' },
    { value: 'versee', label: 'Versée', color: 'bg-purple-100 text-purple-800' },
    { value: 'refusee', label: 'Refusée', color: 'bg-red-100 text-red-800' },
    { value: 'cloturee', label: 'Clôturée', color: 'bg-slate-100 text-slate-800' }
  ];

  const resetForm = () => {
    setFormData({
      amountRequested: 0,
      amountGranted: undefined,
      applicationDate: new Date().toISOString().split('T')[0],
      status: 'en_cours_demande',
    });
    setEditingId(null);
    setShowForm(false);
  };

  const saveSubsidy = () => {
    if (!formData.subsidyName || !formData.grantor || !formData.amountRequested || !formData.applicationDate) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir les champs obligatoires (Nom de la subvention, Organisme, Montant demandé, Date de demande).",
        variant: "destructive"
      });
      return;
    }

    const subsidy: Subsidy = {
      id: editingId || Date.now().toString(),
      subsidyName: formData.subsidyName || '',
      grantor: formData.grantor || '',
      contactPerson: formData.contactPerson || '',
      amountRequested: formData.amountRequested || 0,
      amountGranted: formData.amountGranted,
      applicationDate: formData.applicationDate || '',
      decisionDate: formData.decisionDate || '',
      paymentDate: formData.paymentDate || '',
      status: formData.status || 'en_cours_demande',
      notes: formData.notes || '',
      requiredDocuments: formData.requiredDocuments || '',
      lastUpdate: new Date().toISOString().split('T')[0]
    };

    let updatedSubsidies;
    if (editingId) {
      updatedSubsidies = subsidies.map(s => s.id === editingId ? subsidy : s);
    } else {
      updatedSubsidies = [...subsidies, subsidy];
    }

    setSubsidies(updatedSubsidies);
    setSavedSubsidies(updatedSubsidies);
    resetForm();

    toast({
      title: "Subvention sauvegardée",
      description: `${subsidy.subsidyName} a été ${editingId ? 'modifiée' : 'ajoutée'} avec succès.`,
    });
  };

  const editSubsidy = (subsidy: Subsidy) => {
    setFormData(subsidy);
    setEditingId(subsidy.id);
    setShowForm(true);
  };

  const deleteSubsidy = (id: string) => {
    const updatedSubsidies = subsidies.filter(s => s.id !== id);
    setSubsidies(updatedSubsidies);
    setSavedSubsidies(updatedSubsidies);
    
    toast({
      title: "Subvention supprimée",
      description: "La subvention a été supprimée avec succès.",
      variant: "destructive"
    });
  };

  const getStatusColor = (status: string) => {
    return statusOptions.find(s => s.value === status)?.color || 'bg-gray-100 text-gray-800';
  };

  const getStatsData = () => {
    const totalApplications = subsidies.length;
    const pendingApplications = subsidies.filter(s => s.status === 'en_cours_demande' || s.status === 'demande_deposee' || s.status === 'en_attente_decision').length;
    const grantedApplications = subsidies.filter(s => s.status === 'accordee' || s.status === 'versee').length;
    const totalAmountGranted = subsidies.reduce((sum, s) => sum + (s.amountGranted || 0), 0);

    return { 
      totalApplications, 
      pendingApplications, 
      grantedApplications,
      totalAmountGranted 
    };
  };

  const stats = getStatsData();

  return (
    <section id="suivi-subventions" className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="flex items-center gap-3 mb-6 text-3xl font-bold text-gray-800">
        <DollarSign className="w-8 h-8 text-green-600" /> {/* Icône Dollar/Argent */}
        Suivi des Demandes de Subventions
      </h1>
      
      <p className="mb-6 text-lg text-gray-700 leading-relaxed">
        Gérez et suivez l'ensemble des demandes de subventions pour votre École de Production, de la préparation du dossier au versement des fonds. Une gestion rigoureuse des subventions est essentielle pour la pérennité financière de votre établissement.
      </p>

      {/* Cartes de Statistiques */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <Card className="shadow-sm">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.totalApplications}</div>
            <div className="text-sm text-gray-600">Demandes totales</div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.pendingApplications}</div>
            <div className="text-sm text-gray-600">Demandes en cours</div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.grantedApplications}</div>
            <div className="text-sm text-gray-600">Subventions accordées</div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {stats.totalAmountGranted.toLocaleString('fr-FR')} €
            </div>
            <div className="text-sm text-gray-600">Montant total perçu</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Liste des Subventions</h2>
        <Button 
          onClick={() => { resetForm(); setShowForm(true); }}
          className="btn-primary flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Ajouter une subvention
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6 shadow-lg">
          <CardHeader className="bg-gray-50 border-b">
            <CardTitle className="text-xl font-bold text-gray-700">{editingId ? 'Modifier' : 'Nouvelle'} Subvention</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="subsidy-name">Nom de la subvention *</Label>
                <Input
                  id="subsidy-name"
                  value={formData.subsidyName || ''}
                  onChange={(e) => setFormData({...formData, subsidyName: e.target.value})}
                  placeholder="Ex: Aide Région Formation Jeunes"
                />
              </div>
              <div>
                <Label htmlFor="grantor">Organisme Subventionneur *</Label>
                <Input
                  id="grantor"
                  value={formData.grantor || ''}
                  onChange={(e) => setFormData({...formData, grantor: e.target.value})}
                  placeholder="Ex: Conseil Régional, Fondation X"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contact-person">Personne de contact (optionnel)</Label>
                <Input
                  id="contact-person"
                  value={formData.contactPerson || ''}
                  onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                  placeholder="Nom du contact"
                />
              </div>
              <div>
                <Label htmlFor="amount-requested">Montant Demandé (€) *</Label>
                <Input
                  id="amount-requested"
                  type="number"
                  value={formData.amountRequested || ''}
                  onChange={(e) => setFormData({...formData, amountRequested: parseFloat(e.target.value) || 0})}
                  placeholder="Ex: 50000"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="amount-granted">Montant Accordé (€) (si connu)</Label>
                <Input
                  id="amount-granted"
                  type="number"
                  value={formData.amountGranted || ''}
                  onChange={(e) => setFormData({...formData, amountGranted: parseFloat(e.target.value) || 0})}
                  placeholder="Ex: 45000"
                />
              </div>
              <div>
                <Label>Statut *</Label>
                <Select
                  value={formData.status || 'en_cours_demande'}
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
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="application-date">Date de Demande *</Label>
                <Input
                  id="application-date"
                  type="date"
                  value={formData.applicationDate || ''}
                  onChange={(e) => setFormData({...formData, applicationDate: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="decision-date">Date de Décision (optionnel)</Label>
                <Input
                  id="decision-date"
                  type="date"
                  value={formData.decisionDate || ''}
                  onChange={(e) => setFormData({...formData, decisionDate: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="payment-date">Date de Versement (optionnel)</Label>
                <Input
                  id="payment-date"
                  type="date"
                  value={formData.paymentDate || ''}
                  onChange={(e) => setFormData({...formData, paymentDate: e.target.value})}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="required-documents">Documents Requis / Fournis</Label>
              <Textarea
                id="required-documents"
                value={formData.requiredDocuments || ''}
                onChange={(e) => setFormData({...formData, requiredDocuments: e.target.value})}
                placeholder="Ex: Dossier CERFA, Justificatifs financiers, PV CA..."
                rows={2}
              />
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
              <Button onClick={saveSubsidy} className="btn-primary">
                {editingId ? 'Modifier la subvention' : 'Ajouter la subvention'}
              </Button>
              <Button onClick={resetForm} variant="outline" className="btn-secondary">
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Liste des subventions */}
      <div className="grid gap-4">
        {subsidies.length > 0 ? (
          subsidies.map(subsidy => (
            <Card key={subsidy.id} className="card-hover transition-shadow duration-200 hover:shadow-lg">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">{subsidy.subsidyName}</h3>
                      <Badge className={getStatusColor(subsidy.status)}>
                        {statusOptions.find(s => s.value === subsidy.status)?.label}
                      </Badge>
                      <Badge variant="outline" className="text-sm">
                        {subsidy.grantor}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      {subsidy.contactPerson && (
                        <div className="flex items-center gap-2">
                          <Handshake className="w-4 h-4 text-gray-500" />
                          Contact: {subsidy.contactPerson}
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <CalendarDays className="w-4 h-4 text-gray-500" />
                        Demande: {new Date(subsidy.applicationDate).toLocaleDateString('fr-FR')}
                        {subsidy.decisionDate && ` (Décision: ${new Date(subsidy.decisionDate).toLocaleDateString('fr-FR')})`}
                      </div>
                      {subsidy.paymentDate && (
                         <div className="flex items-center gap-2">
                           <CheckCircle2 className="w-4 h-4 text-gray-500" />
                           Versée le: {new Date(subsidy.paymentDate).toLocaleDateString('fr-FR')}
                         </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-600">Demandé: {subsidy.amountRequested.toLocaleString('fr-FR')} €</div>
                    {subsidy.amountGranted !== undefined && (
                      <div className="text-lg font-bold text-green-600">Accordé: {subsidy.amountGranted.toLocaleString('fr-FR')} €</div>
                    )}
                  </div>
                </div>

                {subsidy.notes && (
                  <div className="bg-gray-50 p-3 rounded-lg mb-3">
                    <p className="text-sm italic text-gray-700">{subsidy.notes}</p>
                  </div>
                )}
                {subsidy.requiredDocuments && (
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <FileText className="w-4 h-4" />
                    Documents: {subsidy.requiredDocuments}
                  </div>
                )}
                 <div className="flex justify-between items-center text-xs text-gray-500">
                    <div>
                        Dernière mise à jour: {new Date(subsidy.lastUpdate).toLocaleDateString('fr-FR')}
                    </div>
                    <div className="flex gap-2">
                        <Button
                            onClick={() => editSubsidy(subsidy)}
                            className="btn-secondary text-xs px-3 py-1"
                            variant="outline"
                        >
                            Modifier
                        </Button>
                        <Button
                            onClick={() => deleteSubsidy(subsidy.id)}
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
              <DollarSign className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Aucune demande de subvention enregistrée pour le moment.</p>
              <p className="text-sm">Cliquez sur "Ajouter une subvention" pour commencer à suivre vos dossiers.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}

export default SuiviSubventions; // Correction ici : ajout de l'export default