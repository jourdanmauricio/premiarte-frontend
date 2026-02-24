import { ProductsCard } from "@/components/shared/ProductsCard";
import SecondaryButton from "@/components/shared/SecondaryButton";
import Subtitle from "@/components/shared/Subtitle";
import { FeaturedProductsSettings, Product } from "@/app/shared/types";

type FeaturedProductsProps = {
  featuredProducts: FeaturedProductsSettings;
  products: Product[];
};

const FeaturedProducts = ({
  featuredProducts,
  products,
}: FeaturedProductsProps) => {
  return (
    <>
      <section className="section-container">
        <Subtitle subtitle="¿Cómo solicitar tu presupuesto?" />

        <div className="flex flex-wrap justify-center gap-8 pt-24">
          <div className="max-w-[350px]">
            <p className="text-3xl">1️⃣</p>
            <p className="font-semibold mt-2 text-orange-300 text-xl">
              Elegí tus productos:
            </p>
            <p className="text-muted-foreground mt-2 text-lg">
              Explorá nuestros trofeos, medallas y reconocimientos
              personalizados
            </p>
          </div>
          <div className="max-w-[350px]">
            <p className="text-3xl">2️⃣</p>
            <p className="font-semibold mt-2 text-orange-300 text-xl">
              Agregalos al carrito:
            </p>
            <p className="text-muted-foreground mt-2 text-lg">
              Usá el carrito como una lista de pedido. No es compromiso de
              compra
            </p>
          </div>
          <div className="max-w-[350px]">
            <p className="text-3xl">3️⃣</p>
            <p className="font-semibold mt-2 text-orange-300 text-xl">
              Enviá tu solicitud:
            </p>
            <p className="text-muted-foreground mt-2 text-lg">
              Completá tus datos y recibí un presupuesto personalizado en poco
              tiempo
            </p>
          </div>
        </div>
      </section>

      <section className="section-container">
        <div className="flex flex-col items-center gap-12 lg:gap-12">
          <div className="text-center w-full">
            <Subtitle subtitle={featuredProducts.title} />
            {featuredProducts.text && (
              <p className="my-8 text-center text-xl font-normal tracking-tight text-muted-foreground md:text-xl">
                {featuredProducts.text || "Productos destacados"}
              </p>
            )}

            <div className="flex flex-wrap justify-center gap-8 pt-16">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="img-appear group border border-orange-50/10 rounded-sm relative w-64 shadow-xl transition-all duration-300 hover:drop-shadow-3xl hover:shadow-orange-200/10"
                >
                  <ProductsCard product={product} />
                </div>
              ))}
            </div>

            <p className="my-16 mb-12 text-center text-xl font-normal tracking-tight text-muted-foreground md:text-xl">
              Agregá este producto al carrito para pedir tu presupuesto.
              Seleccioná los productos que te interesen y solicitá tu cotización
            </p>

            <div className="text-center">
              <SecondaryButton
                label={featuredProducts.buttonText || "Ver Productos"}
                href={featuredProducts.buttonLink || "/productos"}
                className="px-8 py-6 text-lg font-semibold text-white min-w-40"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturedProducts;
