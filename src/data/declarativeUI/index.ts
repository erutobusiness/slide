import type { SlideSection, SlidesPageData } from '@/types/slide';

import introSection from './01-intro';
import whyNowSection from './02-why_now';
import historySection from './03-history';
import quizSection from './04-quiz';
import letterSection from './05-letter';
import summarySection from './06-summary';
import humanitiesSection from './90-humanities';

export const slideSections: SlideSection[] = [
  introSection,
  whyNowSection,
  historySection,
  quizSection,
  letterSection,
  summarySection,
  humanitiesSection,
];

export const slidesPageData: SlidesPageData = {
  title: '宣言的な世界',
  description: '宣言的UIを端に、歴史やクイズを通して、モダン開発のパラダイムを理解する',
};

