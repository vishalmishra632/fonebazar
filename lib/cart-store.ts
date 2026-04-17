import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ServiceSlug } from "./data/site";

export interface CartItem {
  id: string;
  name: string;
  service: ServiceSlug | string;
  price?: number;
  qty: number;
  image?: string;
  notes?: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
  totalQty: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, qty: i.qty + item.qty } : i,
              ),
            };
          }
          return { items: [...state.items, item] };
        }),
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      updateQty: (id, qty) =>
        set((state) => ({
          items: state.items.map((i) => (i.id === id ? { ...i, qty } : i)),
        })),
      clear: () => set({ items: [] }),
      totalQty: () => get().items.reduce((sum, i) => sum + i.qty, 0),
    }),
    { name: "fonebazar-cart" },
  ),
);
