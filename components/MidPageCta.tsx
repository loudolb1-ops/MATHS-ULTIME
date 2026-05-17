'use client';

import { motion } from 'motion/react';
import { Unlock } from 'lucide-react';
import { offerConfig } from '@/lib/offer';
import { LogoVisuD } from '@/components/LogoVisuD';

const STELE_BG = 'linear-gradient(160deg, #ede5da 0%, #d8ccbc 40%, #e8ddd0 70%, #cfc3b4 100%)';
const RULE = <div style={{ width: '100%', height: 1, background: 'linear-gradient(90deg,transparent,#8a7968 30%,#8a7968 70%,transparent)', margin: '4px 0' }} />;

export function MidPageCta() {
  return (
    <section
      className="relative py-16 px-4 md:px-8 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #F5E6D0 0%, #EDE0CC 50%, #E5D6C0 100%)', borderTop: '3px solid rgba(138,121,104,0.5)' }}
    >
      {/* Un seul symbole discret de chaque côté */}
      <span className="absolute select-none pointer-events-none" style={{ top: '15%', left: '3%', fontSize: 36, opacity: 1, color: 'rgba(26,45,74,0.12)', fontFamily: 'var(--font-baloo)', transform: 'rotate(-15deg)' }}>Α</span>
      <span className="absolute select-none pointer-events-none" style={{ top: '65%', left: '92%', fontSize: 36, opacity: 1, color: 'rgba(26,45,74,0.12)', fontFamily: 'var(--font-baloo)', transform: 'rotate(18deg)' }}>Ω</span>

      <motion.div
        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto flex flex-col items-center text-center"
      >
        {/* Stèle centrale */}
        <div style={{
          background: STELE_BG,
          border: '2.5px solid #8a7968',
          borderRadius: 14,
          boxShadow: '6px 6px 0 #3d3328, inset 0 1px 0 rgba(255,255,255,0.45)',
          padding: 'clamp(16px, 2.5vw, 32px) clamp(24px, 4vw, 56px)',
          width: '100%',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
        }}>
          {RULE}
          <LogoVisuD size={310} className="mt-[-48px] mb-[-48px]" />
          <h2 style={{
            fontFamily: 'var(--font-cinzel)', fontWeight: 700,
            fontSize: 'clamp(16px, 2.4vw, 26px)', color: '#2a1e12',
            textTransform: 'uppercase', lineHeight: 1.2,
            textShadow: '0 1px 2px rgba(255,255,255,0.5)',
            marginTop: 0,
          }}>
            Comprends avant d&apos;apprendre
          </h2>
          {RULE}
          <p style={{ fontFamily: 'var(--font-baloo)', fontSize: 'clamp(13px, 1.1vw, 15px)', color: 'rgba(42,30,18,0.65)', fontWeight: 500, lineHeight: 1.6, maxWidth: 420 }}>
            {offerConfig.midCtaLine}
          </p>

          {/* CTA Button */}
          <motion.a
            href={offerConfig.checkoutUrl}
            onClick={(e) => { e.preventDefault(); (window as any).__checkoutNavigation = true; window.location.href = offerConfig.checkoutUrl; }}
            whileHover={{ y: 2, boxShadow: '3px 3px 0 #3d3328, 0 4px 12px rgba(236,100,38,0.2), inset 0 2px 0 rgba(255,255,255,0.2)', transition: { duration: 0.06 } }}
            whileTap={{ y: 3, boxShadow: '1px 1px 0 #3d3328, 0 2px 6px rgba(236,100,38,0.15), inset 0 2px 0 rgba(255,255,255,0.2)', transition: { duration: 0.04 } }}
            className="relative flex items-center justify-center gap-3 overflow-hidden font-black uppercase rounded-xl text-white cursor-pointer mt-4 w-full"
            style={{
              background: 'linear-gradient(165deg, #FF8040 0%, #EC6426 45%, #E04A10 100%)',
              border: '3px solid #2a1e12',
              boxShadow: '5px 5px 0 #3d3328, 0 8px 24px rgba(236,100,38,0.3), inset 0 2px 0 rgba(255,255,255,0.2)',
              padding: 'clamp(14px, 1.5vw, 18px) clamp(16px, 3vw, 48px)',
              fontSize: 'clamp(13px, 1.4vw, 18px)',
              fontFamily: 'var(--font-baloo)', letterSpacing: '.04em',
            }}>
            <span className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] animate-shine pointer-events-none" />
            JE VEUX 15/20 EN MATHS
            <Unlock className="shrink-0 w-4 h-4" strokeWidth={3} />
          </motion.a>
          {RULE}
        </div>
      </motion.div>
    </section>
  );
}
