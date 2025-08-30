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
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>Сделки</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {trades.map((trade, index) => (
          <div
            key={trade.id}
            className={`
              transition-all duration-300 ease-in-out
              ${index === 0 ? 'animate-in fade-in slide-in-from-top-4' : ''}
            `}
          >
            <TradeItem 
              trade={trade} 
              index={trades.length - index}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}