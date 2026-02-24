"use client";

import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { SliderSettings } from "@/app/shared/types";
import PrimaryButton from "@/components/shared/PrimaryButton";

export const HomeCarousel = ({
  sliderSettings,
}: {
  sliderSettings: SliderSettings[];
}) => {
  return (
    <Carousel
      className="relative mx-auto"
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      <CarouselContent className="">
        {sliderSettings.map((sliderSetting) => (
          <CarouselItem key={sliderSetting.image}>
            <div className="p-1">
              <Card className="relative overflow-hidden rounded-none border-0 p-0 m-0 bg-transparent">
                <CardContent className="relative flex aspect-auto h-auto items-center">
                  <div className="absolute inset-0">
                    <Image
                      src={sliderSetting.imageDet?.url || ""}
                      alt={sliderSetting.imageDet?.alt || "Slide Image"}
                      // fill
                      className="object-cover object-center transition-transform duration-700 hover:scale-105 h-full w-full"
                      // priority
                      width={1000}
                      height={1000}
                    />
                    {/* Gradiente dinámico más sofisticado */}
                    <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-transparent"></div>
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/20"></div>
                  </div>

                  <div className="relative z-10 flex flex-col gap-6 p-8 text-white duration-1000 animate-in slide-in-from-left-8 md:pl-40 lg:pl-40">
                    <div className="inline-flex w-fit">
                      {sliderSetting.recommended ? (
                        <span className="rounded-full bg-linear-to-r from-red-500 to-orange-500 px-4 py-1.5 text-sm font-medium text-white shadow-lg">
                          Destacado
                        </span>
                      ) : (
                        ""
                      )}
                    </div>

                    <h1 className="font-montserrat text-3xl font-semibold leading-tight tracking-tight drop-shadow-2xl md:text-4xl lg:text-5xl xl:text-6xl">
                      <span className="bg-linear-to-r from-white to-gray-200 bg-clip-text text-transparent">
                        {sliderSetting.title}
                      </span>
                    </h1>

                    <div className="max-w-lg text-lg leading-relaxed text-gray-200 drop-shadow-lg md:text-xl">
                      {sliderSetting.text}
                    </div>

                    <div className="mt-4 flex flex-col gap-4 sm:flex-row">
                      <PrimaryButton
                        label={sliderSetting.buttonText || "Ver Productos"}
                        href={sliderSetting.buttonLink ?? "/productos"}
                      />
                      <Button
                        variant="outline"
                        className="rounded-lg border-white/30 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white/50 hover:bg-white/20"
                        asChild
                      >
                        <Link href="/contacto">Más Información</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute top-1/2 -translate-y-1/2 left-16 right-16 flex justify-between px-4 mx-auto">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );
};
