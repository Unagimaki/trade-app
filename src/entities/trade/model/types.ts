export type Trade = {
    id: string;
    date: string;
    type: "win" | "loss" | "break-even";
    direction: "long" | "short";
    rr: number; // риск-ревард, напр. 2
    risk: number; // сумма риска, напр. 10
}