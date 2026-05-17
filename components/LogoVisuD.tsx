'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { offerConfig } from '@/lib/offer';
import { useTapHover } from '@/hooks/useTapHover';

interface LogoVisuDProps {
  size?: number;
  className?: string;
  clickable?: boolean;
}

export function LogoVisuD({ size = 120, className = '', clickable = true }: LogoVisuDProps) {
  const { hovered, ref, onPointerEnter, onPointerLeave } = useTapHover();

  const content = (
    <motion.div
      ref={ref}
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size, cursor: clickable ? 'pointer' : 'default' }}
      animate={hovered ? { scale: 1.08, rotate: 4 } : { scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 280, damping: 18 }}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      <div style={{ position: 'relative', width: size, height: size }}>
        <Image
          src="/visu-d-alt.png"
          alt="Maths Ultime Logo"
          fill
          className="object-contain"
          sizes={`${size}px`}
        />
      </div>
    </motion.div>
  );

  if (clickable) {
    return (
      <a href={offerConfig.checkoutUrl} onClick={(e) => { e.preventDefault(); window.location.href = offerConfig.checkoutUrl; }} style={{ display: 'inline-block', cursor: 'pointer' }}>
        {content}
      </a>
    );
  }

  return content;
}
