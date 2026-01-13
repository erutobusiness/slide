# スライドシステム設計方針メモ

本ファイルは、本プロジェクトとは別に新規プロジェクトを立ち上げる際のスライドシステム設計方針をまとめたものです。
以下の内容は、スライドシステムの基本方針、使用技術、構造、アニメーション要件、テクニックなどを含みます。

## 1. 決定事項

### 1.1. 基本方針

- 表現力のあるスライドシステムを構築する
- スライド発表する際の利便性を重視する

### 1.2. 使用技術

- **フレームワーク**: Next.js (App Router)
- **言語**: TypeScript, React
- **フォーマッター/リンター**: Biome
- **他ライブラリ**: framer-motion, react-zoom-pan-pinch, @heroicons/react, react-syntax-highlighter

### 1.3. 各種構造

- **URL構造**: `src/app/[presentationId]/[sectionId]`
  - `[presentationId]`: プレゼンテーション全体のまとまり (例: `declarativeUI`)
  - `[sectionId]`: 個別のスライド番号や章 (例: `01_intro`)
- **画面構造**:
  - プレゼンテーション一覧: `src/app/page.tsx`
    - プレゼンテーション詳細: `src/app/[presentationId]/page.tsx`
      - プレゼンテーション: `src/app/[presentationId]/[sectionId]/page.tsx`
        - スライド: `src/components/SlideComponent.tsx`
          - スライドコンテンツ: ヘッダーテキスト `src/components/contents/TextHeader.tsx` など
          - アニメーション: 波打ち背景アニメーション `src/components/animations/WaveAnimation.tsx` など
- **データ構造**:
  - プレゼンテーションデータ: `src/data/{presentationId}/index.ts`
    - 各セクション・各スライドの情報を取得する
  - スライドデータ: `src/data/{presentationId}/{sectionId}/{slideId}.ts`
    - スライドの内容（テキスト、画像パス等）を、スライドごとにファイルを分けて定義する
  - 原稿データ: `erutobusiness/docs` (GitHub)
    - 原稿の執筆・校正は外部リポジトリで行い、本アプリでは成果物（TypeScriptデータ）のみを取り扱う
    - 必要に応じて GitHub MCP 経由で参照する

### 1.4. コンポーネント設計

- **データとビューの分離**: スライドの内容（テキスト、画像パス等）は `src/data/{presentationId}/{sectionId}/{slideId}.ts` のようなファイルで一元管理する
- **レイアウトコンポーネント**: 共通レイアウト（タイトル、2カラム等）は `src/components/layouts/` に作成し、再利用する
- **カスタムスライド**: 特定のスライド用にユニークなコンポーネントを作成・動的読み込みする仕組みも用意し、表現の自由度を担保する

### 1.5. スタイル管理

- **グローバルスタイル**: `src/app/globals.css` に、全体共通のCSS変数や基本スタイルを定義する
- **プレゼンテーションスタイル**: `src/styles/themes/{presentationId}.css` でプレゼンテーション別テーマを管理し、局所化する
- **コンポーネントスタイル**: 通常のCSS中心、アニメーション部分ではライブラリ（Framer Motion等）を使用

---

## 2. アニメーション要件

- **背景アニメーション**
  - **要件**: スライドをめくった際の背景アニメーションを、スライドごとに指定できるようにする
  - **実装案**:
    - スライドデータオブジェクトに `backgroundAnimation: 'wave' | 'heart' | 'boom'` のようなプロパティを持たせる
    - スライドコンポーネントが、そのプロパティに応じたCSSクラスを適用する

- **スライドめくりアニメーション**
  - **要件**: スライドをめくる際のスライドアニメーションを、スライドごとに指定できるようにする
  - **実装案**:
    - スライドデータオブジェクトに `slideTransition: 'slide' | 'fade' | 'zoom'` のようなプロパティを持たせる
    - スライドコンポーネントが、そのプロパティに応じたCSSクラスを適用する

- **コンテンツアニメーション**
  - **要件**: スライド内の各コンテンツ（テキスト、画像など）の表示・非表示アニメーションを、コンテンツ単位で制御できるようにする
  - **実装案**:
    - アニメーションを適用するための専用コンポーネント（例: `<AppearAnimation type="fade-in-up" delay={100}>...<AppearAnimation/>`）を作成する
    - アニメーションの種類（フェードイン、スライドイン等）やタイミング（遅延）をpropsで指定できるようにする
    - アニメーション用のCSSは、コンポーネントファイル内で定義する

