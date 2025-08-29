// src/widgets/trades-list/ui/TradesList.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppSelector } from "@/app/store";
import { selectTrades } from "@/entities/trade/model/selectors"; // должен возвращать Trade[]

function formatDate(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleString();
  } catch {
    return iso;
  }
}

function computePnl(t: { type: "win" | "loss" | "break-even"; rr: number; risk: number }) {
  if (t.type === "win") return t.rr * t.risk;      // прибыль = RR * риск
  if (t.type === "loss") return -t.risk;           // убыток = -риск
  return 0;                                        // BE
}

function typeLabel(t: "win" | "loss" | "break-even") {
  if (t === "win") return "Профит";
  if (t === "loss") return "Убыток";
  return "Ноль";
}

export default function TradesList() {
  const trades = useAppSelector(selectTrades);

  if (!trades.length) {
    return (
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Сделки</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Пока пусто. Добавь первую сделку.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {trades.map((t) => {
        const pnl = computePnl(t);
        const pnlClass =
          pnl > 0 ? "text-green-600" : pnl < 0 ? "text-red-600" : "text-muted-foreground";

        return (
          <Card key={t.id} className="rounded-2xl">
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle className="text-base">Сделка {t.id.slice(-6)}</CardTitle>
              <div className="text-xs text-muted-foreground">{formatDate(t.date)}</div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 md:grid-cols-5 text-sm">
                <div>
                  <span className="opacity-60">Тип:</span>{" "}
                  <b className={t.type === "win" ? "text-green-600" : t.type === "loss" ? "text-red-600" : ""}>
                    {typeLabel(t.type)}
                  </b>
                </div>
                <div>
                  <span className="opacity-60">Направление:</span> <b>{t.direction.toUpperCase()}</b>
                </div>
                <div>
                  <span className="opacity-60">RR:</span> <b>{t.rr}</b>
                </div>
                <div>
                  <span className="opacity-60">Риск, ₽:</span> <b>{t.risk}</b>
                </div>
                <div>
                  <span className="opacity-60">PnL, ₽:</span>{" "}
                  <b className={pnlClass}>{pnl}</b>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
