export type TradeType = "win" | "loss" | "break-even";
export type TradeDirection = "long" | "short" | null;
export type TradeExtraValue = string | number | null;
export type TradeExtraFields = Record<string, TradeExtraValue>;

export type Trade = {
  id: string;
  date: string;
  type?: TradeType;
  direction?: TradeDirection;
  rr?: number;
  risk?: number;
  img?: string | null;
  imgs?: string[] | null;
  extra?: TradeExtraFields;
};