---

## 3. テクニック

参考プロジェクトから、以下のテクニックを学び、今後の開発に活用する。

### 関数中心の責務分離カスタムフック設計

- **改善点**: 単一責任原則に基づく関数型パターンで、テスタブルな階層構造を実現
- **活用案**: 関数の合成でロジックを組み立て、依存性はパラメータとして注入し、副作用を最小限に抑えたクリーンなアーキテクチャを構築する
- **設計パターン**:

  ```typescript
  // 純粋関数でビジネスロジック
  const calculateNextSlide = (current: number, total: number) =>
    Math.min(current + 1, total - 1);

  // 基本フック - 状態管理のみ
  function useSlideState(initialIndex = 0) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    return { currentIndex, setCurrentIndex };
  }

  // 拡張フック - キーボード操作
  function useKeyboardNav(onNext: () => void, onPrev: () => void) {
    useEffect(() => {
      const handleKey = (e: KeyboardEvent) => {
        if (e.key === 'ArrowRight') onNext();
        if (e.key === 'ArrowLeft') onPrev();
      };
      window.addEventListener('keydown', handleKey);
      return () => window.removeEventListener('keydown', handleKey);
    }, [onNext, onPrev]);
  }

  // 合成フック
  export function useSlidePresentation(slides: Slide[]) {
    const { currentIndex, setCurrentIndex } = useSlideState();
    const goNext = () => setCurrentIndex(calculateNextSlide(currentIndex, slides.length));
    const goPrev = () => setCurrentIndex(Math.max(currentIndex - 1, 0));

    useKeyboardNav(goNext, goPrev);

    return { currentIndex, currentSlide: slides[currentIndex], goNext, goPrev };
  }
  ```

### 関数型レンダリング戦略によるコンポーネント自動生成

- **改善点**: 関数型パターンとMapベースの戦略選択で条件分岐を排除し、拡張性を向上
- **活用案**: 型定義ベースの構造定義で、新しいレイアウトタイプの追加時にコード変更を最小化する。関数の合成でレンダリング戦略を組み立てる
- **設計パターン**:

  ```typescript
  // データ駆動型コンポーネント定義
  interface SlideData {
    layout: 'hero' | 'two-column' | 'image-focus';
    components: ComponentData[];
  }

  // レンダラーレジストリ
  function createComponentRegistry() {
    const renderers = new Map<string, (data: any) => React.ReactElement>();

    return {
      register: (type: string, renderer: (data: any) => React.ReactElement) =>
        renderers.set(type, renderer),
      render: (data: ComponentData) =>
        renderers.get(data.type)?.(data) || <div>Unknown: {data.type}</div>
    };
  }

  // 汎用レンダラー
  export function SlideRenderer({ slideData }: { slideData: SlideData }) {
    const registry = useComponentRegistry();
    const Layout = getLayoutComponent(slideData.layout);

    return (
      <Layout>
        {slideData.components.map((component, index) =>
          registry.render(component)
        )}
      </Layout>
    );
  }

  // レイアウト選択
  function getLayoutComponent(layout: string) {
    const layouts = {
      'hero': ({ children }) => <div className="hero">{children}</div>,
      'two-column': ({ children }) => <div className="two-col">{children}</div>,
    };
    return layouts[layout] || layouts.hero;
  }
  ```

### CSS Custom Properties + data属性による軽量テーマシステム

