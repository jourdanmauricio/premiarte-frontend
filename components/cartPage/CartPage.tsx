"use client";

import { useState } from "react";
import { CartForm } from "@/components/cartPage/CartForm";
import { Card } from "@/components/ui/card";
import { useCartStore } from "@/store/useCartStore";
import { Product } from "@/app/shared/types";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Link } from "next-view-transitions";

const CartPage = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const products = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const { data: session } = useSession();
  const user = session?.user;

  const handleDecrement = (productId: string, currentQty: number) => {
    if (currentQty <= 1) return;
    updateQuantity(productId, currentQty - 1);
  };

  const handleIncrement = (productId: string, currentQty: number) => {
    updateQuantity(productId, currentQty + 1);
  };

  const handleQuantityChange = (productId: string, value: string) => {
    const num = parseInt(value, 10);
    if (Number.isNaN(num) || num < 1) return;
    updateQuantity(productId, num);
  };

  const handleRemove = (productId: string) => {
    removeItem(productId);
  };

  return (
    <section className="max-w-[1200px] container mx-auto mt-12 mb-20 px-4 md:px-0">
      <h2 className="text-2xl font-semibold text-orange-500">
        Solicitud de presupuesto
      </h2>

      <p className="text-slate-300 mt-8">
        Estás a un paso de solicitar tu presupuesto personalizado. Revisa los
        productos que has seleccionado y haz clic en &quot;Solicitar
        Presupuesto&quot;. Nos contactaremos contigo a la mayor brevedad para
        confirmar disponibilidades, métodos de pago y costos de envío, sin que
        esto te genere obligación de compra.
      </p>
      <div className="flex flex-col lg:flex-row gap-12 my-12">
        {/* <!-- Message sent successfully --> */}
        <Card
          className={`p-6 text-slate-900 h-fit w-full success-message ${showSuccess ? "" : "hidden"}`}
        >
          <div className="mb-6 rounded-lg p-4 text-orange-500">
            <h3 className="mb-2 text-lg font-semibold">
              Presupuesto enviado exitosamente!
            </h3>
            <p>
              Tu presupuesto ha sido enviado exitosamente. Nos pondremos en
              contacto contigo lo antes posible.
            </p>
          </div>
        </Card>

        {/* <!-- products --> */}
        <Card className="p-6 text-slate-900 h-fit w-full products-card">
          {products.length === 0 ? (
            <p className="text-white text-center">
              Aún no hay productos en el carrito
            </p>
          ) : (
            products.map((product) => (
              <article
                key={product.id}
                className="flex gap-8 mt-4 w-full border-b pb-4 border-gray-200 last:border-b-0"
                data-product-id={product.id}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  className="w-28 h-28 object-contain rounded-md border"
                  width={112}
                  height={112}
                />
                <div className="flex flex-col gap-2 justify-between items-start w-full text-white">
                  <Link
                    href={`/productos/${product.slug}`}
                    className="hover: underline"
                  >
                    {product.name}
                  </Link>
                  <div className="flex gap-2 items-center justify-between w-full">
                    <h3 className="">Cantidad</h3>
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        className="btn-quantity-decrement flex items-center justify-center w-8 h-8 cursor-pointer font-medium py-3 px-4 rounded-md shadow-sm transition-colors duration-200 
                               bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        data-product-id={product.id}
                        onClick={() =>
                          handleDecrement(product.id, product.quantity)
                        }
                        disabled={product.quantity <= 1}
                        aria-label="Disminuir cantidad"
                      >
                        -
                      </button>
                      <input
                        className="text-center w-12 h-8 border border-gray-300 rounded-md text-white mx-auto"
                        type="text"
                        min={1}
                        value={product.quantity.toString()}
                        data-product-id={product.id}
                        onChange={(e) =>
                          handleQuantityChange(product.id, e.target.value)
                        }
                        aria-label={`Cantidad de ${product.name}`}
                      />
                      <button
                        className="btn-quantity-increment flex items-center justify-center w-8 h-8 cursor-pointer font-medium py-3 px-4 rounded-md shadow-sm transition-colors duration-200 
                               bg-orange-500 hover:bg-orange-600 text-white"
                        data-product-id={product.id}
                        type="button"
                        onClick={() =>
                          handleIncrement(product.id, product.quantity)
                        }
                        aria-label="Aumentar cantidad"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    data-id={product.id}
                    className="btn-delete text-red-500 hover:text-red-600 transition-colors duration-300 hover:cursor-pointer ml-auto"
                    onClick={() => handleRemove(product.id)}
                    aria-label={`Quitar ${product.name} del carrito`}
                  >
                    Remover
                  </button>
                </div>
              </article>
            ))
          )}
          <p className="text-slate-500 ml-auto text-end mt-4">
            {/* <!-- Cantidad de productos: {products.length} --> */}
            <Link
              href="/productos"
              className="hover: underline text-orange-500"
            >
              Agregar más productos
            </Link>
          </p>
        </Card>

        {/* <!-- presupuesto --> */}
        <Card
          className={`p-6 h-fit w-full budget-form ${showSuccess ? "hidden" : ""}`}
        >
          <p className="mb-4">
            Por favor, complete los siguientes datos para solicitar su
            presupuesto.
          </p>

          <CartForm
            user={user as User}
            products={products as unknown as Product[]}
            onSuccess={() => setShowSuccess(true)}
          />
        </Card>
      </div>
    </section>
  );
};

export { CartPage };
