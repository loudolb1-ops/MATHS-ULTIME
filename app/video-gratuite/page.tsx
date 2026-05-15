'use client';

import { useState } from 'react';
import { Lock, Play, ChevronDown, ChevronRight, Menu, X } from 'lucide-react';

const FREE_VIDEO_URL =
  'https://player.mediadelivery.net/embed/651267/a320fd04-0149-4642-87ee-456a6546e0bf?autoplay=false&loop=false&muted=false&preload=true&responsive=true';

type Chapter = { id: string; title: string; locked: boolean };
type Module  = { id: string; label: string; chapters: Chapter[] };

const MODULES: Module[] = [
  {
    id: 'intro',
    label: 'INTRODUCTION',
    chapters: [
      { id: 'free', title: 'La méthode en action', locked: false },
    ],
  },
  {
    id: 'omega',
    label: 'Ω OMEGA — PRÉREQUIS',
    chapters: [
      { id: 'omega-1', title: '1 - Mindset', locked: true },
      { id: 'omega-2', title: '2 - Ensembles de nombres', locked: true },
      { id: 'omega-3', title: '3 - Tous les types de raisonnements mathématiques', locked: true },
    ],
  },
  {
    id: 'alpha',
    label: 'α ALPHA — PROBABILITÉS',
    chapters: [
      { id: 'alpha-1', title: '1 - Probabilités conditionnelles', locked: true },
      { id: 'alpha-2', title: '2 - Variables aléatoires et Loi Binomiale', locked: true },
      { id: 'alpha-3', title: '3 - Loi des grands nombres & Bienaymé Tchébychev', locked: true },
    ],
  },
  {
    id: 'delta',
    label: 'Δ DELTA — GÉOMÉTRIE',
    chapters: [
      { id: 'delta-1', title: '1 - Trigonométrie', locked: true },
      { id: 'delta-2', title: '2 - Vecteurs', locked: true },
      { id: 'delta-3', title: '3 - Géométrie dans l\'espace', locked: true },
    ],
  },
  {
    id: 'sigma',
    label: 'Σ SIGMA — CALCUL',
    chapters: [
      { id: 'sigma-1', title: '1 - Calcul littéral / Équations', locked: true },
      { id: 'sigma-2', title: '2 - Fonctions suites limites', locked: true },
      { id: 'sigma-3', title: '3 - Second degré', locked: true },
      { id: 'sigma-4', title: '4 - Dérivées', locked: true },
    ],
  },
];

