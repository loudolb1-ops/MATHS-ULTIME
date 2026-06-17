'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { Star, Unlock, Lock } from 'lucide-react';
import { GreekCTA } from '@/components/ui';
// CORRECTION 1 : Import universel de framer-motion pour éviter que <motion.div> soit undefined
import { motion, AnimatePresence, useScroll, useInView, useMotionValueEvent, Variants } from 'motion/react';
// useTransform supprimé — lineHeight remplacé par scrollYProgress direct

const modules = [
  { level: 'I', symbol: 'Ω', label: 'OMEGA · LA BASE ABSOLUE', title: 'MINDSET & PRÉREQUIS', desc: "Le module le plus important. Il t'apprendra à avoir la bonne vision des maths, à maximiser tes cours, et les prérequis indispensables. Sans ça, tout le reste est fragile.", illuLabel: 'Mindset & Prérequis' },
  { level: 'II', symbol: 'Σ', label: 'SIGMA · LE CALCUL', title: 'ALGÈBRE & CALCUL', desc: "Équations, inéquations, fonctions, dérivées… On repart sur des bases solides et on monte en puissance pour tout rendre logique.", illuLabel: 'Algèbre & Calcul' },
  { level: 'III', symbol: 'Δ', label: 'DELTA · LA GÉOMÉTRIE', title: 'GÉO & VECTEURS', desc: "Géométrie dans l'espace, produit scalaire, vecteurs dans le plan… On visualise pour tout comprendre et ATOMISER tes DS.", illuLabel: 'Géo & Vecteurs' },
  { level: 'IV', symbol: 'α', label: 'ALPHA · LES PROBABILITÉS', title: 'PROBAS & STATS', desc: "Probabilité conditionnelle, loi binomiale, combinatoire… On décrypte les formules pour avoir une vraie compréhension des probas et prendre l'avantage sur tes potes.", illuLabel: 'Probas & Stats' },
];

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay: i * 0.05, type: "spring", duration: 0.5, bounce: 0 },
      opacity: { delay: i * 0.05, duration: 0.01 }
    }
  })
};

