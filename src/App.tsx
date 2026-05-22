/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { useState, useEffect } from "react";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Code2,
  Users,
  BarChart3,
  BookOpen,
} from "lucide-react";

// ─── Animation Variants ────────────────────────────────────────────────────────

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Typewriter ────────────────────────────────────────────────────────────────

const Typewriter = ({ texts }: { texts: string[] }) => {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(120);

  useEffect(() => {
    const handleType = () => {
      const currentText = texts[index];
      if (isDeleting) {
        setDisplayText(currentText.substring(0, displayText.length - 1));
        setSpeed(40);
      } else {
        setDisplayText(currentText.substring(0, displayText.length + 1));
        setSpeed(120);
      }
      if (!isDeleting && displayText === currentText) {
        setTimeout(() => setIsDeleting(true), 2400);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % texts.length);
      }
    };
    const timer = setTimeout(handleType, speed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, index, texts, speed]);

  return (
    <span className="text-primary font-label">
      {displayText}
      <span className="inline-block w-0.5 h-[0.8em] bg-primary ml-0.5 align-middle animate-pulse" />
    </span>
  );
};

// ─── Navbar ───────────────────────────────────────────────────────────────────

const Navbar = () => {
  const [activeSection, setActiveSection] = useState<string | null>("about");

  useEffect(() => {
    const sections = ["about", "experience", "education", "projects", "skills"];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      let currentSection: string | null = null;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const { offsetTop, offsetHeight } = el;
          const buffer = 150;
          if (
            scrollPosition >= offsetTop + buffer &&
            scrollPosition < offsetTop + offsetHeight - buffer
          ) {
            currentSection = id;
            break;
          }
        }
      }

      if (window.scrollY < 100) {
        setActiveSection("about");
      } else if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        setActiveSection(null);
      } else {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass-nav border-b border-on-surface/5">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-8 h-16">
        <a
          href="#about"
          className="font-label font-bold text-on-surface tracking-tight text-base hover:text-primary transition-colors duration-200"
        >
          Shashwat Tiwari
        </a>

        <div className="hidden md:flex gap-9 items-center">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`relative py-1 text-sm font-label font-medium tracking-wide transition-colors duration-200 ${
                activeSection === link.id
                  ? "text-primary"
                  : "text-on-surface/45 hover:text-on-surface"
              }`}
            >
              {link.label}
              {activeSection === link.id && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute -bottom-px left-0 right-0 h-px bg-primary"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </div>

        <a
          href="https://www.linkedin.com/in/shashwat-tiwari118/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-label text-sm font-semibold text-primary border border-primary/30 px-5 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-200"
        >
          Resume ↗
        </a>
      </div>
    </nav>
  );
};

// ─── Hero ─────────────────────────────────────────────────────────────────────

