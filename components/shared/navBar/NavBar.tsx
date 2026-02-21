import { navBarLinks } from "@/app/shared/consts";
import { MobileButtonMenu } from "./MobileButtonMenu";
import Image from "next/image";
import Link from "next/link";
import { CartCounter } from "@/components/shared/navBar/CartCounter";
import { AuthSection } from "@/components/shared/navBar/AuthSection";

const NavBar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/70 backdrop-blur-sm">
      <div className="container flex justify-between items-center p-4 mx-auto">
        {/* Logo y nombre del sitio  */}
        <div className="text-gray-300">
          <div className="flex items-center justify-center">
            <Image
              src={
                "https://res.cloudinary.com/dn7npxeof/image/upload/v1758745993/premiarte/zwk5kvupzxwgna5s8uxx.png"
              }
              alt={"Logo Premiarte"}
              className="w-10 h-10"
              width={40}
              height={40}
            />
            <Link href="/" className="text-2xl font-bold">
              Premiarte
            </Link>
          </div>
        </div>

        {/* Carrito y menú hamburguesa para móviles */}
        <div className="xl:hidden flex items-center space-x-4">
          <CartCounter />
          <MobileButtonMenu />
        </div>

        {/* Menú de escritorio  */}
        <div className="hidden xl:flex items-center justify-center text-gray-300">
          {navBarLinks.map((link) => (
            <div key={link.name}>
              <a href={link.href} className="mx-1.5 sm:mx-6">
                {link.name}
              </a>
              <div
                className="border-b-2 border-transparent mx-4"
                data-href={link.href}
                id={`menu-line-${link.href.replace("/", "home")}`}
              />
            </div>
          ))}
          <CartCounter />
        </div>

        {/* Sección de autenticación para escritorio  */}
        <div className="hidden xl:block">
          <AuthSection />
        </div>
      </div>

      {/* Menú móvil desplegable (checkbox + label, sin JS) */}
      <div className="xl:hidden">
        <input
          id="menu-toggle"
          type="checkbox"
          className="peer sr-only"
          aria-hidden="true"
        />
        <div className="hidden peer-checked:block bg-background/95 backdrop-blur-sm border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navBarLinks.map((link) => (
              <div key={link.name}>
                <Link
                  href={link.href as string}
                  className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors"
                  data-mobile-href={link.href}
                >
                  {link.name}
                </Link>
              </div>
            ))}
            <div className="px-3 py-2">
              <AuthSection />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
