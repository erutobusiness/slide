## まずは React で。宣言的？命令的？コードリーディング・クイズ！

**はじめに:** このクイズは、React における「宣言的」と「命令的」なコードの違いを理解し、それぞれの特性やトレードオフについて考えることを目的とする。多くの場合、どちらか一方が絶対的に正しいということはなく、状況に応じた適切な判断が求められる。「宣言的」は React のコアコンセプトだが、それが常にベストプラクティスとは限らない。各問題を通じて、コードの意図、保守性、パフォーマンス、そして文脈に応じた設計の重要性について考察する。

**採点について:** ここでの解答は一例。「どちらがより宣言的か」という問いに対する明確な答えがある場合もあるが、多くは程度の問題であり、異なる視点からの妥当な主張も存在し得る。重要なのは、なぜそう考えたのか、その根拠を明確に説明できることである。

---

### 問題 1: 宣言性の比較（外部ライブラリ連携）

以下の 2 つの React コンポーネント（利用例を含む）を比較する。

**コード例 A (SVG Bar Chart):**

- **概要:** React の JSX と SVG 要素のみを使用し、与えられたデータに基づいてバーチャートを直接描画。データの変更に応じて SVG 要素が再レンダリングされる

```jsx
import React, { useState } from "react";

// データに基づいてSVGバーチャートを描画するコンポーネント
function SvgBarChart({ data, width = 300, height = 150, barColor = "teal" }) {
  const validData = data.filter((d) => typeof d === "number" && !isNaN(d));
  const maxValue = Math.max(0, ...validData);
  const barWidth = validData.length > 0 ? width / validData.length : 0;

  return (
    <svg width={width} height={height} style={{ border: "1px solid #ccc" }}>
      {validData.map((value, index) => {
        const barHeight =
          maxValue === 0 ? 0 : Math.max(0, (value / maxValue) * height);
        const x = index * barWidth;
        const y = height - barHeight;
        return (
          <rect
            key={index}
            x={x}
            y={y}
            width={Math.max(0, barWidth - 2)}
            height={barHeight}
            fill={barColor}
          />
        );
      })}
    </svg>
  );
}

// SvgBarChart を利用する親コンポーネント
function AppA() {
  const [chartData, setChartData] = useState([10, 20, 30, 15]);

  const addData = () => {
    setChartData((prevData) => [...prevData, Math.floor(Math.random() * 50)]);
  };

  return (
    <div>
      <SvgBarChart data={chartData} />
      <button onClick={addData}>Add Data</button>
    </div>
  );
}
```

**コード例 B (Chart.js Wrapper - 実在ライブラリ例):**

- **概要:** 実在する命令的なチャートライブラリ（例: Chart.js）を React コンポーネント内でラップ。`useEffect` を使用してライブラリのインスタンスを生成・更新・破棄し、実際の描画はライブラリに委ねる

```jsx
import React, { useRef, useEffect, useState } from "react";
import Chart from "chart.js/auto";

function ChartjsComponent({ data, labels }) {
  const canvasRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    if (!chartInstanceRef.current) {
      chartInstanceRef.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Dataset",
              data: data,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
          ],
        },
        options: {
          scales: { y: { beginAtZero: true } },
        },
      });
    } else {
      chartInstanceRef.current.data.labels = labels;
      chartInstanceRef.current.data.datasets[0].data = data;
      chartInstanceRef.current.update();
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [data, labels]);

  return (
    <canvas ref={canvasRef} style={{ maxWidth: "400px", maxHeight: "200px" }} />
  );
}

// ChartjsComponent を利用する親コンポーネント
function AppB() {
  const [chartData, setChartData] = useState([10, 20, 30]);
  const [chartLabels, setChartLabels] = useState(["A", "B", "C"]);

  const updateData = () => {
    const newData = [...chartData, Math.floor(Math.random() * 50)];
    const newLabel = String.fromCharCode(65 + chartLabels.length);
    setChartData(newData);
    setChartLabels([...chartLabels, newLabel]);
  };

  return (
    <div>
      <ChartjsComponent data={chartData} labels={chartLabels} />
      <button onClick={updateData}>Update Chart</button>
    </div>
  );
}
```

