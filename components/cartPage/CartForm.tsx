"use client";

import { Product } from "@/app/shared/types";
import { BudgetFormState } from "@/validations/budget";
import { User } from "next-auth";
import { useState, useCallback } from "react";
import { InputFormError } from "@/components/shared/InputFormError";
import { SubmitButton } from "@/components/shared/SubmitButton";

type CartFormProps = {
  user: User;
  products: Product[];
};

const INITIAL_STATE: BudgetFormState = {
  success: false,
  message: undefined,
  zodErrors: null,
  formError: null,
  data: {
    name: "",
    email: "",
    phone: "",
    message: "",
    products: [],
  },
};

const inputBaseClass =
  "w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm bg-transparent text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-400 transition-colors [&:-webkit-autofill]:[-webkit-text-fill-color:white] [&:-webkit-autofill]:[-webkit-box-shadow:0_0_0_1000px_rgb(26_27_34)_inset] [&:-webkit-autofill:hover]:[-webkit-text-fill-color:white] [&:-webkit-autofill:hover]:[-webkit-box-shadow:0_0_0_1000px_rgb(26_27_34)_inset] [&:-webkit-autofill:focus]:[-webkit-text-fill-color:white] [&:-webkit-autofill:focus]:[-webkit-box-shadow:0_0_0_1000px_rgb(26_27_34)_inset]";

const CartForm = ({ user, products }: CartFormProps) => {
  const [formstate, setFormstate] = useState<BudgetFormState>(INITIAL_STATE);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsPending(true);
      setFormstate((prev) => ({ ...prev, formError: null, zodErrors: null }));
      const form = e.currentTarget;
      const formData = new FormData(form);
      try {
        const res = await fetch("/api/budget", { method: "POST", body: formData });
        const data: BudgetFormState = await res.json();
        setFormstate(data);
      } catch {
        setFormstate((prev) => ({
          ...prev,
          success: false,
          formError: "Error al solicitar presupuesto",
        }));
      } finally {
        setIsPending(false);
      }
    },
    [],
  );

  return (
    <form
      id="budget-form"
      className="space-y-8"
      noValidate
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="products" value={JSON.stringify(products)} />
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
          readOnly={!!user?.name}
          placeholder="Ingrese su nombre"
          className={`${inputBaseClass} ${user?.name ? "cursor-default" : ""}`}
          required
          defaultValue={
            formstate.data?.name ? formstate.data?.name : (user?.name ?? "")
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
          type="email"
          id="email"
          name="email"
          readOnly={!!user?.email}
          placeholder="ejemplo@correo.com"
          className={`${inputBaseClass} ${user?.email ? "cursor-default" : ""}`}
          defaultValue={
            formstate.data?.email ? formstate.data?.email : (user?.email ?? "")
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
          type="tel"
          id="phone"
          name="phone"
          placeholder="(+54) 11 1234-5678"
          className={inputBaseClass}
          defaultValue={formstate.data?.phone ?? ""}
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
          Mensaje adicional
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          placeholder="Agregue cualquier detalle adicional sobre su solicitud..."
          className={`${inputBaseClass} resize-none`}
          defaultValue={formstate.data?.message ?? ""}
        ></textarea>
        <InputFormError
          error={formstate.zodErrors?.message}
          className="absolute top-28 mx-auto"
        />
      </div>

      <div className="relative pt-4">
        <InputFormError
          error={formstate.formError ? [formstate.formError] : undefined}
          className="absolute -top-6 mx-auto"
        />

        <SubmitButton
          label={
            products.length === 0
              ? "Agregue productos al carrito"
              : "Solicitar presupuesto"
          }
          showSpinner={isPending}
          disabled={isPending || products.length === 0}
          className={`w-full cursor-pointer font-medium py-3 px-4 rounded-md shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            products.length === 0
              ? "bg-gray-400 text-gray-600 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600 text-white focus:ring-orange-500"
          }`}
        />
      </div>

      <p className="text-xs text-slate-500 text-center">
        * Campos obligatorios
      </p>
    </form>
  );
};

export { CartForm };
