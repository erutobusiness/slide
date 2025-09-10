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

      {slide.list && (
        <div className={styles.listContainer}>
          {slide.list.groups.map((group, groupIndex) => (
            <div key={`${slide.id}-list-group-${groupIndex}`} className={styles.listGroup}>
              {group.title && <h3 className={styles.listGroupTitle}>{group.title}</h3>}
              <ul className={styles.listPoints}>
                {group.points.map((point, pointIndex) => (
                  <li key={`${slide.id}-list-point-${groupIndex}-${pointIndex}`} className={styles.listPoint}>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {slide.subSections && (
        <div className={styles.subSectionsContainer}>
          {slide.subSections.map((subSection, index) => (
            <div key={`${slide.id}-subSection-${index}`} className={styles.subSection}>
              <h2 className={styles.subSectionTitle}>{subSection.title}</h2>
              <div className={styles.subSectionDescriptions}>
                {subSection.descriptions.map((desc, descIndex) => (
                  <p
                    key={`${slide.id}-subSection-${index}-desc-${descIndex}`}
                    className={styles.subSectionDescription}
                  >
                    {desc}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {slide.image && (
        <div className={styles.imageContainer}>
          <Image
            src={slide.image.url}
            alt={slide.image.alt}
            className={styles.slideImage}
            layout='fill'
            objectFit='contain'
            priority={!slide.image.lazy}
          />
        </div>
      )}

      {slide.codeExamples && slide.codeExamples.length > 0 && <CodeExamples slide={slide} />}

      {typeof slide.tweetUrl === 'string' && <TweetEmbed tweetUrl={slide.tweetUrl} />}

      {children}
    </div>
  );
}
