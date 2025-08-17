import { useState, useEffect } from "react";
import { TreePine, Play, ArrowLeft, RotateCcw, Download, Save, Check, X } from "lucide-react";

// NOTE: The Card, CardContent, Button, and Progress components are assumed to be
// available from a component library like shadcn/ui.
// For this example, we'll provide mock components to make the code runnable.

const Card = ({ children, className = '' }) => <div className={`bg-white rounded-xl shadow-lg border border-gray-200 ${className}`}>{children}</div>;
const CardContent = ({ children, className = '' }) => <div className={`p-6 ${className}`}>{children}</div>;
const Button = ({ children, onClick, disabled = false, className = '' }) => <button onClick={onClick} disabled={disabled} className={`px-4 py-2 rounded-md transition-colors duration-200 ${className}`}>{children}</button>;
const Progress = ({ value, className = '' }) => <div className={`w-full h-2 bg-gray-200 rounded-full overflow-hidden ${className}`}><div style={{ width: `${value}%` }} className="h-full bg-green-500 transition-all duration-300"></div></div>;

// NOTE: We are also assuming the existence of a mock toast and local storage hook.
const useToast = () => ({ toast: (options) => console.log('Toast:', options) });
const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

// NOTE: We need the questions data to be self-contained for the component to be runnable.
export interface Question {
  question: string;
  advice: string;
}

export const questions: Question[] = [
  {
    question: "Ai-je une motivation forte et pérenne pour porter ce projet dans la durée ?",
    advice: "Réinterroger ses motivations et clarifier sa vision long terme"
  },
  {
    question: "Est-ce que j'adhère pleinement aux valeurs du modèle EDP ?",
    advice: "Acquérir de l'expérience ou se former aux valeurs EDP"
  },
  {
    question: "Ai-je des compétences ou une expérience dans les domaines clés ?",
    advice: "Se doter d'un collègue ou équipier en renfort"
  },
  {
    question: "Suis-je prêt à gérer les difficultés du quotidien avec résilience ?",
    advice: "Travailler sa résilience et ses capacités d'adaptation"
  },
  {
    question: "Ai-je une capacité à fédérer autour d'un projet ?",
    advice: "Construire une équipe complémentaire et développer son leadership"
  },
  {
    question: "Ai-je une posture humaine adaptée à des jeunes en fragilité ?",
    advice: "Développer sa posture éducative et ses compétences relationnelles"
  },
  {
    question: "Suis-je disponible concrètement pour ce projet ?",
    advice: "Revoir sa disponibilité personnelle et professionnelle"
  },
  {
    question: "Ai-je formalisé une association ou structure juridique ?",
    advice: "Sécuriser le cadre juridique et administratif"
  },
  {
    question: "Ai-je identifié un ou plusieurs maîtres professionnels potentiels ?",
    advice: "Chercher des référents métiers dans le tissu économique local"
  },
  {
    question: "Ai-je défini un modèle économique soutenable ?",
    advice: "Affiner le plan de financement initial et les prévisions"
  },
  {
    question: "Le territoire choisi présente-t-il des opportunités économiques ?",
    advice: "Approfondir l'étude de marché territoriale"
  },
  {
    question: "Ai-je identifié les filières porteuses localement ?",
    advice: "Analyser les besoins en compétences du territoire"
  },
  {
    question: "Existe-t-il une demande avérée pour ce type de formation ?",
    advice: "Réaliser une enquête de besoins plus poussée"
  },
  {
    question: "Ai-je noué des partenariats avec des entreprises locales ?",
    advice: "Développer un réseau d'entreprises partenaires"
  },
  {
    question: "Les locaux envisagés sont-ils adaptés et conformes ?",
    advice: "Vérifier la conformité réglementaire des locaux"
  },
  {
    question: "Ai-je prévu un financement pour les 3 premières années ?",
    advice: "Sécuriser le financement pluriannuel"
  },
  {
    question: "L'équipe pédagogique est-elle constituée ?",
    advice: "Recruter et former l'équipe pédagogique"
  },
  {
    question: "Ai-je défini un plan de communication et de recrutement ?",
    advice: "Élaborer une stratégie de communication ciblée"
  },
  {
    question: "Les outils de pilotage sont-ils en place ?",
    advice: "Mettre en place un système de suivi et d'indicateurs"
  },
  {
    question: "Ai-je préparé l'ouverture et les premiers mois de fonctionnement ?",
    advice: "Planifier la phase de démarrage opérationnel"
  }
];

