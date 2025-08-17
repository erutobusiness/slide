'use client';

import { useParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { Index } from '@/components/animations/background/Index';
import { SlideTransition } from '@/components/animations/slide-transition/SlideTransition';
import { SlideComponent } from '@/components/SlideComponent';
import { useAsyncData } from '@/hooks/useAsyncData';
import { useSlidePresentation } from '@/hooks/useSlidePresentation';
import type { SlideSection } from '@/types/slide';
import styles from './page.module.css';

async function getSlideData(presentationId: string): Promise<SlideSection[]> {
  if (presentationId === 'declarative_ui') {
    const { getAllSlideSections } = await import('@/data/declarative_ui');
    return getAllSlideSections();
  }
  return [];
}

export default function SlidePage() {
  const params = useParams();
  const presentationId = params.presentationId as string;
  const sectionId = params.sectionId as string;

  const [backgroundAnimationId, setBackgroundAnimationId] = useState<string | null>('initial');
  const [animationDirection, setAnimationDirection] = useState<'left' | 'right'>('right');

  // useAsyncDataでデータ読み込み
  const [slideData, isLoading] = useAsyncData(
    () => getSlideData(presentationId),
    [presentationId],
    []
  );

  const currentSection = useMemo(
    () => slideData.find((s) => s.id === sectionId) || null,
    [slideData, sectionId]
  );

  const handleSlideDirectionChange = (direction: 'next' | 'prev') => {
    setAnimationDirection(direction === 'next' ? 'right' : 'left');
    if (currentSlide?.backgroundAnimation) {
      setBackgroundAnimationId(`${Date.now()}`);
    }
  };

  const { currentIndex, currentSlide, goNext, goPrev } = useSlidePresentation(
    currentSection?.slides || [],
    handleSlideDirectionChange
  );

  const handleSlideChange = () => {
    if (currentSlide?.backgroundAnimation) {
      setBackgroundAnimationId(`${Date.now()}`);
    }
  };

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
      
      <SlideTransition 
        slideId={currentSlide.id}
        animations={currentSlide.slideAnimations}
      >
        <SlideComponent slide={currentSlide}>
          <div className={styles.slideNavigation}>
            <button
              type="button"
              className={styles.navButton}
              onClick={goPrev}
            >
              ←
            </button>
            <span className={styles.slideCounter}>
              {currentIndex + 1} / {currentSection.slides.length}
            </span>
            <button
              type="button"
              className={styles.navButton}
              onClick={goNext}
            >
              →
            </button>
          </div>
        </SlideComponent>
      </SlideTransition>
    </div>
  );
}
