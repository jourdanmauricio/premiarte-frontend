'use client';

import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Circle } from 'lucide-react';
import { useEffect, useState } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { type CarouselApi } from '@/components/ui/carousel';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { slider } from '@/lib/types/strapi';

type HeroProps = {
  title: string;
  description: any[];
  image: { url: string; alt: string };
  slider: slider[];
  logo: string;
};

const Hero = ({ title, description, image, slider, logo }: HeroProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap() + 1);
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <section className='relative'>
      <div className='relative mx-auto w-full'>
        <Carousel
          setApi={setApi}
          className='relative w-full overflow-hidden shadow-2xl'
          opts={{ loop: true }}
          plugins={[
            Autoplay({
              delay: 5000,
              stopOnInteraction: true,
            }) as any,
          ]}
        >
          <CarouselContent>
            {slider.map((slide, index) => (
              <CarouselItem key={slide.card.id}>
                <Card className='relative overflow-hidden rounded-none border-0'>
                  <CardContent className='relative flex aspect-auto h-[500px] items-center p-0 md:h-[600px]'>
                    {/* Imagen con múltiples capas de superposición */}
                    <div className='absolute inset-0'>
                      <Image
                        src={slide.card.image.url}
                        alt={slide.card.image.alternativeText || 'Slide Image'}
                        fill
                        className='object-cover transition-transform duration-700 hover:scale-105'
                        priority
                      />
                      {/* Gradiente dinámico más sofisticado */}
                      <div className='absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent'></div>
                      <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20'></div>
                    </div>

                    {/* Contenido principal con animaciones */}
                    <div className='relative z-10 flex flex-col gap-6 p-8 text-white duration-1000 animate-in slide-in-from-left-8 md:container md:pl-20 lg:pl-8'>
                      {/* Badge opcional para categoría */}
                      <div className='inline-flex w-fit'>
                        <span className='rounded-full bg-gradient-to-r from-red-500 to-orange-500 px-4 py-1.5 text-sm font-medium text-white shadow-lg'>
                          Destacado
                        </span>
                      </div>

                      {/* Título con mejor tipografía */}
                      <h1 className='font-montserrat text-3xl font-semibold leading-tight tracking-tight drop-shadow-2xl md:text-4xl lg:text-5xl xl:text-6xl'>
                        <span className='bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent'>
                          {slide.card.title}
                        </span>
                      </h1>

                      {/* Descripción mejorada */}
                      <div className='max-w-lg text-lg leading-relaxed text-gray-200 drop-shadow-lg md:text-xl'>
                        <BlocksRenderer content={slide.card.description} />
                      </div>

                      {/* Botón mejorado con efectos */}
                      <div className='mt-4 flex flex-col gap-4 sm:flex-row'>
                        <Button
                          className='group relative overflow-hidden rounded-lg border-0 bg-gradient-to-r from-red-600 to-orange-600 px-8 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:from-red-700 hover:to-orange-700 hover:shadow-2xl'
                          asChild
                        >
                          <Link href={slide.button.href || '/productos'}>
                            <span className='relative z-10'>
                              {slide.button.label || 'Ver Productos'}
                            </span>
                            <div className='absolute inset-0 translate-x-[-100%] bg-white/20 transition-transform duration-500 group-hover:translate-x-0'></div>
                          </Link>
                        </Button>

                        <Button
                          variant='outline'
                          className='rounded-lg border-white/30 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white/50 hover:bg-white/20'
                          asChild
                        >
                          <Link href='/contacto'>Más Información</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Controles mejorados */}
          {/* <CarouselPrevious className='absolute left-0 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 border-white/30 bg-white/20 text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/30 md:left-2 md:flex' /> */}
          <CarouselPrevious className='absolute left-2 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 border-0 bg-white/20 text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white/30 md:flex' />
          {/* <CarouselNext className='absolute -right-0 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 border-white/30 bg-white/20 text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/30 md:right-2 md:flex' /> */}
          <CarouselNext className='absolute right-2 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 border-0 bg-white/20 text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white/30 md:flex' />
        </Carousel>

        {/* Indicadores mejorados */}
        <div className='relative flex items-center justify-center py-6'>
          <div className='absolute -top-10 flex gap-3'>
            {api?.scrollSnapList().map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  'h-3 w-3 rounded-full shadow-lg transition-all duration-300 hover:scale-125',
                  index === current - 1
                    ? 'scale-110 bg-gradient-to-r from-red-500 to-orange-500'
                    : 'bg-white/50 backdrop-blur-sm hover:bg-white/70'
                )}
                aria-label={`Ir al slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Sección inferior mejorada */}
      <div className='container px-4 py-16 md:px-6 md:py-24 lg:py-32'>
        <div className='grid items-center gap-12 lg:grid-cols-2 lg:gap-16'>
          <div className='space-y-8 text-center lg:text-left'>
            {/* Logo con efecto */}
            <div className='flex justify-center lg:justify-start'>
              <div className='group relative'>
                <Image
                  className='drop-shadow-lg transition-transform duration-300 group-hover:scale-110'
                  src={logo}
                  alt='Premiarte'
                  width={100}
                  height={100}
                />
                <div className='absolute inset-0 rounded-full bg-gradient-to-r from-red-500/20 to-orange-500/20 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100'></div>
              </div>
            </div>

            {/* Título principal mejorado */}
            <h1 className='font-montserrat text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl'>
              <span className='bg-gradient-to-r from-orange-600 via-red-600 to-orange-700 bg-clip-text text-transparent drop-shadow-sm'>
                {title || 'Premiarte'}
              </span>
              <span className='mt-4 block text-3xl text-white/80'>¡Tu tienda de confianza!</span>
            </h1>

            {/* Descripción mejorada */}
            <div className='max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl'>
              <BlocksRenderer content={description} />
            </div>

            {/* Botones de acción mejorados */}
            <div className='flex flex-col justify-center gap-4 pt-4 sm:flex-row lg:justify-start'>
              <Button
                size='lg'
                className='rounded-lg bg-gradient-to-r from-red-600 to-orange-600 px-8 py-4 text-lg font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:from-red-700 hover:to-orange-700 hover:shadow-2xl'
                asChild
              >
                <Link href='/productos'>Ver Productos</Link>
              </Button>
              <Button
                size='lg'
                variant='outline'
                className='rounded-lg border-2 border-orange-600 px-8 py-4 text-lg font-semibold text-orange-600 transition-all duration-300 hover:scale-105 hover:bg-orange-600 hover:text-white hover:shadow-lg'
              >
                Ofertas Especiales
              </Button>
            </div>
          </div>

          {/* Imagen lateral mejorada */}
          <div className='group relative'>
            <div className='relative h-[350px] overflow-hidden shadow-2xl sm:h-[450px] lg:h-[550px]'>
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className='object-cover transition-transform duration-700 group-hover:scale-110'
                priority
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100'></div>
            </div>

            {/* Efecto de brillo */}
            <div className='absolute inset-0 -z-10 scale-110 bg-gradient-to-r from-orange-500/10 to-red-500/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100'></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero };
