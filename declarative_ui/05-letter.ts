import type { SlideSection } from '@/types/slide';

// 宣言的UIのこぼれ話（お便り形式）セクションのスライドデータ
export const letterSection = {
  id: '05-letter',
  title: '宣言的UIのこぼれ話（お便り形式）',
  description: '宣言的UIに関するよくある質問や誤解について解説',
  slides: [
    {
      id: '05-letter-1',
      title: 'お便り1：宣言的UIはパフォーマンスが悪い？',
      descriptions: [
        '質問：「宣言的UIは内部で多くの処理が行われるため、命令的UIより遅いのでは？」',
        '回答：',
        '・初期のフレームワークでは確かにオーバーヘッドがありました',
        '・しかし現代のフレームワークは差分検知アルゴリズムやコンパイラ最適化で高速化されています',
        '・React、Vue、Svelteなどは実行時のパフォーマンスを重視して設計されています',
        '・命令的に最適化された手書きコードより遅い場合もありますが、保守性や開発効率の向上というメリットが上回ることが多いです',
      ],
    },
    {
      id: '05-letter-2',
      title: 'お便り2：宣言的UIは学習コストが高い？',
      descriptions: [
        '質問：「新しい概念や抽象化が多く、習得が難しいのでは？」',
        '回答：',
        '・確かに最初の学習曲線は存在する',
        '・しかし「状態に基づいてUIが決まる」という単純な概念に基づいている',
        '・一度概念を理解すれば、異なるフレームワーク間での知識移行も容易',
        '・命令的UIでは複雑なUIになるほど状態管理が複雑になり、最終的な学習・保守コストは上がる',
      ],
    },
    {
      id: '05-letter-3',
      title: 'お便り3：宣言的UIとReactは同じもの？',
      descriptions: [
        '質問：「宣言的UIといえばReactのことなのか？」',
        '回答：',
        '・Reactは宣言的UIの代表的な実装の一つだが、同じではない',
        '・Vue、Svelte、SwiftUI、Flutter、Compose（Android）なども宣言的UIフレームワーク',
        '・それぞれのフレームワークは独自のアプローチで宣言的UIを実現している',
        '・宣言的UIはアプローチ・思想であり、特定の実装ではない',
      ],
      codeExamples: [{
        language: 'html',
        code: `<!-- Vue.jsの宣言的UI例 -->
<template>
  <div>
    <p>カウント: {{ count }}</p>
    <button @click="increment">増やす</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    }
  }
}
</script>`,
  }],
    },
  ],
};
