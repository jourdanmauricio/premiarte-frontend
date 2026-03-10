"use client";

import { Image as ImageType } from "@/app/shared/types";
import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

type ProductImageGalleryProps = {
  images: ImageType[];
  slug: string;
};

const ProductImageGallery = ({ images, slug }: ProductImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);

  const onSelect = useCallback((api: CarouselApi | undefined) => {
    if (!api) return;
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!carouselApi || !lightboxOpen) return;
    carouselApi.on("select", onSelect);
    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi, lightboxOpen, onSelect]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => setMousePos(null);

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
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <div
          role="button"
          tabIndex={0}
          className="relative overflow-hidden w-[400px] h-[400px] mx-auto rounded cursor-zoom-in"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={() => setLightboxOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setLightboxOpen(true);
            }
          }}
          aria-label="Ampliar imagen"
        >
          <Image
            id="main-image"
            src={selectedImage.url || "/placeholder.svg"}
            alt={selectedImage.alt || "Product image"}
            width={400}
            height={400}
            className="object-contain object-center w-[400px] h-[400px] transition-transform duration-200 ease-out"
            style={{
              transformOrigin: mousePos ? `${mousePos.x}% ${mousePos.y}%` : "center center",
              transform: mousePos ? "scale(1.5)" : "scale(1)",
              ...(selectedIndex === 0 ? { viewTransitionName: `product-image-${slug}` } : {}),
            }}
          />
        </div>
        <DialogContent
          className="p-2 border-0 bg-black/90"
          style={{ width: "90vw", maxWidth: "90vw" }}
          showCloseButton={true}
        >
          <DialogTitle className="sr-only">
            Vista ampliada de imagen del producto
          </DialogTitle>
          <Carousel
            opts={{ startIndex: selectedIndex, loop: true }}
            setApi={(api) => {
              setCarouselApi(api);
              if (api) onSelect(api);
            }}
            className="w-full"
          >
            <CarouselContent className="flex items-center ml-0">
              {images.map((image: ImageType, index: number) => (
                <CarouselItem key={image.id ?? index} className="flex items-center justify-center pl-0">
                  <div className="relative w-full min-h-0 flex items-center justify-center">
                    <Image
                      src={image?.url || "/placeholder.svg"}
                      alt={image?.alt ?? "Product image"}
                      width={1400}
                      height={1400}
                      className="object-contain w-full max-w-[75vw] max-h-[75vh]"
                      style={{ maxWidth: "75vw", maxHeight: "75vh" }}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 border-white/30 text-white hover:bg-white/20 hover:text-white" />
            <CarouselNext className="right-2 border-white/30 text-white hover:bg-white/20 hover:text-white" />
          </Carousel>
        </DialogContent>
      </Dialog>
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
