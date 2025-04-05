import { Context, Next } from "hono";
import { StatusCode } from "hono/utils/http-status";

interface RateLimitOptions {
  limit: number;
  windowMs: number;
  statusCode: number;
  message: string;
  kvNamespace: KVNamespace;
  keyPrefix: string;
}

/**
 * IPアドレスに基づくレート制限ミドルウェア
 * Cloudflare KVを使用してリクエスト数をカウント
 */
export function rateLimitMiddleware(options: Partial<RateLimitOptions> = {}) {
  const defaultOptions: RateLimitOptions = {
    limit: 100,
    windowMs: 60 * 60 * 1000, // 1時間
    statusCode: 429,
    message: "リクエスト数の制限を超えました。しばらくしてからお試しください。",
    kvNamespace: null as unknown as KVNamespace,
    keyPrefix: "rate-limit:",
  };

  // オプションの統合
  const opts = { ...defaultOptions, ...options };

  if (!opts.kvNamespace) {
    throw new Error("KVNamespaceが指定されていません。");
  }

  return async (c: Context, next: Next) => {
    // クライアントのIPアドレスを取得
    const ip = c.req.header("CF-Connecting-IP") || "0.0.0.0";

    // KVストレージのキー
    const key = `${opts.keyPrefix}${ip}`;

    const now = Date.now();

    // KVからレート制限情報を取得
    let rateInfo = (await opts.kvNamespace.get(key, "json")) as {
      count: number;
      reset: number;
    } | null;

    if (!rateInfo) {
      // 初回アクセスの場合は新しく作成
      rateInfo = {
        count: 0,
        reset: now + opts.windowMs,
      };
    }

    // リセット時間が過ぎていたらカウンターをリセット
    if (now > rateInfo.reset) {
      rateInfo = {
        count: 0,
        reset: now + opts.windowMs,
      };
    }

    // カウンター増加
    rateInfo.count++;

    // 残りのリクエスト数
    const remaining = Math.max(0, opts.limit - rateInfo.count);

    // レスポンスヘッダーにレート制限情報を追加
    c.header("X-RateLimit-Limit", opts.limit.toString());
    c.header("X-RateLimit-Remaining", remaining.toString());
    c.header("X-RateLimit-Reset", Math.ceil(rateInfo.reset / 1000).toString());

    // KVに保存（expiration timeを設定して自動期限切れ）
    const ttl = Math.ceil((rateInfo.reset - now) / 1000);
    await opts.kvNamespace.put(key, JSON.stringify(rateInfo), {
      expirationTtl: ttl,
    });

    // 制限を超えた場合
    if (rateInfo.count > opts.limit) {
      c.status(opts.statusCode as StatusCode);
      return c.json({
        error: opts.message,
        retryAfter: Math.ceil((rateInfo.reset - now) / 1000),
      });
    }

    await next();
  };
}
