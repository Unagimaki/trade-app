import React from 'react';
import { DepositChart } from '@/widgets/deposit-chart/ui/DepositChart';
import { calculateDepositFromTrades } from '@/shared/lib/depositCalculations';
import { useAppSelector } from '@/app/store';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { selectTrades } from '@/entities/trade/model/selectors';

export const DepositCurvePage: React.FC = () => {
  const trades = useAppSelector(selectTrades)
  const depositData = calculateDepositFromTrades(trades);
  console.log(trades);
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-[#f8fafc]">Кривая депозита</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="trading-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#94a3b8]">Текущий баланс</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-[#f8fafc]">
              {formatCurrency(depositData.currentBalance)}
            </p>
          </CardContent>
        </Card>

        <Card className="trading-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#94a3b8]">Прибыль</CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-2xl font-bold ${depositData.profit >= 0 ? 'text-[#16a34a]' : 'text-[#dc2626]'}`}>
              {formatCurrency(depositData.profit)}
            </p>
            <p className={`text-sm ${depositData.growthPercent >= 0 ? 'text-[#16a34a]' : 'text-[#dc2626]'}`}>
              {formatPercent(depositData.growthPercent)}
            </p>
          </CardContent>
        </Card>

        <Card className="trading-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#94a3b8]">Макс. просадка</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-[#f8fafc]">
              {formatCurrency(depositData.maxDrawdown)}
            </p>
            <p className="text-sm text-[#dc2626]">
              {depositData.maxDrawdownPercent.toFixed(2)}%
            </p>
          </CardContent>
        </Card>

        <Card className="trading-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#94a3b8]">Сделки</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-[#f8fafc]">
              {trades.length}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="trading-card">
        <CardHeader>
          <CardTitle className="text-[#f8fafc]">График депозита</CardTitle>
        </CardHeader>
        <CardContent>
          <DepositChart data={depositData} />
        </CardContent>
      </Card>
    </div>
  );
};