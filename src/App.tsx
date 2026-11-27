/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Shashwat Tiwari - Portfolio
 * Editorial / cinematic aesthetic on a warm light base.
 * Fonts: Clash Display (display) + General Sans (body).
 */

import { motion, animate, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { useState, useEffect, useRef, Fragment, type MouseEvent as ReactMouseEvent } from "react";
import { Github, Mail, Link as LinkIcon } from "lucide-react";

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
          className="shrink-0 w-[280px] h-[200px] md:w-[340px] md:h-[240px] rounded-[24px] overflow-hidden ring-1 ring-white/60 shadow-[0_18px_40px_-18px_rgba(30,24,60,0.35)]"
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

// ─── Navbar ───────────────────────────────────────────────────────────────────

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [onDark, setOnDark] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      // Switch the nav to dark glass while it floats over the dark contact/footer area.
      const contact = document.getElementById("contact");
      setOnDark(!!contact && contact.getBoundingClientRect().top <= 44);
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
    <nav className={`fixed top-0 inset-x-0 z-50 px-4 pt-4 ${onDark ? "nav-dark" : ""}`}>
      <div className={`nav-pill max-w-6xl mx-auto pl-6 pr-3 h-14 flex items-center justify-between rounded-full glass transition-all duration-500 ${scrolled ? "glass-strong" : ""}`}>
        <a href="#" className="font-display font-semibold text-lg text-ink tracking-tight hover:text-accent transition-colors">
          Shashwat<span className="text-accent">.</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-active={active === l.href.slice(1) || undefined}
              className={`font-sans text-[13px] font-medium transition-colors ${
                active === l.href.slice(1) ? "text-accent" : "text-ink/55 hover:text-ink"
              }`}
            >
              {l.label}
            </a>
          ))}
          <span className="h-4 w-px bg-line" />
          {SOCIALS.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="text-ink/40 hover:text-accent transition-colors">
              <s.icon size={19} />
            </a>
          ))}
          <a
            href={`${BASE}resume.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover-line font-sans text-[13px] font-semibold px-4 py-2 rounded-full bg-ink text-white transition-colors"
          >
            Resume
          </a>
        </div>

        <button
          className="md:hidden w-8 h-8 mr-2 flex flex-col gap-1.5 justify-center items-end"
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
          className="md:hidden glass glass-strong rounded-[28px] mt-2 max-w-6xl mx-auto p-6 flex flex-col gap-4"
        >
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="font-sans text-base font-medium text-ink/80 hover:text-accent transition-colors">
              {l.label}
            </a>
          ))}
          <a href={`${BASE}resume.pdf`} target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)} className="font-sans text-base font-semibold text-accent">
            Resume
          </a>
          <div className="flex items-center gap-5 pt-1">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="text-ink/40 hover:text-accent transition-colors">
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

// ─── Animated hero name ───────────────────────────────────────────────────────
// The letters sweep in from the right while fading up out of a blur. Both i's
// in "Tiwari" start without their dots; two pink dots then drop in. One lands
// on the first i and hops across w, a and r to claim the last i, the other
// drops into the spot it left. Both do a final hop together, ripple, and cool
// from pink to ink.

const PINK = "#D83995";
const INK = "#0F1B24";

type DotGeo = { cx: number; cy: number; d: number };
type Box = { cx: number; left: number; right: number; top: number };
type Geo = { dots: [DotGeo, DotGeo]; last: Box[]; em: number };

const useDot = () => ({
  x: useMotionValue(0),
  y: useMotionValue(0),
  sx: useMotionValue(1),
  sy: useMotionValue(1),
  o: useMotionValue(0),
  c: useMotionValue(PINK),
  k: useMotionValue(1), // overall size
});
type Dot = ReturnType<typeof useDot>;

const FIRST = "Shashwat";
const LAST = ["T", "ı", "w", "a", "r", "ı"]; // dotless i (U+0131); dots are drawn separately

const HeroName = ({ start }: { start: boolean }) => {
  const reduce = useReducedMotion();
  const h1 = useRef<HTMLHeadingElement>(null);
  const letters = useRef<(HTMLSpanElement | null)[]>([]);
  const baseline = useRef<HTMLSpanElement>(null);
  const [geo, setGeo] = useState<Geo | null>(null);
  const a = useDot();
  const b = useDot();

  // Measure where each tittle belongs, using the font's real glyph metrics.
  useEffect(() => {
    const el = h1.current;
    if (!el) return;
    const measure = () => {
      const cs = getComputedStyle(el);
      const size = parseFloat(cs.fontSize);
      const ctx = document.createElement("canvas").getContext("2d");
      if (!ctx || !baseline.current) return;
      ctx.font = `${cs.fontWeight} ${size}px ${cs.fontFamily}`;
      const m = (ch: string) => ctx.measureText(ch);
      const iAsc = m("i").actualBoundingBoxAscent;
      const stem = m("ı");
      const xh = stem.actualBoundingBoxAscent;
      const stemW = stem.actualBoundingBoxLeft + stem.actualBoundingBoxRight;
      // Tittle: a touch wider than the stem, sitting with its top at the i's ascent.
      const d = Math.min(stemW * 1.12, (iAsc - xh) * 0.8);
      const base = baseline.current.offsetTop;
      const center = (i: number) => {
        const s = letters.current[i];
        return s ? s.offsetLeft + s.offsetWidth / 2 : 0;
      };
      // Centre over the i's ink, not its box: the box includes side bearings
      // and the tight negative letter-spacing, which pull it off-centre.
      // Positions are summed from glyph advances (each letter is its own box,
      // so there is no kerning between them) to stay sub-pixel exact;
      // offsetLeft rounds to whole pixels.
      const off = FIRST.length;
      const iM = m("i");
      const ls = parseFloat(cs.letterSpacing) || 0;
      const lineStart = letters.current[off]?.offsetLeft ?? 0;
      const inkCenter = (i: number) => {
        let x = lineStart;
        for (let j = 0; j < i - off; j++) x += m(LAST[j]).width + ls;
        return x + (iM.actualBoundingBoxRight - iM.actualBoundingBoxLeft) / 2;
      };
      const dotY = base - iAsc + d / 2;
      // Letter indexes in LAST: 1 = first ı, 2-4 = w a r, 5 = last ı
      setGeo({
        em: size,
        dots: [
          { cx: inkCenter(off + 1), cy: dotY, d },
          { cx: inkCenter(off + 5), cy: dotY, d },
        ],
        last: LAST.map((ch, k) => {
          const sp = letters.current[off + k];
          const left = sp ? sp.offsetLeft : 0;
          const w = sp ? sp.offsetWidth : 0;
          return { cx: left + w / 2, left, right: left + w, top: base - m(ch === "ı" ? "ı" : ch).actualBoundingBoxAscent };
        }),
      });
    };
    measure();
    document.fonts?.ready.then(measure);
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const ready = !!geo;
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    if (!geo || played) return;
    if (reduce) {
      [a, b].forEach((dot) => { dot.o.set(1); dot.c.set(INK); });
      setPlayed(true);
      return;
    }
    if (!start) return;
    setPlayed(true);

    let dead = false;
    const running: { stop: () => void }[] = [];
    const go = <T,>(p: T) => { running.push(p as unknown as { stop: () => void }); return p; };
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const em = geo.em;
    const [g1, g2] = geo.dots;

    // Offsets are relative to each dot's resting place.
    const squash = (dot: Dot, k: number, dur = 0.32) =>
      Promise.all([
        go(animate(dot.sx, [1, 1 + 0.45 * k, 1 - 0.12 * k, 1], { duration: dur, ease: "easeOut" })),
        go(animate(dot.sy, [1, 1 - 0.45 * k, 1 + 0.14 * k, 1], { duration: dur, ease: "easeOut" })),
      ]);
    const hop = (dot: Dot, toX: number, toY: number, dur: number, lift: number) => {
      const fromY = dot.y.get();
      const apex = Math.min(fromY, toY) - lift;
      return Promise.all([
        go(animate(dot.x, toX, { duration: dur, ease: "linear" })),
        go(animate(dot.y, [fromY, apex, toY], { duration: dur, times: [0, 0.5, 1], ease: ["easeOut", "easeIn"] })),
        // stretch along the direction of travel mid-air
        go(animate(dot.sy, [1, 1.18, 1.18, 0.95], { duration: dur, times: [0, 0.25, 0.75, 1] })),
        go(animate(dot.sx, [1, 0.88, 0.88, 1.05], { duration: dur, times: [0, 0.25, 0.75, 1] })),
      ]);
    };
    const drop = (dot: Dot, dur: number) =>
      Promise.all([
        go(animate(dot.o, 1, { duration: dur * 0.4 })),
        go(animate(dot.y, 0, { duration: dur, ease: [0.55, 0, 1, 0.45] })),
        go(animate(dot.sy, [1, 1.3, 1.3], { duration: dur })),
        go(animate(dot.sx, [1, 0.85, 0.85], { duration: dur })),
      ]);
    // Landing on an i: one firm squash and settle, no extra hops.
    const settle = (dot: Dot) => squash(dot, 0.9, 0.38);

    // Helpers in absolute h1 coordinates: where should this dot's centre be?
    const L = geo.last; // 0 T, 1 ı, 2 w, 3 a, 4 r, 5 ı
    const rest = (dot: Dot) => (dot === a ? g1 : g2);
    const at = (dot: Dot, X: number, Y: number) => ({ x: X - rest(dot).cx, y: Y - rest(dot).cy });
    const onTop = (k: number) => L[k].top - g1.d / 2; // centre Y when sitting on a letter
    const place = (dot: Dot, X: number, Y: number) => { const o = at(dot, X, Y); dot.x.set(o.x); dot.y.set(o.y); };
    const hopTo = (dot: Dot, X: number, Y: number, dur: number, lift: number) => {
      const o = at(dot, X, Y);
      return hop(dot, o.x, o.y, dur, lift);
    };
    const dropTo = (dot: Dot, dur: number) =>
      Promise.all([
        go(animate(dot.o, 1, { duration: dur * 0.4 })),
        go(animate(dot.y, dot.y.get() + 2.3 * em, { duration: dur, ease: [0.55, 0, 1, 0.45] })),
        go(animate(dot.sy, [1, 1.3, 1.3], { duration: dur })),
        go(animate(dot.sx, [1, 0.85, 0.85], { duration: dur })),
      ]);

    // ── Choreography 1: the traveller ──────────────────────────────────────
    // b lands on the first i, hops w → r and leaps onto the last i; a drops
    // into the spot b left.
    const traveller = async () => {
      place(b, g1.cx, g1.cy - 2.2 * em);
      place(a, g1.cx, g1.cy - 2.4 * em);
      await drop(b, 0.55);
      if (dead) return;
      await squash(b, 1);
      const aDone = (async () => {
        await wait(260);
        if (dead) return;
        await drop(a, 0.6);
        if (dead) return;
        await settle(a);
      })();
      for (const k of [2, 4]) {
        if (dead) return;
        await hopTo(b, L[k].cx, onTop(k), 0.36, 0.42 * em);
        await squash(b, 0.6, 0.2);
      }
      if (dead) return;
      await hop(b, 0, 0, 0.5, 0.75 * em);
      await settle(b);
      await aDone;
    };

    // ── Choreography 2: the collision ──────────────────────────────────────
    // Two small dots land close together: one just right of the w's middle
    // peak, one on the r's top-left corner. They spring at each other, collide
    // mid-air over the a, and ricochet onto their i's, growing to full size.
    const collision = async () => {
      const d = g1.d;
      const SMALL = 0.62;
      a.k.set(SMALL);
      b.k.set(SMALL);
      const xa = L[2].cx + d * 0.35;
      const xb = L[4].left + d * 0.35;
      place(a, xa, onTop(2) - 2.3 * em);
      place(b, xb, onTop(4) - 2.3 * em);
      const land = async (dot: Dot, delay: number) => {
        await wait(delay);
        if (dead) return;
        await dropTo(dot, 0.55);
        if (dead) return;
        await squash(dot, 0.9, 0.3);
      };
      await Promise.all([land(a, 0), land(b, 160)]);
      if (dead) return;
      await wait(160);

      // crouch, then leap at each other; they grow as they fly
      await Promise.all([squash(a, 0.8, 0.22), squash(b, 0.8, 0.22)]);
      const HIT = 0.82;
      const gap = (d * HIT) / 2; // centres touch when they are one diameter apart
      const mid = (xa + xb) / 2;
      const hitY = Math.min(onTop(2), onTop(4)) - 0.42 * em;
      const fly = (dot: Dot, X: number) => {
        const o = at(dot, X, hitY);
        return Promise.all([
          go(animate(dot.x, o.x, { duration: 0.26, ease: "linear" })),
          go(animate(dot.y, o.y, { duration: 0.26, ease: [0.2, 0.7, 0.4, 1] })), // decelerates toward the apex
          go(animate(dot.k, HIT, { duration: 0.26, ease: "easeOut" })),
          go(animate(dot.sx, [1, 0.9, 1.08], { duration: 0.26 })),
          go(animate(dot.sy, [1, 1.12, 0.94], { duration: 0.26 })),
        ]);
      };
      await Promise.all([fly(a, mid - gap), fly(b, mid + gap)]);
      if (dead) return;

      // impact: flatten against each other, then spring back
      await Promise.all(
        [a, b].map((dot) =>
          Promise.all([
            go(animate(dot.sx, [1.08, 0.62, 1.12, 1], { duration: 0.24, times: [0, 0.3, 0.7, 1] })),
            go(animate(dot.sy, [0.94, 1.32, 0.92, 1], { duration: 0.24, times: [0, 0.3, 0.7, 1] })),
          ]),
        ),
      );
      if (dead) return;

      // ricochet home, reaching full size on the way
      const home = async (dot: Dot, dur: number, lift: number) => {
        await Promise.all([hop(dot, 0, 0, dur, lift), go(animate(dot.k, 1, { duration: dur, ease: "easeOut" }))]);
        await settle(dot);
      };
      await Promise.all([home(a, 0.5, 0.3 * em), home(b, 0.55, 0.35 * em)]);
    };

    // ── Choreography 3: the relay ──────────────────────────────────────────
    // Following the letters' right-to-left entrance, both dots come in from
    // the right. b hops straight onto the last i; a keeps going over r and w
    // to reach the first i.
    const relay = async () => {
      const startX = L[5].right + 0.9 * em;
      const floor = onTop(4);
      place(a, startX, floor - 2.3 * em);
      place(b, startX, floor - 2.3 * em);
      const run1 = async () => {
        await dropTo(a, 0.5);
        if (dead) return;
        await squash(a, 1, 0.26);
        for (const k of [4, 2]) {
          if (dead) return;
          await hopTo(a, L[k].cx, onTop(k), 0.36, 0.45 * em);
          await squash(a, 0.6, 0.2);
        }
        if (dead) return;
        await hop(a, 0, 0, 0.45, 0.6 * em);
        await settle(a);
      };
      const run2 = async () => {
        await wait(520);
        if (dead) return;
        await dropTo(b, 0.5);
        if (dead) return;
        await squash(b, 1, 0.26);
        await hop(b, 0, 0, 0.5, 0.7 * em);
        await settle(b);
      };
      await Promise.all([run1(), run2()]);
    };

    // Rotate through the routines on each visit, starting somewhere random.
    const routines = [traveller, collision, relay];
    let pick = Math.floor(Math.random() * routines.length);
    try {
      const prev = localStorage.getItem("name-dots");
      if (prev !== null) pick = (Number(prev) + 1) % routines.length;
      localStorage.setItem("name-dots", String(pick));
    } catch { /* storage blocked: random is fine */ }
    // ?dots=1|2|3 forces one routine, handy for reviewing them one at a time
    const forced = Number(new URLSearchParams(location.search).get("dots"));
    if (forced >= 1 && forced <= routines.length) pick = forced - 1;

    const run = async () => {
      await routines[pick]();
      if (dead) return;

      // a short beat in place, then cool from pink to ink
      await wait(220);
      if (dead) return;
      [a, b].forEach((dot) => go(animate(dot.c, INK, { duration: 0.9, ease: "easeInOut" })));
    };

    // let the letters land first
    const t = setTimeout(run, 1150);
    return () => {
      dead = true;
      clearTimeout(t);
      running.forEach((r) => r.stop?.());
      [a, b].forEach((dot) => {
        dot.x.set(0); dot.y.set(0); dot.sx.set(1); dot.sy.set(1); dot.o.set(1); dot.c.set(INK); dot.k.set(1);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geo !== null, start, reduce]);

  const letter = (ch: string, i: number, delay: number) => (
    <motion.span
      key={i}
      ref={(n) => { letters.current[i] = n; }}
      className="inline-block"
      initial={reduce ? false : { opacity: 0, x: "0.55em", filter: "blur(12px)" }}
      animate={start || reduce ? { opacity: 1, x: 0, filter: "blur(0px)" } : undefined}
      transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {ch}
    </motion.span>
  );

  return (
    <h1
      ref={h1}
      aria-label="Shashwat Tiwari"
      className="relative font-display font-semibold text-ink leading-[0.86] tracking-tightest"
      style={{ fontSize: "clamp(3.6rem, 9.5vw, 8.5rem)" }}
    >
      <span aria-hidden className="whitespace-nowrap">
        {FIRST.split("").map((ch, i) => letter(ch, i, i * 0.05))}
      </span>
      <br />
      <span aria-hidden className="whitespace-nowrap">
        {LAST.map((ch, k) => letter(ch, FIRST.length + k, 0.28 + k * 0.06))}
        <span ref={baseline} className="inline-block w-0 h-0" />
      </span>
      {ready &&
        [a, b].map((dot, i) => {
          const g = geo!.dots[i];
          return (
            <span key={i} aria-hidden className="absolute pointer-events-none" style={{ left: g.cx - g.d / 2, top: g.cy - g.d / 2, width: g.d, height: g.d }}>
              <motion.span
                className="absolute inset-0 rounded-full"
                style={{ x: dot.x, y: dot.y, scale: dot.k, scaleX: dot.sx, scaleY: dot.sy, opacity: dot.o, backgroundColor: dot.c, originY: 1 }}
              />
            </span>
          );
        })}
    </h1>
  );
};

const Hero = ({ start }: { start: boolean }) => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden px-6 pt-28 pb-16">
      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr] gap-12 md:gap-16 items-center">

          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Name */}
            <HeroName start={start} />

            {/* Intro */}
            <p className="mt-7 font-sans text-lg text-ink/70 leading-relaxed max-w-lg">
              I'm a Data Analyst at 1Password in Boston and an MS Computer Science graduate from{" "}
              <a href="#experience" className="text-ink font-semibold underline decoration-accent/50 decoration-2 underline-offset-4 hover:decoration-accent">Northeastern</a>.
              I work across analytics, experimentation, ML and full-stack systems, and before that I was
              an analyst at Bain &amp; Company. I'm open to full-time roles.
            </p>
          </motion.div>

          {/* Right: photo */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center md:justify-end"
          >
            {/* Photo in a frosted glass frame */}
            <div className="relative glass rounded-[32px] p-2.5">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative w-64 md:w-80 rounded-[24px] overflow-hidden bg-brand"
              >
                <img src={`${BASE}profile.jpg`} alt="Shashwat Tiwari" className="w-full aspect-[4/5] object-cover" />
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
  { title: "Languages",       items: ["Python", "TypeScript", "SQL", "C / C++", "Rust", "Java", "Swift"] },
  { title: "Frontend",        items: ["React", "Next.js", "Tailwind CSS", "HTML / CSS"] },
  { title: "Backend & APIs",  items: ["Node.js", "Express", "FastAPI", "Django / DRF", "REST", "SQLAlchemy"] },
  { title: "AI / ML",         items: ["PyTorch", "LangChain", "LangGraph", "MCP", "BERT", "scikit-learn", "OpenCV", "XGBoost"] },
  { title: "Cloud & DevOps",  items: ["AWS (Lambda, Bedrock, S3, ECS Fargate)", "Docker", "GitHub Actions", "CI / CD", "Git", "Vercel"] },
  { title: "Analytics & BI",  items: ["Hex", "Tableau", "Looker", "Looker Studio", "Salesforce (data)", "A/B testing", "Excel"] },
  { title: "Databases",       items: ["PostgreSQL", "MySQL", "MongoDB", "ChromaDB", "Redis", "Snowflake", "BigQuery", "Athena"] },
];

const hobbies = ["Soccer (Barça fan)", "Live music", "Photography", "Food hunting", "City exploring"];

const AboutMe = () => (
  <section id="about" className="py-28 md:py-36 px-6">
    <div className="max-w-6xl mx-auto">
      <div className="mb-16 md:mb-20">
        <h2 className="font-display font-semibold text-ink leading-[0.98] tracking-tightest" style={{ fontSize: "clamp(2.1rem, 6.5vw, 5rem)" }}>
          I build things that work,<br />
          <span className="text-ink/35">and I care why they do.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-14 lg:gap-20 items-start">
        {/* Bio */}
        <div className="space-y-6 font-sans text-lg text-ink/75 leading-relaxed max-w-[54ch]">
          <p>
            I'm a Data Analyst at <span className="text-ink font-semibold">1Password</span> and an MS Computer
            Science graduate from Northeastern (GPA 4.0). I work where data, experimentation and
            software engineering meet: tracing attribution gaps to their root cause, reading out
            A/B tests, and building the dashboards teams actually use. Before that I built deal-screening
            pipelines at <span className="text-ink font-semibold">Bain &amp; Company</span>.
          </p>
          <p>
            At Northeastern I TA'd CS5800 (Algorithms) for 300+ students, and I keep
            shipping projects I'm genuinely proud of, from RAG compliance tooling and
            multi-agent research assistants to a live iOS transit app.
          </p>
          <p>
            Beyond the keyboard I'm a die-hard Barça fan, a live-music chaser, and someone who
            will travel across a city for a good burger.
          </p>

          {/* Education */}
          <div className="pt-4 flex flex-col gap-3">
            {[
              { logo: `${BASE}NEU.png`, name: "Northeastern University", degree: "MS Computer Science, GPA 4.0", period: "2024 – 2026", color: "#d41c2c" },
              { logo: `${BASE}sn-logo.png`, name: "Shiv Nadar University", degree: "BS Computer Science, GPA 3.8", period: "2020 – 2024", color: "#1270b7" },
            ].map((edu) => (
              <div key={edu.name} className="flex items-center gap-4 p-4 glass rounded-[20px] lift">
                <img src={edu.logo} alt={edu.name} className="w-11 h-11 object-contain shrink-0" referrerPolicy="no-referrer" />
                <div>
                  <p className="font-display font-semibold text-[15px] text-ink leading-tight">{edu.name}</p>
                  <p className="font-sans text-[13px] mt-0.5 font-medium" style={{ color: edu.color }}>{edu.degree}</p>
                  <p className="font-sans text-xs text-ink/45 mt-0.5">{edu.period}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tool lists */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {toolGroups.map((g) => (
            <div key={g.title} className="glass rounded-[20px] p-5 lift">
              <p className="font-display font-semibold text-ink text-base mb-2">{g.title}</p>
              <p className="font-sans text-sm text-ink/55 leading-relaxed">
                {g.items.join(", ")}.
              </p>
            </div>
          ))}
          <div className="sm:col-span-2 glass rounded-[20px] p-5 lift">
            <p className="font-display font-semibold text-ink text-base mb-2">Beyond work</p>
            <p className="font-sans text-sm text-ink/55 leading-relaxed">
              {hobbies.join(", ")}.
            </p>
          </div>
        </div>
      </div>

      {/* Photo slideshow */}
      <div className="mt-24">
        <PhotoMarquee />
        <p className="mt-6 text-center font-sans text-sm text-ink/50">
          a few frames from life outside the code :)
        </p>
      </div>
    </div>
  </section>
);

// ─── Experience ───────────────────────────────────────────────────────────────

const experienceData = [
  {
    year: "2026–",
    role: "Data Analyst",
    company: "1Password",
    logo: `${BASE}1password-logo.png`,
    companyColor: "#0572EC",
    period: "Sept 2026 – Present",
    type: "professional" as const,
    description:
      "Marketing analytics and experimentation. Found why paid ad touches were losing their campaign IDs and designed the fix; once shipped with data engineering, the share of quarterly MQLs tied to a paid campaign nearly doubled (15% → 27%). Showed a reported 28% A/B test lift was a page-routing artefact by checking archived page code, then confirmed with a non-inferiority readout that the redesign did no harm before it shipped. Replaced a manual QBR spreadsheet with an automated Hex dashboard, and back-tested a sample-size planner on 12 past experiments.",
    tags: ["SQL", "Python", "Snowflake", "Hex", "Athena", "A/B Testing"],
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
  {
    year: "2024",
    role: "Analyst Co-op",
    company: "Bain & Company",
    logo: `${BASE}bain-logo.png`,
    companyColor: "#cc0000",
    period: "Jan – Jul 2024",
    type: "professional" as const,
    description:
      "Migrated Excel-based recordkeeping to MySQL, cutting load times from about two minutes to a few seconds. Built SQL and Python pipelines for M&A and private-equity deal screening over 1,000+ companies, holding above 95% accuracy and cutting manual review 40%. Automated document classification with TF-IDF and spaCy (60% less manual labelling) and maintained Tableau dashboards for case teams.",
    tags: ["Python", "SQL", "MySQL", "spaCy", "Tableau"],
  },
];

const Experience = () => {
  // Oldest on the left, newest on the right.
  const items = [...experienceData].reverse();
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="experience" className="py-28 md:py-36 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14 md:mb-20">
          <h2 className="font-display font-semibold text-ink leading-[0.98] tracking-tightest" style={{ fontSize: "clamp(2.6rem, 9vw, 7rem)" }}>
            Experience
          </h2>
          <p className="mt-5 font-sans text-lg text-ink/60 max-w-xl leading-relaxed">
            <span className="text-ink font-semibold">1+ year</span> of industry experience across analytics, experimentation and engineering.
          </p>
        </div>

        <div className="glass rounded-[28px] p-7 md:p-10">
        <ol
          className="relative flex flex-col md:flex-row"
          onMouseLeave={() => setActive(null)}
        >
          {/* Timeline axis: vertical on mobile, horizontal from md up */}
          <span aria-hidden className="absolute bg-line left-[7px] top-2 bottom-2 w-px md:left-0 md:right-0 md:top-[7px] md:bottom-auto md:w-auto md:h-px" />

          {items.map((exp, i) => {
            const isActive = active === i;
            const dimmed = active !== null && !isActive;
            return (
              <li
                key={exp.year}
                className="relative pl-9 pb-10 md:pl-0 md:pb-0 md:pt-10 md:pr-8 last:pb-0 md:last:pr-0 transition-[flex-grow,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ flexGrow: isActive ? 2.6 : 1, flexBasis: 0, opacity: dimmed ? 0.45 : 1 }}
                onMouseEnter={() => setActive(i)}
              >
                {/* Node */}
                <span
                  aria-hidden
                  className={`absolute left-0 top-1 md:top-0 w-[15px] h-[15px] rounded-full border-2 transition-all duration-300 ${
                    isActive ? "bg-accent border-accent scale-125" : "bg-white border-ink/30"
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-expanded={isActive}
                  className="text-left w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded-md"
                >
                  <span className="block font-mono text-xs font-medium" style={{ color: exp.companyColor }}>
                    {exp.period}
                  </span>
                  <span
                    className={`block mt-2 font-display font-semibold leading-tight transition-all duration-300 ${
                      isActive ? "text-2xl md:text-3xl text-ink" : "text-lg text-ink/80"
                    }`}
                  >
                    {exp.role}
                  </span>
                  <span className="flex items-center gap-2 mt-1 font-sans text-sm font-semibold" style={{ color: exp.companyColor }}>
                    {exp.logo && (
                      <img src={exp.logo} alt="" className="w-5 h-5 object-contain shrink-0" referrerPolicy="no-referrer" />
                    )}
                    {exp.company}
                  </span>
                </button>

                {/* Details: collapsed to zero height unless active */}
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pt-4 font-sans text-[15px] text-ink/65 leading-relaxed max-w-[60ch]">
                      {exp.description}
                    </p>
                    <p className="mt-4 font-sans text-[11px] font-semibold tracking-[0.12em] uppercase text-ink/45">
                      {exp.tags.join(", ")}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        </div>
      </div>
    </section>
  );
};

