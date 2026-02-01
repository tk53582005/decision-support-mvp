# 判断支援ツール（MVP）

**仕様固定・ロジック固定**を守って作成したMVP（Minimum Viable Product）

## デモ

👉 https://decision-support-mvp.vercel.app

## プロジェクト概要

このプロジェクトは、「案件受注/作業着手のGO/NO-GO判定」を行う判断支援ツールです。
**文言変更不可・ロジック完全固定**という要件のもと、実案件を想定したMVPとして開発しました。

### 特徴

- ✅ **固定ロジック**: 判定ルールは完全に定義済み（改変不可）
- ✅ **文言固定**: すべてのUI文言は変更不可
- ✅ **履歴管理**: 判定結果の保存・閲覧機能
- ✅ **HOLD 3日ルール**: 保留判定の期限管理
- ✅ **型安全**: TypeScriptで完全に型定義
- ✅ **テスト済み**: 14個のテストケース（全パス）

## 技術スタック

- **フロントエンド**: Next.js 16 (App Router) + TypeScript
- **データベース**: Prisma + PostgreSQL（Neon）
- **テスト**: Vitest
- **スタイリング**: インラインCSS（最小限）
- **デプロイ**: Vercel

## 判定ロジック仕様

### 質問項目（5問）

1. **Q1**: 要件は文章で合意済みか？
2. **Q2**: 納期は現実的か？
3. **Q3**: 見積（工数/金額）は確定しているか？
4. **Q4**: 技術的リスクは許容範囲か？
5. **Q5**: 受注に必要な前提（アカウント/権限/素材など）は揃っているか？

各質問に対して **Yes / No / Unknown** で回答します。

### 判定結果

#### EXIT（実行不可）

次のいずれかを満たす場合：
- Q1 が No（要件合意なし）
- Q2 が No（納期が非現実的）
- No の回答が2つ以上
- Unknown の回答が3つ以上

#### HOLD（保留）

EXIT ではない、かつ次のいずれかを満たす場合：
- Unknown の回答が1つ以上
- Q3 が Unknown（見積未確定）
- Q5 が Unknown（前提未確定）

**保留期限**: 判定日時 + 3日

#### PROCEEDABLE（実行可能）

上記いずれにも該当しない場合

## セットアップ

### 必要な環境

- Node.js 18以上
- npm または yarn
- PostgreSQLデータベース（[Neon](https://neon.tech) の無料プランで可）

### インストール
```bash
# リポジトリのクローン
git clone https://github.com/tk53582005/decision-support-mvp.git
cd decision-support-mvp

# 依存関係のインストール
npm install

# .env ファイル作成
cp .env.example .env

# .env を開いて DATABASE_URL に PostgreSQL の接続URLを設定
# DATABASE_URL=postgresql://...

# Prismaマイグレーション
npx prisma migrate dev --name init

# 開発サーバー起動
npm run dev
```

ブラウザで `http://localhost:3000` を開きます。

## テスト実行
```bash
npm test
```

14個のテストケースがすべてパスすることを確認できます。

## ディレクトリ構成
```
decision-support-mvp/
├── src/
│   ├── domain/
│   │   ├── types.ts              # 型定義（固定）
│   │   ├── decisionEngine.ts     # 判定ロジック（純関数・固定）
│   │   └── decisionEngine.test.ts # テスト
│   ├── constants/
│   │   └── uiText.ts             # UI文言（固定・変更不可）
│   ├── server/
│   │   └── db.ts                 # Prismaクライアント
│   └── app/
│       ├── actions/
│       │   └── decisionActions.ts # Server Actions
│       ├── decision/
│       │   ├── new/              # 判定入力フォーム
│       │   ├── result/[id]/      # 判定結果画面
│       │   └── logs/             # 判定履歴（一覧・詳細）
│       ├── layout.tsx
│       └── page.tsx
├── prisma/
│   ├── schema.prisma             # Prismaスキーマ（PostgreSQL）
│   └── migrations/               # マイグレーション履歴
├── .env.example                  # 環境変数テンプレート
└── README.md
```

## 設計のポイント

### 1. ロジックの分離

`src/domain/decisionEngine.ts` は**純関数**として実装されており、UIやDBから完全に独立しています。
これにより、ロジックの変更リスクを最小化し、テストも容易になっています。

### 2. 文言の固定化

`src/constants/uiText.ts` にすべてのUI文言を集約し、`as const` で型レベルで固定しています。
このファイルには **「変更不可」の宣言コメント** があります。

### 3. 型安全性

TypeScriptの型システムを最大限活用し、以下を保証しています：
- 質問IDは `Q1` | `Q2` | `Q3` | `Q4` | `Q5` に限定
- 回答は `YES` | `NO` | `UNKNOWN` に限定
- 判定結果は `EXIT` | `HOLD` | `PROCEEDABLE` に限定

## 今後の拡張

### AWS デプロイ

以下の構成でAWSデプロイ可能：
- **フロントエンド**: ECS Fargate（Next.js コンテナ）
- **データベース**: RDS（PostgreSQL）
- **IaC**: Terraform

ロジックが純関数として実装されているため、移植コストは最小限です。

## ライセンス

MIT

## 作成者

Kazuhiro
- フリーランスAWSエンジニア準備中
- ポートフォリオプロジェクトとして作成