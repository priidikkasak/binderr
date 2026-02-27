"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// ─── DATA ──────────────────────────────────────────────────────────────────────

const sections = [
  {
    id: "purpose",
    label: "01",
    title: "Purpose",
    accent: "purple",
    items: [
      {
        n: "01",
        q: "Our one sentence mission",
        a: "To become the global infrastructure layer connecting businesses with trusted financial, legal, and compliance providers through a single unified platform.",
      },
      {
        n: "02",
        q: "Why the world needs us",
        a: "Starting and operating a business globally is fragmented, slow, and trust-constrained — Binderr removes friction, reduces risk, and compresses weeks of operational setup into a single streamlined experience.",
      },
      {
        n: "03",
        q: "What would break if we disappeared",
        a: "Service providers would lose access to a scalable, qualified global demand channel, and businesses would revert to inefficient, opaque, and high-risk provider discovery and onboarding processes.",
      },
    ],
  },
  {
    id: "advantage",
    label: "02",
    title: "Unique Advantage",
    accent: "teal",
    items: [
      {
        n: "04",
        q: "The secret we believe that others don't",
        a: "The future is not individual providers competing for clients — it's infrastructure platforms owning distribution, trust, and onboarding at scale.",
      },
      {
        n: "05",
        q: "What makes us hard to copy",
        a: "The combination of compliance infrastructure, verified user base, provider network, and early geographic expansion creates compounding network effects.",
      },
      {
        n: "06",
        q: "Core moat",
        a: "Network + compliance infrastructure + execution speed.",
        highlight: true,
      },
      {
        n: "07",
        q: "Where we're already winning disproportionately",
        a: "Early provider onboarding, verified compliance user base, and qualified inbound demand generation.",
        stat: "70,000+",
        statLabel: "Verified users",
      },
      {
        n: "08",
        q: "10× better than the status quo at",
        a: "Reducing time, friction, and uncertainty in finding and onboarding trusted business service providers globally.",
      },
    ],
  },
  {
    id: "market",
    label: "03",
    title: "The Market",
    accent: "purple",
    items: [
      {
        n: "09",
        q: "Who our dream customer is",
        a: "Corporate service providers, compliance firms, financial institutions, and globally operating entrepreneurs who need fast, trusted infrastructure.",
      },
      {
        n: "10",
        q: "Their biggest pain / unmet job",
        a: "Finding qualified clients or trusted providers without wasting time, risking compliance failure, or relying on outdated networks.",
      },
      {
        n: "11",
        q: "Market we dominate first",
        a: "Corporate service providers and AML/KYC-focused firms in high-growth jurisdictions, starting with the Baltics and expanding globally.",
      },
    ],
  },
  {
    id: "choices",
    label: "04",
    title: "Strategic Choices",
    accent: "teal",
    items: [
      {
        n: "12",
        q: "What we will always do",
        a: "Prioritize network growth, execution speed, and real provider-client matching that generates measurable economic value.",
        badge: "Always",
        badgeColor: "teal",
      },
      {
        n: "13",
        q: "What we will never do",
        a: "Become a generic directory or sacrifice trust and quality for short-term growth.",
        badge: "Never",
        badgeColor: "red",
      },
      {
        n: "14",
        q: "Our #1 priority this year",
        a: "Rapidly expand the provider network and establish Binderr as the default infrastructure layer in key expansion regions.",
        highlight: true,
      },
      {
        n: "15",
        q: "Our constraint / bottleneck right now",
        a: "Speed of onboarding high-quality providers relative to growing inbound demand.",
      },
      {
        n: "16",
        q: "How we'll remove that bottleneck",
        a: "Dedicated regional expansion, clear incentive structures, and accelerated onboarding processes.",
      },
    ],
  },
  {
    id: "execution",
    label: "05",
    title: "Execution System",
    accent: "purple",
    items: [
      {
        n: "17",
        q: "Quarterly targets",
        a: "",
        bullets: [
          "100+ new qualified providers onboarded",
          "Expansion into 3–5 new key jurisdictions",
          "Significant increase in Marketplace activity and deal flow",
        ],
      },
      {
        n: "18",
        q: "Monthly milestones",
        a: "",
        bullets: [
          "Consistent provider onboarding",
          "Increased qualified introductions and closed deals",
          "Strong regional presence and relationship building",
        ],
      },
      {
        n: "19",
        q: "Who owns each metric",
        a: "Regional leads drive provider growth and relationships; core team drives infrastructure, product, and demand generation.",
      },
    ],
  },
  {
    id: "story",
    label: "06",
    title: "Strategic Story",
    accent: "teal",
    items: [
      {
        n: "20",
        q: "The narrative we want team / customers to repeat",
        a: "Binderr is becoming the infrastructure layer for global business operations — those who join early gain disproportionate access, growth, and opportunity.",
      },
      {
        n: "21",
        q: "We win because",
        a: "We control trust, distribution, and infrastructure before the rest of the market realizes the shift.",
        highlight: true,
        big: true,
      },
    ],
  },
];

