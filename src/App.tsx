
import React, { useState, useEffect, MouseEvent, useRef } from "react";
import AchievementsPage from "./AchievementsPage";
import {
  Briefcase,
  Camera,
  Code,
  FileBadge,
  Globe,
  GraduationCap,
  Mail,
  MessageCircle,
  Phone,
  Server,
  Shield,
  Smile,
  Sun,
  Moon,
  ArrowUpRight,
  Rocket,
  Award,
  Menu,
  ChevronDown,
  BrainCircuit,
  Terminal,
  Monitor,
  Cloud,
  Zap,
  Bot,
  Cpu,
  Database,
  X
} from "lucide-react";
import {
  motion,
  AnimatePresence,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
  useSpring,
} from "motion/react";

/* =========================================
   1. Helper Components & Dictionaries
   ========================================= */

type Language = "EN" | "IT" | "DE" | "HI";

const CONTACT_EMAIL = "sashikumar24680@gmail.com";

const dict = {
  EN: {
    home: "Home",
    about: "About",
    contact: "Contact",
    role: "Data Science & Python Developer",
    heroRole: "Data Science Student & Python Developer",
    available: "Available for Work",
    heroSubtext: "HI, I'M SASHI KUMAR PENTAPALLI. M.SC. DATA SCIENCE STUDENT IN PARMA, WORKING WITH PYTHON, DATA AND MACHINE LEARNING.",
    
    // Core Focus Translations
    coreFocus: "CORE FOCUS",
    coreFocusRole: "AI, DATA & SOFTWARE ENGINEER",
    quote1: '" Applied AI.',
    quote2: ' Scalable Data.',
    quote3: ' robust software engineering ."',
    col1P1: "I turn messy data into ",
    col1Highlight: "clear analysis",
    col1P2: " and working machine-learning prototypes.",
    col2Title: "SCOPE & PLATFORM",
    col2Text: "Data cleaning, exploratory analysis and predictive models in Python, presented through charts, dashboards and simple apps.",
    col2Sub: "From notebook to working app.",
    col3Title: "INTEGRATION",
    col3Text: "Alongside the models, I build the web side: Python web apps with Django and Flask, React front ends and WordPress sites.",
    
    // Professional Stats Translations
    statsTag: "PROFESSIONAL STATISTICS",
    statsHeading: "Data that speaks. AI that reasons. Software that ships.",
    statsSub: "Three disciplines, one engineer and the numbers behind the work.",
    stat1L: "INTERNSHIPS", stat1V: "3",
    stat2L: "VIRTUAL INTERNSHIPS", stat2V: "4",
    stat3L: "GITHUB PROJECTS", stat3V: "4",
    stat4L: "TECH & TOOLS", stat4V: "20+",

    // End CTA & Footer Translations
    cta1: "Let's Build Something",
    cta2: "Together",
    ctaWords: ["Amazing", "Innovative", "Intelligent", "Creative"],
    ctaSub: "Open to English-speaking part-time work in data analysis, Python development and machine learning, remote or in Parma.",
    hireMe: "Hire Me",
    viewMyResume: "View My Resume",
    footerCopy: `© 2026 SASHI KUMAR PENTAPALLI. ALL RIGHTS RESERVED.`,
    more: "MORE",

    letsTalk: "LET'S TALK",
    idea: "Have an idea? Let's build something extraordinary together.",
    name: "YOUR NAME",
    email: "YOUR EMAIL",
    subject: "SUBJECT",
    project: "TELL ME ABOUT YOUR PROJECT...",
    send: "SEND MESSAGE",
    tech: "Tech Arsenal",
    experience: "Experience",
    projects: "Featured Projects",
    education: "Education",
    certs: "Validating Excellence",
    certsDesc: "View my verified credentials, professional certificates, and course completions.",
    viewCerts: "View Certificates",
    socials: "Connect & Socials",
    scan: "Scan to Chat",
    internships: "3 Internships",
    currentlyLearning: "Currently Learning",
  },
  IT: {
    home: "Home",
    about: "About",
    contact: "Contatti",
    role: "Data Science e Sviluppatore Python",
    heroRole: "Studente di Data Science & Sviluppatore Python",
    available: "Disponibile per Lavoro",
    heroSubtext: "CIAO, SONO SASHI KUMAR PENTAPALLI. STUDENTE DI LAUREA MAGISTRALE IN DATA SCIENCE A PARMA: LAVORO CON PYTHON, DATI E MACHINE LEARNING.",
    
    coreFocus: "FOCUS PRINCIPALE",
    coreFocusRole: "INGEGNERE AI, DATI E SOFTWARE",
    quote1: '" AI Applicata.',
    quote2: ' Dati Scalabili.',
    quote3: ' ingegneria del software robusta ."',
    col1P1: "Trasformo dati disordinati in ",
    col1Highlight: "analisi chiare",
    col1P2: " e prototipi di machine learning funzionanti.",
    col2Title: "AMBITO E PIATTAFORMA",
    col2Text: "Pulizia dei dati, analisi esplorativa e modelli predittivi in Python, presentati con grafici, dashboard e semplici app.",
    col2Sub: "Dal notebook all'app funzionante.",
    col3Title: "INTEGRAZIONE",
    col3Text: "Oltre ai modelli, sviluppo la parte web: app Python con Django e Flask, front-end React e siti WordPress.",

    statsTag: "STATISTICHE PROFESSIONALI",
    statsHeading: "Dati che parlano. AI che ragiona. Software distribuito.",
    statsSub: "Tre discipline, un ingegnere e i numeri dietro il lavoro.",
    stat1L: "STAGE", stat1V: "3",
    stat2L: "STAGE VIRTUALI", stat2V: "4",
    stat3L: "PROGETTI SU GITHUB", stat3V: "4",
    stat4L: "TECNOLOGIE E STRUMENTI", stat4V: "20+",

    cta1: "Costruiamo Qualcosa di",
    cta2: "Insieme",
    ctaWords: ["Straordinario", "Innovativo", "Intelligente", "Creativo"],
    ctaSub: "Disponibile per lavoro part-time in inglese nell'analisi dati, nello sviluppo Python e nel machine learning, da remoto o a Parma.",
    hireMe: "Assumimi",
    viewMyResume: "Vedi Il Mio Curriculum",
    footerCopy: `© 2026 SASHI KUMAR PENTAPALLI. TUTTI I DIRITTI RISERVATI.`,
    more: "DI PIÙ",

    letsTalk: "PARLIAMO",
    idea: "Hai un'idea? Costruiamo qualcosa di straordinario insieme.",
    name: "IL TUO NOME",
    email: "LA TUA EMAIL",
    subject: "OGGETTO",
    project: "PARLAMI DEL TUO PROGETTO...",
    send: "INVIA MESSAGGIO",
    tech: "Arsenale Tecnologico",
    experience: "Esperienza",
    projects: "Progetti in Evidenza",
    education: "Istruzione",
    certs: "Eccellenza Validata",
    certsDesc: "Visualizza le mie credenziali verificate, certificati professionali e completamenti di corsi.",
    viewCerts: "Visualizza Certificati",
    socials: "Connettiti e Social",
    scan: "Scansiona per Chattare",
    internships: "3 Stage",
    currentlyLearning: "Sto imparando",
  },
  DE: {
    home: "Startseite",
    about: "Über mich",
    contact: "Kontakt",
    role: "Data Science & Python-Entwickler",
    heroRole: "Data-Science-Student & Python-Entwickler",
    available: "Verfügbar für Arbeit",
    heroSubtext: "HALLO, ICH BIN SASHI KUMAR PENTAPALLI. M.SC.-STUDENT IN DATA SCIENCE IN PARMA – ICH ARBEITE MIT PYTHON, DATEN UND MACHINE LEARNING.",
    
    coreFocus: "KERNSCHWERPUNKT",
    coreFocusRole: "KI-, DATEN- & SOFTWARE-INGENIEUR",
    quote1: '" Angewandte KI.',
    quote2: ' Skalierbare Daten.',
    quote3: ' robuste Softwareentwicklung ."',
    col1P1: "Ich mache aus unordentlichen Daten ",
    col1Highlight: "klare Analysen",
    col1P2: " und funktionierende Machine-Learning-Prototypen.",
    col2Title: "UMFANG & PLATTFORM",
    col2Text: "Datenbereinigung, explorative Analyse und prädiktive Modelle in Python, präsentiert mit Diagrammen, Dashboards und einfachen Apps.",
    col2Sub: "Vom Notebook zur funktionierenden App.",
    col3Title: "INTEGRATION",
    col3Text: "Neben den Modellen baue ich die Web-Seite: Python-Web-Apps mit Django und Flask, React-Frontends und WordPress-Seiten.",

    statsTag: "PROFESSIONELLE STATISTIKEN",
    statsHeading: "Daten, die sprechen. KI, die argumentiert.",
    statsSub: "Drei Disziplinen, ein Ingenieur und die Zahlen hinter der Arbeit.",
    stat1L: "PRAKTIKA", stat1V: "3",
    stat2L: "VIRTUELLE PRAKTIKA", stat2V: "4",
    stat3L: "GITHUB-PROJEKTE", stat3V: "4",
    stat4L: "TECHNIK & WERKZEUGE", stat4V: "20+",

    cta1: "Lass uns zusammen etwas",
    cta2: "bauen",
    ctaWords: ["Erstaunliches", "Innovatives", "Intelligentes", "Kreatives"],
    ctaSub: "Offen für englischsprachige Teilzeitarbeit in Datenanalyse, Python-Entwicklung und Machine Learning – remote oder in Parma.",
    hireMe: "Stell mich ein",
    viewMyResume: "Meinen Lebenslauf ansehen",
    footerCopy: `© 2026 SASHI KUMAR PENTAPALLI. ALLE RECHTE VORBEHALTEN.`,
    more: "MEHR",

    letsTalk: "LASS UNS REDEN",
    idea: "Hast du eine Idee? Lass uns gemeinsam etwas Außergewöhnliches bauen.",
    name: "DEIN NAME",
    email: "DEINE E-MAIL",
    subject: "BETREFF",
    project: "ERZÄHL MIR VON DEINEM PROJEKT...",
    send: "NACHRICHT SENDEN",
    tech: "Technik-Arsenal",
    experience: "Erfahrung",
    projects: "Ausgewählte Projekte",
    education: "Bildung",
    certs: "Validierte Exzellenz",
    certsDesc: "Sehen Sie sich meine verifizierten Zeugnisse, Zertifikate und Kursabschlüsse an.",
    viewCerts: "Zertifikate ansehen",
    socials: "Verbinden & Soziales",
    scan: "Zum Chatten scannen",
    internships: "3 Praktika",
    currentlyLearning: "Lerne gerade",
  },
  HI: {
    home: "होम",
    about: "मेरे बारे में",
    contact: "संपर्क",
    role: "डेटा साइंस और पायथन डेवलपर",
    heroRole: "डेटा साइंस छात्र और पायथन डेवलपर",
    available: "काम के लिए उपलब्ध",
    heroSubtext: "नमस्ते, मैं शशि कुमार पेंटापल्ली हूँ। पार्मा में डेटा साइंस का M.Sc. छात्र, पायथन, डेटा और मशीन लर्निंग के साथ काम करता हूँ।",
    
    coreFocus: "मुख्य फोकस",
    coreFocusRole: "एआई, डेटा और सॉफ्टवेयर इंजीनियर",
    quote1: '" एप्लाइड एआई.',
    quote2: ' स्केलेबल डेटा.',
    quote3: ' मजबूत सॉफ्टवेयर इंजीनियरिंग ."',
    col1P1: "मैं बिखरे हुए डेटा को ",
    col1Highlight: "स्पष्ट विश्लेषण",
    col1P2: " और काम करने वाले मशीन लर्निंग प्रोटोटाइप में बदलता हूँ।",
    col2Title: "दायरा और मंच",
    col2Text: "पायथन में डेटा सफाई, खोजपूर्ण विश्लेषण और प्रेडिक्टिव मॉडल, जिन्हें चार्ट, डैशबोर्ड और सरल ऐप के ज़रिए प्रस्तुत किया जाता है।",
    col2Sub: "नोटबुक से काम करने वाले ऐप तक।",
    col3Title: "एकीकरण",
    col3Text: "मॉडल के साथ-साथ मैं वेब भाग भी बनाता हूँ: Django और Flask के साथ पायथन वेब ऐप, React फ्रंट-एंड और WordPress साइटें।",

    statsTag: "व्यावसायिक आंकड़े",
    statsHeading: "डेटा जो बोलता है। AI जो तर्क करता है। सॉफ्टवेयर जो काम करता है।",
    statsSub: "तीन विषय, एक इंजीनियर और काम के पीछे के आंकड़े।",
    stat1L: "इंटर्नशिप", stat1V: "3",
    stat2L: "वर्चुअल इंटर्नशिप", stat2V: "4",
    stat3L: "GitHub प्रोजेक्ट्स", stat3V: "4",
    stat4L: "तकनीक और उपकरण", stat4V: "20+",

    cta1: "आइए मिलकर कुछ",
    cta2: "बनाएं",
    ctaWords: ["अद्भुत", "अभिनव", "बुद्धिमान", "रचनात्मक"],
    ctaSub: "डेटा विश्लेषण, पायथन डेवलपमेंट और मशीन लर्निंग में अंग्रेज़ी-भाषी पार्ट-टाइम काम के लिए उपलब्ध, रिमोट या पार्मा में।",
    hireMe: "मुझे काम पर रखें",
    viewMyResume: "मेरा बायोडाटा देखें",
    footerCopy: `© 2026 शशि कुमार पेंटापल्ली। सर्वाधिकार सुरक्षित।`,
    more: "और अधिक",

    letsTalk: "आइए बात करते हैं",
    idea: "क्या आपके पास कोई विचार है? आइए मिलकर कुछ असाधारण बनाएं।",
    name: "आपका नाम",
    email: "आपका ईमेल",
    subject: "विषय",
    project: "मुझे अपने प्रोजेक्ट के बारे में बताएं...",
    send: "संदेश भेजें",
    tech: "तकनीकी शस्त्रागार",
    experience: "अनुभव",
    projects: "प्रमुख परियोजनाएं",
    education: "शिक्षा",
    certs: "उत्कृष्टता प्रमाणित",
    certsDesc: "मेरे सत्यापित क्रेडेंशियल्स, प्रमाणपत्र और पाठ्यक्रम पूर्णता देखें।",
    viewCerts: "प्रमाणपत्र देखें",
    socials: "जुड़ें और सोशल",
    scan: "चैट के लिए स्कैन करें",
    internships: "3 इंटर्नशिप",
    currentlyLearning: "वर्तमान में सीख रहे हैं",
  },
};