**設問:** コード例 A とコード例 B では、どちらがより「宣言的」なアプローチと言えるか？また、実務ではどのような観点からどちらを選択するか？理由とともに説明する。

<details><summary>解答例</summary>

- **宣言性:**
  - コード例 A (SVG Bar Chart) の方が、より宣言的なアプローチと言える。React の状態 (`data`) から直接的に UI の構造（SVG 要素）を記述しており、「何を」表示したいかがコードの中心。React が差分検出と DOM 更新を担当
  - コード例 B (Chart.js Wrapper) は、React の宣言的な枠組みの中で命令的なライブラリを扱う。`useEffect` 内で「いつ」「どのように」ライブラリの API を呼び出すかを記述しており、手続き的な側面が強い。ただし、コンポーネントのインターフェース（props を渡すと描画される）は宣言的
- **実務での選択:**
  - **例 A (SVG):**
    - メリット: 依存ライブラリ不要、バンドルサイズ小、React エコシステム内で完結、カスタマイズ性高
    - 選択基準: シンプルなチャート、高度なカスタマイズ必要、依存最小限にしたい場合
  - **例 B (ライブラリ):**
    - メリット: 高機能チャート容易実装、ライブラリ側で最適化されている場合多、開発速度速
    - 選択基準: 高機能チャート必要、開発速度優先、標準的チャートで十分な場合
  - **トレードオフ:** 宣言性の高さが常に最優先されるわけではない。ライブラリの機能性、パフォーマンス、開発コスト、保守性などを総合的に評価し、プロジェクト要件に最も適した方法を選択。もしライブラリの方が性能や機能で圧倒的に優れている場合、宣言性を多少犠牲にしてでもライブラリを採用する判断は十分にあり得る
- **出題意図:**
  - React 自身の宣言的レンダリングと、外部の命令的ライブラリをラップする際の宣言性/命令性の違いの理解を確認
  - 単に「どちらが宣言的か」だけでなく、実務における技術選定のトレードオフ（宣言性 vs 機能性/開発コストなど）について考察を促す。`destroy()` のような命令的 API の適切な管理の重要性にも気づかせる

</details>

---

### 問題 2: 宣言性の比較（データフェッチ）

以下の 2 つのカスタムフック（利用例を含む）を比較する。

**コード例 A (Fetch Hook with AbortController):**

- **概要:** `useEffect` と `AbortController` を使用してデータをフェッチ。URL が変更されたりコンポーネントがアンマウントされたりする際に、進行中のフェッチリクエストをキャンセル。（React 18 以降、`isMounted` フラグは一般的に不要とされる）

```jsx
import React, { useState, useEffect, useRef } from "react";

function useFetchWithCancel(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) {
      setData(null);
      setLoading(false);
      setError(null);
      return;
    }

    const abortController = new AbortController();
    const signal = abortController.signal;

    let isCancelled = false;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, { signal });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (!isCancelled) {
          setData(result);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          if (!isCancelled) {
            setError(err);
          }
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isCancelled = true;
      abortController.abort();
    };
  }, [url]);

  return { data, loading, error };
}

function UserProfileA({ userId }) {
  const apiUrl = userId ? `https://api.example.com/users/${userId}` : null;
  const { data, loading, error } = useFetchWithCancel(apiUrl);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message || "Failed to fetch"}</p>;
  if (!data) return <p>No user selected or no data.</p>;

  return <div>User Name: {data.name}</div>;
}
```

**コード例 B (Using React Query / SWR - 推奨アプローチ):**

- **概要:** データフェッチ、キャッシュ、キャンセル、再試行などを宣言的に扱うためのライブラリ（例: React Query (TanStack Query) や SWR）を利用。複雑なロジックを自前で実装する代わりに、ライブラリの提供する API を利用

```jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";

const fetchUser = async (userId) => {
  if (!userId) return null;
  const response = await fetch(`https://api.example.com/users/${userId}`);
  if (!response.ok) {
    throw new Error(`Network response was not ok for user ${userId}`);
  }
  return response.json();
};

