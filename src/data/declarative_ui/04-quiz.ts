import type { SlideSection } from '@/types/slide';

export const quizSection: SlideSection = {
  id: '04-quiz',
  title: '宣言的クイズ',
  description: '宣言的・命令的の違いをクイズで学ぶ',
  slides: [
    {
      id: '04-quiz-intro',
      title: '宣言的・命令的コードの判断基準を学ぶ',
      descriptions: [
        'これらのクイズでは「宣言的」と「命令的」の違いを理解し、それぞれの特性やトレードオフについて考えよう',
        'UIのほか、状態管理やデータフローの観点からも宣言的アプローチがどう役立つか考える',
      ],
    },
    {
      id: '04-quiz-react',
      title: 'JSXコードクイズ：どちらがより宣言的？',
      descriptions: [
        '問題：以下の同じ機能を持つ2つのReactコンポーネントについて、どちらがより宣言的と言えるか？',
        'カウンターの値が変わるとlocalStorageに保存し、値が閾値に達すると特別なメッセージを表示する',
      ],
      codeExamples: [
        {
          title: 'コードA',
          language: 'jsx',
          code: `function VisitCounterA() {
  const [count, setCount] = useState(() => {
    return parseInt(localStorage.getItem(COUNT_KEY) || '0');
  });
  const [specialMessage, setSpecialMessage] = useState(() => {
    const initialCount = parseInt(localStorage.getItem(COUNT_KEY) || '0');
        return initialCount >= THRESHOLD ? '祝！初回から' + THRESHOLD + '回達成！' : '';
  });
  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount); // 1. 状態を更新
    localStorage.setItem(COUNT_KEY, newCount.toString()); // localStorageに保存
    if (newCount >= THRESHOLD && !specialMessage) {
  setSpecialMessage('(A) 祝！' + THRESHOLD + '回達成！');
    }
  };`,
        },
        {
          title: 'コードB',
          language: 'jsx',
          code: `function VisitCounterB() {
  const [count, setCount] = useState(() => {
    return parseInt(localStorage.getItem(COUNT_KEY) || '0');
  });
  const [specialMessage, setSpecialMessage] = useState('');
  useEffect(() => {
    localStorage.setItem(COUNT_KEY, count.toString());
    if (count >= THRESHOLD) {
      setSpecialMessage('祝！' + THRESHOLD + '回達成！');
    }
  }, [count]);
  const handleIncrement = () => {
    setCount(prevCount => prevCount + 1);
  };`,
        },
      ],
      // テスト用に横並びレイアウトを指定
      codeLayout: 'horizontal',
    },
    {
      id: '04-quiz-react-answer',
      title: '解答例',
      descriptions: [
        'コードBの方がより宣言的',
        'コードBはuseEffectを使って、状態と副作用の関係を宣言的に記述している',
      ],
      list: {
        groups: [
          {
            title: 'コードA(命令的)の特徴',
            points: [
              'handleIncrementでカウント更新と副作用を順に実行',
              '「これらのステップを順番に実行せよ」と命令',
              '状態更新と副作用が密接に結合',
            ],
          },
          {
            title: 'コードB(宣言的)のメリット',
            points: [
              'handleIncrementは状態更新の意図のみを記述',
              'useEffectで「countが変化したら副作用を実行せよ」と宣言',
              '関心の分離：状態更新のトリガーと副作用の内容が分離',
            ],
          },
        ],
      },
    },
    {
      id: '04-quiz-yaml',
      title: 'クイズ1：JSONとYAML、どちらがより宣言的？',
      descriptions: ['問題：以下の2つのコード例のうち、どちらがより宣言的なアプローチと言えるか？'],
      codeExamples: [
        {
          title: 'コードA：JSONを使用',
          language: 'json',
          code: `{
  "name": "declarative-ui-example",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "next": "^13.4.3"
  }
}`,
        },
        {
          title: 'コードB：YAMLを使用',
          language: 'yaml',
          code: `name: declarative-ui-example
version: 1.0.0
dependencies:
  react: ^18.2.0
  react-dom: ^18.2.0
  next: ^13.4.3`,
        },
      ],
    },
    {
      id: '04-quiz-yaml-answer',
      title: 'クイズ1の解答例',
      descriptions: [
        'どちらも宣言的だが、YAMLの方がより人間に読みやすく、宣言性が体感しやすい場合がある',
      ],
      list: {
        groups: [
          {
            title: 'JSONのメリット',
            points: ['広範な言語・ツールでサポート', 'パース処理が高速で効率的'],
          },
          {
            title: 'YAMLのメリット',
            points: ['人間が読み書きしやすい構文', 'コメントやマルチラインの扱いが豊富'],
          },
        ],
      },
    },
    {
      id: '04-quiz-summary',
      title: 'クイズのまとめ',
      descriptions: [
        '実践的なコンポーネント開発では、状態ロジックをどのように整理するかが可読性とメンテナンス性に大きく影響する',
        'useEffectパターンは状態と副作用の関係を宣言的に定義するための強力なツールである',
      ],
    },
  ],
};

export default quizSection;
