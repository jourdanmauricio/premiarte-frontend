const CARD_COUNT = 9;

const ProductCardSkeleton = () => (
  <div className="mx-auto w-72 border border-orange-50/10 shadow-xl">
    <div className="relative w-72 h-72 bg-orange-50/20 animate-pulse" />
    <div className="py-4">
      <div className="flex gap-2 justify-center">
        <span className="h-5 w-16 rounded-full bg-orange-50/30 animate-pulse" />
        <span className="h-5 w-20 rounded-full bg-orange-50/30 animate-pulse" />
      </div>
      <div className="mt-4 px-2 space-y-2">
        <div className="h-4 w-full rounded bg-orange-50/30 animate-pulse" />
        <div className="h-4 w-3/4 rounded bg-orange-50/30 animate-pulse" />
      </div>
    </div>
  </div>
);

const ProductsSkeleton = () => {
  return (
    <div className="flex flex-wrap justify-center gap-16 mt-16">
      {Array.from({ length: CARD_COUNT }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
};

export { ProductsSkeleton };
