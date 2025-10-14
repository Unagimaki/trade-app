import { useAppDispatch } from "@/app/store";
import { Button } from "@/components/ui/button";
import { updateTradeField, removeTrade } from "@/entities/trade/model/slice";
import type { Trade } from "@/entities/trade/model/types";
import React from "react";

interface TradeTableRowProps {
  trade: Trade;
  columns: string[];
}

export const TradeTableRow = React.memo( ({ trade, columns }: TradeTableRowProps) => {
    const dispatch = useAppDispatch();
    
    const handleChange = (field: string, value: string | number | null) => {
      dispatch(updateTradeField({ id: trade.id, field: field as keyof Trade, value }));
    };

    const handleRemove = () => {
      dispatch(removeTrade(trade.id));
    };

    return (
      <tr className="border-b hover:bg-muted/40 transition-colors">
        {columns.map((key) => {
          const value = (trade as any)[key] ?? ""; // динамический доступ
          return (
            <td key={key} className="px-2 py-1 text-center">
              <input
                type="text"
                className="w-full bg-transparent outline-none border border-transparent focus:border-primary rounded-sm px-1 py-0.5"
                value={value}
                onChange={(e) => handleChange(key, e.target.value)}
              />
            </td>
          );
        })}
        <td className="px-2 py-1 text-center">
          <Button
            size="sm"
            variant="destructive"
            className="h-7"
            onClick={handleRemove}
          >
            ×
          </Button>
        </td>
      </tr>
    );
  },
  (prev, next) => prev.trade === next.trade && prev.columns === next.columns
);
