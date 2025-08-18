'use server';

export type PresentationMeta = {
  id: string;
  title: string;
  description?: string;
  sections: { id: string; title: string }[];
};

const PRESENTATION_MODULES: Record<string, () => Promise<unknown>> = {
  declarative_ui: async () => await import('@/data/declarative_ui'),
  theArtOfLoving: async () => await import('@/data/theArtOfLoving'),
};

export async function loadPresentation(id: string): Promise<PresentationMeta | undefined> {
  const importer = PRESENTATION_MODULES[id];
  if (!importer) return undefined;
  try {
    const mod = (await importer()) as {
      getSlidesPageData?: () => { title?: string; description?: string };
      slidesPageData?: { title?: string; description?: string };
      slideSections?: Array<{ id: string; title: string }>;
    };

    const pageInfo =
      typeof mod.getSlidesPageData === 'function'
        ? mod.getSlidesPageData()
        : mod.slidesPageData || {};

    const sectionsFromData: { id: string; title: string }[] = Array.isArray(mod.slideSections)
      ? mod.slideSections.map((s) => ({ id: s.id, title: s.title }))
      : [];

    if (!pageInfo.title && !sectionsFromData.length) return undefined;

    return {
      id,
      title: pageInfo.title ?? 'Presentation',
      description: pageInfo.description ?? '',
      sections: sectionsFromData,
    };
  } catch {
    return undefined;
  }
}

export async function listPresentations(): Promise<
  Array<{ id: string; title: string; description?: string }>
> {
  const results: Array<{ id: string; title: string; description?: string }> = [];
  for (const [id, importer] of Object.entries(PRESENTATION_MODULES)) {
    try {
      const mod = (await importer()) as {
        getSlidesPageData?: () => { title?: string; description?: string };
        slidesPageData?: { title?: string; description?: string };
      };
      const pageInfo =
        typeof mod.getSlidesPageData === 'function'
          ? mod.getSlidesPageData()
          : mod.slidesPageData || {};
      results.push({ id, title: pageInfo.title ?? id, description: pageInfo.description ?? '' });
    } catch {
      // skip missing
    }
  }
  return results;
}
