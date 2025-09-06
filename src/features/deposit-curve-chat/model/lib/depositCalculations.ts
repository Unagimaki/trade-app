import type { Trade } from "@/entities/trade/model/types";
import type { DepositChartData, DepositPoint } from "../types";

// Функция теперь принимает initialBalance как параметр
export const calculateDepositFromTrades = (trades: Trade[], initialBalance: number): DepositChartData => {
  let currentBalance = initialBalance; // Используем переданное значение
  const points: DepositPoint[] = [];
  
  let maxBalance = currentBalance;
  let minBalance = currentBalance;
  let maxDrawdown = 0;
  let maxDrawdownPercent = 0;

  // Добавляем начальную точку
  points.push({
    date: new Date().toISOString(),
    balance: currentBalance,
    profit: 0,
    tradesCount: 0
  });
  
  trades.forEach((trade, index) => {
    let profit = 0;
    
    switch (trade.type) {
      case "win":
        profit = trade.risk * trade.rr;
        break;
      case "loss":
        profit = -trade.risk;
        break;
      case "break-even":
        profit = 0;
        break;
    }

    currentBalance += profit;

    // Обновляем максимумы и минимумы
    maxBalance = Math.max(maxBalance, currentBalance);
    minBalance = Math.min(minBalance, currentBalance);
    
    // Рассчитываем просадку
    const drawdown = maxBalance - currentBalance;
    const drawdownPercent = (drawdown / maxBalance) * 100;
    
    if (drawdown > maxDrawdown) {
      maxDrawdown = drawdown;
      maxDrawdownPercent = drawdownPercent;
    }

    points.push({
      date: trade.date,
      balance: currentBalance,
      profit,
      tradesCount: index + 1
    });
  });

  // Исправляем расчет общей прибыли
  const totalProfit = currentBalance - initialBalance; // От начального баланса
  const growthPercent = initialBalance !== 0 ? (totalProfit / initialBalance) * 100 : 0;

  return {
    points,
    startBalance: initialBalance, // Используем initialBalance
    currentBalance,
    maxBalance,
    minBalance,
    profit: totalProfit,
    growthPercent,
    maxDrawdown,
    maxDrawdownPercent
  };
};