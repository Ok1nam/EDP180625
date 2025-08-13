import React, { useState } from 'react';
import { Handshake, Download, FileText, Printer, PiggyBank } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface PretSubordonneProps {
  navigate?: (page: string) => void;
}

export default function PretSubordonne({ navigate }: PretSubordonneProps) {
  const [formData, setFormData] = useState({
    nomAssociation: "",
    adresseSiegeSocial: "",
    representantLegal: "",
    region: "",
    secteurEcole: "",
    nomSocieteBailleur: "",
    siegeSocieteBailleur: "",
    montantPretAccepte: "",
    montantPretFranceActive: "",
    montantSubventionsBPI_FNEP: "",
    coutTotalProjet: "",
    montantAmortissementTrimestriel: "",
    montantMinimumRemboursementAnticipe: "",
    dureePret: "",
    premiereDateAmortissement: "",
    derniereDateAmortissement: "",
    dernierJourDisponibilite: "",
  });

  const [generatedText, setGeneratedText] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  const generateTxt = () => {
    const textContent = `
    CONTRAT DE PRET SUBORDONNE
    
    ENTRE LES SOUSSIGNEES :
    
    La Caisse des dépôts et consignations, établissement spécial créé par la loi du 28 avril 1816 codifiée aux articles L.518-2 et suivants du Code monétaire et financier, ayant son siège au [Adresse CDC], dûment représentée aux fins des présentes, (ci-après dénommée la Caisse des Dépôts ou le Prêteur),
    
    ET
    
    ${formData.nomAssociation} (association régie par la loi du 1er juillet 1901), ayant son siège social au ${formData.adresseSiegeSocial}, représentée par ${formData.representantLegal}, agissant en qualité de président, dûment habilité aux fins des présentes,(ci-après dénommée l’Emprunteur),
    
    APRES AVOIR PREALABLEMENT EXPOSE CE QUI SUIT :
    L’association ${formData.nomAssociation} porte la création d’une école de production sur le territoire de la communauté de la région ${formData.region}, orientée vers la formation aux métiers de ${formData.secteurEcole}.
    
    Article 2 - Objet et montant du prêt
    2.1 Le présent Contrat a pour objet de déterminer les conditions et modalités selon lesquelles le Prêteur consent à mettre à disposition de l’Emprunteur, qui l’accepte, un prêt subordonné d’un montant en principal de ${formData.montantPretAccepte} euros.
    
    Article 3 - Durée du prêt
    3.1 Le Prêt est consenti pour une période de ${formData.dureePret} ans allant de la date de signature du Contrat jusqu'à la Date d’Echéance Finale, fixée au ${formData.derniereDateAmortissement}.
    
    Article 4 - Conditions suspensives
    4.1 Conditions suspensives à la signature du Contrat
    (f) remise par l'Emprunteur au Prêteur d’une copie certifiée conforme par le représentant de l’Emprunteur des lettres d’offre fermes et engageantes dans lesquelles d’une part France Active s’engage à mettre à disposition un prêt participatif pour un montant minimum de ${formData.montantPretFranceActive} euros et d’autre part la BPI et la FNEP s’engagent à octroyer des subventions pour un montant minimum de ${formData.montantSubventionsBPI_FNEP} euros.
    
    4.2 Conditions suspensives au Tirage
    (c) remise par l’Emprunteur au Prêteur d’une copie certifiée conforme par le représentant légal de l’Emprunteur de la documentation de prêt subordonné consenti par France Active à hauteur de ${formData.montantPretFranceActive} euros.
    (e) Remise du contrat de bail conclu entre l’Emprunteur et La Société dénommée ${formData.nomSocieteBailleur}, dont le siège est à ${formData.siegeSocieteBailleur}.
    
    Article 5- Mise à disposition du Prêt
    5.1 Modalités de Tirage
    le Prêt sera mis à disposition de l’Emprunteur pour un montant de ${formData.coutTotalProjet} euros en un tirage unique.
    L'Emprunteur ne pourra pas procéder à une demande de Tirage moins de deux (2) mois calendaires avant la première Date de Paiement d’Intérêts, fixée au ${formData.premiereDateAmortissement}.
    La Période de Disponibilité s'étend jusqu'au ${formData.dernierJourDisponibilite}.
    
    Article 6 – Amortissement
    6.1 Amortissement normal du Prêt
    Le remboursement des sommes en principal dues au titre du Prêt sera de ${formData.montantAmortissementTrimestriel} euros par trimestre et sera payé trimestriellement à chaque Date d'Amortissement à compter de la Première Date d’Amortissement.
    
    6.2 Remboursement anticipé volontaire
    L'Emprunteur pourra, à une Date d’Amortissement uniquement, rembourser par anticipation tout ou partie de l'Encours du Prêt, pour un montant en principal minimum de ${formData.montantMinimumRemboursementAnticipe} euros.
    `;
    setGeneratedText(textContent);
  };
  
  const downloadTxt = () => {
    const element = document.createElement("a");
    const file = new Blob([generatedText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "contrat_pret_subordonne.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <section id="pret-subordonne" className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="flex items-center gap-3 mb-6 text-3xl font-bold text-[#3C5F58]">
        <Handshake className="w-8 h-8 text-[#3C5F58]" />
        Le Prêt Subordonné : un levier stratégique pour votre École de Production
      </h1>

      <p className="mb-8 text-lg text-gray-700 leading-relaxed">
        Le prêt subordonné est un outil de financement hybride, situé entre les fonds propres et les dettes bancaires classiques. Pour une École de Production, il représente un moyen efficace de sécuriser les premières années d’activité, en renforçant la structure financière sans alourdir immédiatement la charge de remboursement.
      </p>

      {/* Section Pourquoi recourir à un Prêt Subordonné ? */}
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-[#3C5F58] flex items-center gap-2">
            <PiggyBank className="w-5 h-5 text-[#3C5F58]" />
            Pourquoi recourir à un Prêt Subordonné ?
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-gray-700">
          <p className="mb-4">
            Ce type de financement présente plusieurs atouts pour les porteurs de projet :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="font-bold">Renforcer la solidité financière</span> : Bien que classé en dette, il est souvent assimilé à des quasi-fonds propres, améliorant la perception de solvabilité par les financeurs.</li>
            <li><span className="font-bold">Faciliter l’accès à d’autres financements</span> : Il rassure les banques et organismes publics, ouvrant la porte à des prêts complémentaires.</li>
            <li><span className="font-bold">Alléger la pression sur la trésorerie</span> : Les remboursements peuvent être différés, laissant du temps pour que l’école atteigne sa vitesse de croisière.</li>
            <li><span className="font-bold">Encadrer le risque</span> : Les modalités de subordination assurent que ce prêt est remboursé après les autres dettes, ce qui le rend plus souple pour l’emprunteur.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Section Les éléments clés du modèle de contrat */}
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-[#3C5F58] flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#3C5F58]" />
            Les éléments clés du modèle de contrat
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-gray-700">
          <p className="mb-4">
            Le modèle de contrat inclus dans cet outil précise notamment :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="font-bold">Durée et modalités de remboursement</span> : Souvent longues (7 à 10 ans), avec possibilité de différé.</li>
            <li><span className="font-bold">Conditions financières</span> : Taux d’intérêt fixe, calcul et échéancier détaillés.</li>
            <li><span className="font-bold">Clauses de subordination</span> : Remboursement après désintéressement des autres créanciers.</li>
            <li><span className="font-bold">Obligations de l’emprunteur</span> : Utilisation des fonds, respect des conditions FNEP, reporting régulier.</li>
            <li><span className="font-bold">Références juridiques</span> : Code monétaire et financier, Code de commerce, Plan Comptable Général.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Téléchargement du document original */}
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-[#3C5F58] flex items-center gap-2">
            <Download className="w-5 h-5 text-[#3C5F58]" />
            Télécharger le Modèle de Contrat
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-center">
          <p className="mb-4">
            Accédez à notre modèle complet de contrat, conforme aux exigences des partenaires institutionnels (Banque des Territoires, France Active, etc.). Il est fourni au format .docx pour être adapté à votre projet.
          </p>
          <a href="/fichiers/ANNEXE 16 MODELE CONTRAT PRET SUBORDONNE.docx" download>
            <Button className="bg-[#2E5941] hover:bg-[#3C5F58] text-white">
              <Download className="w-4 h-4 mr-2" />
              Télécharger le fichier .docx
            </Button>
          </a>
          <p className="italic text-sm text-gray-600 mt-4">
            <span className="font-bold">Conseil :</span> Faites relire et adapter ce contrat par votre expert-comptable ou votre conseil juridique pour garantir sa conformité aux spécificités de votre montage financier.
          </p>
        </CardContent>
      </Card>

      {/* Formulaire de remplissage */}
      <Card className="mb-6 shadow-md">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-[#3C5F58] flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#3C5F58]" />
            Remplir les champs du contrat
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-gray-700 space-y-6">
          <h3 className="font-semibold text-lg"><span className="font-bold">Informations sur l'emprunteur</span></h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nomAssociation">Nom de l'association</Label>
              <Input id="nomAssociation" value={formData.nomAssociation} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="adresseSiegeSocial">Adresse du siège social</Label>
              <Input id="adresseSiegeSocial" value={formData.adresseSiegeSocial} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="representantLegal">Nom et fonction du représentant légal</Label>
              <Input id="representantLegal" value={formData.representantLegal} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="region">Région de l'école de production</Label>
              <Input id="region" value={formData.region} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="secteurEcole">Secteur de l'école de production</Label>
              <Input id="secteurEcole" value={formData.secteurEcole} onChange={handleChange} placeholder="Ex: Métiers de l'usinage, Électronique, etc." />
            </div>
          </div>

          <h3 className="font-semibold text-lg mt-6"><span className="font-bold">Détails financiers du prêt</span></h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="montantPretAccepte">Montant du prêt subordonné accepté (€)</Label>
              <Input id="montantPretAccepte" type="number" value={formData.montantPretAccepte} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="montantPretFranceActive">Montant du prêt subordonné France Active (€)</Label>
              <Input id="montantPretFranceActive" type="number" value={formData.montantPretFranceActive} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="montantSubventionsBPI_FNEP">Montant des subventions BPI et FNEP (€)</Label>
              <Input id="montantSubventionsBPI_FNEP" type="number" value={formData.montantSubventionsBPI_FNEP} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="coutTotalProjet">Coût total du projet (montant de la subvention) (€)</Label>
              <Input id="coutTotalProjet" type="number" value={formData.coutTotalProjet} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="montantAmortissementTrimestriel">Montant de l'amortissement trimestriel (€)</Label>
              <Input id="montantAmortissementTrimestriel" type="number" value={formData.montantAmortissementTrimestriel} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="montantMinimumRemboursementAnticipe">Montant minimum pour un remboursement anticipé (€)</Label>
              <Input id="montantMinimumRemboursementAnticipe" type="number" value={formData.montantMinimumRemboursementAnticipe} onChange={handleChange} />
            </div>
          </div>

          <h3 className="font-semibold text-lg mt-6"><span className="font-bold">Conditions du prêt</span></h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dureePret">Durée du prêt (en années)</Label>
              <Input id="dureePret" type="number" value={formData.dureePret} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="premiereDateAmortissement">Première date d'amortissement</Label>
              <Input id="premiereDateAmortissement" type="date" value={formData.premiereDateAmortissement} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="derniereDateAmortissement">Dernière date d'amortissement</Label>
              <Input id="derniereDateAmortissement" type="date" value={formData.derniereDateAmortissement} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="dernierJourDisponibilite">Dernier jour de disponibilité des fonds</Label>
              <Input id="dernierJourDisponibilite" type="date" value={formData.dernierJourDisponibilite} onChange={handleChange} />
            </div>
          </div>

          <h3 className="font-semibold text-lg mt-6"><span className="font-bold">Informations sur le bailleur</span></h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nomSocieteBailleur">Nom de la société bailleuse</Label>
              <Input id="nomSocieteBailleur" value={formData.nomSocieteBailleur} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="siegeSocieteBailleur">Siège social de la société bailleuse</Label>
              <Input id="siegeSocieteBailleur" value={formData.siegeSocieteBailleur} onChange={handleChange} />
            </div>
          </div>
          
          <div className="flex gap-3 mt-8">
            <Button onClick={generateTxt} className="bg-[#2E5941] hover:bg-[#3C5F58] text-white">
              <Printer className="w-4 h-4 mr-2" />
              Générer le texte
            </Button>
            {generatedText && (
              <Button onClick={downloadTxt} className="bg-[#2E5941] hover:bg-[#3C5F58] text-white">
                <Download className="w-4 h-4 mr-2" />
                Télécharger le .txt
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
      
      {generatedText && (
        <Card className="mb-6 shadow-md">
          <CardHeader className="bg-gray-50 border-b">
            <CardTitle className="text-xl font-bold text-gray-700 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#3C5F58]" />
              Aperçu du contrat (Texte généré)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Textarea 
              value={generatedText} 
              rows={20} 
              readOnly 
              className="font-mono text-sm"
            />
          </CardContent>
        </Card>
      )}

      {navigate && (
        <div className="text-center mt-8">
          <Button
            onClick={() => navigate('accueil')}
            className="px-6 py-3 bg-[#2E5941] text-white rounded-md hover:bg-[#3C5F58] transition-colors text-lg"
          >
            Retour à l'accueil
          </Button>
        </div>
      )}
    </section>
  );
}