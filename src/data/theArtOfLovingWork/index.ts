import type { SlideSection, SlidesPageData } from '@/types/slide';

// Intro section and a minimal slide so the presentation is discoverable
export const introSection: SlideSection = {
  id: '01-intro',
  title: 'なぜ愛は技術なのか？',
  description: '愛の４要素を紹介し、愛を技術として捉える視点を提供する',
  slides: [
    {
      id: '01-intro-1',
      title: '愛とは何か',
      descriptions: ['愛の多面的な定義を概観します。'],
    },
  ],
};

export const slideSections: SlideSection[] = [introSection];

export const slidesPageData: SlidesPageData = {
  title: 'The Art of Loving',
  description: 'エーリヒ・フロム「愛するということ」を読んだので、愛を与えます！',
};