function IlluMindset({ triggered = false }: { triggered?: boolean }) {
  // ── Œil de Zeus — grand, dramatique, divin ──
  // Forme amandine imposante, 12 rayons solaires longs,
  // iris doré avec stries, Ω grand et lisible dans la pupille,
  // sourcil épais, cils expressifs, scintillement animé.
  const EYE_CX = 100, EYE_CY = 100;
  // Forme amandine : coin gauche (28,100), coin droit (172,100), sommet (100,68), bas (100,132)
  const eyePath = "M28,100 C28,82 58,66 100,66 C142,66 172,82 172,100 C172,118 142,134 100,134 C58,134 28,118 28,100 Z";

  return (
    <svg viewBox="0 0 200 210" className="w-full h-full max-w-[220px] mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg" suppressHydrationWarning>
      <defs>
        <radialGradient id="ms-iris" cx="48%" cy="40%" r="58%">
          <stop offset="0%"  stopColor="#ffe066" />
          <stop offset="35%" stopColor="#d4a017" />
          <stop offset="75%" stopColor="#a07010" />
          <stop offset="100%" stopColor="#6a4800" />
        </radialGradient>
        <radialGradient id="ms-pupil" cx="50%" cy="38%" r="55%">
          <stop offset="0%"  stopColor="#0d1830" />
          <stop offset="100%" stopColor="#030810" />
        </radialGradient>
        <radialGradient id="ms-sclera" cx="45%" cy="38%" r="62%">
          <stop offset="0%"  stopColor="#ffffff" />
          <stop offset="70%" stopColor="#f2ead8" />
          <stop offset="100%" stopColor="#e0d4bc" />
        </radialGradient>
        <radialGradient id="ms-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"  stopColor="#ffe066" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffaa00" stopOpacity="0" />
        </radialGradient>
        <clipPath id="ms-eye-clip">
          <path d={eyePath} />
        </clipPath>
        <filter id="ms-glow-filter" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="4" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* ── Halo divin pulsant (derrière tout) ── */}
      <motion.ellipse cx={EYE_CX} cy={EYE_CY} rx="82" ry="52"
        fill="url(#ms-glow)"
        animate={triggered ? { opacity: [0.6, 1, 0.6], rx: [82, 88, 82], ry: [52, 58, 52] } : { opacity: 0 }}
        transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
      />

      {/* ── 12 rayons solaires longs ── */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i * 30 - 90) * Math.PI / 180;
        const isCardinal = i % 3 === 0;
        const r1 = isCardinal ? 60 : 56;
        const r2 = isCardinal ? 92 : 80;
        return (
          <motion.line key={i}
            x1={EYE_CX + Math.cos(angle) * r1} y1={EYE_CY + Math.sin(angle) * r1}
            x2={EYE_CX + Math.cos(angle) * r2} y2={EYE_CY + Math.sin(angle) * r2}
            stroke="#d4a017"
            strokeWidth={isCardinal ? 2.5 : 1.5}
            strokeLinecap="round"
            filter="url(#ms-glow-filter)"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={triggered ? { opacity: isCardinal ? 0.95 : 0.7, pathLength: 1 } : { opacity: 0, pathLength: 0 }}
            transition={{ delay: 0.7 + i * 0.04, duration: 0.35 }}
          />
        );
      })}

      {/* ── Sourcil épais arqué ── */}
      <motion.path
        d="M48,56 C65,44 135,44 152,56"
        stroke="#1a2d4a" strokeWidth="5" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={triggered ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />

      {/* ── Blanc de l'œil ── */}
      <motion.path d={eyePath}
        fill="url(#ms-sclera)"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={triggered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={{ transformOrigin: `${EYE_CX}px ${EYE_CY}px` }}
      />

      {/* ── Iris doré grand ── */}
      <motion.circle cx={EYE_CX} cy={EYE_CY} r="30"
        fill="url(#ms-iris)" stroke="#8a5f00" strokeWidth="1.8"
        clipPath="url(#ms-eye-clip)"
        initial={{ scale: 0 }}
        animate={triggered ? { scale: 1 } : { scale: 0 }}
        transition={{ delay: 0.25, type: 'spring', stiffness: 160 }}
        style={{ transformOrigin: `${EYE_CX}px ${EYE_CY}px` }}
      />

      {/* ── Stries iris — 18 rayons fins ── */}
      {Array.from({ length: 18 }, (_, i) => {
        const a = (i * 20) * Math.PI / 180;
        return (
          <motion.line key={i}
            x1={EYE_CX + Math.cos(a) * 12} y1={EYE_CY + Math.sin(a) * 12}
            x2={EYE_CX + Math.cos(a) * 28} y2={EYE_CY + Math.sin(a) * 28}
            stroke="#8a5f00" strokeWidth="0.9"
            clipPath="url(#ms-eye-clip)"
            initial={{ opacity: 0 }}
            animate={triggered ? { opacity: 0.45 } : { opacity: 0 }}
            transition={{ delay: 0.4 + i * 0.02 }}
          />
        );
      })}

      {/* ── Pupille sombre ── */}
      <motion.circle cx={EYE_CX} cy={EYE_CY} r="16"
        fill="url(#ms-pupil)"
        clipPath="url(#ms-eye-clip)"
        initial={{ scale: 0 }}
        animate={triggered ? { scale: 1 } : { scale: 0 }}
        transition={{ delay: 0.45, type: 'spring', stiffness: 200 }}
        style={{ transformOrigin: `${EYE_CX}px ${EYE_CY}px` }}
      />

      {/* ── Ω grand et lisible dans la pupille ── */}
      <motion.text
        x={EYE_CX} y={EYE_CY + 6}
        textAnchor="middle"
        fill="#f0c030"
        fontSize="17"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontWeight="bold"
        clipPath="url(#ms-eye-clip)"
        style={{ letterSpacing: 0 }}
        initial={{ opacity: 0, scale: 0.3 }}
        animate={triggered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.3 }}
        transition={{ delay: 0.7, type: 'spring', stiffness: 180 }}
      >Ω</motion.text>

      {/* ── Reflets (highlights) ── */}
      <motion.ellipse cx="82" cy="88" rx="6" ry="4"
        fill="rgba(255,255,255,0.8)" clipPath="url(#ms-eye-clip)"
        initial={{ opacity: 0 }}
        animate={triggered ? { opacity: 0.8 } : { opacity: 0 }}
        transition={{ delay: 0.85 }}
      />
      <motion.ellipse cx="92" cy="92" rx="2.5" ry="1.8"
        fill="rgba(255,255,255,0.55)" clipPath="url(#ms-eye-clip)"
        initial={{ opacity: 0 }}
        animate={triggered ? { opacity: 0.55 } : { opacity: 0 }}
        transition={{ delay: 0.9 }}
      />

      {/* ── Contour paupières ── */}
      <motion.path d={eyePath}
        stroke="#1a2d4a" strokeWidth="3"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={triggered ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut', delay: 0.05 }}
      />

      {/* ── Cils coins ── */}
      <motion.path d="M28,100 C22,94 16,89 12,83" stroke="#1a2d4a" strokeWidth="2.5" strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={triggered ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ delay: 0.6, duration: 0.3 }} />
      <motion.path d="M172,100 C178,94 184,89 188,83" stroke="#1a2d4a" strokeWidth="2.5" strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={triggered ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ delay: 0.65, duration: 0.3 }} />

      {/* ── Scintillement pupille — animation loop ── */}
      <motion.circle cx={EYE_CX} cy={EYE_CY} r="16"
        fill="none" stroke="#f0c030" strokeWidth="0.8"
        clipPath="url(#ms-eye-clip)"
        animate={triggered ? { opacity: [0, 0.4, 0], scale: [0.8, 1.15, 0.8] } : { opacity: 0 }}
        transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut', delay: 1.2 }}
        style={{ transformOrigin: `${EYE_CX}px ${EYE_CY}px` }}
      />

      {/* ── Label ── */}
      <motion.text x={EYE_CX} y="160" textAnchor="middle"
        fill="#d4a017" fontSize="11" fontStyle="italic" fontFamily="Georgia, serif" fontWeight="bold"
        initial={{ opacity: 0 }}
        animate={triggered ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.1, duration: 0.5 }}
      >Mindset &amp; Prérequis</motion.text>
    </svg>
  );
}

