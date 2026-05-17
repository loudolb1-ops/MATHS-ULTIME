'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, Unlock, X } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { getYouTubeThumbnailUrl, offerConfig } from '@/lib/offer';

// ─── PALETTE ────────────────────────────────────────────────────────────────
const C = {
  void:   '#04060F',
  sky:    '#081220',
  deep:   '#0C1A30',
  gold:   '#E8B848',
  goldLt: '#F5D070',
  goldDk: '#A07818',
  marble: '#F5EDD8',
  marbMd: '#DDD0BA',
  marbDk: '#C0B09A',
  stone:  '#8A7055',
  ink:    '#2C1A0A',
  orange: '#F05020',
  torch:  '#FF9040',
};

// ─── UTILS ──────────────────────────────────────────────────────────────────
const OFFER_S = 48 * 3600;
const getExpiry = () => {
  if (typeof window === 'undefined') return Date.now() + OFFER_S * 1000;
  const s = localStorage.getItem('mu_exp4');
  if (s) return parseInt(s, 10);
  const e = Date.now() + OFFER_S * 1000;
  localStorage.setItem('mu_exp4', e.toString());
  return e;
};
const getEmbed = (url: string) => {
  const id = url.match(/[?&]v=([^&]+)/)?.[1];
  return id ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0` : '';
};

// ─── DATA ───────────────────────────────────────────────────────────────────
const TICKS = ['PASSÉ DE 8 À 15 EN 2 MOIS',"J'AI EU 15 AU BAC",'DE 7 À 14 SANS COURS PARTIC.','MA FILLE A GAGNÉ 5 POINTS','ENFIN COMPRIS LES FONCTIONS','15/20 AU DERNIER DS'];
const SYMS  = ['π','Σ','Δ','∫'];
const STARS = [
  {x:8, y:4,  r:1.5,c:'#F5D070'},{x:22,y:8,  r:1,  c:'#D0E4FF'},
  {x:42,y:3,  r:2,  c:'#F5D070'},{x:63,y:6,  r:1,  c:'#D0E4FF'},
  {x:78,y:4,  r:1.5,c:'#E8B848'},{x:91,y:9,  r:1,  c:'#D0E4FF'},
  {x:15,y:17, r:2.5,c:'#F5D070'},{x:55,y:14, r:1,  c:'#D0E4FF'},
  {x:84,y:19, r:1.5,c:'#E8B848'},{x:33,y:22, r:1,  c:'#D0E4FF'},
  {x:72,y:24, r:2,  c:'#F5D070'},{x:5, y:29, r:1,  c:'#D0E4FF'},
];
const MATH = [
  {s:'π', x:4,  y:28, z:36, o:.17, f:true},
  {s:'Σ', x:94, y:34, z:28, o:.15},
  {s:'∫', x:11, y:60, z:26, o:.14, f:true},
  {s:'∞', x:87, y:57, z:30, o:.15},
  {s:'Δ', x:19, y:44, z:22, o:.13},
  {s:'θ', x:80, y:42, z:38, o:.14},
];

const TESTIMONIALS = [
  {
    initials: 'TM',
    name: 'Théo M.',
    text: 'De 7 à 13 en deux mois, sans cours particuliers. La méthode visuelle m\'a tout changé.',
    date: 'Mars 2024',
    color: C.deep,
  },
  {
    initials: 'JL',
    name: 'Julie L.',
    text: 'Ma fille a eu 14 au bac. Simple, visuel, efficace. La méthode qu\'il fallait au lycée.',
    date: 'Juin 2024',
    color: C.goldDk,
  },
];

// ════════════════════════════════════════════════════════════════════════════
// VSL MODAL
// ════════════════════════════════════════════════════════════════════════════
const VSLModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const btn = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.documentElement.style.overflow = 'hidden';
    window.addEventListener('keydown', h);
    btn.current?.focus();
    return () => { document.documentElement.style.overflow = ''; window.removeEventListener('keydown', h); };
  }, [open, onClose]);
  if (!open) return null;
  const src = getEmbed(offerConfig.vslUrl);
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 px-4 backdrop-blur-sm"
      role="dialog" aria-modal="true">
      <button type="button" className="absolute inset-0" onClick={onClose} />
      <div className="relative z-10 w-full max-w-4xl"
        style={{ border:`3px solid ${C.gold}`, boxShadow:`0 0 100px rgba(232,184,72,.5),0 40px 100px rgba(0,0,0,.9)` }}>
        <button ref={btn} type="button" onClick={onClose} aria-label="Fermer"
          className="absolute -right-4 -top-4 z-20 rounded-full p-1.5"
          style={{ background:C.sky, border:`2px solid ${C.gold}`, boxShadow:'3px 3px 0 #000' }}>
          <X className="h-4 w-4 text-white" />
        </button>
        <div className="aspect-video w-full" style={{ background:C.void }}>
          {src
            ? <iframe className="h-full w-full" src={src} title="VSL"
                allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowFullScreen />
            : <div className="flex h-full items-center justify-center text-white/30">Vidéo indisponible</div>}
        </div>
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════════════
// COSMOS — ciel d'Olympe
// ════════════════════════════════════════════════════════════════════════════
const Cosmos = () => (
  <div aria-hidden className="absolute inset-0 z-0 overflow-hidden"
    style={{ background:`linear-gradient(175deg,${C.void} 0%,${C.sky} 20%,${C.deep} 55%,${C.sky} 80%,${C.void} 100%)` }}>

    {/* Glow central */}
    <div className="absolute pointer-events-none" style={{ top:'-5%', left:'50%', transform:'translateX(-50%)', width:'60%', height:'65%', background:`radial-gradient(ellipse at 50% 8%, rgba(232,184,72,.15) 0%, rgba(232,184,72,.06) 30%, transparent 65%)` }} />

    {/* Lune */}
    <div className="absolute pointer-events-none" style={{ top:'3%', left:'13%' }}>
      <svg width="80" height="80" viewBox="0 0 80 80">
        <defs>
          <radialGradient id="mn" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFCE0" stopOpacity=".9"/>
            <stop offset="55%" stopColor="#F5C842" stopOpacity=".5"/>
            <stop offset="100%" stopColor={C.gold} stopOpacity="0"/>
          </radialGradient>
        </defs>
        <circle cx="40" cy="40" r="38" fill="url(#mn)"/>
        <circle cx="40" cy="40" r="10" fill="#FFFCE0" opacity=".65"/>
        <circle cx="40" cy="40" r="5" fill="white" opacity=".85"/>
      </svg>
    </div>

    {/* Rayons divins */}
    {[...Array(7)].map((_,i) => {
      const a = (i-3)*12;
      const op = i===3 ? .18 : Math.max(.06,.15-Math.abs(i-3)*.025);
      return <div key={i} className="absolute pointer-events-none" style={{ top:0, left:'50%', width:i===3?'3px':'2px', height:'75%', background:`linear-gradient(180deg,rgba(232,184,72,${op}) 0%,transparent 100%)`, transform:`rotate(${a}deg)`, transformOrigin:'top center' }} />;
    })}

    {/* Nuages décoratifs fond */}
    {[{x:2,y:10,w:220,o:.11},{x:63,y:5,w:270,o:.12},{x:26,y:42,w:180,o:.09},{x:74,y:55,w:230,o:.10}].map((c,i) => (
      <div key={i} className="absolute pointer-events-none" style={{ left:`${c.x}%`, top:`${c.y}%` }}>
        <svg width={c.w} height={c.w*.42} viewBox="0 0 200 84" style={{ opacity:c.o }}>
          <ellipse cx="100" cy="62" rx="90" ry="24" fill="white"/>
          <ellipse cx="62"  cy="48" rx="46" ry="30" fill="white"/>
          <ellipse cx="136" cy="44" rx="40" ry="28" fill="white"/>
          <ellipse cx="100" cy="36" rx="34" ry="24" fill="white"/>
        </svg>
      </div>
    ))}

    {/* Étoiles */}
    {STARS.map((s,i) => (
      <div key={i} className="absolute rounded-full" style={{ left:`${s.x}%`, top:`${s.y}%`, width:`${s.r*2}px`, height:`${s.r*2}px`, background:s.c, opacity:.15+(i%5)*.08, boxShadow:s.r>1.5?`0 0 ${s.r*4}px ${s.c}`:'none' }} />
    ))}

    {/* Symboles maths fond */}
    {MATH.map((s,i) => (
      <motion.span key={i} initial={{ opacity:0 }} animate={{ opacity:s.o }} transition={{ delay:.6+i*.1, duration:2.5 }}
        className={`absolute select-none pointer-events-none font-serif${s.f?' animate-float':''}`}
        style={{ left:`${s.x}%`, top:`${s.y}%`, fontSize:`${s.z}px`, color:C.goldLt }}>
        {s.s}
      </motion.span>
    ))}

    {/* Vignette */}
    <div className="absolute inset-0 pointer-events-none" style={{ background:'radial-gradient(ellipse at 50% 46%, transparent 36%, rgba(4,6,15,.78) 100%)' }} />
    {/* Brume bas */}
    <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height:'24%', background:`linear-gradient(to top, rgba(4,6,15,.65) 0%, transparent 100%)` }} />
  </div>
);

// ════════════════════════════════════════════════════════════════════════════
// MÉANDRE
// ════════════════════════════════════════════════════════════════════════════
const MeanderBorder = ({ height=8, op=.5 }: { height?:number; op?:number }) => (
  <svg width="100%" height={height} style={{ display:'block', opacity:op }}>
    <defs>
      <pattern id="mdr" width="20" height={height} patternUnits="userSpaceOnUse">
        <path
          d={`M0,${height} V0 H10 V${height*.8} H2 V${height*.2} H8 V${height*.6} H4 V${height} M10,0 V${height} H20 V${height*.2} H12 V${height*.8} H18 V${height*.4} H14 V0`}
          fill="none" stroke={C.gold} strokeWidth="1.1" strokeLinecap="square"/>
      </pattern>
    </defs>
    <rect width="100%" height={height} fill="url(#mdr)"/>
  </svg>
);

// ════════════════════════════════════════════════════════════════════════════
// ENTABLATURE — fronton + architrave (inchangé)
// ════════════════════════════════════════════════════════════════════════════
const Entablature = ({ timeStr }: { timeStr:string }) => (
  <div className="relative z-40 shrink-0 w-full select-none">
    <div className="w-full overflow-hidden" style={{ height:'clamp(36px,5.5vw,72px)' }}>
      <svg width="100%" height="100%" viewBox="0 0 1000 72" preserveAspectRatio="none">
        <defs>
          <linearGradient id="pf" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FDFAF3"/><stop offset="100%" stopColor="#D8D0C4"/>
          </linearGradient>
          <linearGradient id="pfg" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={C.gold} stopOpacity="0"/>
            <stop offset="50%" stopColor={C.goldLt} stopOpacity=".65"/>
            <stop offset="100%" stopColor={C.gold} stopOpacity="0"/>
          </linearGradient>
        </defs>
        <polygon points="500,3 15,72 985,72" fill="url(#pf)" stroke={C.stone} strokeWidth="1.2"/>
        <polygon points="500,3 15,72 985,72" fill="none" stroke="url(#pfg)" strokeWidth=".8"/>
        <g transform="translate(500,34)" opacity=".32">
          {[0,45,90,135,180,225,270,315].map(a=>(
            <line key={a} x1="0" y1="0"
              x2={Math.cos(a*Math.PI/180)*15} y2={Math.sin(a*Math.PI/180)*15}
              stroke={C.gold} strokeWidth="1.4" strokeLinecap="round"/>
          ))}
          <circle cx="0" cy="0" r="4.5" fill={C.goldLt} opacity=".85"/>
        </g>
        <polygon points="500,0 493,13 507,13" fill={C.goldLt} opacity=".9"/>
        <polygon points="16,65 5,75 27,75"   fill={C.gold}   opacity=".8"/>
        <polygon points="984,65 973,75 995,75" fill={C.gold}  opacity=".8"/>
      </svg>
    </div>
    <div className="w-full relative" style={{
      height:'clamp(48px,6.8vw,86px)',
      background:'linear-gradient(180deg,#FAF6EF 0%,#EDE6DA 50%,#DDD6CA 100%)',
      borderBottom:`2.5px solid ${C.stone}`,
      boxShadow:`0 8px 32px rgba(0,0,0,.5)`,
    }}>
      <div className="absolute top-0 left-0 right-0"><MeanderBorder height={8} op={.48}/></div>
      <div className="flex items-center justify-between h-full px-3 sm:px-6 xl:px-10">
        <div className="flex items-center gap-2 shrink-0">
          <div className="relative overflow-hidden rounded-full shrink-0" style={{ width:'clamp(22px,2.8vw,34px)', height:'clamp(22px,2.8vw,34px)', border:`2px solid ${C.stone}`, boxShadow:`0 2px 8px rgba(0,0,0,.4)` }}>
            <Image src="/chadlogo.jpeg" alt="logo" fill className="object-cover" sizes="34px"/>
          </div>
          <div className="hidden sm:flex flex-col leading-none">
            <span style={{ fontFamily:'var(--font-cinzel)', fontSize:'clamp(8px,1vw,12px)', fontWeight:700, color:C.ink, letterSpacing:'.2em' }}>MATHS ULTIME</span>
            <span style={{ fontFamily:'var(--font-cinzel)', fontSize:'clamp(7px,.8vw,10px)', color:C.stone, letterSpacing:'.15em' }}>GUIDE VIDÉO · LYCÉE</span>
          </div>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
          <span style={{ fontFamily:'var(--font-cinzel)', fontSize:'clamp(11px,1.8vw,22px)', fontWeight:900, color:C.ink, letterSpacing:'.28em', textShadow:`0 1px 0 rgba(255,255,255,.5)` }}>MATHS ULTIME</span>
          <div className="flex items-center gap-2">
            <div className="h-px w-5 md:w-12" style={{ background:`linear-gradient(90deg,transparent,${C.gold})` }}/>
            <span style={{ color:C.gold, fontSize:'7px' }}>✦</span>
            <div className="h-px w-5 md:w-12" style={{ background:`linear-gradient(90deg,${C.gold},transparent)` }}/>
          </div>
        </div>
        <div className="flex items-center gap-1.5 shrink-0 pointer-events-auto px-2.5 py-1"
          style={{ background:`linear-gradient(135deg,${C.gold},${C.goldDk})`, border:`2px solid ${C.ink}`, boxShadow:`2px 2px 0 ${C.ink}` }}>
          <span className="hidden sm:block" style={{ fontFamily:'var(--font-cinzel)', fontSize:'clamp(6px,.7vw,8px)', color:C.ink, letterSpacing:'.15em', fontWeight:700 }}>OFFRE</span>
          <span suppressHydrationWarning style={{ fontFamily:'var(--font-cinzel)', fontSize:'clamp(9px,1.25vw,15px)', fontWeight:900, color:C.ink, letterSpacing:'.05em' }}>{timeStr}</span>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0"><MeanderBorder height={7} op={.32}/></div>
    </div>
  </div>
);

// ════════════════════════════════════════════════════════════════════════════
// TICKER
// ════════════════════════════════════════════════════════════════════════════
const Ticker = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(2800);
  useEffect(()=>{ if (ref.current) setW(ref.current.scrollWidth/2); },[]);
  return (
    <div className="w-full overflow-hidden flex whitespace-nowrap shrink-0 z-30"
      style={{ background:`linear-gradient(90deg,${C.void},${C.sky},${C.void})`, borderTop:`1px solid ${C.gold}25`, paddingTop:'4px', paddingBottom:'4px' }}>
      <motion.div ref={ref} animate={{ x:[0,-w] }} transition={{ repeat:Infinity, duration:58, ease:'linear' }}
        className="flex items-center text-[10px] md:text-[11px] tracking-widest uppercase font-black"
        style={{ color:C.gold, fontFamily:'var(--font-baloo)' }}>
        {[...Array(4)].map((_,r)=>TICKS.map((t,i)=>(
          <span key={`${r}-${i}`} className="flex items-center">
            <span className="mx-5" style={{ color:`rgba(245,237,216,.75)` }}>{t}</span>
            <span className="mx-2 font-serif opacity-50" style={{ color:C.goldLt }}>{SYMS[i%4]}</span>
          </span>
        )))}
      </motion.div>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════════════
// TESTIMONIAL CARD
// ════════════════════════════════════════════════════════════════════════════
interface TestimonialP { initials:string; name:string; text:string; date:string; color:string; delay:number; }
const TestimonialCard = ({ initials, name, text, date, color, delay }: TestimonialP) => (
  <motion.div
    initial={{ opacity:0, x:-28 }} animate={{ opacity:1, x:0 }}
    transition={{ delay, duration:.7 }}
    className="animate-float"
    style={{ animationDelay:`${delay * .5}s` }}>
    <div style={{
      background:'linear-gradient(135deg,#F5EDD8 0%,#EDE5CF 100%)',
      border:`2.5px solid ${C.stone}`,
      boxShadow:`4px 4px 0 rgba(44,26,10,.35)`,
      padding:'clamp(8px,.9vw,13px) clamp(10px,1.1vw,15px)',
    }}>
      <div className="flex items-center gap-2 mb-2">
        <div style={{
          width:'clamp(26px,2.4vw,32px)', height:'clamp(26px,2.4vw,32px)',
          background:color, border:`2px solid ${C.ink}`,
          display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
        }}>
          <span style={{ fontFamily:'var(--font-cinzel)', fontSize:'clamp(8px,.75vw,10px)', fontWeight:900, color:C.marble }}>{initials}</span>
        </div>
        <span style={{ fontFamily:'var(--font-cinzel)', fontSize:'clamp(9px,.9vw,11px)', fontWeight:700, color:C.ink, letterSpacing:'.05em' }}>{name}</span>
      </div>
      <p style={{ fontFamily:'var(--font-cinzel)', fontSize:'clamp(7px,.72vw,8.5px)', color:`${C.ink}88`, lineHeight:1.6, marginBottom:'6px' }}>&ldquo;{text}&rdquo;</p>
      <div className="flex items-center gap-1.5">
        <span style={{ color:C.gold, fontSize:'clamp(7px,.65vw,9px)' }}>★★★★★</span>
        <span style={{ fontFamily:'var(--font-cinzel)', fontSize:'clamp(6px,.62vw,7.5px)', color:C.gold, letterSpacing:'.12em', fontWeight:700 }}>· {date}</span>
      </div>
    </div>
  </motion.div>
);

// ════════════════════════════════════════════════════════════════════════════
// BIG ZEUF — personnage cartoon droite
// ════════════════════════════════════════════════════════════════════════════
const BigZeuf = () => (
  <div aria-hidden className="hidden md:flex flex-col items-center justify-end shrink-0 z-[35] pb-0 relative"
    style={{ width:'clamp(130px,20vw,290px)' }}>

    {/* Bulle de dialogue */}
    <motion.div
      initial={{ scale:0, opacity:0 }} animate={{ scale:1, opacity:1 }}
      transition={{ delay:2.1, duration:.38, type:'spring', stiffness:200 }}
      style={{
        position:'absolute', top:'clamp(8%,15%,22%)', right:'-8px',
        background:`linear-gradient(135deg,#F5F0E8,#DDD6CA)`,
        border:`2px solid ${C.gold}`, boxShadow:`3px 3px 0 ${C.ink}40, 0 4px 16px rgba(0,0,0,.3)`,
        padding:'6px 14px', whiteSpace:'nowrap', zIndex:10,
      }}>
      <span style={{ fontFamily:'var(--font-cinzel)', fontSize:'clamp(8px,.9vw,11px)', fontWeight:700, color:C.ink, letterSpacing:'.08em' }}>Connais tes maths !</span>
      <div style={{ position:'absolute', bottom:'-8px', left:'14px', borderLeft:'5px solid transparent', borderRight:'5px solid transparent', borderTop:`8px solid ${C.gold}` }}/>
      <div style={{ position:'absolute', bottom:'-5px', left:'16px', borderLeft:'4px solid transparent', borderRight:'4px solid transparent', borderTop:`5px solid #DDD6CA` }}/>
    </motion.div>

    {/* Personnage + nuage */}
    <motion.div
      initial={{ opacity:0, y:28 }} animate={{ opacity:1, y:0 }}
      transition={{ delay:.6, duration:.85 }}
      className="animate-float w-full" style={{ animationDelay:'0s' }}>

      {/* Zeuf image */}
      <div style={{ position:'relative', zIndex:2, width:'78%', margin:'0 auto', height:'clamp(160px,22vw,310px)' }}>
        <Image src="/zeuf.png" alt="" fill className="object-contain"
          style={{ filter:'drop-shadow(0 8px 20px rgba(0,0,0,.5))' }}
          sizes="290px" priority/>
      </div>

      {/* Nuage sous les pieds */}
      <div style={{ marginTop:'-18px', position:'relative', zIndex:1 }}>
        <svg viewBox="0 0 240 90" xmlns="http://www.w3.org/2000/svg"
          style={{ width:'100%', filter:'drop-shadow(0 10px 28px rgba(0,0,0,.35)) drop-shadow(0 3px 8px rgba(0,0,0,.18))' }}>
          <defs>
            <radialGradient id="clZ" cx="50%" cy="70%" r="55%">
              <stop offset="0%"   stopColor="#FFFCF5"/>
              <stop offset="65%"  stopColor="#F8F4EC" stopOpacity=".99"/>
              <stop offset="100%" stopColor="#F0EBE0" stopOpacity=".97"/>
            </radialGradient>
          </defs>
          <ellipse cx="120" cy="72" rx="112" ry="20" fill="url(#clZ)"/>
          <ellipse cx="72"  cy="56" rx="60"  ry="36" fill="url(#clZ)"/>
          <ellipse cx="168" cy="52" rx="52"  ry="32" fill="url(#clZ)"/>
          <ellipse cx="118" cy="42" rx="46"  ry="30" fill="url(#clZ)"/>
          <ellipse cx="96"  cy="32" rx="34"  ry="24" fill="url(#clZ)"/>
        </svg>
      </div>
    </motion.div>
  </div>
);

