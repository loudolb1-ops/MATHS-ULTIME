'use client';

import { motion } from 'motion/react';
import { Play, Check } from 'lucide-react';

const BULLETS = [
  '5 minutes pour voir la méthode en action',
  'Sans jargon, sans formules brutes — juste la logique',
  'Reçue dans ta boîte mail en moins d\'une minute',
];

export function FreeVideoSection() {
  return (
    <section
      className="relative overflow-hidden py-16 md:py-24 px-4 md:px-8"
      style={{ background: 'linear-gradient(180deg,#071229 0%,#0a1628 60%,#071229 100%)' }}
    >
      {/* Ligne dorée de séparation haut */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,transparent,#e8c96a 30%,#EC6426 50%,#e8c96a 70%,transparent)' }} />

      {/* Watermarks grecs */}
      {([
        { s: 'Σ', t: 8,  l: 2,  sz: 48, r: -10 },
        { s: 'Ω', t: 70, l: 1,  sz: 36, r: 15  },
        { s: 'π', t: 12, l: 91, sz: 42, r: 8   },
        { s: 'Δ', t: 65, l: 90, sz: 32, r: -18 },
      ] as const).map((m, i) => (
        <span
          key={i}
          className="absolute select-none pointer-events-none"
          style={{ top: `${m.t}%`, left: `${m.l}%`, fontSize: m.sz, opacity: 0.13, color: '#e8c96a', transform: `rotate(${m.r}deg)`, fontFamily: 'var(--font-baloo)', fontWeight: 700 }}
        >
          {m.s}
        </span>
      ))}

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Colonne gauche : texte + CTA ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '0px 0px -60px 0px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Kicker */}
            <p style={{
              fontFamily: 'var(--font-cinzel)',
              fontSize: 'clamp(10px,0.9vw,13px)',
              fontWeight: 700,
              letterSpacing: '.2em',
              textTransform: 'uppercase',
              color: '#e8c96a',
              marginBottom: 16,
            }}>
              — Δεῖγμα · Aperçu —
            </p>

            {/* H2 */}
            <h2 style={{
              fontFamily: 'var(--font-baloo)',
              fontWeight: 900,
              fontSize: 'clamp(28px,4vw,54px)',
              color: '#f5ecd4',
              lineHeight: 1.1,
              marginBottom: 20,
            }}>
              La 1ère vidéo,{' '}
              <span style={{ fontStyle: 'italic', color: '#e8c96a' }}>offerte.</span>
            </h2>

            {/* Subtitle */}
            <p style={{
              fontFamily: 'var(--font-baloo)',
              fontWeight: 500,
              fontSize: 'clamp(14px,1.2vw,18px)',
              color: 'rgba(245,236,212,0.65)',
              lineHeight: 1.65,
              marginBottom: 28,
            }}>
              Vois la méthode Maths Ultime en action avant de te décider.
            </p>

            {/* Bullet points */}
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 36px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {BULLETS.map((b, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <span style={{
                    flexShrink: 0,
                    width: 22, height: 22,
                    borderRadius: '50%',
                    background: 'rgba(232,201,106,0.15)',
                    border: '1.5px solid #e8c96a',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginTop: 1,
                  }}>
                    <Check size={12} color="#e8c96a" strokeWidth={3} />
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-baloo)',
                    fontWeight: 600,
                    fontSize: 'clamp(13px,1.1vw,16px)',
                    color: 'rgba(245,236,212,0.8)',
                    lineHeight: 1.5,
                  }}>
                    {b}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <motion.button
              onClick={() => window.dispatchEvent(new CustomEvent('mu:open-popup'))}
              whileHover={{ y: 2, boxShadow: '4px 4px 0 rgba(42,30,18,0.55)' }}
              whileTap={{ y: 4, boxShadow: '2px 2px 0 rgba(42,30,18,0.55)' }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: 'clamp(14px,1.4vw,18px) clamp(28px,3vw,48px)',
                background: 'linear-gradient(165deg,#FF8040 0%,#EC6426 45%,#E04A10 100%)',
                border: '3px solid #2a1e12',
                borderRadius: 14,
                boxShadow: '6px 6px 0 rgba(42,30,18,0.5)',
                cursor: 'pointer',
                fontFamily: 'var(--font-baloo)',
                fontSize: 'clamp(14px,1.2vw,17px)',
                fontWeight: 900,
                color: '#fff',
                textTransform: 'uppercase',
                letterSpacing: '.06em',
              }}
            >
              <Play size={16} fill="#fff" strokeWidth={0} />
              Recevoir ma vidéo gratuite
            </motion.button>
          </motion.div>

          {/* ── Colonne droite : card preview ── */}
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.92 }}
            whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 1.5 }}
            whileHover={{ rotate: 0, transition: { type: 'spring', stiffness: 260, damping: 28 } }}
            viewport={{ once: true, margin: '0px 0px -60px 0px' }}
            transition={{ duration: 0.7, delay: 0.1, type: 'spring', stiffness: 90, damping: 16 }}
            style={{
              background: 'linear-gradient(160deg,#ede5da 0%,#d8ccbc 40%,#e8ddd0 70%,#cfc3b4 100%)',
              border: '3px solid #d4a017',
              borderRadius: 20,
              boxShadow: '10px 10px 0 rgba(212,168,83,0.3)',
              overflow: 'hidden',
              cursor: 'default',
              position: 'relative',
            }}
          >
            {/* Badge GRATUIT */}
            <div style={{
              position: 'absolute',
              top: 16,
              left: 16,
              zIndex: 10,
              background: '#EC6426',
              color: '#fff',
              fontFamily: 'var(--font-baloo)',
              fontWeight: 900,
              fontSize: 13,
              letterSpacing: '.12em',
              textTransform: 'uppercase',
              padding: '5px 14px',
              borderRadius: 6,
              border: '2px solid rgba(255,255,255,0.4)',
              transform: 'rotate(-2deg)',
              boxShadow: '3px 3px 0 rgba(42,30,18,0.35)',
            }}>
              GRATUIT
            </div>

            {/* Thumbnail zone */}
            <div style={{
              position: 'relative',
              width: '100%',
              paddingTop: '56.25%',
              background: 'linear-gradient(135deg,#071229 0%,#0d1b3e 50%,#1a2d4a 100%)',
              overflow: 'hidden',
            }}>
              {/* Symboles grecs décoratifs dans la thumbnail */}
              {(['Σ','Δ','π','Ω','∫','√'] as const).map((s, i) => (
                <span key={i} style={{
                  position: 'absolute',
                  fontSize: 28 + (i % 3) * 10,
                  opacity: 0.18,
                  color: '#e8c96a',
                  fontFamily: 'var(--font-baloo)',
                  fontWeight: 700,
                  top: `${15 + (i * 13) % 55}%`,
                  left: `${8 + (i * 17) % 80}%`,
                  transform: `rotate(${-15 + i * 8}deg)`,
                  userSelect: 'none',
                  pointerEvents: 'none',
                }}>
                  {s}
                </span>
              ))}

              {/* Bouton play centré */}
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <div style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg,#F5C842 0%,#E8A800 100%)',
                  border: '3px solid #2a1e12',
                  boxShadow: '4px 4px 0 rgba(42,30,18,0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Play size={24} fill="#2a1e12" color="#2a1e12" style={{ marginLeft: 3 }} />
                </div>
              </div>
            </div>

            {/* Footer card */}
            <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              <div>
                <p style={{
                  fontFamily: 'var(--font-baloo)',
                  fontWeight: 700,
                  fontSize: 10,
                  letterSpacing: '.12em',
                  textTransform: 'uppercase',
                  color: '#8a7968',
                  marginBottom: 4,
                }}>
                  ÉPISODE 01
                </p>
                <p style={{
                  fontFamily: 'var(--font-baloo)',
                  fontWeight: 800,
                  fontSize: 'clamp(13px,1.1vw,15px)',
                  color: '#2a1e12',
                  lineHeight: 1.3,
                }}>
                  La méthode en action · l&apos;évidence
                </p>
              </div>
              <div style={{
                flexShrink: 0,
                background: '#2a1e12',
                color: '#f5ecd4',
                fontFamily: 'var(--font-baloo)',
                fontWeight: 700,
                fontSize: 12,
                padding: '4px 10px',
                borderRadius: 6,
              }}>
                5:00
              </div>
            </div>

            {/* Frise dorée bas */}
            <div style={{ height: 3, background: 'linear-gradient(90deg,#D4A853 0%,#F5C842 50%,#D4A853 100%)' }} />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