function IlluAlgebre() {
  return (
    <svg viewBox="0 0 220 200" className="w-full h-full max-w-[200px] mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.rect custom={0} variants={draw} initial="hidden" animate="visible" x="20" y="20" width="165" height="165" stroke="#1a2d4a" strokeWidth="2.5" />
      <motion.line custom={1} variants={draw} initial="hidden" animate="visible" x1="120" y1="20" x2="120" y2="185" stroke="#1a2d4a" strokeWidth="1.5" strokeDasharray="5 3" />
      <motion.line custom={2} variants={draw} initial="hidden" animate="visible" x1="20" y1="120" x2="185" y2="120" stroke="#1a2d4a" strokeWidth="1.5" strokeDasharray="5 3" />
      <motion.g initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, duration: 0.5 }}>
        <text x="68" y="79" textAnchor="middle" fill="#1a2d4a" fontSize="20" fontStyle="italic" fontFamily="Georgia, serif" fontWeight="bold">a²</text>
        <text x="153" y="79" textAnchor="middle" fill="#d4a017" fontSize="16" fontStyle="italic" fontFamily="Georgia, serif">ab</text>
        <text x="68" y="158" textAnchor="middle" fill="#d4a017" fontSize="16" fontStyle="italic" fontFamily="Georgia, serif">ab</text>
        <text x="153" y="158" textAnchor="middle" fill="#1a2d4a" fontSize="20" fontStyle="italic" fontFamily="Georgia, serif" fontWeight="bold">b²</text>
      </motion.g>
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.5 }}>
        <text x="70" y="14" textAnchor="middle" fill="#1a2d4a" fontSize="12" fontStyle="italic" fontFamily="Georgia, serif">a</text>
        <text x="152" y="14" textAnchor="middle" fill="#1a2d4a" fontSize="12" fontStyle="italic" fontFamily="Georgia, serif">b</text>
        <text x="10" y="74" textAnchor="middle" fill="#1a2d4a" fontSize="12" fontStyle="italic" fontFamily="Georgia, serif">a</text>
        <text x="10" y="157" textAnchor="middle" fill="#1a2d4a" fontSize="12" fontStyle="italic" fontFamily="Georgia, serif">b</text>
        <text x="110" y="197" textAnchor="middle" fill="#d4a017" fontSize="12" fontStyle="italic" fontFamily="Georgia, serif" fontWeight="bold">(a+b)² = a² + 2ab + b²</text>
      </motion.g>
    </svg>
  );
}

