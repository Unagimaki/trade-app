import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppSelector } from "@/app/store";
import { selectTrades } from "@/entities/trade/model/selectors";
import TradeItem from "@/entities/trade/ui/TradeItem";

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
    <div className="space-y-7">
      {trades.map((t, index) => (
        <TradeItem key={t.id} trade={t} index={trades.length - index} />
      ))}
    </div>
  );
}