// ─── Projects ─────────────────────────────────────────────────────────────────

const DOMAINS = [
  { id: "ai", label: "AI & LLMs" },
  { id: "ml", label: "Machine Learning" },
  { id: "web", label: "Full-Stack" },
  { id: "ios", label: "iOS" },
] as const;
type DomainId = (typeof DOMAINS)[number]["id"];

const projectsData = [
  {
    name: "RegTranslate",
    domains: ["ai","web"] as DomainId[],
    category: "AI / RAG",
    href: "https://regtranslate.vercel.app/",
    repo: "https://github.com/shashhwatiwari/regtranslate",
    image: `${BASE}photos/projects/regtranslate.png`,
    description:
      "A RAG-based compliance platform that converts HIPAA/GDPR PDFs into actionable developer tasks using Llama 3 + LangChain, with a semantic search pipeline powered by ChromaDB and tamper-evident audit logging.",
    tags: ["Llama 3", "LangChain", "ChromaDB", "FastAPI", "React"],
  },
  {
    name: "iSearch4u",
    domains: ["ai"] as DomainId[],
    category: "AI / Agents",
    href: "",
    repo: "https://github.com/shashhwatiwari/iSearch4u",
    image: "",
    description:
      "A local multi-agent research assistant. Documents are chunked and embedded into ChromaDB, and a four-node LangGraph pipeline (planner, retriever, synthesizer, critic) answers questions only from retrieved context, looping back when the answer falls short. Exposed as an MCP tool callable from Claude Desktop.",
    tags: ["LangGraph", "Gemini API", "ChromaDB", "MCP", "Python"],
  },
  {
    name: "Commute Assistant",
    domains: ["ios"] as DomainId[],
    category: "iOS",
    href: "",
    repo: "https://github.com/shashhwatiwari/MBTAonGo",
    image: "",
    description:
      "A native iOS transit assistant for Boston MBTA commuters. Merges MBTA and GTFS-RT feeds into disruption alerts, departure predictions and 'leave by' times, with route reliability scoring, Live Activities, Dynamic Island and widgets.",
    tags: ["SwiftUI", "MVVM", "ActivityKit", "WidgetKit", "GTFS-RT"],
  },
  {
    name: "World Cup Forecaster",
    domains: ["ml"] as DomainId[],
    category: "Sports Analytics",
    href: "",
    repo: "",
    image: "",
    description:
      "An end-to-end football forecasting platform: Random Forest, XGBoost and Elo ratings over 20+ years of international matches and 60+ engineered features, with a Monte Carlo engine running 10,000+ tournament simulations and SHAP-based explanations.",
    tags: ["XGBoost", "Random Forest", "Monte Carlo", "SHAP", "Python"],
  },
  {
    name: "Emotion Classifier",
    domains: ["ml"] as DomainId[],
    category: "NLP",
    href: "",
    repo: "https://github.com/shashhwatiwari/MultiLabel-Emotion-Classification",
    image: `${BASE}photos/projects/emotion.png`,
    description:
      "Fine-tuned BERT on the GoEmotions dataset for multi-label emotion detection, delivering instant music recommendations over WhatsApp based on inferred user mood.",
    tags: ["BERT", "GoEmotions", "WhatsApp API", "FastAPI"],
  },
  {
    name: "StaffSync",
    domains: ["web"] as DomainId[],
    category: "Full-Stack",
    href: "",
    repo: "https://github.com/shashhwatiwari/StaffSync",
    image: `${BASE}photos/projects/staffsync.png`,
    description:
      "An employee management system with role-scoped Admin, HR and Employee views. A 10-table MySQL schema with 33 stored procedures and 13 triggers that write every change to an audit log, served by a Django backend and containerized with Docker.",
    tags: ["Django", "MySQL", "JavaScript", "Docker"],
  },
  {
    name: "Kambaz",
    domains: ["web"] as DomainId[],
    category: "Full-Stack",
    href: "",
    repo: "https://github.com/shashhwatiwari/kambaz-react-web-app",
    image: `${BASE}photos/projects/kambaz.png`,
    description:
      "A learning-management platform built on the MERN stack, with courses, modules, quizzes and grade tracking.",
    tags: ["MongoDB", "React", "Redux", "Node.js", "TypeScript"],
  },
  {
    name: "ConcenTrainer",
    domains: ["ml"] as DomainId[],
    category: "AI / CV",
    href: "",
    repo: "https://github.com/shashhwatiwari",
    image: `${BASE}photos/projects/concentrainer.png`,
    description:
      "A focus-enhancement overlay that lets you set up your reading environment exactly how you like it, using live pose and gaze tracking.",
    tags: ["MediaPipe", "Python", "React", "WebRTC"],
  },
];

