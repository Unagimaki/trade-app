import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type UIState = { previewImg: string | null };

const initialState: UIState = { previewImg: null };

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setPreviewImg(state, action: PayloadAction<string | null>) {
      state.previewImg = action.payload;
    },
  },
});

export const { setPreviewImg } = uiSlice.actions;
export default uiSlice.reducer;