function BentoCard({
  children,
  className = "",
  delay = 0,
  isDark = true,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  isDark?: boolean;
  id?: string;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const baseStyle = isDark
    ? "bg-white/[0.02] border-white/10"
    : "bg-black/[0.03] border-black/10";
  const glowColor = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)";

  return (
    <motion.section
      initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      whileHover={{ scale: 1.02 }}
      onMouseMove={handleMouseMove}
      id={id}
      className={`relative backdrop-blur-2xl border rounded-3xl overflow-hidden group ${baseStyle} ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              ${glowColor},
              transparent 40%
            )
          `,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </motion.section>
  );
}

const LiveClock = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "Europe/Rome",
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span className="font-mono">{time}</span>;
};

// Dynamic Animated Word Component for the CTA Section
const DynamicWord = ({ words }: { words: string[] }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <span className="relative inline-block text-blue-500 overflow-visible align-bottom mx-2">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="absolute left-0 bottom-0 whitespace-nowrap"
        >
          {words[index]}
        </motion.span>
        {/* Invisible spacer to maintain natural width in the sentence */}
        <span className="invisible whitespace-nowrap">{words[index]}</span>
      </AnimatePresence>
    </span>
  );
};

/* =========================================
   2. Page Components
   ========================================= */


const EngineeringCube = ({
  index,
  Icon,
  isDark,
}: {
  index: number;
  Icon: React.ComponentType<any>;
  isDark: boolean;
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Scroll changes the cube tilt while a slower loop keeps it alive even at rest.
  const rotateXRaw = useTransform(scrollYProgress, [0, 0.5, 1], [-18, 8, 24]);
  const rotateYRaw = useTransform(scrollYProgress, [0, 0.5, 1], [-35, 20, 60]);
  const rotateX = useSpring(rotateXRaw, { stiffness: 110, damping: 22, mass: 0.35 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 110, damping: 22, mass: 0.35 });
  const lift = useTransform(scrollYProgress, [0, 0.5, 1], [18, 0, -18]);

  const palettes = [
    {
      front: "linear-gradient(145deg,#12243a 0%,#0f4c81 55%,#1f8cff 100%)",
      right: "linear-gradient(145deg,#17496f 0%,#0b3554 100%)",
      top: "linear-gradient(145deg,#2c6d9d 0%,#133c5f 100%)",
      back: "#0a1a2a",
      accent: "#65b7ff",
    },
    {
      front: "linear-gradient(145deg,#15321e 0%,#197344 55%,#29c264 100%)",
      right: "linear-gradient(145deg,#1f8c50 0%,#0f4328 100%)",
      top: "linear-gradient(145deg,#3ca86a 0%,#174f30 100%)",
      back: "#0b2114",
      accent: "#7cf19b",
    },
    {
      front: "linear-gradient(145deg,#35180d 0%,#9b4517 55%,#f07b2e 100%)",
      right: "linear-gradient(145deg,#a8561e 0%,#4c210c 100%)",
      top: "linear-gradient(145deg,#d36b28 0%,#6e3010 100%)",
      back: "#261107",
      accent: "#ffc080",
    },
  ];

  const palette = palettes[index % palettes.length];
  const faceBase =
    "absolute inset-0 flex flex-col items-center justify-center border border-white/15 text-white shadow-[inset_0_0_50px_rgba(255,255,255,0.06)] rounded-[22px] overflow-hidden";

  const label =
    index === 0 ? "INTELLIGENCE" : index === 1 ? "SCALABLE" : "INNOVATION";

  return (
    <div
      ref={sectionRef}
      className="relative flex min-h-[360px] w-full items-center justify-center md:min-h-[520px]"
      style={{ perspective: "1100px" }}
    >
      <motion.div
        aria-hidden
        animate={{ opacity: [0.12, 0.28, 0.12], scale: [0.96, 1.06, 0.96] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute h-[300px] w-[300px] rounded-full bg-blue-500/10 blur-[65px]"
      />

      <motion.div
        style={{
          rotateX,
          rotateY,
          y: lift,
          transformStyle: "preserve-3d",
          WebkitTransformStyle: "preserve-3d",
          willChange: "transform",
        }}
        animate={{
          rotateZ: [0, 1.5, 0, -1.5, 0],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="relative h-[235px] w-[235px] md:h-[300px] md:w-[300px]"
      >
        <motion.div
          animate={{ rotateY: 360, rotateX: [0, 2, 0, -2, 0] }}
          transition={{
            rotateY: { duration: 18, repeat: Infinity, ease: "linear" },
            rotateX: { duration: 7, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute left-1/2 top-1/2 h-[160px] w-[160px] -translate-x-1/2 -translate-y-1/2 md:h-[205px] md:w-[205px] md:[--cube-z:102.5px]"
          style={{
            "--cube-z": "80px",
            transformStyle: "preserve-3d",
            WebkitTransformStyle: "preserve-3d",
          } as React.CSSProperties}
        >
          <div className={`${faceBase}`} style={{ transform: "translateZ(var(--cube-z))", background: palette.front }}>
            <Icon
              className="h-14 w-14 md:h-20 md:w-20"
              strokeWidth={1.4}
              style={{ color: palette.accent }}
            />
            <span className="mt-3 text-[8px] font-black uppercase tracking-[0.32em] text-white/75">
              {label}
            </span>
          </div>

          <div className={`${faceBase}`} style={{ transform: "rotateY(180deg) translateZ(var(--cube-z))", background: palette.back }}>
            <span className="text-3xl font-black tracking-tight text-white/90">01</span>
            <span className="mt-2 text-[7px] font-black uppercase tracking-[0.32em] text-white/45">
              SYSTEM
            </span>
          </div>

          <div className={`${faceBase}`} style={{ transform: "rotateY(90deg) translateZ(var(--cube-z))", background: palette.right }}>
            <span className="text-4xl font-black text-white/90">+</span>
            <span className="mt-2 text-[7px] font-black uppercase tracking-[0.32em] text-white/45">
              BUILD
            </span>
          </div>

          <div className={`${faceBase}`} style={{ transform: "rotateY(-90deg) translateZ(var(--cube-z))", background: palette.back }}>
            <span className="text-4xl font-black text-white/80">×</span>
            <span className="mt-2 text-[7px] font-black uppercase tracking-[0.32em] text-white/45">
              SCALE
            </span>
          </div>

          <div className={`${faceBase}`} style={{ transform: "rotateX(90deg) translateZ(var(--cube-z))", background: palette.top }}>
            <span className="text-3xl font-black text-white/90">AI</span>
          </div>

          <div className={`${faceBase}`} style={{ transform: "rotateX(-90deg) translateZ(var(--cube-z))", background: palette.back }}>
            <span className="text-3xl font-black text-white/75">∞</span>
          </div>
        </motion.div>
      </motion.div>

      <span
        className={`absolute bottom-4 text-[9px] font-black uppercase tracking-[0.45em] ${
          isDark ? "text-white/25" : "text-black/25"
        }`}
      >
        SCROLL TO EXPLORE
      </span>
    </div>
  );
};

const EngineeringChapterSection = ({title, eyebrow, description, chips, icon: Icon, side, index, isDark}: {title:string; eyebrow:string; description:string; chips:string[]; icon:React.ComponentType<any>; side:"left"|"right"; index:number; isDark:boolean;}) => {
  const textMain = isDark ? "text-white" : "text-black";
  const textMuted = isDark ? "text-white/55" : "text-black/55";
  const border = isDark ? "border-white/10" : "border-black/10";
  const visual = (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? 80 : -80, scale: 0.96 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.28 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`relative flex min-h-[360px] items-center justify-center overflow-hidden rounded-[2rem] border ${border} bg-white/[0.025] md:min-h-[520px]`}
    >
      <motion.div
        aria-hidden
        animate={{ opacity: [0.22, 0.4, 0.22] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute h-[320px] w-[320px] rounded-full bg-blue-500/5 blur-3xl"
      />
      <EngineeringCube index={index} Icon={Icon} isDark={isDark} />
    </motion.div>
  );
  const copy = (
    <motion.div initial={{opacity:0,x:side==="left"?-80:80}} whileInView={{opacity:1,x:0}} viewport={{once:false,amount:.28}} transition={{duration:.8,ease:[.16,1,.3,1]}} className="flex items-center">
      <div className="max-w-2xl"><div className="mb-7 flex items-center gap-4"><div className="h-px w-12 bg-blue-500/60"/><span className={`text-[10px] font-black uppercase tracking-[0.42em] ${textMuted}`}>{eyebrow} · 0{index+1}</span></div>
      <h2 className={`text-5xl font-black uppercase leading-[0.9] tracking-[-0.05em] md:text-7xl ${textMain}`}>{title}</h2>
      <p className={`mt-8 max-w-xl text-base leading-relaxed md:text-lg ${textMuted}`}>{description}</p>
      <div className="mt-8 flex flex-wrap gap-2.5">{chips.map(chip=><span key={chip} className={`rounded-full border px-3.5 py-2 text-[9px] font-black uppercase tracking-widest md:text-[10px] ${isDark?"border-white/10 bg-white/[0.03] text-white/55":"border-black/10 bg-black/[0.03] text-black/55"}`}>{chip}</span>)}</div></div>
    </motion.div>
  );
  return <section className={`relative min-h-[88vh] w-full overflow-hidden border-b ${border}`}><div className="pointer-events-none absolute inset-0 opacity-60"><div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_50%,rgba(88,28,135,.14),transparent_34%),radial-gradient(circle_at_85%_50%,rgba(14,116,144,.11),transparent_34%)]"/><div className="absolute inset-[-10%]" style={{backgroundImage:"linear-gradient(rgba(255,255,255,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.07) 1px,transparent 1px)",backgroundSize:"84px 84px",transform:"rotate(-1.2deg)"}}/></div><div className="relative z-10 mx-auto grid min-h-[88vh] max-w-[1500px] grid-cols-1 items-center gap-10 px-6 py-20 md:grid-cols-2 md:px-12 lg:px-20">{side==="left"?<>{copy}{visual}</>:<>{visual}{copy}</>}</div></section>;
};

const GoalTechStackStage = ({isDark}:{isDark:boolean}) => {
  const tools=["LangChain","PyTorch","OpenCV","Python","TypeScript","React","Conda","Linux","Postman","VS Code","Jupyter","Git"];
  return <section className={`relative min-h-[82vh] w-full overflow-hidden border-b ${isDark?"border-white/10 bg-black":"border-black/10 bg-white"}`}><motion.div aria-hidden animate={{x:[0,-30,0],rotate:[-1.2,1.2,-1.2]}} transition={{duration:16,repeat:Infinity,ease:"easeInOut"}} className="absolute inset-[-10%] opacity-35 pointer-events-none"><div className="absolute inset-0" style={{backgroundImage:"linear-gradient(rgba(255,255,255,.09) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.09) 1px,transparent 1px)",backgroundSize:"90px 90px"}}/></motion.div><div className="relative z-10 mx-auto flex min-h-[82vh] max-w-[1500px] flex-col justify-center px-6 py-20 md:px-12 lg:px-20"><motion.div initial={{opacity:0,y:35}} whileInView={{opacity:1,y:0}} viewport={{once:false,amount:.25}} transition={{duration:.75}} className="mb-12 flex items-center justify-between gap-6"><span className="text-[10px] font-black uppercase tracking-[0.42em] text-white/45 md:text-xs">TECH STACK & ECOSYSTEM</span><span className="text-[10px] font-black uppercase tracking-[0.36em] text-white/20 md:text-xs">ENGINEERING TOOLKIT</span></motion.div><div className="border-t border-white/10 pt-10"><div className="grid grid-cols-2 gap-x-7 gap-y-8 sm:grid-cols-3 md:grid-cols-4 md:gap-x-12 md:gap-y-11">{tools.map((tool,i)=><motion.div key={tool} initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:false,amount:.15}} transition={{delay:i*.035,duration:.45}} className="flex items-center gap-3"><span className="h-3 w-3 shrink-0 rounded-full bg-blue-400"/><span className="text-sm font-semibold text-white/80 md:text-base">{tool}</span></motion.div>)}</div></div><div className="mt-16 text-center text-[10px] font-black uppercase tracking-[0.45em] text-white/20">KEEP SCROLLING</div></div></section>;
};

const EngineeringSections = ({isDark}:{isDark:boolean}) => <div className="w-full"><GoalTechStackStage isDark={isDark}/><EngineeringChapterSection index={0} isDark={isDark} side="left" icon={BrainCircuit} eyebrow="INTELLIGENCE SYSTEMS" title="Intelligence Systems" description="Training and comparing machine-learning models, from classic classifiers to neural networks for computer vision, with careful data preparation and evaluation." chips={["Machine Learning","Deep Learning","Computer Vision","Data Preprocessing","Exploratory Analysis","Data Visualisation"]}/><EngineeringChapterSection index={1} isDark={isDark} side="right" icon={Server} eyebrow="SCALABLE SYSTEMS" title="Scalable Systems" description="Building database-backed web applications with Python, Django and Flask, React front ends and WordPress sites, with the code kept in Git." chips={["Python Web Apps","Django / Flask","React","SQL / MySQL","WordPress","Git"]}/><EngineeringChapterSection index={2} isDark={isDark} side="left" icon={Award} eyebrow="STRATEGIC INNOVATION" title="Strategic Innovation" description="Translating complex requirements into practical solutions through problem solving, research, collaboration and clear engineering communication." chips={["Problem Solving","Research","Teamwork","Communication","Leadership","Systemic Thinking"]}/><section className={`relative min-h-[55vh] w-full overflow-hidden border-b ${isDark?"border-white/10":"border-black/10"}`}><motion.div initial={{opacity:0,y:70}} whileInView={{opacity:1,y:0}} viewport={{once:false,amount:.3}} transition={{duration:.9,ease:[.16,1,.3,1]}} className="mx-auto flex min-h-[55vh] max-w-[1100px] flex-col items-center justify-center px-6 text-center"><span className="mb-8 text-[10px] font-black uppercase tracking-[0.45em] text-white/25">DISCOVER MY LATEST WORK</span><h2 className={`text-4xl font-medium leading-[1.02] tracking-[-0.04em] md:text-6xl lg:text-7xl ${isDark?"text-white":"text-black"}`}>Discover my latest work and <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-violet-300 to-fuchsia-400">creative solutions</span> that bring ideas to life.</h2><span className="mt-10 text-[9px] font-black uppercase tracking-[0.4em] text-white/25">SCROLL TO EXPLORE</span></motion.div></section></div>;

const AboutGateway = ({
  isDark,
  onOpenAbout,
}: {
  isDark: boolean;
  onOpenAbout: () => void;
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 0.45, 1], [90, 0, -70]);
  const contentScale = useTransform(scrollYProgress, [0, 0.45, 1], [0.94, 1, 0.98]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.18, 0.85, 1], [0.2, 1, 1, 0.45]);
  const patternX = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const patternRotate = useTransform(scrollYProgress, [0, 1], [0, 10]);
  const ambientOpacity = useTransform(scrollYProgress, [0, 0.45, 1], [0.1, 0.22, 0.08]);
  const ambientY = useTransform(scrollYProgress, [0, 1], [60, -80]);

  return (
    <motion.section
      ref={sectionRef}
      id="about-gateway"
      className={`md:col-span-12 relative min-h-[78vh] md:min-h-[88vh] overflow-hidden flex flex-col items-center justify-center border-b ${
        isDark ? "border-white/10" : "border-black/10"
      }`}
    >
      {/* Moving micro-grid / pattern layer, matching the visual language of the reference video. */}
      <motion.div
        aria-hidden
        style={{ x: patternX, rotate: patternRotate }}
        className={`absolute -inset-[35%] pointer-events-none opacity-[0.12] ${isDark ? "text-white" : "text-black"}`}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
      </motion.div>

      {/* Ambient radial glow */}
      <motion.div
        aria-hidden
        style={{ opacity: ambientOpacity, y: ambientY }}
        className="absolute w-[32rem] h-[32rem] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none"
      />

      <motion.div
        style={{ y: contentY, scale: contentScale, opacity: contentOpacity }}
        className="relative z-10 w-full flex flex-col items-center justify-center px-6 md:px-10 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`mb-8 text-[10px] md:text-xs font-bold uppercase tracking-[0.28em] ${
            isDark ? "text-white/40" : "text-black/40"
          }`}
        >
          Scroll to Explore
        </motion.div>

        <motion.button
          type="button"
          onClick={onOpenAbout}
          whileHover={{ scale: 1.035, y: -4 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 32, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.55 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className={`group flex items-center gap-3 rounded-full px-8 py-5 md:px-10 md:py-6 shadow-2xl border ${
            isDark
              ? "bg-white text-black border-white/10"
              : "bg-black text-white border-black/10"
          }`}
          aria-label="Open About Me menu"
        >
          <span className="text-lg md:text-xl font-semibold tracking-tight">About Me</span>
          <span
            className={`flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full transition-transform duration-500 group-hover:rotate-45 ${
              isDark ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            <ArrowUpRight className="w-6 h-6 md:w-7 md:h-7" />
          </span>
        </motion.button>

        <div className="mt-12 w-full max-w-[1100px] flex items-center justify-between gap-4 text-left">
          <span className={`text-[10px] md:text-xs font-medium ${isDark ? "text-white/40" : "text-black/40"}`}>
            ↓ &nbsp; Keep scrolling
          </span>
          <span className={`text-[10px] md:text-xs font-medium ${isDark ? "text-white/40" : "text-black/40"}`}>
            My Short Story
          </span>
        </div>
      </motion.div>

    </motion.section>
  );
};

type Page = "home" | "projects" | "skills" | "contact" | "achievements";

const HelloIntro = ({ isDark, onDone }: { isDark: boolean; onDone: () => void }) => {
  const words = ["HELLO", "NAMASTE", "CIAO"];
  const [wordIndex, setWordIndex] = useState(0);

  // Give each greeting about a second on screen so it can be comfortably read.
  // The sequence runs once: HELLO → NAMASTE → CIAO, then exits.
  useEffect(() => {
    const timers = [
      window.setTimeout(() => setWordIndex(1), 1050),
      window.setTimeout(() => setWordIndex(2), 2100),
      window.setTimeout(onDone, 3650),
    ];
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [onDone]);
  return (
    <motion.div
      className={`fixed inset-0 z-[2000] flex items-center justify-center overflow-hidden ${isDark ? "bg-black text-white" : "bg-white text-black"}`}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.55, ease: "easeInOut" }}
    >
      <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)", backgroundSize: "32px 32px" }} />
      <motion.div initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="relative text-center">
        <div className="text-[10px] uppercase tracking-[0.45em] font-bold opacity-50 mb-5">SASHI KUMAR · AI/ML ENGINEER</div>
        <motion.div className="text-[16vw] md:text-[10vw] font-black tracking-tighter leading-none" animate={{ letterSpacing: ["-0.05em", "0.02em", "-0.03em"] }} transition={{ duration: 1.4, ease: "easeInOut" }}>
          <AnimatePresence mode="wait">
            <motion.span key={words[wordIndex]} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.35 }}>{words[wordIndex]}</motion.span>
          </AnimatePresence>
        </motion.div>
        <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ delay: 0.65, duration: 0.7, ease: "easeOut" }} className="h-px bg-current/30 mt-5 mx-auto" />
      </motion.div>
    </motion.div>
  );
};


