import { Mail, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();

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
              <h3 className="text-lg font-semibold mb-4">Auteure du mémoire</h3>
              <p className="font-medium text-lg">Laura Gombaud</p>
              <p className="text-gray-600 mb-4">Expert-comptable mémorialiste</p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a 
                  href="mailto:gombaudlaura@gmail.com" 
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  gombaudlaura@gmail.com
                </a>
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Ressources</h3>
              <div className="space-y-4">
                {/* Lien pour télécharger la notice d'agrément */}
                <p className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  <a 
                    href="/fichiers/GOMBAUD Laura notice.pdf"
                    download="GOMBAUD Laura notice.pdf"
                    className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
                  >
                    Télécharger la notice d'agrément
                  </a>
                </p>
                {/* Lien pour télécharger le T1 du mémoire */}
                <p className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  <a 
                    href="/fichiers/LG MEMOIRE.pdf"
                    download="LG MEMOIRE.pdf"
                    className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
                  >
                    Télécharger le T1 du mémoire
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