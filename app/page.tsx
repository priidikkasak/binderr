"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// ─── DATA ──────────────────────────────────────────────────────────────────────

const SECTIONS = [
  {
    id: "purpose",
    index: "01",
    title: "Purpose",
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
        q: "Where we're already winning",
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
    items: [
      {
        n: "12",
        q: "What we will always do",
        a: "Prioritize network growth, execution speed, and real provider-client matching that generates measurable economic value.",
        tag: "Always",
        tagType: "positive" as const,
      },
      {
        n: "13",
        q: "What we will never do",
        a: "Become a generic directory or sacrifice trust and quality for short-term growth.",
        tag: "Never",
        tagType: "negative" as const,
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
  tag?: string;
  tagType?: "positive" | "negative";
  stat?: string;
  statLabel?: string;
  bullets?: string[];
};

// ─── HOOK ──────────────────────────────────────────────────────────────────────

function useInView(threshold = 0.07) {
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

function Card({ item, index }: { item: Item; index: number }) {
  const { ref, visible } = useInView();
  const [hovered, setHovered] = useState(false);
  const isWide = item.big || item.highlight;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className={isWide ? "card-wide" : ""}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: "16px",
        border: `1px solid ${
          item.highlight
            ? "rgba(93,85,240,0.25)"
            : hovered
            ? "rgba(255,255,255,0.13)"
            : "rgba(255,255,255,0.07)"
        }`,
        background: item.highlight
          ? "linear-gradient(145deg, rgba(93,85,240,0.07) 0%, rgba(4,10,20,1) 60%)"
          : "#070E18",
        transition: "border-color 0.25s ease, background 0.25s ease",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Subtle top line on hover */}
      <div style={{
        position: "absolute",
        top: 0, left: "20%", right: "20%",
        height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(93,85,240,0.5), transparent)",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.3s ease",
      }} />

      <div style={{ padding: isWide ? "40px 44px" : "36px 36px", display: "flex", flexDirection: "column", flex: 1 }}>

        {/* Top row: number + tag */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
          <span style={{
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.22em",
            color: "rgba(93,85,240,0.6)",
            textTransform: "uppercase",
          }}>
            {item.n}
          </span>

          {item.tag && (
            <span style={{
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: item.tagType === "positive" ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.35)",
              background: item.tagType === "positive" ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              padding: "3px 10px",
              borderRadius: "100px",
            }}>
              {item.tag}
            </span>
          )}
        </div>

        {/* Question */}
        <p style={{
          fontSize: "12px",
          fontWeight: 400,
          color: "#5A7A95",
          lineHeight: 1.5,
          marginBottom: "12px",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}>
          {item.q}
        </p>

        {/* Separator */}
        <div style={{
          height: "1px",
          background: item.highlight
            ? "rgba(93,85,240,0.2)"
            : "rgba(255,255,255,0.05)",
          marginBottom: "20px",
        }} />

        {/* Answer */}
        {item.big ? (
          <p style={{
            fontSize: "clamp(20px, 3vw, 28px)",
            fontWeight: 500,
            color: "#F0F4F8",
            lineHeight: 1.3,
            letterSpacing: "-0.015em",
          }}>
            {item.a}
          </p>
        ) : item.bullets ? (
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
            {item.bullets.map((b, i) => (
              <li key={i} style={{
                display: "flex", alignItems: "flex-start", gap: "12px",
                fontSize: "15px", fontWeight: 400,
                color: "#C2D4E4", lineHeight: 1.6,
              }}>
                <span style={{
                  marginTop: "9px", width: "4px", height: "4px",
                  borderRadius: "50%", background: "rgba(93,85,240,0.5)", flexShrink: 0,
                }} />
                {b}
              </li>
            ))}
          </ul>
        ) : (
          <p style={{
            fontSize: "16px",
            fontWeight: 400,
            color: "#C2D4E4",
            lineHeight: 1.7,
            flex: 1,
          }}>
            {item.a}
          </p>
        )}

        {/* Stat */}
        {item.stat && (
          <div style={{ marginTop: "28px", display: "flex", alignItems: "baseline", gap: "10px" }}>
            <span style={{
              fontSize: "42px",
              fontWeight: 600,
              color: "#F0F4F8",
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}>
              {item.stat}
            </span>
            <span style={{
              fontSize: "11px",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: "#5A7A95",
            }}>
              {item.statLabel}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── SECTION ───────────────────────────────────────────────────────────────────

function Section({ section }: { section: (typeof SECTIONS)[0] }) {
  const { ref, visible } = useInView(0.04);

  return (
    <section ref={ref} id={section.id} style={{ marginBottom: "128px", scrollMarginTop: "96px" }}>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        style={{ marginBottom: "36px", position: "relative" }}
      >
        {/* Ghost watermark */}
        <span style={{
          position: "absolute",
          top: "-12px",
          left: "-3px",
          fontSize: "clamp(72px, 12vw, 130px)",
          fontWeight: 700,
          color: "rgba(93,85,240,0.04)",
          lineHeight: 1,
          letterSpacing: "-0.04em",
          userSelect: "none",
          pointerEvents: "none",
          whiteSpace: "nowrap",
        }}>
          {section.title}
        </span>

        <div style={{ position: "relative" }}>
          {/* Index + line */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "10px" }}>
            <span style={{
              fontSize: "11px", fontWeight: 600,
              letterSpacing: "0.26em", textTransform: "uppercase",
              color: "rgba(93,85,240,0.5)",
            }}>
              {section.index}
            </span>
            <div style={{
              flex: 1, height: "1px",
              background: "rgba(255,255,255,0.06)",
            }} />
          </div>

          <h2 style={{
            fontSize: "clamp(28px, 4vw, 40px)",
            fontWeight: 500,
            color: "#F0F4F8",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}>
            {section.title}
          </h2>
        </div>
      </motion.div>

      <div className="card-grid">
        {section.items.map((item, i) => (
          <Card key={item.n} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}

// ─── PAGE ───────────────────────────────────────────────────────────────────────

export default function Page() {
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const [activeIdx, setActiveIdx] = useState(-1);
  const [scrolled, setScrolled] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const lastYRef = useRef(0);

  useEffect(() => {
    const fn = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHeaderHidden(y > 180 && y > lastYRef.current);
      lastYRef.current = y;
      let found = -1;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.getBoundingClientRect().top <= 130) { found = i; break; }
      }
      setActiveIdx(found);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div style={{ background: "#00080D", minHeight: "100vh" }}>
      {/* Progress bar */}
      <motion.div style={{
        position: "fixed", top: 0, left: 0, height: "1px",
        width: progressWidth,
        background: "linear-gradient(90deg, #5D55F0, rgba(93,85,240,0.3))",
        zIndex: 60, pointerEvents: "none",
      }} />

      {/* Side nav */}
      <nav className="hidden xl:flex" style={{
        position: "fixed", right: "28px", top: "50%",
        transform: "translateY(-50%)", zIndex: 40,
        flexDirection: "column", gap: "10px",
      }}>
        {SECTIONS.map((s, i) => (
          <a key={s.id} href={`#${s.id}`} title={s.title} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{
              display: "block",
              height: "5px",
              width: activeIdx === i ? "20px" : "5px",
              borderRadius: "3px",
              background: activeIdx === i ? "rgba(93,85,240,0.8)" : "rgba(255,255,255,0.12)",
              transition: "all 0.3s ease",
            }} />
          </a>
        ))}
      </nav>

      {/* Header */}
      <motion.header
        className="page-header"
        animate={{ y: headerHidden ? -72 : 0, opacity: headerHidden ? 0 : 1 }}
        transition={{ duration: 0.22, ease: "easeInOut" }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          height: "64px", display: "flex", alignItems: "center",
          justifyContent: "space-between", padding: "0 48px",
          background: scrolled ? "rgba(0,8,13,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "1px solid transparent",
          transition: "background 0.4s, border-color 0.4s",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "15px", fontWeight: 600, color: "#F0F4F8", letterSpacing: "-0.01em" }}>
            binderr
          </span>
          <span style={{
            fontSize: "10px", fontWeight: 500, letterSpacing: "0.16em",
            textTransform: "uppercase", color: "rgba(93,85,240,0.7)",
            background: "rgba(93,85,240,0.08)", border: "1px solid rgba(93,85,240,0.15)",
            padding: "3px 9px", borderRadius: "100px",
          }}>
            Strategy
          </span>
        </div>

        <div className="hidden md:flex" style={{ alignItems: "center", gap: "24px" }}>
          {SECTIONS.map((s) => (
            <a key={s.id} href={`#${s.id}`} style={{
              fontSize: "13px", fontWeight: 400,
              color: "rgba(127,146,173,0.55)", textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "rgba(240,244,248,0.9)")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(127,146,173,0.55)")}
            >
              {s.title}
            </a>
          ))}
        </div>

        <a href="#purpose" className="hidden md:inline-flex" style={{
          alignItems: "center", gap: "8px",
          fontSize: "13px", fontWeight: 500, color: "#fff",
          background: "linear-gradient(94deg, #5D55F0 3.64%, #35318A 148.92%)",
          padding: "7px 16px", borderRadius: "10px",
          textDecoration: "none", transition: "opacity 0.2s",
        }}
        onMouseEnter={e => (e.currentTarget.style.opacity = "0.8")}
        onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
        >
          View Framework
        </a>
      </motion.header>

      {/* ── HERO ── */}
      <section style={{
        position: "relative", minHeight: "100vh",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        overflow: "hidden", paddingTop: "64px",
      }}>
        {/* Single subtle purple glow top-center */}
        <div style={{
          position: "absolute", top: "-300px", left: "50%",
          transform: "translateX(-50%)",
          width: "800px", height: "800px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(93,85,240,0.14) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />

        {/* Grid */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 100%)",
        }} />

        <motion.div
          style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 24px", maxWidth: "800px", width: "100%" }}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              marginBottom: "48px", padding: "7px 16px",
              borderRadius: "100px",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <span style={{
              width: "5px", height: "5px", borderRadius: "50%",
              background: "rgba(93,85,240,0.8)", flexShrink: 0,
              animation: "pulse 2.5s ease-in-out infinite",
            }} />
            <span style={{
              fontSize: "11px", fontWeight: 500,
              letterSpacing: "0.16em", textTransform: "uppercase",
              color: "rgba(127,146,173,0.6)",
            }}>
              Confidential · Strategy Framework 2026
            </span>
          </motion.div>

          {/* Headline */}
          <h1 style={{
            fontSize: "clamp(48px, 8.5vw, 84px)",
            fontWeight: 500,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: "#F0F4F8",
            marginBottom: "28px",
          }}>
            Connecting the
            <br />
            <span style={{
              backgroundImage: "linear-gradient(94deg, #5D55F0 0%, rgba(93,85,240,0.6) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              world of business
            </span>
          </h1>

          <p style={{
            fontSize: "18px", fontWeight: 400,
            color: "#7F92AD",
            lineHeight: 1.7, maxWidth: "480px",
            margin: "0 auto 56px",
          }}>
            We build trusted infrastructure so businesses can expand anywhere.
            21 strategic answers that define how we get there.
          </p>

          {/* Stats */}
          <div style={{
            display: "flex", justifyContent: "center",
            flexWrap: "wrap", gap: "56px", marginBottom: "52px",
          }}>
            {[
              { val: "70,000+", label: "Verified Users" },
              { val: "21", label: "Strategic Answers" },
              { val: "6", label: "Core Pillars" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                style={{ textAlign: "center" }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
              >
                <div style={{
                  fontSize: "30px", fontWeight: 600,
                  color: "#F0F4F8", letterSpacing: "-0.02em", marginBottom: "4px",
                }}>
                  {s.val}
                </div>
                <div style={{
                  fontSize: "11px", fontWeight: 500,
                  textTransform: "uppercase", letterSpacing: "0.16em",
                  color: "rgba(127,146,173,0.55)",
                }}>
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.a
            href="#purpose"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              padding: "13px 28px", borderRadius: "12px",
              background: "linear-gradient(94deg, #5D55F0 3.64%, #35318A 148.92%)",
              color: "#fff", fontSize: "15px", fontWeight: 500,
              textDecoration: "none",
              boxShadow: "0 0 40px rgba(93,85,240,0.25), 0 1px 0 rgba(255,255,255,0.1) inset",
            }}
            whileHover={{ scale: 1.02, boxShadow: "0 0 56px rgba(93,85,240,0.4), 0 1px 0 rgba(255,255,255,0.1) inset" }}
            whileTap={{ scale: 0.98 }}
          >
            Explore Framework
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
              <path d="M3 7.5h9M8 3l4.5 4.5L8 12" />
            </svg>
          </motion.a>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          style={{
            position: "absolute", bottom: "32px", left: "50%",
            transform: "translateX(-50%)",
            display: "flex", flexDirection: "column",
            alignItems: "center", gap: "6px",
          }}
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
        >
          <span style={{
            fontSize: "10px", fontWeight: 400,
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: "rgba(127,146,173,0.25)",
          }}>scroll</span>
          <div style={{
            width: "1px", height: "28px",
            background: "linear-gradient(180deg, rgba(93,85,240,0.4), transparent)",
          }} />
        </motion.div>
      </section>

      {/* ── CONTENT ── */}
      <main
        className="page-main"
        style={{
          maxWidth: "960px", margin: "0 auto",
          padding: "80px 40px 120px",
          position: "relative",
        }}
      >
        {/* Single very subtle bg orb for depth */}
        <div style={{
          position: "absolute", top: "30%", right: "-300px",
          width: "600px", height: "600px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(93,85,240,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {SECTIONS.map((s) => (
          <Section key={s.id} section={s} />
        ))}
      </main>

      {/* ── CLOSING ── */}
      <div style={{
        position: "relative", padding: "100px 24px",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(93,85,240,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{ position: "relative", maxWidth: "640px", margin: "0 auto", textAlign: "center" }}>
          <p style={{
            fontSize: "11px", fontWeight: 600,
            letterSpacing: "0.26em", textTransform: "uppercase",
            color: "rgba(93,85,240,0.6)", marginBottom: "20px",
          }}>
            The Thesis
          </p>
          <p style={{
            fontSize: "clamp(24px, 3.5vw, 38px)",
            fontWeight: 500, color: "#F0F4F8",
            lineHeight: 1.25, letterSpacing: "-0.02em",
          }}>
            Those who join early gain{" "}
            <span style={{
              backgroundImage: "linear-gradient(94deg, #7B73F8 0%, rgba(93,85,240,0.75) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              disproportionate access,
            </span>{" "}
            growth, and opportunity.
          </p>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer
        className="page-footer"
        style={{
          padding: "32px 48px",
          display: "flex", alignItems: "center",
          justifyContent: "space-between", flexWrap: "wrap", gap: "12px",
          borderTop: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <span style={{ fontSize: "14px", fontWeight: 600, color: "rgba(255,255,255,0.3)" }}>
          binderr
        </span>
        <span style={{
          fontSize: "11px", color: "rgba(127,146,173,0.3)",
          letterSpacing: "0.1em", textTransform: "uppercase",
        }}>
          © 2026 · Confidential · Do Not Distribute
        </span>
      </footer>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
