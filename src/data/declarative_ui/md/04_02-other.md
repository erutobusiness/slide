# フロントエンド以外の宣言的 vs 命令的 クイズ

宣言的 vs. 命令的という対立軸は、UI 開発以外の領域でも重要な設計判断ポイントになる。
次の各問題について、宣言的アプローチと命令的アプローチのどちらが利点を持つか、理由とともに考えてみよう。

## 問題 1: インフラ構築

以下の 2 つの方法で VPC（Virtual Private Cloud）を構築した場合、どちらがより idempotent（冪等性）か？

**A. Terraform**

```hcl
resource "aws_vpc" "example" {
  cidr_block = "10.0.0.0/16"
  tags = {
    Name = "example-vpc"
  }
}
```

**B. Bash + AWS CLI**

```bash
#!/usr/bin/env bash
aws ec2 create-vpc --cidr-block 10.0.0.0/16 \
  --tag-specifications 'ResourceType=vpc,Tags=[{Key=Name,Value=example-vpc}]'
```

<details><summary>解答例</summary>
Terraform の方がより宣言的かつ冪等性が高い。リソースの望ましい状態を宣言するだけで、作成済みかどうかを自動判定し、必要な差分のみ適用する。Bash + AWS CLI は実行するたびに create コマンドを発行し続けるため、冪等性を保証しにくい。
</details>

---

## 問題 2: コンテナオーケストレーション

次の 2 通りで Deployment のレプリカ数を 3 → 5 に変更する場合、どちらの方法が宣言的か？

**A. Kubernetes マニフェスト（YAML）**

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: webserver
spec:
  replicas: 5 # ここを修正
  template:
    # ...
```

**B. kubectl コマンド連打**

```bash
kubectl scale deployment webserver --replicas=5
```

<details><summary>解答例</summary>
Kubernetes マニフェスト（YAML）の修正が宣言的。望ましい状態（replicas: 5）を宣言し、`kubectl apply` を再実行するだけで差分適用される。一方、kubectl scale は命令的にその場で実行する操作。
</details>

---

## 問題 3: CI/CD パイプライン定義

次の 2 つの設定で、ブランチ名が変わったときに修正コストが低いのはどちらか？

**A. GitHub Actions (YAML)**

```yaml
on:
  push:
    branches:
      - main
jobs:
  build:
    steps:
      - uses: actions/checkout@v2
      - run: npm install
      - run: npm test
```

**B. Jenkinsfile（シェル連打）**

```groovy
def BRANCH = "main"
pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh "git checkout ${BRANCH}"
        sh 'npm install'
        sh 'npm test'
      }
    }
  }
}
```

<details><summary>解答例</summary>
GitHub Actions の YAML の方が宣言的で保守性が高い。対象ブランチを `on.push.branches` で一箇所宣言でき、変更もそこだけで済む。一方 Jenkinsfile はシェルスクリプトで分散しているため、修正箇所が増えやすい。
</details>

---

## 問題 4: データ操作言語

次の 2 種類で平均年齢を算出する場合、どちらが宣言性が高いか？

**A. SQL**

```sql
SELECT AVG(age) AS average_age
FROM users;
```

**B. JavaScript の for‑loop**

```javascript
let sum = 0;
for (const u of users) {
  sum += u.age;
}
const average = sum / users.length;
```

<details><summary>解答例</summary>
SQL の方が宣言性が高い。「何を求めたいか（平均）」だけを宣言し、集計ロジックは DB エンジンに委ねられる。JavaScript のループは手続き的に各要素を処理する必要があり、実装の手順が細かく記述される。
</details>

---

## 問題 5: 構成管理

以下の 2 つの方法で Web サーバーを最新に保つ場合、どちらがよりポータビリティと再現性に優れるか？

**A. Ansible (YAML DSL)**

```yaml
- hosts: webservers
  tasks:
    - name: Ensure nginx is latest
      ansible.builtin.yum:
        name: nginx
        state: latest
```

**B. 手続き的シェルスクリプト**

```bash
#!/usr/bin/env bash
ssh webserver01 'sudo yum update nginx'
ssh webserver02 'sudo yum update nginx'
```

<details><summary>解答例</summary>
Ansible の方が宣言的。設定ファイルに望ましい状態を記述し、ツールが複数ホストに対して一貫して適用する。シェルはホストごとに手順を明示する必要があり、再現性やメンテナンス性が低い。
</details>

---

## 問題 6: ビルド定義

次の 2 通りで依存関係の変更に応じて自動ビルドを行う場合、どちらが宣言的か？

**A. Bazel (BUILD ファイル)**

```python
cc_binary(
  name = "app",
  srcs = ["main.cc"],
  deps = [":lib"],
)
```

**B. Makefile (手続き的コマンド)**

```makefile
app: main.cc lib.a
	g++ main.cc lib.a -o app
