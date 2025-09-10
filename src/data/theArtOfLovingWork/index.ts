import type { SlideSection, SlidesPageData } from '@/types/slide';

import loveIsAnArtSection from './01-love_is_an_art';
import fourElementsOfLoveSection from './02-four_elements_of_love';
import loveIsGivingSection from './03-love_is_giving';
import summarySection from './04-summary';

export const slideSections: SlideSection[] = [
  loveIsAnArtSection,
  fourElementsOfLoveSection,
  loveIsGivingSection,
  summarySection,
];

export const slidesPageData: SlidesPageData = {
  title: '愛のある仕事',
  description: 'エーリヒ・フロムの「愛するということ」を参考に、エンジニアリングにおける協働の技術を考える',
};
