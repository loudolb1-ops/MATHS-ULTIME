'use client';

import { useState } from 'react';
import { Lock, ChevronDown, ChevronRight, Menu, X } from 'lucide-react';
import Image from 'next/image';

const FREE_VIDEO_URL =
  'https://player.mediadelivery.net/embed/651267/a320fd04-0149-4642-87ee-456a6546e0bf?autoplay=false&loop=false&muted=false&preload=true&responsive=true';

type Chapter = { id: string; title: string; locked: boolean };
type Module  = { id: string; label: string; locked: boolean; chapters: Chapter[] };

const MODULES: Module[] = [
  {
    id: 'intro',
    label: 'Introduction',
    locked: false,
    chapters: [
      { id: 'free', title: 'Introduction', locked: false },
    ],
  },
  {
    id: 'omega',
    label: 'Ω OMEGA - PREREQUIS',
    locked: true,
    chapters: [
      { id: 'omega-1', title: '1 - Mindset', locked: true },
      { id: 'omega-2', title: '2 - Ensembles de nombres', locked: true },
      { id: 'omega-3', title: '3 - Tous les types de raisonnements mathématiques', locked: true },
    ],
  },
  {
    id: 'alpha',
    label: 'α ALPHA - PROBABILITES',
    locked: true,
    chapters: [
      { id: 'alpha-1', title: '1 - Probabilités conditionnelles', locked: true },
      { id: 'alpha-2', title: '2 - Variables aléatoires et Loi Binomiale', locked: true },
      { id: 'alpha-3', title: '3 - Loi des grands nombres & Bienaymé Tchébychev', locked: true },
    ],
  },
  {
    id: 'delta',
    label: 'Δ DELTA - GEOMETRIE',
    locked: true,
    chapters: [
      { id: 'delta-1', title: '1 - Trigonométrie', locked: true },
      { id: 'delta-2', title: '2 - Vecteurs', locked: true },
      { id: 'delta-3', title: "3 - Géométrie dans l'espace", locked: true },
    ],
  },
  {
    id: 'sigma',
    label: 'Σ SIGMA - CALCUL',
    locked: true,
    chapters: [
      { id: 'sigma-1', title: '1 - Calcul littéral / Équations', locked: true },
      { id: 'sigma-2', title: '2 - Fonctions suites limites', locked: true },
      { id: 'sigma-3', title: '3 - Second degré', locked: true },
      { id: 'sigma-4', title: '4 - Dérivées', locked: true },
    ],
  },
];

const LOCKED_COUNT = MODULES.flatMap(m => m.chapters).filter(c => c.locked).length;

