'use client';

import { useEffect, useRef } from 'react';
import { ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { GreekCTA } from '@/components/ui';
import { LogoVisuD } from '@/components/LogoVisuD';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { useTapHover } from '@/hooks/useTapHover';

function KatexSpan({ latex, style }: { latex: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (ref.current) {
      katex.render(latex, ref.current, { throwOnError: false, displayMode: false });
    }
  }, [latex]);
  return <span ref={ref} style={style} />;
}

const DECO_SYMS = [
  { s: 'Φ', top: 6,  left: 2,  sz: 36, op: 0.07, rot: -10 },
  { s: 'Λ', top: 80, left: 5,  sz: 28, op: 0.06, rot: 15  },
  { s: 'Ψ', top: 10, left: 93, sz: 32, op: 0.07, rot: 8   },
  { s: 'Θ', top: 75, left: 90, sz: 26, op: 0.06, rot: -18 },
];

const CONS_LEFT = [
  'Paiement à chaque heure de cours',
  "Qualité aléatoire — souvent un étudiant sans vraie pédagogie ni compréhension",
  "L'élève reste passif et attend qu'on fasse l'exercice à sa place",
  "Galères d'organisation (annulations, retards, plannings)",
  "Impossible de revoir l'explication une fois le prof parti",
  "L'élève apprend par cœur des tonnes de formules au lieu de comprendre son cours",
];

const PROS_RIGHT = [
  'Tout le programme condensé en méthode visuelle complète',
  'Réelle compréhension des notions pour continuer les mathématiques après le bac',
  "Explications profondes des mécanismes pour comprendre avant d'apprendre",
  "Disponible 7j/7, 24h/24 pour répondre aux questions et aux incompréhensions",
  'Rend les maths fun et améliore la perception de la matière',
  "Rend l'élève 100% autonome face à sa copie",
  "Vidéos rejouables à l'infini jusqu'au déclic",
];

// ── SVG toile d'araignée (coin) ──────────────────────────────────────────────
function SpiderWeb({ size = 90, opacity = 0.22 }: { size?: number; opacity?: number }) {
  const cx = size, cy = size;
  const rays = 6;
  const rings = [size * 0.28, size * 0.55, size * 0.82, size];
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" style={{ opacity }}>
      {/* Rayons */}
      {Array.from({ length: rays }, (_, i) => {
        const angle = (i / rays) * Math.PI * 2 - Math.PI / 2;
        return (
          <line key={i}
            x1={cx} y1={cy}
            x2={cx + Math.cos(angle) * size} y2={cy + Math.sin(angle) * size}
            stroke="#2a1e12" strokeWidth="0.8" />
        );
      })}
      {/* Anneaux */}
      {rings.map((r, ri) => (
        <polygon key={ri}
          points={Array.from({ length: rays }, (_, i) => {
            const angle = (i / rays) * Math.PI * 2 - Math.PI / 2;
            return `${cx + Math.cos(angle) * r},${cy + Math.sin(angle) * r}`;
          }).join(' ')}
          stroke="#2a1e12" strokeWidth="0.8" fill="none" />
      ))}
    </svg>
  );
}

