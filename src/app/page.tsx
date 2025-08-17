import Link from 'next/link';
import styles from './page.module.css';

const presentations = [
  {
    id: 'declarative_ui',
    title: 'Declarative UI',
    description: 'モダンなUIフレームワークにおける宣言的UI設計について',
  },
  {
    id: 'theArtOfLoving',
    title: 'The Art of Loving',
    description: '愛の技術に関するプレゼンテーション',
  },
];

export default function Home() {
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
