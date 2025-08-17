import type { SlideSection } from '@/types/slide';

const introSection: SlideSection = {
  id: '01_intro',
  title: 'イントロダクション',
  description: '宣言的UIの基本概念について',
  slides: [
    {
      id: '01_intro_1',
      title: '宣言的UIとは',
      descriptions: [
        '宣言的UIとは「何を」表示するかを記述し、「どのように」表示するかの詳細はフレームワークに任せるアプローチ',
        '状態という入力からUIを出力し、状態変化に応じた更新はフレームワークが自動的に行う',
      ],
      backgroundAnimation: { type: 'wave' },
    },
    {
      id: '01_intro_2',
      title: 'コード比較：カウンターボタンの実装',
      descriptions: ['同じ機能を命令的UIと宣言的UIで実装した例を比較'],
      backgroundAnimation: { type: 'wave' },
      codeExamples: [
        {
          title: '命令的UI（JavaScript DOM）',
          language: 'javascript',
          code: `// HTML: <button id="counter">0</button>

function setupCounter() {
  const button = document.getElementById('counter');
  let count = 0;

  button.addEventListener('click', () => {
    count++;
    button.textContent = count;
  });
}`,
        },
        {
          title: '宣言的UI（React）',
          language: 'typescript',
          code: `function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}`,
        },
      ],
    },
  ],
};

const whyNowSection: SlideSection = {
  id: '02_why_now',
  title: 'なぜ今宣言的UIなのか',
  description: '現代における宣言的UIの重要性',
  slides: [
    {
      id: '02_why_now_1',
      title: 'なぜ今宣言的UIなのか',
      descriptions: [
        'Webアプリケーションの複雑化に伴い、UIの状態管理が困難になってきた',
        '宣言的アプローチにより、コードの可読性と保守性が向上',
      ],
      backgroundAnimation: { type: 'wave' },
    },
  ],
};

export const slideSections: SlideSection[] = [introSection, whyNowSection];

export function getSlideSection(id: string): SlideSection | undefined {
  return slideSections.find((section) => section.id === id);
}

export function getAllSlideSections(): SlideSection[] {
  return slideSections;
}

export const slidesPageData = {
  title: '宣言的な世界',
  description: '宣言的UIを端に、歴史やクイズを通して、モダン開発のパラダイムを理解する',
};

export function getSlidesPageData() {
  return slidesPageData;
}
