'use client';

import Image from 'next/image';
import { Play, Infinity as InfinityIcon, ShieldCheck, Lock, MessageCircle } from 'lucide-react';
import { GreekCTA } from '@/components/ui';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { faqItems, offerConfig } from '@/lib/offer';
import { LogoVisuD } from '@/components/LogoVisuD';

// ─── COUNTDOWN shared hook ───────────────────────────────────────────────────
function useCountdown() {
  const [timeLeft, setTimeLeft] = useState({ d: 2, h: 23, m: 59, s: 59 });
  useEffect(() => {
    const target = offerConfig.countdownTarget
      ? new Date(offerConfig.countdownTarget).getTime()
      : Date.now() + 48 * 60 * 60 * 1000;
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      setTimeLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  const pad = (n: number) => String(n).padStart(2, '0');
  return [
    { val: pad(timeLeft.d), unit: 'j' },
    { val: pad(timeLeft.h), unit: 'h' },
    { val: pad(timeLeft.m), unit: 'm' },
    { val: pad(timeLeft.s), unit: 's' },
  ];
}

// Digits only — used inline inside the price card
function CountdownInner() {
  const segments = useCountdown();
  return (
    <>
      {segments.map((seg, i) => (
        <span key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
          {i > 0 && <span style={{ fontFamily: 'var(--font-baloo)', fontSize: 'clamp(12px, 4vw, 16px)', color: '#8a7968', margin: '0 2px' }}>·</span>}
          <span style={{ fontFamily: 'var(--font-baloo)', fontWeight: 900, fontSize: 'clamp(16px, 5vw, 20px)', color: '#2a1e12' }}>{seg.val}</span>
          <span style={{ fontFamily: 'var(--font-baloo)', fontWeight: 700, fontSize: 'clamp(9px, 2.5vw, 10px)', color: '#6a5e4e' }}>{seg.unit}</span>
        </span>
      ))}
    </>
  );
}

// ─── FAQ ────────────────────────────────────────────────────────────────────
const FAQ_VARIANTS = [
  { bg: '#dce8f5', border: '#1a2d4a', shadow: '#071229', divider: 'rgba(26,45,74,0.25)' },
  { bg: '#c8dff0', border: '#1a2d4a', shadow: '#071229', divider: 'rgba(26,45,74,0.25)' },
];

function FAQItem({ faq, index }: { faq: { q: string; a: string }; index: number }) {
  const [open, setOpen] = useState(false);
  const v = FAQ_VARIANTS[index % 2];
  return (
    <div style={{
      background: v.bg, border: `3px solid ${v.border}`, borderRadius: 10,
      boxShadow: open ? `4px 4px 0 ${v.shadow}` : `3px 3px 0 ${v.shadow}`,
      overflow: 'hidden', transition: 'box-shadow 0.2s ease',
    }}>
      <motion.button onClick={() => setOpen(!open)} className="w-full text-left flex justify-between items-center outline-none"
        style={{ padding: 'clamp(14px,1.5vw,18px) clamp(16px,2vw,22px)', gap: 16, cursor: 'default' }}
        whileHover={{ x: 3, transition: { type: 'spring', stiffness: 280, damping: 30 } }}
        whileTap={{ x: 3, transition: { type: 'spring', stiffness: 280, damping: 30 } }}>
        <span style={{ fontFamily: 'var(--font-baloo)', fontWeight: 700, fontSize: 'clamp(13px,1.1vw,15px)', color: '#1a2d4a', letterSpacing: '.02em' }}>{faq.q}</span>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          whileHover={{ rotate: open ? 45 : 45, boxShadow: '0 0 12px rgba(236,100,38,0.5)', transition: { duration: 0.08, ease: 'easeOut' } }}
          whileTap={{ rotate: 45, boxShadow: '0 0 12px rgba(236,100,38,0.5)', transition: { duration: 0.08, ease: 'easeOut' } }}
          className="flex items-center justify-center shrink-0"
          style={{ width: 32, height: 32, borderRadius: '50%', background: '#EC6426', flexShrink: 0, cursor: 'pointer' }}
        >
          <span style={{ color: '#fff', fontSize: 20, fontFamily: 'var(--font-baloo)', lineHeight: 1, display: 'block', marginTop: -1 }}>+</span>
        </motion.div>
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }} className="overflow-hidden">
            <div style={{ padding: `0 clamp(16px,2vw,22px) clamp(14px,1.5vw,18px)`, borderTop: `1px solid ${v.divider}` }}>
              <p style={{ fontFamily: 'var(--font-baloo)', fontSize: 'clamp(13px,1vw,15px)', color: 'rgba(26,45,74,0.7)', lineHeight: 1.65, fontWeight: 500, marginTop: 12 }}>{faq.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
/** Pricing section — structure CS MS adaptée DA grecque */
export function PricingSection() {
  return (
    <section id="pricing" className="relative overflow-hidden py-16 md:py-32 px-4 md:px-8 pb-10 md:pb-20"
      style={{ background: 'linear-gradient(180deg,#071229 0%,#0a1628 45%,#0d1b3e 80%,#071229 100%)' }}>

      {/* Ligne dorée haut */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,transparent,#e8c96a 30%,#EC6426 50%,#e8c96a 70%,transparent)' }} />

      {/* Grille de fond — pointillés bien visibles */}
      <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #e8c96a 1.8px, transparent 1.8px)', backgroundSize: '28px 28px', opacity: 0.18 }} />

      {/* Symboles grecs — plus visibles */}
      {[{ s: 'Σ', t: 6, l: 3, sz: 52, r: -12 }, { s: 'Ω', t: 74, l: 2, sz: 40, r: 18 }, { s: 'Δ', t: 8, l: 92, sz: 46, r: 8 }, { s: 'π', t: 78, l: 89, sz: 36, r: -20 }].map((m, i) => (
        <span key={i} className="absolute select-none pointer-events-none" style={{ top: `${m.t}%`, left: `${m.l}%`, fontSize: m.sz, opacity: 0.14, color: '#e8c96a', transform: `rotate(${m.r}deg)`, fontFamily: 'var(--font-baloo)', fontWeight: 700 }}>{m.s}</span>
      ))}

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── TITRE ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -60px 0px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16">
          <h2
            className="flex flex-wrap justify-center items-center gap-x-4 gap-y-4 uppercase mb-6"
            style={{ fontFamily: 'var(--font-cinzel)', fontWeight: 900, fontSize: 'clamp(28px,5vw,64px)', color: '#f5ecd4', lineHeight: 1.05, textShadow: '0 4px 30px rgba(0,0,0,0.3)' }}
          >
            <span>L&apos;offre</span>
            <span
              className="transform -rotate-2 inline-block"
              style={{ background: '#EC6426', color: '#f5ecd4', padding: '4px 24px', border: '3px solid #d4a017', boxShadow: '8px 8px 0 rgba(232,201,106,0.4)', fontFamily: 'var(--font-cinzel)', fontWeight: 900 }}
            >
              INDÉCENTE
            </span>
          </h2>
          <p style={{ fontFamily: 'var(--font-baloo)', fontWeight: 600, fontSize: 'clamp(14px,1.2vw,18px)', color: 'rgba(245,236,212,0.75)', display: 'inline-block', padding: '8px 24px', borderRadius: 9999, background: 'rgba(255,255,255,0.08)', border: '2px solid rgba(232,201,106,0.2)' }}>
            Tout ce dont tu as besoin pour plier le game.
          </p>
        </motion.div>

        {/* ── GRID 2 COLONNES : value stack + prix ── */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">
          {/* ── LEFT : Value Stack (style CS MS adapté DA grecque) ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '0px 0px -60px 0px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-5 p-6 sm:p-10 md:p-14 rounded-[2rem]"
            style={{ background: 'rgba(255,255,255,0.05)', border: '2px solid rgba(212,168,83,0.25)', backdropFilter: 'blur(4px)' }}>

            {/* Ligne 1 */}
            <motion.div
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '0px 0px -40px 0px' }} transition={{ duration: 0.45, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="flex justify-between items-center pb-5 px-2 cursor-default"
              style={{ borderBottom: '2px solid rgba(212,168,83,0.15)' }}
            >
              <span className="flex items-center gap-3" style={{ fontFamily: 'var(--font-baloo)', fontWeight: 700, fontSize: 'clamp(13px,1.3vw,20px)', color: '#f5ecd4' }}>
                <div className="rounded-lg p-2 shrink-0" style={{ background: '#EC6426', border: '2px solid rgba(255,255,255,0.3)' }}>
                  <Play className="w-5 h-5 text-white fill-current" />
                </div>
                <span>
                  Le Guide Vidéo Complet
                  <span style={{ display: 'block', fontWeight: 500, fontSize: 'clamp(11px,1vw,14px)', color: 'rgba(245,236,212,0.55)', marginTop: 2 }}>
                    100% vidéos · tout le programme · apprentissage actif
                  </span>
                </span>
              </span>
              <span style={{ fontFamily: 'var(--font-baloo)', fontWeight: 800, fontSize: 'clamp(16px,2vw,30px)', color: 'rgba(245,236,212,0.45)', textDecoration: 'line-through', textDecorationColor: '#EC6426', textDecorationThickness: 3, whiteSpace: 'nowrap' }}>197€</span>
            </motion.div>

            {/* Ligne 2 */}
            <motion.div
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '0px 0px -40px 0px' }} transition={{ duration: 0.45, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="flex justify-between items-center pb-5 px-2 cursor-default"
              style={{ borderBottom: '2px solid rgba(212,168,83,0.15)' }}
            >
              <span className="flex items-center gap-3" style={{ fontFamily: 'var(--font-baloo)', fontWeight: 700, fontSize: 'clamp(13px,1.3vw,20px)', color: '#f5ecd4' }}>
                <div className="rounded-lg p-2 shrink-0" style={{ background: '#EC6426', border: '2px solid rgba(255,255,255,0.3)' }}>
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <span>
                  Suivi personnalisé
                  <span style={{ display: 'block', fontWeight: 500, fontSize: 'clamp(11px,1vw,14px)', color: 'rgba(245,236,212,0.55)', marginTop: 2 }}>
                    Tes questions répondues directement dans les commentaires de la formation
                  </span>
                </span>
              </span>
              <span style={{ fontFamily: 'var(--font-baloo)', fontWeight: 800, fontSize: 'clamp(16px,2vw,30px)', color: 'rgba(245,236,212,0.45)', textDecoration: 'line-through', textDecorationColor: '#EC6426', textDecorationThickness: 3, whiteSpace: 'nowrap' }}>297€</span>
            </motion.div>

            {/* Ligne 3 */}
            <motion.div
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '0px 0px -40px 0px' }} transition={{ duration: 0.45, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="flex justify-between items-center pb-5 px-2 cursor-default"
              style={{ borderBottom: '2px solid rgba(212,168,83,0.15)' }}
            >
              <span className="flex items-center gap-3" style={{ fontFamily: 'var(--font-baloo)', fontWeight: 700, fontSize: 'clamp(13px,1.3vw,20px)', color: '#f5ecd4' }}>
                <div className="rounded-lg p-2 shrink-0" style={{ background: '#EC6426', border: '2px solid rgba(255,255,255,0.3)' }}>
                  <InfinityIcon className="w-5 h-5 text-white" />
                </div>
                Mises à jour à vie
              </span>
              <span style={{ fontFamily: 'var(--font-baloo)', fontWeight: 800, fontSize: 'clamp(16px,2vw,30px)', color: 'rgba(245,236,212,0.45)', textDecoration: 'line-through', textDecorationColor: '#EC6426', textDecorationThickness: 3, whiteSpace: 'nowrap' }}>Inestimable</span>
            </motion.div>

            {/* Total */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '0px 0px -40px 0px' }} transition={{ duration: 0.5, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
              className="flex justify-between items-center p-5 rounded-xl"
              style={{ background: 'linear-gradient(135deg, #ede5da 0%, #d8ccbc 40%, #e8ddd0 70%, #cfc3b4 100%)', border: '2px solid #8a7968', boxShadow: '4px 4px 0 #5a4e3e', transform: 'rotate(-1deg)' }}
            >
              <span style={{ fontFamily: 'var(--font-baloo)', fontWeight: 900, fontSize: 'clamp(18px,2vw,26px)', color: '#2a1e12', textTransform: 'uppercase' }}>Valeur Totale</span>
              <span style={{ fontFamily: 'var(--font-baloo)', fontWeight: 900, fontSize: 'clamp(28px,3vw,40px)', color: '#2a1e12', textDecoration: 'line-through', textDecorationColor: '#EC6426', textDecorationThickness: 3 }}>≈497€</span>
            </motion.div>
          </motion.div>

          {/* ── RIGHT : Stèle de prix — tampon depuis le haut ── */}
          <div className="relative lg:pr-[130px]">
            <motion.div
              initial={{ opacity: 0, y: -80, scale: 0.88 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 2 }}
              whileHover={{ rotate: 0, transition: { type: 'spring', stiffness: 260, damping: 30 } }}
              whileTap={{ rotate: 0, transition: { type: 'spring', stiffness: 260, damping: 30 } }}
              viewport={{ once: true, margin: '0px 0px -60px 0px' }}
              transition={{ duration: 0.7, delay: 0.15, type: 'spring', stiffness: 100, damping: 16 }}
              className="p-6 sm:p-10 md:p-12 text-center relative"
              style={{
                background: 'linear-gradient(160deg, #ede5da 0%, #d8ccbc 35%, #e8ddd0 70%, #cfc3b4 100%)',
                borderRadius: 24,
                border: '3px solid #d4a017',
                boxShadow: '12px 12px 0 rgba(212,168,83,0.35)',
                cursor: 'default',
              }}
            >
              {/* Frise */}
              <div style={{ width: '100%', height: 1, background: 'linear-gradient(90deg,transparent,#8a7968 30%,#8a7968 70%,transparent)', marginBottom: 10 }} />

              <h3 style={{ fontFamily: 'var(--font-baloo)', fontWeight: 900, fontSize: 'clamp(16px,1.8vw,22px)', color: '#2a1e12', textTransform: 'uppercase', marginBottom: 8 }}>
                Paiement Unique
              </h3>

              {/* Prix barré — gros + rouge */}
              <p style={{ fontFamily: 'var(--font-baloo)', fontWeight: 800, fontSize: 'clamp(22px,2.5vw,32px)', color: '#c0392b', textDecoration: 'line-through', textDecorationColor: '#c0392b', textDecorationThickness: 3, marginBottom: -8, lineHeight: 1.1 }}>
                {offerConfig.regularPrice}€
              </p>

              {/* Prix principal */}
              <p style={{
                fontFamily: 'var(--font-baloo)', fontWeight: 900,
                fontSize: 'clamp(64px,8vw,96px)', color: '#2a1e12',
                lineHeight: 1, letterSpacing: '.02em',
                textShadow: '4px 4px 0 rgba(42,30,18,0.15)',
                marginBottom: 16,
              }}>
                {offerConfig.launchPrice}€
              </p>

              {/* Countdown */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                <span style={{ fontFamily: 'var(--font-baloo)', fontWeight: 700, fontSize: 'clamp(9px, 2.5vw, 11px)', letterSpacing: '.08em', textTransform: 'uppercase', color: '#c0392b', whiteSpace: 'nowrap' }}>
                  Offre de lancement — expire dans
                </span>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  background: 'linear-gradient(135deg, #ede5da 0%, #d8ccbc 40%, #e8ddd0 70%, #cfc3b4 100%)',
                  border: '2.5px solid #8a7968',
                  borderRadius: 8,
                  padding: '5px 14px',
                  boxShadow: '2px 2px 0 #5a4e3e, inset 0 1px 0 rgba(255,255,255,0.45)',
                }}>
                  <CountdownInner />
                </div>
              </div>

              {/* Frise */}
              <div style={{ width: '100%', height: 1, background: 'linear-gradient(90deg,transparent,#8a7968 30%,#8a7968 70%,transparent)', marginBottom: 14 }} />

              {/* CTA — taille réduite */}
              <GreekCTA size="sm" goldBorder={false} showBadges={false} />

              {/* Trust */}
              <div className="flex items-center justify-center gap-4 flex-wrap mt-3">
                {[
                  { icon: ShieldCheck, label: `${offerConfig.guaranteeDays} Jours Satisfait ou Remboursé` },
                  { icon: Lock, label: 'Paiement sécurisé' },
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-1.5 cursor-default">
                    <b.icon className="w-4 h-4" style={{ color: 'rgba(42,30,18,0.45)' }} />
                    <span style={{ fontFamily: 'var(--font-baloo)', fontWeight: 600, fontSize: 11, color: 'rgba(42,30,18,0.45)', letterSpacing: '.05em' }}>{b.label}</span>
                  </div>
                ))}
              </div>

            </motion.div>

            {/* Chibi hautain flipped — sort de la carte à droite, à mi-hauteur */}
            <div
              className="absolute hidden lg:block pointer-events-none"
              style={{ right: -16, top: '50%', transform: 'translateY(-50%)', width: 214, zIndex: 20 }}
            >
              {/* Bulle de BD — juste au-dessus de la tête du chibi, queue pointant vers le bas-gauche */}
              <div style={{ position: 'absolute', top: -135, right: -10, width: 187 }}>
                <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 187, filter: 'drop-shadow(2px 2px 0 #1a2d4a)' }}>
                  <rect x="3" y="3" width="150" height="82" rx="22" fill="white" stroke="#1a2d4a" strokeWidth="3" />
                  {/* Queue pointant vers le bas-gauche (vers la tête du chibi en dessous) */}
                  <circle cx="40" cy="98" r="7" fill="white" stroke="#1a2d4a" strokeWidth="2.5" />
                  <circle cx="26" cy="110" r="4.5" fill="white" stroke="#1a2d4a" strokeWidth="2" />
                </svg>
                {/* Texte dans la bulle */}
                <div style={{ position: 'absolute', top: 10, left: 14, right: 14, bottom: 35, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-baloo)', fontWeight: 700, fontSize: 14, color: '#1a2d4a', lineHeight: 1.4 }}>
                    Soit le prix d&apos;1h30 de cours particulier...
                  </span>
                </div>
              </div>

              {/* Chibi */}
              <Image
                src="/hautain-flipped.png"
                alt="ChadSciences"
                width={300}
                height={400}
                style={{ width: 214, height: 'auto', display: 'block', filter: 'drop-shadow(0 6px 18px rgba(0,0,0,0.28))', transform: 'rotate(-5deg)' }}
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

/** FAQ section */
export function FAQSection() {
  const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqItems.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };
  return (
    <>
      <section className="py-12 md:py-20 px-4 md:px-8 relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg,#FFF8F0 0%,#FDFBF7 60%,#F0E6D4 100%)', borderTop: '3px solid rgba(212,168,83,0.3)' }}>
        {[
          { s: 'Φ', t: 5,  l: 2,  sz: 38, r: -10 },
          { s: 'Λ', t: 80, l: 94, sz: 32, r: 15  },
          { s: 'Σ', t: 18, l: 90, sz: 42, r: -8  },
          { s: 'Ψ', t: 60, l: 3,  sz: 34, r: 20  },
          { s: 'θ', t: 40, l: 95, sz: 28, r: 12  },
          { s: '∂', t: 88, l: 6,  sz: 30, r: -15 },
          { s: 'Δ', t: 72, l: 88, sz: 36, r: 25  },
        ].map((m, i) => (
          <span key={i} className="absolute select-none pointer-events-none" style={{ top: `${m.t}%`, left: `${m.l}%`, fontSize: m.sz, opacity: 0.06, color: '#1a2d4a', transform: `rotate(${m.r}deg)`, fontFamily: 'var(--font-baloo)', fontWeight: 700 }}>{m.s}</span>
        ))}
        {/* Titre centré sur la pleine largeur */}
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -60px 0px' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-12"
            style={{ fontFamily: 'var(--font-baloo)', fontWeight: 900, fontSize: 'clamp(24px,4vw,52px)', color: '#1a2d4a', textTransform: 'uppercase', lineHeight: 1.1 }}>
            Tu hésites encore&nbsp;?
          </motion.h2>
        </div>

        {/* Layout 3 colonnes pleine largeur — chibi | FAQ | Logo+CTA
            Chibi centré dans son tiers gauche, FAQ au centre, logo+CTA dans le tiers droit */}
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center" style={{ maxWidth: 1400, margin: '0 auto' }}>

          {/* Colonne 1 — Chibi (1/6 de la largeur totale, centré dans sa colonne) */}
          <motion.div
            className="hidden xl:flex items-center justify-center shrink-0"
            style={{ width: '14%', minWidth: 140 }}
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3.8, ease: 'easeInOut', delay: 1 }}
          >
            <Image
              src="/pointeur-hautain.png"
              alt=""
              width={500}
              height={500}
              style={{ width: 214, height: 'auto', filter: 'drop-shadow(0 6px 18px rgba(0,0,0,0.18))' }}
            />
          </motion.div>

          {/* Colonne 2 — FAQ (environ 52% desktop, pleine largeur mobile) */}
          <div className="w-full lg:pr-6" style={{ flex: '0 0 52%', minWidth: 0 }}>
            <div className="flex flex-col gap-3">
              {faqItems.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '0px 0px -40px 0px' }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                >
                  <FAQItem faq={faq} index={i} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Colonne 3 — Logo + CTA (tiers droit, ~34% restant, contenu centré) */}
          <div className="hidden lg:flex flex-col items-center justify-center shrink-0" style={{ flex: 1, gap: 6 }}>

            {/* Logo : chute depuis le haut avec rebond */}
            <motion.div
              initial={{ y: -100, rotate: -8, opacity: 0 }}
              whileInView={{ y: 0, rotate: 0, opacity: 1 }}
              viewport={{ once: true, margin: '0px 0px -60px 0px' }}
              transition={{ type: 'spring', stiffness: 55, damping: 10, delay: 0.05 }}
            >
              <LogoVisuD size={360} className="mb-[-56px]" />
            </motion.div>

            {/* CTA : montée depuis le bas */}
            <motion.div
              style={{ width: '80%' }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -60px 0px' }}
              transition={{ type: 'spring', stiffness: 90, damping: 16, delay: 0.32 }}
            >
              <GreekCTA size="sm" goldBorder={false} showBadges={false} label="JE VEUX 15/20 EN MATHS" className="w-full" />
            </motion.div>

            {/* Trustpilot : pop élastique depuis scale 0 */}
            <motion.div
              style={{ textAlign: 'center', marginTop: 12 }}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: '0px 0px -60px 0px' }}
              transition={{ type: 'spring', stiffness: 240, damping: 15, delay: 0.55 }}
            >
              <p style={{ fontFamily: 'var(--font-baloo)', fontWeight: 600, fontSize: 'clamp(11px,0.9vw,13px)', color: 'rgba(26,45,74,0.55)', marginBottom: 6 }}>
                Déjà rejoint ?
              </p>
              <motion.a
                href="https://fr.trustpilot.com/review/maths-ultime.fr"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, boxShadow: '3px 6px 0 #007a52', transition: { type: 'spring', stiffness: 400, damping: 20 } }}
                whileTap={{ y: 1, boxShadow: '1px 1px 0 #007a52', transition: { duration: 0.08 } }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '10px 20px',
                  background: '#00b67a', color: '#fff',
                  border: '2px solid #009e6b',
                  borderRadius: 10,
                  boxShadow: '3px 3px 0 #007a52',
                  fontFamily: 'var(--font-baloo)', fontWeight: 700,
                  fontSize: 'clamp(12px,1vw,14px)',
                  textDecoration: 'none', letterSpacing: '.03em',
                  cursor: 'pointer',
                }}
              >
                <span style={{ fontSize: 16 }}>★</span>
                Partage ton expérience !
              </motion.a>
            </motion.div>
          </div>

        </div>

        {/* Mobile/tablette : Logo + CTA sous la liste FAQ (masqué sur lg+) */}
        <div className="lg:hidden flex flex-col items-center -mt-2 gap-4 relative z-10">
          <LogoVisuD size={360} className="mb-[-68px]" />
          <div style={{ width: '80%' }}>
            <GreekCTA size="sm" goldBorder={false} showBadges={false} label="JE VEUX 15/20 EN MATHS" className="w-full" />
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-baloo)', fontWeight: 600, fontSize: 13, color: 'rgba(26,45,74,0.55)', marginBottom: 6 }}>
              Déjà rejoint ?
            </p>
            <motion.a
              href="https://fr.trustpilot.com/review/maths-ultime.fr"
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ y: 2, boxShadow: '1px 1px 0 #007a52', transition: { duration: 0.08 } }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '10px 20px',
                background: '#00b67a', color: '#fff',
                border: '2px solid #009e6b',
                borderRadius: 10,
                boxShadow: '3px 3px 0 #007a52',
                fontFamily: 'var(--font-baloo)', fontWeight: 700,
                fontSize: 14,
                textDecoration: 'none', letterSpacing: '.03em',
                cursor: 'pointer',
              }}
            >
              <span style={{ fontSize: 16 }}>★</span>
              Partage ton expérience !
            </motion.a>
          </div>
        </div>

      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}

