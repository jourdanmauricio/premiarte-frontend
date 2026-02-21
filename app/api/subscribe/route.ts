import { NextResponse } from "next/server";
import { subscribeAction } from "@/actions/subscribeAction";
import type { NewsletterFormState } from "@/validations/subscribe";

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

/**
 * POST /api/subscribe
 * Misma lógica que la Server Action de newsletter; ruta API estable
 * para evitar "Failed to find Server Action" en deploys.
 */
export async function POST(request: Request) {
  const formData = await request.formData();
  const state = await subscribeAction(INITIAL_STATE, formData);
  return NextResponse.json(state);
}
