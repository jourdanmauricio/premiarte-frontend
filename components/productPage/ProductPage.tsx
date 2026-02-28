import Link from "next/link";
import { notFound } from "next/navigation";
import { Category as CategoryType } from "@/app/shared/types";
import { ProductImageGallery } from "@/components/productPage/ProductImageGallery";
import { AddToCartControls } from "@/components/productPage/AddToCartControls";

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
              {(productDetails.categories ?? []).map((category: CategoryType, index, categories) => (
                <span key={category.id}>
                  <Link
                    href={`/productos?category=${category.slug}`}
                    className="text-orange-500 hover:underline"
                  >
                    {category.name}
                  </Link>
                  {index < categories.length - 1 && ", "}
                </span>
              ))}
            </p>
          </div>

          <AddToCartControls
            product={{
              id: String(productDetails.id),
              name: productDetails.name,
              slug: productDetails.slug,
              image: productDetails.images?.[0]?.url ?? "",
            }}
          />
        </section>
      </div>
    </div>
  );
};

export { ProductPage };
