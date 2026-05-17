'use client';

import { Unlock } from 'lucide-react';
import { motion } from 'motion/react';
import { offerConfig } from '@/lib/offer';

// ─── CONSTANTES DA ─────────────────────────────────────────────────────────
const C = {
  orange:    '#EC6426',
  orangeHot: '#E04A10',
  orangeLt:  '#FF8040',
  outline:   '#1A1A1A',
  gold:      '#e8c96a',
};

const TRUST_BADGES = [
  { label: 'Accès à vie' },
  { label: '+300h de travail' },
  { label: 'PDF + Vidéos' },
];

// ═══════════════════════════════════════════════════════════════════════════
// CTA GREC UNIFIÉ — composant principal de toute la landing
// ═══════════════════════════════════════════════════════════════════════════
interface GreekCTAProps {
  href?: string;
  scrollTo?: string;
  label?: string;
  showBadges?: boolean;
  size?: 'sm' | 'md' | 'lg';
  goldBorder?: boolean;
  className?: string;
  groupHovered?: boolean;
  onGroupHoverStart?: () => void;
  onGroupHoverEnd?: () => void;
}

export function GreekCTA({
  href,
  scrollTo,
  label = 'JE VEUX 15/20 EN MATHS',
  showBadges = true,
  size = 'md',
  goldBorder = false,
  className = '',
  groupHovered,
  onGroupHoverStart,
  onGroupHoverEnd,
}: GreekCTAProps) {
  const handleClick = scrollTo ? (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(scrollTo)?.scrollIntoView({ behavior: 'smooth' });
  } : undefined;
  const pad = size === 'sm'
    ? 'clamp(12px,1.2vw,15px) clamp(20px,4vw,56px)'
    : size === 'lg'
    ? 'clamp(14px,2.2vw,28px) clamp(20px,6vw,96px)'
    : 'clamp(14px,1.8vw,22px) clamp(20px,5vw,80px)';

  const fs = size === 'sm' ? 'clamp(12px,1.1vw,16px)' : size === 'lg' ? 'clamp(16px,2vw,26px)' : 'clamp(14px,1.6vw,20px)';
  const borderCol = goldBorder ? C.gold : C.outline;
  const shadowCol = goldBorder ? C.gold : C.outline;

  const isGrouped = groupHovered !== undefined;

  return (
    <div className={`flex flex-col items-center gap-3 w-full max-w-[min(100%,480px)] ${className}`}>
      <motion.a
        href={scrollTo ? '#' : (href ?? offerConfig.checkoutUrl)}
        onClick={scrollTo ? handleClick : (e) => { e.preventDefault(); (window as any).__checkoutNavigation = true; window.location.href = href ?? offerConfig.checkoutUrl; }}
        animate={isGrouped
          ? { y: groupHovered ? 2 : 0, boxShadow: groupHovered
              ? `4px 4px 0 ${shadowCol}, 0 6px 20px rgba(236,100,38,0.25), inset 0 2px 0 rgba(255,255,255,0.2)`
              : `6px 6px 0 ${shadowCol}, 0 12px 32px rgba(236,100,38,0.35), inset 0 2px 0 rgba(255,255,255,0.2)` }
          : { boxShadow: `6px 6px 0 ${shadowCol}, 0 12px 32px rgba(236,100,38,0.35), inset 0 2px 0 rgba(255,255,255,0.2)` }
        }
        transition={{ duration: 0.06 }}
        onHoverStart={onGroupHoverStart}
        onHoverEnd={onGroupHoverEnd}
        whileHover={isGrouped ? undefined : { y: 2, boxShadow: `4px 4px 0 ${shadowCol}, 0 6px 20px rgba(236,100,38,0.25), inset 0 2px 0 rgba(255,255,255,0.2)`, transition: { duration: 0.06 } }}
        whileTap={{ y: 4, boxShadow: `2px 2px 0 ${shadowCol}, 0 2px 8px rgba(236,100,38,0.15), inset 0 2px 0 rgba(255,255,255,0.2)`, transition: { duration: 0.04 } }}
        className="relative flex items-center justify-center gap-3 overflow-hidden font-black uppercase rounded-2xl text-white cursor-pointer w-full"
        style={{
          position: 'relative', zIndex: 2,
          background: `linear-gradient(165deg, ${C.orangeLt} 0%, ${C.orange} 45%, ${C.orangeHot} 100%)`,
          border: `3px solid ${borderCol}`,
          padding: pad,
          fontSize: fs,
          fontFamily: 'var(--font-baloo)',
          textAlign: 'center',
          letterSpacing: '.04em',
        }}
      >
        <span className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] animate-shine pointer-events-none" />
        {label}
        <Unlock className="shrink-0" style={{ width: size === 'lg' ? 22 : 18, height: size === 'lg' ? 22 : 18 }} strokeWidth={3} />
      </motion.a>

      {showBadges && (
        <div className="flex items-center gap-3 flex-wrap justify-center">
          {TRUST_BADGES.map((b, i) => (
            <div key={i} className="flex items-center gap-1.5 rounded-lg px-3 py-1.5"
              style={{ background: goldBorder ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.88)', border: `1.5px solid ${goldBorder ? 'rgba(232,201,106,0.25)' : 'rgba(26,26,26,0.12)'}`, boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
              <span style={{ fontSize: 'clamp(11px, 0.85vw, 13px)', color: goldBorder ? 'rgba(232,201,106,0.8)' : 'rgba(20,40,60,0.75)', fontFamily: 'var(--font-baloo)', fontWeight: 600 }}>{b.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

