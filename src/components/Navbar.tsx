import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  FiArrowLeft,
  FiMenu,
  FiX,
  FiSun,
  FiMoon,
  FiGlobe,
} from "react-icons/fi";

/* ═══════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════ */
interface NavbarProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

/* ═══════════════════════════════════════════════
   Navbar — Editorial Luxury
   ═══════════════════════════════════════════════ */
export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const dk = theme === "dark";

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const linksContainerRef = useRef<HTMLDivElement>(null);

  /* ── scroll detection ── */
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── section observer ── */
  useEffect(() => {
    const ids = ["hero", "how-it-works", "catalog", "features", "testimonials", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: "-35% 0px -60% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  /* ── outside click for lang ── */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ── body scroll lock ── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLangOpen(false);
    document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lng;
  };

  const navLinks = [
    { label: t("nav.home"), href: "#hero", id: "hero" },
    { label: t("nav.howItWorks"), href: "#how-it-works", id: "how-it-works" },
    { label: t("nav.books"), href: "#catalog", id: "catalog" },
    { label: t("nav.features"), href: "#features", id: "features" },
    { label: t("nav.testimonials"), href: "#testimonials", id: "testimonials" },
    { label: t("nav.contact"), href: "#contact", id: "contact" },
  ];

  const languages = [
    { code: "ar", label: "العربية", flag: "🇩🇿" },
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "fr", label: "Français", flag: "🇫🇷" },
  ];

  /* ── sliding indicator position ── */
  const updateIndicator = useCallback(() => {
    if (!linksContainerRef.current || !indicatorRef.current) return;
    const container = linksContainerRef.current;
    const activeIdx = navLinks.findIndex((l) => l.id === activeSection);
    const targetIdx = hoverIndex !== null ? hoverIndex : activeIdx;
    const links = container.querySelectorAll<HTMLAnchorElement>("[data-nav-link]");
    if (links[targetIdx]) {
      const link = links[targetIdx];
      const containerRect = container.getBoundingClientRect();
      const linkRect = link.getBoundingClientRect();
      indicatorRef.current.style.width = `${linkRect.width}px`;
      indicatorRef.current.style.transform = `translateX(${linkRect.left - containerRect.left}px)`;
      indicatorRef.current.style.opacity = "1";
    }
  }, [activeSection, hoverIndex, navLinks]);

  useEffect(() => {
    updateIndicator();
  }, [updateIndicator, scrolled]);

  useEffect(() => {
    const timer = setTimeout(updateIndicator, 100);
    return () => clearTimeout(timer);
  }, [i18n.language]);

  /* ── palette ── */
  const accent = "#b45309";
  const accentGold = "#d97706";
  const textPrimary = dk ? "#fafaf9" : "#1c1917";
  const textSecondary = dk ? "#a8a29e" : "#78716c";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Outfit:wght@300;400;500;600;700;800&display=swap');

        .wrq-nav-root {
          font-family: 'Outfit', sans-serif;
        }
        .wrq-nav-root * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        @media (min-width: 920px) {
          .wrq-d-show { display: flex !important; }
          .wrq-m-show { display: none !important; }
        }
        @media (max-width: 919px) {
          .wrq-d-show { display: none !important; }
          .wrq-m-show { display: flex !important; }
        }

        .wrq-indicator {
          position: absolute;
          bottom: 4px;
          left: 0;
          height: 2.5px;
          border-radius: 99px;
          background: linear-gradient(90deg, ${accent}, ${accentGold});
          transition: transform 0.32s cubic-bezier(0.4, 0, 0.2, 1),
                      width 0.32s cubic-bezier(0.4, 0, 0.2, 1),
                      opacity 0.2s;
          opacity: 0;
          pointer-events: none;
        }

        .wrq-nav-link {
          position: relative;
          text-decoration: none;
          transition: color 0.22s;
          white-space: nowrap;
          letter-spacing: 0.01em;
        }
        .wrq-nav-link:hover {
          color: ${accent} !important;
        }

        .wrq-glass {
          backdrop-filter: blur(24px) saturate(1.6);
          -webkit-backdrop-filter: blur(24px) saturate(1.6);
        }

        .wrq-gold-line {
          height: 1px;
          background: linear-gradient(90deg, transparent, ${accent}44, transparent);
          margin: 0.5rem 1.5rem;
        }

        @keyframes wrq-slideIn {
          from { opacity: 0; transform: translateX(${isRtl ? '-24px' : '24px'}); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .wrq-mob-link {
          animation: wrq-slideIn 0.35s ease forwards;
          opacity: 0;
        }

        @keyframes wrq-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(180,83,9,0.35); }
          50% { box-shadow: 0 0 0 8px rgba(180,83,9,0); }
        }
        .wrq-cta-pulse:hover {
          animation: wrq-pulse 1.8s infinite;
        }
      `}</style>

      {/* ═══════ Main Nav Bar ═══════ */}
      <motion.nav
        className="wrq-nav-root"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed",
          top: scrolled ? "0px" : "12px",
          left: scrolled ? "0px" : "50%",
          right: scrolled ? "0px" : "auto",
          transform: scrolled ? "none" : "translateX(-50%)",
          width: scrolled ? "100%" : "min(92vw, 1200px)",
          zIndex: 100,
          borderRadius: scrolled ? "0" : "16px",
          backgroundColor: dk
            ? scrolled ? "rgba(15,13,11,0.88)" : "rgba(28,25,23,0.75)"
            : scrolled ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.6)",
          border: scrolled
            ? `1px solid ${dk ? "rgba(68,64,60,0.3)" : "rgba(214,211,209,0.4)"}`
            : `1px solid ${dk ? "rgba(68,64,60,0.25)" : "rgba(214,211,209,0.5)"}`,
          borderTop: scrolled ? "none" : undefined,
          borderLeft: scrolled ? "none" : undefined,
          borderRight: scrolled ? "none" : undefined,
          boxShadow: scrolled
            ? dk
              ? "0 1px 12px rgba(0,0,0,0.3)"
              : "0 1px 12px rgba(0,0,0,0.06)"
            : dk
              ? "0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.03)"
              : "0 8px 40px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.7)",
          transition: `
            top 0.45s cubic-bezier(0.4,0,0.2,1),
            left 0.45s cubic-bezier(0.4,0,0.2,1),
            right 0.45s cubic-bezier(0.4,0,0.2,1),
            width 0.45s cubic-bezier(0.4,0,0.2,1),
            transform 0.45s cubic-bezier(0.4,0,0.2,1),
            border-radius 0.45s cubic-bezier(0.4,0,0.2,1),
            background-color 0.35s,
            border-color 0.35s,
            box-shadow 0.35s
          `,
        }}
      >
        <div className="wrq-glass" style={{ borderRadius: "inherit" }}>
          <div
            style={{
              maxWidth: "78rem",
              margin: "0 auto",
              padding: scrolled ? "0 1.75rem" : "0 1.5rem",
              height: scrolled ? "3.5rem" : "4rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1.5rem",
              transition: "height 0.4s cubic-bezier(0.4,0,0.2,1), padding 0.4s",
            }}
          >
            {/* ══ Logo ══ */}
            <motion.a
              href="#hero"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.65rem",
                textDecoration: "none",
                flexShrink: 0,
              }}
            >
              <div style={{ position: "relative" }}>
                <motion.div
                  whileHover={{ rotate: -8 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  style={{
                    width: "2.2rem",
                    height: "2.2rem",
                    borderRadius: "0.65rem",
                    background: `linear-gradient(145deg, ${accent}, ${accentGold})`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: `0 3px 12px rgba(180,83,9,0.3), inset 0 1px 0 rgba(255,255,255,0.15)`,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.2) 0%, transparent 60%)",
                  }} />
                  <span style={{
                    fontFamily: "'Amiri', serif",
                    fontSize: "1.15rem",
                    fontWeight: 700,
                    color: "#fff",
                    position: "relative",
                    lineHeight: 1,
                    marginTop: "1px",
                  }}>
                    و
                  </span>
                </motion.div>
                <div style={{
                  position: "absolute",
                  bottom: "-2px",
                  [isRtl ? "left" : "right"]: "-2px",
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: accentGold,
                  border: `1.5px solid ${dk ? "#1c1917" : "#fff"}`,
                }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{
                  fontFamily: "'Amiri', serif",
                  fontSize: "1.35rem",
                  fontWeight: 700,
                  color: accent,
                  lineHeight: 1.1,
                  letterSpacing: "0.02em",
                }}>
                  وَرَقة
                </span>
                <span style={{
                  fontSize: "0.55rem",
                  fontWeight: 600,
                  color: textSecondary,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  marginTop: "1px",
                  opacity: scrolled ? 0 : 0.8,
                  maxHeight: scrolled ? "0" : "1rem",
                  overflow: "hidden",
                  transition: "opacity 0.3s, max-height 0.3s",
                }}>
                  {i18n.language === "ar" ? "منصة الكتب" : i18n.language === "fr" ? "Librairie" : "Books"}
                </span>
              </div>
            </motion.a>

            {/* ══ Desktop Navigation ══ */}
            <div
              ref={linksContainerRef}
              className="wrq-d-show"
              style={{
                position: "relative",
                display: "none",
                alignItems: "center",
                gap: "0.15rem",
                padding: "0 0.25rem",
              }}
            >
              <div ref={indicatorRef} className="wrq-indicator" />

              {navLinks.map((l, i) => {
                const isActive = activeSection === l.id;
                return (
                  <a
                    key={l.href}
                    href={l.href}
                    data-nav-link
                    className="wrq-nav-link"
                    onMouseEnter={() => setHoverIndex(i)}
                    onMouseLeave={() => setHoverIndex(null)}
                    style={{
                      padding: "0.55rem 0.85rem",
                      fontSize: "0.815rem",
                      fontWeight: isActive ? 650 : 450,
                      color: isActive ? accent : textSecondary,
                    }}
                  >
                    {l.label}
                  </a>
                );
              })}
            </div>

            {/* ══ Right Controls ══ */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              flexShrink: 0,
            }}>

              {/* ── Language ── */}
              <div ref={langRef} style={{ position: "relative" }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.93 }}
                  onClick={() => setLangOpen(!langOpen)}
                  aria-label="Change language"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    background: dk ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
                    border: "none",
                    borderRadius: "0.6rem",
                    padding: "0.4rem 0.65rem",
                    color: textSecondary,
                    cursor: "pointer",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    fontFamily: "'Outfit', sans-serif",
                    transition: "background-color 0.2s",
                  }}
                >
                  <FiGlobe size={14} style={{ opacity: 0.7 }} />
                  <span>{i18n.language.toUpperCase()}</span>
                </motion.button>

                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      style={{
                        position: "absolute",
                        top: "calc(100% + 8px)",
                        [isRtl ? "left" : "right"]: 0,
                        backgroundColor: dk ? "#292524" : "#fff",
                        borderRadius: "0.85rem",
                        boxShadow: dk
                          ? "0 12px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(68,64,60,0.35)"
                          : "0 12px 40px rgba(0,0,0,0.12), 0 0 0 1px rgba(214,211,209,0.35)",
                        padding: "0.4rem",
                        minWidth: "155px",
                        zIndex: 200,
                      }}
                    >
                      {languages.map((lng, i) => {
                        const isCurrent = i18n.language === lng.code;
                        return (
                          <motion.button
                            key={lng.code}
                            initial={{ opacity: 0, x: isRtl ? -8 : 8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.04 }}
                            onClick={() => changeLanguage(lng.code)}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.6rem",
                              width: "100%",
                              padding: "0.6rem 0.75rem",
                              background: isCurrent
                                ? dk ? "rgba(180,83,9,0.15)" : "rgba(254,243,199,0.5)"
                                : "none",
                              border: "none",
                              color: isCurrent ? accent : (dk ? "#d6d3d1" : "#44403c"),
                              cursor: "pointer",
                              textAlign: isRtl ? "right" : "left",
                              fontSize: "0.84rem",
                              fontWeight: isCurrent ? 700 : 450,
                              borderRadius: "0.55rem",
                              fontFamily: "'Outfit', sans-serif",
                              transition: "background-color 0.15s",
                            }}
                            onMouseEnter={(e) => {
                              if (!isCurrent) e.currentTarget.style.backgroundColor = dk ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)";
                            }}
                            onMouseLeave={(e) => {
                              if (!isCurrent) e.currentTarget.style.backgroundColor = "transparent";
                            }}
                          >
                            <span style={{ fontSize: "1rem" }}>{lng.flag}</span>
                            <span>{lng.label}</span>
                            {isCurrent && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                style={{
                                  marginInlineStart: "auto",
                                  width: "5px",
                                  height: "5px",
                                  borderRadius: "50%",
                                  backgroundColor: accent,
                                }}
                              />
                            )}
                          </motion.button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ── Theme Toggle ── */}
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                aria-label="Toggle theme"
                style={{
                  width: "2rem",
                  height: "2rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: dk ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
                  border: "none",
                  borderRadius: "0.6rem",
                  color: dk ? "#fbbf24" : accent,
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <AnimatePresence mode="wait">
                  {dk ? (
                    <motion.div
                      key="sun"
                      initial={{ y: 14, rotate: -60, opacity: 0 }}
                      animate={{ y: 0, rotate: 0, opacity: 1 }}
                      exit={{ y: -14, rotate: 60, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      style={{ display: "flex" }}
                    >
                      <FiSun size={15} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ y: 14, rotate: 60, opacity: 0 }}
                      animate={{ y: 0, rotate: 0, opacity: 1 }}
                      exit={{ y: -14, rotate: -60, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      style={{ display: "flex" }}
                    >
                      <FiMoon size={15} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* ── Desktop CTA ── */}
              <motion.a
                href="#contact"
                className="wrq-d-show wrq-cta-pulse"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  display: "none",
                  alignItems: "center",
                  gap: "0.4rem",
                  background: `linear-gradient(135deg, ${accent} 0%, ${accentGold} 100%)`,
                  color: "#fff",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  padding: "0.5rem 1.25rem",
                  borderRadius: "9999px",
                  textDecoration: "none",
                  boxShadow: `0 2px 12px rgba(180,83,9,0.25), inset 0 1px 0 rgba(255,255,255,0.15)`,
                  letterSpacing: "0.01em",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <motion.div
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "40%",
                    height: "100%",
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                    pointerEvents: "none",
                  }}
                />
                <span style={{ position: "relative" }}>{t("nav.startNow")}</span>
                <motion.div
                  animate={{ x: isRtl ? [0, -3, 0] : [0, 3, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                  style={{ position: "relative", display: "flex" }}
                >
                  <FiArrowLeft
                    size={13}
                    style={{ transform: isRtl ? "none" : "rotate(180deg)" }}
                  />
                </motion.div>
              </motion.a>

              {/* ── Mobile Hamburger ── */}
              <motion.button
                className="wrq-m-show"
                whileTap={{ scale: 0.88 }}
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
                style={{
                  display: "none",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "2rem",
                  height: "2rem",
                  background: dk ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
                  border: "none",
                  borderRadius: "0.6rem",
                  color: textPrimary,
                  cursor: "pointer",
                }}
              >
                <AnimatePresence mode="wait">
                  {mobileOpen ? (
                    <motion.div
                      key="x"
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 90 }}
                      transition={{ duration: 0.18 }}
                      style={{ display: "flex" }}
                    >
                      <FiX size={17} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="m"
                      initial={{ scale: 0, rotate: 90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: -90 }}
                      transition={{ duration: 0.18 }}
                      style={{ display: "flex" }}
                    >
                      <FiMenu size={17} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* ═══════ Mobile Overlay ═══════ */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 98,
                backgroundColor: "rgba(0,0,0,0.45)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
              }}
            />

            <motion.div
              initial={{ x: isRtl ? "-105%" : "105%" }}
              animate={{ x: "0%" }}
              exit={{ x: isRtl ? "-105%" : "105%" }}
              transition={{ type: "spring", stiffness: 340, damping: 34 }}
              className="wrq-nav-root"
              style={{
                position: "fixed",
                top: 0,
                bottom: 0,
                [isRtl ? "left" : "right"]: 0,
                width: "min(82vw, 340px)",
                zIndex: 99,
                backgroundColor: dk ? "#1c1917" : "#ffffff",
                display: "flex",
                flexDirection: "column",
                boxShadow: dk
                  ? `${isRtl ? '8px' : '-8px'} 0 50px rgba(0,0,0,0.5)`
                  : `${isRtl ? '8px' : '-8px'} 0 50px rgba(0,0,0,0.08)`,
              }}
            >
              {/* Header */}
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "1.25rem 1.5rem",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <div style={{
                    width: "1.75rem",
                    height: "1.75rem",
                    borderRadius: "0.5rem",
                    background: `linear-gradient(145deg, ${accent}, ${accentGold})`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <span style={{
                      fontFamily: "'Amiri', serif",
                      fontSize: "0.95rem",
                      fontWeight: 700,
                      color: "#fff",
                      lineHeight: 1,
                    }}>و</span>
                  </div>
                  <span style={{
                    fontFamily: "'Amiri', serif",
                    fontSize: "1.15rem",
                    fontWeight: 700,
                    color: accent,
                  }}>
                    وَرَقة
                  </span>
                </div>
                <motion.button
                  whileTap={{ scale: 0.85, rotate: 90 }}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    background: dk ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
                    border: "none",
                    borderRadius: "0.5rem",
                    width: "2rem",
                    height: "2rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: textSecondary,
                    cursor: "pointer",
                  }}
                >
                  <FiX size={18} />
                </motion.button>
              </div>

              <div className="wrq-gold-line" />

              {/* Links */}
              <div style={{ padding: "0.75rem 1rem", flex: 1, overflowY: "auto" }}>
                {navLinks.map((l, i) => {
                  const isActive = activeSection === l.id;
                  return (
                    <a
                      key={l.href}
                      href={l.href}
                      onClick={() => setMobileOpen(false)}
                      className="wrq-mob-link"
                      style={{
                        animationDelay: `${i * 0.055}s`,
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        padding: "0.85rem 1rem",
                        marginBottom: "0.15rem",
                        color: isActive ? accent : textSecondary,
                        textDecoration: "none",
                        fontSize: "0.95rem",
                        fontWeight: isActive ? 700 : 450,
                        borderRadius: "0.65rem",
                        backgroundColor: isActive
                          ? dk ? "rgba(180,83,9,0.1)" : "rgba(254,243,199,0.45)"
                          : "transparent",
                        transition: "background-color 0.2s, color 0.2s",
                        fontFamily: "'Outfit', sans-serif",
                      }}
                    >
                      <div style={{
                        width: "3px",
                        height: "1.2rem",
                        borderRadius: "99px",
                        backgroundColor: isActive ? accent : "transparent",
                        flexShrink: 0,
                        transition: "background-color 0.2s",
                      }} />
                      {l.label}
                    </a>
                  );
                })}
              </div>

              <div className="wrq-gold-line" />

              {/* CTA */}
              <div style={{ padding: "1.25rem 1.5rem" }}>
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="wrq-mob-link"
                  style={{
                    animationDelay: `${navLinks.length * 0.055}s`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    background: `linear-gradient(135deg, ${accent} 0%, ${accentGold} 100%)`,
                    color: "#fff",
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    padding: "0.85rem 1.5rem",
                    borderRadius: "0.8rem",
                    textDecoration: "none",
                    boxShadow: "0 4px 20px rgba(180,83,9,0.3)",
                    fontFamily: "'Outfit', sans-serif",
                  }}
                >
                  {t("nav.startNow")}
                  <FiArrowLeft
                    size={15}
                    style={{ transform: isRtl ? "none" : "rotate(180deg)" }}
                  />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}