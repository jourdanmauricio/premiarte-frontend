import { Category, Product } from "@/app/shared/types";
import { Link } from "next-view-transitions";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link
      href={`/productos/${product.slug}`}
      className="mx-auto shadow-xl transition-all duration-300 hover:drop-shadow-3xl hover:shadow-orange-200/10"
    >
      <div className="relative w-72 px-0 h-full border border-orange-50/10">
        <Image
          src={product.images[0]?.url || "/images/no-image.png"}
          alt={product.images[0]?.alt || "Product image"}
          className="object-contain object-center h-72 w-72"
          width={288}
          height={288}
          style={{ viewTransitionName: `product-image-${product.slug}` }}
        />

        <div className="py-4">
          <div className="flex gap-2 justify-center">
            {product.categories.length > 0 &&
              product.categories.map((category: Category) => (
                <span key={category.id} className="pill">
                  {category.name}
                </span>
              ))}
          </div>

          <h4
            className="text-base font-medium mt-4 px-2"
            style={{ viewTransitionName: `product-title-${product.slug}` }}
          >
            {product.name}
          </h4>
        </div>
      </div>
    </Link>
  );
};

export { ProductCard };