type SectionItem = {
  n: string;
  q: string;
  a: string;
  highlight?: boolean;
  big?: boolean;
  badge?: string;
  badgeColor?: string;
  stat?: string;
  statLabel?: string;
  bullets?: string[];
};

// ─── HELPERS ───────────────────────────────────────────────────────────────────

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const PURPLE = "#5D55F0";
const TEAL   = "#18CC90";
const accentColor = (a: string) => (a === "teal" ? TEAL : PURPLE);

// ─── GLASS CARD ────────────────────────────────────────────────────────────────

function GlassCard({
  item,
  index,
  accent,
}: {
  item: SectionItem;
  index: number;
  accent: string;
}) {
  const { ref, visible } = useInView();
  const color = accentColor(accent);
  const isWide = item.big || item.highlight;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className={`relative group rounded-3xl overflow-hidden ${isWide ? "md:col-span-2" : ""}`}
      style={{
        background: item.highlight
          ? `linear-gradient(135deg, ${color}18 0%, rgba(0,14,22,0.6) 100%)`
          : "rgba(26, 36, 48, 0.15)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: `0.5px solid ${item.highlight ? `${color}40` : "rgba(255,255,255,0.07)"}`,
        boxShadow: item.highlight
          ? `0 0 60px ${color}15, inset 0 0 60px ${color}05`
          : "none",
      }}
    >
      {/* Hover gradient */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
        style={{
          background: `radial-gradient(500px circle at 0% 0%, ${color}10, transparent 60%)`,
        }}
      />

      {/* Gradient top edge */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}60, transparent)`,
        }}
      />

      <div className={`relative p-8 ${isWide ? "md:p-10" : ""}`}>
        {/* Badge */}
        {item.badge && (
          <span
            className="absolute top-6 right-6 text-[10px] font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-full"
            style={{
              color: item.badgeColor === "teal" ? TEAL : item.badgeColor === "red" ? "#E04360" : color,
              background: item.badgeColor === "teal"
                ? "rgba(24,204,144,0.1)"
                : item.badgeColor === "red"
                ? "rgba(224,67,96,0.1)"
                : `${color}15`,
              border: `1px solid ${
                item.badgeColor === "teal"
                  ? "rgba(24,204,144,0.2)"
                  : item.badgeColor === "red"
                  ? "rgba(224,67,96,0.2)"
                  : `${color}30`
              }`,
            }}
          >
            {item.badge}
          </span>
        )}

        {/* Number */}
        <p
          className="text-[11px] font-semibold tracking-[0.25em] uppercase mb-5"
          style={{ color }}
        >
          {item.n}
        </p>

        {/* Question */}
        <p
          className="text-sm font-medium mb-4 leading-relaxed"
          style={{ color: "#7F92AD" }}
        >
          {item.q}
        </p>

        {/* Answer */}
        {item.big ? (
          <p
            className="text-2xl md:text-3xl font-light leading-snug"
            style={{ color: "#FFFFFF", lineHeight: 1.3 }}
          >
            {item.a}
          </p>
        ) : item.bullets ? (
          <ul className="space-y-3 mt-1">
            {item.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-3 text-[15px] leading-relaxed" style={{ color: "#CBD5E1" }}>
                <span
                  className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: color }}
                />
                {b}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[15px] leading-relaxed" style={{ color: "#CBD5E1" }}>
            {item.a}
          </p>
        )}

        {/* Stat */}
        {item.stat && (
          <div className="mt-6 flex items-baseline gap-2.5">
            <span
              className="text-4xl font-semibold tracking-tight"
              style={{ color }}
            >
              {item.stat}
            </span>
            <span className="text-xs uppercase tracking-widest" style={{ color: "#7F92AD" }}>
              {item.statLabel}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── SECTION ───────────────────────────────────────────────────────────────────

function Section({ section }: { section: (typeof sections)[0] }) {
  const { ref, visible } = useInView(0.05);
  const color = accentColor(section.accent);

  return (
    <section ref={ref} id={section.id} className="mb-28 scroll-mt-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-10"
      >
        {/* Section label */}
        <div className="flex items-center gap-4 mb-5">
          <span
            className="text-[11px] font-semibold tracking-[0.3em] uppercase"
            style={{ color }}
          >
            {section.label}
          </span>
          <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${color}40, transparent)` }} />
        </div>

        <h2
          className="font-light"
          style={{ fontSize: "clamp(32px, 5vw, 48px)", color: "#FFFFFF", lineHeight: 1.1 }}
        >
          {section.title}
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {section.items.map((item, i) => (
          <GlassCard key={item.n} item={item} index={i} accent={section.accent} />
        ))}
      </div>
    </section>
  );
}

