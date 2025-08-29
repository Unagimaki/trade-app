import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button"; // подключим, когда добавим сохранение
import { useAppSelector } from "@/app/store";
import { selectInitialBalance, selectRiskPercent, selectPlannedRR } from "@/entities/settings/model/slice";

export default function SettingsPanel() {
  const initialBalance = useAppSelector(selectInitialBalance);
  const riskPercent    = useAppSelector(selectRiskPercent);
  const plannedRR      = useAppSelector(selectPlannedRR);

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>Настройки</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-3">
        <div className="grid gap-2">
          <Label htmlFor="initialBalance">Начальный баланс</Label>
          <Input id="initialBalance" type="number" defaultValue={initialBalance} disabled />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="riskPercent">Риск, %</Label>
          <Input id="riskPercent" type="number" step="1" min="0" max="100" defaultValue={riskPercent} disabled />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="plannedRR">Плановый RR</Label>
          <Input id="plannedRR" type="number" step="0.1" defaultValue={plannedRR} disabled />
        </div>

        {/* <div className="md:col-span-3">
          <Button>Сохранить</Button>
        </div> */}
      </CardContent>
    </Card>
  );
}
