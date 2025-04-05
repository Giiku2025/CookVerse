# 食品認識 & 栄養分析 API

食品画像から食べ物を認識し、栄養成分を分析する API サービスです。このプロジェクトは Cloudflare Workers を使用して構築されており、Gemini API を活用して画像認識処理を行います。

## 機能

- **食品認識**: 画像内の食べ物を検出し、名前を一覧で返します
- **栄養分析**: 画像内のすべての食品の合計栄養成分を分析して返します
  - カロリー
  - たんぱく質
  - 脂質
  - 炭水化物
  - 糖質
  - 食物繊維
  - 塩分

## 技術スタック

- **Cloudflare Workers**: サーバーレスコンピューティング
- **Hono**: 高速で軽量な Web フレームワーク
- **Gemini API**: Google の生成 AI モデル（画像認識）
- **TypeScript**: 静的型付けによる開発
- **Zod**: バリデーションライブラリ
- **pnpm**: パッケージマネージャー

## アーキテクチャ

このプロジェクトはクリーンアーキテクチャの原則に従って構築されています：

```
src/
├── domain/              # ドメイン層（ビジネスルール）
│   ├── entities/        # エンティティ（データモデル）
│   ├── repositories/    # リポジトリインターフェース
│   └── use-cases/       # ユースケース（アプリケーションロジック）
├── infrastructure/      # インフラストラクチャ層
│   └── repositories/    # リポジトリの実装
├── presentation/        # プレゼンテーション層
│   ├── controllers/     # コントローラー
│   ├── middleware/      # ミドルウェア
│   └── routes/          # ルート定義
└── utils/               # ユーティリティクラス
```

## セットアップ

### 前提条件

- Node.js 18 以上
- pnpm
- Cloudflare Workers アカウント
- Gemini API Key

### インストール

```bash
# 依存関係のインストール
pnpm install
```

### 環境変数の設定

`wrangler.toml`ファイルを編集して、必要な環境変数を設定します：

```toml
name = "food-recognition-api"
main = "dist/index.js"
compatibility_date = "2025-04-04"

[build]
command = "pnpm run build"

[vars]
GEMINI_API_KEY = "YOUR_GEMINI_API_KEY"
```

### 開発サーバーの起動

```bash
pnpm run dev
```

### デプロイ

```bash
pnpm run deploy
```

## API 使用方法

### 食品認識 API

```http
POST /api/food/recognize
Content-Type: multipart/form-data
```

**パラメータ**:

- `image`: 画像ファイル（JPG, PNG）または Base64 エンコードされた画像データ

**レスポンス例**:

```json
{
  "foods": [{ "name": "りんご" }, { "name": "バナナ" }, { "name": "オレンジ" }]
}
```

### 栄養分析 API

```http
POST /api/nutrition/analyze
Content-Type: multipart/form-data
```

**パラメータ**:

- `image`: 画像ファイル（JPG, PNG）または Base64 エンコードされた画像データ

**レスポンス例**:

```json
{
  "nutrition": {
    "calories": 450,
    "protein": 15.2,
    "fat": 12.5,
    "carbohydrate": 65.3,
    "sugar": 8.2,
    "fiber": 4.5,
    "salt": 1.2
  }
}
```

## 注意事項

- Gemini API の精度に依存するため、結果は完全に正確ではない場合があります
- API は単一の画像で最大 10MB までサポートしています
- 栄養分析の結果は概算値として扱ってください
