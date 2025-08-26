import { SlideSection, SlidesPageData } from "@/types/slide";

export function isSlideSections(sections: unknown): sections is SlideSection[] {
  return Array.isArray(sections) && sections.every((s) => typeof s.id === "string" && typeof s.title === "string");
}

export function isSlidesPageData(data: unknown): data is SlidesPageData {
  return (
    typeof data === "object" &&
    data !== null &&
    typeof (data as SlidesPageData).title === "string" &&
    typeof (data as SlidesPageData).description === "string"
  );
}
