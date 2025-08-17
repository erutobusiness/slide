'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useCallback } from 'react';
import styles from './Wave.module.css';

interface WaveProps {
  animationId: string | null;
  direction?: 'left' | 'right';
  onComplete?: (id: string) => void;
}

export function Wave({ animationId, direction = 'right', onComplete }: WaveProps) {
  const handleAnimationComplete = useCallback(() => {
    if (animationId && onComplete) {
      setTimeout(() => onComplete(animationId), 900);
    }
  }, [animationId, onComplete]);

  if (animationId === null) return null;

  return (
    <AnimatePresence>
      <motion.div
        key={`wave-${animationId}`}
        className={`${styles.waveContainer} ${styles[direction]}`}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onAnimationComplete={handleAnimationComplete}
      >
        <div className={styles.liquid}>
          <div className={styles.wave} />
          <div className={styles.wave2} />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
