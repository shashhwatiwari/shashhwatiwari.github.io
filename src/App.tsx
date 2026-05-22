/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Shashwat Tiwari — Scrapbook Portfolio
 * Inspired by Yuki Fang's collage aesthetic
 */

import { motion, useScroll, useTransform } from "motion/react";
import { useState, useEffect, type CSSProperties } from "react";
import { Github, Linkedin, Mail, ExternalLink, ArrowUpRight } from "lucide-react";

const BASE = import.meta.env.BASE_URL;

// ─── Types ────────────────────────────────────────────────────────────────────

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  html_url: string;
}

// ─── SVG Sticker Shapes ───────────────────────────────────────────────────────

type StickerProps = { className?: string; style?: CSSProperties };

const StarShape = ({ className = "", style = {} }: StickerProps) => (
  <svg className={className} style={style} viewBox="0 0 32 32" fill="currentColor">
    <path d="M16 2l2.9 8.9H28l-7.5 5.4 2.9 8.9L16 19.7l-7.4 5.5 2.9-8.9L4 10.9h9.1z" />
  </svg>
);

const SparkleShape = ({ className = "", style = {} }: StickerProps) => (
  <svg className={className} style={style} viewBox="0 0 32 32" fill="currentColor">
    <path d="M16 2c0 7.7-6.3 14-14 14 7.7 0 14 6.3 14 14 0-7.7 6.3-14 14-14-7.7 0-14-6.3-14-14z" />
  </svg>
);

const FlowerShape = ({ className = "", style = {} }: StickerProps) => (
  <svg className={className} style={style} viewBox="0 0 40 40" fill="currentColor">
    <ellipse cx="20" cy="9"  rx="5" ry="8" />
    <ellipse cx="20" cy="9"  rx="5" ry="8" transform="rotate(60 20 20)" />
    <ellipse cx="20" cy="9"  rx="5" ry="8" transform="rotate(120 20 20)" />
    <ellipse cx="20" cy="9"  rx="5" ry="8" transform="rotate(180 20 20)" />
    <ellipse cx="20" cy="9"  rx="5" ry="8" transform="rotate(240 20 20)" />
    <ellipse cx="20" cy="9"  rx="5" ry="8" transform="rotate(300 20 20)" />
    <circle cx="20" cy="20" r="7" fill="white" />
    <circle cx="20" cy="20" r="5" />
  </svg>
);

const PlusShape = ({ className = "", style = {} }: StickerProps) => (
  <svg className={className} style={style} viewBox="0 0 32 32" fill="currentColor">
    <rect x="13" y="2" width="6" height="28" rx="3" />
    <rect x="2" y="13" width="28" height="6" rx="3" />
  </svg>
);

const AsteriskShape = ({ className = "", style = {} }: StickerProps) => (
  <svg className={className} style={style} viewBox="0 0 32 32" fill="currentColor">
    <rect x="14" y="2" width="4" height="28" rx="2" />
    <rect x="14" y="2" width="4" height="28" rx="2" transform="rotate(60 16 16)" />
    <rect x="14" y="2" width="4" height="28" rx="2" transform="rotate(120 16 16)" />
  </svg>
);

// ─── Polaroid ─────────────────────────────────────────────────────────────────

interface PolaroidProps {
  src: string;
  alt: string;
  caption?: string;
  rotate?: number;
  className?: string;
}

const Polaroid = ({ src, alt, caption, rotate = 0, className = "" }: PolaroidProps) => (
  <motion.div
    className={`relative inline-block flex-shrink-0 ${className}`}
    style={{ transform: `rotate(${rotate}deg)` }}
    whileHover={{ scale: 1.04, rotate: rotate * 0.6, transition: { duration: 0.25, ease: "easeOut" } }}
  >
    <div className="tape-strip" />
    <div className="polaroid-frame">
      <div className="overflow-hidden bg-gray-100 aspect-[3/4] w-full">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      {caption && (
        <p className="font-hand text-sm text-center mt-2 text-dark/50 leading-snug">{caption}</p>
      )}
    </div>
  </motion.div>
);

// ─── Typewriter ───────────────────────────────────────────────────────────────