// Cinematic carousel: a strip that never stops sliding, clipped into a curved
// "cinema screen" shape. The ends are tall; the top edge dips (U) and the bottom
// edge rises (∩) toward the centre, so the middle is the narrowest point.
// Curve geometry shared by the clip path and the hover stroke. The top edge is
// y = DIP·H·4u(1-u) and the bottom edge mirrors it, where u = x / width.
const CURVE_DIP = 0.13;

type TileHover = { key: number; left: number; right: number; w: number; h: number; on: boolean };

// The hover stroke for a tile: one line traced along the curved top edge
// (left to right) and one up the right edge (bottom to top), meeting at the
// top-right corner. It is drawn outside the clip so the curve can't hide it.
const TileStroke = ({ t }: { t: TileHover }) => {
  const yTop = (x: number) => CURVE_DIP * t.h * 4 * (x / t.w) * (1 - x / t.w) + 1;
  const pts = Array.from({ length: 24 }, (_, i) => {
    const x = t.left + ((t.right - t.left) * i) / 23;
    return `${x.toFixed(1)},${yTop(x).toFixed(1)}`;
  });
  const rx = t.right - 1;
  return (
    <svg
      className="tile-stroke absolute inset-0 pointer-events-none z-10"
      width={t.w}
      height={t.h}
      style={{ opacity: t.on ? 1 : 0 }}
      aria-hidden
    >
      <polyline points={pts.join(" ")} pathLength={1} />
      <line x1={rx} y1={t.h - yTop(rx) + 2} x2={rx} y2={yTop(rx) - 1} pathLength={1} />
    </svg>
  );
};