function IlluGeometrie() {
  // Cercle trigonométrique — centre O, rayon 68
  // Point M à θ=50° → cos50°≈0.643, sin50°≈0.766
  const cx = 110, cy = 105, r = 68;
  const theta = 50 * Math.PI / 180;
  const Mx = cx + r * Math.cos(-theta);  // SVG y inversé
  const My = cy - r * Math.sin(theta);   // sin positif = vers le haut
  // Projection sur axe x (pied Mx)
  const Px = Mx, Py = cy;
  // Projection sur axe y (pied My)
  const Qx = cx, Qy = My;

  return (
    <svg viewBox="0 0 220 200" className="w-full h-full max-w-[200px] mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">

      {/* Halo fond */}
      <motion.ellipse cx={cx} cy={cy} rx="74" ry="72"
        fill="rgba(212,160,23,0.06)"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
      />

      {/* ── Cercle unité ── */}
      <motion.circle
        cx={cx} cy={cy} r={r}
        stroke="#1a2d4a" strokeWidth="1.8" fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      />

      {/* ── Axes ── */}
      {/* Axe x */}
      <motion.line custom={0} variants={draw} initial="hidden" animate="visible"
        x1={cx - r - 10} y1={cy} x2={cx + r + 14} y2={cy}
        stroke="#1a2d4a" strokeWidth="1.8" strokeLinecap="round"
      />
      {/* Flèche axe x */}
      <motion.polygon points={`${cx+r+14},${cy} ${cx+r+6},${cy-4} ${cx+r+6},${cy+4}`}
        fill="#1a2d4a" initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.4 }} />
      {/* Axe y */}
      <motion.line custom={1} variants={draw} initial="hidden" animate="visible"
        x1={cx} y1={cy + r + 10} x2={cx} y2={cy - r - 14}
        stroke="#1a2d4a" strokeWidth="1.8" strokeLinecap="round"
      />
      {/* Flèche axe y */}
      <motion.polygon points={`${cx},${cy-r-14} ${cx-4},${cy-r-6} ${cx+4},${cy-r-6}`}
        fill="#1a2d4a" initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.5 }} />

      {/* ── Rayon OM (or) ── */}
      <motion.line custom={2} variants={draw} initial="hidden" animate="visible"
        x1={cx} y1={cy} x2={Mx} y2={My}
        stroke="#d4a017" strokeWidth="2.2" strokeLinecap="round"
      />

      {/* ── Projections en tirets rouges ── */}
      {/* Vertical : M → pied sur axe x */}
      <motion.line custom={3} variants={draw} initial="hidden" animate="visible"
        x1={Px} y1={Py} x2={Mx} y2={My}
        stroke="#c0392b" strokeWidth="1.3" strokeDasharray="4 3" strokeLinecap="round"
      />
      {/* Horizontal : M → pied sur axe y */}
      <motion.line custom={4} variants={draw} initial="hidden" animate="visible"
        x1={Qx} y1={Qy} x2={Mx} y2={My}
        stroke="#c0392b" strokeWidth="1.3" strokeDasharray="4 3" strokeLinecap="round"
      />

      {/* ── Arc θ ── */}
      <motion.path
        d={`M ${cx + 22} ${cy} A 22 22 0 0 0 ${cx + 22 * Math.cos(-theta)} ${cy - 22 * Math.sin(theta)}`}
        stroke="#1a2d4a" strokeWidth="1.4" fill="none" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      />

      {/* ── Point M ── */}
      <motion.circle cx={Mx} cy={My} r={4} fill="#d4a017" stroke="#1a2d4a" strokeWidth="1.5"
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ delay: 0.75, type: 'spring', stiffness: 250 }}
        style={{ transformOrigin: `${Mx}px ${My}px` }}
      />

      {/* ── Labels ── */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85, duration: 0.4 }}>
        {/* O */}
        <text x={cx - 14} y={cy + 13} fill="#1a2d4a" fontSize="12" fontStyle="italic" fontFamily="Georgia, serif" fontWeight="bold">O</text>
        {/* M */}
        <text x={Mx + 5} y={My - 5} fill="#d4a017" fontSize="12" fontStyle="italic" fontFamily="Georgia, serif" fontWeight="bold">M</text>
        {/* θ */}
        <text x={cx + 26} y={cy - 8} fill="#1a2d4a" fontSize="12" fontStyle="italic" fontFamily="Georgia, serif" fontWeight="bold">θ</text>
        {/* cosθ sur axe x */}
        <text x={Px} y={cy + 14} textAnchor="middle" fill="#c0392b" fontSize="9" fontStyle="italic" fontFamily="Georgia, serif">cosθ</text>
        {/* sinθ sur axe y */}
        <text x={cx - 22} y={Qy + 4} textAnchor="end" fill="#c0392b" fontSize="9" fontStyle="italic" fontFamily="Georgia, serif">sinθ</text>
        {/* 1 sur axe x */}
        <text x={cx + r} y={cy + 13} textAnchor="middle" fill="#1a2d4a" fontSize="10" fontFamily="Georgia, serif">1</text>
      </motion.g>

      {/* ── Formule en bas ── */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.05, duration: 0.5 }}>
        <text x={cx} y="192" textAnchor="middle" fill="#d4a017" fontSize="11.5" fontStyle="italic" fontFamily="Georgia, serif" fontWeight="bold">cos²θ + sin²θ = 1</text>
      </motion.g>
    </svg>
  );
}

