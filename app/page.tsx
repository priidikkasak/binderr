"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// ─── DATA ──────────────────────────────────────────────────────────────────────

const sections = [
  {
    id: "purpose",
    label: "01 — Purpose",
    title: "Purpose",
    color: "#c9a84c",
    items: [
      {
        n: "1",
        q: "Our one sentence mission",
        a: "To become the global infrastructure layer connecting businesses with trusted financial, legal, and compliance providers through a single unified platform.",
      },
      {
        n: "2",
        q: "Why the world needs us",
        a: "Starting and operating a business globally is fragmented, slow, and trust-constrained — Binderr removes friction, reduces risk, and compresses weeks of operational setup into a single streamlined experience.",
      },
      {
        n: "3",
        q: "What would break if we disappeared",
        a: "Service providers would lose access to a scalable, qualified global demand channel, and businesses would revert to inefficient, opaque, and high-risk provider discovery and onboarding processes.",
      },
    ],
  },
  {
    id: "advantage",
    label: "02 — Unique Advantage",
    title: "Unique Advantage",
    color: "#4f7cff",
    items: [
      {
        n: "4",
        q: "The \"secret\" we believe that others don't",
        a: "The future is not individual providers competing for clients — it's infrastructure platforms owning distribution, trust, and onboarding at scale.",
      },
      {
        n: "5",
        q: "What makes us hard to copy",
        a: "The combination of compliance infrastructure, verified user base, provider network, and early geographic expansion creates compounding network effects.",
      },
      {
        n: "6",
        q: "Core moat",
        a: "Network + compliance infrastructure + execution speed.",
        highlight: true,
      },
      {
        n: "7",
        q: "Where we're already winning disproportionately",
        a: "Early provider onboarding, verified compliance user base (70,000+), and qualified inbound demand generation.",
        stat: "70,000+",
        statLabel: "verified users",
      },
      {
        n: "8",
        q: "10× better than the status quo at",
        a: "Reducing time, friction, and uncertainty in finding and onboarding trusted business service providers globally.",
      },
    ],
  },
  {
    id: "market",
    label: "03 — The Market",
    title: "The Market",
    color: "#7c4fff",
    items: [
      {
        n: "9",
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
        q: "Market we dominate first (beachhead)",
        a: "Corporate service providers and AML/KYC-focused firms in high-growth jurisdictions, starting with the Baltics and expanding globally.",
      },
    ],
  },
  {
    id: "choices",
    label: "04 — Strategic Choices",
    title: "Strategic Choices",
    color: "#ff4f7c",
    items: [
      {
        n: "12",
        q: "What we will ALWAYS do",
        a: "Prioritize network growth, execution speed, and real provider-client matching that generates measurable economic value.",
        cardType: "always",
      },
      {
        n: "13",
        q: "What we will NEVER do",
        a: "Become a generic directory or sacrifice trust and quality for short-term growth.",
        cardType: "never",
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
    label: "05 — Execution",
    title: "Execution System",
    color: "#4fc9a8",
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
    label: "06 — Strategic Story",
    title: "Strategic Story",
    color: "#c9a84c",
    items: [
      {
        n: "20",
        q: "The narrative we want team / customers to repeat",
        a: "Binderr is becoming the infrastructure layer for global business operations — those who join early gain disproportionate access, growth, and opportunity.",
      },
      {
        n: "21",
        q: "Sticky phrase: We win because",
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
  cardType?: string;
  stat?: string;
  statLabel?: string;
  bullets?: string[];
};

// ─── HOOKS ─────────────────────────────────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ─── COMPONENTS ────────────────────────────────────────────────────────────────

function SectionDivider({ label, color }: { label: string; color: string }) {
  return (
    <div className="flex items-center gap-4 mb-12">
      <div
        className="h-px flex-1"
        style={{
          background: `linear-gradient(90deg, ${color}50, transparent)`,
        }}
      />
      <span
        className="text-xs font-semibold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full border"
        style={{
          color,
          borderColor: `${color}30`,
          background: `${color}10`,
        }}
      >
        {label}
      </span>
      <div
        className="h-px flex-1"
        style={{
          background: `linear-gradient(270deg, ${color}50, transparent)`,
        }}
      />
    </div>
  );
}

function QACard({
  item,
  index,
  color,
}: {
  item: SectionItem;
  index: number;
  color: string;
}) {
  const { ref, visible } = useInView();

  const isFullWidth = item.big || item.highlight;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.55,
        delay: index * 0.07,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`relative group rounded-2xl border overflow-hidden transition-colors duration-300 ${
        isFullWidth ? "md:col-span-2" : ""
      }`}
      style={{
        background: item.highlight
          ? `linear-gradient(135deg, ${color}14, ${color}04)`
          : "#0e0e15",
        borderColor: item.highlight ? `${color}30` : "rgba(255,255,255,0.06)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = item.highlight
          ? `${color}50`
          : "rgba(255,255,255,0.12)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = item.highlight
          ? `${color}30`
          : "rgba(255,255,255,0.06)";
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(400px circle at 10% 10%, ${color}08, transparent 60%)`,
        }}
      />

      {/* Always / Never badge */}
      {item.cardType && (
        <div
          className="absolute top-5 right-5 text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full"
          style={{
            color: item.cardType === "always" ? "#4fc9a8" : "#ff4f7c",
            background:
              item.cardType === "always"
                ? "rgba(79,201,168,0.12)"
                : "rgba(255,79,124,0.12)",
            border: `1px solid ${
              item.cardType === "always"
                ? "rgba(79,201,168,0.25)"
                : "rgba(255,79,124,0.25)"
            }`,
          }}
        >
          {item.cardType === "always" ? "Always" : "Never"}
        </div>
      )}

      <div className="p-7 md:p-9">
        {/* Number */}
        <div
          className="text-[11px] font-bold tracking-[0.28em] mb-5 uppercase"
          style={{ color }}
        >
          {String(item.n).padStart(2, "0")}
        </div>

        {/* Question */}
        <p
          className="text-[13px] font-medium tracking-wide mb-4 leading-relaxed"
          style={{ color: "#6b6b80" }}
        >
          {item.q}
        </p>

        {/* Answer */}
        {item.big ? (
          <p
            className="text-2xl md:text-3xl lg:text-4xl font-bold leading-snug"
            style={{ color: "#f0ede8" }}
          >
            {item.a}
          </p>
        ) : item.bullets ? (
          <ul className="space-y-2.5 mt-1">
            {item.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-300 leading-relaxed">
                <span
                  className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: color }}
                />
                {b}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm md:text-[15px] leading-relaxed text-gray-300">
            {item.a}
          </p>
        )}

        {/* Stat */}
        {item.stat && (
          <div className="mt-6 flex items-baseline gap-2">
            <span
              className="text-4xl font-black tracking-tight"
              style={{ color }}
            >
              {item.stat}
            </span>
            <span
              className="text-[11px] uppercase tracking-[0.15em]"
              style={{ color: "#4d4d60" }}
            >
              {item.statLabel}
            </span>
          </div>
        )}
      </div>

      {/* Bottom glow line */}
      <div
        className="h-[2px] w-0 group-hover:w-full transition-all duration-700"
        style={{
          background: `linear-gradient(90deg, ${color}, transparent)`,
        }}
      />
    </motion.div>
  );
}

function Section({
  section,
}: {
  section: (typeof sections)[0];
}) {
  const { ref, visible } = useInView(0.05);

  return (
    <section ref={ref} id={section.id} className="mb-28 md:mb-36 scroll-mt-28">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={visible ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <SectionDivider label={section.label} color={section.color} />

        {/* Ghost heading */}
        <div className="relative mb-12 overflow-hidden">
          <span
            className="absolute -top-3 left-0 font-black leading-none select-none pointer-events-none"
            style={{
              fontSize: "clamp(72px, 12vw, 140px)",
              color: `${section.color}05`,
              letterSpacing: "-0.04em",
              whiteSpace: "nowrap",
            }}
          >
            {section.title}
          </span>
          <h2
            className="relative text-3xl md:text-4xl font-bold pt-3"
            style={{ color: "#f0ede8" }}
          >
            {section.title}
          </h2>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {section.items.map((item, i) => (
          <QACard key={item.n} item={item} index={i} color={section.color} />
        ))}
      </div>
    </section>
  );
}

function NavDot({
  section,
  active,
}: {
  section: (typeof sections)[0];
  active: boolean;
}) {
  return (
    <a
      href={`#${section.id}`}
      className="group flex items-center gap-3"
      title={section.title}
    >
      <span
        className="block rounded-full transition-all duration-300"
        style={{
          width: active ? 20 : 5,
          height: 5,
          background: active ? section.color : "#2a2a3a",
        }}
      />
      <span
        className="text-[10px] font-semibold tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
        style={{ color: section.color }}
      >
        {section.title}
      </span>
    </a>
  );
}

// ─── PAGE ───────────────────────────────────────────────────────────────────────

export default function StrategyPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const [activeSection, setActiveSection] = useState(0);
  const [headerHidden, setHeaderHidden] = useState(false);
  const lastYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setHeaderHidden(y > 100 && y > lastYRef.current);
      lastYRef.current = y;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.getBoundingClientRect().top <= 180) {
          setActiveSection(i);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} style={{ background: "#06060a", minHeight: "100vh" }}>
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 h-[2px] z-50 pointer-events-none"
        style={{
          width: progressWidth,
          background:
            "linear-gradient(90deg, #c9a84c 0%, #4f7cff 50%, #c9a84c 100%)",
        }}
      />

      {/* Side nav dots */}
      <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-5">
        {sections.map((s, i) => (
          <NavDot key={s.id} section={s} active={activeSection === i} />
        ))}
      </nav>

      {/* Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 md:px-14 py-5"
        animate={{ y: headerHidden ? -80 : 0, opacity: headerHidden ? 0 : 1 }}
        transition={{ duration: 0.28 }}
        style={{
          background:
            "linear-gradient(180deg, rgba(6,6,10,0.96) 0%, rgba(6,6,10,0) 100%)",
        }}
      >
        <div className="flex items-center gap-3">
          <span
            className="text-sm font-extrabold tracking-[0.22em] uppercase"
            style={{ color: "#c9a84c" }}
          >
            Binderr
          </span>
          <span style={{ color: "#222230", fontSize: 18 }}>×</span>
          <span
            className="text-[11px] tracking-[0.2em] uppercase font-medium"
            style={{ color: "#3d3d50" }}
          >
            Strategy 2026
          </span>
        </div>
        <div className="hidden md:flex items-center gap-7">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="text-[10px] font-semibold tracking-[0.2em] uppercase transition-colors duration-200"
              style={{ color: "#3d3d50" }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = s.color;
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = "#3d3d50";
              }}
            >
              {s.title}
            </a>
          ))}
        </div>
      </motion.header>

      {/* ── HERO ── */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
        style={{ paddingTop: 80 }}
      >
        {/* Grid bg */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(201,168,76,0.025) 1px, transparent 1px),
              linear-gradient(90deg, rgba(201,168,76,0.025) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
          }}
        />
        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,168,76,0.06) 0%, transparent 70%)",
          }}
        />

        <motion.div
          className="relative z-10 text-center max-w-4xl w-full mx-auto"
          initial={{ opacity: 0, y: 52 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2.5 mb-10 px-5 py-2 rounded-full border text-[11px] font-semibold tracking-[0.25em] uppercase"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            style={{
              borderColor: "rgba(201,168,76,0.2)",
              color: "#c9a84c",
              background: "rgba(201,168,76,0.06)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: "#c9a84c" }}
            />
            Confidential · Strategy Framework 2026
          </motion.div>

          {/* Heading */}
          <h1
            className="font-black leading-[0.88] tracking-tight mb-8 select-none"
            style={{
              fontSize: "clamp(52px, 11vw, 110px)",
              color: "#f0ede8",
              letterSpacing: "-0.04em",
            }}
          >
            Global
            <br />
            <span
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #c9a84c 0%, #f0d882 45%, #c9a84c 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Infrastructure
            </span>
            <br />
            Layer.
          </h1>

          <p
            className="text-base md:text-lg max-w-lg mx-auto leading-relaxed mb-14"
            style={{ color: "#6b6b80" }}
          >
            How Binderr becomes the default platform connecting businesses with
            trusted financial, legal, and compliance providers worldwide.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-10 mb-14">
            {[
              { val: "70K+", label: "Verified Users" },
              { val: "21", label: "Strategic Questions" },
              { val: "6", label: "Core Pillars" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                className="text-center"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
              >
                <div
                  className="text-3xl font-black mb-1"
                  style={{ color: "#c9a84c" }}
                >
                  {s.val}
                </div>
                <div
                  className="text-[10px] tracking-[0.2em] uppercase"
                  style={{ color: "#3d3d50" }}
                >
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.a
            href="#purpose"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-bold transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #c9a84c 0%, #a07828 100%)",
              color: "#000",
              boxShadow: "0 0 40px rgba(201,168,76,0.25)",
            }}
            whileHover={{ scale: 1.04, boxShadow: "0 0 60px rgba(201,168,76,0.35)" }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.4 }}
          >
            Explore the Framework
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M1 7h12M7 1l6 6-6 6" />
            </svg>
          </motion.a>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        >
          <div
            className="w-px h-14 mx-auto"
            style={{
              background:
                "linear-gradient(180deg, transparent 0%, #c9a84c 50%, transparent 100%)",
            }}
          />
        </motion.div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <main
        className="max-w-5xl mx-auto px-6 md:px-10 pb-36 pt-8"
        style={{ paddingTop: 40 }}
      >
        {sections.map((s) => (
          <Section key={s.id} section={s} />
        ))}
      </main>

      {/* ── CLOSING STATEMENT ── */}
      <div
        className="relative py-28 overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(201,168,76,0.04) 50%, transparent 100%)",
          borderTop: "1px solid rgba(255,255,255,0.04)",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <div className="max-w-3xl mx-auto px-8 text-center">
          <p
            className="text-[11px] font-bold tracking-[0.3em] uppercase mb-6"
            style={{ color: "#c9a84c" }}
          >
            The Thesis
          </p>
          <p
            className="text-2xl md:text-3xl font-bold leading-snug"
            style={{ color: "#f0ede8" }}
          >
            Those who join early gain{" "}
            <span
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #c9a84c, #f0d882)",
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
        <p
          className="text-[11px] tracking-[0.25em] uppercase"
          style={{ color: "#2a2a3a" }}
        >
          Binderr © 2026 · Confidential · Do Not Distribute
        </p>
        <p className="text-[10px] mt-1.5" style={{ color: "#1e1e2a" }}>
          Strategy Framework — Regional Expansion
        </p>
      </footer>
    </div>
  );
}
