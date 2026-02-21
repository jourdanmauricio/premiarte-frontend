"use client";

import { actions } from "@/actions";

import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/shared/SubmitButton";
import { useActionState } from "react";
import { type NewsletterFormState } from "@/validations/subscribe";
import { InputFormError } from "@/components/shared/InputFormError";

const INITIAL_STATE: NewsletterFormState = {
  success: false,
  message: undefined,
  zodErrors: null,
  formError: null,
  data: {
    name: "",
    email: "",
  },
};

const NewsletterSection = () => {
  const [formstate, formAction, isPending] = useActionState(
    actions.subscribe.subscribeAction,
    INITIAL_STATE,
  );

  return (
    <section className="section-container mb-24">
      <div className="relative z-10 px-4 md:px-6">
        <div className="flex flex-col items-center space-y-8 text-center">
          {/* Título mejorado */}
          <div className="space-y-4">
            <h2 className="font-montserrat text-3xl font-semibold text-white md:text-4xl lg:text-5xl">
              <span className="bg-linear-to-r from-orange-400 via-red-500 to-orange-600 bg-clip-text text-transparent">
                Suscríbete
              </span>{" "}
              <span className="text-gray-200">a nuestro boletín</span>
            </h2>
            <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              Suscríbete para recibir ofertas especiales, obsequios y consejos
              para tus agasajos.
            </p>
          </div>

          {/* Formulario mejorado */}
          <div className="w-full max-w-md">
            {formstate.success ? (
              <div className="w-full h-full bg-black/50 z-50">
                <div className="flex flex-col items-center justify-center h-full">
                  <h2 className="font-montserrat text-2xl font-semibold">
                    Gracias por suscribirte a nuestro boletín
                  </h2>
                  <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                    Te esperamos en nuestras redes sociales para ofrecerte las
                    mejores ofertas y novedades.
                  </p>
                </div>
              </div>
            ) : (
              <form action={formAction} className="space-y-12" noValidate>
                <div className="space-y-8">
                  <div className="relative">
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Ingresa tu nombre"
                      className="w-full rounded-lg px-4 py-4 text-lg text-white placeholder:text-gray-400"
                      maxLength={50}
                      defaultValue={formstate.data?.name ?? ""}
                    />
                    <InputFormError error={formstate.zodErrors?.name} />
                  </div>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Ingresa tu email"
                      className="w-full rounded-lg px-4 py-4 text-lg text-white placeholder:text-gray-400"
                      defaultValue={formstate.data?.email ?? ""}
                    />
                    <InputFormError error={formstate.zodErrors?.email} />
                  </div>
                </div>

                <div className="relative">
                  <InputFormError
                    error={
                      formstate.formError ? [formstate.formError] : undefined
                    }
                    className="absolute -top-6 mx-auto"
                  />

                  <SubmitButton
                    label="Suscríbete"
                    showSpinner={isPending}
                    disabled={isPending}
                    className="px-8 py-6 text-lg font-semibold text-white min-w-40 w-full"
                  />
                </div>
              </form>
            )}
          </div>

          {/* Texto legal mejorado */}
          {!formstate.success && (
            <p className="max-w-md text-sm leading-relaxed text-gray-400">
              Al suscribirse, acepta nuestros{" "}
              <span className="cursor-pointer text-orange-400 transition-colors hover:text-orange-300">
                Términos de servicio
              </span>{" "}
              y{" "}
              <span className="cursor-pointer text-orange-400 transition-colors hover:text-orange-300">
                Política de privacidad
              </span>
              .
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export { NewsletterSection };
