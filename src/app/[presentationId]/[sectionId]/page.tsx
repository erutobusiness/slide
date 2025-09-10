import { listPresentations } from '@/utils/listPresentations';
import { loadPresentation } from '@/utils/loadPresentation';
import SlideView from './client';

// For `output: 'export'` we must provide all dynamic route params at build-time.
export async function generateStaticParams() {
  const presentations = await listPresentations();
  const allParams = await Promise.all(
    presentations.map(async (p) => {
      const presentation = await loadPresentation(p.id);
      if (!presentation) return [];
      return presentation.sections.map((section) => ({
        presentationId: p.id,
        sectionId: section.id,
      }));
    }),
  );

  return allParams.flat();
}

export default async function Page({
  params,
}: {
  params: Promise<{ presentationId: string; sectionId: string }>;
}) {
  const { presentationId, sectionId } = await params;
  return <SlideView presentationId={presentationId} sectionId={sectionId} />;
}