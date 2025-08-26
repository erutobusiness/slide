import { Presentation } from "@/types/slide";
import { isSlideSections, isSlidesPageData } from "./isPresentation";

export async function loadPresentation(id: string): Promise<Presentation | undefined> {
  const { slideSections, slidesPageData } = await import(`@/data/${id}`);
  if (!isSlideSections(slideSections) || !isSlidesPageData(slidesPageData)) return undefined;
  try {
    // Map slide sections to include slides
    const sections = slideSections.map((section) => ({
      ...section,
      slides: section.slides || [],
    }));
    if (!slidesPageData?.title && !sections.length) return undefined;

    return {
      id,
      title: slidesPageData?.title ?? 'Presentation',
      description: slidesPageData?.description ?? '',
      sections,
    };
  } catch {
    return undefined;
  }
}