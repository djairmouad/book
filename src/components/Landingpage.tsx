import { useState, useRef, useEffect} from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  FiBookOpen,
  FiUpload,
  FiCheckCircle,
  FiShoppingCart,
  FiTruck,
  FiPercent,
  FiUsers,
  FiGlobe,
  FiShield,
  FiMail,
  FiPhone,
  FiMapPin,
  FiStar,
  FiArrowRight,
  FiArrowLeft,
  FiMenu,
  FiX,
  FiSun,
  FiMoon,
} from "react-icons/fi";

/* ═══════════════════════════════════════════════════
   DESIGN: Scandinavian Warm Minimalism
   
   Cream canvas, espresso typography, terracotta accent,
   soft rounded shapes, generous negative space,
   Cormorant Garamond + DM Sans font pairing
   ═══════════════════════════════════════════════════ */

/* ─── Theme ─── */
const useTheme = () => {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    try { return (localStorage.getItem("wrq-th") as "light" | "dark") || "light"; } catch { return "light"; }
  });
  useEffect(() => {
    try { localStorage.setItem("wrq-th", theme); } catch {}
  }, [theme]);
  return { theme, dk: theme === "dark", toggle: () => setTheme((p) => (p === "dark" ? "light" : "dark")) };
};

/* ─── Palette ─── */
const C = {
  // Light
  cream: "#faf7f2",
  warmWhite: "#f5f0e8",
  sand: "#ede6d8",
  espresso: "#2c2418",
  espressoSoft: "#4a3f30",
  textBody: "#6b5e4d",
  terracotta: "#c4724e",
  terracottaHover: "#b3613d",
  terracottaFaint: "rgba(196,114,78,0.08)",
  terracottaGlow: "rgba(196,114,78,0.12)",
  border: "rgba(44,36,24,0.08)",
  // Dark
  dBg: "#1a1714",
  dCard: "#231f1a",
  dSurface: "#2c271f",
  dBorder: "rgba(250,247,242,0.07)",
  dText: "#f0ebe2",
  dTextSoft: "rgba(240,235,226,0.6)",
  dTextMuted: "rgba(240,235,226,0.3)",
};