lib.a: lib.cc
	g++ -c lib.cc -o lib.o
	ar rcs lib.a lib.o
```

<details><summary>解答例</summary>
Bazel の BUILD ファイルは依存関係グラフを宣言し、変更されたファイルのみを再ビルドする。Makefile はルールを定義するものの、手続きを順次記述するため、依存関係の定義と手順が混在しやすい。
</details>

---

## 問題 7: ネットワークポリシー

以下の 2 つで「特定の CIDR からポート 443 のみ許可」を表現する場合、どちらが宣言的か？

**A. Kubernetes NetworkPolicy (YAML)**

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-https
spec:
  podSelector: {}
  ingress:
    - from:
        - ipBlock:
            cidr: 10.0.0.0/8
      ports:
        - protocol: TCP
          port: 443
```

**B. iptables コマンド**

```bash
iptables -A INPUT -p tcp --dport 443 -s 10.0.0.0/8 -j ACCEPT
```

<details><summary>解答例</summary>
NetworkPolicy の YAML が宣言的。望ましいポリシーを定義し、Kubernetes が適用と維持を自動化する。iptables は逐次コマンドを実行する手続き的操作。
</details>

---

## 問題 8: アクセス制御 (IAM)

次の 2 通りでユーザーに特定 S3 バケットへの読み書きを許可する場合、どちらが宣言的か？

**A. AWS IAM ポリシー (JSON)**

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:PutObject"],
      "Resource": "arn:aws:s3:::my-bucket/*"
    }
  ]
}
```

**B. aws iam attach-user-policy コマンド**

```bash
aws iam put-user-policy \
  --user-name Alice \
  --policy-name S3Access \
  --policy-document file://policy.json
```

<details><summary>解答例</summary>
IAM ポリシーの JSON が宣言的。ポリシーとして何を許可するかを記述し、AWS が適用管理する。CLI は命令的に API 呼び出しを行う操作。
</details>

---

## 問題 9: データパイプライン / ETL

次の 2 つで依存関係を持つタスクの実行を定義する場合、どちらが再現性と監視性に優れるか？

**A. Airflow DAG (Python)**

```python
def my_dag():
    t1 = task1()
    t2 = task2()
    t1 >> t2  # 依存関係を宣言
```

**B. cron + シェルスクリプト連鎖**

```cron
0 * * * * /path/to/task1.sh && /path/to/task2.sh
```

<details><summary>解答例</summary>
Airflow は DAG で依存関係と再実行、モニタリングを宣言的に管理。cron は手続き的にスクリプトを順次実行するだけで、個別実行や失敗時のリトライ管理が難しい。
</details>

---

## 問題 10: プログラミング言語パラダイム

次の 2 種類で副作用を抑え、並列化しやすい設計を考える場合、どちらが宣言的パラダイムか？

**A. Haskell (純関数型)**

```haskell
add :: Int -> Int -> Int
add x y = x + y
```

**B. C (命令型)**

```c
int add(int x, int y) {
    return x + y;
}
```

<details><summary>解答例</summary>
Haskell の純関数は副作用を持たず、同じ入力に対して同じ結果を返すことを宣言する。並列化やメモ化が容易。C の関数は命令的だが、純粋関数とは限らず、副作用が起こり得る。
</details>

---

## 問題 11: テスト記述

次の 2 つで最終的な UI の状態だけを示すテストを書く場合、どちらが宣言的か？

**A. Gherkin / Cypress の should チェーン**

```gherkin
Then('I see the welcome message', () => {
  cy.get('#message').should('contain', 'Welcome');
});
```

**B. Selenium による逐次クリック・アサート**

```java
WebElement msg = driver.findElement(By.id("message"));
assertEquals("Welcome", msg.getText());
```

<details><summary>解答例</summary>
Gherkin + Cypress はシナリオとして期待状態を自然言語ライクに宣言し、should チェーンで最終状態を検証。Selenium は命令型に要素取得・比較を記述。
</details>

---

## 問題 12: ML パイプライン定義

次の 2 つで再現性の高いパイプラインを作成する場合、どちらが宣言的か？

**A. Kubeflow Pipelines (YAML/DSL)**

```yaml
apiVersion: kubeflow.org/v1
kind: Pipeline
spec:
  tasks:
    - name: preprocess
      template: preprocess-template
    - name: train
      template: train-template
      dependsOn: [preprocess]
```

**B. Jupyter Notebook の手動実行**

```markdown
# 1. データ前処理

# 2. モデル訓練

# 3. 評価
```

<details><summary>解答例</summary>
Kubeflow はタスク依存と実行環境を宣言し、再現性と自動化を保証。Notebook は手動ステップの記述に留まり、実行順序や環境依存が発生しやすい。
</details>
