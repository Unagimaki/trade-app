import type { RootState } from "@/app/store";

export const selectTrades = (s: RootState) => s.trades.items;

export const selectCurrentBalance = (s: RootState) => {
  const initial = s.settings.initialBalance;
  const pnlSum = s.trades.items.reduce((acc, t) => {
    if (t.type === "win") return acc + t.rr * t.risk;
    if (t.type === "loss") return acc - t.risk;
    return acc; // break-even
  }, 0);
  return Math.round((initial + pnlSum) * 100) / 100;
};