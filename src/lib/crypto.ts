import 'server-only';

export type CryptoAsset = 'USDT' | 'BTC' | 'ETH';

export interface CryptoRates {
  /** Indicative AED per 1 unit of each asset (gross, before spread). */
  rates: Record<CryptoAsset, number>;
  /** Display spread/fee applied on the receive side (e.g. 0.015 = 1.5%). */
  spread: number;
  /** AED is pegged to USD at 3.6725. */
  aedPerUsd: number;
  updated: string;
  stale: boolean;
}

// Conservative fallbacks (approx AED) used only if the rate source is unreachable.
const FALLBACK: Record<CryptoAsset, number> = { USDT: 3.67, BTC: 250000, ETH: 13000 };

/**
 * Live indicative crypto→AED rates via CoinGecko (free tier, no key). Cached for
 * 5 minutes. Falls back to static approximations if unreachable — the tool is
 * indicative only, so a brief stale read is acceptable.
 */
export async function fetchCryptoRates(): Promise<CryptoRates> {
  const spread = Number(process.env.CRYPTO_SPREAD ?? '0.015');
  const aedPerUsd = 3.6725;
  try {
    const res = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=tether,bitcoin,ethereum&vs_currencies=aed',
      { next: { revalidate: 300 } },
    );
    if (!res.ok) throw new Error(`rate source ${res.status}`);
    const d = (await res.json()) as Record<string, { aed?: number }>;
    const rates = { USDT: d.tether?.aed, BTC: d.bitcoin?.aed, ETH: d.ethereum?.aed };
    if (!rates.USDT || !rates.BTC || !rates.ETH) throw new Error('missing rate');
    return { rates: rates as Record<CryptoAsset, number>, spread, aedPerUsd, updated: new Date().toISOString(), stale: false };
  } catch {
    return { rates: FALLBACK, spread, aedPerUsd, updated: new Date().toISOString(), stale: true };
  }
}
