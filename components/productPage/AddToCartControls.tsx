"use client";

import { useState, useMemo } from "react";
import { useCartStore } from "@/store/useCartStore";
import { Link } from "next-view-transitions";

export type ProductVariant = {
  id: string;
  attributes: string[];
  values: string[];
};

type AddToCartControlsProps = {
  product: {
    id: string;
    name: string;
    slug: string;
    image: string;
  };
  variants?: ProductVariant[];
  isCustomizable?: boolean;
};

/**
 * Variantes que coinciden con la selección actual en todos los atributos excepto attrIndex.
 * (Si selectedValues[j] está vacío, no filtra por ese atributo.)
 */
function getMatchingVariants(
  variants: ProductVariant[],
  selectedValues: string[],
  attrIndex: number,
): ProductVariant[] {
  return variants.filter((v) =>
    v.values.every(
      (val, j) =>
        j === attrIndex ||
        selectedValues[j] === "" ||
        selectedValues[j] === val,
    ),
  );
}

/** Valores disponibles para el atributo attrIndex según la selección en el resto. */
function getAvailableOptionsForAttribute(
  variants: ProductVariant[],
  selectedValues: string[],
  attrIndex: number,
): string[] {
  if (variants.length === 0) return [];
  const matching = getMatchingVariants(variants, selectedValues, attrIndex);
  const set = new Set(matching.map((v) => v.values[attrIndex]));
  return Array.from(set);
}

/** Todos los valores únicos por atributo (orden estable para no mover opciones). */
function getAllValuesByAttribute(variants: ProductVariant[]): string[][] {
  if (variants.length === 0) return [];
  const n = variants[0].attributes.length;
  const result: string[][] = [];
  for (let i = 0; i < n; i++) {
    const set = new Set(variants.map((v) => v.values[i]));
    result.push(Array.from(set));
  }
  return result;
}

function findVariantByValues(
  variants: ProductVariant[],
  selectedValues: string[],
): ProductVariant | null {
  return (
    variants.find((v) =>
      v.values.every((val, i) => val === selectedValues[i]),
    ) ?? null
  );
}

const AddToCartControls = ({
  product,
  variants = [],
  isCustomizable = false,
}: AddToCartControlsProps) => {
  const [localQuantity, setLocalQuantity] = useState(1);
  const [customText, setCustomText] = useState("");
  const { items, addItem, updateQuantity, removeItem } = useCartStore();

  const hasVariants = variants.length > 0;
  const attributeNames = useMemo(
    () => (hasVariants ? variants[0].attributes : []),
    [hasVariants, variants],
  );

  const [selectedValues, setSelectedValues] = useState<string[]>(() =>
    hasVariants ? variants[0].attributes.map(() => "") : [],
  );

  /** Todas las opciones por atributo (orden fijo, no cambian de lugar). */
  const allOptionsByAttribute = useMemo(
    () => getAllValuesByAttribute(variants),
    [variants],
  );

  /** Conjunto de valores disponibles por atributo (para inhabilitar los que no). */
  const availableSetByAttribute = useMemo(
    () =>
      attributeNames.map(
        (_, attrIndex) =>
          new Set(
            getAvailableOptionsForAttribute(
              variants,
              selectedValues,
              attrIndex,
            ),
          ),
      ),
    [variants, selectedValues, attributeNames],
  );

  const allAttributesSelected =
    hasVariants &&
    selectedValues.length === attributeNames.length &&
    selectedValues.every((v) => v !== "");

  const selectedVariant = useMemo(
    () =>
      hasVariants && allAttributesSelected
        ? findVariantByValues(variants, selectedValues)
        : null,
    [hasVariants, allAttributesSelected, variants, selectedValues],
  );

  const lineId = hasVariants ? (selectedVariant?.id ?? null) : product.id;
  const cartItem = lineId ? items.find((item) => item.id === lineId) : null;
  const isInCart = !!cartItem;

  const displayQuantity = isInCart ? cartItem.quantity : localQuantity;

  const handleDecrement = () => {
    if (!lineId) return;
    if (isInCart) {
      if (cartItem.quantity <= 1) {
        removeItem(lineId);
      } else {
        updateQuantity(lineId, cartItem.quantity - 1);
      }
    } else {
      setLocalQuantity((prev) => Math.max(1, prev - 1));
    }
  };

  const handleIncrement = () => {
    if (!lineId) return;
    if (isInCart) {
      updateQuantity(lineId, cartItem.quantity + 1);
    } else {
      setLocalQuantity((prev) => prev + 1);
    }
  };

  const handleAddToCart = () => {
    const variantId = selectedVariant?.id ?? null;
    addItem(
      {
        id: variantId ?? product.id,
        productId: product.id,
        variantId,
        name: product.name,
        slug: product.slug,
        image: product.image,
        attributes: selectedVariant?.attributes ?? null,
        values: selectedVariant?.values ?? null,
        customText: customText.trim() ? customText.trim() : null,
      },
      localQuantity,
    );
    setLocalQuantity(1);
    setCustomText("");
  };

  const setAttributeValue = (attrIndex: number, value: string) => {
    setSelectedValues((prev) => {
      const next = [...prev];
      next[attrIndex] = value;
      // Si al cambiar este atributo algún otro valor seleccionado ya no está disponible, limpiarlo.
      for (let j = 0; j < next.length; j++) {
        if (j === attrIndex) continue;
        const available = getAvailableOptionsForAttribute(variants, next, j);
        if (next[j] !== "" && !available.includes(next[j])) {
          next[j] = "";
        }
      }
      return next;
    });
  };

  return (
    <>
      {hasVariants && (
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold">Opciones</h3>
          {attributeNames.map((attrName, attrIndex) => (
            <div key={attrName} className="flex flex-col gap-1">
              <span className="text-sm text-muted-foreground">{attrName}</span>
              <div className="flex flex-wrap gap-2">
                {allOptionsByAttribute[attrIndex]?.map((value) => {
                  const isAvailable =
                    availableSetByAttribute[attrIndex]?.has(value);
                  const isSelected = selectedValues[attrIndex] === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      disabled={!isAvailable}
                      onClick={() =>
                        isAvailable && setAttributeValue(attrIndex, value)
                      }
                      className={`rounded border px-3 py-1.5 text-sm transition-colors ${
                        !isAvailable
                          ? "cursor-not-allowed border-dotted border-gray-500 bg-transparent opacity-60"
                          : isSelected
                            ? "border-orange-500 bg-orange-500/20 text-orange-500"
                            : "border-gray-400 bg-transparent hover:border-orange-500/50"
                      }`}
                    >
                      {value}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {isCustomizable && (
        <div className="flex flex-col gap-2">
          <label
            htmlFor="custom-text"
            className="font-semibold text-sm text-muted-foreground"
          >
            Texto personalizado{" "}
            <span className="font-normal text-xs">(opcional)</span>
          </label>
          <textarea
            id="custom-text"
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm bg-transparent text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-400 transition-colors resize-none"
            rows={2}
            placeholder="Escribí aquí el texto que querés personalizar en tu producto"
            maxLength={250}
          />
        </div>
      )}

      <div className="flex flex-col gap-2">
        <h3 className="font-semibold">Cantidad</h3>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={handleDecrement}
            className="btn-quantity w-8 h-8"
            disabled={!lineId}
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
            disabled={!lineId}
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
          disabled={hasVariants ? !selectedVariant : false}
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
