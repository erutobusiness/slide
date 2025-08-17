'use client';

import { motion } from 'framer-motion';

interface AppearAnimationProps {
  children: React.ReactNode;
  type?: 'fade-in' | 'fade-in-up' | 'fade-in-down' | 'slide-in-left' | 'slide-in-right' | 'zoom-in';
  delay?: number;
  duration?: number;
}

export function AppearAnimation({ 
  children, 
  type = 'fade-in', 
  delay = 0, 
  duration = 0.5 
}: AppearAnimationProps) {
  const variants = getAnimationVariants(type);

  return (
    <motion.div
      initial={variants.initial}
      animate={variants.animate}
      transition={{
        duration,
        delay: delay / 1000,
        ease: 'easeOut'
      }}
    >
      {children}
    </motion.div>
  );
}

function getAnimationVariants(type: string) {
  switch (type) {
    case 'fade-in-up':
      return {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 }
      };
    case 'fade-in-down':
      return {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 }
      };
    case 'slide-in-left':
      return {
        initial: { opacity: 0, x: -50 },
        animate: { opacity: 1, x: 0 }
      };
    case 'slide-in-right':
      return {
        initial: { opacity: 0, x: 50 },
        animate: { opacity: 1, x: 0 }
      };
    case 'zoom-in':
      return {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 }
      };
    // case 'fade-in':
    default:
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 }
      };
  }
}