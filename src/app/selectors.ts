import { type RootState } from "@/app/store";

export const selectPreviewImg = (state: RootState) => state.ui.previewImg;
