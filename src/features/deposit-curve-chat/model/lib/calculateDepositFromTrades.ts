import type { Trade } from "@/entities/trade/model/types";
import type { DepositChartData, DepositPoint } from "../types";

export const calculateDepositFromTrades = (trades: Trade[], initialBalance: number): DepositChartData => {
  const sortedTrades = [...trades].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  
  let currentBalance = initialBalance;
  const points: DepositPoint[] = [];
  
  let maxBalance = currentBalance;
  let minBalance = currentBalance;
  let maxDrawdown = 0;
  let maxDrawdownPercent = 0;

  if (sortedTrades.length > 0) {
    const firstTradeDate = new Date(sortedTrades[0].date);
    const startDate = new Date(firstTradeDate);
    startDate.setDate(startDate.getDate() - 1);
    
    points.push({
      date: startDate.toISOString(),
      balance: currentBalance,
      profit: 0,
      tradesCount: 0
    });
  } else {
    points.push({
      date: new Date().toISOString(),
      balance: currentBalance,
      profit: 0,
      tradesCount: 0
    });
  }
  
  sortedTrades.forEach((trade, index) => {
    let profit = 0;
    
    switch (trade.type) {
      case "win":
        profit = (trade.risk ?? 0) * (trade.rr ?? 0);
        break;
      case "loss":
        profit = -(trade.risk ?? 0);
        break;
      case "break-even":
        profit = 0;
        break;
    }    
    profit = Math.round(profit * 100) / 100;
    
    currentBalance = Math.round((currentBalance + profit) * 100) / 100;

    maxBalance = Math.max(maxBalance, currentBalance);
    minBalance = Math.min(minBalance, currentBalance);
    
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

  const totalProfit = currentBalance - initialBalance;
  const growthPercent = initialBalance !== 0 ? (totalProfit / initialBalance) * 100 : 0;

  return {
    points,
    startBalance: initialBalance,
    currentBalance, 
    maxBalance: Math.round(maxBalance * 100) / 100,
    minBalance: Math.round(minBalance * 100) / 100,
    profit: Math.round(totalProfit * 100) / 100,
    growthPercent: Math.round(growthPercent * 100) / 100,
    maxDrawdown: Math.round(maxDrawdown * 100) / 100,
    maxDrawdownPercent: Math.round(maxDrawdownPercent * 100) / 100
  };
};
