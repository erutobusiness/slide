import type { SlideSection } from '@/types/slides';

export const whyNowSection: SlideSection = {
  id: '02-why_now',
  title: 'なぜいま「宣言的」の話をするのか',
  description: '宣言的アプローチがなぜ現代の開発に適しているのかを解説',
  slides: [
    {
      id: '02-why-0',
      title: '生成AIを使いこなすには審美眼が重要だから',
      descriptions: [
        'AIが生成するコードは、我々開発者が見定める必要がある',
        'AI時代において、エンジニアはコードの品質や意図を理解し、適切に評価する能力が求められる',
        '宣言的なコードは、意図や目的が明確であるため、AIの生成物を評価しやすい',
      ],
    },
    {
      id: '02-why-1',
      title: 'チーム開発での共通言語になるから',
      descriptions: [
        '宣言的な考え方を理解していないと意図せずチームに負担をかけてしまう可能性がある',
        'UI開発以外にも、IaC やデータクエリなど多様な分野で使われている宣言的な考え方は、\nシステム開発に関わるすべてのエンジニアが知っておくべき共通言語となりつつある',
      ],
    },
    {
      id: '02-why-1-1',
      title: 'チーム開発での共通言語になるから: 知らないと……',
      descriptions: ['アンチパターンを産みやすい'],
      codeExample: {
        language: 'jsx',
        code: `function ToggleButton() {
  const handleClick = () => {
    // グローバルな DOM クエリで要素を検索
    const targetElement = document.querySelector("#target");
    if (!targetElement) return;
    // DOM要素の現在のクラスリストを直接確認して状態を判断
    const isActive = targetElement.classList.contains("active");
    // classList を直接操作してクラスを付け外し
    targetElement.classList.toggle("active", !isActive);
  };

  return (
    <>
      <button id="target" onClick={handleClick}>Toggle Button</button>
    </>
  );
}`,
      },
    },
    {
      id: '02-why-1-2',
      title: 'チーム開発での共通言語になるから: 問題点',
      descriptions: ['Reactを使っているのに、命令的なコードになっている'],
      codeExample: {
        language: 'jsx',
        code: `function ToggleButton() {
  const handleClick = () => {
    // グローバルな DOM クエリで要素を検索
    const targetElement = document.querySelector("#target");      // IDの衝突などで意図しない要素を操作する可能性がある
    if (!targetElement) return;
    // DOM要素の現在のクラスリストを直接確認して状態を判断
    const isActive = targetElement.classList.contains("active");  // Reactの状態（useStateなど）を使わずにUIの状態を直接確認しているため、
                                                                  // Reactが管理するUIと状態の同期がズレてしまう可能性がある
    // classList を直接操作してクラスを付け外し
    targetElement.classList.toggle("active", !isActive);          // Reactの描画や状態更新の仕組みを無視してUIを直接操作すると、
                                                                  // Reactが管理するUIと状態の同期がズレてしまう可能性がある
  };

  return (
        ...
  );
}`,
      },
    },
    {
      id: '02-why-1-3',
      title: 'チーム開発での共通言語になるから: 解決策',
      descriptions: ['ベストプラクティスに従い、宣言的にする'],
      codeExample: {
        language: 'jsx',
        code: `import { useState } from "react";

function ToggleComponent() {
  // 状態を定義
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <button
        // 状態に基づいて className を宣言的に決定
        className={isActive ? "active" : ""}
        // 状態を更新
        onClick={() => setIsActive(!isActive)}
      >
        Toggle Button
      </button>
    </>
  );
}`,
      },
    },
    {
      id: '02-why-2',
      title: '今のGUI技術の主要パラダイムだから',
      descriptions: [
        'React, Vue, Flutter, SwiftUI など\n現代の主要なGUIフレームワークやライブラリは、\n宣言的UIをその核となる思想として採用している',
        'UIが宣言的なアプローチで構造化されることで、\n状態と表示の対応関係が明確になりコードの見通しが良くなる',
        '実装の詳細を抽象化することで、\nより少ないコードでアプリを構築でき、生産性が向上する',
      ],
    },
    {
      id: '02-why-3',
      title: '様々なパラダイムや技術との相性がいいから',
      descriptions: [
        '宣言的アプローチは構造の明確化・可読性・再利用性を高めるため、\nあらゆる技術スタックや開発手法と親和性が高い',
        'そのため、関数型プログラミングやデータ駆動との親和性が高く、モデル化しやすい',
        'クエリ言語（SQL, GraphQL）やインフラ自動化（Terraform, Kubernetes）など\n多様な分野で活用されている',
      ],
      codeExamples: [
        {
          language: 'cobol',
          title: 'COBOL: 命令的',
          code: `PERFORM VARYING I FROM 1 BY 1 UNTIL I > RECORD-COUNT
  IF CUSTOMER-NAME(I)(1:1) = "A"
    ADD 1 TO RESULT-INDEX
    MOVE CUSTOMER-RECORD(I) TO RESULT-RECORD(RESULT-INDEX)
  END-IF
END-PERFORM.`,
        },
        {
          language: 'sql',
          title: 'SQL: 宣言的',
          code: "SELECT * FROM customers WHERE name LIKE 'A%';",
        },
      ],
    },
    {
      id: '02-why-4',
      title: 'なぜUIから始めたのか',
      descriptions: [
        '（もちろん私がフロントエンドエンジニアだからなのもあるけど……）',
        'UIは宣言的 vs 命令的の対比が視覚的に説明しやすく、特に分かりやすい',
        'ReactやVueなどの登場によるUI開発の急速な進化が、宣言的アプローチの重要性を際立たせている',
        '=> UIを入口に、宣言的アプローチ全体の歴史を振り返ることで、より深い理解を目指す',
      ],
      image: {
        url: '/declarative/PXL_20250426_075656039.PORTRAIT.ORIGINAL.jpg',
        position: 'bottom',
      },
    },
  ],
};
