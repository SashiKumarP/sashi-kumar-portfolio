import React, { useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Award,
  Calendar,
  ExternalLink,
  FileBadge,
  Filter,
  Search,
  Trophy,
  X,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

export type AchievementEntry = {
  id: string;
  title: string;
  issuer: string;
  category: "certification" | "internship" | "education";
  file: string;
  thumb: string;
  date?: string;
  credential?: string;
};

const entries: AchievementEntry[] = [
  { id: "ai-ml-aws", title: "AI/ML Virtual Internship (AWS Academy)", issuer: "AICTE – EduSkills", category: "internship", file: "AI-ML Virtual internship AWS.pdf", thumb: "AI-ML_Virtual_internship_AWS.jpg", date: "May – Jul 2023" },
  { id: "ai-ml-google", title: "AI/ML Virtual Internship (Google for Developers)", issuer: "AICTE – EduSkills", category: "internship", file: "AI-ML Virtual internship GOOGLE.pdf", thumb: "AI-ML_Virtual_internship_GOOGLE.jpg", date: "Jul – Sep 2024" },
  { id: "data-engineering-aws", title: "Data Engineering Virtual Internship (AWS Academy)", issuer: "AICTE – EduSkills", category: "internship", file: "Data Engineering Virtual internship AWS.pdf", thumb: "Data_Engineering_Virtual_internship_AWS.jpg", date: "Jan – Mar 2025" },
  { id: "full-stack-hmi", title: "Full Stack Web Development Using Python", issuer: "HMI Engineering Services", category: "internship", file: "FULL STACK WEB DEVELOPMENT HMI.pdf", thumb: "FULL_STACK_WEB_DEVELOPMENT_HMI.jpg", date: "May 14 – Jul 20, 2024" },
  { id: "mandemit-data-science", title: "Data Science Internship", issuer: "MandemIT", category: "internship", file: "MandemIT Data Science.pdf", thumb: "MandemIT_Data_Science.jpg", date: "Aug 28, 2024 – Dec 07, 2025" },
  { id: "rpa-blueprism", title: "RPA Virtual Internship (Blue Prism)", issuer: "AICTE – EduSkills", category: "internship", file: "RPA virtual Internship Blueprism.pdf", thumb: "RPA_virtual_Internship_Blueprism.jpg" },
  { id: "web-certimate", title: "Web Development Internship", issuer: "Certimate Infotech", category: "internship", file: "Web Development Internship Certimate.pdf", thumb: "Web_Development_Internship_Certimate.jpg", date: "Mar 05 – Jun 04, 2023", credential: "CIPL-B4/48744" },
  { id: "internship-certificate", title: "Long-Term Internship, 240 hours (Google AI-ML & AWS Data Engineering)", issuer: "EduSkills · AP State Council of Higher Education", date: "Mar 2025", category: "internship", file: "sashi  KUMAR PENTAPALLI_internship_certificate.pdf", thumb: "sashi__KUMAR_PENTAPALLI_internship_certificate.jpg" },
];

const heroCards = entries.slice(0, 6);

const categoryLabel: Record<AchievementEntry["category"], string> = {
  certification: "CERTIFICATION",
  internship: "INTERNSHIP",
  education: "EDUCATION",
};

function HeroCard({ entry, index, progress, card }: { entry: AchievementEntry; index: number; progress: any; card: (string | number)[] }) {
  const [l, t, w, h, r, order] = card;
  const finalLeft = index % 3 === 0 ? "15%" : index % 3 === 1 ? "43%" : "71%";
  const finalTop = index < 3 ? "18%" : "58%";
  const finalWidth = index % 3 === 0 ? "25%" : index % 3 === 1 ? "24%" : "23%";
  const finalHeight = index < 3 ? "34%" : "30%";
  const left = useTransform(progress, [0, 0.86], [String(l), finalLeft]);
  const top = useTransform(progress, [0, 0.86], [String(t), finalTop]);
  const width = useTransform(progress, [0, 0.86], [String(w), finalWidth]);
  const height = useTransform(progress, [0, 0.86], [String(h), finalHeight]);
  const rotate = useTransform(progress, [0, 0.86], [Number(r), 0]);
  const radius = useTransform(progress, [0, 0.86], [18, 10]);
  const opacity = useTransform(progress, [0, 0.14, 0.58], [0.72, 1, 1]);

  return (
    <motion.div
      className="absolute overflow-hidden rounded-[18px] border border-white/10 bg-white/[.05] shadow-2xl backdrop-blur-sm"
      style={{ zIndex: Number(order), left, top, width, height, rotate, borderRadius: radius, opacity }}
    >
      <img src={`/achievement-thumbs/${entry.thumb}`} alt="" className="h-full w-full object-cover opacity-70" />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-4 pt-12">
        <p className="text-[8px] font-black uppercase tracking-[.25em] text-white/50">{categoryLabel[entry.category]}</p>
        <h3 className="mt-1 text-sm font-black text-white">{entry.title}</h3>
      </div>
    </motion.div>
  );
}

function HeroMosaic() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 100, damping: 26, mass: 0.35 });
  const titleOpacity = useTransform(p, [0, 0.58, 0.82], [1, 1, 0]);
  const titleY = useTransform(p, [0, 0.82], [0, -60]);
  const shellScale = useTransform(p, [0, 1], [1, 0.98]);
  const cards = [
    ["6%", "18%", "22%", "26%", -8, 1],
    ["38%", "12%", "20%", "23%", 6, 2],
    ["70%", "17%", "22%", "25%", 10, 3],
    ["8%", "68%", "20%", "23%", 7, 4],
    ["43%", "73%", "20%", "19%", -5, 5],
    ["75%", "66%", "18%", "25%", 6, 6],
  ];

  return (
    <section ref={ref} className="relative h-[118vh] w-full border-b border-white/10">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(124,58,237,.16),transparent_34%),radial-gradient(circle_at_80%_55%,rgba(59,130,246,.13),transparent_38%),#050505]" />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:48px_48px]" />

        <motion.div style={{ opacity: titleOpacity, y: titleY }} className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center pointer-events-none">
          <span className="mb-5 rounded-full border border-white/10 bg-white/[.04] px-4 py-1.5 text-[9px] font-black uppercase tracking-[.35em] text-white/60">Professional Milestones</span>
          <h1 className="text-6xl font-black leading-[.9] tracking-[-.07em] text-white md:text-8xl lg:text-[8rem]">Certificates<br /><span className="bg-gradient-to-r from-white via-blue-300 to-violet-400 bg-clip-text text-transparent">& Awards</span></h1>
          <p className="mt-7 max-w-2xl text-sm leading-7 text-white/55 md:text-base">A visual archive of internships, education credentials and verified learning milestones.</p>
          <div className="mt-10 flex items-center gap-2 text-[9px] font-black uppercase tracking-[.35em] text-white/35">Scroll to explore <span className="animate-bounce">↓</span></div>
        </motion.div>

        <motion.div style={{ scale: shellScale }} className="absolute inset-0 z-10">
          {heroCards.map((entry, i) => <HeroCard key={entry.id} entry={entry} index={i} progress={p} card={cards[i]} />)}
        </motion.div>
      </div>
    </section>
  );
}