const Home = ({ t, isDark, navigateTo, onOpenAbout }: { t: any; isDark: boolean; navigateTo: (page: Page) => void; onOpenAbout: () => void; key?: string }) => {
  const textClass = isDark ? "text-white" : "text-gray-900";
  const textMuted = isDark ? "text-white/60" : "text-gray-600";
  const textAccent = isDark ? "text-white/40" : "text-gray-500";
  const borderClass = isDark ? "border-white/10" : "border-black/10";
  const bgSoft = isDark ? "bg-white/5" : "bg-black/5";
  const hoverBgSoft = isDark ? "hover:bg-white/10" : "hover:bg-black/10";

  const heroContainer = {
    hidden: { opacity: 1 }, 
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.5, 
      },
    },
  };

  const heroItem = {
    hidden: { y: "120%", opacity: 0 }, 
    show: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        duration: 1.2, 
        ease: [0.19, 1.0, 0.22, 1.0] as const 
      } 
    },
  };

  const ShineText = ({ children }: { children: React.ReactNode }) => {
    const shineBg = isDark
      ? "bg-gradient-to-r from-white via-white/30 to-white"
      : "bg-gradient-to-r from-gray-900 via-gray-400 to-gray-900";
      
    return (
      <motion.span
        animate={{ backgroundPosition: ["200% center", "-200% center"] }}
        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
        className={`bg-[length:200%_auto] bg-clip-text text-transparent ${shineBg}`}
      >
        {children}
      </motion.span>
    );
  };

  const duplicatedSkills = "PYTHON • SQL • DJANGO • FLASK • REACT • TAILWIND CSS • DEVOPS • MACHINE LEARNING • WORDPRESS • JAVA • ".repeat(5);
  const duplicatedRoles = "SOFTWARE ENGINEER • AI ENGINEER • DATA SCIENTIST • FULL STACK DEVELOPER • BACKEND DEVELOPER • NLP ENGINEER • DATA ENGINEER • ".repeat(5);

  return (
    <motion.div
      key="home"
      variants={pageVariants}
      initial="pageHidden"
      animate="pageVisible"
      exit="pageExit"
      className="w-full"
    >
      <main className="flex w-full flex-col gap-0 pb-0">
        {/* HERO SECTION */}
        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate="show"
          className={`md:col-span-12 relative w-full flex flex-col md:flex-row pt-16 pb-16 md:pt-24 md:pb-24 border-b mb-4 gap-4 md:gap-12 md:pr-24 ${borderClass}`}
        >
          {/* Safe Right Sidebar for Floating Social Icons */}
          <div className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 flex-col gap-6 z-50">
            <motion.a
              href="https://github.com/SashiKumarP"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
              transition={{ delay: 1.5, y: { repeat: Infinity, duration: 5, ease: "easeInOut" } }}
              className={`p-3 rounded-full border backdrop-blur-md transition-colors ${isDark ? "border-white/20 bg-white/5 hover:bg-white/20 text-white" : "border-black/20 bg-black/5 hover:bg-black/20 text-black"}`}
            >
              <Code className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/sashi-kumar-pentapalli-2aa834172/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1, y: [0, 10, 0] }}
              transition={{ delay: 1.7, y: { repeat: Infinity, duration: 6, ease: "easeInOut" } }}
              className={`p-3 rounded-full border backdrop-blur-md transition-colors ${isDark ? "border-white/20 bg-white/5 hover:bg-white/20 text-white" : "border-black/20 bg-black/5 hover:bg-black/20 text-black"}`}
            >
              <Briefcase className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="https://www.instagram.com/sashi_kumar_pentapalli?igsi=bmNsZTU2OGswY3Q0&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
              transition={{ delay: 1.9, y: { repeat: Infinity, duration: 4, ease: "easeInOut" } }}
              className={`p-3 rounded-full border backdrop-blur-md transition-colors ${isDark ? "border-white/20 bg-white/5 hover:bg-white/20 text-white" : "border-black/20 bg-black/5 hover:bg-black/20 text-black"}`}
            >
              <Camera className="w-5 h-5" />
            </motion.a>
          </div>

          {/* Decorative Floating Tech Icons (Background) */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: isDark ? 0.1 : 0.05, scale: 1, y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute top-[10%] right-[20%] z-0 pointer-events-none ${isDark ? "text-white" : "text-black"}`}
          >
            <Cpu className="w-16 h-16 md:w-24 md:h-24" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: isDark ? 0.1 : 0.05, scale: 1, y: [0, 15, 0], rotate: [0, -10, 10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className={`absolute top-[40%] left-[40%] md:left-[50%] z-0 pointer-events-none ${isDark ? "text-white" : "text-black"}`}
          >
            <Database className="w-12 h-12 md:w-20 md:h-20" />
          </motion.div>

          {/* Safe Left Sidebar for Rotated text */}
          <div className="hidden md:flex flex-col items-center justify-center shrink-0 w-12 z-10">
            <div className={`transform -rotate-90 whitespace-nowrap text-[10px] font-bold tracking-[0.3em] uppercase ${textAccent}`}>
              {t.available}
            </div>
          </div>

          {/* Right Container for Main Typography */}
          <div className="flex-1 flex flex-col min-w-0 z-10">
            {/* Top Left Subtext */}
            <div className="overflow-hidden mb-8 md:mb-16 pb-2">
              <motion.p variants={heroItem} className={`text-xs md:text-sm font-bold tracking-[0.2em] max-w-sm uppercase leading-relaxed ${textMuted}`}>
                {t.heroSubtext}
              </motion.p>
            </div>

            {/* Giant Text with Shine & Animated Icons */}
            <div className={`flex flex-col w-full ${textClass}`}>
              {/* Line 1 */}
              <div className="overflow-hidden pb-4 -mb-4">
                <motion.h1 variants={heroItem} className="text-[15vw] md:text-[10vw] font-black leading-[0.85] tracking-tighter uppercase">
                  <ShineText>AI & ML</ShineText>
                </motion.h1>
              </div>
              {/* Line 2 */}
              <div className="overflow-hidden flex items-center pb-4 -mb-4 mt-2">
                <motion.div variants={heroItem} className="flex items-center text-[15vw] md:text-[10vw] font-black leading-[0.85] tracking-tighter uppercase">
                  <ShineText>FULL</ShineText>
                  <motion.div 
                    className="flex shrink-0 mx-2 md:mx-6"
                    animate={{ rotate: [0, 15, -10, 0], scale: [1, 1.1, 1] }} 
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  >
                    <Zap className="w-[12vw] h-[12vw] md:w-[7vw] md:h-[7vw] text-yellow-500 fill-yellow-500" />
                  </motion.div>
                  <ShineText>STACK</ShineText>
                </motion.div>
              </div>
              {/* Line 3 */}
              <div className="overflow-hidden flex items-center pb-4 -mb-4 mt-2">
                <motion.div variants={heroItem} className="flex items-center text-[15vw] md:text-[10vw] font-black leading-[0.85] tracking-tighter uppercase">
                  <ShineText>EN</ShineText>
                  <motion.div 
                    className="flex shrink-0 mx-2 md:mx-6"
                    animate={{ y: [0, -12, 0], rotate: [0, 5, -5, 0] }} 
                    transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                  >
                    <Bot className="w-[12vw] h-[12vw] md:w-[7vw] md:h-[7vw] text-blue-500" />
                  </motion.div>
                  <ShineText>GINEER</ShineText>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CORE FOCUS SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`md:col-span-12 w-full flex flex-col py-16 md:py-24 border-b ${borderClass}`}
        >
          <div className="flex justify-between items-center mb-12 md:mb-20">
            <span className={`text-[10px] font-bold tracking-[0.3em] text-red-500 uppercase`}>{t.coreFocus}</span>
            <span className={`text-[10px] font-bold tracking-[0.3em] uppercase ${textAccent}`}>{t.coreFocusRole}</span>
          </div>

          <div className={`text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-16 md:mb-32 ${textClass}`}>
             <span className="opacity-40">"</span> 
             {t.quote1} <span className={textMuted}>{t.quote2}</span> <span className="font-serif italic font-light lowercase">{t.quote3}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            <div className={`text-xl md:text-2xl font-medium leading-relaxed ${textClass} md:pr-8`}>
              {t.col1P1}<span className="font-serif italic font-light">{t.col1Highlight}</span>{t.col1P2}
            </div>
            <div className="flex flex-col">
              <h4 className={`text-[10px] font-black uppercase tracking-widest mb-6 ${textClass}`}>{t.col2Title}</h4>
              <p className={`text-sm leading-relaxed mb-6 ${textMuted}`}>{t.col2Text}</p>
              <p className="text-sm font-serif italic text-red-500">{t.col2Sub}</p>
            </div>
            <div className="flex flex-col">
              <h4 className={`text-[10px] font-black uppercase tracking-widest mb-6 ${textClass}`}>{t.col3Title}</h4>
              <p className={`text-sm leading-relaxed mb-10 ${textMuted}`}>{t.col3Text}</p>
              <div className={`text-4xl font-serif italic ${textClass}`}>Sashi</div>
            </div>
          </div>
        </motion.div>

        {/* PROFESSIONAL STATISTICS SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`md:col-span-12 w-full flex flex-col py-16 md:py-24 border-b ${borderClass}`}
        >
          <div className="flex items-center gap-3 mb-10">
            <span className={`px-4 py-2 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase ${isDark ? "bg-green-500/20 text-green-400" : "bg-green-500/10 text-green-600"}`}>
              {t.statsTag}
            </span>
          </div>
          
          <h2 className={`text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[1.1] mb-6 ${textClass}`}>
            {t.statsHeading}
          </h2>
          <p className={`text-xl md:text-2xl font-medium mb-16 md:mb-24 ${textMuted}`}>
            {t.statsSub}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {[
              { label: t.stat1L, value: t.stat1V, color: "text-red-500" },
              { label: t.stat2L, value: t.stat2V, color: "text-blue-500" },
              { label: t.stat3L, value: t.stat3V, color: "text-purple-500" },
              { label: t.stat4L, value: t.stat4V, color: "text-yellow-500" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className={`text-[10px] font-bold uppercase tracking-widest mb-4 ${textAccent}`}>{stat.label}</span>
                <span className={`text-5xl md:text-6xl font-black tracking-tighter ${stat.color}`}>{stat.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ABOUT ME BRIDGE — immediately follows PROFESSIONAL STATISTICS */}
        <AboutGateway isDark={isDark} onOpenAbout={onOpenAbout} />

        {/* GIANT SCROLLING MARQUEE */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 1 }}
          className={`md:col-span-12 w-[100vw] relative left-1/2 -translate-x-1/2 py-20 flex overflow-hidden border-b ${borderClass} ${isDark ? 'bg-white/[0.01]' : 'bg-black/[0.02]'}`}
        >
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            className="flex whitespace-nowrap items-center gap-12"
          >
            {[...Array(4)].map((_, i) => (
              <React.Fragment key={i}>
                <span className={`text-[12vw] font-black uppercase tracking-tighter ${textClass}`}>
                  AI ENGINEER
                </span>
                <div className={`p-6 rounded-[2rem] flex items-center justify-center shrink-0 ${isDark ? 'bg-yellow-500' : 'bg-black'} text-white`}>
                  <Bot className="w-12 h-12 md:w-20 md:h-20" />
                </div>
                <span className={`text-[12vw] font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-gray-400 to-gray-600`}>
                  SOFTWARE
                </span>
              </React.Fragment>
            ))}
          </motion.div>
        </motion.div>

        {/* INDIVIDUAL ENGINEERING SECTIONS — one section per scroll chapter */}
        <EngineeringSections isDark={isDark} />

        {/* Tech Arsenal */}
        <BentoCard isDark={isDark} className="md:col-span-12 p-6 flex flex-col min-h-[340px] mt-12">
          <h3 className={`text-xs font-bold uppercase tracking-widest mb-6 flex items-center gap-2 ${textAccent}`}>
            <Server className="w-4 h-4" /> {t.tech}
          </h3>
          <div className="flex flex-wrap gap-2">
            {["Python", "Machine Learning", "SQL", "Django", "Flask", "DevOps", "WordPress", "Java"].map((tech, i) => (
              <span key={i} className={`px-3 py-1.5 border rounded-xl text-[11px] font-semibold transition-colors cursor-default ${bgSoft} ${borderClass} ${isDark ? "text-white/80" : "text-gray-700"}`}>
                {tech}
              </span>
            ))}
          </div>
          <div className="mt-auto pt-6">
            <div className={`p-4 border rounded-2xl ${isDark ? "bg-white/[0.02]" : "bg-black/[0.02]"} ${borderClass}`}>
              <p className={`text-[10px] uppercase tracking-tighter mb-1 ${isDark ? "text-white/30" : "text-gray-400"}`}>{t.currentlyLearning}</p>
              <p className={`text-xs font-medium ${isDark ? "text-white/80" : "text-gray-800"}`}>Large Language Models (LLM) & PyTorch</p>
            </div>
          </div>
        </BentoCard>

        {/* Experience */}
        <BentoCard isDark={isDark} className="md:col-span-12 p-6 mt-8 min-h-[420px]" id="experience">
          <h3 className={`text-xs font-bold uppercase tracking-widest mb-6 flex items-center gap-2 ${textAccent}`}>
            <Briefcase className="w-4 h-4" /> {t.experience}
          </h3>
          <div className="space-y-5">
            {[
              { company: "MandemIT", role: "Data Science Intern · Aug 2024 – Dec 2025", initial: "M" },
              { company: "HMI Engineering Services", role: "Full Stack Python Intern · May – Jul 2024", initial: "H" },
              { company: "Certimate Infotech", role: "Web Development Intern · Mar – Jun 2023", initial: "C" },
              { company: "AICTE – EduSkills", role: "4 virtual internships (Google for Developers, AWS Academy, Blue Prism) · 2023 – 2025", initial: "E" },
            ].map((job, i) => (
              <div key={i} className="flex gap-4 items-center group/job">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border font-bold transition-colors ${bgSoft} ${borderClass} ${hoverBgSoft} ${isDark ? "text-white/80" : "text-gray-800"}`}>
                  {job.initial}
                </div>
                <div>
                  <p className={`text-sm font-bold ${isDark ? "text-white/90" : "text-gray-900"}`}>{job.company}</p>
                  <p className={`text-xs ${textMuted}`}>{job.role}</p>
                </div>
              </div>
            ))}
          </div>
        </BentoCard>

        {/* Featured Projects */}
        <BentoCard isDark={isDark} className="md:col-span-12 p-6 mt-8 min-h-[360px]">
          <h3 className={`text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2 ${textAccent}`}>
            <Globe className="w-4 h-4" /> {t.projects}
          </h3>
          <div className="flex flex-col gap-4">
            <div className={`p-4 rounded-2xl border flex flex-col justify-center cursor-pointer transition-colors ${bgSoft} ${borderClass} ${hoverBgSoft}`}>
              <div className="text-blue-500 mb-2 bg-blue-500/10 w-max p-2 rounded-lg"><Shield className="w-5 h-5" /></div>
              <p className={`text-sm font-bold mb-1 ${isDark ? "text-white/90" : "text-gray-900"}`}>Healthcare Cyber Defense</p>
            </div>
            <div className={`p-4 rounded-2xl border flex flex-col justify-center cursor-pointer transition-colors ${bgSoft} ${borderClass} ${hoverBgSoft}`}>
              <div className="text-purple-500 mb-2 bg-purple-500/10 w-max p-2 rounded-lg"><Smile className="w-5 h-5" /></div>
              <p className={`text-sm font-bold mb-1 ${isDark ? "text-white/90" : "text-gray-900"}`}>Facial Emotion Detection</p>
            </div>
          </div>
        </BentoCard>

        {/* Education */}
        <BentoCard isDark={isDark} className="md:col-span-12 md:row-span-1 px-6 py-6 mt-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 mb-2 ${textAccent}`}><GraduationCap className="w-4 h-4" /> {t.education}</p>
              <p className={`text-base font-bold ${textClass}`}>M.Sc. Data Science for Management</p>
              <p className={`text-xs ${textMuted}`}>University of Parma · 2026 – 2028 (in progress)</p>
            </div>
            <div className={`hidden md:block w-px h-12 rounded-full mx-4 ${isDark ? "bg-white/10" : "bg-black/10"}`}></div>
            <div>
              <p className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${textAccent}`}>B.Tech</p>
              <p className={`text-base font-bold ${textClass}`}>CSE (AI & ML)</p>
              <p className={`text-xs ${textMuted}`}>Raghu Institute of Technology · 2025</p>
            </div>
            <div className={`hidden md:block w-px h-12 rounded-full mx-4 ${isDark ? "bg-white/10" : "bg-black/10"}`}></div>
            <div>
              <p className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${textAccent}`}>Diploma</p>
              <p className={`text-base font-bold ${textClass}`}>Electrical & Electronics (EEE)</p>
              <p className={`text-xs ${textMuted}`}>Sankethika Polytechnic · 2021</p>
            </div>
          </div>
        </BentoCard>

        {/* Certifications */}
        <BentoCard isDark={isDark} className={`md:col-span-12 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 mt-4 ${isDark ? "bg-gradient-to-r from-white/[0.03] to-blue-500/[0.05]" : "bg-gradient-to-r from-black/[0.03] to-blue-500/[0.05]"}`} id="achievement">
          <div>
            <h3 className={`text-xs font-bold uppercase tracking-widest mb-1 flex items-center gap-2 ${textAccent}`}><FileBadge className="w-4 h-4" /> {t.certs}</h3>
            <p className={`text-sm md:text-base font-medium max-w-lg ${isDark ? "text-white/80" : "text-gray-800"}`}>{t.certsDesc}</p>
          </div>
          <button type="button" onClick={() => navigateTo("achievements")} className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-transform active:scale-95 shrink-0 ${isDark ? "bg-white text-black hover:bg-white/90" : "bg-black text-white hover:bg-gray-800"}`}>
            {t.viewCerts}
          </button>
        </BentoCard>

        {/* =========================================
            NEW: Diagonal Overlapping Marquees, CTA & Footer
            ========================================= */}
            
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.8 }}
          className="md:col-span-12 w-[100vw] relative left-1/2 -translate-x-1/2 mt-32 overflow-hidden flex flex-col items-center"
        >
          {/* Diagonal Marquees Block */}
          <div className="relative w-full h-[20rem] flex flex-col items-center justify-center">
            {/* Background Role Marquee (Tilted Right) */}
            <motion.div
              className={`absolute flex whitespace-nowrap text-xl md:text-3xl font-black uppercase tracking-widest py-4 w-[120vw] border-y z-0 ${isDark ? 'border-white/10 text-white/40 bg-black' : 'border-black/10 text-black/40 bg-gray-50'}`}
              style={{ rotate: "2deg" }}
            >
                <motion.div animate={{ x: [-1000, 0] }} transition={{ repeat: Infinity, duration: 25, ease: "linear" }} className="flex">
                  <span>{duplicatedRoles}</span>
                </motion.div>
            </motion.div>

            {/* Foreground Skills Marquee (Tilted Left) */}
            <motion.div
              className={`absolute flex whitespace-nowrap text-xl md:text-3xl font-black uppercase tracking-widest py-4 w-[120vw] z-10 ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}
              style={{ rotate: "-2deg" }}
            >
                <motion.div animate={{ x: [0, -1000] }} transition={{ repeat: Infinity, duration: 25, ease: "linear" }} className="flex">
                  <span>{duplicatedSkills}</span>
                </motion.div>
            </motion.div>
          </div>

          {/* Call to Action Section */}
          <div className="flex flex-col items-center text-center mt-12 mb-20 px-4 z-10 w-full max-w-4xl mx-auto">
            <h2 className={`text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[1.1] ${textClass}`}>
              {t.cta1} <br className="hidden md:block" />
              <DynamicWord words={t.ctaWords} /> {t.cta2}
            </h2>
            <p className={`max-w-2xl text-lg md:text-xl mb-12 leading-relaxed ${textMuted}`}>
              {t.ctaSub}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button 
                onClick={() => navigateTo('contact')} 
                className={`px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs flex items-center gap-3 transition-transform active:scale-95 ${isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}
              >
                <MessageCircle size={20} /> {t.hireMe}
              </button>
              <a 
                href="https://drive.google.com/file/d/10VmU6RgWVE8T7v71g_1BkVEhfY1xosuy/view?usp=sharing" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs flex items-center gap-3 border transition-transform active:scale-95 ${isDark ? 'border-white/20 hover:bg-white/10' : 'border-black/20 hover:bg-black/10'} ${textClass}`}
              >
                <FileBadge size={20} /> {t.viewMyResume}
              </a>
            </div>
          </div>

          {/* Global Footer embedded at end of Home */}
          <footer className={`w-full border-t mt-16 pt-8 pb-12 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8 ${borderClass} ${bgSoft}`}>
            <p className={`text-[10px] font-bold tracking-widest uppercase ${textMuted}`}>
              {t.footerCopy}
            </p>
            <div className="flex items-center gap-6">
              <a href="https://github.com/SashiKumarP" target="_blank" rel="noopener noreferrer" className={`${textMuted} hover:${textClass} transition-colors`}><Code size={20} /></a>
              <a href="https://www.linkedin.com/in/sashi-kumar-pentapalli-2aa834172/" target="_blank" rel="noopener noreferrer" className={`${textMuted} hover:${textClass} transition-colors`}><Briefcase size={20} /></a>
              <a href="https://www.instagram.com/sashi_kumar_pentapalli?igsi=bmNsZTU2OGswY3Q0&utm_source=qr" target="_blank" rel="noopener noreferrer" className={`${textMuted} hover:${textClass} transition-colors`}><Camera size={20} /></a>
            </div>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
              className={`px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 border transition-colors ${isDark ? 'border-white/20 bg-white/5 hover:bg-white/10' : 'border-black/20 bg-black/5 hover:bg-black/10'} ${textClass}`}
            >
              {t.more} <ArrowUpRight size={14} className="rotate-[-45deg]" />
            </button>
          </footer>
        </motion.div>

      </main>
    </motion.div>
  );
};