const Hero = () => (
  <section
    className="relative px-8 pt-28 pb-20 max-w-7xl mx-auto min-h-[88vh] flex flex-col justify-center"
    id="about"
  >
    <motion.div
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
      className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-16 md:gap-28 items-center"
    >
      {/* ── Left: text ── */}
      <motion.div variants={itemVariants}>
        <div className="inline-flex items-center gap-2 bg-primary/8 text-primary px-3.5 py-1.5 rounded-full font-label text-xs font-semibold tracking-wide mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          Open to full-time · Summer 2026
        </div>

        <p className="font-label text-on-surface/35 font-medium tracking-widest text-xs uppercase mb-3">
          Hi, I'm
        </p>

        <h1 className="font-label text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter text-on-surface leading-[0.93] mb-7">
          Shashwat
          <br />
          Tiwari.
        </h1>

        <div className="text-xl md:text-2xl font-medium text-on-surface/55 mb-10 font-label h-9">
          <Typewriter texts={["Data Analyst", "Software Engineer", "ML Builder"]} />
        </div>

        <p className="text-lg text-on-surface-variant leading-relaxed max-w-[46ch]">
          I build things that work — and care about why they work. ML pipelines
          at Bain, CV systems at Aftershoot, and a few projects I'm genuinely
          proud of in between.
        </p>

        <div className="mt-10 flex items-center gap-6 flex-wrap">
          <div>
            <span className="font-label text-[10px] uppercase tracking-widest text-outline block mb-0.5">
              Based in
            </span>
            <span className="font-label font-semibold text-sm text-on-surface">
              Boston, MA
            </span>
          </div>
          <div className="w-px h-8 bg-outline-variant/40" />
          <div>
            <span className="font-label text-[10px] uppercase tracking-widest text-outline block mb-0.5">
              Currently
            </span>
            <span className="font-label font-semibold text-sm text-on-surface">
              MS CS @ Northeastern
            </span>
          </div>
          <div className="w-px h-8 bg-outline-variant/40" />
          <div>
            <span className="font-label text-[10px] uppercase tracking-widest text-outline block mb-0.5">
              Previously
            </span>
            <span className="font-label font-semibold text-sm text-on-surface">
              Bain & Aftershoot
            </span>
          </div>
        </div>
      </motion.div>

      {/* ── Right: photo with offset borders ── */}
      <motion.div variants={itemVariants} className="flex justify-center md:justify-end">
        <div className="relative group cursor-default">
          <img
            src={`${import.meta.env.BASE_URL}profile.png`}
            alt="Shashwat Tiwari"
            className="relative z-10 w-52 h-64 md:w-60 md:h-72 object-cover object-[center_22%] rounded-2xl shadow-xl"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.src =
                "https://picsum.photos/seed/shashwat/1000/1000";
            }}
          />
          {/* Orange offset border */}
          <div className="absolute inset-0 rounded-2xl border-2 border-primary/50 translate-x-2.5 translate-y-2.5 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-300 ease-out" />
          {/* Purple offset border */}
          <div className="absolute inset-0 rounded-2xl border border-purple/25 translate-x-5 translate-y-5 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-500 ease-out" />
        </div>
      </motion.div>
    </motion.div>
  </section>
);

// ─── Experience ───────────────────────────────────────────────────────────────