/* ─── Reveal on scroll ─── */
function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Section heading ─── */
function Heading({ title, sub, dk }: { title: string; sub?: string; dk: boolean }) {
  return (
    <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
      <Reveal>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', 'Amiri', serif",
          fontSize: "clamp(1.8rem, 4.5vw, 2.8rem)",
          fontWeight: 600,
          color: dk ? C.dText : C.espresso,
          lineHeight: 1.2,
          letterSpacing: "-0.02em",
        }}>
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.08}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            color: dk ? C.dTextSoft : C.textBody,
            fontSize: "1rem",
            maxWidth: "34rem",
            margin: "1rem auto 0",
            lineHeight: 1.75,
            fontWeight: 400,
          }}>
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ─── 3D Interactive Book — Premium Edition ─── */
function HeroBook({ dk }: { dk: boolean }) {
  const [hovered, setHovered] = useState(false);

  const W = 200;
  const H = 280;
  const SPINE = 26;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        perspective: "1200px",
        width: `${W + 80}px`,
        height: `${H + 40}px`,
        margin: "0 auto 2rem",
        position: "relative",
        cursor: "default",
      }}
    >
      {/* Shadow */}
      <motion.div
        animate={{
          scaleX: hovered ? 1.2 : 1.1,
          opacity: dk ? (hovered ? 0.25 : 0.2) : (hovered ? 0.15 : 0.1),
        }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: W,
          height: 20,
          borderRadius: "50%",
          background: dk ? "rgba(0,0,0,0.6)" : "rgba(44,36,24,0.3)",
          filter: "blur(4px)",
          zIndex: 1,
        }}
      />

      {/* Book container */}
      <motion.div
        animate={{
          y: hovered ? -8 : 0,
          rotateY: hovered ? -5 : 0,
          rotateX: hovered ? 2 : 0,
        }}
        transition={{ duration: 0.4 }}
        style={{
          position: "relative",
          width: W,
          height: H,
          margin: "0 auto",
          transformStyle: "preserve-3d",
          transform: `rotateY(-10deg) rotateX(2deg)`,
          zIndex: 10,
        }}
      >
        {/* Front Cover - The main visible cover */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            borderRadius: "4px 12px 12px 4px",
            background: "linear-gradient(165deg, #6d4528 0%, #5c3920 30%, #4d2f1a 60%, #3f2514 100%)",
            boxShadow: dk
              ? "8px 8px 25px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)"
              : "8px 8px 25px rgba(44,36,24,0.25), inset 0 1px 0 rgba(255,255,255,0.2)",
            overflow: "hidden",
            zIndex: 30,
            transform: "translateZ(5px)",
          }}
        >
          {/* Spine */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              width: SPINE,
              background: "linear-gradient(90deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 30%, rgba(255,255,215,0.1) 60%, rgba(0,0,0,0.1) 100%)",
            }}
          />

          {/* Decorative spine lines */}
          {[20, 40, 60, 80].map((pos) => (
            <div
              key={pos}
              style={{
                position: "absolute",
                top: `${pos}%`,
                left: 8,
                width: SPINE - 16,
                height: 1,
                background: "rgba(196,155,78,0.3)",
              }}
            />
          ))}

          {/* Gold frame */}
          <div
            style={{
              position: "absolute",
              top: 15,
              left: SPINE + 10,
              right: 15,
              bottom: 15,
              border: "1px solid rgba(196,155,78,0.3)",
              borderRadius: 4,
            }}
          />

          {/* Inner frame */}
          <div
            style={{
              position: "absolute",
              top: 25,
              left: SPINE + 20,
              right: 25,
              bottom: 25,
              border: "1px solid rgba(196,155,78,0.15)",
              borderRadius: 2,
            }}
          />

          {/* Cover content */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: SPINE + 10,
              right: 10,
              transform: "translateY(-50%)",
              textAlign: "center",
              color: "#d4b678",
            }}
          >
            {/* Decorative line */}
            <svg width="120" height="8" viewBox="0 0 120 8" style={{ margin: "0 auto 15px", opacity: 0.4 }}>
              <line x1="20" y1="4" x2="45" y2="4" stroke="#c49b4e" strokeWidth="0.8" />
              <rect x="50" y="2" width="20" height="4" rx="1" fill="none" stroke="#c49b4e" strokeWidth="0.8" />
              <line x1="75" y1="4" x2="100" y2="4" stroke="#c49b4e" strokeWidth="0.8" />
            </svg>

            <h1 style={{
              fontFamily: "'Amiri', serif",
              fontSize: "2rem",
              fontWeight: 700,
              color: "#d4b678",
              textShadow: "0 2px 4px rgba(0,0,0,0.4)",
              margin: 0,
              lineHeight: 1.2,
            }}>
              وَرَقة
            </h1>

            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(212,182,120,0.5)",
              marginTop: 5,
            }}>
              WARAKA
            </p>

            {/* Decorative line */}
            <svg width="120" height="8" viewBox="0 0 120 8" style={{ margin: "15px auto 0", opacity: 0.4 }}>
              <line x1="20" y1="4" x2="45" y2="4" stroke="#c49b4e" strokeWidth="0.8" />
              <circle cx="60" cy="4" r="3" fill="none" stroke="#c49b4e" strokeWidth="0.8" />
              <line x1="75" y1="4" x2="100" y2="4" stroke="#c49b4e" strokeWidth="0.8" />
            </svg>
          </div>

          {/* Bottom ornament */}
          <div style={{
            position: "absolute",
            bottom: 20,
            left: SPINE + 10,
            right: 10,
            textAlign: "center",
            opacity: 0.2,
          }}>
            <svg width="40" height="40" viewBox="0 0 40 40">
              <circle cx="20" cy="20" r="16" stroke="#c49b4e" strokeWidth="0.6" fill="none" />
              <circle cx="20" cy="20" r="10" stroke="#c49b4e" strokeWidth="0.6" fill="none" />
              <circle cx="20" cy="20" r="4" fill="#c49b4e" />
            </svg>
          </div>

          {/* Leather texture */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(0,0,0,0.02) 4px, rgba(0,0,0,0.02) 8px)",
            pointerEvents: "none",
          }} />
        </div>

        {/* Pages - simple representation */}
        <div
          style={{
            position: "absolute",
            width: W - SPINE - 8,
            height: H - 10,
            top: 5,
            left: SPINE + 4,
            background: "linear-gradient(145deg, #f5ecd8 0%, #ede2cc 100%)",
            borderRadius: "0 8px 8px 0",
            boxShadow: "inset -2px 0 5px rgba(0,0,0,0.05)",
            transform: "translateZ(2px)",
            zIndex: 20,
          }}
        >
          {/* Page lines */}
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: 20,
                right: 20,
                top: 30 + i * 20,
                height: 2,
                background: `rgba(139,107,74,${0.03 + i * 0.01})`,
                borderRadius: 1,
              }}
            />
          ))}
        </div>

        {/* Back Cover */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            borderRadius: "4px 12px 12px 4px",
            background: "linear-gradient(165deg, #4a3420 0%, #3a2816 100%)",
            transform: "translateZ(-10px)",
            boxShadow: dk ? "0 5px 15px rgba(0,0,0,0.5)" : "0 5px 15px rgba(44,36,24,0.2)",
            zIndex: 15,
          }}
        />
      </motion.div>
    </motion.div>
  );
}
/* ═══════════════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════════════ */
export default function LandingPage() {
  const { t, i18n } = useTranslation();
  const {  dk, toggle } = useTheme();
  const isRtl = i18n.language === "ar";

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const langRef = useRef<HTMLDivElement>(null);

  const arrow = isRtl ? <FiArrowLeft size={16} /> : <FiArrowRight size={16} />;

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const ids = ["hero", "how-it-works", "catalog", "features", "testimonials", "contact"];
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const h = (e: MouseEvent) => { if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const changeLang = (lng: string) => { i18n.changeLanguage(lng); setLangOpen(false); };

  /* ── Data ── */
  const navLinks = [
    { label: t("nav.home"), href: "#hero", id: "hero" },
    { label: t("nav.howItWorks"), href: "#how-it-works", id: "how-it-works" },
    { label: t("nav.books"), href: "#catalog", id: "catalog" },
    { label: t("nav.features"), href: "#features", id: "features" },
    { label: t("nav.testimonials"), href: "#testimonials", id: "testimonials" },
    { label: t("nav.contact"), href: "#contact", id: "contact" },
  ];

  const steps = [
    { icon: <FiUpload size={24} />, title: t("howItWorks.steps.1.title"), desc: t("howItWorks.steps.1.description"), num: "01" },
    { icon: <FiBookOpen size={24} />, title: t("howItWorks.steps.2.title"), desc: t("howItWorks.steps.2.description"), num: "02" },
    { icon: <FiCheckCircle size={24} />, title: t("howItWorks.steps.3.title"), desc: t("howItWorks.steps.3.description"), num: "03" },
    { icon: <FiShoppingCart size={24} />, title: t("howItWorks.steps.4.title"), desc: t("howItWorks.steps.4.description"), num: "04" },
  ];

  const books = [
    { title: "ظلال الروح", author: "أحمد بن سعيد", price: "1200 د.ج", year: 2024, bg: "#3d2e1f" },
    { title: "نبض القلم", author: "فاطمة الزهراء", price: "950 د.ج", year: 2023, bg: "#2e3d2a" },
    { title: "عبور الصمت", author: "كريم بوزيد", price: "1100 د.ج", year: 2024, bg: "#3d2a2e" },
    { title: "حروف من نور", author: "سارة مقراني", price: "850 د.ج", year: 2023, bg: "#2a2e3d" },
  ];

  const features = [
    { icon: <FiTruck size={22} />, title: t("features.list.shipping.title"), desc: t("features.list.shipping.description") },
    { icon: <FiPercent size={22} />, title: t("features.list.commission.title"), desc: t("features.list.commission.description") },
    { icon: <FiUsers size={22} />, title: t("features.list.community.title"), desc: t("features.list.community.description") },
    { icon: <FiGlobe size={22} />, title: t("features.list.reach.title"), desc: t("features.list.reach.description") },
    { icon: <FiShield size={22} />, title: t("features.list.security.title"), desc: t("features.list.security.description") },
    { icon: <FiBookOpen size={22} />, title: t("features.list.interface.title"), desc: t("features.list.interface.description") },
  ];

  const testimonials = [
    { name: "يوسف بلقاسم", role: t("testimonials.role.author"), text: "وَرَقة غيّرت مسيرتي ككاتب مستقل. أصبح لكتابي جمهور حقيقي بفضل هذه المنصة الرائعة.", rating: 5 },
    { name: "نور الهدى", role: t("testimonials.role.reader"), text: "اكتشفت كتّاباً مذهلين لم أكن لأعرفهم لولا وَرَقة. تجربة شراء سلسة وممتعة.", rating: 5 },
    { name: "محمد عمراني", role: t("testimonials.role.author"), text: "المنصة سهلة الاستخدام والدعم ممتاز. نشرت كتابي الأول وحققت مبيعات فاقت توقعاتي.", rating: 4 },
  ];

  const langs = [
    { code: "ar", label: "العربية", flag: "🇩🇿" },
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "fr", label: "Français", flag: "🇫🇷" },
  ];

  /* ── Theme-aware colors ── */
  const bg1 = dk ? C.dBg : C.cream;
  const bg2 = dk ? C.dCard : "#fff";
  const bg3 = dk ? C.dBg : C.warmWhite;
  const card = dk ? C.dSurface : "#fff";
  const brd = dk ? C.dBorder : C.border;
  const tx1 = dk ? C.dText : C.espresso;
  const tx2 = dk ? C.dTextSoft : C.textBody;
  const tx3 = dk ? C.dTextMuted : "rgba(44,36,24,0.3)";
  const accent = C.terracotta;

  /* ── shared button style ── */
  const btnPrimary: React.CSSProperties = {
    display: "inline-flex", alignItems: "center", gap: "0.5rem",
    backgroundColor: accent, color: "#fff",
    fontWeight: 600, padding: "0.8rem 1.8rem",
    borderRadius: "99px", textDecoration: "none",
    fontSize: "0.9rem", fontFamily: "'DM Sans', sans-serif",
    border: "none", cursor: "pointer",
    boxShadow: "0 4px 16px rgba(196,114,78,0.2)",
  };
  const btnOutline: React.CSSProperties = {
    display: "inline-flex", alignItems: "center", gap: "0.5rem",
    backgroundColor: "transparent",
    border: `1.5px solid ${dk ? "rgba(196,114,78,0.35)" : "rgba(196,114,78,0.4)"}`,
    color: accent, fontWeight: 600, padding: "0.8rem 1.8rem",
    borderRadius: "99px", textDecoration: "none",
    fontSize: "0.9rem", fontFamily: "'DM Sans', sans-serif",
    cursor: "pointer", transition: "border-color 0.25s, background-color 0.25s",
  };

  return (
    <div style={{
      direction: isRtl ? "rtl" : "ltr",
      fontFamily: "'DM Sans', 'Amiri', sans-serif",
      color: tx1,
      backgroundColor: bg1,
      overflowX: "hidden",
      minHeight: "100vh",
      transition: "background-color 0.35s, color 0.35s",
    }}>

      {/* ── Styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }

        ::selection { background: ${C.terracotta}; color: #fff; }
        ::placeholder { color: ${tx3}; }
        input:focus, textarea:focus {
          border-color: ${accent} !important;
          box-shadow: 0 0 0 3px ${C.terracottaFaint};
          outline: none;
        }

        @media (min-width: 900px) {
          .w-dk { display: flex !important; }
          .w-mk { display: none !important; }
        }
        @media (max-width: 899px) {
          .w-dk { display: none !important; }
          .w-mk { display: flex !important; }
        }

        .w-nav-link {
          text-decoration: none;
          transition: color 0.2s;
          white-space: nowrap;
        }
        .w-nav-link:hover { color: ${accent} !important; }

        @keyframes w-mob-in {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .w-mob-anim {
          animation: w-mob-in 0.3s ease forwards;
          opacity: 0;
        }
      `}</style>

      {/* ════════════ NAVBAR ════════════ */}
      {/* Simple fixed top — no floating/docking transform, so no RTL positioning bugs */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          backgroundColor: dk
            ? scrolled ? "rgba(26,23,20,0.95)" : "rgba(26,23,20,0.8)"
            : scrolled ? "rgba(250,247,242,0.95)" : "rgba(250,247,242,0.75)",
          backdropFilter: "blur(20px) saturate(1.4)",
          WebkitBackdropFilter: "blur(20px) saturate(1.4)",
          borderBottom: `1px solid ${scrolled ? brd : "transparent"}`,
          transition: "background-color 0.35s, border-color 0.35s",
        }}
      >
        <div style={{
          maxWidth: "74rem", margin: "0 auto",
          padding: "0 1.5rem",
          height: "3.75rem",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: "1rem",
        }}>

          {/* Logo */}
          <a href="#hero" style={{ display: "flex", alignItems: "center", gap: "0.55rem", textDecoration: "none", flexShrink: 0 }}>
            <div style={{
              width: "2rem", height: "2rem", borderRadius: "0.5rem",
              background: `linear-gradient(135deg, ${accent}, #d4845a)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 2px 8px rgba(196,114,78,0.25)",
            }}>
              <span style={{ fontFamily: "'Amiri', serif", fontSize: "1.05rem", fontWeight: 700, color: "#fff", lineHeight: 1 }}>و</span>
            </div>
            <span style={{ fontFamily: "'Cormorant Garamond', 'Amiri', serif", fontSize: "1.35rem", fontWeight: 700, color: accent }}>
              وَرَقة
            </span>
          </a>

          {/* Desktop links */}
          <div className="w-dk" style={{ display: "none", alignItems: "center", gap: "0.3rem" }}>
            {navLinks.map((l) => {
              const active = activeSection === l.id;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  className="w-nav-link"
                  style={{
                    padding: "0.4rem 0.75rem",
                    fontSize: "0.82rem",
                    fontWeight: active ? 600 : 400,
                    color: active ? accent : tx2,
                    borderRadius: "99px",
                    backgroundColor: active ? C.terracottaFaint : "transparent",
                    transition: "background-color 0.2s, color 0.2s",
                  }}
                >
                  {l.label}
                </a>
              );
            })}
          </div>

          {/* Right controls */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", flexShrink: 0 }}>
            {/* Lang */}
            <div ref={langRef} style={{ position: "relative" }}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                style={{
                  display: "flex", alignItems: "center", gap: "0.3rem",
                  background: dk ? "rgba(240,235,226,0.06)" : "rgba(44,36,24,0.04)",
                  border: "none", borderRadius: "0.5rem", padding: "0.38rem 0.6rem",
                  color: tx2, cursor: "pointer", fontSize: "0.76rem", fontWeight: 600,
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                <FiGlobe size={14} />
                <span>{i18n.language.toUpperCase()}</span>
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.96 }}
                    transition={{ duration: 0.18 }}
                    style={{
                      position: "absolute", top: "calc(100% + 6px)",
                      [isRtl ? "left" : "right"]: 0,
                      backgroundColor: dk ? C.dSurface : "#fff",
                      borderRadius: "0.75rem",
                      boxShadow: dk
                        ? "0 10px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(240,235,226,0.06)"
                        : "0 10px 32px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)",
                      padding: "0.35rem", minWidth: "145px", zIndex: 200,
                    }}
                  >
                    {langs.map((lng) => {
                      const cur = i18n.language === lng.code;
                      return (
                        <button
                          key={lng.code}
                          onClick={() => changeLang(lng.code)}
                          style={{
                            display: "flex", alignItems: "center", gap: "0.55rem", width: "100%",
                            padding: "0.55rem 0.7rem", background: cur ? C.terracottaFaint : "none",
                            border: "none", color: cur ? accent : (dk ? C.dText : C.espresso),
                            cursor: "pointer", textAlign: isRtl ? "right" : "left",
                            fontSize: "0.82rem", fontWeight: cur ? 700 : 400,
                            borderRadius: "0.5rem", fontFamily: "'DM Sans', sans-serif",
                          }}
                        >
                          <span style={{ fontSize: "0.95rem" }}>{lng.flag}</span>
                          <span>{lng.label}</span>
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme */}
            <button
              onClick={toggle}
              style={{
                width: "1.9rem", height: "1.9rem",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: dk ? "rgba(240,235,226,0.06)" : "rgba(44,36,24,0.04)",
                border: "none", borderRadius: "0.5rem",
                color: accent, cursor: "pointer",
              }}
            >
              {dk ? <FiSun size={15} /> : <FiMoon size={15} />}
            </button>

            {/* CTA desktop */}
            <a
              href="#contact"
              className="w-dk"
              style={{
                ...btnPrimary,
                display: "none",
                padding: "0.42rem 1.1rem",
                fontSize: "0.78rem",
                borderRadius: "99px",
              }}
            >
              {t("nav.startNow")}
            </a>

            {/* Mobile hamburger */}
            <button
              className="w-mk"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                display: "none", alignItems: "center", justifyContent: "center",
                width: "1.9rem", height: "1.9rem",
                background: dk ? "rgba(240,235,226,0.06)" : "rgba(44,36,24,0.04)",
                border: "none", borderRadius: "0.5rem", color: tx1, cursor: "pointer",
              }}
            >
              {mobileOpen ? <FiX size={17} /> : <FiMenu size={17} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              style={{ position: "fixed", inset: 0, zIndex: 98, backgroundColor: "rgba(0,0,0,0.35)", backdropFilter: "blur(4px)" }}
            />
            <motion.div
              initial={{ x: isRtl ? "-100%" : "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: isRtl ? "-100%" : "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              style={{
                position: "fixed", top: 0, bottom: 0,
                [isRtl ? "left" : "right"]: 0,
                width: "min(80vw, 300px)", zIndex: 99,
                backgroundColor: dk ? C.dCard : "#fff",
                display: "flex", flexDirection: "column",
                boxShadow: dk ? "-6px 0 40px rgba(0,0,0,0.4)" : "-6px 0 40px rgba(0,0,0,0.06)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.1rem 1.25rem" }}>
                <span style={{ fontFamily: "'Cormorant Garamond', 'Amiri', serif", fontSize: "1.1rem", fontWeight: 700, color: accent }}>وَرَقة</span>
                <button onClick={() => setMobileOpen(false)} style={{ background: "none", border: "none", color: tx2, cursor: "pointer" }}>
                  <FiX size={20} />
                </button>
              </div>
              <div style={{ height: "1px", background: brd, margin: "0 1.25rem" }} />
              <div style={{ padding: "0.75rem 0.75rem", flex: 1, overflowY: "auto" }}>
                {navLinks.map((l, i) => {
                  const active = activeSection === l.id;
                  return (
                    <a
                      key={l.href}
                      href={l.href}
                      onClick={() => setMobileOpen(false)}
                      className="w-mob-anim"
                      style={{
                        animationDelay: `${i * 0.04}s`,
                        display: "block",
                        padding: "0.75rem 0.85rem",
                        marginBottom: "0.1rem",
                        color: active ? accent : tx2,
                        textDecoration: "none",
                        fontSize: "0.92rem",
                        fontWeight: active ? 600 : 400,
                        borderRadius: "0.5rem",
                        backgroundColor: active ? C.terracottaFaint : "transparent",
                      }}
                    >
                      {l.label}
                    </a>
                  );
                })}
              </div>
              <div style={{ padding: "1rem 1.25rem", borderTop: `1px solid ${brd}` }}>
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  style={{
                    ...btnPrimary,
                    width: "100%",
                    justifyContent: "center",
                    fontSize: "0.88rem",
                    padding: "0.75rem",
                  }}
                >
                  {t("nav.startNow")}
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ════════════ HERO ════════════ */}
      <section
        id="hero"
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "7rem 1.5rem 5rem",
          overflow: "hidden",
        }}
      >
        {/* Soft gradient orbs */}
        <div style={{
          position: "absolute", top: "15%", left: "10%",
          width: "500px", height: "500px",
          background: dk
            ? "radial-gradient(circle, rgba(196,114,78,0.06) 0%, transparent 65%)"
            : "radial-gradient(circle, rgba(196,114,78,0.08) 0%, transparent 65%)",
          borderRadius: "50%", pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "20%", right: "5%",
          width: "400px", height: "400px",
          background: dk
            ? "radial-gradient(circle, rgba(107,94,77,0.08) 0%, transparent 65%)"
            : "radial-gradient(circle, rgba(107,94,77,0.06) 0%, transparent 65%)",
          borderRadius: "50%", pointerEvents: "none",
        }} />

        <div style={{ position: "relative", maxWidth: "48rem", margin: "0 auto", textAlign: "center" }}>

          {/* 3D Animated Book */}
          <HeroBook dk={dk} />

          <Reveal>
            <span style={{
              display: "inline-block",
              backgroundColor: C.terracottaFaint,
              color: accent,
              fontSize: "0.78rem", fontWeight: 600,
              padding: "0.35rem 1rem",
              borderRadius: "99px",
              marginBottom: "2rem",
              letterSpacing: "0.06em",
              fontFamily: "'DM Sans', sans-serif",
            }}>
              {t("hero.badge")}
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', 'Amiri', serif",
              fontSize: "clamp(2.2rem, 6.5vw, 4.5rem)",
              fontWeight: 600,
              lineHeight: 1.1,
              color: tx1,
              marginBottom: "1.5rem",
              letterSpacing: "-0.025em",
            }}>
              {t("hero.title")}
              <br />
              <span style={{
                color: accent,
                fontStyle: "italic",
              }}>
                {t("hero.titleHighlight")}
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p style={{
              fontSize: "clamp(0.95rem, 2.2vw, 1.15rem)",
              color: tx2,
              maxWidth: "32rem",
              margin: "0 auto 2.5rem",
              lineHeight: 1.8,
              fontWeight: 400,
            }}>
              {t("hero.subtitle")}
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "0.75rem" }}>
              <motion.a
                href="#how-it-works"
                whileHover={{ scale: 1.03, boxShadow: "0 8px 24px rgba(196,114,78,0.3)" }}
                whileTap={{ scale: 0.97 }}
                style={btnPrimary}
              >
                {t("hero.authorCta")}
                <motion.span
                  animate={{ x: isRtl ? [0, -3, 0] : [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{ display: "flex" }}
                >
                  {arrow}
                </motion.span>
              </motion.a>
              <motion.a
                href="#catalog"
                whileHover={{ scale: 1.03, backgroundColor: C.terracottaFaint }}
                whileTap={{ scale: 0.97 }}
                style={btnOutline}
              >
                {t("hero.browseCta")}
              </motion.a>
            </div>
          </Reveal>

          {/* Stats */}
          <Reveal delay={0.38}>
            <div style={{
              marginTop: "5rem",
              display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
              gap: "2rem", maxWidth: "26rem", margin: "5rem auto 0",
            }}>
              {[
                { value: "+200", label: t("hero.stats.books") },
                { value: "+80", label: t("hero.stats.authors") },
                { value: "+5K", label: t("hero.stats.readers") },
              ].map((s) => (
                <div key={s.label} style={{ textAlign: "center" }}>
                  <p style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(1.5rem, 3vw, 2rem)",
                    fontWeight: 700,
                    color: accent,
                    lineHeight: 1.1,
                  }}>
                    {s.value}
                  </p>
                  <p style={{ fontSize: "0.78rem", color: tx2, marginTop: "0.3rem", fontWeight: 400 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════ HOW IT WORKS ════════════ */}
      <section id="how-it-works" style={{ padding: "6rem 1.5rem", backgroundColor: bg2 }}>
        <div style={{ maxWidth: "68rem", margin: "0 auto" }}>
          <Heading title={t("howItWorks.title")} sub={t("howItWorks.subtitle")} dk={dk} />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "1.25rem" }}>
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.07}>
                <motion.div
                  whileHover={{ y: -5, boxShadow: dk ? "0 16px 40px rgba(0,0,0,0.25)" : "0 16px 40px rgba(0,0,0,0.06)" }}
                  style={{
                    padding: "2rem 1.5rem",
                    backgroundColor: card,
                    borderRadius: "1rem",
                    border: `1px solid ${brd}`,
                    textAlign: "center",
                    position: "relative",
                    transition: "box-shadow 0.3s, border-color 0.3s",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.terracottaGlow; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = brd; }}
                >
                  <span style={{
                    position: "absolute",
                    top: "1rem",
                    [isRtl ? "left" : "right"]: "1rem",
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "2rem", fontWeight: 700,
                    color: tx3, lineHeight: 1,
                  }}>
                    {s.num}
                  </span>

                  <div style={{
                    width: "3rem", height: "3rem", margin: "0 auto 1.25rem",
                    borderRadius: "0.75rem",
                    backgroundColor: C.terracottaFaint,
                    color: accent,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "background-color 0.25s",
                  }}>
                    {s.icon}
                  </div>
                  <h3 style={{
                    fontFamily: "'Cormorant Garamond', 'Amiri', serif",
                    fontSize: "1.1rem", fontWeight: 600,
                    color: tx1, marginBottom: "0.5rem",
                  }}>
                    {s.title}
                  </h3>
                  <p style={{ color: tx2, fontSize: "0.84rem", lineHeight: 1.65, fontWeight: 400 }}>
                    {s.desc}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ CATALOG ════════════ */}
      <section id="catalog" style={{ padding: "6rem 1.5rem", backgroundColor: bg3 }}>
        <div style={{ maxWidth: "68rem", margin: "0 auto" }}>
          <Heading title={t("catalog.title")} sub={t("catalog.subtitle")} dk={dk} />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.25rem" }}>
            {books.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.07}>
                <motion.div whileHover={{ y: -6 }} style={{ cursor: "pointer" }}>
                  {/* Cover */}
                  <div style={{
                    height: "15rem",
                    borderRadius: "0.75rem",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: "1rem",
                    backgroundColor: b.bg,
                    position: "relative",
                    overflow: "hidden",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                  }}>
                    {/* Subtle pattern */}
                    <div style={{
                      position: "absolute", inset: 0,
                      background: "repeating-linear-gradient(135deg, transparent, transparent 20px, rgba(255,255,255,0.02) 20px, rgba(255,255,255,0.02) 21px)",
                      pointerEvents: "none",
                    }} />
                    <div style={{ textAlign: "center", padding: "1.5rem", position: "relative" }}>
                      <div style={{ width: "2rem", height: "1px", background: "rgba(255,255,255,0.25)", margin: "0 auto 0.6rem" }} />
                      <p style={{ fontFamily: "'Amiri', serif", color: "#fff", fontWeight: 700, fontSize: "1.3rem", lineHeight: 1.35 }}>
                        {b.title}
                      </p>
                      <div style={{ width: "2rem", height: "1px", background: "rgba(255,255,255,0.25)", margin: "0.6rem auto" }} />
                      <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.72rem" }}>{b.author}</p>
                    </div>
                  </div>
                  {/* Info */}
                  <h3 style={{ fontFamily: "'Cormorant Garamond', 'Amiri', serif", fontWeight: 600, color: tx1, marginBottom: "0.2rem", fontSize: "1rem" }}>
                    {b.title}
                  </h3>
                  <p style={{ fontSize: "0.8rem", color: tx2, marginBottom: "0.4rem" }}>{b.author}</p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ color: accent, fontWeight: 700, fontSize: "0.88rem" }}>{b.price}</span>
                    <span style={{ fontSize: "0.7rem", color: tx3 }}>{b.year}</span>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15}>
            <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
              <motion.a
                href="#"
                whileHover={{ scale: 1.03, backgroundColor: C.terracottaFaint }}
                whileTap={{ scale: 0.97 }}
                style={btnOutline}
              >
                {t("catalog.viewAll")}
                {arrow}
              </motion.a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════ FEATURES ════════════ */}
      <section id="features" style={{ padding: "6rem 1.5rem", backgroundColor: bg2 }}>
        <div style={{ maxWidth: "68rem", margin: "0 auto" }}>
          <Heading title={t("features.title")} sub={t("features.subtitle")} dk={dk} />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.05}>
                <motion.div
                  whileHover={{ y: -3, borderColor: C.terracottaGlow }}
                  style={{
                    padding: "1.75rem 1.5rem",
                    borderRadius: "1rem",
                    border: `1px solid ${brd}`,
                    backgroundColor: card,
                    cursor: "default",
                    transition: "border-color 0.25s",
                  }}
                >
                  <div style={{
                    width: "2.75rem", height: "2.75rem",
                    borderRadius: "0.65rem",
                    backgroundColor: C.terracottaFaint,
                    color: accent,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: "1.25rem",
                  }}>
                    {f.icon}
                  </div>
                  <h3 style={{
                    fontFamily: "'Cormorant Garamond', 'Amiri', serif",
                    fontSize: "1.05rem", fontWeight: 600,
                    color: tx1, marginBottom: "0.4rem",
                  }}>
                    {f.title}
                  </h3>
                  <p style={{ color: tx2, fontSize: "0.84rem", lineHeight: 1.65, fontWeight: 400 }}>
                    {f.desc}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ TESTIMONIALS ════════════ */}
      <section id="testimonials" style={{ padding: "6rem 1.5rem", backgroundColor: bg3 }}>
        <div style={{ maxWidth: "68rem", margin: "0 auto" }}>
          <Heading title={t("testimonials.title")} sub={t("testimonials.subtitle")} dk={dk} />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
            {testimonials.map((tm, i) => (
              <Reveal key={tm.name} delay={i * 0.07}>
                <motion.div
                  whileHover={{ y: -3 }}
                  style={{
                    backgroundColor: card,
                    borderRadius: "1rem",
                    border: `1px solid ${brd}`,
                    padding: "1.75rem 1.5rem",
                    transition: "border-color 0.25s",
                  }}
                >
                  <div style={{ display: "flex", gap: "0.15rem", marginBottom: "1rem" }}>
                    {Array.from({ length: 5 }).map((_, s) => (
                      <FiStar
                        key={s}
                        size={14}
                        style={{
                          color: s < tm.rating ? "#e0a84b" : (dk ? "rgba(240,235,226,0.12)" : "rgba(44,36,24,0.1)"),
                          fill: s < tm.rating ? "#e0a84b" : "none",
                        }}
                      />
                    ))}
                  </div>
                  <p style={{
                    color: tx2, lineHeight: 1.8, marginBottom: "1.5rem",
                    fontSize: "0.88rem", fontStyle: "italic", fontWeight: 400,
                  }}>
                    &ldquo;{tm.text}&rdquo;
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                    <div style={{
                      width: "2.25rem", height: "2.25rem", borderRadius: "50%",
                      background: `linear-gradient(135deg, ${accent}, #d4845a)`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#fff", fontFamily: "'Amiri', serif", fontWeight: 700, fontSize: "0.85rem",
                    }}>
                      {tm.name.charAt(0)}
                    </div>
                    <div>
                      <p style={{ fontWeight: 600, color: tx1, fontSize: "0.84rem" }}>{tm.name}</p>
                      <p style={{ fontSize: "0.72rem", color: tx3 }}>{tm.role}</p>
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ CTA ════════════ */}
      <section style={{ padding: "5rem 1.5rem", backgroundColor: bg2 }}>
        <Reveal>
          <div style={{
            maxWidth: "44rem", margin: "0 auto",
            background: `linear-gradient(135deg, ${accent}, #d4845a)`,
            borderRadius: "1.5rem",
            padding: "3.5rem 2rem",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}>
            {/* Decorative circles */}
            <div style={{ position: "absolute", top: "-3rem", left: "-3rem", width: "10rem", height: "10rem", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.06)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: "-4rem", right: "-4rem", width: "14rem", height: "14rem", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />

            <h2 style={{
              fontFamily: "'Cormorant Garamond', 'Amiri', serif",
              fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
              fontWeight: 700, color: "#fff",
              marginBottom: "0.75rem",
              position: "relative",
            }}>
              {t("cta.title")}
            </h2>
            <p style={{
              color: "rgba(255,255,255,0.75)",
              fontSize: "1rem", maxWidth: "28rem",
              margin: "0 auto 2rem", lineHeight: 1.7,
              fontWeight: 400, position: "relative",
            }}>
              {t("cta.subtitle")}
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04, boxShadow: "0 10px 28px rgba(0,0,0,0.15)" }}
              whileTap={{ scale: 0.96 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                backgroundColor: "#fff", color: accent,
                fontWeight: 700, padding: "0.85rem 2rem",
                borderRadius: "99px", textDecoration: "none",
                fontSize: "0.9rem", boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                position: "relative",
              }}
            >
              {t("cta.button")}
              {arrow}
            </motion.a>
          </div>
        </Reveal>
      </section>

      {/* ════════════ CONTACT ════════════ */}
      <section id="contact" style={{ padding: "6rem 1.5rem", backgroundColor: bg3 }}>
        <div style={{ maxWidth: "68rem", margin: "0 auto" }}>
          <Heading title={t("contact.title")} sub={t("contact.subtitle")} dk={dk} />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2.5rem" }}>
            {/* Info */}
            <div>
              {[
                { icon: <FiMail size={18} />, label: t("contact.email"), value: "contact@waraka.dz" },
                { icon: <FiPhone size={18} />, label: t("contact.phone"), value: "+213 555 123 456", dir: "ltr" as const },
                { icon: <FiMapPin size={18} />, label: t("contact.address"), value: t("contact.addressValue") },
              ].map((item, i) => (
                <Reveal key={item.label} delay={i * 0.06}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "0.85rem", marginBottom: "1.75rem" }}>
                    <div style={{
                      width: "2.5rem", height: "2.5rem", flexShrink: 0,
                      borderRadius: "0.6rem",
                      backgroundColor: C.terracottaFaint,
                      color: accent,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      {item.icon}
                    </div>
                    <div>
                      <h4 style={{ fontWeight: 600, color: tx1, marginBottom: "0.2rem", fontSize: "0.88rem" }}>{item.label}</h4>
                      <p style={{ color: tx2, fontSize: "0.84rem", fontWeight: 400, direction: item.dir || undefined }}>{item.value}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Form */}
            <Reveal delay={0.1}>
              <div style={{
                backgroundColor: card,
                borderRadius: "1rem",
                border: `1px solid ${brd}`,
                padding: "1.75rem",
              }}>
                {[
                  { label: t("contact.form.name"), type: "text", ph: t("contact.form.namePlaceholder") },
                  { label: t("contact.form.email"), type: "email", ph: t("contact.form.emailPlaceholder"), dir: "ltr" as const },
                ].map((f) => (
                  <div key={f.label} style={{ marginBottom: "1.1rem" }}>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: tx1, marginBottom: "0.4rem" }}>
                      {f.label}
                    </label>
                    <input
                      type={f.type}
                      placeholder={f.ph}
                      style={{
                        width: "100%", padding: "0.7rem 0.9rem",
                        borderRadius: "0.6rem",
                        border: `1px solid ${brd}`,
                        backgroundColor: dk ? "rgba(26,23,20,0.5)" : C.warmWhite,
                        color: tx1, fontSize: "0.85rem",
                        outline: "none", boxSizing: "border-box",
                        fontFamily: "'DM Sans', sans-serif",
                        direction: f.dir || undefined,
                        transition: "border-color 0.2s",
                      }}
                    />
                  </div>
                ))}
                <div style={{ marginBottom: "1.1rem" }}>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: tx1, marginBottom: "0.4rem" }}>
                    {t("contact.form.message")}
                  </label>
                  <textarea
                    rows={4}
                    placeholder={t("contact.form.messagePlaceholder")}
                    style={{
                      width: "100%", padding: "0.7rem 0.9rem",
                      borderRadius: "0.6rem",
                      border: `1px solid ${brd}`,
                      backgroundColor: dk ? "rgba(26,23,20,0.5)" : C.warmWhite,
                      color: tx1, fontSize: "0.85rem",
                      outline: "none", resize: "none", boxSizing: "border-box",
                      fontFamily: "'DM Sans', sans-serif",
                      transition: "border-color 0.2s",
                    }}
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 8px 24px rgba(196,114,78,0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    ...btnPrimary,
                    width: "100%",
                    justifyContent: "center",
                    padding: "0.8rem",
                    fontSize: "0.88rem",
                    borderRadius: "0.6rem",
                  }}
                >
                  {t("contact.form.send")}
                </motion.button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════ FOOTER ════════════ */}
      <footer style={{
        backgroundColor: dk ? "#0f0d0a" : C.espresso,
        color: "rgba(240,235,226,0.45)",
        padding: "3.5rem 1.5rem 2rem",
        fontFamily: "'DM Sans', sans-serif",
      }}>
        <div style={{ maxWidth: "68rem", margin: "0 auto" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "2.5rem",
            marginBottom: "2.5rem",
          }}>
            <div>
              <h3 style={{
                fontFamily: "'Cormorant Garamond', 'Amiri', serif",
                fontSize: "1.4rem", fontWeight: 700, color: "#f0ebe2",
                marginBottom: "0.75rem",
              }}>
                وَرَقة
              </h3>
              <p style={{ fontSize: "0.84rem", lineHeight: 1.65 }}>
                {t("footer.description")}
              </p>
            </div>
            {[
              { title: t("footer.quickLinks"), links: [t("footer.links.home"), t("footer.links.books"), t("footer.links.authors"), t("footer.links.about")] },
              { title: t("footer.support"), links: [t("footer.links.faq"), t("footer.links.terms"), t("footer.links.privacy"), t("footer.links.contact")] },
              { title: t("footer.follow"), links: [t("footer.links.facebook"), t("footer.links.instagram"), t("footer.links.twitter")] },
            ].map((col) => (
              <div key={col.title}>
                <h4 style={{ fontWeight: 600, color: "#f0ebe2", marginBottom: "0.85rem", fontSize: "0.8rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  {col.title}
                </h4>
                {col.links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    style={{
                      display: "block", color: "rgba(240,235,226,0.4)", textDecoration: "none",
                      fontSize: "0.84rem", marginBottom: "0.5rem",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => { (e.target as HTMLElement).style.color = accent; }}
                    onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "rgba(240,235,226,0.4)"; }}
                  >
                    {link}
                  </a>
                ))}
              </div>
            ))}
          </div>

          <div style={{ borderTop: "1px solid rgba(240,235,226,0.08)", paddingTop: "1.25rem", textAlign: "center", fontSize: "0.72rem", color: "rgba(240,235,226,0.2)" }}>
            © {new Date().getFullYear()} وَرَقة. {t("footer.copyright")}
          </div>
        </div>
      </footer>
    </div>
  );
}