export default function VideoGratuitePage() {
  const [selected, setSelected] = useState<string>('free');
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ intro: true, omega: true, alpha: false, delta: false, sigma: false });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const selectedChapter = MODULES.flatMap(m => m.chapters).find(c => c.id === selected);

  function toggleModule(id: string) {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  }

  const sidebar = (
    <div style={{
      width: 280,
      flexShrink: 0,
      background: '#0a1628',
      borderRight: '1px solid rgba(232,201,106,0.12)',
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
    }}>
      {/* Profil */}
      <div style={{ padding: '24px 20px 20px', borderBottom: '1px solid rgba(232,201,106,0.1)' }}>
        {/* Avatar */}
        <div style={{
          width: 56, height: 56,
          borderRadius: '50%',
          background: 'linear-gradient(135deg,#FF8040,#EC6426)',
          border: '2.5px solid #e8c96a',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 10,
          fontFamily: 'var(--font-cinzel)',
          fontWeight: 700,
          fontSize: 18,
          color: '#fff',
          boxShadow: '0 4px 12px rgba(236,100,38,0.3)',
        }}>
          CS
        </div>
        <p style={{ fontFamily: 'var(--font-baloo)', fontWeight: 700, fontSize: 15, color: '#f5ecd4', marginBottom: 12 }}>
          ChadSciences
        </p>
        {/* Barre de progression */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            flex: 1,
            height: 6,
            borderRadius: 3,
            background: 'rgba(255,255,255,0.1)',
            overflow: 'hidden',
          }}>
            <div style={{ width: '5%', height: '100%', background: 'linear-gradient(90deg,#e8c96a,#EC6426)', borderRadius: 3 }} />
          </div>
          <span style={{ fontFamily: 'var(--font-baloo)', fontWeight: 700, fontSize: 11, color: '#e8c96a', whiteSpace: 'nowrap' }}>0%</span>
        </div>
      </div>

      {/* Boutons nav */}
      <div style={{ display: 'flex', gap: 8, padding: '12px 16px', borderBottom: '1px solid rgba(232,201,106,0.08)' }}>
        {['Précédent', 'Suivant'].map((label, i) => (
          <button key={i} style={{
            flex: 1, padding: '7px 0',
            border: '1.5px solid rgba(232,201,106,0.25)',
            borderRadius: 8,
            background: i === 1 ? 'rgba(232,201,106,0.1)' : 'transparent',
            color: 'rgba(245,236,212,0.55)',
            fontFamily: 'var(--font-baloo)', fontWeight: 600, fontSize: 12,
            cursor: 'not-allowed',
          }}>
            {label}
          </button>
        ))}
      </div>

      {/* Modules */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
        {MODULES.map(mod => (
          <div key={mod.id}>
            {/* Header module */}
            <button
              onClick={() => toggleModule(mod.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '11px 16px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              {expanded[mod.id]
                ? <ChevronDown size={13} color="#e8c96a" strokeWidth={2.5} style={{ flexShrink: 0 }} />
                : <ChevronRight size={13} color="rgba(232,201,106,0.45)" strokeWidth={2.5} style={{ flexShrink: 0 }} />
              }
              <span style={{
                fontFamily: 'var(--font-baloo)',
                fontWeight: 800,
                fontSize: 11,
                letterSpacing: '.06em',
                textTransform: 'uppercase',
                color: expanded[mod.id] ? '#e8c96a' : 'rgba(245,236,212,0.5)',
              }}>
                {mod.label}
              </span>
              {mod.id !== 'intro' && (
                <Lock size={11} color="rgba(106,122,150,0.7)" strokeWidth={2} style={{ marginLeft: 'auto', flexShrink: 0 }} />
              )}
            </button>

            {/* Chapitres */}
            {expanded[mod.id] && (
              <div style={{ paddingBottom: 4 }}>
                {mod.chapters.map(ch => (
                  <button
                    key={ch.id}
                    onClick={() => setSelected(ch.id)}
                    disabled={ch.locked}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '9px 16px 9px 34px',
                      background: selected === ch.id ? 'rgba(236,100,38,0.12)' : 'none',
                      borderLeft: selected === ch.id ? '3px solid #EC6426' : '3px solid transparent',
                      border: 'none',
                      cursor: ch.locked ? 'default' : 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    {ch.locked ? (
                      <Lock size={12} color="#4a5568" strokeWidth={2} style={{ flexShrink: 0 }} />
                    ) : (
                      <div style={{
                        width: 8, height: 8, borderRadius: '50%',
                        background: selected === ch.id ? '#EC6426' : 'rgba(232,201,106,0.5)',
                        flexShrink: 0,
                      }} />
                    )}
                    <span style={{
                      fontFamily: 'var(--font-baloo)',
                      fontWeight: ch.locked ? 500 : 600,
                      fontSize: 13,
                      color: ch.locked ? 'rgba(255,255,255,0.25)' : selected === ch.id ? '#f5ecd4' : 'rgba(245,236,212,0.65)',
                      lineHeight: 1.35,
                    }}>
                      {ch.title}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#071229', overflow: 'hidden' }}>

      {/* ── Navbar ── */}
      <nav style={{
        flexShrink: 0,
        height: 60,
        background: '#071229',
        borderBottom: '1px solid rgba(232,201,106,0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        zIndex: 50,
      }}>
        {/* Gauche : burger mobile + logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <button
            className="lg:hidden"
            onClick={() => setSidebarOpen(o => !o)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: '#f5ecd4' }}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div>
            <span style={{ fontFamily: 'var(--font-cinzel)', fontWeight: 900, fontSize: 16, color: '#f5ecd4', letterSpacing: '.06em' }}>
              MATHS ULTIME
            </span>
            <span style={{
              display: 'block',
              fontFamily: 'var(--font-baloo)',
              fontWeight: 600,
              fontSize: 10,
              color: '#e8c96a',
              letterSpacing: '.1em',
              textTransform: 'uppercase',
              lineHeight: 1,
            }}>
              by ChadSciences
            </span>
          </div>
        </div>

        {/* Droite : CTA */}
        <a
          href="/#pricing"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 18px',
            background: 'linear-gradient(135deg,#FF8040,#EC6426)',
            border: '2px solid #2a1e12',
            borderRadius: 8,
            boxShadow: '3px 3px 0 rgba(42,30,18,0.5)',
            fontFamily: 'var(--font-baloo)',
            fontWeight: 800,
            fontSize: 13,
            color: '#fff',
            textDecoration: 'none',
            textTransform: 'uppercase',
            letterSpacing: '.05em',
            whiteSpace: 'nowrap',
          }}
        >
          <Play size={12} fill="#fff" strokeWidth={0} />
          Accès complet
        </a>
      </nav>

      {/* ── Corps : sidebar + contenu ── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', position: 'relative' }}>

        {/* Sidebar desktop */}
        <div className="hidden lg:flex" style={{ height: '100%' }}>
          {sidebar}
        </div>

        {/* Sidebar mobile overlay */}
        {sidebarOpen && (
          <div
            style={{ position: 'absolute', inset: 0, zIndex: 40, display: 'flex' }}
            onClick={() => setSidebarOpen(false)}
          >
            <div style={{ height: '100%' }} onClick={e => e.stopPropagation()}>
              {sidebar}
            </div>
            <div style={{ flex: 1, background: 'rgba(7,18,41,0.6)', backdropFilter: 'blur(2px)' }} />
          </div>
        )}

        {/* ── Zone contenu principale ── */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '28px 24px' }}>
          {selectedChapter && !selectedChapter.locked ? (
            /* Vidéo débloquée */
            <div style={{ maxWidth: 860, margin: '0 auto' }}>
              {/* Titre + badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
                <h1 style={{
                  fontFamily: 'var(--font-baloo)',
                  fontWeight: 900,
                  fontSize: 'clamp(18px,2vw,26px)',
                  color: '#f5ecd4',
                  margin: 0,
                }}>
                  {selectedChapter.title}
                </h1>
                <span style={{
                  background: '#EC6426',
                  color: '#fff',
                  fontFamily: 'var(--font-baloo)',
                  fontWeight: 800,
                  fontSize: 11,
                  letterSpacing: '.1em',
                  textTransform: 'uppercase',
                  padding: '3px 10px',
                  borderRadius: 5,
                  border: '1.5px solid rgba(255,255,255,0.3)',
                }}>
                  GRATUIT
                </span>
              </div>

              {/* Iframe */}
              <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', borderRadius: 12, overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.5)' }}>
                <iframe
                  src={FREE_VIDEO_URL}
                  loading="lazy"
                  allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture"
                  allowFullScreen
                  style={{ border: 0, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                />
              </div>

              {/* CTA sous la vidéo */}
              <div style={{
                marginTop: 28,
                padding: '20px 24px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(232,201,106,0.15)',
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 16,
              }}>
                <div>
                  <p style={{ fontFamily: 'var(--font-baloo)', fontWeight: 700, fontSize: 15, color: '#f5ecd4', margin: '0 0 4px' }}>
                    Tu veux accéder à toute la formation ?
                  </p>
                  <p style={{ fontFamily: 'var(--font-baloo)', fontWeight: 500, fontSize: 13, color: 'rgba(245,236,212,0.55)', margin: 0 }}>
                    Débloque les {MODULES.flatMap(m => m.chapters).filter(c => c.locked).length} vidéos restantes du programme complet.
                  </p>
                </div>
                <a
                  href="/#pricing"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '12px 24px',
                    background: 'linear-gradient(135deg,#FF8040,#EC6426)',
                    border: '2.5px solid #2a1e12',
                    borderRadius: 10,
                    boxShadow: '4px 4px 0 rgba(42,30,18,0.5)',
                    fontFamily: 'var(--font-baloo)',
                    fontWeight: 900,
                    fontSize: 14,
                    color: '#fff',
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    letterSpacing: '.05em',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Obtenir l&apos;accès complet →
                </a>
              </div>
            </div>
          ) : (
            /* Vidéo verrouillée */
            <div style={{
              maxWidth: 560,
              margin: '60px auto 0',
              textAlign: 'center',
            }}>
              <div style={{
                width: 80, height: 80,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.06)',
                border: '2px solid rgba(106,122,150,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
              }}>
                <Lock size={36} color="#4a5568" strokeWidth={1.5} />
              </div>
              <h2 style={{
                fontFamily: 'var(--font-baloo)',
                fontWeight: 900,
                fontSize: 'clamp(18px,2vw,24px)',
                color: '#f5ecd4',
                marginBottom: 12,
              }}>
                {selectedChapter?.title ?? 'Contenu verrouillé'}
              </h2>
              <p style={{
                fontFamily: 'var(--font-baloo)',
                fontWeight: 500,
                fontSize: 15,
                color: 'rgba(245,236,212,0.5)',
                lineHeight: 1.6,
                marginBottom: 32,
              }}>
                Cette vidéo est réservée aux membres Maths Ultime.
                Rejoins la formation pour accéder à l&apos;intégralité du programme.
              </p>
              <a
                href="/#pricing"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '14px 32px',
                  background: 'linear-gradient(135deg,#FF8040,#EC6426)',
                  border: '3px solid #2a1e12',
                  borderRadius: 12,
                  boxShadow: '6px 6px 0 rgba(42,30,18,0.5)',
                  fontFamily: 'var(--font-baloo)',
                  fontWeight: 900,
                  fontSize: 15,
                  color: '#fff',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: '.06em',
                }}
              >
                Obtenir l&apos;accès complet →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
