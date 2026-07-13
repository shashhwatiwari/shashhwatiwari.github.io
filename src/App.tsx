/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Shashwat Tiwari - Portfolio
 * Editorial / cinematic aesthetic on a warm light base.
 * Fonts: Clash Display (display) + General Sans (body).
 */

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "motion/react";
import { useState, useEffect } from "react";
import { Github, Mail, ArrowUpRight, Link as LinkIcon } from "lucide-react";

const BASE = import.meta.env.BASE_URL;

// ─── Social Icon SVGs ─────────────────────────────────────────────────────────

const GitHubIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedInIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const LeetCodeIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
  </svg>
);

const SOCIALS = [
  { href: "https://github.com/shashhwatiwari",               icon: GitHubIcon,   label: "GitHub" },
  { href: "https://www.linkedin.com/in/shashwat-tiwari118/", icon: LinkedInIcon, label: "LinkedIn" },
  { href: "https://leetcode.com/u/shashwat__/",              icon: LeetCodeIcon, label: "LeetCode" },
];

// ─── Custom cursor (desktop, fine-pointer only) ────────────────────────────────

const CursorDot = () => {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-hidden");
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      setScale(t && t.closest("a, button") ? 2.6 : 1);
    };
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.classList.remove("cursor-hidden");
    };
  }, [x, y]);

  if (!enabled) return null;
  return (
    <motion.div
      className="cursor-dot hidden md:block"
      style={{ x: sx, y: sy }}
      animate={{ scale }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    />
  );
};

// ─── Photo Cluster ────────────────────────────────────────────────────────────

const marqueePhotos = [
  "photos/1.jpeg",
  "photos/stadium.jpeg",
  "nyc.jpeg",
  "photos/2.jpeg",
  "concert.jpeg",
  "photos/3.jpeg",
  "boston.jpeg",
  "photos/4.jpeg",
  "burger.jpeg",
];

const PhotoMarquee = () => (
  <div className="relative overflow-hidden">
    {/* Edge fades */}
    <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 z-10 pointer-events-none bg-gradient-to-r from-paper-2 to-transparent" />
    <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 z-10 pointer-events-none bg-gradient-to-l from-paper-2 to-transparent" />

    <div className="marquee-track gap-5">
      {[...marqueePhotos, ...marqueePhotos].map((file, i) => (
        <div
          key={`${file}-${i}`}
          className="shrink-0 w-[280px] h-[200px] md:w-[340px] md:h-[240px] rounded-2xl overflow-hidden ring-1 ring-black/5 shadow-lg"
        >
          <img
            src={`${BASE}${file}`}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  </div>
);

// ─── Section Heading ──────────────────────────────────────────────────────────

const Eyebrow = ({ text, accent = "orange" }: { text: string; accent?: "orange" | "purple" }) => (
  <span className={`font-sans text-[11px] font-semibold tracking-[0.28em] uppercase ${accent === "orange" ? "text-orange" : "text-purple"}`}>
    {text}
  </span>
);

// ─── Navbar ───────────────────────────────────────────────────────────────────

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const ids = ["about", "experience", "projects", "resume", "contact"];
      const current = ids.find((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const { top, bottom } = el.getBoundingClientRect();
        return top <= 90 && bottom >= 90;
      });
      setActive(current ?? "");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#about",      label: "About" },
    { href: "#experience", label: "Work" },
    { href: "#projects",   label: "Projects" },
    { href: "#contact",    label: "Contact" },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "glass-nav border-b border-line" : "bg-transparent"}`}>
      <div className="max-w-6xl mx-auto px-6 h-[72px] flex items-center justify-between">
        <a href="#" className="font-display font-semibold text-lg text-ink tracking-tight hover:text-orange transition-colors">
          Shashwat<span className="text-orange">.</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`font-sans text-[12px] font-medium tracking-[0.16em] uppercase transition-colors ${
                active === l.href.slice(1) ? "text-orange" : "text-ink/55 hover:text-ink"
              }`}
            >
              {l.label}
            </a>
          ))}
          <span className="h-4 w-px bg-line" />
          {SOCIALS.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="text-ink/40 hover:text-orange transition-colors">
              <s.icon size={19} />
            </a>
          ))}
          <a
            href={`${BASE}resume.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[12px] font-semibold tracking-[0.16em] uppercase px-4 py-2 rounded-full border border-ink/25 text-ink hover:border-orange hover:text-orange transition-colors"
          >
            Resume
          </a>
        </div>

        <button
          className="md:hidden w-8 h-8 flex flex-col gap-1.5 justify-center items-end"
          onClick={() => setMobileOpen((p) => !p)}
          aria-label="Toggle menu"
        >
          <span className="block h-0.5 w-6 bg-ink rounded-full" />
          <span className="block h-0.5 w-4 bg-ink rounded-full" />
          <span className="block h-0.5 w-5 bg-ink rounded-full" />
        </button>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass-nav border-b border-line px-6 pb-6 flex flex-col gap-4"
        >
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="font-sans text-sm font-medium tracking-[0.14em] uppercase text-ink/70 hover:text-orange transition-colors">
              {l.label}
            </a>
          ))}
          <a href={`${BASE}resume.pdf`} target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)} className="font-sans text-sm font-semibold tracking-[0.14em] uppercase text-orange">
            Resume
          </a>
          <div className="flex items-center gap-5 pt-1">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="text-ink/40 hover:text-orange transition-colors">
                <s.icon size={22} />
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