function UserProfileB({ userId }) {
  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUser(userId),
    enabled: !!userId,
  });

  if (isLoading) return <p>Loading initial user data...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>No user selected.</p>;

  return (
    <div>
      User Name: {data.name}
      {isFetching ? " (Updating...)" : ""}
    </div>
  );
}
```

**設問:** コード例 A とコード例 B では、どちらがより「宣言的」なアプローチと言えるか？また、実務ではデータフェッチに関してどのようなアプローチが推奨されるか？理由とともに説明する。

<details><summary>解答例</summary>

- **宣言性:**
  - コード例 B (React Query / SWR) の方が、より宣言的なアプローチと言える。開発者は「どのデータを」「どのように取得するか（関数）」を宣言的に記述し、ライブラリがキャッシュ管理、バックグラウンド更新、ローディング/エラー状態の管理、リクエストの重複排除、キャンセル（内部的に）などを自動実行。データフェッチに関する複雑な「手続き」を隠蔽
  - コード例 A (Fetch Hook with AbortController) は、`useEffect` を使ってデータフェッチのライフサイクル（開始、成功、失敗、キャンセル）を命令的に管理。フックのインターフェースは宣言的だが、内部実装は手続き的。`AbortController` によるキャンセル処理も命令的な操作
- **実務での推奨:**
  - 多くの場合、コード例 B のように **React Query (TanStack Query) や SWR といったデータフェッチライブラリの利用が強く推奨される**
  - コード例 A のような自前実装は、ライブラリ導入が適切でない小規模ケースや、非常に特殊な要件がある場合に限定されるべき。データフェッチロジックの「車輪の再発明」は避けるのが賢明
- **出題意図:**
  - データフェッチにおける自前実装（命令的側面が強い）と、専用ライブラリ利用（より宣言的）を比較
  - 実務において、複雑な非同期処理や状態管理は、実績のあるライブラリ活用が生産性・品質向上の鍵であることを理解させる。宣言性の追求が、必ずしも自前実装を意味するわけではないことを示す

</details>

---

### 問題 3: 宣言性の比較（フォーカス制御）

以下の 2 つの React コンポーネント（利用例を含む）を比較する。

**コード例 A (useEffect for Focus):**

- **概要:** `shouldFocus` という boolean 型の prop を受け取り、その値が `true` になったタイミングで `useEffect` を使って input 要素に命令的にフォーカス。HTML 標準の `autoFocus` 属性は初回マウント時にしか機能しないため、後からフォーカスを当てるにはこの方法が一般的

```jsx
import React, { useState, useEffect, useRef } from "react";

function FocusableInput({ shouldFocus, ...props }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (shouldFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [shouldFocus]);

  return <input ref={inputRef} {...props} />;
}

function AppA() {
  const [focusRequested, setFocusRequested] = useState(false);

  const handleFocusClick = () => {
    setFocusRequested(true);
  };

  return (
    <div>
      <button onClick={handleFocusClick}>Focus Input</button>
      <FocusableInput
        shouldFocus={focusRequested}
        placeholder="Focus me when button is clicked"
        onFocus={() => console.log("Input focused")}
        onBlur={() => setFocusRequested(false)}
      />
      <p>Other content...</p>
    </div>
  );
}
```

**コード例 B (useImperativeHandle + forwardRef):**

- **概要:** 親コンポーネントから子コンポーネントの特定のメソッド（ここでは `focus`）を命令的に呼び出すための現代的なパターン。`forwardRef` と `useImperativeHandle` を使用。（Render Props パターンはやや古いアプローチと見なされることがある）

```jsx
import React, {
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";

const ImperativeFocusableInput = forwardRef((props, ref) => {
  const internalInputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      internalInputRef.current?.focus();
    },
  }));

  return <input ref={internalInputRef} {...props} />;
});

