"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// ─── CONSTANTS ─────────────────────────────────────────────────────────────────

const PURPLE = "#5D55F0";
const TEAL = "#18CC90";
const RED = "#E04360";

// ─── DATA ──────────────────────────────────────────────────────────────────────

const sections = [
  {
    id: "purpose",
    index: "01",
    title: "Purpose",
    accent: PURPLE,
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
    index: "02",
    title: "Unique Advantage",
    accent: TEAL,
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
    index: "03",
    title: "The Market",
    accent: PURPLE,
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
    index: "04",
    title: "Strategic Choices",
    accent: TEAL,
    items: [
      {
        n: "12",
        q: "What we will always do",
        a: "Prioritize network growth, execution speed, and real provider-client matching that generates measurable economic value.",
        badge: "Always",
        badgeColor: TEAL,
      },
      {
        n: "13",
        q: "What we will never do",
        a: "Become a generic directory or sacrifice trust and quality for short-term growth.",
        badge: "Never",
        badgeColor: RED,
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
    index: "05",
    title: "Execution System",
    accent: PURPLE,
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
    index: "06",
    title: "Strategic Story",
    accent: TEAL,
    items: [
      {
        n: "20",
        q: "The narrative we want repeated",
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

type Item = {
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

// ─── HOOK ──────────────────────────────────────────────────────────────────────

function useInView(threshold = 0.08) {
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

// ─── CARD ──────────────────────────────────────────────────────────────────────

function QACard({ item, index, accent }: { item: Item; index: number; accent: string }) {
  const { ref, visible } = useInView();
  const [hovered, setHovered] = useState(false);
  const isWide = item.big || item.highlight;

  // Border gradient: accent on highlight, subtle white on normal
  const borderBg = item.highlight
    ? `linear-gradient(135deg, ${accent}55 0%, ${accent}20 50%, rgba(255,255,255,0.06) 100%)`
    : hovered
    ? `linear-gradient(145deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.04) 100%)`
    : `linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)`;

  // Inner card bg
  const cardBg = item.highlight
    ? `linear-gradient(145deg, ${accent}12 0%, #050b14 100%)`
    : hovered
    ? `linear-gradient(145deg, #101e30 0%, #07101a 100%)`
    : `linear-gradient(145deg, #0b1625 0%, #060d18 100%)`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={isWide ? "card-wide" : ""}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      // Gradient border wrapper technique
      style={{
        padding: "1px",
        borderRadius: "24px",
        background: borderBg,
        boxShadow: item.highlight
          ? `0 4px 48px ${accent}18`
          : hovered
          ? `0 8px 48px rgba(0,0,0,0.5)`
          : `0 2px 24px rgba(0,0,0,0.3)`,
        transition: "background 0.35s ease, box-shadow 0.35s ease",
      }}
    >
      <div
        style={{
          borderRadius: "23px",
          background: cardBg,
          transition: "background 0.35s ease",
          position: "relative",
          overflow: "hidden",
          height: "100%",
        }}
      >
        {/* Top glow line on hover */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "15%",
            right: "15%",
            height: "1px",
            background: `linear-gradient(90deg, transparent, ${accent}80, transparent)`,
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.35s ease",
          }}
        />

        {/* Radial glow inside on hover */}
        <div
          style={{
            position: "absolute",
            top: "-60px",
            left: "-60px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${accent}10, transparent 70%)`,
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.5s ease",
            pointerEvents: "none",
          }}
        />

        <div style={{ padding: isWide ? "40px 44px" : "36px 36px", height: "100%", position: "relative" }}>
          {/* Badge */}
          {item.badge && (
            <span
              style={{
                position: "absolute",
                top: 28,
                right: 28,
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: item.badgeColor,
                background: `${item.badgeColor}18`,
                border: `1px solid ${item.badgeColor}30`,
                padding: "4px 12px",
                borderRadius: "100px",
              }}
            >
              {item.badge}
            </span>
          )}

          {/* Number */}
          <p
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: accent,
              marginBottom: "20px",
            }}
          >
            {item.n}
          </p>

          {/* Question */}
          <p
            style={{
              fontSize: "14px",
              fontWeight: 400,
              color: "#7F92AD",
              lineHeight: 1.5,
              marginBottom: "16px",
            }}
          >
            {item.q}
          </p>

          {/* Separator */}
          <div
            style={{
              height: "1px",
              background: item.highlight
                ? `linear-gradient(90deg, ${accent}40, transparent)`
                : "rgba(255,255,255,0.06)",
              marginBottom: "20px",
            }}
          />

          {/* Answer */}
          {item.big ? (
            <p
              style={{
                fontSize: "clamp(22px, 3.5vw, 32px)",
                fontWeight: 500,
                color: "#FFFFFF",
                lineHeight: 1.25,
                letterSpacing: "-0.01em",
              }}
            >
              {item.a}
            </p>
          ) : item.bullets ? (
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
              {item.bullets.map((b, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    fontSize: "15px",
                    color: "#CBD8EA",
                    lineHeight: 1.55,
                  }}
                >
                  <span
                    style={{
                      marginTop: "8px",
                      width: "5px",
                      height: "5px",
                      borderRadius: "50%",
                      background: accent,
                      flexShrink: 0,
                    }}
                  />
                  {b}
                </li>
              ))}
            </ul>
          ) : (
            <p
              style={{
                fontSize: "16px",
                fontWeight: 400,
                color: "#CBD8EA",
                lineHeight: 1.65,
              }}
            >
              {item.a}
            </p>
          )}

          {/* Stat */}
          {item.stat && (
            <div style={{ marginTop: "28px", display: "flex", alignItems: "baseline", gap: "10px" }}>
              <span
                style={{
                  fontSize: "44px",
                  fontWeight: 600,
                  color: accent,
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                }}
              >
                {item.stat}
              </span>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  color: "#4A5B70",
                }}
              >
                {item.statLabel}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─── SECTION ───────────────────────────────────────────────────────────────────

function Section({ section }: { section: (typeof sections)[0] }) {
  const { ref, visible } = useInView(0.04);

  return (
    <section
      ref={ref}
      id={section.id}
      style={{ marginBottom: "120px", scrollMarginTop: "100px" }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ marginBottom: "40px", position: "relative" }}
      >
        {/* Section index + line */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "12px" }}>
          <span
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: section.accent,
            }}
          >
            {section.index}
          </span>
          <div
            style={{
              flex: 1,
              height: "1px",
              background: `linear-gradient(90deg, ${section.accent}35, transparent)`,
            }}
          />
        </div>

        {/* Ghost + real title */}
        <div style={{ position: "relative" }}>
          <span
            style={{
              position: "absolute",
              top: "-8px",
              left: "-4px",
              fontSize: "clamp(64px, 10vw, 110px)",
              fontWeight: 700,
              color: `${section.accent}06`,
              lineHeight: 1,
              letterSpacing: "-0.04em",
              userSelect: "none",
              pointerEvents: "none",
              whiteSpace: "nowrap",
            }}
          >
            {section.title}
          </span>
          <h2
            style={{
              fontSize: "clamp(32px, 4.5vw, 44px)",
              fontWeight: 500,
              color: "#FFFFFF",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              position: "relative",
            }}
          >
            {section.title}
          </h2>
        </div>
      </motion.div>

      {/* Cards grid */}
      <div className="card-grid">
        {section.items.map((item, i) => (
          <QACard key={item.n} item={item} index={i} accent={section.accent} />
        ))}
      </div>
    </section>
  );
}

