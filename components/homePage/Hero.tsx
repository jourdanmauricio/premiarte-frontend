import PrimaryButton from "@/components/shared/PrimaryButton";
import Image from "next/image";
import { HeroSettings } from "@/app/shared/types";
import SecondaryButton from "@/components/shared/SecondaryButton";

type HeroProps = {
  heroSettings: HeroSettings;
};

const Hero = ({ heroSettings }: HeroProps) => {
  return (
    <section className="container relative px-4 pt-16 md:px-20 md:pt-24 lg:pt-32">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        <div className="text-center">
          <div className="group relative">
            <Image
              className="drop-shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-3xl group-hover:shadow-orange-500/50 mx-auto"
              src={heroSettings.logoDet?.url || ""}
              alt={heroSettings.logoDet?.alt || ""}
              width={100}
              height={100}
            />
          </div>
          {/* Título principal mejorado */}
          <h2 className="font-montserrat text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mt-8">
            <span className="bg-linear-to-r from-orange-600 via-red-600 to-orange-700 bg-clip-text text-transparent drop-shadow-sm">
              {heroSettings.title || "Premiarte"}
            </span>
          </h2>
          {/* Descripción mejorada */}
          <div className="max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl mt-8">
            <p>{heroSettings.text}</p>
          </div>

          {/* Botones de acción mejorados */}
          <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row lg:justify-end mt-8">
            <PrimaryButton
              label={heroSettings.buttonText || "Ver Productos"}
              href={heroSettings.buttonLink || "/productos"}
              className="px-8 py-6 text-lg font-semibold text-white min-w-40"
            />
            <SecondaryButton
              label="Más Información"
              href="/contacto"
              className="px-8 py-6 text-lg font-semibold text-white min-w-40"
            />
          </div>
        </div>
        {/* Imagen lateral mejorada */}
        <div className="group relative">
          <div className="relative h-[300px] overflow-hidden shadow-2xl sm:h-[400px] md:h-[450px] lg:h-[550px]">
            {/* className='object-cover transition-transform duration-700 group-hover:scale-110'  */}
            <Image
              src={heroSettings.imageDet?.url || ""}
              alt={heroSettings.imageDet?.alt || ""}
              className="object-contain w-full h-full"
              priority
              width={500}
              height={500}
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
          </div>

          {/* Efecto de brillo */}
          <div className="absolute inset-0 -z-10 scale-110 bg-linear-to-r from-orange-500/10 to-red-500/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
