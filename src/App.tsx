/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Shashwat Tiwari - Portfolio
 * Fonts: Nunito (display) + Inter (body). No third font.
 */

import { motion, useScroll, useTransform } from "motion/react";
import { useState, useEffect, type CSSProperties } from "react";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";

const BASE = import.meta.env.BASE_URL;

// ─── Subtle Geometric Accents (hero only) ─────────────────────────────────────
// Thin outlines and tiny dots at 8–12% opacity - design-portfolio aesthetic.

type GeomProps = { className?: string; style?: CSSProperties };

/** Thin circle outline */
const GeomCircle = ({ className = "", style = {} }: GeomProps) => (
  <svg className={className} style={style} viewBox="0 0 40 40" fill="none">
    <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.25" />
  </svg>
);

/** Thin ＋ cross */
const GeomCross = ({ className = "", style = {} }: GeomProps) => (
  <svg className={className} style={style} viewBox="0 0 18 18" fill="currentColor">
    <rect x="8" y="0" width="2" height="18" />
    <rect x="0" y="8" width="18" height="2" />
  </svg>
);

/** Filled micro-dot */
const GeomDot = ({ className = "", style = {} }: GeomProps) => (
  <svg className={className} style={style} viewBox="0 0 8 8" fill="currentColor">
    <circle cx="4" cy="4" r="2.5" />
  </svg>
);

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

// ─── Polaroid ─────────────────────────────────────────────────────────────────

interface PolaroidProps {
  src: string;
  alt: string;
  rotate?: number;
  className?: string;
}

const Polaroid = ({ src, alt, rotate = 0, className = "" }: PolaroidProps) => (
  <motion.div
    className={`relative inline-block flex-shrink-0 ${className}`}
    style={{ transform: `rotate(${rotate}deg)` }}
    whileHover={{ scale: 1.04, rotate: rotate * 0.6, transition: { duration: 0.22, ease: "easeOut" } }}
  >
    <div className="tape-strip" />
    <div className="polaroid-frame">
      <div className="overflow-hidden bg-gray-100 aspect-[3/4] w-full">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
          /*
           * Photo path note: files must be in /public/photos/ (plural).
           * Full path on disk: <project-root>/public/photos/stadium.jpeg etc.
           * Dev URL: http://localhost:3000/portfolio/photos/stadium.jpeg
           */
        />
      </div>
    </div>
  </motion.div>
);

// ─── Photo Cluster ────────────────────────────────────────────────────────────
// Four plain overlapping images (no polaroid frame). "more of me." text overlay.
// Photo files needed: /public/photos/1.jpeg, 2.jpeg, 3.jpeg, 4.jpeg

