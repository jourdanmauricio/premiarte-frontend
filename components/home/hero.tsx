'use client';
import Image from 'next/image';
import Link from 'next/link';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import Autoplay from 'embla-carousel-autoplay';
import { type CarouselApi } from '@/components/ui/carousel';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

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
      <div className='mx-auto w-full'>
        <Carousel
          setApi={setApi}
          className='w-full'
          opts={{ loop: true }}
          plugins={[
            Autoplay({
              delay: 2000,
              stopOnInteraction: true,
            }) as any,
          ]}
        >
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <Card className=''>
                  <CardContent className='flex aspect-auto h-[460px] items-center justify-center p-6'>
                    <Image
                      src={image.url}
                      alt={image.alt}
                      fill
                      className='object-contain'
                      priority
                    />
                    <span className='h-full text-4xl font-semibold'>{index + 1}</span>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className='absolute left-8 top-1/2 -translate-y-1/2' />
          <CarouselNext className='absolute right-8 top-1/2 -translate-y-1/2' />
        </Carousel>
        <div className='flex items-center justify-center py-2 text-center text-sm text-muted-foreground'>
          <div className='flex gap-4'>
            {api?.scrollSnapList().map((_, index) => (
              <Circle
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  'h-4 w-4 rounded-full',
                  index === current - 1 ? 'bg-primary' : 'bg-muted'
                )}
                // className={'embla__dot'.concat(index === current ? 'embla__dot--selected' : '')}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero };
