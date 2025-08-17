export const quizSection = {
  id: '04-quiz',
  title: '宣言的クイズ',
  description: '宣言的・命令的の違いをクイズで学ぶ',
  slides: [
    {
      id: '04-quiz-intro',
      title: '宣言的・命令的コードの判断基準を学ぶ',
      descriptions: [
        'これらのクイズでは「宣言的」と「命令的」の違いを理解し、それぞれの特性やトレードオフについて考えよう',
        'UIのほか、状態管理やデータフローの観点からも、宣言的なアプローチがどのように役立つだろうか？',
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
    // 初期メッセージもlocalStorageの初期値に基づいて設定
    const initialCount = parseInt(localStorage.getItem(COUNT_KEY) || '0');
    return initialCount >= THRESHOLD ? \`祝！初回から\${THRESHOLD}回達成！\` : '';
  });
  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount); // 1. 状態を更新
    localStorage.setItem(COUNT_KEY, newCount.toString()); // localStorageに保存
    // 条件に応じて別の状態を更新
    if (newCount >= THRESHOLD && !specialMessage) {
      setSpecialMessage(\`(A) 祝！\${THRESHOLD}回訪問達成！\`);
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
  // \`count\` の状態が変更されたら、副作用を実行
  useEffect(() => {
    // localStorageに保存
    localStorage.setItem(COUNT_KEY, count.toString());
    // 条件に応じて別の状態を更新
    if (count >= THRESHOLD) {
      setSpecialMessage(\`祝！\${THRESHOLD}回訪問達成！\`);
    }
  }, [count]); // \`count\` が変更された時のみこの副作用を実行
  const handleIncrement = () => {
    setCount(prevCount => prevCount + 1); // 状態更新の意図を記述
  };`,
        },
      ],
    },
    {
      id: '04-quiz-react-answer',
      title: '解答例',
      descriptions: [
        'コードBの方がより宣言的',
        'コードBはuseEffectを使って、状態と副作用の関係を明確に宣言',
      ],
      list: {
        groups: [
          {
            title: 'コードA（命令的）の特徴',
            points: [
              'handleIncrementでカウント更新と副作用を順に実行',
              '「これらのステップを順番に実行せよ」と命令',
              '状態更新と副作用が密結合',
              '初期表示時のロジックが別々に記述',
            ],
          },
          {
            title: 'コードB（宣言的）のメリット',
            points: [
              'handleIncrementは状態更新の意図のみを記述',
              'useEffectで「countが変更されたら副作用を実行せよ」と宣言',
              '関心の分離：状態更新のトリガーと副作用の内容が分離',
              '一貫性：countがどのように変更されても同じ副作用が実行',
              '保守性：新しい更新パターンを追加するときも副作用コードの重複がない',
            ],
          },
        ],
      },
    },
    {
      id: '04-quiz-yaml',
      title: 'クイズ1：JSONとYAML、どちらがより宣言的？',
      descriptions: [
        '問題：以下の2つのコード例のうち、どちらがより宣言的なアプローチと言えるか？',
        'また、実務ではどのような観点から、どちらを選択するべきか考えよう',
      ],
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
  },
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "devDependencies": {
    "typescript": "^5.0.4",
    "eslint": "^8.41.0",
    "eslint-config-next": "^13.4.3"
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
  next: ^13.4.3
scripts:
  dev: next dev
  build: next build
  start: next start
  lint: next lint
devDependencies:
  typescript: ^5.0.4
  eslint: ^8.41.0
  eslint-config-next: ^13.4.3`,
        },
      ],
    },
    {
      id: '04-quiz-yaml-answer',
      title: 'クイズ1の解答例',
      descriptions: [
        'どちらも宣言的なアプローチだが、YAMLの方がより宣言的と言える',
        `YAMLはJSONと比較して構文がシンプルで、インデントによる階層表現、
        コメントの追加が可能など、「何を」定義するかに集中できる形式`,
        `JSONはYAMLと比べると中括弧やカンマなどの構文要素が多く、
        「どのように」記述するかという側面にも注意を払う必要がある`,
        'つまり宣言的かどうかは、構文のシンプルさや人間の可読性に依存するとも言える',
      ],
      list: {
        groups: [
          {
            title: 'JSON（コードA）のメリット',
            points: [
              '広範な言語・ツールでのサポート、エコシステムが充実',
              'パース処理が高速で、効率的なデータ交換に適する',
              '厳格な構文規則により、エラーの検出が容易',
            ],
          },
          {
            title: 'YAML（コードB）のメリット',
            points: [
              '人間が読み書きしやすく、より直感的な構文',
              'コメントやマルチラインテキストなど、豊富な機能をサポート',
              '設定ファイルやドキュメント志向の用途に適する',
            ],
          },
        ],
      },
    },
    {
      id: '04-quiz-summary',
      title: 'クイズのまとめ',
      descriptions: [
        '実践的なコンポーネント開発では、状態ロジックをどのように整理するかが可読性とメンテナンス性に大きく影響',
        'useEffectパターンは状態と副作用の関係を宣言的に定義するための強力なツール',
        '状態の変更がUIの更新を自動的にトリガーすることで、コードの意図が明確になる',
        '「何を、なぜ」更新するのかを明確に表現するコードを書くことで、コンポーネントの意図が明確に',
        '宣言的UIのアプローチは、複雑な状態遷移を伴うアプリケーションの開発において特に価値を発揮',
        'このアプローチを活用することで、より効率的で保守性の高いコードを書くことが可能になる',
      ],
    },
  ],
};
