import type { RootState } from "@/app/store";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface SettingsState {
  initialBalance: number; 
  riskPercent: number;    
  plannedRR: number;      
}

const initialState: SettingsState = {
  initialBalance: 1000,
  riskPercent: 1,
  plannedRR: 2,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setInitialBalance: (state, action: PayloadAction<number>) => {
      state.initialBalance = Math.max(0, action.payload);
    },
    setRiskPercent: (state, action: PayloadAction<number>) => {
      state.riskPercent = action.payload;
    },
    setPlannedRR: (state, action: PayloadAction<number>) => {
      state.plannedRR = action.payload;
    },
  },
});

export const { setInitialBalance, setRiskPercent, setPlannedRR } = settingsSlice.actions;
export default settingsSlice.reducer;

export const selectSettings       = (s: RootState) => s.settings;
export const selectInitialBalance = (s: RootState) => s.settings.initialBalance;
export const selectRiskPercent    = (s: RootState) => s.settings.riskPercent; // целое %
export const selectPlannedRR      = (s: RootState) => s.settings.plannedRR;

// Удобная производная: доля риска для формул (0.01 для 1%)
export const selectRiskFraction = (s: RootState) => s.settings.riskPercent / 100;