function IlluProbas() {
  return (
    <svg viewBox="0 0 220 210" className="w-full h-full max-w-[200px] mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.circle initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5 }} cx="28" cy="105" r="5" fill="#d4a017" />
      <motion.line custom={0} variants={draw} initial="hidden" animate="visible" x1="33" y1="100" x2="95" y2="62" stroke="#1a2d4a" strokeWidth="2" />
      <motion.line custom={1} variants={draw} initial="hidden" animate="visible" x1="33" y1="110" x2="95" y2="148" stroke="#1a2d4a" strokeWidth="2" />
      <motion.circle initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }} cx="100" cy="60" r="5" fill="#1a2d4a" />
      <motion.circle initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4 }} cx="100" cy="150" r="5" fill="#1a2d4a" />
      <motion.line custom={2} variants={draw} initial="hidden" animate="visible" x1="105" y1="57" x2="170" y2="33" stroke="#1a2d4a" strokeWidth="1.5" />
      <motion.line custom={3} variants={draw} initial="hidden" animate="visible" x1="105" y1="63" x2="170" y2="87" stroke="#1a2d4a" strokeWidth="1.5" />
      <motion.line custom={4} variants={draw} initial="hidden" animate="visible" x1="105" y1="147" x2="170" y2="123" stroke="#1a2d4a" strokeWidth="1.5" />
      <motion.line custom={5} variants={draw} initial="hidden" animate="visible" x1="105" y1="153" x2="170" y2="177" stroke="#1a2d4a" strokeWidth="1.5" />
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.5 }}>
        <circle cx="174" cy="31" r="4" fill="#1a2d4a" opacity="0.7" />
        <circle cx="174" cy="89" r="4" fill="#1a2d4a" opacity="0.7" />
        <circle cx="174" cy="121" r="4" fill="#1a2d4a" opacity="0.7" />
        <circle cx="174" cy="179" r="4" fill="#1a2d4a" opacity="0.7" />
        <text x="100" y="50" textAnchor="middle" fill="#1a2d4a" fontSize="13" fontStyle="italic" fontFamily="Georgia, serif" fontWeight="bold">A</text>
        <text x="100" y="170" textAnchor="middle" fill="#1a2d4a" fontSize="13" fontStyle="italic" fontFamily="Georgia, serif" fontWeight="bold">Ā</text>
        <text x="58" y="72" fill="#d4a017" fontSize="11" fontStyle="italic" fontFamily="Georgia, serif">0,6</text>
        <text x="55" y="140" fill="#d4a017" fontSize="11" fontStyle="italic" fontFamily="Georgia, serif">0,4</text>
        <text x="136" y="36" fill="#1a2d4a" fontSize="10" fontStyle="italic" fontFamily="Georgia, serif">B|A  0,7</text>
        <text x="132" y="83" fill="#1a2d4a" fontSize="10" fontStyle="italic" fontFamily="Georgia, serif">B̄|A  0,3</text>
        <text x="130" y="118" fill="#1a2d4a" fontSize="10" fontStyle="italic" fontFamily="Georgia, serif">B|Ā  0,5</text>
        <text x="130" y="175" fill="#1a2d4a" fontSize="10" fontStyle="italic" fontFamily="Georgia, serif">B̄|Ā  0,5</text>
        <text x="110" y="204" textAnchor="middle" fill="#d4a017" fontSize="12" fontStyle="italic" fontFamily="Georgia, serif" fontWeight="bold">Arbre de probabilités</text>
      </motion.g>
    </svg>
  );
}

const ILLUSTRATIONS = [IlluMindset, IlluAlgebre, IlluGeometrie, IlluProbas];

