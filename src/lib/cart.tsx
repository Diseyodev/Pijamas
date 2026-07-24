import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Product } from "./products";

export type CartItem = { product: Product; size: string; quantity: number };

const keyOf = (id: string, size: string) => `${id}::${size}`;

type CartCtx = {
  items: CartItem[];
  add: (p: Product, size: string) => void;
  remove: (id: string, size: string) => void;
  setQty: (id: string, size: string, q: number) => void;
  clear: () => void;
  count: number;
  total: number;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const add = (p: Product, size: string) =>
    setItems((prev) => {
      const k = keyOf(p.id, size);
      const found = prev.find((i) => keyOf(i.product.id, i.size) === k);
      if (found)
        return prev.map((i) =>
          keyOf(i.product.id, i.size) === k ? { ...i, quantity: i.quantity + 1 } : i,
        );
      return [...prev, { product: p, size, quantity: 1 }];
    });

  const remove = (id: string, size: string) =>
    setItems((prev) => prev.filter((i) => !(i.product.id === id && i.size === size)));
  const setQty = (id: string, size: string, q: number) =>
    setItems((prev) =>
      prev
        .map((i) =>
          i.product.id === id && i.size === size ? { ...i, quantity: Math.max(0, q) } : i,
        )
        .filter((i) => i.quantity > 0),
    );
  const clear = () => setItems([]);

  const { count, total } = useMemo(() => {
    let c = 0;
    let t = 0;
    for (const i of items) {
      c += i.quantity;
      t += i.quantity * i.product.price;
    }
    return { count: c, total: t };
  }, [items]);

  return <Ctx.Provider value={{ items, add, remove, setQty, clear, count, total }}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}