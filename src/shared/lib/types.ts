export type DepositPoint = {
  date: string;
  balance: number;
  profit?: number;
  tradesCount?: number;
};

export type DepositChartData = {
  points: DepositPoint[];
  startBalance: number;
  currentBalance: number;
  maxBalance: number;
  minBalance: number;
  profit: number;
  growthPercent: number;
  maxDrawdown: number;
  maxDrawdownPercent: number;
};

export type ChartTimeframe = '1W' | '1M' | '3M' | '6M' | '1Y' | 'ALL';