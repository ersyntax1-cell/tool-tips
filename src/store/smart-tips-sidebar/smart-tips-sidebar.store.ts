import { create } from "zustand";

interface SmartTipsSidebarState {
  open: boolean;
  activeItem?: string;
  toggle: (value?: boolean, itemLabel?: string) => void;
}

export const useSmartTipsSidebarStore = create<SmartTipsSidebarState>((set) => ({
  open: false,
  activeItem: undefined,
  toggle: (value, itemLabel) =>
    set((state) => ({
      open: typeof value === "boolean" ? value : !state.open,
      activeItem: itemLabel,
    })),
}));
