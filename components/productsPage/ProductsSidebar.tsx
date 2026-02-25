"use client";

import { useState } from "react";
import { Link } from "next-view-transitions";
import { Category } from "@/app/shared/types";
import { useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";

const linkBase = "group flex cursor-pointer items-center space-x-2 transition-colors hover:text-primary";
const linkActive = "font-bold text-orange-500";
const linkInactive = "font-normal text-muted-foreground";

const ProductsSidebar = ({ categories }: { categories: Category[] }) => {
  const searchParams = useSearchParams();
  const categorySlug = searchParams.get("category");
  const [isOpen, setIsOpen] = useState(false);

  const activeCategoryName = categorySlug
    ? categories.find((c) => c.slug === categorySlug)?.name ?? "Todos los productos"
    : "Todos los productos";

  const categoryLinks = (onNavigate?: () => void) => (
    <>
      <Link
        href="/productos?page=1"
        onClick={onNavigate}
        className={`${linkBase} ${!categorySlug ? linkActive : linkInactive}`}
      >
        Todos los productos
      </Link>
      {categories.map((category: Category) => {
        const isActive = categorySlug === category.slug;
        return (
          <Link
            key={category.id}
            href={`/productos?category=${category.slug}&page=1`}
            onClick={onNavigate}
            className={`${linkBase} ${isActive ? linkActive : linkInactive}`}
          >
            {category.name}
          </Link>
        );
      })}
    </>
  );

  return (
    <>
      {/* Mobile: desplegable como overlay */}
      <div className="md:hidden w-full relative z-40">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex w-full items-center justify-between rounded-md border border-border px-4 py-3 text-sm font-medium text-foreground cursor-pointer"
        >
          <span>{activeCategoryName}</span>
          <ChevronDown
            className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {/* Overlay con blur - cubre desde el botón hasta el final de la pantalla */}
        <div
          className={`fixed inset-0 top-0 z-30 transition-all duration-300 ease-in-out ${
            isOpen
              ? "opacity-100 visible"
              : "opacity-0 invisible pointer-events-none"
          }`}
        >
          <div
            className="absolute inset-0 bg-background/90 backdrop-blur-xl"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="relative h-full overflow-y-auto no-scrollbar px-4 pt-16">
            <div className="space-y-3 py-4">
              {categoryLinks(() => setIsOpen(false))}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop: sidebar */}
      <aside className="hidden md:block space-y-2 sticky top-20 min-w-48">
        {categoryLinks()}
      </aside>
    </>
  );
};

export { ProductsSidebar };
