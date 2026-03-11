const CATEGORY_ITEM_COUNT = 15;

const CategoryItemSkeleton = () => (
  <div className="flex items-center space-x-2">
    <div className="h-4 w-32 rounded bg-orange-50/30 animate-pulse" />
  </div>
);

const CategoriesListSkeleton = () => {
  return (
    <>
      {/* Mobile: skeleton del botón desplegable */}
      <div className="md:hidden w-full relative z-40">
        <div className="flex w-full items-center justify-between rounded-md border border-border px-4 py-3">
          <div className="h-4 w-36 rounded bg-orange-50/30 animate-pulse" />
          <div className="h-4 w-4 rounded bg-orange-50/30 animate-pulse" />
        </div>
      </div>

      {/* Desktop: skeleton del sidebar */}
      <aside className="hidden md:block space-y-2 sticky top-20 min-w-48">
        <div className="mt-4">
          <div className="h-4 w-36 rounded bg-orange-50/30 animate-pulse" />
        </div>
        {Array.from({ length: CATEGORY_ITEM_COUNT }).map((_, i) => (
          <CategoryItemSkeleton key={i} />
        ))}
      </aside>
    </>
  );
};

export { CategoriesListSkeleton };
