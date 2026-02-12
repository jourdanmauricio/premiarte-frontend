import Subtitle from "@/app/components/shared/Subtitle";
import { ServicesData, ServicesSettings } from "@/app/shared/types";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

type ServicesProps = {
  services: ServicesSettings[];
  servicesData: ServicesData;
};

const Services = ({ services, servicesData }: ServicesProps) => {
  const { title, subtitle } = servicesData;
  return (
    <section className="section-container">
      <Subtitle subtitle={title || "Nuestros Servicios"} />
      {subtitle && (
        <p className="my-8 text-center text-xl font-normal tracking-tight text-muted-foreground md:text-xl">
          {subtitle || "Servicios destacados"}
        </p>
      )}
      <div className="flex flex-wrap justify-center gap-8 pt-24">
        {services.map((serv: ServicesSettings) => (
          <Card key={serv.title} className="bg-background w-64">
            <CardContent className="p-4">
              <Image
                src={serv.imageDet?.url || ""}
                alt={serv.imageDet?.alt || serv.title}
                width={100}
                height={100}
                className="mb-4 h-10 w-10 brightness-0 invert filter mx-auto"
              />
              <h3 className="mb-2 text-lg font-semibold">{serv.title}</h3>
              <div className="text-muted-foreground md:text-sm">
                <p>{serv.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export { Services };
