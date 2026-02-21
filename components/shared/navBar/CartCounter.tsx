"use client";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useRouter } from "next/navigation";
export const CartCounter = () => {
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  const router = useRouter();

  return (
    <div className="relative" onClick={() => router.push("/presupuesto")}>
      <ShoppingCart className="h-6 w-6" />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </div>
  );
};
