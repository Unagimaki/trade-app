import { useAppDispatch, useAppSelector } from "@/app/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { addTableColumn, addTableRow, removeTableRow, updateTableCell } from "@/entities/table/model/slice";
import { selectTableById } from "@/entities/table/model/selectors";
import { useRouter } from "@/shared/hooks/use-router";
import type { TradeExtraValue } from "@/entities/trade/model/types";
import { useParams } from "react-router-dom";

function getTradeCellValue(trade: { [key: string]: unknown; extra?: Record<string, TradeExtraValue> }, key: string) {
  if (key in trade) {
    const value = trade[key];
    return value ?? "";
  }

  return trade.extra?.[key] ?? "";
}

function parseInputValue(rawValue: string) {
  const trimmed = rawValue.trim();
  if (trimmed === "") return null;

  const numericValue = Number(trimmed);
  if (!Number.isNaN(numericValue) && trimmed === String(numericValue)) {
    return numericValue;
  }

  return rawValue;
}

export const TradeTablePage = () => {
  const { tableId } = useParams();
  const { goBack } = useRouter();
  const dispatch = useAppDispatch();

  const table = useAppSelector((state) =>
    tableId ? selectTableById(state, tableId) : null
  );

  if (!tableId || !table) {
    return (
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Таблица не найдена</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-slate-400">
            Проверьте ссылку или вернитесь к списку таблиц.
          </p>
          <Button variant="outline" onClick={goBack}>
            Назад
          </Button>
        </CardContent>
      </Card>
    );
  }

  const handleAddRow = () => {
    dispatch(addTableRow({ tableId }));
  };

  const handleAddColumn = () => {
    const key = prompt("Введите ключ новой колонки");
    if (!key) return;
    dispatch(addTableColumn({ tableId, key }));
  };

  const handleChangeCell = (tradeId: string, field: string, value: string) => {
    dispatch(updateTableCell({ tableId, tradeId, field, value: parseInputValue(value) }));
  };

  const handleRemoveRow = (tradeId: string) => {
    dispatch(removeTableRow({ tableId, tradeId }));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#f8fafc]">{table.name}</h1>
          <p className="mt-1 text-sm text-slate-400">
            {table.columns.length} cols • {table.trades.length} rows
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={goBack}>
            К списку
          </Button>
          <Button variant="outline" onClick={handleAddColumn}>
            Добавить колонку
          </Button>
          <Button onClick={handleAddRow}>Добавить строку</Button>
        </div>
      </div>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Таблица</CardTitle>
        </CardHeader>
        <CardContent>
          {table.trades.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[#475569] bg-[#0f172a]/60 px-4 py-8 text-center text-sm text-slate-400">
              В таблице пока нет строк. Добавьте первую строку.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-[#334155]">
                    {table.columns.map((column) => (
                      <th key={column.key} className="px-2 py-2 text-left font-medium text-slate-300">
                        {column.label}
                      </th>
                    ))}
                    <th className="px-2 py-2 text-left font-medium text-slate-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {table.trades.map((trade) => (
                    <tr key={trade.id} className="border-b border-[#1e293b] align-top">
                      {table.columns.map((column) => {
                        const value = getTradeCellValue(trade as never, column.key);

                        return (
                          <td key={column.key} className="px-2 py-2">
                            <input
                              type="text"
                              className="w-full rounded-md border border-transparent bg-transparent px-2 py-1 outline-none transition-colors focus:border-[#3b82f6]"
                              value={String(value ?? "")}
                              onChange={(event) => handleChangeCell(trade.id, column.key, event.target.value)}
                            />
                          </td>
                        );
                      })}
                      <td className="px-2 py-2">
                        <Button variant="destructive" size="sm" onClick={() => handleRemoveRow(trade.id)}>
                          Удалить
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
