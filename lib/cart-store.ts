import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  productId: string;
  slug: string;
  name: string;
  service: string;
  serviceName: string;
  price: number | "quote";
  image: string;
  qty: number;
  options?: Record<string, string>;
  notes?: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "id"> & { id?: string }) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
  totalQty: () => number;
  subtotalFixed: () => number;
}

export function buildCartItemId(
  productId: string,
  options?: Record<string, string>,
): string {
  if (!options || Object.keys(options).length === 0) return productId;
  const serialised = Object.entries(options)
    .filter(([, value]) => Boolean(value))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}:${value}`)
    .join("|");
  return serialised.length === 0 ? productId : `${productId}#${serialised}`;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (incoming) =>
        set((state) => {
          const id = incoming.id ?? buildCartItemId(incoming.productId, incoming.options);
          const existing = state.items.find((item) => item.id === id);
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.id === id ? { ...item, qty: item.qty + incoming.qty } : item,
              ),
            };
          }
          return { items: [...state.items, { ...incoming, id }] };
        }),
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
      updateQty: (id, qty) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, qty: Math.max(1, qty) } : item,
          ),
        })),
      clear: () => set({ items: [] }),
      totalQty: () => get().items.reduce((sum, item) => sum + item.qty, 0),
      subtotalFixed: () =>
        get().items.reduce(
          (sum, item) => sum + (typeof item.price === "number" ? item.price * item.qty : 0),
          0,
        ),
    }),
    { name: "fonebazar-cart", version: 2 },
  ),
);
