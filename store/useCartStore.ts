import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  /** Identificador único de la línea: variantId si hay variante, sino productId */
  id: string;
  productId: string;
  variantId: string | null;
  name: string;
  slug: string;
  image: string;
  quantity: number;
  attributes: string[] | null;
  values: string[] | null;
  customText: string | null;
}

export type AddToCartItem = Omit<CartItem, "quantity">;

interface CartStore {
  items: CartItem[];
  addItem: (item: AddToCartItem, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
}

function normalizeCartItem(raw: Partial<CartItem> & { quantity: number }): CartItem {
  const productId = raw.productId ?? raw.id ?? "";
  const variantId = raw.variantId ?? null;
  const id = variantId ?? String(productId);
  return {
    id,
    productId: String(productId),
    variantId,
    name: raw.name ?? "",
    slug: raw.slug ?? "",
    image: raw.image ?? "",
    quantity: raw.quantity,
    attributes: raw.attributes ?? null,
    values: raw.values ?? null,
    customText: raw.customText ?? null,
  };
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item, quantity = 1) =>
        set((state) => {
          const productId = String(item.productId);
          const variantId = item.variantId ?? null;
          const lineId = variantId ?? productId;
          const existing = state.items.find((i) => i.id === lineId);
          const newItem = normalizeCartItem({
            ...item,
            productId,
            variantId,
            id: lineId,
            quantity: existing ? existing.quantity + quantity : quantity,
          });
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === lineId ? newItem : i,
              ),
            };
          }
          return { items: [...state.items, newItem] };
        }),
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        })),
      clearCart: () => set({ items: [] }),
      getTotalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({ items: state.items }),
      merge: (persisted, current) => ({
        ...current,
        items: ((persisted as { items?: (Partial<CartItem> & { quantity: number })[] })?.items ?? current.items).map(
          (item) => normalizeCartItem(item),
        ),
      }),
    },
  ),
);
