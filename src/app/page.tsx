import Link from 'next/link';
import { listPresentations } from '@/hooks/usePresentations';
import styles from './page.module.css';

export default async function Home() {
  const presentations = await listPresentations();

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>プレゼンテーション一覧</h1>

        <div className={styles.presentationGrid}>
          {presentations.map((presentation) => (
            <Link
              key={presentation.id}
              href={`/${presentation.id}`}
              className={styles.presentationCard}
            >
              <h2>{presentation.title}</h2>
              <p>{presentation.description}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
