"use client";

import { Image as ImageType } from "@/app/shared/types";
import Image from "next/image";
import { useState } from "react";

type ProductImageGalleryProps = {
  images: ImageType[];
  slug: string;
};

const ProductImageGallery = ({ images, slug }: ProductImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!images?.length) {
    return (
      <div className="w-[400px] h-[400px] mx-auto bg-gray-100 flex items-center justify-center rounded">
        Sin imagen
      </div>
    );
  }

  const selectedImage = images[selectedIndex];

  return (
    <div className="w-full lg:w-1/2 mx-auto px-4">
      <Image
        id="main-image"
        src={selectedImage.url || "/placeholder.svg"}
        alt={selectedImage.alt || "Product image"}
        width={400}
        height={400}
        className="object-contain mx-auto object-center w-[400px] h-[400px]"
        style={selectedIndex === 0 ? { viewTransitionName: `product-image-${slug}` } : undefined}
      />
      <div className="flex gap-2 mt-4 max-w-[400px] mx-auto">
        {images.map((image: ImageType, index: number) => (
          <button
            key={image.id ?? index}
            type="button"
            onClick={() => setSelectedIndex(index)}
            className={`min-w-0 transition-all duration-200 ${
              index === selectedIndex
                ? "ring-2 ring-offset-1 opacity-100"
                : "hover:opacity-80 opacity-70"
            }`}
          >
            <Image
              src={image?.url || "/placeholder.svg"}
              alt={image?.alt || "Product image"}
              width={90}
              height={90}
              className="object-contain object-center w-[90px] h-[90px]"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export { ProductImageGallery };
