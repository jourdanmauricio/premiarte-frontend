import { StarsRating } from "@/app/components/homePage/StarsRating";
import Subtitle from "@/app/components/shared/Subtitle";
import { Testimonial, TestimonialsData } from "@/app/shared/types";
import { Card, CardContent } from "@/components/ui/card";

type TestimonialsProps = {
  testimonialsData: TestimonialsData;
};

const Testimonials = ({ testimonialsData }: TestimonialsProps) => {
  return (
    <section className="section-container">
      <Subtitle subtitle={testimonialsData.title || "Testimonios"} />

      <div className="flex flex-wrap justify-center gap-8 pt-24">
        {testimonialsData.testimonials.map((testimonial: Testimonial) => (
          <Card key={testimonial.name} className="bg-background w-80">
            <CardContent className="p-6">
              <div className="mb-4 flex flex-col gap-2">
                <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                <div className="flex items-center justify-center gap-2">
                  <StarsRating rating={Number(testimonial.rating)} />
                  <span className="text-sm text-muted-foreground">
                    {Number(testimonial.rating).toFixed(1)}
                  </span>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                &quot;{testimonial.description}&quot;
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export { Testimonials };
