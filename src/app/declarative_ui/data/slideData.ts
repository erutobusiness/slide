import type { SlideSection } from '@/types/slides';

// 各セクションのインポート
import { introSection } from './01-intro';
import { whyNowSection } from './02-why_now';
import { historySection } from './03-history';
import { quizSection } from './04-quiz';
import { letterSection } from './05-letter';
import { summarySection } from './06-summary';
import { humanitiesSection } from './90-humanities';

// すべてのスライドセクションの配列
export const slideSections: SlideSection[] = [
  introSection,
  whyNowSection,
  historySection,
  quizSection,
  letterSection,
  summarySection,
  humanitiesSection,
];

// 特定のスライドセクションを取得する関数
export function getSlideSection(id: string): SlideSection | undefined {
  return slideSections.find((section) => section.id === id);
}

// すべてのスライドセクションを取得する関数
export function getAllSlideSections(): SlideSection[] {
  return slideSections;
}

// スライドページのデータ
export const slidesPageData = {
  title: '宣言的な世界',
  description: '宣言的UIを端に、歴史やクイズを通して、モダン開発のパラダイムを理解する',
  subDescription: '……客船クイーンエリザベスとグラン・マルニエを添えて',
  backgroundImage: '/declarative/Queen_Elizabeth.jpg',
};

// スライドページのデータを取得する関数
export function getSlidesPageData() {
  return slidesPageData;
}
