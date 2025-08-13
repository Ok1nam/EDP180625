import React from 'react';
import { MessageSquareText, Users, Lightbulb, TrendingUp, ChevronDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface EntretiensProps {
  navigate?: (page: string) => void;
}

const entretiensData = [
  {
    title: "Entretien 1 : Avec le directeur d'une école de production",
    questions: [
      {
        question: "Q1: Quels sont les objectifs principaux que vous aviez en tête lors de la création de cette école de production ?",
        answer: "L'objectif principal était de fournir une éducation pratique et adaptée aux besoins du marché du travail. Nous voulions offrir aux étudiants une alternative à l'éducation traditionnelle, en les préparant directement à des métiers en demande, grâce à une combinaison de théorie et de pratique sur des projets réels."
      },
      {
        question: "Q2: Comment ces objectifs ont-ils évolué depuis le lancement de l'école ?",
        answer: "Les objectifs initiaux ont évolué pour inclure une dimension d'innovation et de partenariat avec les industries locales. Nous nous concentrons maintenant également sur le développement de compétences entrepreneuriales chez les étudiants, afin qu'ils puissent non seulement être employés mais aussi créer leurs propres opportunités."
      },
      {
        question: "Q3: Quels sont les indicateurs de succès que vous utilisez pour évaluer si l'école atteint ses objectifs ?",
        answer: "Nous utilisons plusieurs indicateurs de succès, tels que le taux de placement des diplômés, la satisfaction des employeurs, et le retour des étudiants sur la qualité de la formation. Nous regardons également la qualité des projets réalisés et leur impact réel sur les entreprises partenaires."
      },
      {
        question: "Q4: Quelles ont été les principales difficultés que vous avez rencontrées lors de la phase de création de l'école ?",
        answer: "La principale difficulté a été de convaincre les partenaires financiers et les entreprises de la viabilité de notre modèle éducatif. Trouver les fonds initiaux et créer un réseau de soutien a demandé beaucoup de temps et d'efforts."
      },
      {
        question: "Q5: Pouvez-vous partager un exemple spécifique d'un défi majeur et comment vous l'avez surmonté ?",
        answer: "Un défi majeur a été l'acquisition de matériel et d'équipements nécessaires pour les ateliers. Nous avons surmonté cela en établissant des partenariats avec des entreprises locales qui nous ont fourni des équipements en échange de formations et de projets réalisés par nos étudiants."
      },
      {
        question: "Q6: Comment gérez-vous les obstacles financiers, administratifs et logistiques au quotidien ?",
        answer: "Nous avons une équipe dédiée à la gestion administrative et financière qui travaille en étroite collaboration avec des conseillers externes, principalement notre expert-comptable. Nous utilisons également des outils de gestion de projet pour suivre les dépenses et les besoins logistiques, afin d'optimiser nos ressources."
      },
      {
        question: "Q7: Quels sont les besoins essentiels pour le bon fonctionnement de l'école de production?",
        answer: "Les besoins essentiels incluent un financement stable, un accès continu à des équipements modernes, et une équipe pédagogique qualifiée. Nous avons également besoin de partenariats solides avec les entreprises pour garantir des projets pertinents et un bon taux de placement des étudiants."
      },
      {
        question: "Q8: Avez-vous des partenariats avec des entreprises ou des institutions pour soutenir l'école ?",
        answer: "Oui, nous avons plusieurs partenariats avec des entreprises locales et des institutions éducatives. Ces partenariats nous permettent de rester à jour sur les besoins du marché du travail et d'offrir à nos étudiants des opportunités concrètes de mise en pratique de leurs compétences."
      },
      {
        question: "Q9: Quels types de ressources (humaines, matérielles, financières) sont les plus critiques pour vous en ce moment ?",
        answer: "Actuellement, les ressources humaines sont critiques. Nous cherchons à recruter davantage d'enseignants et de formateurs spécialisés pour répondre à la demande croissante d'inscriptions. En termes de ressources matérielles, nous avons besoin de nouveaux équipements pour les ateliers. Financièrement, nous cherchons des fonds pour développer de nouveaux programmes et améliorer nos infrastructures."
      },
    ],
  },
  {
    title: "Entretien 2 : Avec un enseignant-créateur de projet",
    questions: [
      {
        question: "Q1: Qu'est-ce qui vous a motivé à initier un projet au sein de cette école de production ?",
        answer: "Ma motivation première a été de concrétiser une approche pédagogique basée sur le 'faire pour apprendre'. Voir les étudiants s'épanouir et acquérir des compétences tangibles à travers des projets réels représente pour moi une immense satisfaction et la validation d'une méthode éducative concrète."
      },
      {
        question: "Q2: Quels sont les objectifs éducatifs et professionnels de votre projet pour les étudiants ?",
        answer: "Au-delà des compétences techniques métier, mon projet vise surtout à forger l'autonomie et la polyvalence des étudiants. L'accent est mis sur l'acquisition de savoir-faire transférables comme la gestion d'imprévus, le leadership au sein d'une équipe et l'adaptabilité, essentiels pour une insertion professionnelle durable."
      },
      {
        question: "Q3: Comment mesurez-vous l'impact de votre projet sur le développement des compétences des étudiants ?",
        answer: "L'évaluation se fait principalement par l'observation directe de la performance sur le projet et la validation par les entreprises. Le retour qualitatif des professionnels qui supervisent ou évaluent nos projets est un indicateur clé de l'adéquation de nos formations aux attentes du terrain."
      },
      {
        question: "Q4: Quelles ont été les principales difficultés que vous avez rencontrées en démarrant votre projet ?",
        answer: "La principale difficulté a été de structurer un programme qui soit à la fois éducatif et suffisamment flexible pour intégrer des projets réels. Trouver un équilibre entre les exigences académiques et les attentes des entreprises partenaires n'a pas été simple."
      },
      {
        question: "Q5: Comment avez-vous surmonté les défis liés à la gestion des étudiants et à la mise en œuvre pratique du projet ?",
        answer: "La clé a été de structurer un système d'entraide entre étudiants, complété par un suivi pédagogique rapproché. Les élèves les plus avancés ou expérimentés soutiennent les autres, ce qui favorise l'autonomie et la responsabilisation de chacun. Nos points réguliers permettent ensuite d'anticiper et de traiter les difficultés pour maintenir une dynamique de projet fluide."
      },
      {
        question: "Q6: Quelles sont les difficultés actuelles que vous rencontrez et quelles solutions envisagez-vous ?",
        answer: "Actuellement, nous avons des difficultés à maintenir un niveau constant de ressources matérielles pour tous les projets. Pour y remédier, nous cherchons à renforcer nos partenariats avec des entreprises locales afin d'obtenir des dons de matériel ou des prêts d'équipements adaptés aux besoins pédagogiques."
      },
      {
        question: "Q7: Quels sont les besoins matériels et logistiques spécifiques à votre projet ?",
        answer: "Pour maintenir notre avantage compétitif et l'excellence de la formation, nous recherchons constamment du matériel et des outils de dernière génération, notamment des machines spécifiques et des licences logicielles professionnelles. La disponibilité d'ateliers configurables et évolutifs est également une exigence logistique majeure."
      },
      {
        question: "Q8: Comment évaluez-vous les besoins en formation continue pour les enseignants et le personnel ?",
        answer: "La veille technologique et pédagogique est intrinsèque à notre rôle. Nous avons mis en place un cycle régulier d'ateliers et de formations avec des experts de l'industrie pour que l'équipe puisse constamment renouveler ses compétences et garantir l'actualité de nos enseignements."
      },
      {
        question: "Q9: De quelles ressources supplémentaires auriez-vous besoin pour faire évoluer votre projet ?",
        answer: "L'expansion de nos projets nécessite avant tout un renforcement financier pour l'acquisition d'équipements de pointe et l'organisation d'événements à forte visibilité. Parallèlement, des profils de soutien technique additionnels nous permettraient d'optimiser le temps des formateurs et d'accroître notre capacité d'accompagnement."
      },
    ],
  },
  {
    title: "Entretien 3 : Avec un porteur de projet",
    questions: [
      {
        question: "Q1: Qu'est-ce qui vous a motivé à initier un projet au sein de cette école de production ?",
        answer: "Ma motivation réside dans la conviction qu'une innovation ne prend tout son sens que si elle s'incarne dans la pratique et répond à des besoins tangibles. Lancer ce projet à l'école était l'occasion parfaite d'offrir aux étudiants un cadre pour concrétiser des idées, tout en résolvant des problématiques industrielles réelles, créant ainsi une synergie unique entre formation et application concrète."
      },
      {
        question: "Q2: Quels sont les objectifs éducatifs et professionnels de votre projet pour les étudiants ?",
        answer: "Éducativement, le cœur de ce projet est de doter les étudiants non seulement de compétences techniques pointues, mais aussi de les aguerrir à la gestion complète d'un projet, de la conception à la livraison, en passant par le travail collaboratif. Professionnellement, l'ambition est qu'ils achèvent cette expérience avec un portfolio concret et des aptitudes immédiatement opérationnelles et valorisables sur le marché du travail."
      },
      {
        question: "Q3: Comment mesurez-vous l'impact de votre projet sur le développement des compétences des étudiants ?",
        answer: "L'impact est principalement mesuré par la capacité des étudiants à mener le projet à terme, à produire des solutions fonctionnelles et à générer de la valeur concrète pour nos partenaires. Nous observons leur progression à travers l'atteinte des objectifs définis pour le projet, la résolution des défis techniques rencontrés, et surtout, la satisfaction directe des entreprises utilisatrices qui intègrent nos réalisations dans leur environnement réel. La pertinence de notre formation se vérifie directement par la mise en œuvre concrète des compétences acquises et les résultats observables sur le terrain."
      },
      {
        question: "Q4: Quelles ont été les principales difficultés que vous avez rencontrées en démarrant votre projet ?",
        answer: "Le défi majeur fut d'abord d'obtenir les ressources financières de démarrage et de bâtir la crédibilité du projet auprès des partenaires potentiels. Parallèlement, nous avons dû élaborer un cadre pédagogique qui, tout en respectant les standards académiques, reste agile et réactif aux besoins évolutifs de l'industrie."
      },
      {
        question: "Q5: Comment avez-vous surmonté les défis liés à la gestion des étudiants et à la mise en œuvre pratique du projet ?",
        answer: "L'instauration d'un encadrement par des mentors expérimentés a été déterminante pour la motivation et l'autonomie des étudiants sur le projet. Des boucles de feedback très courtes nous ont permis d'ajuster en temps réel les méthodes de travail et les objectifs pour optimiser la productivité et la qualité des réalisations."
      },
      {
        question: "Q6: Quelles sont les difficultés actuelles que vous rencontrez et quelles solutions envisagez-vous ?",
        answer: "Notre principal enjeu aujourd'hui est de garantir l'actualité permanente de nos programmes face à l'accélération technologique et aux évolutions du marché. Nous prévoyons d'intensifier nos collaborations avec des leaders technologiques et d'instituer des parcours de mise à niveau continue pour l'ensemble de l'équipe et des apprenants."
      },
      {
        question: "Q7: Quels sont les besoins matériels et logistiques spécifiques à votre projet ?",
        answer: "Pour l'excellence de nos réalisations, il nous est indispensable de disposer d'un parc de machines-outils de dernière génération et des licences des logiciels professionnels les plus récents. Sur le plan logistique, une structuration administrative agile et un support opérationnel réactif sont essentiels pour fluidifier l'exécution des projets."
      },
      {
        question: "Q8: Comment évaluez-vous les besoins en formation continue pour les enseignants et le personnel ?",
        answer: "La pérennité de la qualité de notre formation repose sur l'actualisation constante des savoirs de nos équipes. Nous avons institutionnalisé un programme de formation continue, incluant des immersions en entreprise et des ateliers thématiques, afin d'intégrer les dernières innovations technologiques et méthodologiques directement dans notre curriculum."
      },
      {
        question: "Q9: De quelles ressources supplémentaires auriez-vous besoin pour faire évoluer votre projet ?",
        answer: "L'accélération de la croissance de notre projet est conditionnée par des financements additionnels dédiés au renouvellement de nos équipements de pointe et à l'organisation d'événements stratégiques pour accroître notre rayonnement. Un renfort en expertise humaine, notamment des formateurs spécialisés et des gestionnaires de projet, est également indispensable pour accompagner cette montée en puissance."
      },
    ],
  },
];


const Entretiens: React.FC<EntretiensProps> = ({ navigate }) => {
  return (
    <section id="entretiens-porteurs-projets" className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="flex items-center gap-3 mb-6 text-3xl font-bold text-[#3C5F58]">
        <MessageSquareText className="w-8 h-8 text-[#3C5F58]" />
        Entretiens avec les Porteurs de Projets
      </h1>
      
      <p className="mb-8 text-lg text-gray-700 leading-relaxed">
        En tant qu'expert-comptable, les retours d'expérience des porteurs de projets sont cruciaux pour votre compréhension du modèle. Ces entretiens vous fournissent des informations de terrain sur les défis, les besoins et les facteurs de succès. Ils vous permettent d'affiner vos conseils, de mieux anticiper les difficultés financières et de proposer un accompagnement sur mesure à votre client, l'École de Production.
      </p>

      {/* Section Accordeon des entretiens */}
      <Card className="mb-6 shadow-md border-2 border-[#2E5941]">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl font-bold text-[#3C5F58] flex items-center gap-2">
            <Users className="w-5 h-5" />
            Synthèse des entretiens
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Accordion type="single" collapsible className="w-full">
            {entretiensData.map((entretien, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b">
                <AccordionTrigger className="text-left font-bold text-lg hover:no-underline">
                  <div className="flex items-center gap-2 text-[#3C5F58]">
                    <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
                    {entretien.title}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-4 space-y-4 text-gray-700">
                  {entretien.questions.map((qna, qnaIndex) => (
                    <div key={qnaIndex} className="bg-gray-50 p-4 rounded-md border border-gray-200">
                      <p className="font-semibold text-gray-800 mb-1">
                        <span className="text-[#3C5F58]">Question :</span> {qna.question}
                      </p>
                      <p className="pl-4 border-l-2 border-[#2E5941] text-gray-600 italic">
                        <span className="font-semibold text-[#3C5F58]">Réponse :</span> {qna.answer}
                      </p>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
      
      {/* Bouton de retour à l'accueil */}
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
};

export default Entretiens;