const Projects = ({ isDark }: { t: any; isDark: boolean; key?: string }) => {
  const [filter, setFilter] = useState<"All" | "AI/ML" | "Full-Stack">("All");
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  const textClass = isDark ? "text-white" : "text-gray-900";
  const textMuted = isDark ? "text-white/60" : "text-gray-600";
  const borderClass = isDark ? "border-white/10" : "border-black/10";
  const btnActive = isDark ? "bg-white text-black hover:bg-white/90" : "bg-black text-white hover:bg-gray-900";
  
  const projects = [
    {
      id: "healthcare",
      num: "01",
      title: "Healthcare Cyber Defense",
      desc: "Machine-learning models that classify healthcare network traffic as normal or attack, served through a Streamlit app.",
      detailedDesc: "Trained and compared logistic regression, SVM, random forest and gradient boosting classifiers, plus a Keras neural network, on network-traffic data from healthcare software-defined networks. A Streamlit app loads the trained models to classify new traffic records. Nov 2024 – Mar 2025.",
      link: "https://github.com/SashiKumarP/Healthcare-Cyber-Defense",
      category: "AI/ML",
      stack: ["Python", "scikit-learn", "pandas", "TensorFlow / Keras", "Streamlit"],
      stats: [{ label: "Models compared", value: "5" }, { label: "Interface", value: "Streamlit" }]
    },
    {
      id: "emotion",
      num: "02",
      title: "Facial Emotion Detection",
      desc: "A convolutional neural network that recognises facial emotions in photos, with a desktop app.",
      detailedDesc: "Trained a convolutional neural network with TensorFlow/Keras on 48×48 grayscale face images to classify emotions. A Tkinter desktop app finds the face with OpenCV and labels the emotion in an uploaded image. NullClass project, Aug – Sep 2024.",
      link: "https://github.com/SashiKumarP/Facial-Emotion-Detection",
      category: "AI/ML",
      stack: ["Python", "TensorFlow / Keras", "OpenCV", "Tkinter", "NumPy"],
      stats: [{ label: "Input", value: "48×48 px" }, { label: "Interface", value: "Desktop app" }]
    },
    {
      id: "wams",
      num: "03",
      title: "WAMS 2024 Event Website",
      desc: "Designed and maintained the home and gallery pages of the WAMS 2024 event website.",
      detailedDesc: "Worked with the event team on the design and upkeep of the home and gallery pages of the WAMS 2024 event website, Dec 2023 – Feb 2024. The event site is no longer online.",
      link: "",
      category: "Full-Stack",
      stack: ["Web design", "Team project"],
      stats: [{ label: "Pages", value: "Home & gallery" }, { label: "Period", value: "Dec 2023 – Feb 2024" }]
    }
  ];

  const filteredProjects = projects.filter(p => filter === "All" || p.category === filter);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  const modalContentVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { 
      opacity: 1, y: 0, scale: 1,
      transition: { 
        duration: 0.4, 
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, y: 20, scale: 0.95, 
      transition: { duration: 0.2 } 
    }
  };

  const modalItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } }
  };

  return (
    <motion.div
      key="projects"
      variants={pageVariants}
      initial="pageHidden"
      animate="pageVisible"
      exit="pageExit"
      className="w-full flex flex-col py-12"
    >
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
        <div>
          <h1 className={`text-4xl md:text-6xl font-bold tracking-tighter mb-4 ${textClass}`}>
            Architecting Digital Reality
          </h1>
          <p className={`text-lg md:text-xl font-light ${textMuted}`}>
            Engineering intelligent systems and immersive experiences.
          </p>
        </div>
        
        {/* Filter Controls */}
        <div className={`flex flex-wrap items-center gap-2 p-1 rounded-full border w-max ${borderClass} ${isDark ? "bg-white/5" : "bg-black/5"}`}>
          {(["All", "AI/ML", "Full-Stack"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                filter === cat ? btnActive : `${textMuted} hover:${textClass}`
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="flex flex-col gap-12 w-full relative z-0">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((proj) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ 
                layout: { type: "spring", stiffness: 250, damping: 25 },
                opacity: { duration: 0.25 },
                scale: { duration: 0.25, type: "spring", stiffness: 250, damping: 25 }
              }}
              key={proj.id}
              onClick={() => setSelectedProject(proj)}
              className={`group flex flex-col md:flex-row md:items-center gap-6 md:gap-12 p-6 md:p-8 rounded-3xl border ${borderClass} cursor-pointer transition-all duration-300 ${isDark ? "hover:bg-white/[0.02] hover:shadow-[0_20px_40px_-10px_rgba(255,255,255,0.05)]" : "hover:bg-black/[0.02] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)]"}`}
            >
              <span className={`text-6xl md:text-8xl font-bold tracking-tighter shrink-0 transition-colors duration-300 ${isDark ? "text-white/10 group-hover:text-white/20" : "text-black/10 group-hover:text-black/20"}`}>
                {proj.num}
              </span>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                  <h2 className={`text-2xl md:text-3xl font-bold tracking-tight ${textClass} group-hover:text-blue-500 transition-colors`}>
                    {proj.title}
                  </h2>
                  <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full border w-max ${borderClass} ${textMuted}`}>
                    {proj.category}
                  </span>
                  
                  {/* Hover triggered statistics badge */}
                  <div className="opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 mt-2 md:mt-0">
                    {proj.stats.map((stat, idx) => (
                      <span key={idx} className={`px-2 py-1 text-[9px] font-bold uppercase tracking-widest rounded-md flex items-center gap-1 ${isDark ? "bg-white/10 text-white" : "bg-black/10 text-black"}`}>
                        <span className="opacity-60">{stat.label}:</span> {stat.value}
                      </span>
                    ))}
                  </div>
                </div>
                <p className={`text-sm md:text-base max-w-2xl ${textMuted} group-hover:opacity-80 transition-opacity`}>
                  {proj.desc}
                </p>
              </div>
              <button
                className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-transform active:scale-95 shrink-0 pointer-events-none ${
                  isDark
                    ? "bg-white text-black group-hover:bg-white/90"
                    : "bg-black text-white group-hover:bg-gray-900"
                }`}
              >
                Details <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              variants={modalContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`relative z-10 w-full max-w-2xl p-8 md:p-12 rounded-3xl border shadow-2xl flex flex-col gap-6 max-h-[90vh] overflow-y-auto ${isDark ? "bg-zinc-900 border-white/10" : "bg-white border-black/10"}`}
            >
              <motion.div variants={modalItemVariants} className="flex justify-between items-start gap-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`text-4xl md:text-5xl font-black tracking-tighter ${isDark ? "text-white/20" : "text-black/20"}`}>
                    {selectedProject.num}
                  </span>
                  <h3 className={`text-3xl md:text-4xl font-bold tracking-tight ${textClass}`}>
                    {selectedProject.title}
                  </h3>
                </div>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className={`p-2 rounded-full border transition-colors shrink-0 ${isDark ? "border-white/20 hover:bg-white/10 text-white" : "border-black/20 hover:bg-black/10 text-black"}`}
                >
                  <X className="w-5 h-5" />
                </button>
              </motion.div>

              <motion.div variants={modalItemVariants} className="flex flex-wrap gap-2 mb-2">
                 <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full border ${borderClass} ${textMuted}`}>
                    {selectedProject.category}
                 </span>
                 {selectedProject.stats.map((stat: any, idx: number) => (
                    <span key={idx} className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full flex items-center gap-1 ${isDark ? "bg-white/10 text-white" : "bg-black/10 text-black"}`}>
                      <span className="opacity-60">{stat.label}:</span> {stat.value}
                    </span>
                 ))}
              </motion.div>

              <motion.p variants={modalItemVariants} className={`text-base md:text-lg leading-relaxed ${textMuted}`}>
                {selectedProject.detailedDesc}
              </motion.p>

              <motion.div variants={modalItemVariants}>
                <h4 className={`text-[10px] font-bold uppercase tracking-widest mb-3 ${textClass}`}>Tech Stack</h4>
                <motion.div 
                  className="flex flex-wrap gap-2"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { 
                      opacity: 1,
                      transition: { staggerChildren: 0.05 }
                    }
                  }}
                >
                  {selectedProject.stack.map((tech: string, i: number) => (
                    <motion.span 
                      key={i} 
                      variants={{
                        hidden: { opacity: 0, scale: 0.8, y: 10 },
                        visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } }
                      }}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg border ${borderClass} ${isDark ? "bg-white/5 text-white/80" : "bg-black/5 text-black/80"}`}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>

              {selectedProject.link && <motion.div variants={modalItemVariants} className="mt-4 pt-6 border-t flex justify-end gap-4" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}}>
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className={`px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-3 transition-transform active:scale-95 group ${isDark ? "bg-white text-black hover:bg-white/90" : "bg-black text-white hover:bg-gray-900"}`}
                >
                  <Code size={16} /> Repository <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </motion.div>}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Skills = ({ isDark }: { t: any; isDark: boolean; key?: string }) => {
  const textClass = isDark ? "text-white" : "text-gray-900";
  const borderClass = isDark ? "border-white/10" : "border-black/10";
  const bgSoft = isDark ? "bg-white/5" : "bg-black/5";
  const pillBg = isDark ? "bg-white/10 text-white" : "bg-black/10 text-black";

  const stack = [
    "PYTHON", "MACHINE LEARNING", "SQL", "DJANGO", "FLASK", "DEVOPS", "WORDPRESS", "JAVA", "REACT", "TAILWIND CSS"
  ];

  const marqueeItems = [...stack, ...stack, ...stack, ...stack];

  const categories = [
    {
      title: "AI & Intelligence",
      icon: BrainCircuit,
      gradient: isDark ? "from-purple-500/20" : "from-purple-500/10",
      skills: ["Machine Learning", "Large Language Models (LLMs)", "PyTorch", "NLP"]
    },
    {
      title: "Full-Stack Engineering",
      icon: Terminal,
      gradient: isDark ? "from-blue-500/20" : "from-blue-500/10",
      skills: ["Python", "Django", "Flask", "SQL", "Java"]
    },
    {
      title: "Frontend & Ecosystem",
      icon: Monitor,
      gradient: isDark ? "from-green-500/20" : "from-green-500/10",
      skills: ["React", "Tailwind CSS", "HTML/CSS", "JavaScript"]
    },
    {
      title: "Infrastructure",
      icon: Cloud,
      gradient: isDark ? "from-orange-500/20" : "from-orange-500/10",
      skills: ["DevOps", "WordPress", "Git"]
    }
  ];

  const containerVariants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div
      key="skills"
      variants={pageVariants}
      initial="pageHidden"
      animate="pageVisible"
      exit="pageExit"
      className="w-full flex flex-col pt-12 pb-24 overflow-hidden"
    >
      {/* Infinite Scrolling Marquee */}
      <div className="relative w-[100vw] left-1/2 -translate-x-1/2 flex flex-col gap-6 mb-24 overflow-hidden">
        <div className="flex w-max">
          <motion.div
            animate={{ x: [0, -2000] }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
            className="flex gap-8 items-center"
          >
            {marqueeItems.map((item, idx) => (
              <div key={`r1-${idx}`} className="flex items-center gap-8">
                <span className={`text-6xl md:text-8xl font-black uppercase tracking-tighter whitespace-nowrap ${isDark ? "text-white/10" : "text-black/10"}`}>{item}</span>
                <Globe className={`w-12 h-12 md:w-16 md:h-16 ${isDark ? "text-white/10" : "text-black/10"}`} />
              </div>
            ))}
          </motion.div>
        </div>
        <div className="flex w-max">
          <motion.div
            animate={{ x: [-2000, 0] }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
            className="flex gap-8 items-center"
          >
            {marqueeItems.map((item, idx) => (
              <div key={`r2-${idx}`} className="flex items-center gap-8">
                <span className={`text-6xl md:text-8xl font-black uppercase tracking-tighter whitespace-nowrap ${isDark ? "text-white/10" : "text-black/10"}`}>{item}</span>
                <Code className={`w-12 h-12 md:w-16 md:h-16 ${isDark ? "text-white/10" : "text-black/10"}`} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Interactive Domain Cards */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mx-auto"
      >
        {categories.map((cat, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -5 }}
            className={`relative overflow-hidden flex flex-col p-8 md:p-10 rounded-[2rem] border transition-colors ${borderClass} ${bgSoft} bg-gradient-to-br ${cat.gradient} to-transparent backdrop-blur-xl`}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className={`p-4 rounded-2xl ${isDark ? "bg-white/10" : "bg-black/10"}`}>
                <cat.icon className={`w-8 h-8 ${textClass}`} />
              </div>
              <h2 className={`text-2xl md:text-3xl font-bold tracking-tight ${textClass}`}>{cat.title}</h2>
            </div>
            <div className="flex flex-wrap gap-3 mt-auto">
              {cat.skills.map((skill, j) => (
                <span key={j} className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md border ${borderClass} ${pillBg}`}>
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