// ─── PAGE ───────────────────────────────────────────────────────────────────────

export default function StrategyPage() {
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const [activeSection, setActiveSection] = useState(-1);
  const [scrolled, setScrolled] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const lastYRef = useRef(0);

  useEffect(() => {
    const fn = () => {
      const y = window.scrollY;
      setScrolled(y > 30);
      setHeaderHidden(y > 150 && y > lastYRef.current);
      lastYRef.current = y;
      let found = -1;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.getBoundingClientRect().top <= 140) {
          found = i;
          break;
        }
      }
      setActiveSection(found);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div style={{ background: "#00080D", minHeight: "100vh", position: "relative" }}>
      {/* Scroll progress bar */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "2px",
          width: progressWidth,
          background: "linear-gradient(90deg, #5D55F0, #18CC90)",
          zIndex: 60,
          pointerEvents: "none",
        }}
      />

      {/* Side nav */}
      <nav
        style={{
          position: "fixed",
          right: "32px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 40,
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
        className="hidden xl:flex"
      >
        {sections.map((s, i) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            title={s.title}
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            <span
              style={{
                display: "block",
                height: "6px",
                width: activeSection === i ? "22px" : "6px",
                borderRadius: "3px",
                background: activeSection === i ? s.accent : "rgba(255,255,255,0.18)",
                transition: "all 0.3s ease",
              }}
            />
          </a>
        ))}
      </nav>

      {/* Header */}
      <motion.header
        animate={{ y: headerHidden ? -80 : 0, opacity: headerHidden ? 0 : 1 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="site-header"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: "68px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 48px",
          background: scrolled ? "rgba(0,8,13,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
          transition: "background 0.4s, border-color 0.4s",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "16px", fontWeight: 600, color: "#FFFFFF", letterSpacing: "-0.01em" }}>
            binderr
          </span>
          <span
            style={{
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: PURPLE,
              background: `${PURPLE}15`,
              border: `1px solid ${PURPLE}25`,
              padding: "3px 10px",
              borderRadius: "100px",
            }}
          >
            Strategy
          </span>
        </div>

        {/* Nav */}
        <div
          style={{ display: "flex", alignItems: "center", gap: "32px" }}
          className="hidden md:flex"
        >
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              style={{
                fontSize: "13px",
                fontWeight: 400,
                color: "rgba(127,146,173,0.65)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#fff")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(127,146,173,0.65)")}
            >
              {s.title}
            </a>
          ))}
        </div>

        {/* CTA button */}
        <a
          href="#purpose"
          className="hidden md:inline-flex"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "13px",
            fontWeight: 500,
            color: "#fff",
            background: "linear-gradient(94deg, #5D55F0 3.64%, #35318A 148.92%)",
            padding: "8px 18px",
            borderRadius: "12px",
            textDecoration: "none",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
        >
          View Framework
        </a>
      </motion.header>

      {/* ── HERO ── */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          paddingTop: "68px",
        }}
      >
        {/* Background: top purple glow */}
        <div
          style={{
            position: "absolute",
            top: "-200px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "900px",
            height: "900px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(93,85,240,0.2) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        {/* Background: bottom-right teal glow */}
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            right: "-100px",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(24,204,144,0.09) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            backgroundImage: `
              linear-gradient(rgba(93,85,240,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(93,85,240,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(ellipse 75% 75% at 50% 50%, black 30%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 75% 75% at 50% 50%, black 30%, transparent 100%)",
          }}
        />

        <motion.div
          style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 24px", maxWidth: "860px", width: "100%" }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "44px",
              padding: "8px 18px",
              borderRadius: "100px",
              background: "rgba(93,85,240,0.1)",
              border: "1px solid rgba(93,85,240,0.22)",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: TEAL,
                flexShrink: 0,
                animation: "pulse 2s infinite",
              }}
            />
            <span
              style={{
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#7F92AD",
              }}
            >
              Confidential · Strategy Framework 2026
            </span>
          </motion.div>

          {/* Main headline */}
          <h1
            style={{
              fontSize: "clamp(50px, 9vw, 88px)",
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: "#FFFFFF",
              marginBottom: "28px",
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

          {/* Subheadline */}
          <p
            style={{
              fontSize: "18px",
              fontWeight: 400,
              color: "#7F92AD",
              lineHeight: 1.65,
              maxWidth: "520px",
              margin: "0 auto 56px",
            }}
          >
            We build trusted infrastructure so businesses can expand anywhere.
            21 strategic answers that define how we get there.
          </p>

          {/* Stats row */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "48px",
              marginBottom: "52px",
            }}
          >
            {[
              { val: "70,000+", label: "Verified Users", color: PURPLE },
              { val: "21", label: "Strategic Answers", color: TEAL },
              { val: "6", label: "Core Pillars", color: PURPLE },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                style={{ textAlign: "center" }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
              >
                <div
                  style={{
                    fontSize: "28px",
                    fontWeight: 600,
                    color: s.color,
                    letterSpacing: "-0.01em",
                    marginBottom: "4px",
                  }}
                >
                  {s.val}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: "0.16em",
                    color: "rgba(127,146,173,0.45)",
                  }}
                >
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <motion.a
              href="#purpose"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "14px 28px",
                borderRadius: "12px",
                background: "linear-gradient(94deg, #5D55F0 3.64%, #35318A 148.92%)",
                color: "#fff",
                fontSize: "15px",
                fontWeight: 500,
                textDecoration: "none",
                boxShadow: "0 0 48px rgba(93,85,240,0.35)",
              }}
              whileHover={{ scale: 1.03, boxShadow: "0 0 64px rgba(93,85,240,0.5)" }}
              whileTap={{ scale: 0.97 }}
            >
              Explore Framework
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M3 8h10M8 3l5 5-5 5" />
              </svg>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          style={{
            position: "absolute",
            bottom: "36px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
          }}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        >
          <span
            style={{
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(127,146,173,0.3)",
            }}
          >
            Scroll
          </span>
          <div
            style={{
              width: "1px",
              height: "32px",
              background: "linear-gradient(180deg, rgba(93,85,240,0.6), transparent)",
            }}
          />
        </motion.div>
      </section>

      {/* ── CONTENT ── */}
      <main
        className="main-content"
        style={{
          maxWidth: "1024px",
          margin: "0 auto",
          padding: "0 40px 120px",
          position: "relative",
        }}
      >
        {/* Decorative background orbs within content */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            right: "-200px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(93,85,240,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "45%",
            left: "-200px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(24,204,144,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "75%",
            right: "-150px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(93,85,240,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {sections.map((s) => (
          <Section key={s.id} section={s} />
        ))}
      </main>

      {/* ── CLOSING STATEMENT ── */}
      <div
        style={{
          position: "relative",
          padding: "112px 24px",
          overflow: "hidden",
          borderTop: "1px solid rgba(93,85,240,0.15)",
          borderBottom: "1px solid rgba(93,85,240,0.15)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse 70% 80% at 50% 50%, rgba(93,85,240,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", maxWidth: "760px", margin: "0 auto", textAlign: "center" }}>
          <p
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: TEAL,
              marginBottom: "24px",
            }}
          >
            The Thesis
          </p>
          <p
            style={{
              fontSize: "clamp(26px, 4vw, 42px)",
              fontWeight: 500,
              color: "#FFFFFF",
              lineHeight: 1.25,
              letterSpacing: "-0.02em",
            }}
          >
            Those who join early gain{" "}
            <span
              style={{
                backgroundImage: `linear-gradient(94deg, ${PURPLE} 0%, ${TEAL} 100%)`,
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
      <footer
        style={{
          padding: "40px 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid rgba(255,255,255,0.04)",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <span style={{ fontSize: "14px", fontWeight: 600, color: "rgba(255,255,255,0.15)" }}>binderr</span>
        <span
          style={{
            fontSize: "11px",
            fontWeight: 400,
            color: "rgba(127,146,173,0.2)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          © 2026 · Confidential · Do Not Distribute
        </span>
      </footer>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @media (max-width: 768px) {
          main { padding: 0 20px 80px !important; }
          header { padding: 0 20px !important; }
        }
      `}</style>
    </div>
  );
}
