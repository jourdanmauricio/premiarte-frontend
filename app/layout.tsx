import type React from 'react';
import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';

import Header from '@/components/header';
import Footer from '@/components/footer';
import './globals.css';
import { getGlobalInfo } from '@/lib/fetch/get-global-info';
import { Banner } from '@/components/banner';
import { Providers } from './providers';
import { Toaster } from '@/components/ui/toaster';
import { unstable_ViewTransition as ViewTransition } from 'react';

// const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'PetDo - Everything Your Dog Needs',
//   description: 'Premium quality products for your furry friends',
//   generator: 'v0.app',
// };

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export async function generateMetadata(): Promise<Metadata> {
  const globalInfo = await getGlobalInfo();

  return {
    title: globalInfo.metaTitle || 'PetDo - Everything Your Dog Needs',
    description: globalInfo.metaDescription || 'Premium quality products for your furry friends',
    generator: 'v0.app',
    icons: {
      icon: globalInfo.favicon || '/default-favicon.ico', // Ruta relativa a /public
      shortcut: globalInfo.favicon || '/shortcut-icon.ico',
      // apple: globalInfo.appleTouchIcon || '/apple-touch-icon.png', // Para iOS
    },
    openGraph: {
      title: globalInfo.metaTitle,
      description: globalInfo.metaDescription,
      images: globalInfo.mediaImage
        ? [
            {
              url: globalInfo.mediaImage,
              alt: 'Site Image',
            },
          ]
        : undefined,
    },
    twitter: {
      title: globalInfo.metaTitle,
      description: globalInfo.metaDescription,
      card: 'summary_large_image',
      images: globalInfo.mediaImage ? [globalInfo.mediaImage] : undefined,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalInfo = await getGlobalInfo();

  return (
    <html lang='es' className='dark'>
      <body
        className={`${inter.variable} ${montserrat.variable} font-sans`}
        suppressHydrationWarning
      >
        {/* Background sofisticado con líneas diagonales */}
        <div className='fixed inset-0 -z-10'>
          {/* Gradiente base */}
          <div className='absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black'></div>

          {/* Líneas diagonales sutiles */}
          <div className='absolute inset-0 opacity-20'>
            {/* Líneas principales */}
            <div className='absolute left-1/4 top-0 h-full w-px origin-top rotate-12 transform bg-gradient-to-b from-red-600/30 via-orange-500/20 to-transparent'></div>
            <div className='absolute right-1/3 top-0 h-full w-px origin-top -rotate-12 transform bg-gradient-to-b from-orange-500/30 via-red-600/20 to-transparent'></div>

            {/* Líneas secundarias más sutiles */}
            <div className='absolute left-1/3 top-0 h-full w-px origin-top rotate-6 transform bg-gradient-to-b from-white/10 via-transparent to-transparent'></div>
            <div className='absolute right-1/4 top-0 h-full w-px origin-top -rotate-6 transform bg-gradient-to-b from-white/10 via-transparent to-transparent'></div>

            {/* Líneas adicionales para más profundidad */}
            <div className='absolute left-0 top-1/4 h-px w-full origin-left rotate-12 transform bg-gradient-to-r from-transparent via-red-600/20 to-transparent'></div>
            <div className='absolute bottom-1/4 right-0 h-px w-full origin-right -rotate-12 transform bg-gradient-to-l from-transparent via-orange-500/20 to-transparent'></div>
          </div>

          {/* Efectos de profundidad */}
          <div className='absolute inset-0'>
            {/* Gradiente radial sutil */}
            <div className='absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-red-600/5 blur-3xl'></div>
            <div className='absolute bottom-1/3 right-1/4 h-80 w-80 rounded-full bg-orange-500/5 blur-3xl'></div>

            {/* Noise/textura muy sutil */}
            <div
              className='absolute inset-0 opacity-[0.02] mix-blend-overlay'
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              }}
            ></div>
          </div>
        </div>
        <Providers>
          <div className='flex min-h-screen w-full flex-col'>
            {globalInfo.banner.isVisible && <Banner message={globalInfo.banner.description} />}
            <Header logoUrl={globalInfo.logo} />
            {/* <ViewTransition name='page'> */}
            <main className='flex-1'>{children}</main>
            {/* </ViewTransition> */}
            <Footer logoUrl={globalInfo.logo} footer={globalInfo.footer} />
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
