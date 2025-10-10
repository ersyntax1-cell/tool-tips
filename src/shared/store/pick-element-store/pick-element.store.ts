import { create } from "zustand";

interface PickStore {
  pickMode: boolean;
  pickedSelector: string | null;
  title: string;
  description: string;
  image: File | null;

  setPickMode: (value: boolean) => void;
  setPickedSelector: (selector: string | null) => void;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setImage: (file: File | null) => void;
}

export const usePickElementStore = create<PickStore>((set) => ({
  pickMode: false,
  pickedSelector: null,
  title: "",
  description: "",
  image: null,

  setPickMode: (value) => set({ pickMode: value }),
  setPickedSelector: (selector) => set({ pickedSelector: selector }),
  setTitle: (title) => set({ title }),
  setDescription: (description) => set({ description }),
  setImage: (file) => set({ image: file }),
}));
