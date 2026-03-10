import Link from "next/link";
import { notFound } from "next/navigation";
import { Category as CategoryType, Product } from "@/app/shared/types";
import { ProductImageGallery } from "@/components/productPage/ProductImageGallery";
import { AddToCartControls } from "@/components/productPage/AddToCartControls";
import { ProductsCard } from "@/components/shared/ProductsCard";
import Subtitle from "@/components/shared/Subtitle";

const apiUrl = process.env.API_URL;

const ProductPage = async ({ slug }: { slug: string }) => {
  const product = await fetch(`${apiUrl}/products/slug/${slug}`, {
    next: {
      tags: [`product-${slug}`],
    },
  });

  if (!product.ok) {
    notFound();
  }

  const productDetails = await product.json();

  // El backend devuelve relacionados en relatedFrom[].relatedProduct (imágenes anidadas en .image)
  const relatedFrom = Array.isArray(productDetails.relatedFrom)
    ? productDetails.relatedFrom
    : [];
  const relatedProducts: Product[] = relatedFrom
    .map((item: { relatedProduct?: Record<string, unknown> }) => {
      const p = item.relatedProduct;
      if (!p || typeof p !== "object") return null;
      const images = (Array.isArray(p.images) ? p.images : [])
        .map((im: { image?: { id: number; url: string; alt: string } }) =>
          im?.image
            ? { id: im.image.id, url: im.image.url, alt: im.image.alt }
            : null,
        )
        .filter(Boolean) as { id: number; url: string; alt: string }[];
      return {
        ...p,
        images,
        categories: Array.isArray(p.categories) ? p.categories : [],
      } as Product;
    })
    .filter(Boolean) as Product[];

  return (
    <div className="mx-auto max-w-[1200px] my-20">
      <div className="flex flex-col lg:flex-row gap-12 w-full">
        <ProductImageGallery images={productDetails.images ?? []} slug={slug} />

        <section className="w-full lg:w-1/2 px-4 flex flex-col justify-between gap-8">
          <h2
            className="text-2xl font-semibold text-orange-500"
            style={{ viewTransitionName: `product-title-${slug}` }}
          >
            {productDetails.name} - {productDetails.sku}
          </h2>

          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">Descripción</h3>
            <p className="ml-4 text-muted-foreground">
              {productDetails.description}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">Categorías</h3>
            <p className="ml-4 text-muted-foreground flex flex-wrap gap-1">
              {(productDetails.categories ?? []).map(
                (
                  category: CategoryType,
                  index: number,
                  categories: CategoryType[],
                ) => (
                  <span key={category.id}>
                    <Link
                      href={`/productos?category=${category.slug}`}
                      className="text-orange-500 hover:underline"
                    >
                      {category.name}
                    </Link>
                    {index < categories.length - 1 && ", "}
                  </span>
                ),
              )}
            </p>
          </div>

          <AddToCartControls
            product={{
              id: String(productDetails.id),
              name: productDetails.name,
              slug: productDetails.slug,
              image: productDetails.images?.[0]?.url ?? "",
            }}
            isCustomizable={Boolean(productDetails.isCustomizable)}
            variants={
              Array.isArray(productDetails.variants)
                ? productDetails.variants.map(
                    (v: {
                      id: string;
                      attributes: string[];
                      values: string[];
                    }) => ({
                      id: v.id,
                      attributes: v.attributes ?? [],
                      values: v.values ?? [],
                    }),
                  )
                : undefined
            }
          />
        </section>
      </div>

      {relatedProducts.length > 0 && (
        <section className="mt-24 w-full px-4">
          <div className="flex flex-col items-center gap-12">
            <Subtitle
              className="text-base md:text-3xl"
              subtitle="También te puede interesar"
            />
            <div className="flex flex-wrap justify-center gap-8 pt-8">
              {relatedProducts.map((product) => (
                <div
                  key={product.id}
                  className="img-appear group border border-orange-50/10 rounded-sm relative w-64 shadow-xl transition-all duration-300 hover:drop-shadow-3xl hover:shadow-orange-200/10"
                >
                  <ProductsCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export { ProductPage };
