import { Button } from "@/components/ui/button";
import { updateTradeField, removeTrade } from "@/entities/trade/model/slice";
import { useAppDispatch } from "@/app/store";
import type { Trade } from "@/entities/trade/model/types";

interface TradeTableRowProps {
  trade: Trade;
  allKeys: string[];
}

export function TradeTableRow({ trade, allKeys }: TradeTableRowProps) {
  const dispatch = useAppDispatch();
  console.log(`render ${trade.id}`);
  
  const handleChange = (
    field: string,
    value: string | number | null
  ) => {
    dispatch(updateTradeField({ id: trade.id, field: field as any, value }));
  };

  return (
    <tr className="border-b hover:bg-muted/40">
      {allKeys.map((key) => {
        const value =
          key in trade
            ? (trade as any)[key]
            : trade.extra?.[key] ?? "";

        return (
          <td key={key} className="px-2 py-1">
            <input
              value={value ?? ""}
              onChange={(e) =>
                handleChange(key, e.target.value)
              }
              className="w-full bg-transparent outline-none border border-transparent focus:border-primary rounded-sm px-1 py-0.5"
            />
          </td>
        );
      })}

      <td className="px-2 py-1 text-center">
        <Button
          size="sm"
          variant="destructive"
          onClick={() => dispatch(removeTrade(trade.id))}
        >
          ×
        </Button>
      </td>
    </tr>
  );
}
