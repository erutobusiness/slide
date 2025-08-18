import type { SlideSection } from '@/types/slide';

// Intro section and a minimal slide so the presentation is discoverable
export const introSection: SlideSection = {
  id: '01-intro',
  title: '愛の技術（イントロ）',
  description: '愛と関係についてのイントロダクション',
  slides: [
    {
      id: '01-intro-1',
      title: '愛とは何か',
      descriptions: ['愛の多面的な定義を概観します。'],
    },
  ],
};

export const slideSections: SlideSection[] = [introSection];

export const slidesPageData = {
  title: 'The Art of Loving',
  description:
    'エーリヒ・フロムの「愛するということ」を読んだので、愛がなぜ技術なのかを紹介します。',
};

export function getSlidesPageData() {
  return slidesPageData;
}