- **改善点**: CSS Custom PropertiesとHTML data属性のみを使ったシンプルなテーマ管理
- **活用案**: プレゼンテーション別にテーマファイルを分離し、data-theme属性でテーマを切り替える
- **設計パターン**:

  ```typescript
  // シンプルなテーマローダーコンポーネント
  export function SlideThemeLoader({ slideType }: { slideType: string }) {
    useEffect(() => {
      document.body.setAttribute('data-theme', slideType);
      return () => document.body.removeAttribute('data-theme');
    }, [slideType]);

    return null;
  }

  /* CSS例 - プレゼンテーション別テーマ */
  [data-theme="declarative"] {
    --declarative-background: theme("colors.gray.950");
    --declarative-foreground: theme("colors.amber.200");
    --declarative-primary: theme("colors.amber.400");
    --slide-gradient-from: var(--declarative-gradient-primary-from);
    --slide-gradient-to: var(--declarative-gradient-primary-to);
  }

  [data-theme="theArtOfLoving"] {
    --theArtOfLoving-background: theme("colors.rose.50");
    --theArtOfLoving-primary: theme("colors.red.500");
    --slide-gradient-from: var(--theArtOfLoving-gradient-primary-from);
    --slide-gradient-to: var(--theArtOfLoving-gradient-primary-to);
  }
  ```

### react-zoom-pan-pinch + useState による軽量ズーム・パンシステム

