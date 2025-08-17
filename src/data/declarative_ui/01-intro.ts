import type { SlideSection } from '@/types/slide';

export const introSection: SlideSection = {
  id: '01-intro',
  title: '宣言的UIとは？',
  description: '宣言的UIの基本概念について解説',
  slides: [
    {
      id: '01-intro-1',
      title: '宣言的UIとは',
      descriptions: [
        '宣言的UIとは「何を」表示するかを記述し、「どのように」表示するかの詳細はフレームワークに任せるアプローチ',
        '状態という入力からUIを出力し、状態変化に応じた更新はフレームワークが自動的に行う',
        'UIの構造や見た目を、どう作るのかの手順を記述する（命令的）のではなく、状態に基づいて定義する（宣言的）スタイル',
      ],
      image: {
        url: '/declarative/宣言的UI.png',
        alt: '「宣言的UI」の概念を示す図（日本語の見出し付き）',
        position: 'bottom',
      },
    },
    {
      id: '01-intro-example',
      title: 'よくある例え（車もってないけど……）',
      descriptions: [
        '命令的：マニュアル車の運転のように、ギアの切り替えやクラッチ操作など、すべての手順を自分で制御する必要がある',
        '宣言的：オートマ車の運転のように、「前に進む」「止まる」といった目的を伝えるだけで、内部の操作は車が自動で行う',
      ],
      image: {
        url: '/declarative/DeclartiveVsImperative.png',
        alt: '宣言的と命令的プログラミングの対比を示す図（車の比喩）',
        position: 'bottom',
      },
    },
    {
      id: '01-intro-code',
      title: 'コード比較：カウンターボタンの実装',
      descriptions: [
        '同じ機能（ボタンクリックでカウントアップ）を命令的UIと宣言的UIで実装した例を比較して、アプローチの違いを明確にしてみる',
      ],
      codeExamples: [
        {
          title: '命令的UI（JavaScript DOM）',
          language: 'javascript',
          descriptions: [
            'DOM要素を直接操作して内容を変更',
            '状態（count変数）の更新とDOMの更新を明示的に記述',
            '「どのように」UIを更新するかの手順に焦点を当てている',
          ],
          code: `// HTML: <button id="counter">0</button>

function setupCounter() {
  const button = document.getElementById('counter');
  let count = 0;

  button.addEventListener('click', () => {
    // 状態の更新
    count++;

    // DOM要素の更新
    button.textContent = count;
  });
}`,
        },
        {
          title: '宣言的UI（React）',
          language: 'jsx',
          descriptions: [
            '状態(count)の変更がUIの更新を自動的にトリガー',
            'setCount関数で状態を更新するだけでボタンの表示も自動的に更新',
            '「何を」表示するかを記述し、DOMの更新処理はReactが担当',
          ],
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
    {
      id: '01-intro-merits',
      title: '両アプローチの選び方',
      descriptions: [
        '「正しい」アプローチはなく、状況によって適切な選択が変わる',
        '現代のフレームワークは宣言的な書き方で、内部では効率的な命令的更新を行っている',
      ],
      list: {
        groups: [
          {
            title: '命令的UIを選ぶとき',
            points: [
              '🎮 精密な制御が必要（複雑なアニメーションなど）',
              '⚡ 極限のパフォーマンス最適化が必要',
              '📚 既存のDOM APIと直接やり取りする必要がある',
              '🔍 特定の要素だけを細かく操作したい',
            ],
          },
          {
            title: '宣言的UIを選ぶとき',
            points: [
              '🧩 複雑なUIをシンプルに管理したい',
              '🔄 頻繁に変わる状態とUIの同期を保ちたい',
              '👥 チーム開発で一貫性を保ちたい',
              '♻️ コンポーネントを再利用したい',
            ],
          },
        ],
      },
    },
  ],
};

export default introSection;
