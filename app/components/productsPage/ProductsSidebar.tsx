"use client";

import Link from "next/link";
import { Category } from "@/app/shared/types";
import { useSearchParams } from "next/navigation";

// const apiUrl = process.env.API_URL;
// const data = await fetch(`${apiUrl}/categories`, {
//   next: {
//     tags: ["categories"],
//   },
// });
// const categories = await data.json();

const ProductsSidebar = ({ categories }: { categories: Category[] }) => {
  const searchParams = useSearchParams();
  const categorySlug = searchParams.get("category");

  return (
    <aside className="space-y-2 sticky top-0 min-w-48">
      <Link
        href={`/productos?page=1`}
        className={`my-8 group flex cursor-pointer items-center space-x-2 ${!categorySlug ? "font-bold text-orange-500" : "font-normal text-muted-foreground"} transition-colors hover:text-primary`}
      >
        Todos los productos
      </Link>
      {categories.map((category: Category) => {
        // Verificar si estamos en esta categoría exacta, incluyendo páginas de paginación
        const isActive = categorySlug === category.slug;

        return (
          <Link
            key={category.id}
            href={`/productos?category=${category.slug}&page=1`}
            className={`group flex cursor-pointer items-center space-x-2 ${isActive ? "font-bold text-orange-500" : "font-normal text-muted-foreground"} transition-colors hover:text-primary`}
          >
            {category.name}
          </Link>
        );
      })}
    </aside>
  );
};

export { ProductsSidebar };