function AppB() {
  const inputHandleRef = useRef(null);

  const handleFocusClick = () => {
    inputHandleRef.current?.focus();
  };

  return (
    <div>
      <ImperativeFocusableInput
        ref={inputHandleRef}
        placeholder="Focus me via imperative handle"
      />
      <button onClick={handleFocusClick}>Set Focus via Handle</button>
      <p>Other content...</p>
    </div>
  );
}
```

**設問:** コード例 A とコード例 B では、フォーカス制御という目的において、どちらがより React の思想（宣言的な状態管理と、必要に応じた命令的な操作のカプセル化）に沿っていると言えるか？それぞれのメリット・デメリットも考慮して説明する。

<details><summary>解答例</summary>

- **React の思想との整合性:**
  - どちらのアプローチも、フォーカス制御という本質的に命令的な操作を扱う。React は主に宣言的な UI 構築に優れるが、DOM API を直接操作する必要がある場面も存在
  - **コード例 B (useImperativeHandle):** 親コンポーネントが特定のタイミングで子コンポーネントのメソッド（`focus`）を直接呼び出す。これはより直接的な命令的アプローチだが、`useImperativeHandle` によって子コンポーネントが公開する API を明示的に定義し、内部実装を隠蔽（カプセル化）。これにより、親は子の内部構造を知る必要がなくなる
- **メリット・デメリット:**
  - **例 A (useEffect):**
    - メリット: 比較的シンプル、`shouldFocus` prop で制御が宣言的に見える
    - デメリット: `shouldFocus` が `true` になるたびにフォーカスが当たるため、意図しない再フォーカスが発生する可能性。フォーカスを当てるタイミングの制御が間接的
  - **例 B (useImperativeHandle):**
    - メリット: 親が任意のタイミングで `focus()` を呼び出せるため、制御が直接的。子コンポーネントの公開 API が明確
    - デメリット: `forwardRef` と `useImperativeHandle` の記述がやや冗長。命令的な呼び出しが増えるとコードが複雑化する可能性
- **どちらがより適切か:**
  - 一概にどちらが優れているとは言えない
  - 親コンポーネントが任意のタイミングで子にフォーカスを当てる必要がある場合（例: フォーム送信失敗時に特定のエラーフィールドにフォーカス）、例 B の方が直接的で制御しやすい。`useImperativeHandle` は、このような命令的な操作を安全にカプセル化するための React の標準的な方法
- **出題意図:**
  - DOM の命令的操作（フォーカス）を React で扱う際の代表的なパターン（`useEffect` vs `useImperativeHandle`）を比較
  - 宣言的な状態管理と命令的な DOM 操作の境界線上で、どのようにバランスを取るか、React が提供するツールをどう活用するかを考えさせる

</details>

---

### 問題 4: 宣言性の比較（一時的な視覚効果）

以下の 2 つの React コンポーネント（利用例を含む）を比較する。

**コード例 A (CSS Transition/Animation):**

- **概要:** 値 (`value`) が変更されたときに、CSS の Transition または Animation を利用して一時的なハイライト効果を表現。React は状態変更時にクラス名を切り替えるだけで、アニメーションの実行は CSS に完全に委ねる

```jsx
import React, { useState, useEffect, useRef } from "react";
import "./Highlight.css";

function HighlightWithCSS({ value }) {
  const [isHighlighting, setIsHighlighting] = useState(false);
  const prevValueRef = useRef(value);

  useEffect(() => {
    if (prevValueRef.current !== value) {
      setIsHighlighting(true);
      const timer = setTimeout(() => {
        setIsHighlighting(false);
      }, 100);

      prevValueRef.current = value;

      return () => clearTimeout(timer);
    }
  }, [value]);

  const className = `highlight-value ${isHighlighting ? "flash" : ""}`;

  return <p className={className}>値: {value}</p>;
}

function AppA() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
      <HighlightWithCSS value={count} />
    </div>
  );
}
```

**コード例 B (useEffect with Class Manipulation):**

- **概要:** `value` prop が変更されるたびに、`useEffect` を使って対応する DOM 要素の `classList` を直接操作し、一時的に CSS クラス（例: `highlight`）を付与し、`setTimeout` で少し時間が経ったら削除

```jsx
import React, { useState, useEffect, useRef } from "react";
import "./Highlight.css";

