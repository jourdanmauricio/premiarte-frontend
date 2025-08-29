import type React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Header from '@/components/header';
import Footer from '@/components/footer';
import './globals.css';
import { getGlobalInfo } from '@/lib/fetch/get-global-info';
import { Banner } from '@/components/banner';
import { Providers } from './providers';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'PetDo - Everything Your Dog Needs',
//   description: 'Premium quality products for your furry friends',
//   generator: 'v0.app',
// };

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
    <html lang='es'>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          <div className='flex min-h-screen flex-col'>
            {globalInfo.banner.isVisible && <Banner message={globalInfo.banner.description} />}
            <Header logoUrl={globalInfo.logo} items={globalInfo.header.navItems} />
            <main className='flex-1'>{children}</main>
            <Footer logoUrl={globalInfo.logo} footer={globalInfo.footer} />
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