export default function VideoGratuitePage() {
  const [selected, setSelected] = useState<string>('free');
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    intro: true, omega: true, alpha: false, delta: false, sigma: false,
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const selectedChapter = MODULES.flatMap(m => m.chapters).find(c => c.id === selected);

  function toggleModule(id: string) {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  }

  const sidebar = (
    <div style={{
      width: '100%',
      height: '100%',
      background: '#ffffff',
      borderRight: '1px solid #e2d9cc',
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
    }}>
      {/* Carte profil */}
      <div style={{
        margin: '16px 14px',
        padding: '20px 16px 16px',
        background: '#ffffff',
        border: '1px solid #e2d9cc',
        borderRadius: 12,
        boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
        textAlign: 'center',
      }}>
        <div style={{
          width: 72, height: 72,
          borderRadius: '50%',
          overflow: 'hidden',
          margin: '0 auto 10px',
          border: '2.5px solid #e8c96a',
          boxShadow: '0 2px 8px rgba(232,201,106,0.3)',
        }}>
          <Image
            src="/channels4_profile.jpg"
            alt="ChadSciences"
            width={72}
            height={72}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        <p style={{
          fontFamily: 'var(--font-baloo)',
          fontWeight: 700,
          fontSize: 15,
          color: '#1a2d4a',
          margin: '0 0 14px',
        }}>
          ChadSciences
        </p>

        {/* Boutons Précédent / Suivant */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          {[{ label: 'Précédent', active: false }, { label: 'Suivant', active: true }].map(btn => (
            <button key={btn.label} style={{
              flex: 1,
              padding: '7px 0',
              border: `1.5px solid ${btn.active ? '#1a2d4a' : '#d1c9be'}`,
              borderRadius: 7,
              background: btn.active ? '#1a2d4a' : '#ffffff',
              color: btn.active ? '#f5ecd4' : '#8a7968',
              fontFamily: 'var(--font-baloo)',
              fontWeight: 600,
              fontSize: 12,
              cursor: 'not-allowed',
            }}>
              {btn.label}
            </button>
          ))}
        </div>

        {/* Barre de progression */}
        <div style={{
          width: '100%',
          height: 22,
          borderRadius: 11,
          border: '1.5px solid #d1c9be',
          background: '#f5f0eb',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 10,
        }}>
          <span style={{
            fontFamily: 'var(--font-baloo)',
            fontWeight: 700,
            fontSize: 11,
            color: '#8a7968',
          }}>0%</span>
        </div>
      </div>

      {/* Liste modules */}
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 16 }}>
        {MODULES.map(mod => (
          <div key={mod.id}>
            <button
              onClick={() => toggleModule(mod.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                padding: '11px 14px',
                background: 'none',
                border: 'none',
                borderBottom: '1px solid #f0ebe4',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              {expanded[mod.id]
                ? <ChevronDown size={13} color="#8a7968" strokeWidth={2.5} style={{ flexShrink: 0 }} />
                : <ChevronRight size={13} color="#b5a898" strokeWidth={2.5} style={{ flexShrink: 0 }} />
              }
              <span style={{
                fontFamily: 'var(--font-baloo)',
                fontWeight: 700,
                fontSize: 12,
                color: expanded[mod.id] ? '#1a2d4a' : '#6b7280',
                flex: 1,
                letterSpacing: '.01em',
              }}>
                {mod.label}
              </span>
              {mod.locked && (
                <Lock size={12} color="#c5b9a8" strokeWidth={2} style={{ flexShrink: 0 }} />
              )}
            </button>

            {expanded[mod.id] && (
              <div>
                {mod.chapters.map(ch => (
                  <button
                    key={ch.id}
                    onClick={() => !ch.locked && setSelected(ch.id)}
                    disabled={ch.locked}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '9px 14px 9px 32px',
                      background: selected === ch.id ? 'rgba(236,100,38,0.08)' : 'none',
                      borderLeft: selected === ch.id ? '3px solid #EC6426' : '3px solid transparent',
                      border: 'none',
                      borderBottom: '1px solid #f8f4f0',
                      cursor: ch.locked ? 'default' : 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    {ch.locked ? (
                      <Lock size={11} color="#d1c9be" strokeWidth={2} style={{ flexShrink: 0 }} />
                    ) : (
                      <div style={{
                        width: 14, height: 14,
                        borderRadius: '50%',
                        border: `2px solid ${selected === ch.id ? '#EC6426' : '#c5b9a8'}`,
                        flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        {selected === ch.id && (
                          <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#EC6426' }} />
                        )}
                      </div>
                    )}
                    <span style={{
                      fontFamily: 'var(--font-baloo)',
                      fontWeight: ch.locked ? 500 : 600,
                      fontSize: 12,
                      color: ch.locked ? '#c5b9a8' : selected === ch.id ? '#1a2d4a' : '#4a5568',
                      lineHeight: 1.4,
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
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#f5f0eb', overflow: 'hidden' }}>

      {/* ── Navbar orange ── */}
      <nav style={{
        flexShrink: 0,
        height: 56,
        background: 'linear-gradient(135deg, #FF8040 0%, #EC6426 50%, #E04A10 100%)',
        borderBottom: '3px solid #2a1e12',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        zIndex: 50,
        boxShadow: '0 2px 12px rgba(42,30,18,0.25)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Burger mobile */}
          <button
            className="lg:hidden"
            onClick={() => setSidebarOpen(o => !o)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: '#fff', display: 'flex' }}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <Image
            src="/logo_maths_ultime_detoured.png"
            alt="Maths Ultime"
            width={36}
            height={36}
            style={{ width: 36, height: 36, objectFit: 'contain', filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.2))' }}
          />
          <span style={{
            fontFamily: 'var(--font-cinzel)',
            fontWeight: 900,
            fontSize: 16,
            color: '#ffffff',
            letterSpacing: '.06em',
            textShadow: '0 1px 3px rgba(0,0,0,0.2)',
          }}>
            MATHS ULTIME
          </span>
        </div>
      </nav>

      {/* ── Corps : sidebar 1/4 + contenu 3/4 ── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', position: 'relative' }}>

        {/* Sidebar desktop — 25% */}
        <div
          className="hidden lg:block"
          style={{ width: '25%', minWidth: 240, maxWidth: 340, flexShrink: 0, height: '100%' }}
        >
          {sidebar}
        </div>

        {/* Sidebar mobile overlay */}
        {sidebarOpen && (
          <div
            style={{ position: 'absolute', inset: 0, zIndex: 40, display: 'flex' }}
            onClick={() => setSidebarOpen(false)}
          >
            <div style={{ width: 300, height: '100%' }} onClick={e => e.stopPropagation()}>
              {sidebar}
            </div>
            <div style={{ flex: 1, background: 'rgba(7,18,41,0.5)', backdropFilter: 'blur(2px)' }} />
          </div>
        )}

        {/* ── Zone contenu — 75% ── */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '32px 36px' }}>

          <h1 style={{
            fontFamily: 'var(--font-cinzel)',
            fontWeight: 900,
            fontSize: 'clamp(18px, 2vw, 26px)',
            color: '#1a2d4a',
            marginBottom: 28,
            letterSpacing: '.03em',
          }}>
            Maths Ultime
          </h1>

          {selectedChapter && !selectedChapter.locked ? (
            <div style={{ maxWidth: 860 }}>
              {/* Lecteur */}
              <div style={{
                position: 'relative',
                width: '100%',
                paddingTop: '56.25%',
                borderRadius: 10,
                overflow: 'hidden',
                boxShadow: '6px 6px 0 rgba(42,30,18,0.18), 0 4px 24px rgba(0,0,0,0.18)',
                border: '2px solid #d4a017',
                background: '#000',
              }}>
                <iframe
                  src={FREE_VIDEO_URL}
                  loading="lazy"
                  allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture"
                  allowFullScreen
                  style={{ border: 0, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                />
              </div>

              {/* Bannière accès complet */}
              <div style={{
                marginTop: 24,
                padding: '18px 22px',
                background: 'linear-gradient(135deg, #ede5da 0%, #d8ccbc 40%, #e8ddd0 100%)',
                border: '2px solid #d4a017',
                borderRadius: 10,
                boxShadow: '4px 4px 0 rgba(42,30,18,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 16,
              }}>
                <div>
                  <p style={{ fontFamily: 'var(--font-baloo)', fontWeight: 700, fontSize: 15, color: '#1a2d4a', margin: '0 0 3px' }}>
                    Tu veux accéder à toute la formation ?
                  </p>
                  <p style={{ fontFamily: 'var(--font-baloo)', fontWeight: 500, fontSize: 13, color: '#5a4e3e', margin: 0 }}>
                    Débloque les {LOCKED_COUNT} vidéos restantes du programme complet.
                  </p>
                </div>
                <a
                  href="/#pricing"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '10px 22px',
                    background: 'linear-gradient(165deg, #FF8040 0%, #EC6426 45%, #E04A10 100%)',
                    border: '2.5px solid #2a1e12',
                    borderRadius: 8,
                    boxShadow: '4px 4px 0 rgba(42,30,18,0.4)',
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
                  Obtenir l&apos;accès complet →
                </a>
              </div>
            </div>
          ) : (
            /* Contenu verrouillé — identique au screenshot */
            <div style={{ textAlign: 'center', marginTop: 80 }}>
              <div style={{
                width: 80, height: 80,
                borderRadius: '50%',
                background: '#e2d9cc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
              }}>
                <Lock size={36} color="#8a7968" strokeWidth={1.5} />
              </div>
              <p style={{
                fontFamily: 'var(--font-baloo)',
                fontSize: 16,
                color: '#4a5568',
                lineHeight: 1.6,
              }}>
                Veuillez{' '}
                <a href="/#pricing" style={{ color: '#EC6426', textDecoration: 'none', fontWeight: 700 }}>
                  obtenir l&apos;accès complet
                </a>
                {' '}si vous avez déjà un compte
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
