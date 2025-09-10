import type { SlideSection } from '@/types/slide';

export const historySection: SlideSection = {
  id: '03-history',
  title: '宣言的・命令的UIの歴史：コードの革命物語',
  description: '「どうやって」から「何を」へ — 宣言的プログラミングが世界を変えた物語',
  slides: [
    {
      id: '03-history-start',
      title: '黎明期：計算機に「考えさせる」という革命的アイデア',
      descriptions: [
        '「機械に命令するのではなく、問題を教えて解かせる」という壮大な挑戦の始まり',
        'ラムダ計算（1930年代）：「計算とは関数である」という革命的発想で、プログラミングの哲学的基礎を築く',
        '命令型 vs 関数型の議論（効率 vs 抽象化）',
      ],
      /* backgroundAnimation intentionally omitted */
    },
    {
      id: '03-history-1970s',
      title: '1970年代：Prolog 等の論理型言語が注目される',
      descriptions: [
        'Prolog（1972年）: 「事実」と「ルール」を教えれば推論する魔法',
        '制約プログラミング：条件を満たす解を見つけるだけで複雑な問題を解決',
        'TeX（1978年）：フォーマットの手続きから解放し、意味を宣言する言語として注目',
      ],
    },
    {
      id: '03-history-1980s',
      title: '1980年代：SQL が「何を欲しいか」を示す宣言に成功',
      descriptions: [
        'SQL：SELECT * FROM users WHERE age > 20 のように、「何が欲しいか」だけを伝えるアプローチ',
        '命令型だと同じ処理を何行も書くのに対して、宣言的は短く強力',
      ],
    },
    {
      id: '03-history-1990s',
      title: '1990年代：HTML/CSS が一般公開され、宣言的表現が爆発的普及',
      descriptions: [
        'HTML：表示を宣言することで、あらゆる環境で同じ見た目を実現',
        'CSS：見た目の宣言言語としてデザインを表現',
      ],
    },
    {
      id: '03-history-2000s',
      title: '2000年代：宣言的アプローチが実務の主流に',
      descriptions: [
        'Scala, F#, Clojure などが実務で活躍し始める',
        'Infrastructure as Code（Terraform 等）：サーバー構成を宣言することで自動的に再現',
      ],
    },
    {
      id: '03-history-2010s',
      title: '2010年代：React の衝撃 — UI はただの関数',
      descriptions: [
        'React（2013年）: UIはただの関数 f(state) = view という発想が普及',
        'Virtual DOM による効率的な差分更新で宣言的UIが一般化',
      ],
    },
    {
      id: '03-history-now',
      title: '現代：宣言的アプローチが自己修復する世界へ',
      descriptions: [
        'AI 時代の宣言的プログラミング：要求を伝えればAIが最適な実装を提案',
        'Kubernetes の Desired State や GitOps のように、宣言的に望む状態を定義する運用が普及',
      ],
    },
    {
      id: '03-history-summary',
      title: '宣言的プログラミングの旅：過去から未来へ',
      descriptions: [
        '「何を」だけを伝えれば機械が最適な手続きを実行してくれる、という単純な発想が世界を変えた',
        'UIからインフラまで、宣言的アプローチは幅広い分野で価値を発揮している',
      ],
      image: {
        url: '/declarative/PXL_20250430_135602763.PORTRAIT.ORIGINAL.jpg',
        alt: '縦向きの写真（歴史スライドの挿絵）',
      },
    },
  ],
};

export default historySection;
