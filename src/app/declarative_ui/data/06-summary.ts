import type { SlideSection } from '@/types/slides';

// まとめセクションのスライドデータ
export const summarySection: SlideSection = {
  id: '06-summary',
  title: 'まとめ',
  description: '宣言的UIのコンセプトと重要ポイントの復習',
  slides: [
    {
      id: '06-summary-1',
      title: '宣言的UIの要点',
      descriptions: [
        '1. 状態（データ）に基づくUI設計：UI = f(state)',
        '2. 「何を」表示するかを記述し、「どのように」表示するかはフレームワークが担当',
        '3. 再利用可能なコンポーネントによる抽象化',
        '4. 自動的なUI更新によるDOMとの同期',
      ],
    },
    {
      id: '06-summary-2',
      title: '宣言的UIの利点',
      descriptions: [
        '・コードの可読性と保守性の向上',
        '・状態の一元管理による予測可能性',
        '・テストの容易さ',
        '・宣言的な思考法は他の領域（IaC、AI連携など）にも応用できる',
      ],
    },
    {
      id: '06-summary-3',
      title: '次のステップ',
      descriptions: [
        '・異なるフレームワークを比較してみる',
        '・ReactやVueなどのフレームワークで実際に開発を行う',
        '・状態管理ライブラリ（Redux、Vuex、Recoilなど）について学ぶ',
        '・サーバーコンポーネントなど最新の宣言的UIトレンドを追う',
      ],
      codeExample: {
        language: 'jsx',
        code: `// 宣言的UIの基本形
function App() {
  const [state, setState] = useState(initialState);

  return (
    <UI based on state />
  );
}`,
      },
    },
  ],
};