const Experience = () => (
  <section className="py-28 bg-surface-low" id="experience">
    <div className="max-w-7xl mx-auto px-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <motion.div
          variants={itemVariants}
          className="flex items-end justify-between mb-16"
        >
          <div>
            <span className="font-label text-xs font-semibold tracking-widest text-primary uppercase block mb-3">
              01
            </span>
            <h2 className="font-label text-5xl font-bold tracking-tighter text-on-surface">
              Experience
            </h2>
          </div>
          <span className="font-label text-sm text-on-surface/30 hidden md:block">
            2023 — 2024
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bain & Company */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -6 }}
            className="group bg-surface-lowest rounded-xl relative overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_-12px_rgba(204,0,0,0.12)] border border-on-surface/5"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-[#cc0000]/40 group-hover:bg-[#cc0000] rounded-l-xl transition-colors duration-300" />
            <div className="p-10 pl-12">
              <div className="h-14 mb-8 flex items-center">
                <img
                  src={`${import.meta.env.BASE_URL}bain-logo.png`}
                  alt="Bain & Company"
                  className="h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="mb-5">
                <h3 className="font-label text-2xl font-bold tracking-tight text-on-surface">
                  Data Analyst Intern
                </h3>
                <div className="flex items-center gap-2.5 mt-1.5">
                  <span
                    className="font-label font-semibold text-xs tracking-wider uppercase"
                    style={{ color: "#cc0000" }}
                  >
                    Bain & Company
                  </span>
                  <span className="text-outline-variant/50">·</span>
                  <span className="font-mono text-xs text-on-surface/35">
                    Jan — Jul 2024
                  </span>
                </div>
              </div>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-5">
                End-to-end ML pipelines for M&A deal screening across 20–75
                datasets — K-Means & hierarchical clustering to segment
                acquisition targets, reducing manual analyst review time by 40%.
              </p>
              <ul className="space-y-2.5 mb-8">
                {[
                  "Time-series forecasting (ARIMA + XGBoost) improving prospect prioritization by 18%",
                  "Automated SQL + Python ingestion pipelines with schema validation & anomaly detection",
                  "NLP classification (TF-IDF + Logistic Regression, spaCy NER) for document tagging",
                  "Pytest + Great Expectations testing frameworks, maintaining >95% data accuracy",
                ].map((b, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-sm text-on-surface/65"
                  >
                    <span className="mt-[7px] w-1 h-1 rounded-full bg-[#cc0000]/50 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                {["Python", "SQLAlchemy", "XGBoost", "NLP", "Pytest"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-surface-low font-label text-[10px] uppercase tracking-widest text-on-surface/45 rounded-md hover:text-[#cc0000] transition-colors cursor-default"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>
          </motion.div>

          {/* Aftershoot */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -6 }}
            className="group bg-surface-lowest rounded-xl relative overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_-12px_rgba(0,99,151,0.12)] border border-on-surface/5"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-[#006397]/40 group-hover:bg-[#006397] rounded-l-xl transition-colors duration-300" />
            <div className="p-10 pl-12">
              <div className="h-14 mb-8 flex items-center">
                <img
                  src={`${import.meta.env.BASE_URL}aftershoot-logo.png`}
                  alt="Aftershoot"
                  className="h-10 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="mb-5">
                <h3 className="font-label text-2xl font-bold tracking-tight text-on-surface">
                  Software Engineer Intern
                </h3>
                <div className="flex items-center gap-2.5 mt-1.5">
                  <span
                    className="font-label font-semibold text-xs tracking-wider uppercase"
                    style={{ color: "#006397" }}
                  >
                    Aftershoot Inc.
                  </span>
                  <span className="text-outline-variant/50">·</span>
                  <span className="font-mono text-xs text-on-surface/35">
                    May — Jul 2023
                  </span>
                </div>
              </div>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-5">
                High-throughput data ingestion pipelines in Python for Stripe
                subscription telemetry, enabling downstream customer retention
                analytics.
              </p>
              <ul className="space-y-2.5 mb-8">
                {[
                  "ETL rewrite Python → Rust: 3× speed, 45% lower peak memory, zero infrastructure scaling",
                  "CNN-based models for blur detection, sharpness scoring, and duplicate identification",
                  "OpenCV & scikit-image enhancements improving preprocessing accuracy",
                  "CI/CD automation with Docker + GitHub Actions, cutting deployment time >60%",
                ].map((b, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-sm text-on-surface/65"
                  >
                    <span className="mt-[7px] w-1 h-1 rounded-full bg-[#006397]/50 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                {["Rust", "OpenCV", "Docker", "CNN", "Stripe API"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-surface-low font-label text-[10px] uppercase tracking-widest text-on-surface/45 rounded-md hover:text-[#006397] transition-colors cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  </section>
);

// ─── Education ────────────────────────────────────────────────────────────────

const Education = () => (
  <section className="py-28 bg-background" id="education">
    <div className="max-w-7xl mx-auto px-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <motion.div
          variants={itemVariants}
          className="flex items-end justify-between mb-16"
        >
          <div>
            <span className="font-label text-xs font-semibold tracking-widest text-purple uppercase block mb-3">
              02
            </span>
            <h2 className="font-label text-5xl font-bold tracking-tighter text-on-surface">
              Education
            </h2>
          </div>
        </motion.div>

        <div className="divide-y divide-on-surface/8">
          {/* Northeastern */}
          <motion.div
            variants={itemVariants}
            className="group flex items-center gap-8 py-10 -mx-4 px-4 rounded-xl transition-colors duration-200 hover:bg-surface-low"
          >
            <img
              src={`${import.meta.env.BASE_URL}NEU.png`}
              alt="Northeastern University"
              className="w-14 h-14 object-contain shrink-0"
              referrerPolicy="no-referrer"
            />
            <div className="flex-1 flex flex-col md:flex-row md:items-start md:justify-between gap-1">
              <div>
                <h3 className="font-label text-xl font-bold tracking-tight text-on-surface">
                  Northeastern University
                </h3>
                <p
                  className="font-label font-semibold text-xs uppercase tracking-wider mt-1"
                  style={{ color: "#d41c2c" }}
                >
                  MS Computer Science
                </p>
              </div>
              <div className="md:text-right shrink-0 mt-1 md:mt-0">
                <span className="font-mono text-xs text-on-surface/35 block">
                  Sept 2024 — May 2026
                </span>
                <span className="font-label text-sm font-semibold text-on-surface/70 mt-0.5 block">
                  GPA 4.0 / 4.0
                </span>
              </div>
            </div>
          </motion.div>

          {/* Shiv Nadar */}
          <motion.div
            variants={itemVariants}
            className="group flex items-center gap-8 py-10 -mx-4 px-4 rounded-xl transition-colors duration-200 hover:bg-surface-low"
          >
            <img
              src={`${import.meta.env.BASE_URL}sn-logo.png`}
              alt="Shiv Nadar University"
              className="w-14 h-14 object-contain shrink-0"
              referrerPolicy="no-referrer"
            />
            <div className="flex-1 flex flex-col md:flex-row md:items-start md:justify-between gap-1">
              <div>
                <h3 className="font-label text-xl font-bold tracking-tight text-on-surface">
                  Shiv Nadar University
                </h3>
                <p
                  className="font-label font-semibold text-xs uppercase tracking-wider mt-1"
                  style={{ color: "#1270b7" }}
                >
                  BS Computer Science
                </p>
              </div>
              <div className="md:text-right shrink-0 mt-1 md:mt-0">
                <span className="font-mono text-xs text-on-surface/35 block">
                  Aug 2020 — May 2024
                </span>
                <span className="font-label text-sm font-semibold text-on-surface/70 mt-0.5 block">
                  GPA 3.5 / 4.0
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  </section>
);

// ─── Projects ─────────────────────────────────────────────────────────────────

const Projects = () => (
  <section className="py-28 bg-surface-low" id="projects">
    <div className="max-w-7xl mx-auto px-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <motion.div
          variants={itemVariants}
          className="flex items-end justify-between mb-16"
        >
          <div>
            <span className="font-label text-xs font-semibold tracking-widest text-primary uppercase block mb-3">
              03
            </span>
            <h2 className="font-label text-5xl font-bold tracking-tighter text-on-surface">
              Projects
            </h2>
          </div>
          <p className="hidden md:block font-label text-sm text-on-surface/30">
            Selected works
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* RegTranslate — featured */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="md:col-span-7 group relative overflow-hidden bg-surface-lowest rounded-xl transition-all duration-500 hover:shadow-[0_20px_40px_-12px_rgba(255,94,0,0.12)] border border-on-surface/5"
          >
            <div className="h-[3px] bg-gradient-to-r from-primary to-primary/20" />
            <div className="p-10 flex flex-col min-h-[420px]">
              <div className="flex-grow">
                <div className="mb-6 flex justify-between items-start">
                  <Code2 className="text-primary w-7 h-7" />
                  <a
                    className="text-on-surface/25 hover:text-primary transition-colors"
                    href="https://regtranslate.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </a>
                </div>
                <h3 className="font-label text-4xl font-bold tracking-tighter text-on-surface mb-4">
                  RegTranslate
                </h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  A RAG-based compliance platform that converts complex
                  regulatory PDFs (HIPAA, GDPR) into actionable developer tasks
                  using Llama 3 and LangChain. Semantic search pipeline via
                  ChromaDB for high-accuracy context retrieval.
                </p>
              </div>
              <div className="mt-8">
                <p className="font-label text-[10px] uppercase tracking-widest text-on-surface/25 mb-3">
                  Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: "Llama 3", dot: "bg-primary" },
                    { name: "LangChain", dot: "bg-purple" },
                    { name: "ChromaDB", dot: "bg-tertiary" },
                    { name: "FastAPI", dot: "bg-primary" },
                  ].map((tech) => (
                    <div
                      key={tech.name}
                      className="px-3 py-1.5 rounded-lg bg-surface-low flex items-center gap-2"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${tech.dot}`} />
                      <span className="font-label text-xs text-on-surface/55">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* MuseBot */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="md:col-span-5 group relative overflow-hidden bg-surface-lowest rounded-xl transition-all duration-500 hover:shadow-[0_20px_40px_-12px_rgba(123,79,160,0.14)] border border-on-surface/5"
          >
            <div className="h-[3px] bg-gradient-to-r from-purple to-purple/20" />
            <div className="p-10 flex flex-col min-h-[420px]">
              <div className="flex-grow">
                <div className="mb-6 flex justify-between items-start">
                  <Users className="text-purple w-7 h-7" />
                  <a
                    className="text-on-surface/25 hover:text-purple transition-colors"
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </a>
                </div>
                <h3 className="font-label text-3xl font-bold tracking-tighter text-on-surface mb-4">
                  MuseBot
                </h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Emotion-aware conversational AI using fine-tuned BERT on
                  GoEmotions. Integrates with WhatsApp API for personalized
                  music recommendations based on detected mood.
                </p>
              </div>
              <div className="mt-8">
                <p className="font-label text-[10px] uppercase tracking-widest text-on-surface/25 mb-3">
                  Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: "BERT", dot: "bg-purple" },
                    { name: "PyTorch", dot: "bg-primary" },
                    { name: "WhatsApp API", dot: "bg-tertiary" },
                  ].map((tech) => (
                    <div
                      key={tech.name}
                      className="px-3 py-1.5 rounded-lg bg-surface-low flex items-center gap-2"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${tech.dot}`} />
                      <span className="font-label text-xs text-on-surface/55">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Kambaz */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="md:col-span-6 group relative overflow-hidden bg-surface-lowest rounded-xl transition-all duration-500 hover:shadow-[0_20px_40px_-12px_rgba(132,79,0,0.10)] border border-on-surface/5"
          >
            <div className="h-[3px] bg-gradient-to-r from-tertiary to-tertiary/20" />
            <div className="p-10 flex flex-col min-h-[300px]">
              <div className="flex-grow">
                <div className="mb-6 flex justify-between items-start">
                  <Code2 className="text-tertiary w-7 h-7" />
                  <a
                    className="text-on-surface/25 hover:text-tertiary transition-colors"
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </a>
                </div>
                <h3 className="font-label text-3xl font-bold tracking-tighter text-on-surface mb-3">
                  Kambaz
                </h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Full-stack learning platform (MERN) replicating Canvas-style
                  dashboards, optimized for concurrent user access.
                </p>
              </div>
              <div className="mt-8">
                <div className="flex flex-wrap gap-2">
                  {["MongoDB", "Express.js", "React", "Node.js"].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-lg bg-surface-low font-label text-xs text-on-surface/55"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Publication */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="md:col-span-6 group relative overflow-hidden bg-surface-lowest rounded-xl transition-all duration-500 hover:shadow-[0_20px_40px_-12px_rgba(123,79,160,0.08)] border border-on-surface/5"
          >
            <div className="h-[3px] bg-gradient-to-r from-primary/40 via-purple/40 to-purple/10" />
            <div className="p-10 flex flex-col min-h-[300px]">
              <div className="flex-grow">
                <div className="mb-6 flex justify-between items-start">
                  <BookOpen className="text-on-surface/35 w-7 h-7" />
                  <a
                    className="text-on-surface/25 hover:text-primary transition-colors"
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </a>
                </div>
                <span className="font-label text-[10px] uppercase tracking-widest text-on-surface/30 block mb-2">
                  ACIIDS Publication
                </span>
                <h3 className="font-label text-3xl font-bold tracking-tighter text-on-surface mb-3">
                  Epidemic Dynamics
                </h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Co-authored ML research on predicting disease outbreaks.
                  Benchmarked transformer models (BERT, RoBERTa, DistilBERT)
                  across heterogeneous datasets.
                </p>
              </div>
              <div className="mt-8">
                <div className="flex flex-wrap gap-2">
                  {["PyTorch", "BERT", "RoBERTa", "DistilBERT"].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-lg bg-surface-low font-label text-xs text-on-surface/55"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  </section>
);

// ─── Technical Core ───────────────────────────────────────────────────────────

const TechnicalCore = () => {
  const skills = [
    { label: "Language", title: "Python", desc: "Data Science · Backend", hover: "hover:border-primary hover:text-primary" },
    { label: "Database", title: "SQL", desc: "PostgreSQL · BigQuery", hover: "hover:border-purple hover:text-purple" },
    { label: "Language", title: "C / C++", desc: "Systems Engineering", hover: "hover:border-tertiary hover:text-tertiary" },
    { label: "Backend", title: "Node.js", desc: "Express · RESTful APIs", hover: "hover:border-primary hover:text-primary" },
    { label: "Frontend", title: "React", desc: "TypeScript · Tailwind", hover: "hover:border-purple hover:text-purple" },
    { label: "DevOps", title: "CI / CD", desc: "Docker · GitHub Actions", hover: "hover:border-tertiary hover:text-tertiary" },
    { label: "AI / ML", title: "PyTorch", desc: "NLP · Transformers", hover: "hover:border-primary hover:text-primary" },
    { label: "Cloud", title: "AWS", desc: "Lambda · Bedrock · S3", hover: "hover:border-purple hover:text-purple" },
    { label: "Database", title: "MongoDB", desc: "NoSQL · Atlas", hover: "hover:border-tertiary hover:text-tertiary" },
  ];

  return (
    <section className="py-28 bg-background" id="skills">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className="grid grid-cols-1 lg:grid-cols-3 gap-20"
        >
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <span className="font-label text-xs font-semibold tracking-widest text-purple uppercase block mb-3">
              04
            </span>
            <h2 className="font-label text-5xl font-bold tracking-tighter mb-8 leading-[0.95]">
              Technical
              <br />
              Core
            </h2>
            <p className="text-on-surface-variant leading-relaxed text-sm">
              The tools I reach for first. Built around scalability, data
              integrity, and getting things to actually ship.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-10"
          >
            {skills.map((skill) => (
              <div
                key={skill.title}
                className={`group border-l-2 border-outline-variant/20 pl-5 py-1.5 transition-all duration-200 cursor-default ${skill.hover}`}
              >
                <span className="font-label text-[9px] uppercase tracking-widest text-on-surface/30 mb-1 block">
                  {skill.label}
                </span>
                <h4 className="font-label font-bold text-lg text-on-surface group-hover:text-inherit transition-colors">
                  {skill.title}
                </h4>
                <p className="font-label text-xs text-on-surface/35 mt-1">
                  {skill.desc}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// ─── CTA ──────────────────────────────────────────────────────────────────────

const CTA = () => (
  <section className="py-28 bg-[#18102b]" id="cta">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-7xl mx-auto px-8"
    >
      <div className="max-w-2xl">
        <span className="font-label text-xs font-semibold tracking-widest text-purple/60 uppercase block mb-6">
          Let's connect
        </span>
        <h2 className="font-label text-5xl md:text-6xl font-bold tracking-tighter text-white leading-[1.05] mb-8">
          Got something
          <br />
          worth making?
        </h2>
        <p className="text-white/45 leading-relaxed mb-12 text-lg">
          I'm actively looking for full-time roles from Summer 2026. If you're
          building something interesting — I'd genuinely like to hear it.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 font-label font-bold rounded-lg hover:bg-primary/90 transition-all duration-200"
            href="mailto:tiwari.sha@northeastern.edu"
          >
            <Mail className="w-4 h-4" />
            tiwari.sha@northeastern.edu
          </a>
          <a
            className="inline-flex items-center justify-center gap-2 border border-white/15 text-white px-8 py-4 font-label font-bold rounded-lg hover:bg-white/8 transition-all duration-200"
            href="https://www.linkedin.com/in/shashwat-tiwari118/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </a>
        </div>
      </div>
    </motion.div>
  </section>
);

// ─── Footer ───────────────────────────────────────────────────────────────────

const Footer = () => (
  <footer className="w-full border-t border-on-surface/8 bg-surface">
    <div className="flex flex-col md:flex-row justify-between items-center py-10 px-8 max-w-7xl mx-auto gap-6">
      <div>
        <span className="font-label font-bold text-on-surface text-sm">
          Shashwat Tiwari
        </span>
        <p className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface/30 mt-1">
          © 2025 — Built with React & Tailwind
        </p>
      </div>
      <div className="flex gap-6 font-label text-xs items-center">
        <a
          className="text-on-surface/45 hover:text-primary transition-colors flex items-center gap-1.5"
          href="https://www.linkedin.com/in/shashwat-tiwari118/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Linkedin className="w-3.5 h-3.5" />
          LinkedIn
        </a>
        <a
          className="text-on-surface/45 hover:text-primary transition-colors flex items-center gap-1.5"
          href="mailto:tiwari.sha@northeastern.edu"
        >
          <Mail className="w-3.5 h-3.5" />
          Email
        </a>
        <a
          className="text-on-surface/45 hover:text-primary transition-colors flex items-center gap-1.5"
          href="https://github.com/shashhwatiwari"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github className="w-3.5 h-3.5" />
          GitHub
        </a>
        <a
          className="text-on-surface/45 hover:text-primary transition-colors flex items-center gap-1.5"
          href="https://leetcode.com/u/shashwat__/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BarChart3 className="w-3.5 h-3.5" />
          LeetCode
        </a>
      </div>
    </div>
  </footer>
);

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <Hero />
        <Experience />
        <Education />
        <Projects />
        <TechnicalCore />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
