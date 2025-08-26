'use client';

import Image from 'next/image';
import type { Slide } from '@/types/slide';
import styles from './SlideComponent.module.css';
import CodeExamples from './contents/CodeExamples';
import TweetEmbed from './contents/TweetEmbed';

interface SlideComponentProps {
  slide: Slide;
  children?: React.ReactNode;
}

export function SlideComponent({ slide, children }: SlideComponentProps) {
  return (
    <div className={styles.slideContainer} data-slide-id={slide.id}>
      <div className={styles.slideContent}>
        <h1 className={styles.slideTitle}>{slide.title}</h1>

        {slide.descriptions && (
          <div className={styles.descriptions}>
            {slide.descriptions.map((desc, index) => (
              <p key={`${slide.id}-desc-${index}`} className={styles.description}>
                {desc}
              </p>
            ))}
          </div>
        )}

        {slide.image && (
          <div className={styles.imageContainer}>
            <Image
              src={slide.image.url}
              alt={slide.image.alt}
              width={800}
              height={600}
              className={styles.slideImage}
            />
          </div>
        )}

        {slide.codeExamples && slide.codeExamples.length > 0 && <CodeExamples slide={slide} />}

        {typeof slide.tweetUrl === 'string' && <TweetEmbed tweetUrl={slide.tweetUrl} />}

        {children}
      </div>
    </div>
  );
}
