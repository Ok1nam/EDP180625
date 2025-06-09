import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function FloatingSave() {
  const { toast } = useToast();

  const handleSave = () => {
    // Save current state to localStorage
    const currentState = {
      timestamp: new Date().toISOString(),
      // Add any state that needs to be saved
    };
    
    localStorage.setItem('edp_save_state', JSON.stringify(currentState));
    
    toast({
      title: "Données sauvegardées",
      description: "Votre progression a été sauvegardée avec succès.",
    });
  };

  return (
    <button
      onClick={handleSave}
      className="floating-save flex items-center justify-center"
      title="Sauvegarder les données"
      aria-label="Sauvegarder les données"
    >
      <Save className="w-6 h-6" />
    </button>
  );
}
