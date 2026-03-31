import ScreenshotPreview from "@/features/view-screen-preview/ui/ScreenshotPreview";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  addTableColumn,
  addTableRow,
  removeTableColumn,
  removeTableRow,
  setTableColumnImage,
  updateTableCell,
} from "@/entities/table/model/slice";
import { selectTableById } from "@/entities/table/model/selectors";
import { useRouter } from "@/shared/hooks/use-router";
import { TradeTableEditor } from "@/widgets/trade-table-editor";
import { TradeTableToolbar } from "@/widgets/trade-table-toolbar";
import { useParams } from "react-router-dom";

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

  const handleMakeColumnImage = (columnKey: string) => {
    dispatch(setTableColumnImage({ tableId, columnKey }));
  };

  const handleRemoveColumn = (columnKey: string) => {
    dispatch(removeTableColumn({ tableId, columnKey }));
  };

  const handleChangeCell = (rowId: string, field: string, value: string) => {
    dispatch(updateTableCell({ tableId, rowId, field, value: parseInputValue(value) }));
  };

  const handleRemoveRow = (rowId: string) => {
    dispatch(removeTableRow({ tableId, rowId }));
  };

  return (
    <div className="space-y-4">
      <TradeTableToolbar
        title={table.name}
        columnsCount={table.columns.length}
        rowsCount={table.rows.length}
        onBack={goBack}
        onAddColumn={handleAddColumn}
        onAddRow={handleAddRow}
      />

      <TradeTableEditor
        tableId={tableId}
        table={table}
        onChangeCell={handleChangeCell}
        onMakeColumnImage={handleMakeColumnImage}
        onRemoveRow={handleRemoveRow}
        onRemoveColumn={handleRemoveColumn}
      />

      <ScreenshotPreview />
    </div>
  );
};
