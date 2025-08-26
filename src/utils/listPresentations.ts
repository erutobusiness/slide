import { SlidesPageData } from "@/types/slide";
import { isSlidesPageData } from "./isPresentation";

export async function listPresentations(): Promise<
  Array<{ id: string; title: string; description?: string }>
> {
  const results: Array<{ id: string; title: string; description?: string }> = [];
  const fs = require('fs');
  const path = require('path');
  const dataDir = path.resolve(process.cwd(), 'src/data');

  let entries: Array<any> = [];
  try {
    entries = fs.readdirSync(dataDir, { withFileTypes: true });
  } catch (e) {
    // no data directory or unreadable — return empty
    return results;
  }

  const dirs = entries.filter((ent: any) => ent.isDirectory()).map((d: any) => d.name);

  for (const id of dirs) {
    try {
      // Import relative to this file so Next's bundler can resolve the module at build time
      const mod = (await import(`../data/${id}`)) as {
        slidesPageData?: SlidesPageData;
      };
      const pageInfo = mod.slidesPageData;
      if (!isSlidesPageData(pageInfo)) continue;
      results.push({ id, title: pageInfo.title ?? id, description: pageInfo.description ?? '' });
    } catch (err) {
      // skip modules that fail to import
    }
  }

  return results;
}