function HighlightWithEffect({ value }) {
  const elementRef = useRef(null);

  useEffect(() => {
    if (!elementRef.current) return;

    let timerId = null;

    elementRef.current.classList.add("highlight");

    timerId = setTimeout(() => {
      elementRef.current?.classList.remove("highlight");
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [value]);

  return <p ref={elementRef}>値: {value}</p>;
}

function AppB() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
      <HighlightWithEffect value={count} />
    </div>
  );
}
```

**設問:** コード例 A とコード例 B では、一時的な視覚効果（ハイライト）を実現する上で、どちらがより「宣言的」なアプローチと言えるか？また、パフォーマンスや保守性の観点からはどちらが望ましいと考えられるか？

<details><summary>解答例</summary>

- **宣言性:**
  - コード例 A (CSS Transition/Animation) の方が、より宣言的なアプローチと言える。React コンポーネントは「ハイライト中である」という状態 (`isHighlighting`) を管理し、それに基づいて CSS クラス名を宣言的に設定するだけ。実際の視覚効果（どのようにアニメーションするか）は CSS に記述されており、振る舞いの定義が分離
  - コード例 B (useEffect with Class Manipulation) は、`useEffect` 内で `classList.add` や `setTimeout`, `classList.remove` といった命令的な DOM 操作とタイマー管理を実行。「どのように」ハイライトを実現するかの手続きが JavaScript コード内に直接記述
- **パフォーマンスと保守性:**
  - **パフォーマンス:** 一般的に、コード例 A の方がパフォーマンス上有利。CSS Transition や Animation はブラウザによって最適化されており、JavaScript の実行（特に `setTimeout` の多用）によるメインスレッドの負荷を回避。頻繁に値が変更される場合、例 B はタイマーの生成・クリアが頻発し、DOM 操作も都度発生するため、負荷が高くなる可能性
  - **保守性:** コード例 A の方が保守性が高いと考えられる。視覚的な振る舞い（アニメーションの詳細）は CSS ファイルにまとまっているため、デザインの変更が容易。React コンポーネントは状態とクラス名の関連付けに集中できる。例 B は、視覚効果のロジックが JavaScript コード内に混在するため、変更がコンポーネント自身に影響を与えやすく、見通しが悪くなる可能性
- **結論:**
  - 一時的な視覚効果やアニメーションに関しては、可能な限り CSS (Transition, Animation) を活用するコード例 A のアプローチが、宣言性、パフォーマンス、保守性のすべての観点で望ましいと言える。`useEffect` を使った命令的な DOM 操作（例 B）は、CSS だけでは実現できない複雑なアニメーションや、DOM 要素の特定の状態に依存する処理が必要な場合に限定して検討すべき
- **出題意図:**
  - 状態変化に応じた視覚効果を実装する際に、CSS による宣言的なアプローチと、JavaScript (useEffect) による命令的なアプローチを比較
  - `useEffect` は強力だが、DOM 操作やアニメーションの第一選択肢ではなく、より宣言的な代替手段（この場合は CSS）がないか検討することの重要性を示唆

</details>

---

### 問題 5: 宣言性の比較（状態更新ロジック）

以下の 2 つの React コンポーネント（カウンター機能）を比較する。

**コード例 A (Common Update Function / Reducer Pattern):**

- **概要:** カウンターの状態 (`count`) と、その状態を更新するためのロジックをコンポーネント内に定義。ここではシンプルな例として共通関数を使用。アクションが増えると `useReducer` を使うのがより一般的でスケールしやすいパターン

```jsx
import React, { useState, useCallback, useReducer } from "react";

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return { count: 0 };
    case "add":
      return { count: state.count + (action.payload || 0) };
    default:
      throw new Error("Unknown action type");
  }
}