// ── SVG prof + élève + pièce ─────────────────────────────────────────────────
function TeacherStudentIcon() {
  return (
    <svg viewBox="0 0 120 80" width="130" height="87" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Prof (gauche) */}
      <circle cx="28" cy="18" r="10" stroke="#2a1e12" strokeWidth="2" fill="#f5ede0" />
      {/* Tête prof avec chapeau */}
      <rect x="16" y="10" width="24" height="4" rx="2" fill="#2a1e12" />
      {/* Corps prof */}
      <path d="M18,28 C18,22 38,22 38,28 L40,52 H16 Z" fill="#3a5a8a" stroke="#2a1e12" strokeWidth="1.5" />
      {/* Bras gauche tenant tableau */}
      <line x1="18" y1="34" x2="8" y2="44" stroke="#2a1e12" strokeWidth="2" strokeLinecap="round" />
      {/* Jambes prof */}
      <line x1="22" y1="52" x2="20" y2="66" stroke="#2a1e12" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="34" y1="52" x2="36" y2="66" stroke="#2a1e12" strokeWidth="2.5" strokeLinecap="round" />

      {/* Mini tableau */}
      <rect x="2" y="38" width="18" height="12" rx="2" fill="#1a2d4a" stroke="#2a1e12" strokeWidth="1.5" />
      <line x1="5" y1="43" x2="17" y2="43" stroke="white" strokeWidth="1" opacity="0.7" />
      <line x1="5" y1="47" x2="13" y2="47" stroke="white" strokeWidth="1" opacity="0.5" />

      {/* Élève (droite) */}
      <circle cx="92" cy="20" r="9" stroke="#2a1e12" strokeWidth="2" fill="#f5ede0" />
      {/* Corps élève */}
      <path d="M82,30 C82,24 102,24 102,30 L104,52 H80 Z" fill="#e8956a" stroke="#2a1e12" strokeWidth="1.5" />
      {/* Bras élève levé */}
      <line x1="102" y1="33" x2="112" y2="26" stroke="#2a1e12" strokeWidth="2" strokeLinecap="round" />
      {/* Jambes élève */}
      <line x1="86" y1="52" x2="84" y2="66" stroke="#2a1e12" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="98" y1="52" x2="100" y2="66" stroke="#2a1e12" strokeWidth="2.5" strokeLinecap="round" />

      {/* Pièce € au centre */}
      <circle cx="60" cy="36" r="14" fill="#d4a017" stroke="#2a1e12" strokeWidth="2" />
      <circle cx="60" cy="36" r="10" fill="#e8b820" stroke="#2a1e12" strokeWidth="1" />
      <text x="60" y="41" textAnchor="middle" fill="#2a1e12" fontSize="12" fontWeight="900" fontFamily="Georgia, serif">€</text>

      {/* Flèches échange */}
      <path d="M44,32 Q52,26 56,32" stroke="#2a1e12" strokeWidth="1.5" fill="none" strokeLinecap="round" markerEnd="url(#arr)" />
      <path d="M64,40 Q68,46 76,40" stroke="#2a1e12" strokeWidth="1.5" fill="none" strokeLinecap="round" markerEnd="url(#arr)" />
      <defs>
        <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#2a1e12" />
        </marker>
      </defs>
    </svg>
  );
}

// ── SVG étoile 5 branches ────────────────────────────────────────────────────
function Star5({ size, x, y, opacity }: { size: number; x: number; y: number; opacity: number }) {
  const pts = Array.from({ length: 10 }, (_, i) => {
    const angle = (i * Math.PI) / 5 - Math.PI / 2;
    const r = i % 2 === 0 ? size : size * 0.42;
    return `${x + Math.cos(angle) * r},${y + Math.sin(angle) * r}`;
  }).join(' ');
  return <polygon points={pts} fill="white" opacity={opacity} />;
}

function ConsItem({ txt }: { txt: string }) {
  const tap = useTapHover();
  return (
    <li
      ref={tap.ref}
      className="flex items-start gap-2.5 px-2 py-1.5 rounded-lg cursor-default"
      style={{
        transform: tap.hovered ? 'translateY(-3px)' : 'translateY(0)',
        background: tap.hovered ? 'rgba(192,57,43,0.1)' : 'rgba(192,57,43,0.04)',
        transition: 'transform 0.25s cubic-bezier(0.34,1.56,0.64,1), background 0.25s ease',
      }}
      onPointerEnter={tap.onPointerEnter}
      onPointerLeave={tap.onPointerLeave}
    >
      <span style={{ fontFamily: 'var(--font-baloo)', fontWeight: 900, fontSize: 15, color: '#c0392b', flexShrink: 0, lineHeight: 1.5 }}>✕</span>
      <span style={{ fontFamily: 'var(--font-baloo)', fontWeight: 700, fontSize: 'clamp(13px, 1.05vw, 15px)', color: '#1a1a1a', lineHeight: 1.5 }}>{txt}</span>
    </li>
  );
}

