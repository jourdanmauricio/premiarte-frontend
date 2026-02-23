import { NextResponse } from "next/server";
import type { ContactFormState } from "@/validations/contact";
import { contactAction } from "@/actions/contactActions";

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

/**
 * POST /api/budget
 * Misma lógica que la Server Action de presupuesto, pero como ruta API estable
 * para evitar el error "Failed to find Server Action" en deploys (build ID mismatch).
 */
export async function POST(request: Request) {
  const formData = await request.formData();
  const state = await contactAction(INITIAL_STATE, formData);
  return NextResponse.json(state);
}
