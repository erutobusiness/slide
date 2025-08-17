'use client';

import { useCallback, useEffect, useState } from 'react';
import type { Slide } from '@/types/slide';

const calculateNextSlide = (current: number, total: number) => Math.min(current + 1, total - 1);

function useSlideState(initialIndex = 0) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  return { currentIndex, setCurrentIndex };
}

function useKeyboardNav(onNext: () => void, onPrev: () => void) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onNext, onPrev]);
}

export function useSlidePresentation(slides: Slide[], onSlideChange?: (direction: 'next' | 'prev') => void) {
  const { currentIndex, setCurrentIndex } = useSlideState();
  const goNext = useCallback(
    () => {
      setCurrentIndex(calculateNextSlide(currentIndex, slides.length));
      onSlideChange?.('next');
    },
    [currentIndex, slides.length, setCurrentIndex, onSlideChange],
  );
  const goPrev = useCallback(
    () => {
      setCurrentIndex(Math.max(currentIndex - 1, 0));
      onSlideChange?.('prev');
    },
    [currentIndex, setCurrentIndex, onSlideChange],
  );

  useKeyboardNav(goNext, goPrev);

  return {
    currentIndex,
    currentSlide: slides[currentIndex],
    goNext,
    goPrev,
    totalSlides: slides.length,
  };
}
