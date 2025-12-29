export const getDiscountRate = (size) => {
  if (size >= 5) return 25; // percent
  if (size === 4) return 20;
  if (size === 3) return 10;
  if (size === 2) return 5;
  return 0;
};

const makeSubsets = (n) =>
  Array.from({ length: n }, (_, i) => i)
    .reduce((acc, idx) => acc.concat(acc.map(s => s.concat(idx))), [[]])
    .slice(1);

const keyFrom = arr => arr.join(',');
const allZero = arr => arr.every(c => c === 0);
const makeNext = (cur, idxs) => cur.map((v, i) => (idxs.includes(i) ? v - 1 : v));
const setPriceOf = (idxs, prices) => idxs.reduce((s, i) => s + prices[i], 0);
const discountedPrice = (price, size) => Math.round(price * (100 - getDiscountRate(size)) / 100);

const computeBestPriceCents = (counts, pricesCents) => {
  const memo = new Map();
  const subsets = makeSubsets(counts.length);

  const helper = curCounts => {
    const key = keyFrom(curCounts); if (memo.has(key)) return memo.get(key);
    if (allZero(curCounts)) { const res = { price: 0, breakdown: {} }; memo.set(key, res); return res; }
    const best = subsets
      .filter(idxs => idxs.every(i => curCounts[i] > 0))
      .map(idxs => (next => (rest => ({ total: discountedPrice(setPriceOf(idxs, pricesCents), idxs.length) + rest.price, breakdown: { ...rest.breakdown, [idxs.length]: (rest.breakdown[idxs.length] || 0) + 1 } }))(helper(next)))(makeNext(curCounts, idxs)))
      .reduce((a, b) => a.total < b.total ? a : b, { total: Infinity, breakdown: {} });
    const out = { price: best.total, breakdown: best.breakdown }; memo.set(key, out); return out;
  };

  return helper(counts);
};

const toCents = price => Math.round((price || 0) * 100);
const pricesCentsFrom = items => items.map(i => toCents(i.price));
const countsFrom = items => items.map(i => i.quantity || 0);
const subtotalCentsOf = (counts, pricesCents) => counts.reduce((a, c, idx) => a + c * pricesCents[idx], 0);
const toEuros = cents => Number((cents / 100).toFixed(2));

export const calculateCartTotals = (items) => {
  const pricesCents = pricesCentsFrom(items);
  const counts = countsFrom(items);
  const subtotalCents = subtotalCentsOf(counts, pricesCents);
  const { price: bestPriceCents, breakdown } = computeBestPriceCents(counts, pricesCents);
  const discountCents = subtotalCents - bestPriceCents;
  return { subtotal: toEuros(subtotalCents), discount: toEuros(discountCents), total: toEuros(bestPriceCents), breakdown };
};