const PhotoCluster = () => {
  const photos = [
    { file: "1.jpeg", alt: "shashwat photo 1", rotate: -6, bottom: 0 },
    { file: "2.jpeg", alt: "shashwat photo 2", rotate: 4,  bottom: 20 },
    { file: "3.jpeg", alt: "shashwat photo 3", rotate: -3, bottom: 0 },
    { file: "4.jpeg", alt: "shashwat photo 4", rotate: 6,  bottom: 16 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.1 }}
      className="relative h-[280px] mb-10"
    >
      {photos.map((p, i) => (
        <motion.div
          key={p.file}
          className="absolute"
          style={{
            left: `${i * 22}%`,
            bottom: p.bottom,
            zIndex: i + 1,
            transform: `rotate(${p.rotate}deg)`,
          }}
          whileHover={{ scale: 1.06, zIndex: 10, transition: { duration: 0.2 } }}
        >
          <img
            src={`${BASE}photos/${p.file}`}
            alt={p.alt}
            className="w-36 h-48 object-cover shadow-lg"
            style={{ borderRadius: 6 }}
            loading="lazy"
          />
        </motion.div>
      ))}

    </motion.div>
  );
};

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
    <p
      className={`font-sans text-xs font-semibold tracking-widest uppercase mb-2 ${
        accent === "orange" ? "text-orange" : "text-purple"
      }`}
    >
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
      const ids = ["about", "experience", "projects", "skills", "resume", "contact"];
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
    { href: "#contact",    label: "contact me" },
  ];

  const socialIcons = [
    { href: "https://github.com/shashhwatiwari",               icon: <GitHubIcon size={24} />,   label: "github" },
    { href: "https://www.linkedin.com/in/shashwat-tiwari118/", icon: <LinkedInIcon size={24} />, label: "linkedin" },
    { href: "https://leetcode.com/u/shashwat__/",              icon: <LeetCodeIcon size={24} />, label: "leetcode" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "glass-nav border-b border-dark/6 shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="font-display font-black text-xl lowercase text-dark hover:text-orange transition-colors">
          shashwat.
        </a>

        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`font-sans text-sm font-medium lowercase transition-colors duration-200 ${
                active === l.href.slice(1)
                  ? "text-orange"
                  : "text-dark/55 hover:text-dark"
              }`}
            >
              {l.label}
            </a>
          ))}

          {/* Separator */}
          <span className="h-4 w-px bg-dark/15" />

          {/* Social icons - 24px, before Resume button */}
          {socialIcons.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="text-dark/40 hover:text-orange transition-colors"
            >
              {s.icon}
            </a>
          ))}

          {/* Resume button - links to #resume section */}
          <a
            href="#resume"
            className={`font-sans text-sm font-semibold lowercase px-4 py-1.5 rounded-full bg-orange text-white hover:bg-orange/85 transition-colors ${
              active === "resume" ? "ring-2 ring-orange/40" : ""
            }`}
          >
            resume
          </a>
        </div>

        <button
          className="md:hidden w-8 h-8 flex flex-col gap-1.5 justify-center items-end"
          onClick={() => setMobileOpen((p) => !p)}
          aria-label="Toggle menu"
        >
          <span className="block h-0.5 w-6 bg-dark rounded-full" />
          <span className="block h-0.5 w-4 bg-dark rounded-full" />
          <span className="block h-0.5 w-5 bg-dark rounded-full" />
        </button>
      </div>

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
              onClick={() => setMobileOpen(false)}
              className="font-sans text-sm font-medium lowercase text-dark/70 hover:text-orange transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#resume"
            onClick={() => setMobileOpen(false)}
            className="font-sans text-sm font-medium lowercase text-orange"
          >
            resume
          </a>
          <div className="flex items-center gap-5 pt-2">
            {socialIcons.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="text-dark/40 hover:text-orange transition-colors"
              >
                {s.icon}
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
  const a1y = useTransform(scrollY, [0, 500], [0, -30]);
  const a2y = useTransform(scrollY, [0, 500], [0, -18]);
  const a3y = useTransform(scrollY, [0, 500], [0, -42]);

  return (
    <section className="relative min-h-screen flex items-center overflow-visible pt-20 pb-16 px-6">
      {/*
       * ── Subtle geometric accents (hero only) ──────────────────────────────
       * Thin outlines + micro-dots at 8–12% opacity. Not on any other section.
       */}
      <motion.div style={{ y: a1y }} className="absolute top-[12%] left-[5%] pointer-events-none select-none">
        <GeomCircle className="w-14 h-14 text-orange opacity-[0.09]" />
      </motion.div>
      <motion.div style={{ y: a2y }} className="absolute top-[20%] right-[7%] pointer-events-none select-none">
        <GeomCross className="w-5 h-5 text-purple opacity-[0.10]" />
      </motion.div>
      <motion.div style={{ y: a3y }} className="absolute bottom-[32%] left-[2.5%] pointer-events-none select-none">
        <GeomCircle className="w-9 h-9 text-purple opacity-[0.08]" />
      </motion.div>
      <div className="absolute top-[42%] right-[3.5%] pointer-events-none select-none">
        <GeomDot className="w-3.5 h-3.5 text-orange opacity-[0.13]" />
      </div>
      <div className="absolute bottom-[18%] right-[14%] pointer-events-none select-none">
        <GeomCross className="w-4 h-4 text-purple opacity-[0.09]" />
      </div>
      <div className="absolute top-[7%] right-[22%] pointer-events-none select-none">
        <GeomDot className="w-2.5 h-2.5 text-orange opacity-[0.11]" />
      </div>

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
              <span className="font-sans font-medium text-orange text-sm">
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
              <Typewriter texts={["Software Engineer", "AI Engineer", "TA @ northeastern"]} />
            </p>

            {/* Stat pills */}
            <div className="flex flex-wrap gap-2.5">
              {[
                { emoji: "📍", text: "Boston, ma" },
                { emoji: "🎓", text: "MS CS @ northeastern" },
                { emoji: "💼", text: "prev. Bain & Co and Aftershoot Inc" },
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

          {/* ── Right: polaroids - ~35% larger ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center md:justify-end relative"
          >
            {/* Boston polaroid peeking behind - enlarged from w-36 → w-48 */}
            <div
              className="absolute right-2 top-4 w-48 opacity-70"
              style={{ transform: "rotate(6deg)" }}
            >
              <div className="polaroid-frame">
                <div className="overflow-hidden bg-gray-100 aspect-[3/4] w-full">
                  <img
                    src={`${BASE}photos/boston.jpeg`}
                    alt="Boston"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Main polaroid - enlarged from w-44 md:w-52 → w-60 md:w-72 */}
            <Polaroid
              src={`${BASE}photos/stadium.jpeg`}
              alt="Shashwat at soccer game"
              rotate={-4}
              className="w-60 md:w-72 relative z-10"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ─── About Me ─────────────────────────────────────────────────────────────────

const AboutMe = () => (
  <section id="about" className="py-24 px-6 bg-paper">
    <div className="max-w-6xl mx-auto">
      <SectionHeading label="who am i" title="about me" accent="orange" />

      <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-16 items-start">

        {/* ── Left: bio + photo cluster ── */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-sans text-lg text-dark/75 leading-relaxed mb-12 max-w-[52ch]"
          >
            I build things that work - and care about why they work. ML pipelines at bain,
            CV systems at aftershoot, and a few projects i'm genuinely proud of in between.
            A recent MS CS graduate from Northeastern, based in boston.
          </motion.p>

          {/* Photo cluster - 4 plain images, no polaroid frames */}
          <PhotoCluster />

          {/* Beyond my resume */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4"
          >
            <p className="font-sans text-sm font-semibold text-dark/70 lowercase mb-4">
              Beyond my resume, I'm also into..
            </p>
            <div className="flex flex-wrap gap-2.5">
              {[
                { emoji: "⚽", label: "football (barça fan)", bg: "bg-orange-pale text-orange border-orange/20" },
                { emoji: "🎵", label: "live music",         bg: "bg-purple-pale text-purple border-purple/20" },
                { emoji: "📸", label: "photography", bg: "bg-orange-pale text-orange border-orange/20" },
                { emoji: "🍔", label: "food hunting",       bg: "bg-purple-pale text-purple border-purple/20" },
                { emoji: "🌆", label: "city exploring",     bg: "bg-orange-pale text-orange border-orange/20" },
              ].map((h) => (
                <span
                  key={h.label}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 border text-sm font-sans font-medium ${h.bg}`}
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
          <p className="font-sans text-sm font-semibold text-dark/70 lowercase mb-6">
            education 🎓
          </p>
          <div className="flex flex-col gap-5">
            {[
              {
                logo: `${BASE}NEU.png`,
                name: "Northeastern University",
                degree: "MS Computer Science",
                gpa: "4.0 / 4.0",
                period: "2024 - 2026",
                color: "#d41c2c",
                border: "border-[#d41c2c]/25",
              },
              {
                logo: `${BASE}sn-logo.png`,
                name: "Shiv Nadar University",
                degree: "BS Computer Science",
                gpa: "3.5 / 4.0",
                period: "2020 - 2024",
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
                  <p className="font-sans text-sm font-semibold mt-0.5" style={{ color: edu.color }}>
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

// ─── Snapshot (Bento) ─────────────────────────────────────────────────────────
// "in a snapshot" - 3-col bento grid: Education (2col), Experience (1col),
// Tools & Platforms (2col), Find me on (1col), orange stat tile (full-width).

const Snapshot = () => (
  <section id="snapshot" className="py-20 px-6">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <p className="font-sans text-xs font-semibold tracking-widest uppercase text-purple mb-2">
          quick facts
        </p>
        <h2 className="font-display font-black text-3xl md:text-4xl lowercase text-dark leading-tight">
          in a snapshot.
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* ── Education - col-span-2 ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="md:col-span-2 bg-white rounded-2xl p-7 border border-dark/6 shadow-sm"
        >
          <p className="font-sans text-xs font-semibold uppercase tracking-widest text-dark/40 mb-5">
            education
          </p>
          <div className="flex flex-col gap-5">
            {[
              {
                logo: `${BASE}NEU.png`,
                name: "northeastern university",
                degree: "ms computer science",
                gpa: "4.0",
                period: "2024–2026",
                color: "#d41c2c",
              },
              {
                logo: `${BASE}sn-logo.png`,
                name: "shiv nadar university",
                degree: "bs computer science",
                gpa: "3.8",
                period: "2020–2024",
                color: "#1270b7",
              },
            ].map((edu) => (
              <div key={edu.name} className="flex items-center gap-4">
                <img
                  src={edu.logo}
                  alt={edu.name}
                  className="w-10 h-10 object-contain shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <p className="font-display font-bold text-sm lowercase text-dark leading-tight">
                    {edu.name}
                  </p>
                  <p className="font-sans text-xs font-medium mt-0.5" style={{ color: edu.color }}>
                    {edu.degree} · gpa {edu.gpa} · {edu.period}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Experience summary - col-span-1 ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl p-7 border border-dark/6 shadow-sm"
        >
          <p className="font-sans text-xs font-semibold uppercase tracking-widest text-dark/40 mb-5">
            experience
          </p>
          <div className="flex flex-col gap-3.5">
            {[
              { name: "aftershoot inc.", color: "#006397", emoji: "💻" },
              { name: "bain & company",  color: "#cc0000", emoji: "📊" },
              { name: "northeastern TA", color: "#d41c2c", emoji: "🎓" },
            ].map((e) => (
              <div key={e.name} className="flex items-center gap-2.5">
                <span className="text-base leading-none">{e.emoji}</span>
                <p className="font-sans text-sm font-medium lowercase" style={{ color: e.color }}>
                  {e.name}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Tools & Platforms - col-span-2 ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="md:col-span-2 bg-white rounded-2xl p-7 border border-dark/6 shadow-sm"
        >
          <p className="font-sans text-xs font-semibold uppercase tracking-widest text-dark/40 mb-5">
            tools & platforms
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              "AWS", "Docker", "GitHub Actions", "PostgreSQL", "MongoDB",
              "Vercel", "Redis", "Supabase", "Jupyter", "Figma", "Linux",
            ].map((tool) => (
              <span
                key={tool}
                className="font-sans text-sm font-medium px-3 py-1.5 rounded-lg bg-cream text-dark/60 border border-dark/6"
              >
                {tool}
              </span>
            ))}
          </div>
        </motion.div>

        {/* ── Find me on - col-span-1 ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl p-7 border border-dark/6 shadow-sm"
        >
          <p className="font-sans text-xs font-semibold uppercase tracking-widest text-dark/40 mb-5">
            find me on
          </p>
          <div className="flex flex-col gap-4">
            {[
              {
                icon: <GitHubIcon size={20} />,
                label: "github",
                href: "https://github.com/shashhwatiwari",
                color: "text-dark",
              },
              {
                icon: <LinkedInIcon size={20} />,
                label: "linkedin",
                href: "https://www.linkedin.com/in/shashwat-tiwari118/",
                color: "text-[#0077b5]",
              },
              {
                icon: <LeetCodeIcon size={20} />,
                label: "leetcode",
                href: "https://leetcode.com/u/shashwat__/",
                color: "text-[#FFA116]",
              },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-3 font-sans text-sm font-medium lowercase hover:opacity-65 transition-opacity ${s.color}`}
              >
                {s.icon}
                {s.label}
              </a>
            ))}
          </div>
        </motion.div>

        {/* ── Orange full-width stat tile - col-span-3 ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="md:col-span-3 rounded-2xl px-8 py-7 flex flex-wrap items-center gap-8 md:gap-14"
          style={{ background: "#FF6B35" }}
        >
          {[
            { value: "4.0",  label: "gpa" },
            { value: "2",    label: "internships" },
            { value: "1",    label: "co-authored paper" },
            { value: "10+",   label: "projects " },
            { value: "300+", label: "students taught" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <span className="font-display font-black text-white text-3xl leading-none">
                {stat.value}
              </span>
              <span className="font-sans text-white/70 text-xs font-medium lowercase mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

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
    period: "may - jul 2023",
    type: "professional" as const,
    description:
      "High-throughput stripe telemetry pipelines; etl rewrite python → rust (3× faster, 45% less memory); cnn models for blur detection and sharpness scoring; automated CI/CD with Docker.",
    tags: ["Rust", "OpenCV", "Docker", "CNN", "Python"],
  },
  {
    year: "2024",
    role: "data analyst intern",
    company: "Bain & Company",
    logo: `${BASE}bain-logo.png`,
    companyColor: "#cc0000",
    period: "jan - jul 2024",
    type: "professional" as const,
    description:
      "ML pipelines for M&A deal screening across 20–75 datasets; k-means + hierarchical clustering cut manual review by 40%; arima + xgboost forecasting improved prioritization by 18%; NLP tagging pipeline.",
    tags: ["Python", "XGBoost", "NLP", "SQLAlchemy", "Pytest"],
  },
  {
    year: "2025–26",
    role: "graduate teaching assistant",
    company: "Northeastern University",
    logo: `${BASE}NEU.png`,
    companyColor: "#d41c2c",
    period: "sept 2025 - may 2026",
    type: "academic" as const,
    description:
      "TA for CS5800: algorithms - graded 300+ students, held weekly office hours on dynamic programming, graph algorithms, and asymptotic notation; proctored mid-term and final exams.",
    tags: ["Algorithms", "Teaching", "CS5800"],
  },
];

const Experience = () => (
  <section id="experience" className="py-24 px-6">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <SectionHeading label="where i've worked" title="experience" accent="purple" />
      </motion.div>

      {/* ── Desktop: horizontal timeline ── */}
      <div className="hidden md:block relative">
        <div className="absolute top-[72px] left-0 right-0 h-[2px] bg-gradient-to-r from-orange via-purple to-orange opacity-30" />

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
              <p className="font-sans text-sm font-bold text-center mb-3 lowercase" style={{ color: exp.companyColor }}>
                {exp.year}
              </p>

              {/* Timeline dot */}
              <div
                className="absolute top-[68px] left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-[3px] border-cream z-10"
                style={{ background: exp.companyColor }}
              />

              {/* Card */}
              <div
                className={`mt-16 bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 ${
                  exp.type === "academic"
                    ? "border-2 border-dashed border-purple/40"
                    : "border-2 border-orange/25"
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <img src={exp.logo} alt={exp.company} className="h-8 object-contain" referrerPolicy="no-referrer" />
                </div>
                <h3 className="font-display font-black text-base lowercase text-dark mb-0.5">
                  {exp.role}
                </h3>
                <p className="font-sans text-sm font-semibold mb-1" style={{ color: exp.companyColor }}>
                  {exp.company}
                </p>
                <p className="font-mono text-xs text-dark/40 mb-4">{exp.period}</p>
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
        <div className="absolute top-0 left-3.5 bottom-0 w-[2px] bg-gradient-to-b from-orange to-purple opacity-30" />

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
              <div
                className="absolute -left-[30px] top-5 w-4 h-4 rounded-full border-[3px] border-cream z-10"
                style={{ background: exp.companyColor }}
              />
              <p className="font-sans text-sm font-bold mb-1 lowercase" style={{ color: exp.companyColor }}>
                {exp.year}
              </p>
              <div
                className={`bg-white rounded-2xl p-5 shadow-sm ${
                  exp.type === "academic"
                    ? "border-2 border-dashed border-purple/40"
                    : "border-2 border-orange/25"
                }`}
              >
                <h3 className="font-display font-black text-sm lowercase text-dark mb-0.5">{exp.role}</h3>
                <p className="font-sans text-sm font-semibold mb-1" style={{ color: exp.companyColor }}>{exp.company}</p>
                <p className="font-mono text-xs text-dark/40 mb-3">{exp.period}</p>
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
    name: "Kambaz",
    category: "Full-Stack",
    accent: "orange" as const,
    href: "https://github.com/shashhwatiwari/kambaz-react-web-app",
    image: `${BASE}photos/projects/kambaz.png`,
    description:
      "Scalable learning management platform built with the mern stack - modules, quizzes, and grade tracking, optimized for concurrent user access at scale.",
    tags: ["MongoDB", "Express.js", "React", "Node.js"],
  },
  {
    name: "RegTranslate",
    category: "AI / RAG",
    accent: "purple" as const,
    href: "https://regtranslate.vercel.app/",
    image: `${BASE}photos/projects/regtranslate.png`,
    description:
      "rag-based compliance platform that converts hipaa/gdpr pdfs into actionable developer tasks using llama 3 + langchain. semantic search pipeline via chromadb.",
    tags: ["Llama 3", "LangChain", "ChromaDB", "FastAPI"],
  },
  {
    name: "Emotion Classifier",
    category: "nlp",
    accent: "orange" as const,
    href: "#",
    image: `${BASE}photos/projects/emotion.png`,
    description:
      "Fine-tuned bert on the goemotions dataset for multi-label emotion detection. delivers real-time music recommendations via whatsapp based on inferred user mood.",
    tags: ["BERT", "PyTorch", "WhatsApp API", "FastAPI"],
  },
  {
    name: "StaffSync",
    category: "Full-Stack",
    accent: "purple" as const,
    href: "https://github.com/shashhwatiwari/StaffSync",
    image: `${BASE}photos/projects/staffsync.png`,
    description:
      "workforce scheduling platform with shift management, real-time notifications, and role-based access control. built with react + node.js + postgresql.",
    tags: ["React", "Node.js", "PostgreSQL", "AWS"],
  },
  {
    name: "ConcenTrainer",
    category: "AI / HCI",
    accent: "orange" as const,
    href: "https://www.figma.com/proto/fbitb69DpEi3DYhJcIqblL/ConcenTrainer-Iteration?node-id=195-126&p=f&t=ci9GM4EQuiHe0Eg3-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=195%3A126",
    image: `${BASE}photos/projects/concentrainer.png`,
    description:
      "Focus enhancement app using pomodoro-style intervals with real-time engagement scoring - mediapipe-powered posture and attention analysis via webcam.",
    tags: ["MediaPipe", "Python", "React", "WebRTC"],
  },
];

const Projects = () => (
  <section id="projects" className="py-24 px-6 bg-paper">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-end justify-between mb-14"
      >
        <div>
          <p className="font-sans text-xs font-semibold tracking-widest uppercase text-orange mb-2">
            what i've built
          </p>
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
          more on github
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </motion.div>

      {/*
       * 6-col grid: first 3 cards each span 2 cols (3 per row).
       * 4th card: col-start-2 → cols 2–3 centered.
       * 5th card: auto-places at cols 4–5 → both centered in the last row.
       */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
        {projectsData.map((proj, i) => (
          <motion.div
            key={proj.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className={`relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow ${
              i < 3
                ? "md:col-span-2"
                : i === 3
                ? "md:col-start-2 md:col-span-2"
                : "md:col-span-2"
            }`}
          >
            {/* Project image - 180px, object-cover */}
            <div className="relative h-[180px] overflow-hidden bg-gray-100">
              <img
                src={proj.image}
                alt={proj.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Category pill overlay */}
              <div
                className={`absolute top-3 left-3 font-sans text-xs font-semibold px-3 py-1 rounded-full ${
                  proj.accent === "orange"
                    ? "bg-orange text-white"
                    : "bg-purple text-white"
                }`}
              >
                {proj.category}
              </div>
            </div>

            {/* Card content */}
            <div className="p-6">
              <h3 className="font-display font-black text-lg lowercase text-dark mb-2 leading-tight">
                {proj.name}
              </h3>
              <p className="font-sans text-sm text-dark/65 leading-relaxed mb-4">
                {proj.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {proj.tags.map((t) => (
                  <span
                    key={t}
                    className={`font-sans text-xs font-medium px-2.5 py-1 rounded-full ${
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
                  view project
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 text-center md:hidden">
        <a
          href="https://github.com/shashhwatiwari"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-sans text-sm font-medium text-dark/55 hover:text-orange transition-colors"
        >
          <Github className="w-4 h-4" />
          more on github →
        </a>
      </div>
    </div>
  </section>
);

// ─── GitHub Activity ───────────────────────────────────────────────────────────
// Heatmap

const GitHubActivity = () => (
  <section className="py-24 px-6">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <SectionHeading label="commit activity" title="on github" accent="orange" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-dark/5 overflow-hidden"
      >
        <img
          src="https://ghchart.rshah.org/shashhwatiwari"
          alt="GitHub contribution chart"
          className="w-full"
          style={{ filter: "hue-rotate(200deg) saturate(1.3)" }}
          loading="lazy"
        />
      </motion.div>
    </div>
  </section>
);

// ─── Skills ───────────────────────────────────────────────────────────────────

const skillCategories = [
  { name: "Languages",  accent: "orange" as const, skills: ["Python", "SQL", "TypeScript", "C / C++", "Rust"] },
  { name: "Backend",    accent: "purple" as const, skills: ["Node.js", "Express", "FastAPI", "REST APIs"] },
  { name: "Frontend",   accent: "orange" as const, skills: ["React", "Tailwind CSS", "HTML / CSS"] },
  { name: "AI / ML",   emoji: "🤖", accent: "purple" as const, skills: ["PyTorch", "LangChain", "BERT", "scikit-learn", "OpenCV"] },
  { name: "Cloud",     emoji: "☁️",  accent: "orange" as const, skills: ["AWS Lambda", "Bedrock", "S3"] },
  { name: "DevOps",    emoji: "🚀", accent: "purple" as const, skills: ["Docker", "GitHub Actions", "CI / CD"] },
  { name: "Databases", emoji: "🗄️", accent: "orange" as const, skills: ["PostgreSQL", "MongoDB", "ChromaDB", "BigQuery"] },
];

const Skills = () => (
  <section id="skills" className="py-24 px-6 bg-paper">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <SectionHeading label="my toolbox" title="technical core" accent="purple" />
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
            <p className={`font-sans text-sm font-semibold mb-3 ${cat.accent === "orange" ? "text-orange" : "text-purple"}`}>
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

// ─── Resume ───────────────────────────────────────────────────────────────────
/*
 * TODO: Add the following files to /public/
 *   resume-preview.png  - screenshot / exported thumbnail of your resume PDF
 *   resume.pdf          - the actual resume document
 */

const Resume = () => (
  <section id="resume" className="py-24 px-6">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <SectionHeading label="my resume" title="resume" accent="purple" />
      </motion.div>

      <div className="flex flex-col md:flex-row items-start gap-10">
        {/* Document thumbnail */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="shrink-0 w-44 rounded-xl overflow-hidden shadow-lg border border-dark/8"
        >
          <img
            src={`${BASE}resume-preview.png`}
            alt="Resume preview"
            className="w-full"
            loading="lazy"
          />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col justify-center gap-5"
        >
          <p className="font-sans text-lg text-dark/65 leading-relaxed max-w-[48ch]">
            one page. everything you need to know - experience, education, projects, and skills.
          </p>
          <a
            href={`${BASE}resume.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-purple text-white font-display font-bold lowercase px-7 py-3.5 rounded-xl hover:bg-purple/85 transition-colors w-fit text-base"
          >
            open full resume ↗
          </a>
        </motion.div>
      </div>
    </div>
  </section>
);

// ─── Contact ──────────────────────────────────────────────────────────────────

const Contact = () => (
  <section id="contact" className="py-28 px-6 bg-dark">
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-6xl mx-auto"
    >
      <div className="max-w-2xl">
        <p className="font-sans text-xs font-semibold tracking-widest uppercase text-purple-light mb-4">
          let's connect
        </p>
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
          if you're building something interesting or just want to connect - i'd always be interested.
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
          © 2025 - built with react & tailwind
        </p>
      </div>

      {/* Social icons - 32px with text labels */}
      <div className="flex items-center gap-8">
        {[
          {
            href: "https://github.com/shashhwatiwari",
            icon: <GitHubIcon size={32} />,
            label: "github",
          },
          {
            href: "https://www.linkedin.com/in/shashwat-tiwari118/",
            icon: <LinkedInIcon size={32} />,
            label: "linkedin",
          },
          {
            href: "https://leetcode.com/u/shashwat__/",
            icon: <LeetCodeIcon size={32} />,
            label: "leetcode",
          },
          {
            href: "mailto:tiwari.sha@northeastern.edu",
            icon: <Mail className="w-8 h-8" />,
            label: "email",
            noBlank: true,
          },
        ].map((l) => (
          <a
            key={l.label}
            href={l.href}
            target={l.noBlank ? undefined : "_blank"}
            rel={l.noBlank ? undefined : "noopener noreferrer"}
            className="flex flex-col items-center gap-1.5 text-dark/35 hover:text-orange transition-colors"
          >
            {l.icon}
            <span className="font-sans text-xs lowercase">{l.label}</span>
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
        <Snapshot />
        <Experience />
        <Projects />
        <GitHubActivity />
        <Skills />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
