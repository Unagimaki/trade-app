import { useAppDispatch, useAppSelector } from "@/app/store";
import { Button } from "@/components/ui/button";
import { TradeTableRow } from "./TradeTableRow";
import { addTradeColumn } from "@/entities/trade/model/slice";

export function TradesTable() {
  const dispatch = useAppDispatch();
  const { items: trades, columns } = useAppSelector((state) => state.trades);

  const handleAddColumn = () => {
    const name = prompt("Введите название новой колонки:");
    if (name) dispatch(addTradeColumn(name));
  };

  if (!trades.length) {
    return (
      <div className="text-center text-muted-foreground py-8">
        Пока нет сделок
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">Сделки</h2>
        <div className="flex gap-2">
          <Button size="sm" onClick={handleAddColumn}>
            + Колонка
          </Button>
        </div>
      </div>

      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b text-left">
            {columns.map((key) => (
              <th key={key} className="px-2 py-1 capitalize text-center">
                {key}
              </th>
            ))}
            <th className="px-2 py-1 text-center">Действия</th>
          </tr>
        </thead>

        <tbody>
          {trades.map((trade) => (
            <TradeTableRow
              key={trade.id}
              trade={trade}
              columns={columns}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