// Cinematic carousel: a strip that never stops sliding, clipped into a curved
// "cinema screen" shape. The ends are tall; the top edge dips (U) and the bottom
// edge rises (∩) toward the centre, so the middle is the narrowest point.
const ProjectCarousel = ({ onPick }: { onPick: (name: string) => void }) => {
  const frame = useRef<HTMLDivElement>(null);
  const tile = useRef<HTMLButtonElement | null>(null);
  const raf = useRef(0);
  const [hover, setHover] = useState<TileHover | null>(null);

  // Where the given tile sits inside the carousel frame right now.
  const measure = (el: HTMLElement) => {
    const box = frame.current!.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    return {
      left: Math.max(0, r.left - box.left),
      right: Math.min(box.width, r.right - box.left),
      w: box.width,
      h: box.height,
    };
  };

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const enter = (e: ReactMouseEvent<HTMLButtonElement>) => {
    if (!frame.current) return;
    cancelAnimationFrame(raf.current);
    tile.current = e.currentTarget;
    const pos = measure(e.currentTarget);
    setHover((prev) => ({ key: (prev?.key ?? 0) + 1, ...pos, on: true }));
  };

  // On leave the carousel starts sliding again, so the fading stroke rides
  // along with its tile until the fade has finished.
  const leave = () => {
    setHover((prev) => (prev ? { ...prev, on: false } : prev));
    const el = tile.current;
    if (!el || !frame.current) return;
    const until = performance.now() + 1050;
    const follow = () => {
      if (!frame.current) return;
      const pos = measure(el);
      setHover((prev) => (prev && !prev.on ? { ...prev, ...pos } : prev));
      if (performance.now() < until) raf.current = requestAnimationFrame(follow);
    };
    raf.current = requestAnimationFrame(follow);
  };

  return (
    <div className="relative" ref={frame}>
      <svg width="0" height="0" className="absolute" aria-hidden>
        <defs>
          <clipPath id="cinema-curve" clipPathUnits="objectBoundingBox">
            <path d="M0,0 Q0.5,0.26 1,0 L1,1 Q0.5,0.74 0,1 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="overflow-hidden" style={{ clipPath: "url(#cinema-curve)" }}>
        <div className="marquee-track marquee-track--slow">
          {[...projectsData, ...projectsData].map((proj, i) => (
            <div key={`${proj.name}-${i}`} className="shrink-0 pr-4 md:pr-5" aria-hidden={i >= projectsData.length}>
              <button
                type="button"
                tabIndex={i >= projectsData.length ? -1 : 0}
                onClick={() => onPick(proj.name)}
                onMouseEnter={enter}
                onMouseLeave={leave}
                className="group relative flex flex-col items-center justify-center gap-2 w-[200px] h-[220px] md:w-[280px] md:h-[300px] px-6 bg-dark text-center transition-colors hover:bg-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.14em] text-accent-light">{proj.category}</span>
                <span className="font-display font-semibold text-2xl md:text-3xl text-cream tracking-tight leading-tight transition-colors group-hover:text-accent">
                  {proj.name}
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {hover && <Fragment key={hover.key}><TileStroke t={hover} /></Fragment>}
    </div>
  );
};

const ProjectRow = ({ proj, flip }: { proj: (typeof projectsData)[number]; flip: boolean }) => (
  <div
    id={`project-${proj.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
    className="scroll-mt-28 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center p-6 md:p-10 glass rounded-[28px] lift"
  >
    <div className={flip ? "md:order-2" : ""}>
      <h3 className="font-display font-semibold text-3xl md:text-4xl text-ink leading-tight mb-4">{proj.name}</h3>
      <p className="font-sans text-[15px] text-ink/65 leading-relaxed mb-6 max-w-md">{proj.description}</p>
      <p className="font-sans text-sm text-ink/45">
        {proj.category}. Built with {proj.tags.join(", ")}.
      </p>
      {(proj.repo || proj.href) && (
        <div className="flex items-center gap-6 mt-6">
          {proj.href && (
            <a href={proj.href} target="_blank" rel="noopener noreferrer" className="hover-line inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ink text-white font-sans text-sm font-semibold transition-colors">
              <LinkIcon className="w-4 h-4" /> Live site
            </a>
          )}
          {proj.repo && (
            <a href={proj.repo} target="_blank" rel="noopener noreferrer" className="hover-line inline-flex items-center gap-2 px-4 py-2 rounded-full glass font-sans text-sm font-semibold text-ink/80 hover:text-accent transition-colors">
              <GitHubIcon size={16} /> Source code
            </a>
          )}
        </div>
      )}
    </div>

    <div className={flip ? "md:order-1" : ""}>
      {proj.image ? (
        <img
          src={proj.image}
          alt={proj.name}
          className="w-full aspect-[16/10] object-cover object-top rounded-[20px] ring-1 ring-black/5 bg-dark"
          loading="lazy"
        />
      ) : (
        <div className="w-full aspect-[16/10] rounded-[20px] bg-gradient-to-br from-dark via-[#0b3a52] to-[#4a1840] flex items-center justify-center">
          <span className="font-display font-semibold text-3xl md:text-4xl text-cream tracking-tight">{proj.name}</span>
        </div>
      )}
    </div>
  </div>
);

const Projects = () => {
  const [tab, setTab] = useState<DomainId>(DOMAINS[0].id);
  const visible = projectsData.filter((p) => p.domains.includes(tab));

  // Clicking a carousel card opens that project's domain tab and scrolls to it.
  const pick = (name: string) => {
    const proj = projectsData.find((p) => p.name === name);
    if (!proj) return;
    if (!proj.domains.includes(tab)) setTab(proj.domains[0]);
    const id = `project-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
    requestAnimationFrame(() =>
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })),
    );
  };

  return (
    <section id="projects" className="py-28 md:py-36">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-14 md:mb-16">
          <h2 className="font-display font-semibold text-ink leading-[0.98] tracking-tightest" style={{ fontSize: "clamp(3rem, 12vw, 9rem)" }}>
            Projects
          </h2>
          <p className="mt-5 font-sans text-lg text-ink/60 max-w-xl leading-relaxed">
            Things I've built on my own time, from RAG agents to iOS apps and sports forecasting.
          </p>
        </div>
      </div>

      <ProjectCarousel onPick={pick} />

      <div className="max-w-6xl mx-auto px-6 mt-20 md:mt-24">
        <div role="tablist" aria-label="Project domains" className="flex flex-wrap gap-2 mb-12">
          {DOMAINS.map((d) => {
            const count = projectsData.filter((p) => p.domains.includes(d.id)).length;
            const on = d.id === tab;
            return (
              <button
                key={d.id}
                role="tab"
                aria-selected={on}
                aria-controls="project-panel"
                onClick={() => setTab(d.id)}
                className={`hover-line inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-sans text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 ${
                  on ? "border tab-on text-white" : "border border-ink/10 bg-white/15 text-ink/55 hover:text-ink hover:bg-white/30"
                }`}
              >
                {d.label}
                <span className={`font-mono text-[11px] ${on ? "text-accent-light" : "text-ink/35"}`}>{count}</span>
              </button>
            );
          })}
        </div>

        <motion.div
          key={tab}
          id="project-panel"
          role="tabpanel"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-6"
        >
          {visible.map((proj, i) => (
            <Fragment key={proj.name}><ProjectRow proj={proj} flip={i % 2 === 1} /></Fragment>
          ))}
        </motion.div>

        <div className="mt-12">
          <a
            href="https://github.com/shashhwatiwari"
            target="_blank"
            rel="noopener noreferrer"
            className="hover-line inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass font-sans text-sm font-semibold text-ink/80 hover:text-accent transition-colors"
          >
            <Github className="w-4 h-4" /> More on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

// ─── GitHub Activity ───────────────────────────────────────────────────────────

const GitHubActivity = () => (
  <section className="py-24 px-6">
    <div className="max-w-6xl mx-auto">
      <h2 className="mb-10 font-display font-semibold text-ink leading-[0.98] tracking-tightest" style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}>
        On GitHub
      </h2>
      <div className="overflow-x-auto glass rounded-[28px] p-6 md:p-8">
        <img
          src="https://ghchart.rshah.org/FF6B35/shashhwatiwari"
          alt="GitHub contribution chart"
          className="w-full min-w-[640px]"
          loading="lazy"
        />
      </div>
    </div>
  </section>
);

// ─── Resume ───────────────────────────────────────────────────────────────────

const Resume = () => (
  <section id="resume" className="py-24 px-6">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 glass rounded-[28px] p-8 md:p-12">
      <img
        src={`${BASE}resume-preview.png`}
        alt="Resume preview"
        className="w-40 rounded-[16px] ring-1 ring-black/5 shadow-[0_18px_40px_-18px_rgba(30,24,60,0.35)] shrink-0"
        loading="lazy"
      />
      <div className="flex-1">
        <h2 className="font-display font-semibold text-ink leading-[0.95] tracking-tight text-3xl md:text-4xl mb-4">
          Everything above fits on one page.
        </h2>
        <p className="font-sans text-ink/65 leading-relaxed max-w-lg mb-7">
          Experience, education, projects and skills, condensed and ready to download.
        </p>
        <a
          href={`${BASE}resume.pdf`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover-line inline-flex items-center bg-ink text-white font-sans font-semibold text-sm px-7 py-3.5 rounded-full shadow-[0_10px_30px_-12px_rgba(26,26,34,0.6)] transition-colors"
        >
          Open full resume
        </a>
      </div>
    </div>
  </section>
);

// ─── Contact ──────────────────────────────────────────────────────────────────

const Contact = () => (
  <section id="contact" className="relative py-32 md:py-44 px-6">
    <div className="relative max-w-6xl mx-auto">
      <h2 className="font-display font-semibold text-cream leading-[0.98] tracking-tightest" style={{ fontSize: "clamp(2.6rem, 9vw, 7rem)" }}>
        Got something<br />
        <span className="text-accent">worth making?</span>
      </h2>
      <p className="mt-8 font-sans text-cream/55 leading-relaxed text-lg max-w-xl">
        I graduated this spring and I'm looking for full-time roles, available now.
        If you're building something interesting, I'd like to hear about it.
      </p>
      <div className="mt-12 flex flex-col sm:flex-row gap-4">
        <a
          href="mailto:shashhwatiwari@gmail.com"
          className="hover-line inline-flex items-center justify-center gap-2.5 bg-accent text-white font-sans font-semibold text-base px-8 py-4 rounded-full shadow-[0_14px_40px_-12px_rgba(216,57,149,0.6)] hover:bg-accent/90 transition-colors"
        >
          <Mail className="w-5 h-5" /> shashhwatiwari@gmail.com
        </a>
        <a
          href="https://www.linkedin.com/in/shashwat-tiwari118/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover-line inline-flex items-center justify-center gap-2.5 glass-dark text-cream font-sans font-semibold text-base px-8 py-4 rounded-full hover:text-accent transition-colors"
        >
          <LinkedInIcon size={20} /> LinkedIn
        </a>
      </div>
    </div>
  </section>
);

// ─── Footer ───────────────────────────────────────────────────────────────────

const Footer = () => (
  <footer role="contentinfo" className="relative">
    <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="text-center md:text-left">
        <span className="font-display font-semibold text-cream">Shashwat Tiwari</span>
        <p className="font-sans text-xs text-cream/40 mt-1">© 2026, built with React and Tailwind</p>
      </div>
      <div className="flex items-center gap-6">
        {[...SOCIALS, { href: "mailto:shashhwatiwari@gmail.com", icon: Mail as unknown as typeof GitHubIcon, label: "Email" }].map((l) => (
          <a
            key={l.label}
            href={l.href}
            target={l.label === "Email" ? undefined : "_blank"}
            rel={l.label === "Email" ? undefined : "noopener noreferrer"}
            aria-label={l.label}
            className="text-cream/40 hover:text-accent transition-colors"
          >
            {l.label === "Email" ? <Mail className="w-6 h-6" /> : <l.icon size={24} />}
          </a>
        ))}
      </div>
    </div>
  </footer>
);

// ─── App ──────────────────────────────────────────────────────────────────────

// ─── Intro reveal ─────────────────────────────────────────────────────────────
// A black curtain sits on top of the site with a circular hole in its middle.
// The hole starts as a dot and widens until the curtain is fully see-through,
// then the curtain is removed. The site itself is never clipped or touched, so
// nothing on it has to re-render when the intro ends (no end-of-intro flash).
// Skipped for people who prefer reduced motion.

const REVEAL_RADII = [0, 0.5, 0.5, 150]; // vmax

export default function App() {
  const reduce = useReducedMotion();
  const [playIntro] = useState(() => !reduce);
  const [revealed, setRevealed] = useState(!playIntro);
  // The hero name starts its entrance as the circle opens up.
  const [nameGo, setNameGo] = useState(!playIntro);
  const radius = useMotionValue(0);
  const curtain = useTransform(
    radius,
    (r) => `radial-gradient(circle ${Math.max(r, 0.001)}vmax at 50% 50%, transparent 98%, #000 100%)`,
  );

  useEffect(() => {
    if (!playIntro) return;
    // The circle is centred on the first screen, so start at the top.
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    // Block scrolling during the intro without hiding the scrollbar, so the
    // layout never shifts when the intro ends.
    const SCROLL_KEYS = new Set(["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "]);
    const block = (e: Event) => e.preventDefault();
    const blockKeys = (e: KeyboardEvent) => {
      if (SCROLL_KEYS.has(e.key)) e.preventDefault();
    };
    const opts = { passive: false } as const;
    window.addEventListener("wheel", block, opts);
    window.addEventListener("touchmove", block, opts);
    window.addEventListener("keydown", blockKeys);
    const unlock = () => {
      window.removeEventListener("wheel", block);
      window.removeEventListener("touchmove", block);
      window.removeEventListener("keydown", blockKeys);
    };

    const nameTimer = setTimeout(() => setNameGo(true), 1000);
    const controls = animate(radius, REVEAL_RADII, {
      duration: 1.9,
      times: [0, 0.2, 0.4, 1],
      ease: [0.76, 0, 0.24, 1],
      onComplete: () => {
        unlock();
        setRevealed(true);
      },
    });
    return () => {
      clearTimeout(nameTimer);
      controls.stop();
      unlock();
    };
  }, [playIntro, radius]);

  return (
    <>
      {!revealed && (
        <motion.div
          aria-hidden="true"
          className="fixed inset-0 z-[200] bg-black"
          style={{ maskImage: curtain, WebkitMaskImage: curtain }}
        />
      )}
      <div className="relative z-10 min-h-screen bg-paper">
      <div className="ambient" aria-hidden="true" />
      <Navbar />
      <main>
        <Hero start={nameGo} />
        <AboutMe />
        <Experience />
        <Projects />
        <GitHubActivity />
        <Resume />
        {/* Contact and footer share one dark surface and one light field, so
            there is no seam between them. */}
        <div className="relative overflow-hidden bg-dark">
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(40vmax 30vmax at 85% 12%, rgba(5,147,198,0.38), transparent 70%), radial-gradient(40vmax 34vmax at 8% 78%, rgba(216,57,149,0.30), transparent 70%)",
            }}
          />
          <Contact />
          <Footer />
        </div>
      </main>
      </div>
    </>
  );
}
