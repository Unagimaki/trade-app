import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { formatCurrency, formatPercent } from '@/lib/formatters';

export interface DepositStatsCardsProps {
  currentBalance: number;
  profit: number;
  growthPercent: number;
  maxDrawdown: number;
  maxDrawdownPercent: number;
  tradesCount: number;
}

export const DepositStatsCards: React.FC<DepositStatsCardsProps> = ({
  currentBalance,
  profit,
  growthPercent,
  maxDrawdown,
  maxDrawdownPercent,
  tradesCount
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="trading-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-[#94a3b8]">Текущий баланс</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-[#f8fafc]">
            {formatCurrency(currentBalance)}
          </p>
        </CardContent>
      </Card>

      <Card className="trading-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-[#94a3b8]">Прибыль</CardTitle>
        </CardHeader>
        <CardContent>
          <p className={`text-2xl font-bold ${profit >= 0 ? 'text-[#16a34a]' : 'text-[#dc2626]'}`}>
            {formatCurrency(profit)}
          </p>
          <p className={`text-sm ${growthPercent >= 0 ? 'text-[#16a34a]' : 'text-[#dc2626]'}`}>
            {formatPercent(growthPercent)}
          </p>
        </CardContent>
      </Card>

      <Card className="trading-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-[#94a3b8]">Макс. просадка</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-[#f8fafc]">
            {formatCurrency(maxDrawdown)}
          </p>
          <p className="text-sm text-[#dc2626]">
            - {maxDrawdownPercent.toFixed(2)}%
          </p>
        </CardContent>
      </Card>

      <Card className="trading-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-[#94a3b8]">Сделки</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-[#f8fafc]">
            {tradesCount}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};