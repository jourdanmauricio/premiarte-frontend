"use client";

import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";

type AddToCartControlsProps = {
  product: {
    id: string;
    name: string;
    slug: string;
    image: string;
  };
};

const AddToCartControls = ({ product }: AddToCartControlsProps) => {
  const [localQuantity, setLocalQuantity] = useState(1);
  const { items, addItem, updateQuantity, removeItem } = useCartStore();

  const cartItem = items.find((item) => item.id === product.id);
  const isInCart = !!cartItem;

  // Cantidad mostrada: del store si está en carrito, local si no
  const displayQuantity = isInCart ? cartItem.quantity : localQuantity;

  const handleDecrement = () => {
    if (isInCart) {
      if (cartItem.quantity <= 1) {
        removeItem(product.id);
      } else {
        updateQuantity(product.id, cartItem.quantity - 1);
      }
    } else {
      setLocalQuantity((prev) => Math.max(1, prev - 1));
    }
  };

  const handleIncrement = () => {
    if (isInCart) {
      updateQuantity(product.id, cartItem.quantity + 1);
    } else {
      setLocalQuantity((prev) => prev + 1);
    }
  };

  const handleAddToCart = () => {
    addItem(product, localQuantity);
    setLocalQuantity(1);
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold">Cantidad</h3>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={handleDecrement}
            className="btn-quantity w-8 h-8"
          >
            -
          </button>
          <input
            className="text-center w-12 h-8 border border-gray-300 rounded-md"
            type="text"
            readOnly
            value={displayQuantity}
          />
          <button
            type="button"
            onClick={handleIncrement}
            className="btn-quantity w-8 h-8"
          >
            +
          </button>
        </div>
      </div>

      {!isInCart ? (
        <button
          type="button"
          onClick={handleAddToCart}
          className="text-lg font-semibold bg-orange-500 rounded-sm flex items-center justify-center
            hover:bg-orange-500/80 transition-all duration-300 hover:cursor-pointer text-white py-2 w-full
            disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          Añadir al carrito de presupuesto
        </button>
      ) : (
        <div className="flex gap-4">
          <Link
            href="/productos"
            className="text-lg font-semibold bg-orange-500 rounded-sm flex items-center justify-center
              hover:bg-orange-500/80 transition-all duration-300 hover:cursor-pointer text-white py-2 flex-1"
          >
            Agregar otros productos
          </Link>
          <Link
            href="/presupuesto"
            className="text-lg font-semibold bg-blue-500 rounded-sm flex items-center justify-center
              hover:bg-blue-500/80 transition-all duration-300 hover:cursor-pointer text-white py-2 flex-1"
          >
            Ver carrito
          </Link>
        </div>
      )}
    </>
  );
};

export { AddToCartControls };