// ════════════════════════════════════════════════════════════════════════════
// HERO
// ════════════════════════════════════════════════════════════════════════════
export function Hero() {
  const [left, setLeft] = useState(()=>Math.max(0,Math.floor((getExpiry()-Date.now())/1000)));
  const [vsl,  setVsl]  = useState(false);
  useEffect(()=>{ const t=setInterval(()=>setLeft(p=>p>0?p-1:0),1000); return ()=>clearInterval(t); },[]);
  const hh = Math.floor(left/3600).toString().padStart(2,'0');
  const mm = Math.floor((left%3600)/60).toString().padStart(2,'0');
  const ss = (left%60).toString().padStart(2,'0');

  return (
    <div className="h-[100svh] [height:100dvh] min-h-[640px] w-full flex flex-col overflow-hidden relative">
      <Cosmos/>
      <Entablature timeStr={`${hh}:${mm}:${ss}`}/>

      <div className="relative z-10 flex-1 flex flex-row min-h-0 items-stretch">

        {/* ── GAUCHE : Témoignages ── */}
        <div className="hidden lg:flex flex-col justify-center gap-4 shrink-0 z-[35] pl-4 pr-2"
          style={{ width:'clamp(180px,22vw,280px)' }}>
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={i} {...t} delay={.65 + i*.28}/>
          ))}
        </div>

        {/* ── CENTRE : Contenu principal ── */}
        <main className="flex-1 flex flex-col items-center justify-evenly min-h-0 overflow-hidden px-2 sm:px-3"
          style={{ gap:'clamp(3px,.7vw,9px)' }}>

          {/* HEADLINE */}
          <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ delay:.1, duration:.65 }}
            className="flex flex-col items-center shrink-0 text-center" style={{ gap:'clamp(2px,.45vw,5px)' }}>
            <div className="flex items-center gap-2">
              <div className="h-px w-5 md:w-8" style={{ background:`linear-gradient(90deg,transparent,${C.gold})` }}/>
              <span style={{ fontFamily:'var(--font-cinzel)', fontSize:'clamp(6px,.72vw,8.5px)', color:C.gold, letterSpacing:'.28em' }}>LE GUIDE ULTIME DU LYCÉE</span>
              <div className="h-px w-5 md:w-8" style={{ background:`linear-gradient(90deg,${C.gold},transparent)` }}/>
            </div>
            <h1 className="font-black leading-none uppercase whitespace-nowrap"
              style={{ fontFamily:'var(--font-baloo)', fontSize:'clamp(22px,5.8vw,70px)', color:'#FFFFFF', letterSpacing:'-.02em', textShadow:'0 3px 12px rgba(0,0,0,.7), 0 1px 0 rgba(255,255,255,.05)' }}>
              PASSE DE 8 À 15/20<span className="sr-only"> en maths</span>
            </h1>
            <p className="font-black leading-none uppercase whitespace-nowrap"
              style={{ fontFamily:'var(--font-baloo)', fontSize:'clamp(17px,4.6vw,56px)', color:C.orange, letterSpacing:'-.01em', textShadow:'0 3px 12px rgba(0,0,0,.5)' }}>
              EN MATHS · 2 MOIS
            </p>
            <div className="flex items-center gap-3 w-full" style={{ maxWidth:'clamp(160px,28vw,360px)' }}>
              <div className="flex-1 h-px" style={{ background:`linear-gradient(90deg,transparent,${C.gold})` }}/>
              <span style={{ color:C.gold, fontSize:'10px' }}>✦</span>
              <div className="flex-1 h-px" style={{ background:`linear-gradient(90deg,${C.gold},transparent)` }}/>
            </div>
            <span style={{ fontFamily:'var(--font-cinzel)', fontSize:'clamp(5.5px,.7vw,8px)', color:`${C.goldLt}70`, letterSpacing:'.16em' }}>
              MÉTHODE VISUELLE · SANS COURS PARTICULIERS
            </span>
          </motion.div>

          {/* VSL */}
          <motion.div initial={{ opacity:0, scale:.97 }} animate={{ opacity:1, scale:1 }} transition={{ delay:.26, duration:.55 }}
            className="shrink-0 w-full" style={{ maxWidth:'clamp(200px,36vw,390px)' }}>
            <div className="flex items-center justify-center gap-2 mb-1.5">
              <div className="flex-1 h-px" style={{ background:`${C.gold}25` }}/>
              <span style={{ fontFamily:'var(--font-cinzel)', fontSize:'clamp(6px,.68vw,7.5px)', color:`${C.gold}68`, letterSpacing:'.24em' }}>✦ PRÉSENTATION ✦</span>
              <div className="flex-1 h-px" style={{ background:`${C.gold}25` }}/>
            </div>
            <button type="button" aria-label="Lire la vidéo" onClick={()=>setVsl(true)}
              className="w-full aspect-video relative overflow-hidden group cursor-pointer"
              style={{ border:`3px solid ${C.gold}`, boxShadow:`0 0 28px rgba(232,184,72,.28),5px 5px 0 ${C.ink},0 12px 40px rgba(0,0,0,.5)` }}>
              <Image src={getYouTubeThumbnailUrl(offerConfig.vslYoutubeId)} alt="VSL" fill
                className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                priority sizes="(max-width:768px) 90vw,390px"/>
              <div className="absolute inset-0" style={{ background:`linear-gradient(to top,${C.void}60,transparent 50%)` }}/>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative group-hover:scale-110 transition-transform duration-300">
                  <div className="absolute inset-0 rounded-full animate-glow" style={{ boxShadow:`0 0 22px ${C.gold}55` }}/>
                  <div className="relative flex items-center justify-center rounded-full"
                    style={{ width:'clamp(36px,5vw,58px)', height:'clamp(36px,5vw,58px)', background:`linear-gradient(135deg,${C.gold},${C.orange})`, border:`3px solid ${C.ink}`, boxShadow:`4px 4px 0 ${C.ink},0 6px 18px rgba(240,80,32,.4)` }}>
                    <Play className="fill-current ml-1" style={{ color:'#fff', width:'clamp(12px,1.9vw,21px)', height:'clamp(12px,1.9vw,21px)' }}/>
                  </div>
                </div>
              </div>
              {(['top-0 left-0','top-0 right-0','bottom-0 left-0','bottom-0 right-0'] as const).map((pos,i)=>(
                <div key={i} className={`absolute ${pos} pointer-events-none`}
                  style={{ width:'clamp(10px,1.6vw,20px)', height:'clamp(10px,1.6vw,20px)', margin:'5px',
                    borderTop:   i<2 ? `2px solid ${C.goldLt}` : 'none',
                    borderBottom:i>=2? `2px solid ${C.goldLt}` : 'none',
                    borderLeft:  i%2===0 ? `2px solid ${C.goldLt}` : 'none',
                    borderRight: i%2===1 ? `2px solid ${C.goldLt}` : 'none',
                  }}/>
              ))}
              <div className="absolute bottom-1.5 right-2 px-2 py-0.5 backdrop-blur-sm"
                style={{ background:'rgba(4,6,15,.82)', border:`1px solid ${C.gold}20` }}>
                <span style={{ fontFamily:'var(--font-cinzel)', fontSize:'clamp(5.5px,.65vw,7.5px)', fontWeight:700, color:`${C.marble}58`, letterSpacing:'.1em' }}>Regarde avant d&apos;acheter</span>
              </div>
            </button>
          </motion.div>

          {/* PRICING + CTA — flat sur fond ciel */}
          <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:.4, duration:.55 }}
            className="shrink-0 w-full flex flex-col items-center gap-2"
            style={{ maxWidth:'clamp(240px,44vw,420px)' }}>

            {/* CTA */}
            <a href={offerConfig.checkoutUrl}
              onClick={(e) => { e.preventDefault(); window.location.href = offerConfig.checkoutUrl; }}
              className="relative w-full flex items-center justify-center gap-2 overflow-hidden font-black uppercase transition-transform duration-75 hover:translate-y-[2px] hover:translate-x-[2px]"
              style={{ background:`linear-gradient(135deg,${C.orange} 0%,#FF7040 100%)`, color:'#fff', border:`3px solid ${C.ink}`, boxShadow:`5px 5px 0 ${C.ink}, 0 8px 24px rgba(240,80,32,.35)`, padding:'clamp(9px,1.2vw,14px) 18px', fontSize:'clamp(11px,1.55vw,16px)', fontFamily:'var(--font-baloo)' }}>
              <span className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] animate-shine pointer-events-none"/>
              JE VEUX 15/20 EN MATHS
              <Unlock className="w-4 h-4 shrink-0" strokeWidth={3}/>
            </a>

            {/* Prix */}
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <span style={{ fontFamily:'var(--font-baloo)', fontSize:'clamp(18px,2.2vw,26px)', fontWeight:900, color:'#fff', textShadow:'0 2px 8px rgba(0,0,0,.6)' }}>{offerConfig.launchPrice}€</span>
              <span style={{ fontFamily:'var(--font-baloo)', fontSize:'clamp(11px,1.2vw,14px)', color:'rgba(255,255,255,.38)', textDecoration:'line-through' }}>{offerConfig.regularPrice}€</span>
              <span style={{ fontFamily:'var(--font-baloo)', fontSize:'clamp(8px,.88vw,10px)', fontWeight:800, background:C.orange, color:'#fff', padding:'2px 8px', border:`2px solid ${C.ink}`, boxShadow:`2px 2px 0 ${C.ink}` }}>−{offerConfig.regularPrice-offerConfig.launchPrice}€</span>
            </div>

            {/* Garanties */}
            <div className="flex items-center justify-center gap-1 flex-wrap">
              {[`✓ Accès à vie`,`✓ ${offerConfig.guaranteeDays}j remboursé`,'✓ PDF + vidéos'].map((t,i)=>(
                <span key={i} className="flex items-center gap-1">
                  {i>0 && <span style={{ color:'rgba(255,255,255,.25)', fontSize:'7px' }}>·</span>}
                  <span style={{ fontFamily:'var(--font-cinzel)', fontSize:'clamp(6px,.65vw,7.5px)', fontWeight:700, letterSpacing:'.1em', color:'rgba(255,255,255,.52)', whiteSpace:'nowrap' }}>{t}</span>
                </span>
              ))}
            </div>
          </motion.div>

        </main>

        {/* ── DROITE : Zeuf ── */}
        <BigZeuf/>

      </div>

      <Ticker/>
      <VSLModal open={vsl} onClose={()=>setVsl(false)}/>
    </div>
  );
}
