// src/features/settings-panel/ui/SettingsPanel.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/app/store";
import {
  selectInitialBalance,
  selectRiskPercent,
  selectPlannedRR,
  setRiskPercent,
  setPlannedRR,
} from "@/entities/settings/model/slice";
import { clearAll, addTrade } from "@/entities/trade/model/slice";
import { selectCurrentBalance } from "@/entities/trade/model/selectors";

function clampRiskPercent(v: number) {
  const n = Math.round(Number.isFinite(v) ? v : 0);
  return n < 0 ? 0 : n > 100 ? 100 : n;
}

function clampRR(v: number) {
  const n = Number(v);
  return !Number.isFinite(n) || n <= 0 ? 1 : n;
}

function calcRiskAmount(balance: number, riskPercent: number) {
  return Math.round(balance * (riskPercent / 100) * 100) / 100;
}

export default function SettingsPanel() {
  const dispatch = useAppDispatch();

  const initialBalance = useAppSelector(selectInitialBalance);
  const riskPercent = useAppSelector(selectRiskPercent); 
  const plannedRR = useAppSelector(selectPlannedRR);   
  const currentBalance = useAppSelector(selectCurrentBalance);

  const riskAmount = calcRiskAmount(currentBalance, riskPercent);

  const onRiskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = clampRiskPercent(Number(e.target.value));
    dispatch(setRiskPercent(v));
  };
  
  const onRRChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = clampRR(Number(e.target.value));
    dispatch(setPlannedRR(v));
  };

  const onAddLoss = () => {
    dispatch(addTrade({
      date: new Date().toISOString(),
      type: "loss",
      rr: plannedRR,
      risk: calcRiskAmount(currentBalance, riskPercent),
    }));
  };
  
  const onAddWin = () => {
    dispatch(addTrade({
      date: new Date().toISOString(),
      type: "win",
      rr: plannedRR,
      risk: calcRiskAmount(currentBalance, riskPercent),
    }));
  };

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>Настройки</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {/* Балансы */}
        <div className="grid gap-2 md:grid-cols-3">
          <div className="grid gap-1">
            <span className="text-xs opacity-60">Начальный баланс</span>
            <div className="text-base font-medium">{initialBalance}</div>
          </div>
          <div className="grid gap-1">
            <span className="text-xs opacity-60">Текущий баланс</span>
            <div className="text-base font-medium">{currentBalance}</div>
          </div>
          <div className="grid gap-1">
            <span className="text-xs opacity-60">Риск на сделку, ₽</span>
            <div className="text-base font-medium">{riskAmount}</div>
          </div>
        </div>

        {/* Поля настроек — автосохранение */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="grid gap-2">
            <Label htmlFor="riskPercent">Риск, %</Label>
            <Input
              id="riskPercent"
              type="number"
              min={0}
              max={100}
              step={1}
              value={riskPercent}
              onChange={onRiskChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="plannedRR">Плановый RR</Label>
            <Input
              id="plannedRR"
              type="number"
              step="0.1"
              min={0.1}
              value={plannedRR}
              onChange={onRRChange}
            />
          </div>
        </div>

        {/* Действия со сделками */}
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={onAddLoss}>Добавить убыток</Button>
          <Button variant="outline" onClick={onAddWin}>Добавить прибыль</Button>
          <div className="grow" />
          <Button variant="outline" onClick={() => dispatch(clearAll())}>
            Очистить все сделки
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}