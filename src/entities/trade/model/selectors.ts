import type { RootState } from "@/app/store";
import { createSelector } from "@reduxjs/toolkit";

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

// Селекторы статистики
export const selectWinRate = createSelector([selectTrades], (trades) => {
  if (trades.length === 0) return 0;
  const winningTrades = trades.filter(trade => trade.type === "win");
  return (winningTrades.length / trades.length) * 100;
});

export const selectProfitFactor = createSelector([selectTrades], (trades) => {
  if (trades.length === 0) return 0;
  
  const totalProfit = trades
    .filter(trade => trade.type === "win")
    .reduce((sum, trade) => sum + (trade.risk * trade.rr), 0);
  
  const totalLoss = trades
    .filter(trade => trade.type === "loss")
    .reduce((sum, trade) => sum + trade.risk, 0);
  
  return totalLoss === 0 ? totalProfit : totalProfit / totalLoss;
});

export const selectAverageWin = createSelector([selectTrades], (trades) => {
  const winningTrades = trades.filter(trade => trade.type === "win");
  if (winningTrades.length === 0) return 0;
  
  return winningTrades.reduce((sum, trade) => sum + (trade.risk * trade.rr), 0) / winningTrades.length;
});

export const selectAverageLoss = createSelector([selectTrades], (trades) => {
  const losingTrades = trades.filter(trade => trade.type === "loss");
  if (losingTrades.length === 0) return 0;
  
  return losingTrades.reduce((sum, trade) => sum + trade.risk, 0) / losingTrades.length;
});