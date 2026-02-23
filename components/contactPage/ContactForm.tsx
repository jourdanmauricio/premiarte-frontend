"use client";
import { useCallback, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { ContactFormState } from "@/validations/contact";
import { InputFormError } from "@/components/shared/InputFormError";
import { SubmitButton } from "@/components/shared/SubmitButton";
import { Mail, MapPin, Phone } from "lucide-react";

const INITIAL_STATE: ContactFormState = {
  success: false,
  message: undefined,
  zodErrors: null,
  formError: null,
  data: {
    name: "",
    email: "",
    phone: "",
    message: "",
  },
};

const inputBaseClass =
  "w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm bg-transparent text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-400 transition-colors [&:-webkit-autofill]:[-webkit-text-fill-color:white] [&:-webkit-autofill]:[-webkit-box-shadow:0_0_0_1000px_rgb(26_27_34)_inset] [&:-webkit-autofill:hover]:[-webkit-text-fill-color:white] [&:-webkit-autofill:hover]:[-webkit-box-shadow:0_0_0_1000px_rgb(26_27_34)_inset] [&:-webkit-autofill:focus]:[-webkit-text-fill-color:white] [&:-webkit-autofill:focus]:[-webkit-box-shadow:0_0_0_1000px_rgb(26_27_34)_inset]";

const ContactForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [formstate, setFormstate] = useState<ContactFormState>(INITIAL_STATE);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsPending(true);
      setFormstate((prev) => ({ ...prev, formError: null, zodErrors: null }));
      const form = e.currentTarget;
      const formData = new FormData(form);
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          body: formData,
        });
        const data: ContactFormState = await res.json();
        setFormstate(data);
        if (data.success) {
          onSuccess?.();
        }
      } catch {
        setFormstate((prev) => ({
          ...prev,
          success: false,
          formError: "Error al enviar el mensaje",
        }));
      } finally {
        setIsPending(false);
      }
    },
    [onSuccess],
  );

  return (
    <div className="grid gap-8 lg:grid-cols-3 max-w-[1200px] mx-auto">
      <div className="lg:col-span-2">
        <Card>
          <CardContent className="p-6">
            {formstate.success ? (
              <div className="mb-6 rounded-lg  p-4 text-orange-500">
                <h3 className="mb-2 text-lg font-semibold">
                  Gracias por contactarnos!
                </h3>
                <p>
                  Tu mensaje ha sido enviado exitosamente. Nos pondremos en
                  contacto contigo lo antes posible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-12" noValidate>
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-slate-300"
                  >
                    Nombre y Apellido *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Ingrese su nombre"
                    className={`${inputBaseClass}`}
                    required
                    defaultValue={
                      formstate.data?.name ? formstate.data?.name : ""
                    }
                  />
                  <InputFormError
                    error={formstate.zodErrors?.name}
                    className="absolute top-16 mx-auto"
                  />
                </div>

                <div className="relative">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-300"
                  >
                    Correo electrónico
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Ingrese su nombre"
                    className={`${inputBaseClass}`}
                    required
                    defaultValue={
                      formstate.data?.email ? formstate.data?.email : ""
                    }
                  />
                  <InputFormError
                    error={formstate.zodErrors?.email}
                    className="absolute top-16 mx-auto"
                  />
                </div>

                <div className="relative">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-slate-300"
                  >
                    Teléfono *
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    placeholder="Ingrese su teléfono"
                    className={`${inputBaseClass}`}
                    required
                    defaultValue={
                      formstate.data?.phone ? formstate.data?.phone : ""
                    }
                  />
                  <InputFormError
                    error={formstate.zodErrors?.phone}
                    className="absolute top-16 mx-auto"
                  />
                </div>

                <div className="relative">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-slate-300"
                  >
                    Mensaje *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Ingrese su mensaje"
                    className={`${inputBaseClass}`}
                    rows={3}
                    required
                    defaultValue={
                      formstate.data?.message ? formstate.data?.message : ""
                    }
                  />
                  <InputFormError
                    error={formstate.zodErrors?.message}
                    className="absolute top-28 mx-auto"
                  />
                </div>

                <SubmitButton
                  label={isPending ? "Enviando mensaje..." : "Enviar mensaje"}
                  showSpinner={isPending}
                  disabled={isPending}
                  className="ml-auto h-full w-[180px] flex justify-center items-center"
                  //   className="ml-auto block w-full sm:w-auto hover:cursor-pointer bg-orange-500 hover:bg-orange-600"
                />
              </form>
            )}
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardContent className="p-6">
            <h2 className="mb-12 text-xl font-semibold">
              Información de contacto
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-orange-500">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Dirección</h3>
                  <address className="not-italic text-muted-foreground">
                    Calle 70 N° 999 e/ 14 y 15
                    <br />
                    La Plata, Buenos Aires - C.P. 1900
                  </address>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-orange-500">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Teléfono</h3>
                  <p className="text-muted-foreground">
                    <span>(221) 619-6520</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-orange-500">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-muted-foreground">
                    <a
                      href="mailto:premiartelp@gmail.com"
                      className="hover:text-orange-500"
                    >
                      premiartelp@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8">
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-6 text-xl font-semibold">
                Síguenos en nuestras redes sociales
              </h2>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/10 text-orange-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                  <span className="sr-only">Facebook</span>
                </a>
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/10 text-orange-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                  <span className="sr-only">Instagram</span>
                </a>
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/10 text-orange-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                  <span className="sr-only">Twitter</span>
                </a>
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/10 text-orange-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                  <span className="sr-only">LinkedIn</span>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export { ContactForm };
