import { Category as CategoryType } from "@/app/shared/types";
import { ProductsSidebar } from "@/components/productsPage/ProductsSidebar";
import { redirect } from "next/navigation";

interface CategoryListProps {
  currentCategory: string;
}

const apiUrl = process.env.API_URL;

const CategoryList = async ({ currentCategory }: CategoryListProps) => {
  const categoriesData = await fetch(`${apiUrl}/categories`, {
    next: {
      tags: ["categories"],
    },
  });
  const categories = await categoriesData.json();

  if (currentCategory) {
    const categoryExists = categories.some(
      (cat: CategoryType) => cat.slug === currentCategory,
    );
    if (!categoryExists) {
      redirect("/productos");
    }
  }
  return <ProductsSidebar categories={categories} />;
};

export { CategoryList };
