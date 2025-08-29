'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Search, User, Menu, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { NavItem } from '@/lib/types/strapi';

type HaeaderProps = {
  logoUrl: string;
  items: NavItem[];
};

export default function Header({ logoUrl, items }: HaeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className='sticky top-0 z-50 w-full border-b bg-background'>
        {/* Desktop Header */}
        <div className='container flex h-16 items-center justify-between px-4 md:px-6'>
          <div className='flex items-center gap-6 md:gap-10'>
            <Link href='/' className='flex items-center gap-2'>
              <Image
                src={logoUrl || '/default-logo.png'}
                alt='PetDo Logo'
                width={184}
                height={47}
              />
            </Link>
            <nav className='hidden gap-6 md:flex'>
              {items.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className='text-sm font-medium transition-colors hover:text-primary'
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className='flex items-center gap-4'>
            <div className='hidden md:flex'>
              <div className='relative'>
                <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
                <Input
                  type='search'
                  placeholder='Search...'
                  className='w-[200px] rounded-full bg-muted pl-8 md:w-[250px]'
                />
              </div>
            </div>

            <Button variant='ghost' size='icon' className='relative' asChild>
              <Link href='/login'>
                <User className='h-5 w-5' />
                <span className='sr-only'>Sign In</span>
              </Link>
            </Button>
            <Button variant='ghost' size='icon' className='relative' asChild>
              <Link href='/cart'>
                <ShoppingCart className='h-5 w-5' />
                <Badge className='absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary p-0 text-xs'>
                  3
                </Badge>
                <span className='sr-only'>Cart</span>
              </Link>
            </Button>
            <Button
              variant='ghost'
              size='icon'
              className='md:hidden'
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
              <span className='sr-only'>Menu</span>
            </Button>
          </div>
        </div>
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className='space-y-4 border-t bg-background p-4 md:hidden'>
            <div className='relative mb-4'>
              <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input
                type='search'
                placeholder='Search...'
                className='w-full rounded-full bg-muted pl-8'
              />
            </div>
            <nav className='flex flex-col space-y-4'>
              {items.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className='text-sm font-medium transition-colors hover:text-primary'
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