const Contact = ({ t, isDark }: { t: any; isDark: boolean; key?: string }) => {
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 3000);
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 3000);
      return;
    }
    // No mail backend: hand the message to the visitor's own email app.
    const subject = formData.subject.trim() || `Message from ${formData.name.trim()}`;
    const body = `${formData.message.trim()}\n\n${formData.name.trim()}\n${formData.email.trim()}`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setFormStatus("success");
    setTimeout(() => setFormStatus("idle"), 4000);
  };

  const textClass = isDark ? "text-white" : "text-gray-900";
  const textMuted = isDark ? "text-white/60" : "text-gray-600";
  const borderClass = isDark ? "border-white/20" : "border-black/20";
  const bgSoft = isDark ? "bg-white/5" : "bg-black/5";
  const hoverBgSoft = isDark ? "hover:bg-white/10" : "hover:bg-black/10";
  const inputClass = `w-full bg-transparent border-b pb-4 text-xs font-bold outline-none transition-colors uppercase tracking-widest resize-none ${borderClass} ${
    isDark ? "focus:border-white placeholder:text-white/30 text-white" : "focus:border-black placeholder:text-gray-400 text-gray-900"
  }`;

  return (
    <motion.div
      key="contact"
      variants={pageVariants}
      initial="pageHidden"
      animate="pageVisible"
      exit="pageExit"
      className="w-full flex flex-col gap-16 py-12 lg:py-24"
    >
      <div className="w-full flex flex-col lg:flex-row gap-16 items-center justify-center">
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className={`w-full max-w-[320px] backdrop-blur-2xl border rounded-[2rem] p-8 flex flex-col items-center shadow-2xl relative shrink-0 ${isDark ? "bg-white/[0.03] border-white/10" : "bg-black/[0.03] border-black/10"}`}
      >
        <div className={`w-16 h-3 border rounded-full mb-8 shrink-0 shadow-inner ${isDark ? "border-white/20 bg-black/20" : "border-black/20 bg-white/20"}`}></div>
        <div className={`w-32 h-40 rounded-2xl mb-6 relative overflow-hidden flex items-center justify-center ${isDark ? "bg-white/10" : "bg-black/5"}`}>
          <Smile className={`w-12 h-12 ${isDark ? "text-white/20" : "text-black/20"}`} />
        </div>
        <h2 className={`text-xl font-bold tracking-widest text-center leading-tight mb-2 ${textClass}`}>
          SASHI KUMAR<br />PENTAPALLI
        </h2>
        <p className={`text-[10px] tracking-[0.2em] text-center mb-10 ${isDark ? "text-white/50" : "text-gray-500"}`}>
          {t.role.toUpperCase()}
        </p>
        <div
          className={`w-full h-12 mt-auto ${isDark ? "opacity-30" : "opacity-50"}`}
          style={{ backgroundImage: `repeating-linear-gradient(90deg, ${isDark ? "#fff" : "#000"} 0, ${isDark ? "#fff" : "#000"} 2px, transparent 2px, transparent 4px, ${isDark ? "#fff" : "#000"} 4px, ${isDark ? "#fff" : "#000"} 6px, transparent 6px, transparent 10px, ${isDark ? "#fff" : "#000"} 10px, ${isDark ? "#fff" : "#000"} 14px, transparent 14px, transparent 16px)` }}
        ></div>
      </motion.div>

      <div className="flex-1 w-full flex flex-col">
        <h1 className={`text-5xl md:text-7xl font-bold tracking-tighter mb-4 ${textClass}`}>{t.letsTalk}</h1>
        <p className={`mb-12 max-w-md ${textMuted}`}>{t.idea}</p>
        <form className="flex flex-col gap-10 w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-10">
            <input type="text" placeholder={t.name} required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={`flex-1 ${inputClass} ${formStatus === "error" && !formData.name.trim() ? "!border-red-500 placeholder:text-red-500/50" : ""}`} />
            <input type="email" placeholder={t.email} required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={`flex-1 ${inputClass} ${formStatus === "error" && (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) ? "!border-red-500 placeholder:text-red-500/50" : ""}`} />
          </div>
          <input type="text" placeholder={t.subject} value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className={inputClass} />
          <textarea placeholder={t.project} rows={4} required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className={`${inputClass} ${formStatus === "error" && !formData.message.trim() ? "!border-red-500 placeholder:text-red-500/50" : ""}`}></textarea>
          <button type="submit" disabled={formStatus === "loading" || formStatus === "success"} className={`mt-4 flex items-center gap-4 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs transition-all active:scale-95 self-start group ${isDark ? "bg-white text-black hover:bg-white/90" : "bg-black text-white hover:bg-gray-900"} ${formStatus === "success" ? "!bg-green-500 !text-white" : formStatus === "error" ? "!bg-red-500 !text-white" : ""} disabled:opacity-70 disabled:active:scale-100`}>
            {formStatus === "loading" ? "OPENING EMAIL..." : formStatus === "success" ? "EMAIL APP OPENED" : formStatus === "error" ? "CHECK FIELDS" : t.send}
            {formStatus === "idle" && <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />}
          </button>
        </form>
      </div>
      </div>

      <div className="w-full flex flex-col gap-4 mt-12">
        <h3 className={`text-xs font-bold uppercase tracking-widest ${textMuted}`}>Connect & Socials</h3>
        <div className="flex flex-wrap gap-4">
            <a href="https://github.com/SashiKumarP" target="_blank" rel="noopener noreferrer" className={`px-6 py-4 rounded-full border transition-colors flex items-center justify-center gap-3 ${bgSoft} ${borderClass} ${hoverBgSoft}`}>
              <Code size={20} className={isDark ? "text-white" : "text-black"} />
              <span className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? "text-white" : "text-black"}`}>GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/sashi-kumar-pentapalli-2aa834172/" target="_blank" rel="noopener noreferrer" className={`px-6 py-4 rounded-full border transition-colors flex items-center justify-center gap-3 ${bgSoft} ${borderClass} ${hoverBgSoft}`}>
              <Briefcase size={20} className={isDark ? "text-white" : "text-black"} />
              <span className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? "text-white" : "text-black"}`}>LinkedIn</span>
            </a>
            <a href="https://www.instagram.com/sashi_kumar_pentapalli?igsi=bmNsZTU2OGswY3Q0&utm_source=qr" target="_blank" rel="noopener noreferrer" className={`px-6 py-4 rounded-full border transition-colors flex items-center justify-center gap-3 ${bgSoft} ${borderClass} ${hoverBgSoft}`}>
              <Camera size={20} className={isDark ? "text-white" : "text-black"} />
              <span className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? "text-white" : "text-black"}`}>Instagram</span>
            </a>
            <a href={`mailto:${CONTACT_EMAIL}`} className={`px-6 py-4 rounded-full border transition-colors flex items-center justify-center gap-3 ${bgSoft} ${borderClass} ${hoverBgSoft}`}>
              <Mail size={20} className={isDark ? "text-white" : "text-black"} />
              <span className={`text-[10px] font-bold tracking-wider ${isDark ? "text-white" : "text-black"}`}>{CONTACT_EMAIL}</span>
            </a>
            <a href="tel:+393522891914" className={`px-6 py-4 rounded-full border transition-colors flex items-center justify-center gap-3 ${bgSoft} ${borderClass} ${hoverBgSoft}`}>
              <Phone size={20} className={isDark ? "text-white" : "text-black"} />
              <span className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? "text-white" : "text-black"}`}>+39 352 289 1914</span>
            </a>
            <a href="https://wa.me/917893844609" target="_blank" rel="noopener noreferrer" className={`px-6 py-4 rounded-full border transition-colors flex items-center justify-center gap-3 ${bgSoft} ${borderClass} ${hoverBgSoft}`}>
              <MessageCircle size={20} className="text-green-500" />
              <span className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? "text-white" : "text-black"}`}>Scan to Chat</span>
            </a>
        </div>
      </div>
    </motion.div>
  );
};

/* =========================================
   3. Main App Layout (Routing & Header)
   ========================================= */

const themeVariants = { 
  hidden: { opacity: 0, filter: "blur(10px)" }, 
  visible: { opacity: 1, filter: "blur(0px)", transition: { duration: 0.5, ease: "easeInOut" as const } } 
};

const pageVariants = { 
  pageHidden: { opacity: 0, y: 40 }, 
  pageVisible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }, 
  pageExit: { opacity: 0, y: -40 } 
};

/* =========================================
   Global Pointer Glow
   ========================================= */
function CursorGlow({ isDark }: { isDark: boolean }) {
  const glowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    let raf = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== "mouse") return;
      targetX = event.clientX;
      targetY = event.clientY;
    };

    const render = () => {
      currentX += (targetX - currentX) * 0.16;
      currentY += (targetY - currentY) * 0.16;
      glow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate3d(-50%, -50%, 0)`;
      raf = window.requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    raf = window.requestAnimationFrame(render);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className={`pointer-glow ${isDark ? "pointer-glow-dark" : "pointer-glow-light"}`}
    />
  );
}