// ─── Hero ─────────────────────────────────────────────────────────────────────

const Hero = () => {
  const { scrollY } = useScroll();
  const photoY = useTransform(scrollY, [0, 600], [0, -50]);

  return (
    <section className="hero-glow relative min-h-screen flex items-center overflow-hidden px-6 pt-28 pb-16">
      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr] gap-12 md:gap-16 items-center">

          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Availability kicker (editorial, not a status pill) */}
            <div className="flex items-center gap-3 mb-7">
              <span className="w-2.5 h-2.5 bg-orange rotate-45" />
              <span className="font-sans text-[12px] font-semibold tracking-[0.2em] uppercase text-ink/70">
                Available for full-time
              </span>
              <span className="hidden sm:block h-px w-8 bg-ink/20" />
              <span className="hidden sm:block font-sans text-[12px] font-semibold tracking-[0.2em] uppercase text-ink/40">
                Summer 2026
              </span>
            </div>

            {/* Name */}
            <h1
              className="font-display font-semibold text-ink leading-[0.86] tracking-tightest"
              style={{ fontSize: "clamp(3.6rem, 9.5vw, 8.5rem)" }}
            >
              Shashwat<br />
              Tiwari<span className="text-orange">.</span>
            </h1>

            {/* Intro */}
            <p className="mt-7 font-sans text-lg text-ink/70 leading-relaxed max-w-lg">
              MS Computer Science graduate from{" "}
              <a href="#experience" className="text-ink font-semibold underline decoration-orange/50 decoration-2 underline-offset-4 hover:decoration-orange">Northeastern</a>,
              {" "}focused on ML pipelines, computer vision, and full-stack systems. Open to full-time roles.
            </p>

            {/* Location pills */}
            <div className="mt-8 flex flex-wrap gap-2.5">
              {["Boston, MA", "MS CS '26 · Northeastern", "Prev. Bain & Aftershoot"].map((t) => (
                <span key={t} className="inline-flex items-center rounded-full border border-line bg-card px-4 py-1.5 font-sans text-sm font-medium text-ink/65">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right: photo */}
          <motion.div
            style={{ y: photoY }}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center md:justify-end"
          >
            <div className="relative">
              {/* Orange offset accent behind */}
              <div className="absolute -bottom-4 -right-4 w-full h-full rounded-3xl border-2 border-orange/30 pointer-events-none" />
              {/* Photo on a purple backing */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative w-64 md:w-80 rounded-3xl overflow-hidden bg-purple shadow-[0_25px_60px_-20px_rgba(124,92,191,0.55)] ring-1 ring-black/5"
              >
                <img src={`${BASE}profile.png`} alt="Shashwat Tiwari" className="w-full aspect-[4/5] object-cover" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ─── About (statement + bio + tool lists) ──────────────────────────────────────

const toolGroups = [
  { title: "Languages",       items: ["Python", "TypeScript", "SQL", "C / C++", "Rust", "Java"] },
  { title: "Frontend",        items: ["React", "Next.js", "Tailwind CSS", "HTML / CSS"] },
  { title: "Backend & APIs",  items: ["Node.js", "Express", "FastAPI", "REST", "SQLAlchemy"] },
  { title: "AI / ML",         items: ["PyTorch", "LangChain", "BERT", "scikit-learn", "OpenCV", "XGBoost"] },
  { title: "Cloud & DevOps",  items: ["AWS (Lambda, Bedrock, S3)", "Docker", "GitHub Actions", "CI / CD", "Vercel"] },
  { title: "Databases",       items: ["PostgreSQL", "MongoDB", "ChromaDB", "Redis", "BigQuery"] },
];

const hobbies = ["Soccer (Barça fan)", "Live music", "Photography", "Food hunting", "City exploring"];

const AboutMe = () => (
  <section id="about" className="py-28 md:py-36 px-6 bg-paper-2 border-y border-line">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16 md:mb-20"
      >
        <Eyebrow text="About" accent="orange" />
        <h2 className="mt-5 font-display font-semibold text-ink leading-[0.94] tracking-tightest uppercase" style={{ fontSize: "clamp(2.1rem, 6.5vw, 5rem)" }}>
          I build things that work,<br />
          <span className="text-ink/35">and I care why they do.</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-14 lg:gap-20 items-start">
        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6 font-sans text-lg text-ink/75 leading-relaxed max-w-[54ch]"
        >
          <p>
            I'm an MS Computer Science graduate from Northeastern (GPA 4.0), working at the
            intersection of machine learning and software engineering. I've shipped ML
            pipelines for M&amp;A screening at <span className="text-ink font-semibold">Bain &amp; Company</span> and
            computer-vision systems at <span className="text-ink font-semibold">Aftershoot</span>.
          </p>
          <p>
            Most recently I TA'd CS5800 (Algorithms) for 300+ students, and spend my time
            shipping projects I'm genuinely proud of, from RAG compliance tooling to
            emotion-aware recommendation systems.
          </p>
          <p>
            Beyond the keyboard I'm a die-hard Barça fan, a live-music chaser, and someone who
            will travel across a city for a good burger.
          </p>

          {/* Education */}
          <div className="pt-4 flex flex-col gap-4">
            {[
              { logo: `${BASE}NEU.png`, name: "Northeastern University", degree: "MS Computer Science · GPA 4.0", period: "2024 – 2026", color: "#d41c2c" },
              { logo: `${BASE}sn-logo.png`, name: "Shiv Nadar University", degree: "BS Computer Science · GPA 3.8", period: "2020 – 2024", color: "#1270b7" },
            ].map((edu) => (
              <div key={edu.name} className="flex items-center gap-4 bg-card rounded-2xl p-4 border border-line">
                <img src={edu.logo} alt={edu.name} className="w-11 h-11 object-contain shrink-0" referrerPolicy="no-referrer" />
                <div>
                  <p className="font-display font-semibold text-[15px] text-ink leading-tight">{edu.name}</p>
                  <p className="font-sans text-[13px] mt-0.5 font-medium" style={{ color: edu.color }}>{edu.degree}</p>
                  <p className="font-sans text-xs text-ink/45 mt-0.5">{edu.period}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tool lists */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 gap-x-8 gap-y-9"
        >
          {toolGroups.map((g) => (
            <div key={g.title}>
              <p className="font-display font-semibold text-ink text-base mb-2">{g.title}</p>
              <p className="font-sans text-sm text-ink/55 leading-relaxed">
                {g.items.join(", ")}.
              </p>
            </div>
          ))}
          <div className="col-span-2">
            <p className="font-display font-semibold text-ink text-base mb-2">Beyond work</p>
            <p className="font-sans text-sm text-ink/55 leading-relaxed">
              {hobbies.join(", ")}.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Photo slideshow */}
      <div className="mt-24">
        <PhotoMarquee />
        <p className="mt-8 text-center font-sans text-[13px] font-semibold tracking-[0.18em] uppercase text-ink/45">
          a few frames from life outside the code :)
        </p>
      </div>
    </div>
  </section>
);

// ─── Experience ───────────────────────────────────────────────────────────────

const experienceData = [
  {
    year: "2023",
    role: "Software Engineer Intern",
    company: "Aftershoot Inc.",
    logo: `${BASE}aftershoot-logo.png`,
    companyColor: "#006397",
    period: "May – Jul 2023",
    type: "professional" as const,
    description:
      "High-throughput Stripe telemetry pipelines; ETL rewrite Python → Rust (3× faster, 45% less memory); CNN models for blur detection and sharpness scoring; automated CI/CD with Docker.",
    tags: ["Rust", "OpenCV", "Docker", "CNN", "Python"],
  },
  {
    year: "2024",
    role: "Analyst Co-op",
    company: "Bain & Company",
    logo: `${BASE}bain-logo.png`,
    companyColor: "#cc0000",
    period: "Jan – Jul 2024",
    type: "professional" as const,
    description:
      "ML pipelines for M&A deal screening across 20–75 datasets; K-means + hierarchical clustering cut manual review by 40%; ARIMA + XGBoost forecasting improved prioritization by 18%; NLP tagging pipeline.",
    tags: ["Python", "XGBoost", "NLP", "SQLAlchemy", "Pytest"],
  },
  {
    year: "2025–26",
    role: "Graduate Teaching Assistant",
    company: "Northeastern University",
    logo: `${BASE}NEU.png`,
    companyColor: "#d41c2c",
    period: "Sept 2025 – May 2026",
    type: "academic" as const,
    description:
      "TA for CS5800: Algorithms. Graded 300+ students, held weekly office hours on dynamic programming, graph algorithms and asymptotic notation; proctored mid-term and final exams.",
    tags: ["Algorithms", "Teaching", "CS5800"],
  },
];

const Experience = () => (
  <section id="experience" className="py-28 md:py-36 px-6">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <Eyebrow text="Where I've worked" accent="purple" />
        <h2 className="mt-5 font-display font-semibold text-ink leading-[0.9] tracking-tightest uppercase" style={{ fontSize: "clamp(2.6rem, 9vw, 7rem)" }}>
          Experience
        </h2>
      </motion.div>

      <div className="flex flex-col">
        {experienceData.map((exp, i) => (
          <motion.div
            key={exp.year}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: i * 0.08 }}
            className="group grid grid-cols-1 md:grid-cols-[120px_1fr] gap-4 md:gap-10 py-9 border-t border-line first:border-t-0 md:first:border-t"
          >
            <div className="flex items-center gap-3 md:flex-col md:items-start md:gap-4">
              <span className="font-mono text-sm font-medium" style={{ color: exp.companyColor }}>{exp.year}</span>
              <span
                className={`text-[10px] font-sans font-semibold tracking-[0.14em] uppercase px-2.5 py-1 rounded-full ${
                  exp.type === "academic" ? "bg-purple-pale text-purple" : "bg-orange-pale text-orange"
                }`}
              >
                {exp.type === "academic" ? "Academic" : "Industry"}
              </span>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-2">
                <img src={exp.logo} alt={exp.company} className="h-7 object-contain" referrerPolicy="no-referrer" />
              </div>
              <h3 className="font-display font-semibold text-2xl md:text-3xl text-ink leading-tight group-hover:text-orange transition-colors">
                {exp.role}
              </h3>
              <p className="font-sans text-sm font-semibold mt-1 mb-1" style={{ color: exp.companyColor }}>
                {exp.company} <span className="text-ink/35 font-normal">· {exp.period}</span>
              </p>
              <p className="font-sans text-[15px] text-ink/65 leading-relaxed mt-3 max-w-3xl">{exp.description}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-4">
                {exp.tags.map((t) => (
                  <span key={t} className="font-sans text-[11px] font-semibold tracking-[0.12em] uppercase text-ink/45">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ─── Projects ─────────────────────────────────────────────────────────────────

const projectsData = [
  {
    name: "RegTranslate",
    category: "AI / RAG",
    href: "https://regtranslate.vercel.app/",
    repo: "",
    image: `${BASE}photos/projects/regtranslate.png`,
    description:
      "A RAG-based compliance platform that converts HIPAA/GDPR PDFs into actionable developer tasks using Llama 3 + LangChain, with a semantic search pipeline powered by ChromaDB.",
    tags: ["Llama 3", "LangChain", "ChromaDB", "FastAPI"],
  },
  {
    name: "Emotion Classifier",
    category: "NLP",
    href: "",
    repo: "https://github.com/shashhwatiwari",
    image: `${BASE}photos/projects/emotion.png`,
    description:
      "Fine-tuned BERT on the GoEmotions dataset for multi-label emotion detection, delivering real-time music recommendations over WhatsApp based on inferred user mood.",
    tags: ["BERT", "PyTorch", "WhatsApp API", "FastAPI"],
  },
  {
    name: "Kambaz",
    category: "Full-Stack",
    href: "",
    repo: "https://github.com/shashhwatiwari",
    image: `${BASE}photos/projects/kambaz.png`,
    description:
      "A scalable learning-management platform built on the MERN stack, with modules, quizzes and grade tracking, optimized for concurrent user access at scale.",
    tags: ["MongoDB", "Express", "React", "Node.js"],
  },
  {
    name: "StaffSync",
    category: "Full-Stack",
    href: "",
    repo: "https://github.com/shashhwatiwari",
    image: `${BASE}photos/projects/staffsync.png`,
    description:
      "A workforce-scheduling platform with shift management, real-time notifications and role-based access control. Built with React, Node.js and PostgreSQL on AWS.",
    tags: ["React", "Node.js", "PostgreSQL", "AWS"],
  },
  {
    name: "ConcenTrainer",
    category: "AI / CV",
    href: "",
    repo: "https://github.com/shashhwatiwari",
    image: `${BASE}photos/projects/concentrainer.png`,
    description:
      "A focus-enhancement overlay that lets you set up your reading environment exactly how you like it, using real-time pose and gaze tracking.",
    tags: ["MediaPipe", "Python", "React", "WebRTC"],
  },
];

const Projects = () => (
  <section id="projects" className="py-28 md:py-36 px-6 bg-paper-2 border-y border-line">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 md:mb-20"
      >
        <Eyebrow text="Selected work" accent="orange" />
        <h2 className="mt-5 font-display font-semibold text-ink leading-[0.86] tracking-tightest uppercase" style={{ fontSize: "clamp(3rem, 12vw, 9rem)" }}>
          Projects
        </h2>
        <p className="mt-5 font-sans text-[13px] font-medium tracking-[0.16em] uppercase text-ink/45 max-w-md mx-auto leading-relaxed">
          From RAG tooling to computer vision. Every build here solves a real problem.
        </p>
      </motion.div>

      <div className="flex flex-col gap-8">
        {projectsData.map((proj, i) => {
          const flip = i % 2 === 1;
          return (
            <motion.div
              key={proj.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
              className="bg-dark rounded-3xl p-7 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
            >
              {/* Copy */}
              <div className={flip ? "md:order-2" : ""}>
                <div className="flex items-center gap-3 mb-6">
                  {proj.repo && (
                    <a href={proj.repo} target="_blank" rel="noopener noreferrer" aria-label="GitHub repo" className="w-10 h-10 rounded-full bg-cream text-dark flex items-center justify-center hover:bg-orange hover:text-white transition-colors">
                      <GitHubIcon size={18} />
                    </a>
                  )}
                  {proj.href && (
                    <a href={proj.href} target="_blank" rel="noopener noreferrer" aria-label="Live site" className="w-10 h-10 rounded-full bg-cream text-dark flex items-center justify-center hover:bg-orange hover:text-white transition-colors">
                      <LinkIcon size={17} />
                    </a>
                  )}
                  <span className="ml-1 font-sans text-[11px] font-semibold tracking-[0.18em] uppercase text-orange">{proj.category}</span>
                </div>
                <h3 className="font-display font-semibold text-3xl md:text-4xl text-cream leading-tight mb-4">{proj.name}</h3>
                <p className="font-sans text-[15px] text-cream/55 leading-relaxed mb-6 max-w-md">{proj.description}</p>
                <div className="flex flex-wrap gap-x-5 gap-y-2">
                  {proj.tags.map((t) => (
                    <span key={t} className="font-sans text-[12px] font-semibold tracking-[0.12em] uppercase text-cream/80">{t}</span>
                  ))}
                </div>
                {proj.href && (
                  <a href={proj.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 mt-7 font-sans text-sm font-semibold text-orange hover:gap-2.5 transition-all">
                    View live <ArrowUpRight className="w-4 h-4" />
                  </a>
                )}
              </div>

              {/* Screenshot */}
              <div className={flip ? "md:order-1" : ""}>
                <div className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                  <img
                    src={proj.image}
                    alt={proj.name}
                    className="w-full aspect-[16/10] object-cover object-top bg-gray-900"
                    loading="lazy"
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <a
          href="https://github.com/shashhwatiwari"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-sans text-[12px] font-semibold tracking-[0.16em] uppercase text-ink/60 hover:text-orange transition-colors"
        >
          <Github className="w-4 h-4" /> More on GitHub <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  </section>
);

// ─── Stats ─────────────────────────────────────────────────────────────────────

const Stats = () => (
  <section className="py-24 px-6">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl px-8 py-10 md:px-14 md:py-12 flex flex-wrap items-center justify-between gap-8 bg-orange"
      >
        {[
          { value: "4.0", label: "GPA" },
          { value: "2", label: "Internships" },
          { value: "1", label: "Co-authored paper" },
          { value: "5+", label: "Projects shipped" },
          { value: "300+", label: "Students TA'd" },
        ].map((s) => (
          <div key={s.label} className="flex flex-col">
            <span className="font-display font-semibold text-white text-4xl md:text-5xl leading-none tracking-tight">{s.value}</span>
            <span className="font-sans text-white/75 text-[13px] font-medium mt-2">{s.label}</span>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

// ─── GitHub Activity ───────────────────────────────────────────────────────────

const GitHubActivity = () => (
  <section className="py-24 px-6">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <Eyebrow text="Commit activity" accent="purple" />
        <h2 className="mt-5 font-display font-semibold text-ink leading-[0.9] tracking-tightest uppercase" style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}>
          On GitHub
        </h2>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-card rounded-3xl p-6 md:p-8 border border-line overflow-x-auto"
      >
        <img
          src="https://ghchart.rshah.org/FF6B35/shashhwatiwari"
          alt="GitHub contribution chart"
          className="w-full min-w-[640px]"
          loading="lazy"
        />
      </motion.div>
    </div>
  </section>
);

// ─── Resume ───────────────────────────────────────────────────────────────────

const Resume = () => (
  <section id="resume" className="py-24 px-6">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row items-center gap-10 bg-paper-2 border border-line rounded-3xl p-8 md:p-12"
      >
        <img
          src={`${BASE}resume-preview.png`}
          alt="Resume preview"
          className="w-40 rounded-xl shadow-lg border border-line shrink-0"
          loading="lazy"
        />
        <div className="flex-1">
          <Eyebrow text="One page" accent="orange" />
          <h2 className="mt-4 font-display font-semibold text-ink leading-[0.95] tracking-tight text-3xl md:text-4xl mb-4">
            Everything, in one page.
          </h2>
          <p className="font-sans text-ink/65 leading-relaxed max-w-lg mb-7">
            Experience, education, projects and skills, condensed and ready to download.
          </p>
          <a
            href={`${BASE}resume.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-ink text-cream font-sans font-semibold text-sm tracking-[0.06em] px-7 py-3.5 rounded-full hover:bg-orange transition-colors"
          >
            Open full resume <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

// ─── Contact ──────────────────────────────────────────────────────────────────

const Contact = () => (
  <section id="contact" className="relative py-32 md:py-44 px-6 bg-dark overflow-hidden">
    <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(50% 60% at 20% 30%, rgba(255,107,53,0.14), transparent 60%), radial-gradient(45% 55% at 85% 70%, rgba(124,92,191,0.18), transparent 60%)" }} />
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-6xl mx-auto relative z-10"
    >
      <Eyebrow text="Let's connect" accent="orange" />
      <h2 className="mt-6 font-display font-semibold text-cream leading-[0.9] tracking-tightest uppercase" style={{ fontSize: "clamp(2.6rem, 9vw, 7rem)" }}>
        Got something<br />
        <span className="text-orange">worth making?</span>
      </h2>
      <p className="mt-8 font-sans text-cream/45 leading-relaxed text-lg max-w-xl">
        I graduated this spring and I'm actively looking for full-time roles, available now.
        If you're building something interesting, I'd genuinely like to hear about it.
      </p>
      <div className="mt-12 flex flex-col sm:flex-row gap-4">
        <a
          href="mailto:tiwari.sha@northeastern.edu"
          className="inline-flex items-center justify-center gap-2.5 bg-orange text-white font-sans font-semibold text-base px-8 py-4 rounded-full hover:bg-orange/90 transition-colors"
        >
          <Mail className="w-5 h-5" /> tiwari.sha@northeastern.edu
        </a>
        <a
          href="https://www.linkedin.com/in/shashwat-tiwari118/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2.5 border border-cream/25 text-cream font-sans font-semibold text-base px-8 py-4 rounded-full hover:border-orange hover:text-orange transition-colors"
        >
          <LinkedInIcon size={20} /> LinkedIn
        </a>
      </div>
    </motion.div>
  </section>
);

// ─── Footer ───────────────────────────────────────────────────────────────────

const Footer = () => (
  <footer className="bg-dark border-t border-white/10">
    <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="text-center md:text-left">
        <span className="font-display font-semibold text-cream">Shashwat Tiwari<span className="text-orange">.</span></span>
        <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-cream/35 mt-1">© 2026 · Built with React &amp; Tailwind</p>
      </div>
      <div className="flex items-center gap-6">
        {[...SOCIALS, { href: "mailto:tiwari.sha@northeastern.edu", icon: Mail as unknown as typeof GitHubIcon, label: "Email" }].map((l) => (
          <a
            key={l.label}
            href={l.href}
            target={l.label === "Email" ? undefined : "_blank"}
            rel={l.label === "Email" ? undefined : "noopener noreferrer"}
            aria-label={l.label}
            className="text-cream/40 hover:text-orange transition-colors"
          >
            {l.label === "Email" ? <Mail className="w-6 h-6" /> : <l.icon size={24} />}
          </a>
        ))}
      </div>
    </div>
  </footer>
);

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="min-h-screen bg-paper">
      <CursorDot />
      <Navbar />
      <main>
        <Hero />
        <AboutMe />
        <Experience />
        <Projects />
        <Stats />
        <GitHubActivity />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