- **改善点**: react-zoom-pan-pinchライブラリとReact標準機能のみを使ったクリック中心ズーム機能
- **活用案**: 軽量なライブラリと独自ロジックの組み合わせで、マウス・タッチ対応の直感的なズーム操作を実現する
- **設計パターン**:

  ```typescript
  // react-zoom-pan-pinch統合のズーム・パン
  function useZoom() {
    const [zoomFactor, setZoomFactor] = useState(1.0);
    const [isZoomEnabled, setIsZoomEnabled] = useState(false);
    const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });

    const zoomAtPosition = useCallback((e: React.MouseEvent | React.TouchEvent) => {
      if (!isZoomEnabled) return;

      // ボタン要素上でのクリックは無視
      if (e.target instanceof Element) {
        const targetElement = e.target as Element;
        if (
          targetElement.tagName === 'BUTTON' ||
          targetElement.closest('button') ||
          targetElement.closest('.icon-button')
        ) {
          return;
        }
      }

      // 右クリックでリセット
      if ('button' in e && e.button === 2) {
        resetZoom();
        return;
      }

      // クリック位置を取得
      let clientX = 0, clientY = 0;
      if ('touches' in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      // ウィンドウサイズに対する割合を計算
      const percentX = (clientX / window.innerWidth) * 100;
      const percentY = (clientY / window.innerHeight) * 100;

      setZoomOrigin({ x: percentX, y: percentY });
      setZoomFactor(prevZoom => Math.min(prevZoom + 0.25, 3.0));
    }, [isZoomEnabled]);

    const resetZoom = useCallback(() => {
      setZoomFactor(1.0);
      setZoomOrigin({ x: 50, y: 50 });
    }, []);

    const toggleZoom = useCallback(() => {
      setIsZoomEnabled(prev => {
        if (prev) resetZoom();
        return !prev;
      });
    }, [resetZoom]);

    return {
      zoomFactor,
      isZoomEnabled,
      zoomOrigin,
      zoomAtPosition,
      resetZoom,
      toggleZoom,
      handleRightClick: useCallback((e: React.MouseEvent) => {
        if (isZoomEnabled && zoomFactor > 1.0) {
          e.preventDefault();
          resetZoom();
        }
      }, [isZoomEnabled, zoomFactor, resetZoom])
    };
  }

  // react-zoom-pan-pinchとの統合例
  import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

  export function ZoomableSlide({ children }: { children: React.ReactNode }) {
    const { zoomFactor, isZoomEnabled, zoomOrigin, zoomAtPosition, handleRightClick } = useZoom();

    return (
      <TransformWrapper
        initialScale={zoomFactor}
        disabled={!isZoomEnabled}
        centerOnInit={false}
        limitToBounds={false}
        maxScale={3}
        minScale={1}
      >
        <TransformComponent>
          <div
            onClick={zoomAtPosition}
            onContextMenu={handleRightClick}
            style={{
              transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`,
              transform: isZoomEnabled ? `scale(${zoomFactor})` : undefined
            }}
          >
            {children}
          </div>
        </TransformComponent>
      </TransformWrapper>
    );
  }
  ```

### Framer Motion + CSS による表現力豊かなアニメーションシステム

- **改善点**: Framer MotionとCSSを組み合わせた宣言的アニメーション管理
- **活用案**: AnimatePresenceでマウント/アンマウント時のアニメーション、CSS keyframesで細かい演出を分離管理
- **設計方針**:
  - CSS keyframesで基本アニメーション（wave、pulse、shake等）を定義
  - Framer Motionでコンポーネントのマウント/アンマウント管理
  - アニメーション完了はsetTimeoutで管理（CSS animation時間と同期）

  ```typescript
  // シンプルなアニメーションコンポーネント
  export function WaveAnimation({ animationId, direction = 'right', onComplete }) {
    if (animationId === null) return null;

    return (
      <AnimatePresence>
        <motion.div
          key={`wave-${animationId}`}
          className={`wave-container ${direction}`}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onAnimationComplete={() => setTimeout(() => onComplete?.(animationId), 900)}
        >
          <div className="liquid">
            <div className="wave" />
            <div className="wave2" />
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // CSS: keyframesでアニメーション定義
  .wave {
    animation: waveAppear 0.9s ease-out forwards, rotate 8s linear infinite;
  }

  @keyframes waveAppear {
    0% { opacity: 0; }
    40% { opacity: 0.9; }
    100% { opacity: 0; }
  }

  @keyframes pulse {
    0%, 100% { opacity: 0.7; }
    50% { opacity: 1; }
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
  }
  ```

### TypeScript型システムによる軽量コンテンツ管理

- **改善点**: TypeScriptの型システムとNode.js標準機能のみを使った軽量コンテンツ管理システム
- **活用案**: 外部バリデーション不要で型安全性を保ち、開発体験とパフォーマンスを両立するシンプルなスライド管理
- **設計パターン**:

  ```typescript
  // TypeScript 型定義ベースのコンテンツ管理
  interface SlideImage {
    url: string;
    alt: string;
    position: 'top' | 'bottom' | 'left' | 'right' | 'background';
    lazy?: boolean;
  }

  interface SlideCode {
    title: string;
    filename?: string;
    language: 'typescript' | 'javascript' | 'css' | 'html' | 'json';
    code: string;
  }

  interface SlideAnimations {
    in?: {
      type: 'fade' | 'slide' | 'zoom';
      duration: number;
    };
    out?: {
      type: 'fade' | 'slide' | 'zoom';
      duration: number;
    };
  }

  interface BackgroundAnimation {
    type: 'wave' | 'heart' | 'boom';
  }

  interface Slide {
    id: string;
    title: string;
    descriptions?: string[];
    image?: SlideImage;
    codeExamples?: SlideCode[];
    slideAnimations?: SlideAnimations;
    backgroundAnimation?: BackgroundAnimation;
  }

  interface SlideSection {
    id: string;
    title: string;
    description: string;
    slides: Slide[];
  }

  // 動的インポートでスライドデータ読み込み
  export async function generateStaticParams() {
    return [
      { slideName: 'declarative' },
      { slideName: 'theArtOfLoving' }
    ];
  }

  export default async function SlidePage({ params }) {
    const { slideName } = await params;

    // 条件分岐で動的インポート
    const slideDataModule = slideName === 'theArtOfLoving'
      ? import('@theArtOfLoving/data/slideData')
      : import('@declarative/data/slideData');

    const slideSections = (await slideDataModule).getAllSlideSections();
    const pageData = (await slideDataModule).getSlidesPageData();

    return <SlideShow slideSection={slideSections} />;
  }
  ```

---

## 4. 運用設定

### 4.1. プロジェクト設定ファイル

#### package.json

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "format": "biome format --write .",
    "lint": "biome check .",
    "lint:fix": "biome check --apply ."
  },
  "dependencies": {
    "@heroicons/react": "^2.2.0",
    "framer-motion": "^12.9.4",
    "next": "15.3.2",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-syntax-highlighter": "^15.6.1",
    "react-zoom-pan-pinch": "^3.7.0"
  },
  "devDependencies": {
    "@biomejs/biome": "^1.9.4",
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@types/react-syntax-highlighter": "^15.5.13",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

#### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "strict": true,
    "jsx": "preserve",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

#### biome.json

```json
{
  "formatter": {
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 100
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single",
      "semicolons": "always"
    }
  },
  "linter": {
    "rules": {
      "correctness": { "noUnusedVariables": "error" },
      "style": { "useConst": "error" }
    }
  }
}
```
