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

type HeroProps = {
  title: string;
  description: any[];
  image: { url: string; alt: string };
};

const Hero = ({ title, description, image }: HeroProps) => {
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
          className='w-full'
          opts={{ loop: true }}
          plugins={[
            Autoplay({
              delay: 4000,
              stopOnInteraction: true,
            }) as any,
          ]}
        >
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <Card className='relative border-0'>
                  <CardContent className='relative flex aspect-auto h-[460px] items-center justify-center p-6'>
                    {/* Imagen con capa de superposición */}
                    <div className='absolute inset-0'>
                      <Image
                        src={image.url}
                        alt={image.alt}
                        fill
                        className='object-cover'
                        priority
                      />
                      {/* Capa de opacidad */}
                      <div className='absolute inset-0 bg-black/60'></div>
                    </div>

                    {/* Texto encima */}
                    <div className='relative z-10 text-center text-white'>
                      <span className='text-4xl font-semibold'>{index + 1}</span>
                      <p className='mt-2 text-lg'>Texto descriptivo que resaltará</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            variant='ghost'
            className='absolute left-8 top-1/2 z-20 -translate-y-1/2 hover:bg-black/20'
          />
          <CarouselNext
            variant='ghost'
            className='absolute right-8 top-1/2 z-20 -translate-y-1/2 hover:bg-black/20'
          />
        </Carousel>
        <div className='relative flex items-center justify-center py-2 text-center text-sm text-muted-foreground'>
          <div className='absolute -top-14 flex gap-5'>
            {api?.scrollSnapList().map((_, index) => (
              <Circle
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  'h-4 w-4 rounded-full hover:cursor-pointer',
                  index === current - 1 ? 'bg-white/60' : 'bg-transparent hover:bg-white/20'
                )}
                // className={'embla__dot'.concat(index === current ? 'embla__dot--selected' : '')}
              />
            ))}
          </div>
        </div>
      </div>
      <div className='container px-4 py-12 md:px-6 md:py-24 lg:py-32'>
        <div className='grid items-center gap-6 lg:grid-cols-2 lg:gap-12'>
          <div className='space-y-4'>
            <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl'>
              {title || 'Welcome to Our Pet Store'}
            </h1>
            <div className='max-w-[600px] text-muted-foreground md:text-xl'>
              <BlocksRenderer content={description} />
            </div>
            <div className='flex flex-col gap-4 sm:flex-row'>
              <Button size='lg' className='font-medium' asChild>
                <Link href='/shop'> Shop Now </Link>
              </Button>
              <Button size='lg' variant='outline' className='font-medium'>
                View Deals
              </Button>
            </div>
          </div>
          <div className='relative h-[300px] overflow-hidden rounded-xl sm:h-[400px] lg:h-[500px]'>
            <Image src={image.url} alt={image.alt} fill className='object-cover' priority />
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero };
