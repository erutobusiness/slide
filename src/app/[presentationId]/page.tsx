import Link from 'next/link';
import styles from './presentation.module.css';

const presentationData = {
  declarative_ui: {
    title: 'Declarative UI',
    description: 'モダンなUIフレームワークにおける宣言的UI設計について',
    sections: [
      { id: '01_intro', title: 'イントロダクション' },
      { id: '02_concept', title: 'コンセプト' },
      { id: '03_implementation', title: '実装' },
    ],
  },
  theArtOfLoving: {
    title: 'The Art of Loving',
    description: '愛の技術に関するプレゼンテーション',
    sections: [
      { id: '01_intro', title: 'はじめに' },
      { id: '02_theory', title: '理論' },
      { id: '03_practice', title: '実践' },
    ],
  },
};

export default async function PresentationPage({
  params,
}: {
  params: Promise<{ presentationId: string }>;
}) {
  const { presentationId } = await params;
  const presentation = presentationData[presentationId as keyof typeof presentationData];

  if (!presentation) {
    return <div>プレゼンテーションが見つかりません</div>;
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>{presentation.title}</h1>
        <p className={styles.description}>{presentation.description}</p>

        <div className={styles.sectionGrid}>
          {presentation.sections.map((section) => (
            <Link
              key={section.id}
              href={`/${presentationId}/${section.id}`}
              className={styles.sectionCard}
            >
              <h2>{section.title}</h2>
            </Link>
          ))}
        </div>

        <Link href="/" className={styles.backLink}>
          ← プレゼンテーション一覧に戻る
        </Link>
      </main>
    </div>
  );
}
