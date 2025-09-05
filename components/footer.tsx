import { navItems } from '@/lib/constants';
import { FooterDto } from '@/lib/types/strapi';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import Image from 'next/image';
import Link from 'next/link';

type FooterProps = {
  logoUrl?: string;
  footer: FooterDto;
};

export default function Footer({ logoUrl, footer }: FooterProps) {
  return (
    <footer className='border-t text-muted-foreground'>
      <div className='container px-4 py-8 md:px-6 md:pt-20'>
        <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'>
          <div className='space-y-4'>
            <Link href='/' className='flex items-center gap-2'>
              <Image
                src={logoUrl || '/default-logo.png'}
                alt={'Premiearte Logo'}
                width={187}
                height={40}
              />
            </Link>
            <p className='text-sm'>
              Your one-stop shop for all pet needs. Quality products for your furry friends.
            </p>
            <div className='flex gap-4'>
              {footer.socialLinks.map((social) => (
                <Link
                  key={social.id}
                  href={social.href}
                  className='hover:text-primary'
                  target={social.isExternal ? '_blank' : '_self'}
                >
                  <Image
                    src={`${process.env.STRAPI_HOST}${social.image?.url}`}
                    alt={social.label}
                    width={24}
                    height={24}
                    className='h-5 w-5'
                  />
                  <span className='sr-only'>{social.label}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className='space-y-4'>
            <h3 className='text-base font-medium text-muted-foreground'>Links</h3>
            <nav className='flex flex-col space-y-2'>
              {navItems.map((link) => (
                <Link key={link.id} href={link.href} className={`text-sm hover:text-primary`}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className='space-y-4'>
            <h3 className='text-base font-medium text-muted-foreground'>Acerca de premiarte</h3>
            <div className='max-w-[600px] text-muted-foreground md:text-sm'>
              <BlocksRenderer content={footer.description} />
            </div>
          </div>

          <div className='space-y-4'>
            <h3 className='text-base font-medium text-muted-foreground'>Contacto</h3>
            <div className='flex flex-col space-y-2 text-sm text-muted-foreground'>
              <p>Calle 70 N° 999 e/ 14 y 15</p>
              <p>La Plata, Buenos Aires - C.P. 1900</p>
              <p>Teléfono: (221) 619-6520</p>
              <p>Email: info@premiarte.com.ar</p>
            </div>
          </div>
        </div>
        <div className='mt-8 border-t pt-8'>
          <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
            <p className='text-xs text-muted-foreground'>
              &copy; {new Date().getFullYear()} {footer.textReserved || 'Premiearte'}.
            </p>
            <div className='flex gap-4'>
              <Link href='#' className='text-xs text-muted-foreground hover:text-primary'>
                Privacy Policy
              </Link>
              <Link href='#' className='text-xs text-muted-foreground hover:text-primary'>
                Terms of Service
              </Link>
              <Link href='#' className='text-xs text-muted-foreground hover:text-primary'>
                Cookies Policy
              </Link>
            </div>
            <div className='flex items-center gap-2 text-xs text-muted-foreground'>
              Desarrollo
              <Link
                href={footer.design[0].href}
                target='_blank'
                className='text-xs text-muted-foreground hover:text-primary'
              >
                {footer.design[0].label}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