function ProsItem({ txt }: { txt: string }) {
  const tap = useTapHover();
  return (
    <li
      ref={tap.ref}
      className="flex items-start gap-2.5 px-2 py-1.5 rounded-lg cursor-default"
      style={{
        transform: tap.hovered ? 'translateY(-3px)' : 'translateY(0)',
        background: tap.hovered ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)',
        transition: 'transform 0.25s cubic-bezier(0.34,1.56,0.64,1), background 0.25s ease',
      }}
      onPointerEnter={tap.onPointerEnter}
      onPointerLeave={tap.onPointerLeave}
    >
      <span style={{ fontFamily: 'var(--font-baloo)', fontWeight: 900, fontSize: 15, color: '#FFE234', flexShrink: 0, lineHeight: 1.5, textShadow: '0 0 6px rgba(255,226,52,0.6)' }}>✓</span>
      <span style={{ fontFamily: 'var(--font-baloo)', fontWeight: 700, fontSize: 'clamp(13px, 1.05vw, 15px)', color: '#fff', lineHeight: 1.5, textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>{txt}</span>
    </li>
  );
}

export function ParentsMessage() {
  return (
    <section
      className="relative overflow-hidden py-12 md:py-24 px-4 md:px-8"
      style={{
        background: 'linear-gradient(160deg, #c8dff0 0%, #d8eaf5 30%, #bdd4e8 55%, #cce0f0 80%, #b8cfe5 100%)',
        borderTop: '3px solid rgba(212,168,83,0.35)',
      }}
    >
      {/* Halos lumineux */}
      <svg aria-hidden className="absolute inset-0 w-full h-full pointer-events-none z-0" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="pm-spot1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="pm-spot2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#a8c8e8" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#a8c8e8" stopOpacity="0" />
          </radialGradient>
          <pattern id="pm-meander" x="0" y="0" width="40" height="16" patternUnits="userSpaceOnUse">
            <polyline points="0,12 3,12 3,4 10,4 10,12 17,12 17,8 24,8 24,12 31,12 31,4 38,4 38,12 40,12"
              fill="none" stroke="#d4a017" strokeWidth="1" strokeLinejoin="miter" opacity="0.35" />
          </pattern>
        </defs>
        <ellipse cx="15%" cy="40%" rx="260" ry="180" fill="url(#pm-spot1)" />
        <ellipse cx="82%" cy="60%" rx="300" ry="200" fill="url(#pm-spot1)" />
        <ellipse cx="50%" cy="50%" rx="380" ry="160" fill="url(#pm-spot2)" />
        <rect x="0" y="0" width="100%" height="16" fill="url(#pm-meander)" />
      </svg>

      {/* Équations LaTeX défilantes */}
      {[
        { latex: "f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}",        top: 2,  dur: 112, delay: 0,  sz: 11, op: 0.33 },
        { latex: "\\int_0^{\\pi} \\sin(x)\\, dx = 2",                          top: 8,  dur: 88,  delay: 7,  sz: 26, op: 0.37 },
        { latex: "e^{i\\pi} + 1 = 0",                                           top: 14, dur: 128, delay: 2,  sz: 22, op: 0.41 },
        { latex: "P(A \\cap B) = P(A) \\cdot P(B|A)",                           top: 20, dur: 104, delay: 14, sz: 13, op: 0.31 },
        { latex: "\\cos^2\\theta + \\sin^2\\theta = 1",                         top: 28, dur: 96,  delay: 10, sz: 20, op: 0.39 },
        { latex: "\\Delta = b^2 - 4ac",                                          top: 36, dur: 80,  delay: 5,  sz: 28, op: 0.35 },
        { latex: "u_n = u_0 \\cdot q^n",                                         top: 44, dur: 116, delay: 3,  sz: 16, op: 0.33 },
        { latex: "\\lim_{x \\to +\\infty} \\frac{\\ln x}{x} = 0",              top: 52, dur: 100, delay: 18, sz: 10, op: 0.29 },
        { latex: "S_n = \\frac{n(u_1 + u_n)}{2}",                               top: 61, dur: 92,  delay: 12, sz: 24, op: 0.39 },
        { latex: "\\binom{n}{k} = \\frac{n!}{k!(n-k)!}",                        top: 70, dur: 124, delay: 6,  sz: 14, op: 0.31 },
        { latex: "\\vec{u} \\cdot \\vec{v} = |u||v|\\cos\\theta",               top: 80, dur: 108, delay: 9,  sz: 19, op: 0.37 },
        { latex: "\\vec{AB} \\cdot \\vec{AC} = |AB||AC|\\cos(\\widehat{BAC})",  top: 88, dur: 116, delay: 20, sz: 12, op: 0.31 },
        { latex: "x = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}",                     top: 5,  dur: 140, delay: 16, sz: 17, op: 0.35 },
        { latex: "\\sum_{k=1}^{n} k = \\frac{n(n+1)}{2}",                       top: 17, dur: 84,  delay: 11, sz: 30, op: 0.33 },
        { latex: "\\ln(ab) = \\ln a + \\ln b",                                   top: 33, dur: 76,  delay: 4,  sz: 15, op: 0.37 },
        { latex: "e^{a+b} = e^a \\cdot e^b",                                     top: 48, dur: 132, delay: 22, sz: 23, op: 0.31 },
        { latex: "\\int x^n\\, dx = \\frac{x^{n+1}}{n+1} + C",                 top: 57, dur: 104, delay: 8,  sz: 10, op: 0.35 },
        { latex: "f''(x) > 0 \\Rightarrow \\text{convexe}",                     top: 66, dur: 96,  delay: 15, sz: 18, op: 0.29 },
        { latex: "P(\\bar{A}) = 1 - P(A)",                                       top: 75, dur: 120, delay: 1,  sz: 27, op: 0.39 },
        { latex: "\\tan\\theta = \\frac{\\sin\\theta}{\\cos\\theta}",            top: 83, dur: 88,  delay: 13, sz: 12, op: 0.33 },
        { latex: "v(t) = v_0 + at",                                              top: 92, dur: 112, delay: 17, sz: 21, op: 0.31 },
        { latex: "\\overrightarrow{grad}\\, f = \\nabla f",                      top: 11, dur: 148, delay: 25, sz: 16, op: 0.29 },
      ].map((item, i) => (
        <motion.div key={i}
          className="absolute select-none pointer-events-none"
          style={{ top: `${item.top}%`, opacity: item.op, zIndex: 1, fontSize: item.sz, color: '#0d1b3e' }}
          initial={{ x: '110vw' }}
          animate={{ x: '-110vw' }}
          transition={{ repeat: Infinity, duration: item.dur, delay: item.delay, ease: 'linear' }}
        >
          <KatexSpan latex={item.latex} />
        </motion.div>
      ))}

      {/* Symboles grecs */}
      {DECO_SYMS.map((m, i) => (
        <span key={i} className="absolute select-none pointer-events-none"
          style={{ top: `${m.top}%`, left: `${m.left}%`, fontSize: m.sz, opacity: m.op, color: '#1a2d4a', transform: `rotate(${m.rot}deg)`, fontFamily: 'var(--font-baloo)', fontWeight: 700 }}>
          {m.s}
        </span>
      ))}

      <div className="max-w-6xl mx-auto relative z-10">

        {/* ── TITRE ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -60px 0px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <div
            className="inline-flex items-center justify-center rounded-full p-4 mb-6"
            style={{ background: 'linear-gradient(160deg, #ede5da 0%, #d8ccbc 100%)', border: '2.5px solid #8a7968', boxShadow: '4px 4px 0 #5a4e3e', transform: 'rotate(-2deg)' }}
          >
            <ShieldCheck className="w-7 h-7" style={{ color: '#2a1e12' }} />
          </div>
          <h2 style={{ fontFamily: 'var(--font-cinzel)', fontWeight: 900, fontSize: 'clamp(22px, 3.8vw, 52px)', color: '#1a2d4a', textTransform: 'uppercase', lineHeight: 1.1, marginBottom: 8 }}>
            UN MOT POUR LES PARENTS
          </h2>
          <p style={{ fontFamily: 'var(--font-baloo)', fontWeight: 600, fontSize: 'clamp(13px, 1vw, 15px)', color: '#1a2d4a', opacity: 0.72, marginBottom: 0 }}>
            Pourquoi Maths Ultime est le meilleur investissement pour l&apos;avenir de votre enfant
          </p>
        </motion.div>

        {/* ── COMPARATIF CARTES + séparateur VS ── */}
        <div className="relative max-w-5xl mx-auto">

          {/* Séparateur diagonal — ligne penchée vers la droite */}
          <div className="hidden md:block absolute z-20 pointer-events-none"
            style={{ left: 'calc(50% - 2px)', top: 0, bottom: 0, width: 4 }}>
            <svg width="4" height="100%" viewBox="0 0 4 500" preserveAspectRatio="none" style={{ display: 'block', height: '100%' }}>
              <line x1="2" y1="0" x2="2" y2="500" stroke="#1a2d4a" strokeWidth="4" />
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0"
            style={{ borderRadius: 28, overflow: 'hidden', boxShadow: '8px 8px 0 #1a2d4a', border: '3px solid #1a2d4a' }}>

            {/* ══ CARTE GAUCHE — ouverture livre depuis le centre ══ */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '0px 0px -60px 0px' }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ background: 'linear-gradient(160deg, #ddd6ca 0%, #cec5b8 50%, #c0b8aa 100%)', transition: { duration: 0.3 } }}
              whileTap={{ background: 'linear-gradient(160deg, #ddd6ca 0%, #cec5b8 50%, #c0b8aa 100%)', transition: { duration: 0.3 } }}
              className="relative overflow-hidden flex flex-col"
              style={{
                background: 'linear-gradient(160deg, #e8e2d8 0%, #d8d0c4 50%, #ccc4b8 100%)',
                padding: 'clamp(28px, 3vw, 44px) clamp(20px, 2.5vw, 36px)',
                borderRight: '3px solid #1a2d4a',
              }}
            >
              {/* Toile coin haut-gauche */}
              <div className="absolute top-0 left-0 pointer-events-none">
                <SpiderWeb size={80} opacity={0.18} />
              </div>
              <div className="absolute bottom-0 right-0 pointer-events-none" style={{ transform: 'rotate(180deg)' }}>
                <SpiderWeb size={70} opacity={0.14} />
              </div>
              <span className="absolute" style={{ top: '42%', right: '6%', fontSize: 44, opacity: 0.06, fontWeight: 900, color: '#2a1e12', fontFamily: 'var(--font-baloo)' }}>#</span>

              {/* Zone header fixe — même hauteur que carte droite */}
              <div style={{ minHeight: 240, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}>
                <h3 data-nosnippet style={{
                  fontFamily: 'var(--font-baloo)',
                  fontWeight: 900,
                  fontSize: 'clamp(18px, 2vw, 26px)',
                  color: '#1a1a1a',
                  textTransform: 'uppercase',
                  textAlign: 'center',
                  lineHeight: 1.15,
                  marginBottom: 'clamp(12px, 1.5vw, 20px)',
                  letterSpacing: '0.02em',
                }}>
                  1h de cours particulier
                </h3>

                {/* Illustration */}
                <div className="flex justify-center mb-5">
                  <TeacherStudentIcon />
                </div>
              </div>

              {/* Liste inconvénients avec hover */}
              <ul className="flex flex-col gap-2 w-full flex-1">
                {CONS_LEFT.map((txt, i) => <ConsItem key={i} txt={txt} />)}
              </ul>

              {/* Prix */}
              <div className="mt-5 pt-4 w-full text-center" style={{ borderTop: '2px dashed rgba(42,30,18,0.3)' }}>
                <span style={{ fontFamily: 'var(--font-baloo)', fontWeight: 900, fontSize: 'clamp(22px, 2.5vw, 32px)', color: '#5a3a1a' }}>
                  ~800€<span style={{ fontSize: '0.55em', fontWeight: 700 }}>/an</span>
                </span>
              </div>
            </motion.div>

            {/* ══ CARTE DROITE — ouverture livre depuis le centre ══ */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '0px 0px -60px 0px' }}
              transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden flex flex-col"
              style={{
                background: 'linear-gradient(160deg, #f0a020 0%, #e89018 40%, #EC9A26 70%, #F0B840 100%)',
                padding: 'clamp(28px, 3vw, 44px) clamp(20px, 2.5vw, 36px)',
              }}
            >
              {/* Sunburst tournant */}
              <motion.div className="absolute inset-0 pointer-events-none"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 60, ease: 'linear' }}
              >
                <svg width="100%" height="100%" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" style={{ opacity: 0.18 }}>
                  {Array.from({ length: 16 }, (_, i) => {
                    const angle = (i / 16) * Math.PI * 2;
                    const x2 = 200 + Math.cos(angle) * 600;
                    const y2 = 250 + Math.sin(angle) * 600;
                    return <line key={i} x1="200" y1="250" x2={x2} y2={y2} stroke="white" strokeWidth="55" />;
                  })}
                </svg>
              </motion.div>

              {/* Étoiles */}
              <svg className="absolute inset-0 pointer-events-none" width="100%" height="100%" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice">
                <Star5 size={18} x={32}  y={40}  opacity={0.35} />
                <Star5 size={12} x={370} y={60}  opacity={0.28} />
                <Star5 size={22} x={355} y={180} opacity={0.32} />
                <Star5 size={14} x={22}  y={300} opacity={0.30} />
                <Star5 size={16} x={380} y={420} opacity={0.28} />
                <Star5 size={10} x={60}  y={460} opacity={0.25} />
              </svg>

              {/* Zone header fixe — même hauteur que carte gauche */}
              <div style={{ minHeight: 240, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', position: 'relative' }}>
                <LogoVisuD size={260} className="mt-[-40px] mb-[-40px]" />

                {/* Étoiles sous titre */}
                <div className="flex gap-1 justify-center mb-5">
                  {['★','★','★','★','★'].map((s, i) => (
                    <span key={i} style={{ color: '#FFE234', fontSize: 16, textShadow: '0 0 8px rgba(255,226,52,0.8)' }}>{s}</span>
                  ))}
                </div>
              </div>

              {/* Liste avantages avec hover */}
              <ul className="flex flex-col gap-2 w-full flex-1" style={{ position: 'relative' }}>
                {PROS_RIGHT.map((txt, i) => <ProsItem key={i} txt={txt} />)}
              </ul>

              {/* CTA */}
              <div className="mt-5 pt-4 w-full flex flex-col items-center gap-2" style={{ borderTop: '2px solid rgba(255,255,255,0.35)', position: 'relative' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                  <GreekCTA
                    href="https://guide.maths-ultime.fr/paiement"
                    label="ACCÉDER — 97€"
                    size="sm"
                    showBadges={false}
                    goldBorder={false}
                    className="!max-w-[320px]"
                  />
                  <span style={{ fontFamily: 'var(--font-baloo)', fontWeight: 700, fontSize: 12, color: 'rgba(255,255,255,0.75)' }}>
                    paiement unique · accès à vie
                  </span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
