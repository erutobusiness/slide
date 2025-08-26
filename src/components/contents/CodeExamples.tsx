'use client';

import React from 'react';
import type { Language } from 'prism-react-renderer';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';
import type { Slide } from '@/types/slide';
import styles from './CodeExamples.module.css';

type Token = { types: string[]; content: string };

type RenderPropsLocal = {
  className?: string;
  tokens: Token[][];
  getLineProps: (options: { line: Token[]; key: string }) => Record<string, unknown>;
  getTokenProps: (options: { token: Token; key: string }) => Record<string, unknown>;
};

interface Props {
  slide: Slide;
}

export default function CodeExamples({ slide }: Props) {
  return (
    <div
      className={`${styles.codeExamples} ${
        slide.codeLayout === 'horizontal' ? styles.codeExamplesHorizontal : ''
      }`}
      data-layout={slide.codeLayout ?? 'vertical'}
    >
      {slide.codeExamples?.map((code, index) => (
        <div key={`${slide.id}-code-${code.title}-${index}`} className={styles.codeBlock}>
          {code.title && <h3 className={styles.codeTitle}>{code.title}</h3>}
          {code.filename && <p className={styles.filename}>{code.filename}</p>}

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

                    const rawLineProps = getLineProps({ line, key: lineKey }) as Record<
                      string,
                      unknown
                    >;
                    const { key: _lineKeyProp, ...lineProps } = rawLineProps;

                    return (
                      <div key={`${slide.id}-code-${code.title}-${index}-${i}`} {...lineProps}>
                        {line.map((token: Token, j: number) => {
                          const tokenKey = `${lineKey}-${j}-${token.content.slice(0, 12)}`;
                          const rawTokenProps = getTokenProps({ token, key: tokenKey }) as Record<
                            string,
                            unknown
                          >;
                          const { key: _tokenKeyProp, ...tokenProps } = rawTokenProps;

                          return (
                            <span
                              key={`${slide.id}-code-${code.title}-${index}-${i}-${j}`}
                              {...tokenProps}
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
  );
}
