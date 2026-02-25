"use client";

import { navBarLinks } from "@/app/shared/consts";
import { MobileButtonMenu } from "./MobileButtonMenu";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { CartCounter } from "@/components/shared/navBar/CartCounter";
import { AuthSection } from "@/components/shared/navBar/AuthSection";
import { usePathname } from "next/navigation";

function getActivePath(currentPath: string): string {
  // Si la ruta comienza con /categoria/ pero no es /categorias,
  // activar el link de productos
  if (currentPath.startsWith("/categoria/") && currentPath !== "/categorias") {
    return "/productos";
  }
  // Si estamos en una página de detalle de producto, activar el link de productos
  if (currentPath.startsWith("/productos/")) {
    return "/productos";
  }
  return currentPath;
}

const NavBar = () => {
  const pathname = usePathname();
  const activePath = getActivePath(pathname);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/70 backdrop-blur-sm" style={{ viewTransitionName: "navbar" }}>
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
          {navBarLinks.map((link) => {
            const isActive = activePath === link.href;
            return (
              <div key={link.name}>
                <Link href={link.href} className="mx-1.5 sm:mx-6">
                  {link.name}
                </Link>
                <div
                  className={`border-b-2 mx-4 ${isActive ? "border-orange-500" : "border-transparent"}`}
                  style={isActive ? { viewTransitionName: "menu-line" } : undefined}
                />
              </div>
            );
          })}
          <CartCounter />
        </div>

        {/* Sección de autenticación para escritorio  */}
        <div className="hidden xl:flex justify-end w-[240px]">
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
            {navBarLinks.map((link) => {
              const isActive = activePath === link.href;
              return (
                <div key={link.name}>
                  <Link
                    href={link.href as string}
                    className={`block px-3 py-2 rounded-md transition-colors ${
                      isActive
                        ? "bg-orange-500 text-white"
                        : "text-gray-300 hover:text-white hover:bg-gray-700"
                    }`}
                  >
                    {link.name}
                  </Link>
                </div>
              );
            })}
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
