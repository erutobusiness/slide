'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useCallback } from 'react';
import type { BackgroundAnimation } from '@/types/slide';
import styles from './Index.module.css';

interface Props {
  animation?: BackgroundAnimation;
  animationId?: string | null;
  direction?: 'left' | 'right';
  onComplete?: (id: string) => void;
}

export function Index({ animation, animationId, direction = 'right', onComplete }: Props) {
  const handleAnimationComplete = useCallback(() => {
    if (animationId && onComplete) {
      setTimeout(() => onComplete(animationId), 900);
    }
  }, [animationId, onComplete]);

  if (!animation || !animationId) return null;

  return (
    <div className={styles.backgroundAnimationContainer}>
      <AnimatePresence>
        <motion.div
          key={`${animation.type}-${animationId}`}
          className={`${styles.waveBackground} ${styles[`from${direction.charAt(0).toUpperCase() + direction.slice(1)}`]}`}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          onAnimationComplete={handleAnimationComplete}
        >
          <div className={styles.liquid}>
            <div className={styles.wave} />
            <div className={styles.wave2} />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
