'use client';

import Link from 'next/link';
import Image from 'next/image';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

import { Button } from '@/components/ui/button';

type HeroProps = {
  title: string;
  description: any[];
  image: { url: string; alt: string };
  logo: string;
};

const Hero = ({ title, description, image, logo }: HeroProps) => {
  return (
    <section className='container relative px-4 py-16 md:px-20 md:py-24 lg:py-32'>
      <div className='grid items-center gap-12 lg:grid-cols-2 lg:gap-16'>
        <div className='space-y-8 text-center lg:text-left'>
          {/* Logo con efecto */}
          <div className='flex justify-center lg:justify-start'>
            <div className='group relative'>
              <Image
                className='drop-shadow-lg transition-transform duration-300 group-hover:scale-105'
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
              className='object-cover'
              // className='object-cover transition-transform duration-700 group-hover:scale-110'
              priority
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100'></div>
          </div>

          {/* Efecto de brillo */}
          <div className='absolute inset-0 -z-10 scale-110 bg-gradient-to-r from-orange-500/10 to-red-500/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100'></div>
        </div>
      </div>
    </section>
  );
};

export { Hero };
