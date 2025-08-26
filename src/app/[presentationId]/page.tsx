import Link from 'next/link';
import styles from './presentation.module.css';
import { loadPresentation } from '@/utils/loadPresentation';

// presentation metadata is provided from `src/data/<presentationId>/index.ts`
// do not define presentation data inline here; the page will dynamically import it.

export default async function PresentationPage({
  params,
}: {
  params: Promise<{ presentationId: string }>;
}) {
  const { presentationId } = await params;

  const presentation = await loadPresentation(presentationId);
  if (!presentation) return <div>プレゼンテーションが見つかりません</div>;

  return (
    <div data-theme={presentationId} className={styles.container}>
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
