// src/widgets/stats-panel/ui/StatsPanel.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppSelector } from "@/app/store";
import {
  selectWinRate,
  selectProfitFactor,
  selectAverageWin,
  selectAverageLoss
} from "@/entities/trade/model/selectors";

export default function StatsPanel() {
  const winRate = useAppSelector(selectWinRate);
  const profitFactor = useAppSelector(selectProfitFactor);
  const averageWin = useAppSelector(selectAverageWin);
  const averageLoss = useAppSelector(selectAverageLoss);

  const StatItem = ({ label, value }: { label: string; value: string | number }) => (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm font-medium">{label}</span>
      <span className="text-lg font-bold">{value}</span>
    </div>
  );

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>Статистика</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2">
        <StatItem label="Win Rate" value={`${winRate.toFixed(2)}%`} />
        <StatItem label="Profit Factor" value={profitFactor.toFixed(2)} />
        <StatItem label="Average Win" value={averageWin.toFixed(2)} />
        <StatItem label="Average Loss" value={averageLoss.toFixed(2)} />
      </CardContent>
    </Card>
  );
}