const Typewriter = ({ texts }: { texts: string[] }) => {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [speed, setSpeed] = useState(100);

  useEffect(() => {
    const cur = texts[idx];
    const timer = setTimeout(() => {
      if (deleting) {
        setText(cur.substring(0, text.length - 1));
        setSpeed(40);
      } else {
        setText(cur.substring(0, text.length + 1));
        setSpeed(100);
      }
      if (!deleting && text === cur) setTimeout(() => setDeleting(true), 2000);
      else if (deleting && text === "") {
        setDeleting(false);
        setIdx((p) => (p + 1) % texts.length);
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [text, deleting, idx, texts, speed]);

  return (
    <span>
      {text}
      <span className="inline-block w-[2px] h-[0.85em] bg-current align-middle ml-0.5 animate-pulse" />
    </span>
  );
};

// ─── Section Heading ──────────────────────────────────────────────────────────

const SectionHeading = ({
  label,
  title,
  accent = "orange",
}: {
  label: string;
  title: string;
  accent?: "orange" | "purple";
}) => (
  <div className="mb-14">
    <p className={`font-hand text-lg font-semibold mb-1 ${accent === "orange" ? "text-orange" : "text-purple"}`}>
      {label}
    </p>
    <h2 className="font-display font-black text-4xl md:text-5xl lowercase text-dark leading-tight">
      {title}
    </h2>
    <div
      className={`mt-3 h-1.5 w-14 rounded-full ${accent === "orange" ? "bg-orange" : "bg-purple"}`}
    />
  </div>
);

// ─── Navbar ───────────────────────────────────────────────────────────────────

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const ids = ["about", "experience", "projects", "skills", "contact"];
      const current = ids.find((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const { top, bottom } = el.getBoundingClientRect();
        return top <= 80 && bottom >= 80;
      });
      setActive(current ?? "");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#about",      label: "about me" },
    { href: "#experience", label: "experience" },
    { href: "#projects",   label: "projects" },
    { href: "#skills",     label: "skills" },
    { href: "https://www.linkedin.com/in/shashwat-tiwari118/", label: "resume", ext: true },
    { href: "#contact",    label: "contact me" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "glass-nav border-b border-dark/6 shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="font-display font-black text-xl lowercase text-dark hover:text-orange transition-colors">
          shashwat.
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target={l.ext ? "_blank" : undefined}
              rel={l.ext ? "noopener noreferrer" : undefined}
              className={`font-sans text-sm font-medium lowercase transition-colors duration-200 ${
                active === l.href.slice(1)
                  ? "text-orange"
                  : "text-dark/55 hover:text-dark"
              }`}
            >
              {l.label}
              {l.ext && <ExternalLink className="inline w-3 h-3 ml-0.5 -mt-0.5" />}
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden w-8 h-8 flex flex-col gap-1.5 justify-center items-end"
          onClick={() => setMobileOpen((p) => !p)}
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 bg-dark rounded-full transition-all ${mobileOpen ? "w-6" : "w-6"}`} />
          <span className={`block h-0.5 bg-dark rounded-full transition-all ${mobileOpen ? "w-4" : "w-4"}`} />
          <span className={`block h-0.5 bg-dark rounded-full transition-all ${mobileOpen ? "w-6" : "w-5"}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass-nav border-b border-dark/6 px-6 pb-6 flex flex-col gap-4"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target={l.ext ? "_blank" : undefined}
              rel={l.ext ? "noopener noreferrer" : undefined}
              onClick={() => setMobileOpen(false)}
              className="font-sans text-sm font-medium lowercase text-dark/70 hover:text-orange transition-colors"
            >
              {l.label}
            </a>
          ))}
        </motion.div>
      )}
    </nav>
  );
};

// ─── Hero ─────────────────────────────────────────────────────────────────────

