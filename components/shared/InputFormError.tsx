import { cn } from "@/lib/utils";

type InputFormErrorProps = {
  error?: string[] | null;
  className?: string;
};

const InputFormError = ({ error, className }: InputFormErrorProps) => {
  if (!error) return null;

  return error.map((err) => (
    <span
      className={cn("text-red-500 text-sm absolute top-10 left-0", className)}
      key={err}
    >
      {err}
    </span>
  ));
};

export { InputFormError };
