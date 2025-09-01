import type { Trade } from "@/entities/trade/model/types";
import type { DepositChartData, DepositPoint } from "./types";
import { selectInitialBalance } from "@/entities/trade/model/selectors";
import { useAppSelector } from "@/app/store";

export const calculateDepositFromTrades = (trades: Trade[]): DepositChartData => {
  let currentBalance = useAppSelector(selectInitialBalance)
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
  console.log(trades);
  
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

  const totalProfit = currentBalance - currentBalance;
  const growthPercent = (totalProfit / currentBalance) * 100;

  return {
    points,
    startBalance: currentBalance,
    currentBalance,
    maxBalance,
    minBalance,
    profit: totalProfit,
    growthPercent,
    maxDrawdown,
    maxDrawdownPercent
  };
};