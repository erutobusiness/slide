'use client';

import { useEffect, useRef } from 'react';
import styles from './TweetEmbed.module.css';

interface TweetEmbedProps {
  tweetUrl: string;
  /** optionally hide conversation threads */
  hideConversation?: boolean;
  /** light | dark */
  theme?: 'light' | 'dark';
}

type Twttr = {
  widgets?: {
    createTweet?: (
      id: string,
      node: HTMLElement,
      opts?: Record<string, unknown>,
    ) => Promise<unknown>;
    load?: (node?: HTMLElement) => void;
  };
};

function extractTweetId(url: string): string | null {
  try {
    const u = new URL(url);
    // path like /{user}/status/{id}
    const parts = u.pathname.split('/');
    const idx = parts.indexOf('status');
    if (idx >= 0 && parts.length > idx + 1) return parts[idx + 1];
    // fallback: last path segment if numeric
    const last = parts.pop() || '';
    return /^(\d+)$/.test(last) ? last : null;
  } catch (_e) {
    return null;
  }
}

function loadTwitterScript(): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') return resolve();
    const win = window as unknown as { twttr?: Twttr };
    if (win.twttr?.widgets) return resolve();

    const id = 'twitter-wjs';
    if (document.getElementById(id)) {
      // wait a tick for it to initialize
      const check = () => (win.twttr?.widgets ? resolve() : setTimeout(check, 50));
      check();
      return;
    }

    const script = document.createElement('script');
    script.id = id;
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    script.onload = () => {
      // twttr ready may be set after load
      const check = () => (win.twttr?.widgets ? resolve() : setTimeout(check, 50));
      check();
    };
    document.body.appendChild(script);
  });
}

export default function TweetEmbed({
  tweetUrl,
  hideConversation = true,
  theme = 'light',
}: TweetEmbedProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!tweetUrl) return;
    const id = extractTweetId(tweetUrl);
    // create anchor fallback when id is not found
    let mounted = true;

    loadTwitterScript().then(() => {
      if (!mounted) return;
      const win = window as unknown as { twttr?: Twttr };
      const container = containerRef.current;
      if (!container) return;

      // clear previous
      container.innerHTML = '';

      if (id && win.twttr?.widgets?.createTweet) {
        try {
          win.twttr.widgets
            .createTweet(id, container, {
              theme,
              conversation: hideConversation ? 'none' : 'all',
            })
            .catch(() => {
              // fallback to anchor
              const a = document.createElement('a');
              a.href = tweetUrl;
              a.textContent = 'View Tweet';
              container.appendChild(a);
            });
        } catch (_e) {
          const a = document.createElement('a');
          a.href = tweetUrl;
          a.textContent = 'View Tweet';
          container.appendChild(a);
        }
      } else {
        // no widgets API available, render blockquote/anchor and call widgets.load
        const block = document.createElement('blockquote');
        block.className = 'twitter-tweet';
        const a = document.createElement('a');
        a.href = tweetUrl;
        block.appendChild(a);
        container.appendChild(block);
        if (win.twttr?.widgets?.load) {
          win.twttr.widgets.load(container);
        }
      }
    });

    return () => {
      mounted = false;
    };
  }, [tweetUrl, hideConversation, theme]);

  return (
    <div className={styles.container}>
      <div ref={containerRef} />
    </div>
  );
}
