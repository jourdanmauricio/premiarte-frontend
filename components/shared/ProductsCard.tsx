import { Product } from "@/app/shared/types";
import { Link } from "next-view-transitions";
import Image from "next/image";

const ProductsCard = ({ product }: { product: Product }) => {
  return (
    <Link
      href={`/productos/${product.slug}`}
      className="shadow-xl transition-all duration-300 hover:drop-shadow-3xl hover:shadow-orange-200/10"
    >
      <div className="aspect-square overflow-hidden rounded-t-sm bg-background hover:cursor-pointer relative border border-orange-50/10">
        <Image
          src={product.images[0]?.url || "/placeholder.svg"}
          alt={product.images[0]?.alt || "Product image"}
          width={256}
          height={256}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 img-appear"
          style={{ viewTransitionName: `product-image-${product.slug}` }}
        />
      </div>

      <div className="mt-4 space-y-1 text-center px-2 mb-4">
        <div className="pill mx-auto">{product.categories[0].name}</div>
        <h3
          className="font-medium"
          style={{ viewTransitionName: `product-title-${product.slug}` }}
        >
          {product.name}
        </h3>
        <div className="flex justify-center gap-2"></div>
      </div>
    </Link>
  );
};

export { ProductsCard };