export default function AchievementsPage({ isDark, onBack }: { isDark: boolean; onBack: () => void }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"all" | AchievementEntry["category"]>("all");
  const [selected, setSelected] = useState<AchievementEntry | null>(null);
  const [sortNewest, setSortNewest] = useState(true);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const list = entries.filter((item) => {
      const matchCategory = category === "all" || item.category === category;
      const haystack = `${item.title} ${item.issuer}`.toLowerCase();
      return matchCategory && (!normalized || haystack.includes(normalized));
    });
    return sortNewest ? list : [...list].reverse();
  }, [query, category, sortNewest]);

  const stats = {
    total: entries.length,
    internships: entries.filter((e) => e.category === "internship").length,
  };

  return (
    <div className={`achievements-page w-full min-h-screen ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
      <button onClick={onBack} className="fixed left-5 top-24 z-[120] inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/55 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white backdrop-blur-xl transition hover:bg-white hover:text-black">
        <ArrowLeft className="h-3.5 w-3.5" /> Back
      </button>

      <HeroMosaic />

      <section className="relative z-10 mx-auto w-full max-w-[1500px] px-5 pt-8 pb-16 md:px-10 md:pt-12 md:pb-24">
        <div className="mb-10 flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-[.35em] text-white/35">
              <span className="h-px w-8 bg-white/20" /> THE ARCHIVE
            </div>
            <h2 className="mt-4 text-4xl font-black tracking-[-.05em] md:text-6xl">Credentials & Milestones</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/45">Explore the certificates, internships and academic records that support my engineering journey.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {[{ label: "TOTAL", value: stats.total, icon: Award }, { label: "INTERNSHIPS", value: stats.internships, icon: Trophy }].map((s) => {
              const Icon = s.icon;
              return <div key={s.label} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[.03] px-4 py-2 text-[10px] font-black tracking-widest text-white/65"><Icon className="h-3.5 w-3.5" /> {s.label} <span className="text-white">{s.value}</span></div>;
            })}
          </div>
        </div>

        <div className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {[{ key: "all", label: "All" }, { key: "internship", label: "Internships" }].map((item) => (
              <button key={item.key} onClick={() => setCategory(item.key as typeof category)} className={`rounded-full border px-4 py-2 text-[9px] font-black uppercase tracking-widest transition ${category === item.key ? "border-white bg-white text-black" : "border-white/10 bg-white/[.03] text-white/55 hover:bg-white/[.08]"}`}><Filter className="mr-1 inline h-3 w-3" />{item.label}</button>
            ))}
          </div>
          <div className="flex gap-2">
            <div className="relative min-w-64 flex-1"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/25" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search archive..." className="w-full rounded-xl border border-white/10 bg-white/[.03] py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-white/25" /></div>
            <button onClick={() => setSortNewest((v) => !v)} className="rounded-xl border border-white/10 bg-white/[.03] px-4 text-[9px] font-black uppercase tracking-widest text-white/55 hover:bg-white/[.08]">{sortNewest ? "Newest" : "Oldest"}</button>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((entry, index) => (
            <motion.article key={entry.id} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.55, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }} whileHover={{ y: -5 }} className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[.03] shadow-2xl">
              <button onClick={() => setSelected(entry)} className="block w-full text-left">
                <div className="relative aspect-[16/10] overflow-hidden bg-white/5">
                  <img src={`/achievement-thumbs/${entry.thumb}`} alt={entry.title} className="h-full w-full object-cover opacity-75 transition duration-700 group-hover:scale-105 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent" />
                  <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/50 px-3 py-1 text-[8px] font-black uppercase tracking-[.25em] text-white/70 backdrop-blur-xl">{categoryLabel[entry.category]}</div>
                  <ArrowUpRight className="absolute right-4 top-4 h-4 w-4 text-white/50 transition group-hover:text-white" />
                </div>
                <div className="p-5">
                  <p className="text-[8px] font-black uppercase tracking-[.25em] text-white/30">{entry.issuer}</p>
                  <h3 className="mt-2 text-lg font-black leading-tight text-white">{entry.title}</h3>
                  <div className="mt-4 flex items-center justify-between text-[9px] uppercase tracking-widest text-white/35">
                    <span>{entry.date || "Verified document"}</span>
                    <span className="inline-flex items-center gap-1 text-white/55"><ExternalLink className="h-3 w-3" /> Open</span>
                  </div>
                </div>
              </button>
            </motion.article>
          ))}
        </div>

        {filtered.length === 0 && <div className="rounded-2xl border border-dashed border-white/10 py-24 text-center text-sm text-white/35">No matching archive entries.</div>}
      </section>

      <AnimatePresence>
        {selected && (
          <motion.div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)}>
            <motion.div className="relative flex max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0c] shadow-2xl lg:flex-row" initial={{ opacity: 0, y: 30, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 30, scale: .98 }} onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setSelected(null)} className="absolute right-4 top-4 z-10 rounded-full border border-white/10 bg-black/60 p-2 text-white/70 hover:bg-white hover:text-black"><X className="h-4 w-4" /></button>
              <div className="w-full bg-white/5 lg:w-[48%]">
                <iframe src={`/achievement-docs/${encodeURIComponent(selected.file)}#toolbar=0&navpanes=0&scrollbar=0&view=Fit`} className="h-[52vh] w-full border-0 bg-white lg:h-[90vh]" title={selected.title} />
              </div>
              <div className="flex flex-1 flex-col justify-between gap-8 p-7 lg:p-10">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[.3em] text-white/30">{categoryLabel[selected.category]}</p>
                  <h3 className="mt-3 text-3xl font-black leading-tight tracking-[-.04em] text-white">{selected.title}</h3>
                  <p className="mt-3 text-sm text-white/55">{selected.issuer}</p>
                  <div className="mt-8 space-y-3 text-[10px] uppercase tracking-widest text-white/40">
                    {selected.date && <div className="flex items-center gap-2"><Calendar className="h-3.5 w-3.5" /> {selected.date}</div>}
                    {selected.credential && <div className="flex items-center gap-2"><FileBadge className="h-3.5 w-3.5" /> {selected.credential}</div>}
                  </div>
                </div>
                <a href={`/achievement-docs/${encodeURIComponent(selected.file)}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-[10px] font-black uppercase tracking-widest text-black hover:bg-white/90"><ExternalLink className="h-4 w-4" /> Open original document</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
