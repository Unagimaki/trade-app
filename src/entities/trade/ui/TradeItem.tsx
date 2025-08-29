import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Trade } from "@/entities/trade/model/types";
import { useAppDispatch } from "@/app/store";
import { removeTrade } from "@/entities/trade/model/slice";

function formatDate(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleString();
  } catch {
    return iso;
  }
}

function computePnl(t: Trade) {
  if (t.type === "win") return t.rr * t.risk;
  if (t.type === "loss") return -t.risk;
  return 0;
}

function formatMoney(n: number) {
  return (Math.round(n * 100) / 100).toFixed(2);
}

export default function TradeItem({ trade, index }: { trade: Trade, index: number }) {
  const dispatch = useAppDispatch();
  const pnl = computePnl(trade);
  const pnlClass = pnl > 0 ? "text-green-600" : pnl < 0 ? "text-red-600" : "text-muted-foreground";
  
  return (
    <Card className="rounded-2xl">
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base">Сделка {index}</CardTitle>
        <div className="flex items-center gap-2">
          <div className="text-xs text-muted-foreground">{formatDate(trade.date)}</div>
          <Button variant="outline" size="sm" onClick={() => dispatch(removeTrade(trade.id))}>
            Удалить
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2 md:grid-cols-5 text-sm">
          <div>
            <span className="opacity-60">Тип:</span>{" "}
            <b className={trade.type === "win" ? "text-green-600" : trade.type === "loss" ? "text-red-600" : ""}>
              {trade.type}
            </b>
          </div>
          <div>
            <span className="opacity-60">Направление:</span>{" "}
            <b>{trade.direction ? trade.direction.toUpperCase() : "—"}</b>
          </div>
          <div>
            <span className="opacity-60">RR:</span> <b>{trade.rr}</b>
          </div>
          <div>
            <span className="opacity-60">Риск, ₽:</span> <b>{formatMoney(trade.risk)}</b>
          </div>
          <div>
            <span className="opacity-60">PnL, ₽:</span>{" "}
            <b className={pnlClass}>{formatMoney(pnl)}</b>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
