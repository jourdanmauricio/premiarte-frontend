import { Product } from "@/app/shared/types";
import { ProductCard } from "@/components/productsPage/ProductCard";

type ProductsListProps = {
  products: Product[];
};

const ProductsList = ({ products }: ProductsListProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-16 mt-16">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export { ProductsList };
