// src/app/uiSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type UIState = { previewTradeId: string | null };

const initialState: UIState = { previewTradeId: null };

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setPreviewTradeId(state, action: PayloadAction<string | null>) {
      state.previewTradeId = action.payload;
    },
  },
});

export const { setPreviewTradeId } = uiSlice.actions;
export default uiSlice.reducer;
