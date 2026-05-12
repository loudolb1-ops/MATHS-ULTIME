'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { useRef, useEffect } from 'react';

// ── Liste des screenshots (noms d'origine dans /public/commentaires/) ──────
const COMMENT_IMAGES = [
  'Screenshot_2026-04-08-23-22-50-488_com.google.android.apps.youtube.creator-edit.jpg',
  'Screenshot_2026-04-08-23-23-12-080_com.google.android.apps.youtube.creator-edit.jpg',
  'Screenshot_2026-04-08-23-24-56-172_com.google.android.apps.youtube.creator-edit.jpg',
  'Screenshot_2026-04-08-23-25-20-078_com.google.android.apps.youtube.creator-edit.jpg',
  'Screenshot_2026-04-08-23-26-28-628_com.google.android.apps.youtube.creator-edit.jpg',
  'Screenshot_2026-04-08-23-27-51-768_com.google.android.apps.youtube.creator-edit.jpg',
  'Screenshot_2026-04-08-23-29-33-592_com.google.android.apps.youtube.creator-edit.jpg',
  'Screenshot_2026-04-11-22-42-54-532_com.google.android.apps.youtube.creator-edit.jpg',
  'Screenshot_2026-04-11-22-43-34-125_com.google.android.apps.youtube.creator-edit.jpg',
  'Screenshot_2026-04-11-22-43-56-438_com.google.android.apps.youtube.creator-edit.jpg',
  'Screenshot_2026-04-11-22-44-59-110_com.google.android.apps.youtube.creator-edit.jpg',
  'Screenshot_2026-04-11-22-45-15-672_com.google.android.apps.youtube.creator-edit.jpg',
  'Screenshot_2026-04-11-22-47-02-502_com.google.android.apps.youtube.creator-edit.jpg',
  'Screenshot_2026-04-11-22-47-49-218_com.google.android.apps.youtube.creator-edit.jpg',
  'Screenshot_2026-04-11-22-49-22-576_com.google.android.apps.youtube.creator-edit.jpg',
  'Screenshot_2026-04-11-22-50-17-640_com.google.android.apps.youtube.creator-edit.jpg',
];

// Dupliquer pour le loop infini
const DOUBLED = [...COMMENT_IMAGES, ...COMMENT_IMAGES];

function YouTubeCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  // Deux sources de pause indépendantes — carousel s'arrête si l'une est vraie
  const activeCardRef = useRef<Element | null>(null); // touch mobile
  const mouseHoverRef = useRef(false);                // hover desktop

  useEffect(() => {
    const SPEED_PX_PER_SEC = 80;

    function tick(now: number) {
      if (lastTimeRef.current === 0) lastTimeRef.current = now;
      const delta = now - lastTimeRef.current;
      lastTimeRef.current = now;

      const paused = activeCardRef.current !== null || mouseHoverRef.current;
      if (!paused && trackRef.current) {
        const track = trackRef.current;
        const halfWidth = track.scrollWidth / 2;
        posRef.current += (SPEED_PX_PER_SEC * delta) / 1000;
        if (posRef.current >= halfWidth) posRef.current -= halfWidth;
        track.style.transform = `translateX(${-posRef.current}px)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // activate/deactivate : SEULS endroits qui modifient activeCardRef ET la classe CSS
    const activate = (card: Element) => {
      if (activeCardRef.current && activeCardRef.current !== card) {
        activeCardRef.current.classList.remove('touched');
      }
      activeCardRef.current = card;
      card.classList.add('touched');
      lastTimeRef.current = 0;
    };

    const deactivate = () => {
      if (activeCardRef.current) {
        activeCardRef.current.classList.remove('touched');
        activeCardRef.current = null;
        lastTimeRef.current = 0;
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      const card = (e.target as Element)?.closest('.comment-card') ?? null;
      if (card) {
        activate(card);
      } else if (!track.contains(e.target as Node)) {
        deactivate();
      }
    };

    document.addEventListener('touchstart', onTouchStart, { passive: true });
    return () => document.removeEventListener('touchstart', onTouchStart);
  }, []);

  // Desktop hover — ref séparée, n'interfère pas avec activeCardRef
  const handleMouseEnter = () => { mouseHoverRef.current = true; };
  const handleMouseLeave = () => { mouseHoverRef.current = false; lastTimeRef.current = 0; };

  return (
    <div
      className="relative"
      style={{ overflowX: 'clip', overflowY: 'visible', paddingTop: 10, paddingBottom: 14 }}
    >
      <div
        ref={trackRef}
        className="flex gap-5"
        style={{ width: 'max-content' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {DOUBLED.map((filename, i) => (
          /* Wrapper externe : flex item pur, aucun transform, aucun hover */
          <div
            key={i}
            style={{ flexShrink: 0 }}
          >
            {/* Wrapper interne : reçoit le hover CSS, isolé du layout flex */}
            <div
              className="comment-card"
              style={{
                background: 'linear-gradient(160deg, #ede5da 0%, #d8ccbc 40%, #e8ddd0 70%, #cfc3b4 100%)',
                border: '2.5px solid #8a7968',
                borderRadius: 12,
                padding: '10px 10px 8px',
                boxShadow: '4px 4px 0 #5a4e3e, inset 0 1px 0 rgba(255,255,255,0.45)',
                cursor: 'default',
                position: 'relative',
              }}
            >
              {/* Ornures dorées dans les coins — style grec */}
              {/* Coin haut-gauche */}
              <svg style={{ position: 'absolute', top: 6, left: 6, width: 18, height: 18, opacity: 0.75 }} viewBox="0 0 18 18" fill="none">
                <path d="M2 16 L2 2 L16 2" stroke="#8a7968" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 10 L5 10 L5 5 L10 5" stroke="#d4a017" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.8"/>
              </svg>
              {/* Coin haut-droit */}
              <svg style={{ position: 'absolute', top: 6, right: 6, width: 18, height: 18, opacity: 0.75 }} viewBox="0 0 18 18" fill="none">
                <path d="M16 16 L16 2 L2 2" stroke="#8a7968" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 10 L13 10 L13 5 L8 5" stroke="#d4a017" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.8"/>
              </svg>
              {/* Coin bas-gauche */}
              <svg style={{ position: 'absolute', bottom: 6, left: 6, width: 18, height: 18, opacity: 0.75 }} viewBox="0 0 18 18" fill="none">
                <path d="M2 2 L2 16 L16 16" stroke="#8a7968" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 8 L5 8 L5 13 L10 13" stroke="#d4a017" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.8"/>
              </svg>
              {/* Coin bas-droit */}
              <svg style={{ position: 'absolute', bottom: 6, right: 6, width: 18, height: 18, opacity: 0.75 }} viewBox="0 0 18 18" fill="none">
                <path d="M16 2 L16 16 L2 16" stroke="#8a7968" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 8 L13 8 L13 13 L8 13" stroke="#d4a017" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.8"/>
              </svg>
              {/* Frise dorée en haut */}
              <div style={{
                width: '100%', height: 1, marginBottom: 8,
                background: 'linear-gradient(90deg, transparent, #8a7968 30%, #8a7968 70%, transparent)',
              }} />
              <img
                loading="lazy"
                src={`/commentaires/${filename}`}
                alt="Commentaire YouTube"
                style={{
                  display: 'block',
                  height: 180,
                  width: 'auto',
                  maxWidth: 380,
                  objectFit: 'contain',
                  borderRadius: 8,
                }}
              />
              {/* Frise dorée en bas */}
              <div style={{
                width: '100%', height: 1, marginTop: 8,
                background: 'linear-gradient(90deg, transparent, #8a7968 30%, #8a7968 70%, transparent)',
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section
      className="py-24 px-4 md:px-8 text-center relative overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #c8dff0 0%, #d8eaf5 30%, #bdd4e8 55%, #cce0f0 80%, #b8cfe5 100%)',
        borderTop: '4px solid #1a2d4a',
      }}
    >
      {/* Symboles grecs décoratifs */}
      {[
        { s: 'Σ', top: 6,  left: 3,  sz: 52, op: 0.07, rot: -12 },
        { s: 'Δ', top: 20, left: 7,  sz: 34, op: 0.05, rot: 18  },
        { s: 'Ω', top: 75, left: 4,  sz: 44, op: 0.06, rot: 8   },
        { s: 'π', top: 88, left: 9,  sz: 28, op: 0.05, rot: -20 },
        { s: 'θ', top: 10, left: 88, sz: 38, op: 0.07, rot: 14  },
        { s: '∫', top: 40, left: 92, sz: 46, op: 0.06, rot: -6  },
        { s: 'Φ', top: 70, left: 90, sz: 32, op: 0.05, rot: 22  },
        { s: '∞', top: 50, left: 5,  sz: 30, op: 0.05, rot: -8  },
      ].map((m, i) => (
        <span key={i} className="absolute select-none pointer-events-none"
          style={{ top: `${m.top}%`, left: `${m.left}%`, fontSize: m.sz, opacity: m.op, color: '#1a2d4a', transform: `rotate(${m.rot}deg)`, fontFamily: 'var(--font-baloo)', fontWeight: 700 }}>
          {m.s}
        </span>
      ))}

      {/* Fond animé — halos lumineux + frise dorée */}
      <svg aria-hidden className="absolute inset-0 w-full h-full pointer-events-none z-0" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="spot1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="spot2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#a8c8e8" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#a8c8e8" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="spot3" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1a2d4a" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#1a2d4a" stopOpacity="0" />
          </radialGradient>
          <pattern id="meander-light" x="0" y="0" width="40" height="16" patternUnits="userSpaceOnUse">
            <polyline points="0,12 3,12 3,4 10,4 10,12 17,12 17,8 24,8 24,12 31,12 31,4 38,4 38,12 40,12"
              fill="none" stroke="#d4a017" strokeWidth="1" strokeLinejoin="miter" opacity="0.35" />
          </pattern>
        </defs>
        <ellipse cx="20%" cy="35%" rx="280" ry="200" fill="url(#spot1)" />
        <ellipse cx="78%" cy="65%" rx="320" ry="220" fill="url(#spot1)" />
        <ellipse cx="50%" cy="50%" rx="350" ry="180" fill="url(#spot2)" />
        <ellipse cx="12%" cy="80%" rx="200" ry="150" fill="url(#spot3)" />
        <ellipse cx="88%" cy="20%" rx="180" ry="130" fill="url(#spot3)" />
        <rect x="0" y="0" width="100%" height="16" fill="url(#meander-light)" />
        <rect x="0" y="calc(100% - 16px)" width="100%" height="16" fill="url(#meander-light)" />
      </svg>

      {/* Halos animés supplémentaires */}
      <motion.div
        className="absolute pointer-events-none"
        style={{ top: '20%', left: '10%', width: 320, height: 320, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,168,83,0.12) 0%, transparent 70%)', zIndex: 0 }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute pointer-events-none"
        style={{ bottom: '15%', right: '8%', width: 260, height: 260, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(26,45,74,0.18) 0%, transparent 70%)', zIndex: 0 }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        className="absolute pointer-events-none"
        style={{ top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 500, height: 200, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(255,255,255,0.15) 0%, transparent 70%)', zIndex: 0 }}
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
      />

      {/* Chibi étonné */}
      <motion.div
        className="hidden xl:flex absolute z-0 pointer-events-none flex-col items-center"
        style={{ left: '3rem', top: '2.5rem', width: '18rem', transform: 'rotate(-6deg)', transformOrigin: 'bottom center' }}
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '0px 0px -60px 0px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          animate={{ y: [0, -14, 0] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
          className="flex flex-col items-center w-full"
        >
          <Image src="/etonne.png" alt="" width={500} height={500} className="w-full h-auto drop-shadow-2xl" />
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[120%] pointer-events-none">
            <svg viewBox="-15 -15 230 80" preserveAspectRatio="none" className="w-full h-16">
              <path d="M -10 60 C -10 20, 20 10, 40 30 C 60 -10, 110 -10, 140 20 C 160 0, 210 10, 210 60 Z" fill="white" stroke="#1a2d4a" strokeWidth="4" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
            </svg>
          </div>
        </motion.div>
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Titre — mot par mot avec blur→sharp + montée */}
        <h2
          className="flex flex-wrap justify-center items-center gap-x-4 gap-y-6 uppercase mb-6 text-center"
          style={{ fontFamily: 'var(--font-baloo)', fontWeight: 900, fontSize: 'clamp(26px, 5vw, 64px)', color: '#1a2d4a', lineHeight: 1.05 }}
        >
          {(['ILS ONT', null, 'LES MATHS'] as const).map((word, i) =>
            word === null ? (
              <motion.span
                key="aimé"
                initial={{ opacity: 0, y: 28, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '0px 0px -60px 0px' }}
                transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="transform rotate-2 inline-block"
                style={{ background: '#f0c832', color: '#1a2d4a', padding: '4px 20px', border: '3px solid #1a2d4a', boxShadow: '8px 8px 0 #1a2d4a', fontFamily: 'var(--font-baloo)', fontWeight: 900 }}
              >
                AIMÉ
              </motion.span>
            ) : (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -60px 0px' }}
                transition={{ duration: 0.55, delay: i === 0 ? 0 : 0.18, ease: [0.22, 1, 0.36, 1] }}
              >{word}</motion.span>
            )
          )}
        </h2>

        {/* Sous-titre — fade avec légère montée */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -60px 0px' }}
          transition={{ duration: 0.5, delay: 0.32 }}
          className="text-center mb-12"
          style={{ fontFamily: 'var(--font-baloo)', fontWeight: 700, fontSize: 'clamp(15px, 1.5vw, 20px)', color: 'rgba(26,45,74,0.65)', letterSpacing: '.05em' }}
        >
          Et spoiler&nbsp;: tu le peux aussi
        </motion.p>

        {/* Carrousel — démasquage depuis la droite avec overflow caché */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '0px 0px -60px 0px' }}
          transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <YouTubeCarousel />
        </motion.div>

        {/* Légende */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '0px 0px -40px 0px' }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 text-center"
          style={{ fontFamily: 'var(--font-baloo)', fontWeight: 600, fontSize: 'clamp(12px, 1vw, 14px)', color: 'rgba(26,45,74,0.5)', letterSpacing: '.06em' }}
        >
          Commentaires réels laissés sous les vidéos YouTube de la chaîne &quot;ChadSciences&quot;
        </motion.p>
      </div>
    </section>
  );
}
