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
      width: 300,
      flexShrink: 0,
      background: '#ffffff',
      borderRight: '1px solid #e5e7eb',
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
      height: '100%',
    }}>
      {/* Carte profil */}
      <div style={{
        margin: 16,
        padding: '20px 16px',
        background: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: 12,
        boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
      }}>
        {/* Avatar */}
        <div style={{
          width: 64, height: 64,
          borderRadius: '50%',
          overflow: 'hidden',
          marginBottom: 10,
          border: '2px solid #e5e7eb',
        }}>
          <Image
            src="/hautain-flipped.png"
            alt="ChadSciences"
            width={64}
            height={64}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        <p style={{ fontWeight: 700, fontSize: 15, color: '#111827', marginBottom: 14, fontFamily: 'sans-serif' }}>
          ChadSciences
        </p>

        {/* Boutons Précédent / Suivant */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          <button style={{
            flex: 1, padding: '7px 0',
            border: '1px solid #d1d5db',
            borderRadius: 6,
            background: '#ffffff',
            color: '#374151',
            fontSize: 13,
            fontWeight: 500,
            cursor: 'not-allowed',
            fontFamily: 'sans-serif',
          }}>
            Précédent
          </button>
          <button style={{
            flex: 1, padding: '7px 0',
            border: '1px solid #d1d5db',
            borderRadius: 6,
            background: '#4b5563',
            color: '#ffffff',
            fontSize: 13,
            fontWeight: 500,
            cursor: 'not-allowed',
            fontFamily: 'sans-serif',
          }}>
            Suivant
          </button>
        </div>

        {/* Barre de progression */}
        <div style={{
          width: '100%',
          height: 20,
          borderRadius: 10,
          border: '1px solid #d1d5db',
          background: '#f3f4f6',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 8,
        }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: '#6b7280', fontFamily: 'sans-serif' }}>0%</span>
        </div>
      </div>

      {/* Liste modules */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {MODULES.map(mod => (
          <div key={mod.id}>
            <button
              onClick={() => toggleModule(mod.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 16px',
                background: 'none',
                border: 'none',
                borderBottom: '1px solid #f3f4f6',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              {expanded[mod.id]
                ? <ChevronDown size={14} color="#6b7280" strokeWidth={2} style={{ flexShrink: 0 }} />
                : <ChevronRight size={14} color="#9ca3af" strokeWidth={2} style={{ flexShrink: 0 }} />
              }
              <span style={{
                fontSize: 13,
                fontWeight: 600,
                color: '#374151',
                fontFamily: 'sans-serif',
                flex: 1,
              }}>
                {mod.label}
              </span>
              {mod.locked && (
                <Lock size={13} color="#9ca3af" strokeWidth={2} style={{ flexShrink: 0 }} />
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
                      padding: '10px 16px 10px 38px',
                      background: selected === ch.id ? '#fef3ec' : 'none',
                      borderLeft: selected === ch.id ? '3px solid #EC6426' : '3px solid transparent',
                      border: 'none',
                      borderBottom: '1px solid #f9fafb',
                      cursor: ch.locked ? 'default' : 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    {ch.locked ? (
                      <Lock size={12} color="#d1d5db" strokeWidth={2} style={{ flexShrink: 0 }} />
                    ) : (
                      <div style={{
                        width: 16, height: 16,
                        borderRadius: '50%',
                        border: `2px solid ${selected === ch.id ? '#EC6426' : '#d1d5db'}`,
                        flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        {selected === ch.id && (
                          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#EC6426' }} />
                        )}
                      </div>
                    )}
                    <span style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: ch.locked ? '#d1d5db' : selected === ch.id ? '#111827' : '#374151',
                      fontFamily: 'sans-serif',
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
        background: '#EC6426',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        zIndex: 50,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            className="lg:hidden"
            onClick={() => setSidebarOpen(o => !o)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: '#fff' }}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Image
              src="/logo_maths_ultime_detoured.png"
              alt="Maths Ultime"
              width={36}
              height={36}
              style={{ width: 36, height: 36, objectFit: 'contain' }}
            />
            <span style={{
              fontFamily: 'sans-serif',
              fontWeight: 700,
              fontSize: 16,
              color: '#ffffff',
              letterSpacing: '.01em',
            }}>
              Maths Ultime
            </span>
          </div>
        </div>

        <a
          href="/#pricing"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '8px 20px',
            background: '#ffffff',
            borderRadius: 6,
            fontFamily: 'sans-serif',
            fontWeight: 600,
            fontSize: 13,
            color: '#EC6426',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          Connectez-vous
        </a>
      </nav>

      {/* ── Corps ── */}
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
            <div style={{ flex: 1, background: 'rgba(0,0,0,0.3)' }} />
          </div>
        )}

        {/* ── Zone contenu ── */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '32px 28px' }}>

          {/* Titre page */}
          <h1 style={{
            fontFamily: 'sans-serif',
            fontWeight: 700,
            fontSize: 22,
            color: '#111827',
            marginBottom: 24,
          }}>
            Maths Ultime
          </h1>

          {selectedChapter && !selectedChapter.locked ? (
            <div style={{ maxWidth: 900 }}>
              {/* Lecteur vidéo */}
              <div style={{
                position: 'relative',
                width: '100%',
                paddingTop: '56.25%',
                borderRadius: 8,
                overflow: 'hidden',
                boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
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
                padding: '18px 24px',
                background: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 16,
                boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
              }}>
                <div>
                  <p style={{ fontFamily: 'sans-serif', fontWeight: 700, fontSize: 15, color: '#111827', margin: '0 0 4px' }}>
                    Tu veux accéder à toute la formation ?
                  </p>
                  <p style={{ fontFamily: 'sans-serif', fontWeight: 400, fontSize: 13, color: '#6b7280', margin: 0 }}>
                    Débloque les {MODULES.flatMap(m => m.chapters).filter(c => c.locked).length} vidéos restantes.
                  </p>
                </div>
                <a
                  href="/#pricing"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '10px 22px',
                    background: '#EC6426',
                    borderRadius: 6,
                    fontFamily: 'sans-serif',
                    fontWeight: 600,
                    fontSize: 14,
                    color: '#fff',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Obtenir l&apos;accès complet →
                </a>
              </div>
            </div>
          ) : (
            /* Contenu verrouillé */
            <div style={{ maxWidth: 560, textAlign: 'center', marginTop: 80 }}>
              <div style={{
                width: 80, height: 80,
                borderRadius: '50%',
                background: '#e5e7eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
              }}>
                <Lock size={36} color="#9ca3af" strokeWidth={1.5} />
              </div>
              <p style={{ fontFamily: 'sans-serif', fontSize: 15, color: '#374151', lineHeight: 1.6, marginBottom: 8 }}>
                Veuillez{' '}
                <a href="/#pricing" style={{ color: '#EC6426', textDecoration: 'none', fontWeight: 600 }}>
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