interface QuestionnaireProps {
  navigate: (page: string) => void;
}

interface QuestionnaireState {
  currentIndex: number;
  responses: string[];
  isStarted: boolean;
  isCompleted: boolean;
}

export default function Questionnaire({ navigate }: QuestionnaireProps) {
  const { toast } = useToast();
  const [savedState, setSavedState] = useLocalStorage<QuestionnaireState>('questionnaire_state', {
    currentIndex: 0,
    responses: [],
    isStarted: false,
    isCompleted: false
  });

  const [state, setState] = useState<QuestionnaireState>(savedState);
  const [showAdvice, setShowAdvice] = useState(false);

  useEffect(() => {
    setSavedState(state);
  }, [state, setSavedState]);

  const startQuestionnaire = () => {
    setState({
      currentIndex: 0,
      responses: [],
      isStarted: true,
      isCompleted: false
    });
    setShowAdvice(false);
  };

  const answerQuestion = (answer: string) => {
    const newResponses = [...state.responses];
    newResponses[state.currentIndex] = answer;
    
    if (answer === 'NON') {
      setShowAdvice(true);
      setTimeout(() => {
        setShowAdvice(false);
        moveToNext(newResponses);
      }, 2000);
    } else {
      moveToNext(newResponses);
    }
  };

  const moveToNext = (responses: string[]) => {
    const nextIndex = state.currentIndex + 1;
    if (nextIndex >= questions.length) {
      setState(prev => ({
        ...prev,
        responses,
        isCompleted: true
      }));
    } else {
      setState(prev => ({
        ...prev,
        currentIndex: nextIndex,
        responses
      }));
    }
  };

  const goToPrevious = () => {
    if (state.currentIndex > 0) {
      setState(prev => ({
        ...prev,
        currentIndex: prev.currentIndex - 1
      }));
      setShowAdvice(false);
    }
  };

  const resetQuestionnaire = () => {
    startQuestionnaire();
  };

  const exportResults = () => {
    toast({
      title: "Export en cours",
      description: "Fonctionnalité d'export PDF en développement...",
    });
  };

  const saveProgress = () => {
    toast({
      title: "Progression sauvegardée",
      description: "Vos réponses ont été sauvegardées localement.",
    });
  };

  const generateReport = () => {
    const noCount = state.responses.filter(r => r === 'NON').length;
    const score = ((questions.length - noCount) / questions.length) * 100;
    
    let assessment = '';
    if (score >= 90) assessment = 'Excellent - Projet très mature';
    else if (score >= 75) assessment = 'Bon - Quelques ajustements nécessaires';
    else if (score >= 60) assessment = 'Moyen - Préparation à renforcer';
    else assessment = 'Insuffisant - Projet à retravailler';

    return { score, assessment, noCount };
  };

  const progress = state.isStarted ? (state.currentIndex / questions.length) * 100 : 0;
  const currentQuestion = state.isStarted && state.currentIndex < questions.length ? questions[state.currentIndex] : null;

  return (
    <section id="arbre">
      <h1 className="flex items-center gap-2 mb-6 text-2xl font-bold text-gray-800">
        <TreePine className="w-6 h-6 text-[#3C5F58]" />
        Arbre de décision
      </h1>
      
      <p className="mb-6 text-gray-600 leading-relaxed">
        20 questions pour évaluer votre projet d'école de production et identifier les axes d'amélioration.
      </p>
      
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="font-semibold text-[#3C5F58] mb-2">
            {state.isCompleted 
              ? 'Questionnaire terminé ✅' 
              : state.isStarted 
                ? `Question ${state.currentIndex + 1} sur ${questions.length}`
                : 'Prêt à commencer'
            }
          </div>
          <Progress value={progress} className="h-2 bg-[#2E5941]" />
        </CardContent>
      </Card>
      
      {!state.isStarted && (
        <Button onClick={startQuestionnaire} className="px-6 py-3 bg-[#2E5941] text-white rounded-md hover:bg-[#3C5F58] transition-colors text-lg">
          <Play className="w-4 h-4 mr-2" />
          Lancer le questionnaire
        </Button>
      )}
      
      {state.isStarted && currentQuestion && !state.isCompleted && (
        <Card className="mb-6">
          <CardContent className="p-6">
            {/* Logic to show the heading for the entire section */}
            {state.currentIndex >= 0 && state.currentIndex <= 9 && (
              <h2 className="text-xl font-semibold mb-4 text-[#3C5F58] flex items-center gap-2">
                🧠 Volet 1 – Capacités personnelles du porteur de projet
              </h2>
            )}
            {state.currentIndex >= 10 && state.currentIndex <= 19 && (
              <h2 className="text-xl font-semibold mb-4 text-[#3C5F58] flex items-center gap-2">
                🔧 Volet 2 – Maturité du projet d'École de Production
              </h2>
            )}
            
            <p className="font-medium mb-4 text-lg">
              {state.currentIndex + 1}. {currentQuestion.question}
            </p>
            
            <div className="flex gap-3 mb-4">
              <Button 
                onClick={() => answerQuestion('OUI')}
                className="bg-green-600 text-white hover:bg-green-700 transition-colors"
              >
                <Check className="w-4 h-4 mr-2" />
                OUI
              </Button>
              <Button 
                onClick={() => answerQuestion('NON')}
                className="bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                <X className="w-4 h-4 mr-2" />
                NON
              </Button>
              <Button 
                onClick={goToPrevious}
                disabled={state.currentIndex === 0}
                className="bg-gray-400 text-white hover:bg-gray-500 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Précédent
              </Button>
            </div>
            
            {showAdvice && (
              <div className="advice bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                💡 Conseil : {currentQuestion.advice}
              </div>
            )}
          </CardContent>
        </Card>
      )}
      
      {state.isCompleted && (
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-[#3C5F58]">📊 Résultats de l'évaluation</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#3C5F58]">{generateReport().score.toFixed(0)}%</div>
                  <div className="text-gray-600">Score global</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold">{generateReport().assessment}</div>
                  <div className="text-sm text-gray-600">
                    {generateReport().noCount} points d'amélioration identifiés
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => navigate('outils')} className="px-6 py-3 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition-colors text-lg">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux outils
            </Button>
            <Button onClick={resetQuestionnaire} className="px-6 py-3 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition-colors text-lg">
              <RotateCcw className="w-4 h-4 mr-2" />
              Recommencer
            </Button>
            <Button onClick={exportResults} className="px-6 py-3 bg-[#2E5941] text-white rounded-md hover:bg-[#3C5F58] transition-colors text-lg">
              <Download className="w-4 h-4 mr-2" />
              Exporter PDF
            </Button>
            <Button onClick={saveProgress} className="px-6 py-3 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors text-lg">
              <Save className="w-4 h-4 mr-2" />
              Sauvegarder
            </Button>
          </div>
          
          <div className="text-center mt-8">
            <Button
              onClick={() => navigate('accueil')}
              className="px-6 py-3 bg-[#2E5941] text-white rounded-md hover:bg-[#3C5F58] transition-colors text-lg"
            >
              Retour à l'accueil
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