function CounterA() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>Increment</button>
      <button onClick={() => dispatch({ type: "decrement" })}>Decrement</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
      <button onClick={() => dispatch({ type: "add", payload: 5 })}>
        Add 5
      </button>
    </div>
  );
}
```

**コード例 B (Using useEffect for Updates - アンチパターン寄り):**

- **概要:** カウンターの状態 (`count`) とは別に、実行したいアクションの種類を保持する状態 (`pendingAction`) を定義。ボタンクリックで `pendingAction` を更新し、`useEffect` を使って `pendingAction` の変更を監視し、変更があった場合に `count` を更新。**この方法は通常、冗長であり、アンチパターンと見なされることが多い**

```jsx
import React, { useState, useEffect } from "react";

function CounterB() {
  const [count, setCount] = useState(0);
  const [pendingAction, setPendingAction] = useState(null);

  useEffect(() => {
    if (pendingAction === null) return;

    switch (pendingAction.type) {
      case "increment":
        setCount((c) => c + 1);
        break;
      case "decrement":
        setCount((c) => c - 1);
        break;
      case "reset":
        setCount(0);
        break;
      case "add":
        setCount((c) => c + (pendingAction.payload || 0));
        break;
      default:
        console.warn("Unknown action type in effect");
    }

    setPendingAction(null);
  }, [pendingAction]);

  const handleAction = (type, payload = null) => {
    setPendingAction({ type, payload, timestamp: Date.now() });
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => handleAction("increment")}>Increment</button>
      <button onClick={() => handleAction("decrement")}>Decrement</button>
      <button onClick={() => handleAction("reset")}>Reset</button>
      <button onClick={() => handleAction("add", 5)}>Add 5</button>
    </div>
  );
}
```

**設問:** コード例 A (`useReducer` または共通関数) とコード例 B (`useEffect` を利用) では、状態更新ロジックの実装方法としてどちらがより適切で、React の考え方に沿っていると言えるか？コード例 B のアプローチがなぜ一般的に推奨されないのか、その理由も説明する。

<details><summary>解答例</summary>

- **適切性と React の考え方:**
  - コード例 A (`useReducer` または共通関数) の方が、このシナリオにおいては圧倒的に適切であり、React の考え方（状態更新はイベントハンドラ内で直接的に行う）に沿っている
  - シンプルなケースでは共通関数でも十分だが、状態やアクションが増えると `useReducer` の方がスケールしやすい
- **コード例 B が推奨されない理由:**
  - **冗長性:** ユーザーのアクション（ボタンクリック）に対して直接状態 (`count`) を更新できるのに、わざわざ中間状態 (`pendingAction`) を設け、`useEffect` を介して間接的に `count` を更新。これは不必要に複雑
  - **`useEffect` の誤用:** `useEffect` は、レンダリングの結果として発生する副作用（API フェッチ、DOM 操作、サブスクリプション設定など）を扱うためのもの。コンポーネント内部の同期的な状態更新ロジックのために使うべきではない
- **結論:**
  - ユーザーイベントに応じてコンポーネントの状態を同期的に更新する場合は、イベントハンドラ内で直接 `setState` や `dispatch` を呼び出す（コード例 A のアプローチ）のが、最もシンプルで直接的、かつ React の設計思想に合致した方法。コード例 B のように `useEffect` を状態更新のトリガーとして使うのは、多くの場合アンチパターンであり避けるべき
- **出題意図:**
  - 状態更新ロジックの実装方法として、イベントハンドラからの直接的な更新 (`useState`/`useReducer`) と、`useEffect` を介した間接的な更新を比較
  - 「宣言的」に見えるコードが必ずしも良い設計とは限らないこと、特に `useEffect` の誤用がアンチパターンにつながりやすいことを理解させる

</details>

---

**まとめ:**

このクイズを通じて、React における宣言的・命令的なアプローチの様々な側面を見てきた。重要なのは、これらの概念が二元論ではなくグラデーションであること、そして実際の開発では、宣言性だけでなく、パフォーマンス、保守性、開発コスト、ライブラリの活用、チームのスキルセットなど、多くの要因を考慮して最適な設計を選択する必要があるということ。常に「なぜこのアプローチを選ぶのか？」という問いを持ち続けることが、より良いコードを書くための鍵となる。
