export function formatMoney(n: number) {
  return (Math.round(n * 100) / 100).toFixed(2);
}