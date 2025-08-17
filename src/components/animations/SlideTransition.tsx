'use client';

import { AnimatePresence, motion } from 'framer-motion';
import type { SlideAnimations } from '@/types/slide';

interface SlideTransitionProps {
  children: React.ReactNode;
  slideId: string;
  animations?: SlideAnimations;
}

export function SlideTransition({ children, slideId, animations }: SlideTransitionProps) {
  const getTransitionVariants = () => {
    const inType = animations?.in?.type || 'fade';
    const outType = animations?.out?.type || 'fade';

    return {
      initial: getInitialVariant(inType),
      animate: { opacity: 1, x: 0, y: 0, scale: 1 },
      exit: getExitVariant(outType),
    };
  };

  const variants = getTransitionVariants();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={slideId}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        transition={{
          duration: animations?.in?.duration ? animations.in.duration / 1000 : 0.5,
          ease: 'easeInOut',
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

function getInitialVariant(type: string) {
  switch (type) {
    case 'slide':
      return { opacity: 0, x: 100 };
    case 'zoom':
      return { opacity: 0, scale: 0.8 };
    // case 'fade':
    default:
      return { opacity: 0 };
  }
}

function getExitVariant(type: string) {
  switch (type) {
    case 'slide':
      return { opacity: 0, x: -100 };
    case 'zoom':
      return { opacity: 0, scale: 1.2 };
    // case 'fade':
    default:
      return { opacity: 0 };
  }
}
