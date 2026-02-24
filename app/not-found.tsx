import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <p className="text-9xl font-bold text-orange-500/20 select-none">404</p>

      <h1 className="mt-4 text-3xl font-semibold text-foreground sm:text-4xl">
        Página no encontrada
      </h1>

      <p className="mt-4 max-w-md text-muted-foreground">
        Lo sentimos, la página que buscás no existe o fue movida.
      </p>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="rounded-md bg-orange-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-orange-500/80"
        >
          Volver al inicio
        </Link>
        <Link
          href="/productos"
          className="rounded-md border border-border px-6 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:border-foreground/30"
        >
          Ver productos
        </Link>
      </div>
    </div>
  );
}
