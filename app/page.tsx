"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

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
        a: "Starting and operating a business globally is fragmented, slow, and trust-constrained - Binderr removes friction, reduces risk, and compresses weeks of operational setup into a single streamlined experience.",
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
        a: "The future is not individual providers competing for clients - it's infrastructure platforms owning distribution, trust, and onboarding at scale.",
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
        a: "Early provider onboarding, verified compliance user base, and qualified inbound demand generation - 70,000+ verified users and growing.",
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
      },
      {
        n: "13",
        q: "What we will never do",
        a: "Become a generic directory or sacrifice trust and quality for short-term growth.",
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
          "Expansion into 3-5 new key jurisdictions",
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
        a: "Binderr is becoming the infrastructure layer for global business operations - those who join early gain disproportionate access, growth, and opportunity.",
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
  bullets?: string[];
};

// ─── HOOK ──────────────────────────────────────────────────────────────────────

function useInView(threshold = 0.06) {
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

// ─── Q&A ROW ───────────────────────────────────────────────────────────────────

function QARow({ item, index }: { item: Item; index: number }) {
  const { ref, visible } = useInView();

  return (
    <motion.div
      ref={ref}
      className="qa-row"
      initial={{ opacity: 0, y: 10 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.055, ease: [0.16, 1, 0.3, 1] }}
      style={{ display: "flex", gap: "32px", padding: "28px 0", position: "relative" }}
    >
      {/* Number */}
      <span className="qa-num" style={{
        fontSize: "22px", fontWeight: 500, letterSpacing: "-0.01em",
        color: item.highlight ? "rgba(93,85,240,1)" : "rgba(93,85,240,0.75)",
        flexShrink: 0, width: "44px", paddingTop: "1px",
        fontVariantNumeric: "tabular-nums", lineHeight: 1,
      }}>
        {item.n}
      </span>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>

        {/* Question */}
        <p className="qa-q" style={{
          fontSize: "11px", fontWeight: 500,
          letterSpacing: "0.07em", textTransform: "uppercase",
          color: "#5A7A95", lineHeight: 1.4, marginBottom: "8px",
        }}>
          {item.q}
        </p>

        {/* Answer */}
        {item.big ? (
          <p className="qa-answer" style={{
            fontSize: "clamp(17px, 2.2vw, 22px)", fontWeight: 500,
            color: "#F0F4F8", lineHeight: 1.5, letterSpacing: "-0.01em",
          }}>
            {item.a}
          </p>
        ) : item.bullets ? (
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
            {item.bullets.map((b, i) => (
              <li key={i} className="qa-answer" style={{
                display: "flex", alignItems: "flex-start", gap: "10px",
                fontSize: "15px", fontWeight: 400, color: "#C2D4E4", lineHeight: 1.65,
              }}>
                <span style={{
                  marginTop: "9px", width: "3px", height: "3px",
                  borderRadius: "50%", background: "rgba(93,85,240,0.6)", flexShrink: 0,
                }} />
                {b}
              </li>
            ))}
          </ul>
        ) : (
          <p className="qa-answer" style={{
            fontSize: "16px", fontWeight: 400,
            color: item.highlight ? "#D8E8F4" : "#C2D4E4",
            lineHeight: 1.7,
          }}>
            {item.a}
          </p>
        )}
      </div>
    </motion.div>
  );
}

// ─── SECTION ───────────────────────────────────────────────────────────────────

function Section({ section }: { section: (typeof SECTIONS)[0] }) {
  const { ref, visible } = useInView(0.04);

  return (
    <section ref={ref} id={section.id} className="section-block" style={{ marginBottom: "88px", scrollMarginTop: "148px" }}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="section-title-wrap">
          <h2 className="section-title" style={{
            fontSize: "clamp(20px, 3vw, 30px)", fontWeight: 500,
            color: "#F0F4F8", letterSpacing: "-0.02em", lineHeight: 1,
          }}>
            {section.title}
          </h2>
        </div>
      </motion.div>

      <div>
        {section.items.map((item, i) => (
          <QARow key={item.n} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}

// ─── PAGE ───────────────────────────────────────────────────────────────────────

export default function Page() {
  const [activeIdx, setActiveIdx] = useState(-1);
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const fn = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setPastHero(y > window.innerHeight * 0.6);
      let found = -1;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.getBoundingClientRect().top <= 100) { found = i; break; }
      }
      setActiveIdx(found);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div style={{ background: "#00080D", minHeight: "100vh" }}>

      {/* Side nav dots — desktop only */}
      <nav className="hidden xl:flex" style={{
        position: "fixed", right: "28px", top: "50%",
        transform: "translateY(-50%)", zIndex: 40,
        flexDirection: "column", gap: "10px",
      }}>
        {SECTIONS.map((s, i) => (
          <a key={s.id} href={`#${s.id}`} title={s.title} style={{ display: "flex", alignItems: "center" }}>
            <span style={{
              display: "block", height: "5px",
              width: activeIdx === i ? "20px" : "5px", borderRadius: "3px",
              background: activeIdx === i ? "rgba(93,85,240,0.7)" : "rgba(255,255,255,0.1)",
              transition: "all 0.3s ease",
            }} />
          </a>
        ))}
      </nav>

      {/* Mobile bottom section nav */}
      <div className="mobile-nav" style={{
        display: "none",
        position: "fixed", bottom: "20px", left: "50%",
        transform: `translateX(-50%) translateY(${pastHero ? "0" : "80px"})`,
        zIndex: 50, alignItems: "center", gap: "6px",
        background: "rgba(5,12,20,0.92)",
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.09)",
        borderRadius: "100px", padding: "10px 18px",
        transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
        whiteSpace: "nowrap",
      }}>
        {SECTIONS.map((s, i) => (
          <a key={s.id} href={`#${s.id}`} style={{
            display: "block",
            width: activeIdx === i ? "16px" : "5px", height: "5px",
            borderRadius: "3px",
            background: activeIdx === i ? "rgba(93,85,240,0.85)" : "rgba(255,255,255,0.18)",
            transition: "all 0.3s ease", flexShrink: 0,
          }} />
        ))}
        {activeIdx >= 0 && (
          <span style={{
            fontSize: "12px", fontWeight: 500,
            color: "rgba(240,244,248,0.65)", letterSpacing: "-0.01em",
            paddingLeft: "6px",
          }}>
            {SECTIONS[activeIdx].title}
          </span>
        )}
      </div>

      {/* Header */}
      <header
        className="page-header sticky-header"
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          height: "148px", display: "flex", alignItems: "center",
          justifyContent: "space-between", padding: "0 48px",
          background: scrolled ? "rgba(0,8,13,0.97)" : "rgba(0,8,13,0.5)",
          backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
          transition: "background 0.4s",
        }}
      >
        <img src="/logo.png" alt="Binderr" className="header-logo" style={{ height: "148px", width: "auto" }} />

        {/* Nav pill — desktop */}
        <div className="hidden md:flex" style={{
          alignItems: "center", gap: "2px",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "100px", padding: "5px",
          backdropFilter: "blur(12px)",
        }}>
          {SECTIONS.map((s, i) => {
            const isActive = activeIdx === i;
            return (
              <a key={s.id} href={`#${s.id}`} style={{
                display: "flex", alignItems: "center", gap: "6px",
                padding: "7px 16px", borderRadius: "100px",
                textDecoration: "none",
                background: isActive ? "rgba(93,85,240,0.18)" : "transparent",
                border: isActive ? "1px solid rgba(93,85,240,0.25)" : "1px solid transparent",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"; }}
              onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >
                <span style={{
                  fontSize: "10px", fontWeight: 500,
                  color: isActive ? "rgba(93,85,240,0.9)" : "rgba(127,146,173,0.35)",
                  letterSpacing: "0.05em", fontVariantNumeric: "tabular-nums", lineHeight: 1,
                }}>
                  {s.index}
                </span>
                <span style={{
                  fontSize: "12px", fontWeight: isActive ? 500 : 400,
                  color: isActive ? "#F0F4F8" : "rgba(127,146,173,0.6)",
                  letterSpacing: "-0.01em", transition: "color 0.25s",
                }}>
                  {s.title}
                </span>
              </a>
            );
          })}
        </div>

        <span style={{ width: "120px" }} className="hidden md:block" />
      </header>

      {/* ── HERO ── */}
      <section className="hero-section" style={{
        position: "relative", minHeight: "100vh",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        overflow: "hidden", paddingTop: "148px",
      }}>
        {/* Top glow */}
        <div style={{
          position: "absolute", top: "-200px", left: "50%",
          transform: "translateX(-50%)",
          width: "700px", height: "700px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(93,85,240,0.13) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />
        {/* Grid */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse 65% 65% at 50% 50%, black 20%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 65% 65% at 50% 50%, black 20%, transparent 100%)",
        }} />

        <motion.div
          className="hero-content"
          style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 24px", maxWidth: "720px", width: "100%" }}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              marginBottom: "32px", padding: "6px 14px",
              borderRadius: "100px",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <span style={{
              width: "5px", height: "5px", borderRadius: "50%",
              background: "rgba(93,85,240,0.7)", flexShrink: 0,
              animation: "pulse 2.5s ease-in-out infinite",
            }} />
            <span style={{
              fontSize: "11px", fontWeight: 500,
              letterSpacing: "0.15em", textTransform: "uppercase",
              color: "rgba(127,146,173,0.55)",
            }}>
              Confidential · Strategy Framework 2026
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="hero-headline" style={{
            fontSize: "clamp(40px, 8vw, 80px)",
            fontWeight: 500, lineHeight: 1.05,
            letterSpacing: "-0.03em", color: "#F0F4F8", marginBottom: "20px",
          }}>
            Connecting the
            <br />
            <span style={{
              backgroundImage: "linear-gradient(94deg, #6B63F5 0%, #4a44b5 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              world of business
            </span>
          </h1>

          <p className="hero-sub" style={{
            fontSize: "17px", fontWeight: 400,
            color: "#7F92AD", lineHeight: 1.7,
            maxWidth: "440px", margin: "0 auto 44px",
          }}>
            We build trusted infrastructure so businesses can expand anywhere.
            21 strategic answers that define how we get there.
          </p>

          {/* Stats */}
          <div style={{
            display: "flex", justifyContent: "center",
            flexWrap: "wrap", gap: "clamp(24px, 6vw, 52px)",
          }}>
            {[
              { val: "70,000+", label: "Verified Users" },
              { val: "21", label: "Strategic Answers" },
              { val: "6", label: "Core Pillars" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                style={{ textAlign: "center" }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 + i * 0.07 }}
              >
                <div className="hero-stat-val" style={{
                  fontSize: "clamp(22px, 5vw, 28px)", fontWeight: 600,
                  color: "#F0F4F8", letterSpacing: "-0.02em", marginBottom: "5px",
                }}>
                  {s.val}
                </div>
                <div style={{
                  fontSize: "11px", fontWeight: 500,
                  textTransform: "uppercase", letterSpacing: "0.16em",
                  color: "rgba(127,146,173,0.45)",
                }}>
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── CONTENT ── */}
      <main
        className="page-main"
        style={{ maxWidth: "760px", margin: "0 auto", padding: "80px 40px 120px" }}
      >
        {SECTIONS.map((s) => (
          <Section key={s.id} section={s} />
        ))}
      </main>

      {/* ── CLOSING ── */}
      <div className="closing-section" style={{ position: "relative", padding: "96px 24px" }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 50% 80% at 50% 50%, rgba(93,85,240,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{ position: "relative", maxWidth: "560px", margin: "0 auto", textAlign: "center" }}>
          <p style={{
            fontSize: "11px", fontWeight: 600,
            letterSpacing: "0.24em", textTransform: "uppercase",
            color: "rgba(93,85,240,0.5)", marginBottom: "20px",
          }}>
            The Thesis
          </p>
          <p className="closing-text" style={{
            fontSize: "clamp(20px, 3vw, 34px)",
            fontWeight: 500, color: "#F0F4F8",
            lineHeight: 1.35, letterSpacing: "-0.02em",
          }}>
            Those who join early gain{" "}
            <span style={{
              backgroundImage: "linear-gradient(94deg, #7B73F8 0%, #4a44b5 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
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
          padding: "24px 48px",
          display: "flex", alignItems: "center",
          justifyContent: "space-between", flexWrap: "wrap", gap: "12px",
        }}
      >
        <span style={{
          fontSize: "11px", color: "rgba(127,146,173,0.25)",
          letterSpacing: "0.1em", textTransform: "uppercase",
        }}>
          © 2026 · Confidential · Do Not Distribute
        </span>
      </footer>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.25; }
        }

        @media (max-width: 767px) {
          /* Header */
          .sticky-header {
            height: 70px !important;
            padding: 0 20px !important;
          }
          .header-logo {
            height: 58px !important;
          }

          /* Mobile bottom nav */
          .mobile-nav {
            display: flex !important;
          }

          /* Hero */
          .hero-section {
            padding-top: 70px !important;
            min-height: 100svh !important;
            padding-bottom: 60px !important;
          }
          .hero-content {
            padding: 0 20px !important;
          }
          .hero-sub {
            font-size: 15px !important;
            margin-bottom: 36px !important;
          }

          /* Content */
          .page-main {
            padding: 52px 20px 100px !important;
          }

          /* Sections */
          .section-block {
            margin-bottom: 52px !important;
            scroll-margin-top: 70px !important;
          }
          .section-title {
            font-size: 19px !important;
          }
          .section-title-wrap {
            padding-bottom: 12px !important;
            margin-bottom: 0 !important;
          }

          /* Q&A rows */
          .qa-row {
            gap: 16px !important;
            padding: 20px 0 !important;
          }
          .qa-num {
            font-size: 16px !important;
            width: 28px !important;
          }
          .qa-q {
            font-size: 10px !important;
            margin-bottom: 6px !important;
          }
          .qa-answer {
            font-size: 14px !important;
            line-height: 1.65 !important;
          }

          /* Closing */
          .closing-section {
            padding: 60px 20px !important;
          }

          /* Footer */
          .page-footer {
            padding: 20px !important;
            justify-content: center !important;
            padding-bottom: 80px !important;
          }
        }
      `}</style>
    </div>
  );
}
