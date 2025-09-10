'use client';

import { useMemo, useRef, useState } from 'react';
import { Index } from '@/components/animations/background/Index';
import { SlideTransition } from '@/components/animations/SlideTransition';
import { SlideComponent } from '@/components/SlideComponent';
import { useAsyncData } from '@/hooks/useAsyncData';
import { useSlidePresentation } from '@/hooks/useSlidePresentation';
import type { SlideSection } from '@/types/slide';
import styles from './section.module.css';

async function getSlideData(presentationId: string): Promise<SlideSection[]> {
  try {
    const { slideSections } = await import(`@/data/${presentationId}`);
    return slideSections satisfies SlideSection[];
  }
  catch (error) {
    console.error('Error loading slide data:', error);
    return [];
  }
}

export default function SlideView({
  presentationId,
  sectionId,
}: {
  presentationId: string;
  sectionId: string;
}) {
  // start as null to avoid server/client markup differences
  const [backgroundAnimationId, setBackgroundAnimationId] = useState<string | null>(null);
  // client-only incremental counter for generating stable animation ids
  const animationCounterRef = useRef(0);
  const [animationDirection, setAnimationDirection] = useState<'left' | 'right'>('right');

  // useAsyncDataでデータ読み込み
  const [slideData, isLoading] = useAsyncData(
    () => getSlideData(presentationId),
    [presentationId],
    [],
  );

  const currentSection = useMemo(
    () => slideData.find((s) => s.id === sectionId) || null,
    [slideData, sectionId],
  );

  const handleSlideDirectionChange = (direction: 'next' | 'prev') => {
    setAnimationDirection(direction === 'next' ? 'right' : 'left');
    if (currentSlide?.backgroundAnimation) {
      animationCounterRef.current += 1;
      setBackgroundAnimationId(`${currentSlide.id}-${animationCounterRef.current}`);
    }
  };

  const { currentIndex, currentSlide, goNext, goPrev } = useSlidePresentation(
    currentSection?.slides || [],
    handleSlideDirectionChange,
  );

  const handleBackgroundAnimationComplete = () => {
    setBackgroundAnimationId(null);
  };

  if (isLoading || !currentSection || !currentSlide) {
    return <div>Loading...</div>;
  }

  return (
    <div data-theme={presentationId}>
      <Index
        animation={currentSlide.backgroundAnimation}
        animationId={backgroundAnimationId}
        direction={animationDirection}
        onComplete={handleBackgroundAnimationComplete}
      />

      <SlideTransition slideId={currentSlide.id} animations={currentSlide.slideAnimations}>
        <SlideComponent slide={currentSlide} />
      </SlideTransition>

      <div className={styles.slideNavigation}>
        <button type="button" className={styles.navButton} onClick={goPrev}>
          ←
        </button>
        <span className={styles.slideCounter}>
          {currentIndex + 1} / {currentSection.slides.length}
        </span>
        <button type="button" className={styles.navButton} onClick={goNext}>
          →
        </button>
      </div>
    </div>
  );
}
