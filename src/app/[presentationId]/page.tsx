import Link from 'next/link';
import styles from './presentation.module.css';

// presentation metadata is provided from `src/data/<presentationId>/index.ts`
// do not define presentation data inline here; the page will dynamically import it.

export default async function PresentationPage({
  params,
}: {
  params: Promise<{ presentationId: string }>;
}) {
  const { presentationId } = await params;

  // try to dynamically import data module for the presentation (e.g. src/data/declarative_ui/index.ts)
  let presentation:
    | { title: string; description: string; sections: { id: string; title: string }[] }
    | undefined;
  try {
    const mod = await import(`@/data/${presentationId}`);

    // prefer exported accessor `getSlidesPageData` or `slidesPageData` for title/description
    const pageInfo =
      typeof mod.getSlidesPageData === 'function'
        ? mod.getSlidesPageData()
        : mod.slidesPageData || {};

    const sectionsFromData: { id: string; title: string }[] = Array.isArray(mod.slideSections)
      ? (mod.slideSections as Array<{ id: string; title: string }>).map((s) => ({
          id: s.id,
          title: s.title,
        }))
      : [];

    if (!pageInfo.title && !sectionsFromData.length) {
      // module exists but doesn't export expected data
      throw new Error('invalid presentation module');
    }

    presentation = {
      title: pageInfo.title ?? 'Presentation',
      description: pageInfo.description ?? '',
      sections: sectionsFromData,
    };
  } catch (_) {
    // if dynamic import fails or module doesn't match expected shape, show not found
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