const Hero = () => {
  const { scrollY } = useScroll();
  const s1y = useTransform(scrollY, [0, 500], [0, -55]);
  const s2y = useTransform(scrollY, [0, 500], [0, -35]);
  const s3y = useTransform(scrollY, [0, 500], [0, -70]);
  const s4y = useTransform(scrollY, [0, 500], [0, -20]);

  return (
    <section className="relative min-h-screen flex items-center overflow-visible pt-20 pb-16 px-6">
      {/* ── Background sticker decorations ── */}
      <motion.div style={{ y: s1y }} className="absolute top-[11%] left-[4%] pointer-events-none select-none opacity-80">
        <StarShape className="w-9 h-9 text-orange" style={{ transform: "rotate(22deg)" }} />
      </motion.div>
      <motion.div style={{ y: s2y }} className="absolute top-[18%] right-[7%] pointer-events-none select-none opacity-70">
        <SparkleShape className="w-7 h-7 text-purple" style={{ transform: "rotate(-18deg)" }} />
      </motion.div>
      <motion.div style={{ y: s3y }} className="absolute bottom-[28%] left-[2%] pointer-events-none select-none opacity-60">
        <FlowerShape className="w-12 h-12 text-purple-light" style={{ transform: "rotate(12deg)" }} />
      </motion.div>
      <motion.div style={{ y: s4y }} className="absolute bottom-[20%] right-[5%] pointer-events-none select-none opacity-75">
        <AsteriskShape className="w-8 h-8 text-orange" style={{ transform: "rotate(30deg)" }} />
      </motion.div>
      <SparkleShape className="absolute top-[40%] left-[12%] w-5 h-5 text-orange opacity-50 pointer-events-none" style={{ transform: "rotate(-8deg)" }} />
      <PlusShape className="absolute top-[65%] right-[12%] w-6 h-6 text-purple opacity-40 pointer-events-none" style={{ transform: "rotate(15deg)" }} />

      <div className="max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 md:gap-20 items-center">

          {/* ── Left: copy ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 bg-orange-pale border border-orange/20 rounded-full px-4 py-1.5 mb-9">
              <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
              <span className="font-hand text-orange font-semibold text-sm">
                open to full-time · summer 2026
              </span>
            </div>

            {/* Name */}
            <h1
              className="font-display font-black lowercase text-dark leading-[0.92] mb-5"
              style={{ fontSize: "clamp(3.2rem, 9vw, 7.5rem)" }}
            >
              shashwat
              <br />
              <span className="text-orange">tiwari.</span>
            </h1>

            {/* Typewriter */}
            <p className="font-display font-bold text-xl md:text-2xl text-dark/55 lowercase mb-9 h-9">
              <Typewriter texts={["software engineer", "ml engineer", "ta @ northeastern"]} />
            </p>

            {/* Stat pills */}
            <div className="flex flex-wrap gap-2.5">
              {[
                { emoji: "📍", text: "boston, ma" },
                { emoji: "🎓", text: "ms cs @ northeastern" },
                { emoji: "💼", text: "prev. bain & aftershoot" },
              ].map((p) => (
                <span
                  key={p.text}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white border border-dark/8 px-4 py-1.5 shadow-sm font-sans text-sm text-dark/65 lowercase"
                >
                  <span className="text-base leading-none">{p.emoji}</span>
                  {p.text}
                </span>
              ))}
            </div>
          </motion.div>

          {/* ── Right: polaroid + stickers ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center md:justify-end relative"
          >
            {/* Mini stickers near polaroid */}
            <StarShape className="absolute -top-7 right-10 w-7 h-7 text-orange z-20 pointer-events-none" style={{ transform: "rotate(28deg)" }} />
            <SparkleShape className="absolute -bottom-5 left-4 w-5 h-5 text-purple z-20 pointer-events-none" style={{ transform: "rotate(-12deg)" }} />
            <PlusShape className="absolute top-8 -left-4 w-5 h-5 text-orange z-20 pointer-events-none" style={{ transform: "rotate(10deg)" }} />

            {/* Second polaroid peeking behind — abstract city */}
            <div
              className="absolute right-2 top-4 w-36 opacity-70"
              style={{ transform: "rotate(6deg)" }}
            >
              <div className="polaroid-frame">
                <div className="overflow-hidden bg-gray-100 aspect-[3/4] w-full">
                  <img src={`${BASE}photos/boston.jpg`} alt="Boston" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <p className="font-hand text-xs text-center mt-1.5 text-dark/40">boston 🌆</p>
              </div>
            </div>

            {/* Main polaroid */}
            <Polaroid
              src={`${BASE}photos/stadium.jpg`}
              alt="Shashwat at soccer game"
              caption="barça 🔵🔴"
              rotate={-4}
              className="w-44 md:w-52 relative z-10"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ─── About Me ─────────────────────────────────────────────────────────────────

const AboutMe = () => (
  <section id="about" className="py-24 px-6 bg-paper relative overflow-visible">
    {/* Background stickers */}
    <StarShape className="absolute top-8 right-8 w-7 h-7 text-purple opacity-30 pointer-events-none" style={{ transform: "rotate(-15deg)" }} />
    <FlowerShape className="absolute bottom-12 left-6 w-10 h-10 text-orange opacity-20 pointer-events-none" style={{ transform: "rotate(8deg)" }} />

    <div className="max-w-6xl mx-auto">
      <SectionHeading label="✦ who am i" title="about me" accent="orange" />

      <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-16 items-start">

        {/* ── Left: bio + photo collage ── */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-sans text-lg text-dark/75 leading-relaxed mb-12 max-w-[52ch]"
          >
            i build things that work — and care about why they work. ml pipelines at bain,
            cv systems at aftershoot, and a few projects i'm genuinely proud of in between.
            currently pursuing ms cs at northeastern, based in boston.
          </motion.p>

          {/* Photo collage */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative flex items-end gap-0 h-[260px]"
          >
            <Polaroid
              src={`${BASE}photos/nyc.jpg`}
              alt="NYC at night"
              caption="nyc nights 🌉"
              rotate={-5}
              className="w-40 absolute left-0 bottom-0 z-10"
            />
            <Polaroid
              src={`${BASE}photos/concert.jpg`}
              alt="Concert"
              caption="live music 🎵"
              rotate={3}
              className="w-40 absolute left-28 bottom-4 z-20"
            />
            <Polaroid
              src={`${BASE}photos/burger.jpg`}
              alt="Burger"
              caption="food runs 🍔"
              rotate={-2}
              className="w-36 absolute left-56 bottom-0 z-30"
            />
          </motion.div>

          {/* Beyond my resume */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-14"
          >
            <p className="font-hand text-xl font-bold text-dark mb-4">beyond my resume, i also...</p>
            <div className="flex flex-wrap gap-2.5">
              {[
                { emoji: "⚽", label: "soccer (barça fan)", bg: "bg-orange-pale text-orange border-orange/20" },
                { emoji: "🎵", label: "live music", bg: "bg-purple-pale text-purple border-purple/20" },
                { emoji: "📸", label: "street photography", bg: "bg-orange-pale text-orange border-orange/20" },
                { emoji: "🍔", label: "food hunting", bg: "bg-purple-pale text-purple border-purple/20" },
                { emoji: "🌆", label: "city exploring", bg: "bg-orange-pale text-orange border-orange/20" },
              ].map((h) => (
                <span
                  key={h.label}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 border text-sm font-medium font-sans ${h.bg}`}
                >
                  <span className="text-base leading-none">{h.emoji}</span>
                  {h.label}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Right: education cards ── */}
        <div>
          <p className="font-hand text-xl font-bold text-dark mb-6">education 🎓</p>
          <div className="flex flex-col gap-5">
            {[
              {
                logo: `${BASE}NEU.png`,
                name: "northeastern university",
                degree: "ms computer science",
                gpa: "4.0 / 4.0",
                period: "2024 — 2026",
                color: "#d41c2c",
                border: "border-[#d41c2c]/25",
              },
              {
                logo: `${BASE}sn-logo.png`,
                name: "shiv nadar university",
                degree: "bs computer science",
                gpa: "3.5 / 4.0",
                period: "2020 — 2024",
                color: "#1270b7",
                border: "border-[#1270b7]/25",
              },
            ].map((edu) => (
              <motion.div
                key={edu.name}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`flex items-center gap-4 bg-white rounded-2xl p-5 border-2 ${edu.border} shadow-sm`}
              >
                <img
                  src={edu.logo}
                  alt={edu.name}
                  className="w-14 h-14 object-contain shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="min-w-0">
                  <p className="font-display font-bold text-sm lowercase text-dark leading-tight">
                    {edu.name}
                  </p>
                  <p className="font-hand text-base font-semibold mt-0.5" style={{ color: edu.color }}>
                    {edu.degree}
                  </p>
                  <p className="font-sans text-xs text-dark/45 mt-1">
                    gpa {edu.gpa} · {edu.period}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ─── Experience ───────────────────────────────────────────────────────────────

const experienceData = [
  {
    year: "2023",
    role: "software engineer intern",
    company: "Aftershoot Inc.",
    logo: `${BASE}aftershoot-logo.png`,
    companyColor: "#006397",
    period: "may — jul 2023",
    type: "professional" as const,
    description:
      "high-throughput stripe telemetry pipelines; etl rewrite python → rust (3× faster, 45% less memory); cnn models for blur detection and sharpness scoring; automated ci/cd with docker.",
    tags: ["Rust", "OpenCV", "Docker", "CNN", "Python"],
  },
  {
    year: "2024",
    role: "data analyst intern",
    company: "Bain & Company",
    logo: `${BASE}bain-logo.png`,
    companyColor: "#cc0000",
    period: "jan — jul 2024",
    type: "professional" as const,
    description:
      "ml pipelines for m&a deal screening across 20–75 datasets; k-means + hierarchical clustering cut manual review by 40%; arima + xgboost forecasting improved prioritization by 18%; nlp tagging pipeline.",
    tags: ["Python", "XGBoost", "NLP", "SQLAlchemy", "Pytest"],
  },
  {
    year: "2025–26",
    role: "graduate teaching assistant",
    company: "Northeastern University",
    logo: `${BASE}NEU.png`,
    companyColor: "#d41c2c",
    period: "sept 2025 — may 2026",
    type: "academic" as const,
    description:
      "ta for cs5800: algorithms — graded 300+ students, held weekly office hours on dynamic programming, graph algorithms, and asymptotic notation; proctored mid-term and final exams.",
    tags: ["Algorithms", "Teaching", "CS5800"],
  },
];

const Experience = () => (
  <section id="experience" className="py-24 px-6 relative overflow-visible">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <SectionHeading label="✦ where i've worked" title="experience" accent="purple" />
      </motion.div>

      {/* ── Desktop: horizontal timeline ── */}
      <div className="hidden md:block relative">
        {/* The line */}
        <div className="absolute top-[72px] left-0 right-0 h-[2px] bg-gradient-to-r from-orange via-purple to-orange opacity-40" />

        <div className="grid grid-cols-3 gap-8">
          {experienceData.map((exp, i) => (
            <motion.div
              key={exp.year}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              className="relative"
            >
              {/* Year label */}
              <p className="font-hand text-lg font-bold text-center mb-3" style={{ color: exp.companyColor }}>
                {exp.year}
              </p>

              {/* Timeline dot */}
              <div
                className="absolute top-[68px] left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-[3px] border-cream z-10"
                style={{ background: exp.companyColor }}
              />

              {/* Card — starts below the line */}
              <div
                className={`mt-16 bg-white rounded-2xl p-6 shadow-sm transition-shadow duration-300 hover:shadow-md ${
                  exp.type === "academic"
                    ? "border-2 border-dashed border-purple/40"
                    : "border-2 border-orange/25"
                }`}
              >
                {/* Logo + company */}
                <div className="flex items-center gap-3 mb-4">
                  <img src={exp.logo} alt={exp.company} className="h-8 object-contain" referrerPolicy="no-referrer" />
                </div>
                <h3 className="font-display font-black text-base lowercase text-dark mb-0.5">
                  {exp.role}
                </h3>
                <p className="font-hand text-sm font-semibold mb-1" style={{ color: exp.companyColor }}>
                  {exp.company}
                </p>
                <p className="font-sans text-xs text-dark/40 mb-4 font-mono">{exp.period}</p>
                <p className="font-sans text-sm text-dark/65 leading-relaxed mb-4">{exp.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {exp.tags.map((t) => (
                    <span key={t} className="font-sans text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-cream text-dark/50 font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Mobile: vertical timeline ── */}
      <div className="md:hidden relative pl-10">
        {/* Vertical line */}
        <div className="absolute top-0 left-3.5 bottom-0 w-[2px] bg-gradient-to-b from-orange to-purple opacity-40" />

        <div className="flex flex-col gap-8">
          {experienceData.map((exp, i) => (
            <motion.div
              key={exp.year}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              {/* Dot on vertical line */}
              <div
                className="absolute -left-[30px] top-5 w-4 h-4 rounded-full border-[3px] border-cream z-10"
                style={{ background: exp.companyColor }}
              />

              <p className="font-hand text-base font-bold mb-1" style={{ color: exp.companyColor }}>
                {exp.year}
              </p>
              <div
                className={`bg-white rounded-2xl p-5 shadow-sm ${
                  exp.type === "academic"
                    ? "border-2 border-dashed border-purple/40"
                    : "border-2 border-orange/25"
                }`}
              >
                <h3 className="font-display font-black text-sm lowercase text-dark mb-0.5">
                  {exp.role}
                </h3>
                <p className="font-hand text-sm font-semibold mb-1" style={{ color: exp.companyColor }}>
                  {exp.company}
                </p>
                <p className="font-sans text-xs text-dark/40 font-mono mb-3">{exp.period}</p>
                <p className="font-sans text-sm text-dark/65 leading-relaxed mb-3">{exp.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {exp.tags.map((t) => (
                    <span key={t} className="font-sans text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-cream text-dark/50 font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ─── Projects ─────────────────────────────────────────────────────────────────

const projectsData = [
  {
    name: "regtranslate",
    category: "🤖 ai / rag",
    accent: "orange" as const,
    href: "https://regtranslate.vercel.app/",
    description:
      "rag-based compliance platform that converts hipaa/gdpr pdfs into actionable jira-style developer tasks using llama 3 + langchain. semantic search pipeline via chromadb for high-accuracy retrieval.",
    tags: ["Llama 3", "LangChain", "ChromaDB", "FastAPI"],
  },
  {
    name: "musebot",
    category: "💬 nlp",
    accent: "purple" as const,
    href: "#",
    description:
      "emotion-aware conversational ai using fine-tuned bert on goemotions dataset. integrates with whatsapp api to send personalized music recommendations based on detected mood.",
    tags: ["BERT", "PyTorch", "WhatsApp API"],
  },
  {
    name: "kambaz",
    category: "🌐 full-stack",
    accent: "orange" as const,
    href: "#",
    description:
      "scalable full-stack learning platform built with the mern stack. replicates canvas-style dashboards — modules, quizzes, grades — optimized for concurrent user access at scale.",
    tags: ["MongoDB", "Express.js", "React", "Node.js"],
  },
  {
    name: "epidemic dynamics",
    category: "📖 research",
    accent: "purple" as const,
    href: "#",
    description:
      "co-authored ml research on predicting infectious disease outbreaks published at aciids. benchmarked bert, roberta, and distilbert across heterogeneous epidemiological datasets.",
    tags: ["PyTorch", "BERT", "RoBERTa", "DistilBERT"],
  },
];

const Projects = () => (
  <section id="projects" className="py-24 px-6 bg-paper relative">
    {/* Stickers */}
    <StarShape className="absolute top-10 left-8 w-7 h-7 text-orange opacity-25 pointer-events-none" style={{ transform: "rotate(-20deg)" }} />
    <AsteriskShape className="absolute bottom-16 right-8 w-8 h-8 text-purple opacity-20 pointer-events-none" style={{ transform: "rotate(35deg)" }} />

    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-end justify-between mb-14"
      >
        <div>
          <p className="font-hand text-lg font-semibold text-orange mb-1">✦ what i've built</p>
          <h2 className="font-display font-black text-4xl md:text-5xl lowercase text-dark">projects</h2>
          <div className="mt-3 h-1.5 w-14 rounded-full bg-orange" />
        </div>
        <a
          href="https://github.com/shashhwatiwari"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 font-sans text-sm font-medium text-dark/55 hover:text-orange transition-colors group"
        >
          <Github className="w-4 h-4" />
          check out more on github!
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {projectsData.map((proj, i) => (
          <motion.div
            key={proj.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className={`relative bg-white rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow ${
              proj.accent === "orange" ? "card-top-orange" : "card-top-purple"
            }`}
          >
            {/* Category sticker */}
            <div
              className={`absolute top-4 right-4 font-hand text-sm font-semibold px-3 py-1 rounded-full ${
                proj.accent === "orange"
                  ? "bg-orange-pale text-orange"
                  : "bg-purple-pale text-purple"
              }`}
            >
              {proj.category}
            </div>

            {/* Content */}
            <div className="pr-24">
              <h3 className="font-display font-black text-xl lowercase text-dark mb-3 leading-tight">
                {proj.name}
              </h3>
            </div>
            <p className="font-sans text-sm text-dark/65 leading-relaxed mb-5">{proj.description}</p>
            <div className="flex flex-wrap gap-2 mb-5">
              {proj.tags.map((t) => (
                <span
                  key={t}
                  className={`font-sans text-xs font-medium px-3 py-1 rounded-full ${
                    proj.accent === "orange"
                      ? "bg-orange-pale text-orange"
                      : "bg-purple-pale text-purple"
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>
            {proj.href !== "#" && (
              <a
                href={proj.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 font-sans text-sm font-medium transition-colors ${
                  proj.accent === "orange"
                    ? "text-orange hover:text-orange/75"
                    : "text-purple hover:text-purple/75"
                }`}
              >
                access full project here
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
          </motion.div>
        ))}
      </div>

      {/* Mobile GitHub link */}
      <div className="mt-8 text-center md:hidden">
        <a
          href="https://github.com/shashhwatiwari"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-sans text-sm font-medium text-dark/55 hover:text-orange transition-colors"
        >
          <Github className="w-4 h-4" />
          check out more on github! →
        </a>
      </div>
    </div>
  </section>
);

// ─── GitHub Activity ───────────────────────────────────────────────────────────

const GitHubActivity = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /*
     * GitHub REST API — public endpoints, no auth required.
     * Option A (implemented): ghchart.rshah.org for contribution heatmap (no token).
     * Option B (upgrade path): GitHub GraphQL API with a personal access token stored in
     *   VITE_GITHUB_TOKEN env variable for richer contribution data:
     *   POST https://api.github.com/graphql
     *   Authorization: bearer ${import.meta.env.VITE_GITHUB_TOKEN}
     */
    fetch("https://api.github.com/users/shashhwatiwari/repos?sort=updated&per_page=6")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data: GitHubRepo[]) => { setRepos(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const langColors: Record<string, string> = {
    Python: "#3776AB", TypeScript: "#3178C6", JavaScript: "#F7DF1E",
    Rust: "#CE422B", Java: "#B07219", "C++": "#F34B7D", HTML: "#E34C26",
    CSS: "#563D7C",
  };

  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading label="✦ latest commits" title="what i've been building" accent="orange" />
        </motion.div>

        {/* Contribution heatmap */}
        {/*
         * Using Option A: ghchart.rshah.org with custom orange color (FF6B35).
         * This pulls the public contribution graph from GitHub.
         * Replace FF6B35 with 7C5CBF for the purple variant.
         */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-dark/5 mb-8 overflow-hidden"
        >
          <p className="font-hand text-base font-semibold text-dark/50 mb-4">contributions · last year</p>
          <img
            src="https://ghchart.rshah.org/FF6B35/shashhwatiwari"
            alt="GitHub contribution chart for shashhwatiwari"
            className="w-full"
            loading="lazy"
          />
        </motion.div>

        {/* Recent repos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 border border-dark/5 animate-pulse h-28" />
              ))
            : repos.slice(0, 6).map((repo, i) => (
                <motion.a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  whileHover={{ y: -3, transition: { duration: 0.18 } }}
                  className="group bg-white rounded-2xl p-5 border border-dark/5 shadow-sm hover:shadow-md hover:border-orange/20 transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-display font-bold text-sm text-dark group-hover:text-orange transition-colors leading-tight">
                      {repo.name}
                    </p>
                    <ArrowUpRight className="w-4 h-4 text-dark/30 group-hover:text-orange transition-colors shrink-0 ml-2" />
                  </div>
                  {repo.description && (
                    <p className="font-sans text-xs text-dark/50 leading-relaxed mb-3 line-clamp-2">
                      {repo.description}
                    </p>
                  )}
                  <div className="flex items-center gap-3">
                    {repo.language && (
                      <span className="inline-flex items-center gap-1.5 font-sans text-xs text-dark/45">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ background: langColors[repo.language] ?? "#888" }}
                        />
                        {repo.language}
                      </span>
                    )}
                    {repo.stargazers_count > 0 && (
                      <span className="font-sans text-xs text-dark/40">
                        ★ {repo.stargazers_count}
                      </span>
                    )}
                  </div>
                </motion.a>
              ))}
        </div>
      </div>
    </section>
  );
};

// ─── Skills ───────────────────────────────────────────────────────────────────

const skillCategories = [
  {
    name: "languages",
    emoji: "🧠",
    accent: "orange" as const,
    skills: ["Python", "SQL", "TypeScript", "C / C++", "Rust"],
  },
  {
    name: "backend",
    emoji: "⚙️",
    accent: "purple" as const,
    skills: ["Node.js", "Express", "FastAPI", "REST APIs"],
  },
  {
    name: "frontend",
    emoji: "🎨",
    accent: "orange" as const,
    skills: ["React", "Tailwind CSS", "HTML / CSS"],
  },
  {
    name: "ai / ml",
    emoji: "🤖",
    accent: "purple" as const,
    skills: ["PyTorch", "LangChain", "BERT", "scikit-learn", "OpenCV"],
  },
  {
    name: "cloud",
    emoji: "☁️",
    accent: "orange" as const,
    skills: ["AWS Lambda", "Bedrock", "S3"],
  },
  {
    name: "devops",
    emoji: "🚀",
    accent: "purple" as const,
    skills: ["Docker", "GitHub Actions", "CI / CD"],
  },
  {
    name: "databases",
    emoji: "🗄️",
    accent: "orange" as const,
    skills: ["PostgreSQL", "MongoDB", "ChromaDB", "BigQuery"],
  },
];

const Skills = () => (
  <section id="skills" className="py-24 px-6 bg-paper relative">
    {/* Stickers */}
    <SparkleShape className="absolute top-12 right-10 w-6 h-6 text-orange opacity-30 pointer-events-none" style={{ transform: "rotate(22deg)" }} />
    <FlowerShape className="absolute bottom-16 left-8 w-9 h-9 text-purple opacity-20 pointer-events-none" style={{ transform: "rotate(-15deg)" }} />

    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <SectionHeading label="✦ my toolbox" title="technical core" accent="purple" />
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {skillCategories.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-dark/5"
          >
            <p className={`font-hand text-lg font-bold mb-3 ${cat.accent === "orange" ? "text-orange" : "text-purple"}`}>
              {cat.emoji} {cat.name}
            </p>
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill) => (
                <span
                  key={skill}
                  className={`font-sans text-sm font-medium px-3 py-1 rounded-full ${
                    cat.accent === "orange"
                      ? "bg-orange-pale text-orange"
                      : "bg-purple-pale text-purple"
                  }`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ─── Contact ──────────────────────────────────────────────────────────────────

const Contact = () => (
  <section id="contact" className="py-28 px-6 bg-dark relative overflow-hidden">
    {/* Decorative stickers on dark bg */}
    <StarShape className="absolute top-12 left-8 w-10 h-10 text-orange opacity-10 pointer-events-none" style={{ transform: "rotate(18deg)" }} />
    <FlowerShape className="absolute bottom-12 right-10 w-14 h-14 text-purple-light opacity-10 pointer-events-none" style={{ transform: "rotate(-8deg)" }} />
    <SparkleShape className="absolute top-1/2 right-[15%] w-8 h-8 text-orange opacity-15 pointer-events-none" style={{ transform: "rotate(30deg)" }} />

    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-6xl mx-auto"
    >
      <div className="max-w-2xl">
        <p className="font-hand text-xl font-semibold text-purple-light mb-4">✦ let's connect</p>
        <h2
          className="font-display font-black text-white lowercase leading-[0.95] mb-7"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
        >
          got something
          <br />
          <span className="text-orange">worth making?</span>
        </h2>
        <p className="font-sans text-white/45 leading-relaxed mb-12 text-lg max-w-[48ch]">
          i'm actively looking for full-time roles from summer 2026.
          if you're building something interesting — i'd genuinely like to hear it.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="mailto:tiwari.sha@northeastern.edu"
            className="inline-flex items-center justify-center gap-2.5 bg-orange text-white font-display font-bold text-base lowercase px-8 py-4 rounded-2xl hover:bg-orange/90 transition-colors"
          >
            <Mail className="w-5 h-5" />
            tiwari.sha@northeastern.edu
          </a>
          <a
            href="https://www.linkedin.com/in/shashwat-tiwari118/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 border-2 border-white/15 text-white font-display font-bold text-base lowercase px-8 py-4 rounded-2xl hover:border-orange/50 hover:text-orange transition-colors"
          >
            <Linkedin className="w-5 h-5" />
            linkedin
          </a>
        </div>
      </div>
    </motion.div>
  </section>
);

// ─── Footer ───────────────────────────────────────────────────────────────────

const Footer = () => (
  <footer className="border-t border-dark/8 bg-cream">
    <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
      <div>
        <span className="font-display font-black text-sm text-dark lowercase">shashwat tiwari</span>
        <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-dark/30 mt-1">
          © 2025 — built with react & tailwind
        </p>
      </div>
      <div className="flex items-center gap-6">
        {[
          { href: "https://www.linkedin.com/in/shashwat-tiwari118/", icon: <Linkedin className="w-4 h-4" />, label: "linkedin" },
          { href: "mailto:tiwari.sha@northeastern.edu",              icon: <Mail className="w-4 h-4" />,     label: "email" },
          { href: "https://github.com/shashhwatiwari",               icon: <Github className="w-4 h-4" />,   label: "github" },
          { href: "https://leetcode.com/u/shashwat__/",              icon: <ExternalLink className="w-4 h-4" />, label: "leetcode" },
        ].map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-sans text-xs text-dark/45 hover:text-orange transition-colors"
          >
            {l.icon}
            {l.label}
          </a>
        ))}
      </div>
    </div>
  </footer>
);

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main>
        <Hero />
        <AboutMe />
        <Experience />
        <Projects />
        <GitHubActivity />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
