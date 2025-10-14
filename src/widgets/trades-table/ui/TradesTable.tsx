import { useAppDispatch, useAppSelector } from "@/app/store";
import { selectTrades } from "@/entities/trade/model/selectors";
import { Button } from "@/components/ui/button";
import { TradeTableRow } from "./TradeTableRow";
import { addTradeColumn } from "@/entities/trade/model/slice";

export function TradesTable() {
  const dispatch = useAppDispatch();
  const trades = useAppSelector(selectTrades);

  if (!trades.length) {
    return (
      <div className="text-center text-muted-foreground py-8">
        Пока нет сделок
      </div>
    );
  }

  const baseKeys = ["type", "direction", "rr", "risk", "date", "img"];
  const extraKeys = Array.from(
    new Set(trades.flatMap((t) => t.extra ? Object.keys(t.extra) : []))
  );
  const allKeys = [...baseKeys, ...extraKeys]; 

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center mb-3">
      <h2 className="text-lg font-semibold">Сделки</h2>
      <div className="flex gap-2">
        <Button
          size="sm"
          onClick={() => {
            const name = prompt("Введите название новой колонки:");
            if (name) dispatch(addTradeColumn(name));
          }}
        >
          + Колонка
        </Button>
      </div>
    </div>

      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b text-left">
            {allKeys.map((key) => (
              <th key={key} className="px-2 py-1 capitalize">
                {key}
              </th>
            ))}
            <th className="px-2 py-1">Действия</th>
          </tr>
        </thead>

        <tbody>
          {trades.map((trade) => (
            <TradeTableRow key={trade.id} trade={trade} allKeys={allKeys} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
