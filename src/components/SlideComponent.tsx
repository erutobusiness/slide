'use client';

import Image from 'next/image';
import type { Language } from 'prism-react-renderer';
import Highlight, { defaultProps } from 'prism-react-renderer';
import type { Slide } from '@/types/slide';
import styles from './SlideComponent.module.css';

type Token = { types: string[]; content: string };
type RenderPropsLocal = {
  className?: string;
  tokens: Token[][];
  getLineProps: (options: { line: Token[]; key: string }) => Record<string, unknown>;
  getTokenProps: (options: { token: Token; key: string }) => Record<string, unknown>;
};

import theme from 'prism-react-renderer/themes/nightOwl';

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

        {slide.codeExamples && slide.codeExamples.length > 0 && (
          <div
            className={`${styles.codeExamples} ${
              slide.codeLayout === 'horizontal' ? styles.codeExamplesHorizontal : ''
            }`}
            data-layout={slide.codeLayout ?? 'vertical'}
          >
            {slide.codeExamples.map((code, index) => (
              <div
                key={`${slide.id}-code-${code.title}-${index}`}
                className={styles.codeBlock}
              >
                {code.title && <h3 className={styles.codeTitle}>{code.title}</h3>}
                {code.filename && <p className={styles.filename}>{code.filename}</p>}

                {/* Prism-based syntax highlighting */}
                <Highlight
                  {...defaultProps}
                  theme={theme}
                  code={String(code.code)}
                  language={(code.language || 'javascript') as Language}
                >
                  {(renderProps: RenderPropsLocal) => {
                    const { className, tokens, getLineProps, getTokenProps } = renderProps;
                    return (
                      <pre className={`${styles.codeContent} ${className ?? ''}`}>
                        {tokens.map((line: Token[], i: number) => {
                          const lineKey = `${i}-${line
                            .map((t) => String(t.content))
                            .join('')
                            .slice(0, 12)}`;
                          return (
                            <div key={`${lineKey}-${line}`} {...getLineProps({ line, key: lineKey })}>
                              {line.map((token: Token, j: number) => {
                                const tokenKey = `${lineKey}-${j}-${String(token.content).slice(0, 8)}`;
                                return (
                                  <span
                                    key={tokenKey}
                                    {...getTokenProps({ token, key: tokenKey })}
                                  />
                                );
                              })}
                            </div>
                          );
                        })}
                      </pre>
                    );
                  }}
                </Highlight>
              </div>
            ))}
          </div>
        )}

        {children}
      </div>
    </div>
  );
}
