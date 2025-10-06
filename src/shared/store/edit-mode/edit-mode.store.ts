import { create } from "zustand";
import type { TourItemProps } from "../../types/tour-item/tour-item.type";

interface EditModeState {
  editMode: boolean;
  currentTip: TourItemProps | null;
  setEditMode: (value: boolean) => void;
  setCurrentTip: (tip: TourItemProps | null) => void;
  resetEdit: () => void;
}

export const useEditModeStore = create<EditModeState>((set) => ({
  editMode: false,
  currentTip: null,
  setEditMode: (value) => set({ editMode: value }),
  setCurrentTip: (tip) => set({ currentTip: tip }),
  resetEdit: () => set({ editMode: false, currentTip: null }),
}));
