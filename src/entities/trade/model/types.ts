export type Trade = {
    id: string;
    date: string;
    type: "win" | "loss" | "break-even";
    direction?: "long" | "short" | null;
    rr: number; 
    risk: number; 
    img?: string | null
}