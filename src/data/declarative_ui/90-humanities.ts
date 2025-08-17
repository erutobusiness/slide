import type { SlideSection } from '@/types/slide';

export const humanitiesSection: SlideSection = {
  id: '90-humanities',
  title: '人文学の視点から見る宣言的プログラミング',
  description: '宣言的プログラミングと人間の認知、言語、文化の関連性を探る',
  slides: [
    {
      id: 'humanities-start',
      title: '番外編：人文学の視点から見る宣言的プログラミング',
      descriptions: [
        '宣言的プログラミングは単なる技術的手法ではなく、人間の認知、言語、文化と深く関わる概念である',
        '本章では言語学と人類学の観点から、宣言的表現の構造的特徴と人間の思考様式との関係を探求する',
      ],
    },
    {
      id: 'humanities-language-relativity',
      title: '言語相対性仮説と宣言的表現',
      descriptions: [
        '言語が思考に影響を与えるとの仮説は、宣言的プログラミング言語の設計にも示唆を与える',
        '宣言的言語は「何を」に集中し、命令的言語は「どのように」に焦点を当てる',
      ],
      codeExamples: [
        {
          title: 'SQL: 宣言的 - 「何が欲しいか」を明示',
          language: 'sql',
          code: 'SELECT name FROM users WHERE age > 18;',
        },
        {
          title: 'JavaScript: 命令的 - 「どう取得するか」を指定',
          language: 'javascript',
          code: 'const adults = [];\nfor (const user of users) {\n  if (user.age > 18) {\n    adults.push(user.name);\n  }\n}',
        },
      ],
    },
    {
      id: 'humanities-cognitive-load',
      title: '宣言的言語と人間の認知負荷',
      descriptions: [
        '宣言的言語は高レベルの抽象化を提供し、認知的な負荷を軽減することで問題領域の概念的理解を促進する',
      ],
    },
    {
      id: 'humanities-summary',
      title: '総括：学際的アプローチの価値',
      descriptions: [
        '宣言的プログラミングを人文学の視点から分析することで、技術と文化の接点が見えてくる',
      ],
    },
  ],
};

export default humanitiesSection;