function Diamond({ symbol, active, isPast }: { symbol: string; active: boolean; isPast: boolean }) {
  return (
    <div className="relative w-[42px] h-[42px] flex items-center justify-center">
      <motion.div
        animate={{
          scale: active ? 1.1 : 1,
          backgroundColor: active || isPast ? '#d4a017' : '#f8fafc',
          boxShadow: active
            ? '0 0 15px rgba(212,160,23,0.5), 4px 4px 0 #1a2d4a'
            : '4px 4px 0 #1a2d4a',
          borderColor: '#1a2d4a'
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="absolute inset-0 border-[2.5px] rotate-45"
      />
      <motion.span
        animate={{ color: active || isPast ? '#1a2d4a' : '#1a2d4a' }}
        className="relative z-10 font-cinzel font-black flex items-center justify-center leading-none text-[16px]"
      >
        {symbol}
      </motion.span>
    </div>
  );
}

// CORRECTION 2 : On définit la fonction, puis on l'exporte à la fois par défaut ET nommée.
// Comme ça, peu importe comment tu l'importes dans ta LandingPage, ça marchera à 100%.
function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const modulesEndRef = useRef<HTMLDivElement>(null);
  const firstCardRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardPositions = useRef<number[]>([]);
  const [activeModule, setActiveModule] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const firstCardInView = useInView(firstCardRef, { once: false, margin: '0px 0px -10% 0px' });

  useEffect(() => {
    const updatePositions = () => {
      if (!cardRefs.current.length) return;
      cardPositions.current = cardRefs.current.map(ref => {
        if (!ref) return 0;
        const rect = ref.getBoundingClientRect();
        return rect.top + window.scrollY + rect.height / 2;
      });
    };

    setTimeout(updatePositions, 100);
    window.addEventListener('resize', updatePositions);
    return () => window.removeEventListener('resize', updatePositions);
  }, []);

  // Limit left panel height to modules section so sticky stops before the CTA
  useEffect(() => {
    const syncHeight = () => {
      if (!leftPanelRef.current || !modulesEndRef.current) return;
      const panelTop = leftPanelRef.current.getBoundingClientRect().top + window.scrollY;
      const modulesBottom = modulesEndRef.current.getBoundingClientRect().top + window.scrollY;
      leftPanelRef.current.style.height = `${modulesBottom - panelTop}px`;
    };

    setTimeout(syncHeight, 200);
    window.addEventListener('resize', syncHeight);
    return () => window.removeEventListener('resize', syncHeight);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!cardPositions.current.length) return;
    const viewportCenter = latest + window.innerHeight * 0.5;
    let closestIdx = activeModule;
    let minDistance = Infinity;

    cardPositions.current.forEach((cardCenter, i) => {
      const distance = Math.abs(viewportCenter - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIdx = i;
      }
    });

    if (closestIdx !== activeModule) {
      setActiveModule(closestIdx);
    }
  });

  useEffect(() => {
    if (activeModule >= modules.length) setIsUnlocked(true);
  }, [activeModule]);

  const ActiveIllustration = ILLUSTRATIONS[Math.min(activeModule, modules.length - 1)];

  return (
    <section id="guide-content" ref={containerRef} className="relative border-t-4 border-[#1a2d4a] bg-[#d4e8f5]">

      {/* BACKGROUND ACCENTS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-gradient-to-br from-[#d4a017] to-transparent blur-3xl" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-gradient-to-tl from-[#1a2d4a] to-transparent blur-3xl" />
      </div>

      {/* TITRE */}
      <div className="relative z-10 text-center pt-12 pb-10 md:pt-20 md:pb-16 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-cinzel font-black text-[clamp(26px,4.5vw,58px)] text-[#1a2d4a] leading-[1.1] uppercase"
        >
          Ce que contient le guide
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="font-inter text-[clamp(14px,1.3vw,17px)] text-[#1a2d4a]/75 mt-3 font-medium"
        >
          4 modules pour tout maîtriser, du sol au sommet
        </motion.p>

        {/* Badges produit */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
          className="flex flex-wrap justify-center gap-3 mt-6"
        >
          {[
            { emoji: '🎬', label: '100% vidéos — zéro PDF' },
            { emoji: '📐', label: 'Tout le programme du lycée' },
            { emoji: '⚡', label: 'Apprentissage actif, pas passif' },
          ].map(({ emoji, label }) => (
            <span key={label} style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '6px 16px',
              borderRadius: 9999,
              background: 'rgba(26,45,74,0.07)',
              border: '1.5px solid rgba(26,45,74,0.18)',
              fontFamily: 'var(--font-baloo)',
              fontWeight: 600,
              fontSize: 'clamp(12px,1.1vw,14px)',
              color: '#1a2d4a',
            }}>
              <span>{emoji}</span>{label}
            </span>
          ))}
        </motion.div>

        {/* Bloc quizz */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
          className="flex items-center justify-center gap-4 mt-8"
        >
          <Image src="/innocent souriant.png" alt="chibi souriant" width={120} height={120} className="drop-shadow-md shrink-0" unoptimized />
          <p style={{
            fontFamily: 'var(--font-baloo)',
            fontWeight: 600,
            fontSize: 'clamp(13px,1.2vw,16px)',
            color: '#1a2d4a',
            background: 'rgba(26,45,74,0.06)',
            border: '1.5px solid rgba(26,45,74,0.15)',
            borderRadius: 14,
            padding: '10px 20px',
            maxWidth: 420,
            lineHeight: 1.5,
          }}>
            ✅ Chaque vidéo se termine par un <strong>quizz</strong> pour vérifier que tu as bien compris le chapitre.
          </p>
        </motion.div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 pb-28">
        <div className="flex gap-8 lg:gap-16">

          {/* PANNEAU ILLUSTRATION GAUCHE — sticky (Desktop Only) */}
          {/* Height is set dynamically to stop sticky before the CTA */}
          <div ref={leftPanelRef} className="hidden md:block shrink-0 w-[280px]">
            <div className="sticky top-[25vh]">
              <motion.div
                className="flex flex-col items-center rounded-2xl overflow-hidden bg-white border-4 border-[#1a2d4a] shadow-[8px_8px_0_#1a2d4a] p-8 pb-5"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="relative flex items-center justify-center h-[200px] w-full">
                  <AnimatePresence>
                    <motion.div
                      key={Math.min(activeModule, modules.length - 1)}
                      initial={{ opacity: 0, scale: 0.9, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, scale: 0.9, filter: 'blur(4px)' }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      {activeModule === 0
                        ? <IlluMindset triggered={firstCardInView} />
                        : <ActiveIllustration />
                      }
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="relative w-full h-[40px] mt-4 border-t-2 border-[#1a2d4a]/10">
                  <AnimatePresence>
                    <motion.div
                      key={`label-${Math.min(activeModule, modules.length - 1)}`}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-x-0 top-3 text-center"
                    >
                      <span className="font-cinzel font-bold text-xs text-[#1a2d4a] tracking-[0.15em] uppercase">
                        {modules[Math.min(activeModule, modules.length - 1)].illuLabel}
                      </span>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Dots Indicator */}
              <div className="flex justify-center gap-3 mt-6">
                {modules.map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      width: i === activeModule ? 28 : 10,
                      backgroundColor: i === activeModule ? '#d4a017' : 'rgba(26,45,74,0.2)'
                    }}
                    transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
                    whileHover={{ scale: 1.5, backgroundColor: '#d4a017', transition: { type: 'spring', stiffness: 500, damping: 15 } }}
                    whileTap={{ scale: 1.5, backgroundColor: '#d4a017', transition: { type: 'spring', stiffness: 500, damping: 15 } }}
                    className={`h-2.5 rounded-full border-2 cursor-pointer ${i === activeModule ? 'border-[#1a2d4a]' : 'border-transparent'}`}
                    onClick={() => {
                      const card = cardRefs.current[i];
                      if (!card) return;
                      const top = card.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.35;
                      window.scrollTo({ top, behavior: 'smooth' });
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* TIMELINE DROITE (Modules + CTA liés) */}
          <div ref={timelineRef} className="flex-1 min-w-0 relative">

            {/* Ligne verticale de base (grisée) */}
            <div className="absolute top-0 bottom-0 left-[21px] w-[3px] bg-[#1a2d4a]/10 rounded-full" />

            {/* Ligne verticale de progression (Or/Bleu) */}
            <motion.div
              className="absolute top-0 bottom-0 left-[21px] w-[3px] rounded-full origin-top bg-gradient-to-b from-[#d4a017] via-[#7ec8d8] to-[#d4a017] shadow-[0_0_12px_rgba(212,160,23,0.8)]"
              style={{ scaleY: scrollYProgress }}
            />

            {/* Flex Container Modules + CTA */}
            <div className="flex flex-col gap-12 pb-8">
              {modules.map((mod, i) => {
                const isActive = activeModule === i;
                const isPast = i < activeModule;
                const MobileIllu = ILLUSTRATIONS[i];

                return (
                  <motion.div
                    key={i}
                    ref={(el) => { cardRefs.current[i] = el; if (i === 0) firstCardRef.current = el; }}
                    className="flex items-start gap-6 lg:gap-8 relative"
                  >
                    <div className="shrink-0 mt-5 z-10">
                      <Diamond symbol={mod.symbol} active={isActive} isPast={isPast} />
                    </div>

                    <motion.div
                      className="flex-1 rounded-2xl bg-white cursor-default border-[3px] p-[clamp(24px,2.5vw,32px)] relative overflow-hidden"
                      animate={{
                        backgroundColor: isActive || isPast ? '#ffffff' : '#f8fafc',
                        opacity: isActive ? 1 : isPast ? 0.85 : 0.4,
                        scale: isActive ? 1 : 0.98,
                        boxShadow: isActive
                          ? '6px 6px 0 #1a2d4a, 0 12px 30px rgba(212,160,23,0.15)'
                          : isPast
                            ? '4px 4px 0 rgba(212,160,23,0.2)'
                            : '4px 4px 0 rgba(26,45,74,0.05)',
                        borderColor: isActive ? '#1a2d4a' : isPast ? 'rgba(212,160,23,0.4)' : 'rgba(26,45,74,0.15)'
                      }}
                      whileHover={{
                        scale: isActive ? 1.02 : 0.99,
                        opacity: 1,
                        boxShadow: isActive ? '8px 8px 0 #1a2d4a, 0 15px 35px rgba(212,160,23,0.2)' : isPast ? '4px 4px 0 rgba(212,160,23,0.4)' : '4px 4px 0 rgba(26,45,74,0.1)',
                        transition: { type: 'spring', stiffness: 700, damping: 30 },
                      }}
                      whileTap={{
                        scale: isActive ? 1.02 : 0.99,
                        opacity: 1,
                        boxShadow: isActive ? '8px 8px 0 #1a2d4a, 0 15px 35px rgba(212,160,23,0.2)' : isPast ? '4px 4px 0 rgba(212,160,23,0.4)' : '4px 4px 0 rgba(26,45,74,0.1)',
                        transition: { type: 'spring', stiffness: 700, damping: 30 },
                      }}
                      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      {/* Mobile Illustration (Thumbnail) */}
                      <div className="md:hidden absolute top-6 right-6 w-16 h-16 opacity-10 pointer-events-none">
                        <MobileIllu />
                      </div>

                      <motion.p
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="font-montserrat font-extrabold text-[11px] text-[#997300] tracking-[0.18em] uppercase mb-2 relative z-10"
                      >
                        MODULE {mod.level} — {mod.label}
                      </motion.p>
                      <motion.h3
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="font-cinzel font-bold text-[clamp(20px,2.2vw,26px)] text-[#1a2d4a] mb-2.5 leading-[1.2] relative z-10"
                      >
                        {mod.title}
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="font-inter text-[clamp(14px,1.2vw,15px)] text-[#1a2d4a]/75 leading-[1.65] font-normal relative z-10"
                      >
                        {mod.desc}
                      </motion.p>
                    </motion.div>
                  </motion.div>
                );
              })}

              {/* Sentinel: sticky panel height stops here, before the CTA */}
              <div ref={modulesEndRef} />

              {/* CTA FINAL */}
              <div ref={(el) => { cardRefs.current[4] = el; }}>
              <motion.div
                className="flex items-center gap-6 lg:gap-8 relative"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "0px 0px -10% 0px", amount: 0.2, once: true }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              >
                 <div className="shrink-0 z-10 w-[42px] flex justify-center">
                    <motion.div
                      className="flex items-center justify-center w-[42px] h-[42px] rounded-full relative z-20 bg-[#1a2d4a] border-[2.5px] border-[#d4a017]"
                      animate={{
                        boxShadow: isUnlocked
                          ? '0 0 18px rgba(212,160,23,0.45)'
                          : '0 0 0px rgba(212,160,23,0)',
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <AnimatePresence mode="wait">
                        {isUnlocked ? (
                          <motion.div
                            key="unlock"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          >
                            <Unlock className="w-5 h-5 text-[#d4a017]" />
                          </motion.div>
                        ) : (
                          <motion.div key="lock" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                            <Lock className="w-4 h-4 text-[#d4a017]/70" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                 </div>

                 <div className="flex-1 rounded-xl flex flex-col items-center text-center bg-white relative overflow-hidden border-[3px] border-[#1a2d4a] shadow-[6px_6px_0_#1a2d4a] py-8 px-6 sm:px-10">
                     <div className="relative z-10 flex flex-col items-center w-full">
                         <h3 className="font-cinzel font-black text-[clamp(22px,3vw,28px)] text-[#1a2d4a] uppercase leading-[1.2] mb-5">
                           PRÊT À PLIER LE PROCHAIN DS ?
                         </h3>

                         <div className="relative z-10 w-full max-w-[90%] sm:max-w-[440px] mb-4">
                           <GreekCTA size="md" goldBorder={false} showBadges={false} />
                         </div>

                         <div className="flex gap-1.5 justify-center mb-2">
                           {[...Array(5)].map((_, i) => (
                             <Star key={i} className="w-4 h-4 fill-[#d4a017] text-[#d4a017]" />
                           ))}
                         </div>
                         <p className="font-montserrat text-[10px] sm:text-[11px] text-[#1a2d4a]/40 tracking-[0.1em] uppercase font-bold">
                           ACCÈS IMMÉDIAT · PAIEMENT UNIQUE
                         </p>
                     </div>
                 </div>
              </motion.div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Timeline;
export { Timeline };