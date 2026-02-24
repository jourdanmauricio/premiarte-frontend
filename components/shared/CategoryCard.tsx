import { FeaturedCategory } from "@/app/shared/types";
import Image from "next/image";

type CategoryCardProps = {
  category: FeaturedCategory;
};

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <a
      href={`/productos?category=${category.slug}`}
      className="img-appear group relative w-64 overflow-hidden rounded-sm bg-background shadow-md transition-all hover:shadow-lg"
    >
      <div className="relative aspect-square overflow-hidden rounded-sm border">
        <Image
          src={category.image?.url || "/placeholder.svg"}
          alt={
            `Categoría ${category.image?.alt}` || `Categoría ${category.name}`
          }
          width={256}
          height={256}
          className="object-contain w-full h-full transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 w-full p-4">
          <h3 className="text-lg font-semibold text-white">{category.name}</h3>
        </div>
      </div>
    </a>
  );
};

export { CategoryCard };
