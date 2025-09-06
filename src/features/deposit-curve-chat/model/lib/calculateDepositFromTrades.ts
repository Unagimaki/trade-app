import type { Trade } from "@/entities/trade/model/types";
import type { DepositChartData, DepositPoint } from "../types";

export const calculateDepositFromTrades = (trades: Trade[], initialBalance: number): DepositChartData => {
  // Сортируем сделки по дате (от самой старой к самой новой)
  const sortedTrades = [...trades].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  
  let currentBalance = initialBalance;
  const points: DepositPoint[] = [];
  
  let maxBalance = currentBalance;
  let minBalance = currentBalance;
  let maxDrawdown = 0;
  let maxDrawdownPercent = 0;

  // Если есть сделки, создаем начальную точку с датой НА 1 ДЕНЬ РАНЬШЕ первой сделки
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
        profit = trade.risk * trade.rr;
        break;
      case "loss":
        profit = -trade.risk;
        break;
      case "break-even":
        profit = 0;
        break;
    }    
    // Округляем profit до 2 знаков как в селекторе
    profit = Math.round(profit * 100) / 100;
    
    // Округляем текущий баланс на каждом шаге
    currentBalance = Math.round((currentBalance + profit) * 100) / 100;

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

  const totalProfit = currentBalance - initialBalance;
  const growthPercent = initialBalance !== 0 ? (totalProfit / initialBalance) * 100 : 0;

  return {
    points,
    startBalance: initialBalance,
    currentBalance, // Теперь будет точно таким же как в селекторе
    maxBalance: Math.round(maxBalance * 100) / 100,
    minBalance: Math.round(minBalance * 100) / 100,
    profit: Math.round(totalProfit * 100) / 100,
    growthPercent: Math.round(growthPercent * 100) / 100,
    maxDrawdown: Math.round(maxDrawdown * 100) / 100,
    maxDrawdownPercent: Math.round(maxDrawdownPercent * 100) / 100
  };
};