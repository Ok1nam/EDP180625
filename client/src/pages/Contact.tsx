import { Mail, Download, Linkedin } from "lucide-react"; // Ajout de Download et Linkedin, suppression de MessageCircle
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast"; // useToast est maintenu au cas où d'autres toasts sont utilisés ailleurs, mais openSupportChat est retiré

export default function Contact() {
  const { toast } = useToast(); // La variable toast est conservée mais la fonction openSupportChat est supprimée car elle n'est plus appelée.

  return (
    <section id="apropos">
      <h1 className="flex items-center gap-2 mb-6 text-2xl font-bold text-gray-800">
        <Mail className="w-6 h-6" />
        Contact
      </h1>
      
      <Card>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Auteur du mémoire</h3>
              <p className="font-medium text-lg">Laura Gombaud</p>
              <p className="text-gray-600 mb-4">Candidate au Diplôme d'Expertise Comptable</p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a 
                  href="mailto:laura.gombaud@example.com" 
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  laura.gombaud@example.com
                </a>
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Ressources et Contact</h3> {/* Nouveau titre */}
              <div className="space-y-4"> {/* Conteneur pour les nouveaux éléments */}
                {/* Lien pour télécharger le mémoire */}
                <p className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  <a 
                    href="/fichiers/memoire.pdf" // Chemin d'accès au fichier du mémoire
                    download="memoire_laura_gombaud.pdf" // Nom du fichier lors du téléchargement
                    className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
                  >
                    Télécharger le mémoire
                  </a>
                </p>

                {/* Lien pour télécharger la notice */}
                <p className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  <a 
                    href="/fichiers/notice.pdf" // Chemin d'accès au fichier de la notice
                    download="notice_utilisation.pdf" // Nom du fichier lors du téléchargement
                    className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
                  >
                    Télécharger la notice d'utilisation
                  </a>
                </p>

                {/* Icône LinkedIn */}
                <p className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4" />
                  <a 
                    href="https://www.linkedin.com/in/laura-gombaud-31686815b/?originalSubdomain=fr" 
                    target="_blank" // Ouvre dans un nouvel onglet
                    rel="noopener noreferrer" // Bonne pratique de sécurité
                    className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
                  >
                    Profil LinkedIn de Laura Gombaud
                  </a>
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}