// ─── NAV PILL ──────────────────────────────────────────────────────────────────

function NavPill({ section, active }: { section: (typeof sections)[0]; active: boolean }) {
  const color = accentColor(section.accent);
  return (
    <a
      href={`#${section.id}`}
      className="flex items-center gap-2.5 transition-all duration-200"
    >
      <span
        className="rounded-full transition-all duration-300"
        style={{
          width: active ? 18 : 4,
          height: 4,
          background: active ? color : "rgba(255,255,255,0.15)",
        }}
      />
    </a>
  );
}

// ─── PAGE ───────────────────────────────────────────────────────────────────────

export default function StrategyPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const [activeSection, setActiveSection] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const lastYRef = useRef(0);
  const [headerHidden, setHeaderHidden] = useState(false);

  useEffect(() => {
    const fn = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setHeaderHidden(y > 120 && y > lastYRef.current);
      lastYRef.current = y;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.getBoundingClientRect().top <= 160) {
          setActiveSection(i);
          break;
        }
      }
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div ref={containerRef} style={{ background: "#00080D", minHeight: "100vh" }}>
      {/* Progress */}
      <motion.div
        className="fixed top-0 left-0 h-[2px] z-50 pointer-events-none"
        style={{
          width: progressWidth,
          background: "linear-gradient(90deg, #5D55F0, #18CC90)",
        }}
      />

      {/* Side nav */}
      <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-4">
        {sections.map((s, i) => (
          <NavPill key={s.id} section={s} active={activeSection === i} />
        ))}
      </nav>

      {/* Header */}
      <motion.header
        animate={{ y: headerHidden ? -80 : 0, opacity: headerHidden ? 0 : 1 }}
        transition={{ duration: 0.25 }}
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 md:px-14"
        style={{
          height: 72,
          background: scrolled
            ? "rgba(0,8,13,0.85)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
          transition: "background 0.3s, border-color 0.3s, backdrop-filter 0.3s",
        }}
      >
        {/* Logo wordmark */}
        <div className="flex items-center gap-2">
          <span
            className="text-base font-semibold tracking-tight"
            style={{ color: "#FFFFFF" }}
          >
            binderr
          </span>
          <span
            className="text-[10px] font-medium tracking-[0.2em] uppercase px-2 py-0.5 rounded-full ml-1"
            style={{
              color: "#5D55F0",
              background: "rgba(93,85,240,0.12)",
              border: "1px solid rgba(93,85,240,0.2)",
            }}
          >
            Strategy
          </span>
        </div>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="text-[13px] font-light transition-colors duration-200"
              style={{ color: "rgba(127,146,173,0.7)" }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#fff")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(127,146,173,0.7)")}
            >
              {s.title}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#purpose"
          className="hidden md:inline-flex items-center gap-2 text-[13px] font-medium px-4 py-2 rounded-xl transition-all duration-200 hover:opacity-90"
          style={{
            background: "linear-gradient(94deg, #5D55F0, #35318A)",
            color: "#fff",
          }}
        >
          View framework
        </a>
      </motion.header>

      {/* ── HERO ── */}
      <section
        className="relative flex flex-col items-center justify-center overflow-hidden"
        style={{ minHeight: "100vh", paddingTop: 72 }}
      >
        {/* Background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 60% 50% at 50% 0%, rgba(93,85,240,0.18) 0%, transparent 70%),
              radial-gradient(ellipse 40% 30% at 80% 60%, rgba(24,204,144,0.08) 0%, transparent 60%)
            `,
          }}
        />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(93,85,240,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(93,85,240,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
            maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)",
          }}
        />

        <motion.div
          className="relative z-10 text-center px-6 max-w-4xl w-full mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 mb-10 px-4 py-2 rounded-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{
              background: "rgba(93,85,240,0.1)",
              border: "1px solid rgba(93,85,240,0.2)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#18CC90" }} />
            <span className="text-[11px] font-medium tracking-[0.2em] uppercase" style={{ color: "#7F92AD" }}>
              Confidential · Strategy Framework 2026
            </span>
          </motion.div>

          {/* Headline */}
          <h1
            className="font-light tracking-tight mb-6"
            style={{
              fontSize: "clamp(48px, 9vw, 88px)",
              lineHeight: 1.0,
              color: "#FFFFFF",
              letterSpacing: "-0.02em",
            }}
          >
            Connecting the
            <br />
            <span
              style={{
                backgroundImage: "linear-gradient(94deg, #5D55F0 0%, #18CC90 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              world of business
            </span>
          </h1>

          <p
            className="text-lg font-light max-w-xl mx-auto mb-14"
            style={{ color: "#7F92AD", lineHeight: 1.6 }}
          >
            We build trusted infrastructure so businesses can expand anywhere — 21 strategic answers that define how we get there.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-10 mb-14">
            {[
              { val: "70,000+", label: "Verified Users" },
              { val: "21", label: "Strategic Pillars" },
              { val: "6", label: "Core Sections" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                className="text-center"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.1 }}
              >
                <div
                  className="text-2xl font-semibold mb-1"
                  style={{ color: i % 2 === 0 ? "#5D55F0" : "#18CC90" }}
                >
                  {s.val}
                </div>
                <div className="text-[11px] uppercase tracking-widest" style={{ color: "rgba(127,146,173,0.5)" }}>
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap justify-center gap-3">
            <motion.a
              href="#purpose"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200"
              style={{
                background: "linear-gradient(94deg, #5D55F0, #35318A)",
                color: "#fff",
                boxShadow: "0 0 40px rgba(93,85,240,0.3)",
              }}
              whileHover={{ scale: 1.03, boxShadow: "0 0 60px rgba(93,85,240,0.45)" }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
            >
              Explore framework
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M1 7h12M7 1l6 6-6 6" />
              </svg>
            </motion.a>
            <motion.a
              href="https://binderr.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.04)",
                color: "#7F92AD",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              whileHover={{ background: "rgba(255,255,255,0.07)", color: "#fff" }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.72 }}
            >
              Visit binderr.com
            </motion.a>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        >
          <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: "rgba(127,146,173,0.35)" }}>Scroll</span>
          <div className="w-px h-8" style={{ background: "linear-gradient(180deg, rgba(93,85,240,0.5), transparent)" }} />
        </motion.div>
      </section>

      {/* ── CONTENT ── */}
      <main className="max-w-5xl mx-auto px-6 md:px-10 pt-12 pb-36">
        {sections.map((s) => (
          <Section key={s.id} section={s} />
        ))}
      </main>

      {/* ── CLOSING BANNER ── */}
      <div
        className="relative py-28 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(93,85,240,0.08) 0%, rgba(24,204,144,0.04) 100%)",
          borderTop: "1px solid rgba(93,85,240,0.15)",
          borderBottom: "1px solid rgba(93,85,240,0.15)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(93,85,240,0.1) 0%, transparent 70%)",
          }}
        />
        <div className="relative max-w-3xl mx-auto px-8 text-center">
          <p
            className="text-[11px] font-semibold tracking-[0.3em] uppercase mb-6"
            style={{ color: "#18CC90" }}
          >
            The thesis
          </p>
          <p
            className="font-light"
            style={{ fontSize: "clamp(24px, 4vw, 40px)", color: "#FFFFFF", lineHeight: 1.3, letterSpacing: "-0.01em" }}
          >
            Those who join early gain{" "}
            <span
              style={{
                backgroundImage: "linear-gradient(94deg, #5D55F0, #18CC90)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              disproportionate access,
            </span>{" "}
            growth, and opportunity.
          </p>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="py-12 text-center" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <p className="text-[11px] tracking-widest uppercase" style={{ color: "rgba(127,146,173,0.25)" }}>
          Binderr © 2026 · Confidential · Do Not Distribute
        </p>
      </footer>
    </div>
  );
}
