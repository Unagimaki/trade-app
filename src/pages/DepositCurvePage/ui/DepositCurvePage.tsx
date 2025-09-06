import React from 'react';
import { DepositStatsCards } from '@/features/deposit-stats-cards/ui/DepositStatsCards'; // Импортируем новую фичу
import { useAppSelector } from '@/app/store';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { selectTrades } from '@/entities/trade/model/selectors';
import { selectInitialBalance } from '@/entities/settings/model/slice';
import { calculateDepositFromTrades } from '@/features/deposit-curve-chat/model/lib/depositCalculations';
import { DepositChart } from '@/features/deposit-curve-chat/ui/DepositChart';

export const DepositCurvePage: React.FC = () => {
  const trades = useAppSelector(selectTrades)
  const initialBalance = useAppSelector(selectInitialBalance);
  const depositData = calculateDepositFromTrades(trades, initialBalance);
  
  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-[#f8fafc]">Кривая депозита</h1>
      
      <DepositStatsCards
        currentBalance={depositData.currentBalance}
        profit={depositData.profit}
        growthPercent={depositData.growthPercent}
        maxDrawdown={depositData.maxDrawdown}
        maxDrawdownPercent={depositData.maxDrawdownPercent}
        tradesCount={trades.length}
      />

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