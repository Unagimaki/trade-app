export type Trade = {
    id: string;
    date: string;
    type: "win" | "loss" | "break-even";
    direction: "long" | "short";
    rr: number; 
    risk: number; 
}