export default function App() {
  const [activePage, setActivePage] = useState<Page>("home");
  const [showIntro, setShowIntro] = useState(true);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [language, setLanguage] = useState<Language>("EN");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [transitioningTo, setTransitioningTo] = useState<string | null>(null);

  const isDark = theme === "dark";
  const t = dict[language];

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 150]);

  const handleNavigate = (page: Page) => {
    if (page === activePage || transitioningTo) return;
    setIsMobileMenuOpen(false);
    setIsAboutOpen(false);
    setTransitioningTo(page);
    setTimeout(() => {
      setActivePage(page);
      setTransitioningTo(null);
    }, 600);
  };

  const handleThemeToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const goToHomeSection = (id: string) => {
    setIsAboutOpen(false);
    if (activePage !== "home") {
      setTransitioningTo("home");
      window.setTimeout(() => {
        setActivePage("home");
        setTransitioningTo(null);
        window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
      }, 600);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsAboutOpen(false);
        setIsLangMenuOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div
      className={`min-h-screen font-sans relative overflow-x-hidden selection:bg-blue-500/30 transition-colors duration-500 ${
        isDark ? "bg-black text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Global pointer glow: follows the mouse across the entire site */}
      <CursorGlow isDark={isDark} />

      {/* 3.0 Scroll Progress Bar */}
      <motion.div
        className={`fixed top-0 left-0 right-0 h-[3px] z-[1000] origin-left ${
          isDark ? "bg-white" : "bg-black"
        }`}
        style={{ scaleX }}
      />

      <AnimatePresence>{showIntro && <HelloIntro isDark={isDark} onDone={() => setShowIntro(false)} />}</AnimatePresence>

      {/* 3.05. Scroll-reactive pattern field */}
      <motion.div
        aria-hidden
        style={{ rotate: useTransform(scrollYProgress, [0, 1], [0, 18]), scale: useTransform(scrollYProgress, [0, 1], [1, 1.15]), opacity: useTransform(scrollYProgress, [0, 0.35, 1], [0.16, 0.08, 0.12]) }}
        className={`fixed -inset-[35%] pointer-events-none z-0 ${isDark ? "text-white" : "text-black"}`}
      >
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)", backgroundSize: "44px 44px" }} />
      </motion.div>

      {/* 3.1. Flash Transition Overlay */}
      <AnimatePresence>
        {transitioningTo && (
          <motion.div
            key="flash-overlay"
            initial={{ y: "100vh" }}
            animate={{ y: 0 }}
            exit={{ y: "-100vh" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed inset-0 z-[100] flex items-center justify-center ${
              isDark ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            <span className="text-5xl md:text-7xl font-bold uppercase tracking-widest">
              {t[transitioningTo as keyof typeof t] || transitioningTo}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3.2. Background Cinematic Gradients */}
      <motion.div
        style={{ y: y1 }}
        className={`fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] pointer-events-none transition-opacity duration-500 ${
          isDark ? "bg-purple-600/20" : "bg-purple-500/10"
        }`}
      ></motion.div>
      <motion.div
        style={{ y: y2 }}
        className={`fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] pointer-events-none transition-opacity duration-500 ${
          isDark ? "bg-blue-600/20" : "bg-blue-500/10"
        }`}
      ></motion.div>
      <motion.div
        style={{ y: y3 }}
        className={`fixed top-[40%] left-[60%] w-[30%] h-[30%] rounded-full blur-[100px] pointer-events-none transition-opacity duration-500 ${
          isDark ? "bg-orange-600/10" : "bg-orange-500/5"
        }`}
      ></motion.div>

      {/* 3.3. Main Application Container */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={theme}
          variants={themeVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="flex flex-col min-h-screen relative z-10"
        >
          {/* Global Header */}
          <header
          className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-6 md:px-12 backdrop-blur-md border-b ${
            isDark
              ? "bg-black/20 border-white/5"
              : "bg-white/40 border-black/5"
          }`}
        >
          {/* Logo */}
          <div
            className={`text-2xl font-bold tracking-tighter cursor-pointer ${
              isDark ? "text-white" : "text-gray-900"
            }`}
            onClick={() => handleNavigate("home")}
          >
            SK<span className="text-blue-500">.</span>
          </div>

          {/* Desktop Navigation Pills */}
          <nav
            className={`hidden md:flex items-center gap-1 p-1 rounded-full border relative ${
              isDark
                ? "bg-white/5 border-white/10"
                : "bg-black/5 border-black/10"
            }`}
          >
            <button
              onClick={() => handleNavigate("home")}
              className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${
                activePage === "home"
                  ? isDark ? "bg-white text-black" : "bg-black text-white"
                  : isDark ? "text-white/60 hover:text-white" : "text-gray-600 hover:text-black"
              }`}
            >
              {t.home}
            </button>
            
            <button
              onClick={() => setIsAboutOpen(!isAboutOpen)}
              className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-colors flex items-center gap-1 ${
                activePage === "projects" || isAboutOpen
                  ? isDark ? "bg-white/10 text-white" : "bg-black/10 text-black"
                  : isDark ? "text-white/60 hover:text-white" : "text-gray-600 hover:text-black"
              }`}
            >
              About <ChevronDown className={`w-3 h-3 transition-transform ${isAboutOpen ? "rotate-180" : ""}`} />
            </button>

            <button
              onClick={() => handleNavigate("contact")}
              className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${
                activePage === "contact"
                  ? isDark ? "bg-white text-black" : "bg-black text-white"
                  : isDark ? "text-white/60 hover:text-white" : "text-gray-600 hover:text-black"
              }`}
            >
              {t.contact}
            </button>
          </nav>

          {/* Right Widgets & Mobile Menu Toggle */}
          <div className="flex items-center gap-4 md:gap-6">
            <div
              className={`hidden sm:block text-[10px] font-bold tracking-[0.2em] ${
                isDark ? "text-white/60" : "text-gray-600"
              }`}
            >
              <LiveClock />
            </div>
            <button
              onClick={handleThemeToggle}
              className={`transition-colors ${
                isDark
                  ? "text-white/60 hover:text-white"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className={`flex items-center gap-1 text-[10px] font-bold tracking-[0.2em] transition-colors ${
                  isDark
                    ? "text-white/60 hover:text-white"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                {language}
                <ChevronDown className={`w-3 h-3 transition-transform ${isLangMenuOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {isLangMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className={`absolute top-full right-0 mt-4 p-2 rounded-2xl border shadow-2xl backdrop-blur-3xl flex flex-col gap-1 min-w-[120px] z-50 ${
                      isDark ? "bg-black/90 border-white/10" : "bg-white/90 border-black/10"
                    }`}
                  >
                    {(["EN", "IT", "DE", "HI"] as Language[]).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setLanguage(lang);
                          setIsLangMenuOpen(false);
                        }}
                        className={`px-4 py-2 text-left rounded-xl text-[10px] font-bold tracking-[0.2em] transition-colors ${
                          language === lang
                            ? isDark
                              ? "bg-white text-black"
                              : "bg-black text-white"
                            : isDark
                            ? "text-white/60 hover:bg-white/10 hover:text-white"
                            : "text-gray-600 hover:bg-black/5 hover:text-black"
                        }`}
                      >
                        {lang === "EN" ? "ENGLISH" : lang === "IT" ? "ITALIANO" : lang === "DE" ? "DEUTSCH" : "HINDI"}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Hamburger */}
            <button
              className={`md:hidden p-2 -mr-2 transition-colors ${
                isDark ? "text-white" : "text-black"
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Mega Menu (About Dropdown) */}
        <AnimatePresence>
          {isAboutOpen && (
            <>
              <motion.button
                aria-label="Close About menu"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsAboutOpen(false)}
                className="fixed inset-0 z-[160] cursor-default bg-black/10 dark:bg-black/40 backdrop-blur-[2px]"
              />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={`fixed top-[86px] md:top-24 left-1/2 -translate-x-1/2 w-[calc(100vw-2rem)] md:w-full max-w-5xl z-[180] p-4 md:p-6 rounded-3xl backdrop-blur-3xl border shadow-2xl ${
                isDark ? "bg-black/80 border-white/10" : "bg-white/90 border-black/10"
              }`}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-fr min-h-[360px] md:min-h-[330px]">
                {[
                  { label: "Project", hint: "Architecting digital reality.", icon: Rocket, action: () => handleNavigate("projects"), featured: true },
                  { label: "Experience", hint: "Professional journey", icon: Briefcase, action: () => goToHomeSection("experience") },
                  { label: "Skill", hint: "Tech stack & expertise", icon: Cpu, action: () => handleNavigate("skills") },
                  { label: "Achievement", hint: "Credentials & honors", icon: Award, action: () => handleNavigate("achievements") },
                  { label: "Resume", hint: "Open CV", icon: GraduationCap, href: "https://drive.google.com/file/d/10VmU6RgWVE8T7v71g_1BkVEhfY1xosuy/view?usp=sharing" },
                  { label: "Chat", hint: "Start a conversation", icon: MessageCircle, action: () => handleNavigate("contact") },
                ].map((item, idx) => {
                  const ItemIcon = item.icon;
                  const commonClass = `group rounded-2xl p-4 border flex flex-col justify-between gap-4 transition-all hover:-translate-y-1 hover:scale-[1.02] cursor-pointer ${
                    item.featured ? "col-span-2 row-span-2" : ""
                  } ${isDark ? "bg-white/5 border-white/10 hover:bg-white/10" : "bg-black/5 border-black/10 hover:bg-black/10"}`;
                  const content = (
                    <>
                      <div className="flex items-start justify-between">
                        <div className={`p-2.5 rounded-xl ${isDark ? "bg-white/5" : "bg-black/5"}`}>
                          <ItemIcon className={`w-5 h-5 ${isDark ? "text-white/70" : "text-black/60"}`} />
                        </div>
                        <ArrowUpRight className={`w-4 h-4 opacity-30 group-hover:opacity-100 ${isDark ? "text-white" : "text-black"}`} />
                      </div>
                      <div>
                        <span className={`text-xs md:text-sm font-black uppercase tracking-[0.12em] ${isDark ? "text-white" : "text-black"}`}>{item.label}</span>
                        <span className={`block text-[10px] mt-1 leading-relaxed ${isDark ? "text-white/45" : "text-black/50"}`}>{item.hint}</span>
                      </div>
                    </>
                  );
                  
                  if (item.href) {
                    return (
                      <a key={idx} href={item.href} target="_blank" rel="noopener noreferrer" className={commonClass}>
                        {content}
                      </a>
                    );
                  }
                  
                  return (
                    <button type="button" key={idx} onClick={item.action} className={`${commonClass} text-left`}>
                      {content}
                    </button>
                  );
                })}
              </div>
            </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Mobile Dropdown Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`fixed top-20 left-4 right-4 z-40 rounded-2xl p-4 flex flex-col gap-2 backdrop-blur-2xl border shadow-xl md:hidden ${
                isDark
                  ? "bg-black/80 border-white/10"
                  : "bg-white/80 border-black/10"
              }`}
            >
              {(["home", "projects", "skills", "contact"] as const).map((page) => (
                <button
                  key={page}
                  onClick={() => handleNavigate(page)}
                  className={`px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-[0.2em] text-left transition-colors ${
                    activePage === page
                      ? isDark
                        ? "bg-white text-black"
                        : "bg-black text-white"
                      : isDark
                      ? "text-white/60 hover:bg-white/5"
                      : "text-gray-600 hover:bg-black/5"
                  }`}
                >
                  {t[page as keyof typeof t] || page}
                </button>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <main className="flex-grow flex flex-col relative pt-24 md:pt-32 px-4 md:px-8 lg:px-12 w-full max-w-[1600px] mx-auto">
          <AnimatePresence mode="wait">
            {activePage === "home" && <Home key="home" t={t} isDark={isDark} navigateTo={handleNavigate} onOpenAbout={() => { window.scrollTo({ top: 0, behavior: "smooth" }); setIsAboutOpen(true); }} />}
            {activePage === "projects" && <Projects key="projects" t={t} isDark={isDark} />}
            {activePage === "skills" && <Skills key="skills" t={t} isDark={isDark} />}
            {activePage === "contact" && <Contact key="contact" t={t} isDark={isDark} />}
            {activePage === "achievements" && <AchievementsPage key="achievements" isDark={isDark} onBack={() => handleNavigate("home")} />}
          </AnimatePresence>
        </main>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
