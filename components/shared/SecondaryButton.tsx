import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "next-view-transitions";

interface SecondaryButtonProps {
  label: string;
  href: string;
  className?: string;
}

const SecondaryButton = ({ label, href, className }: SecondaryButtonProps) => {
  return (
    <Button
      variant="outline"
      className={cn(
        "rounded-lg border-white/30 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/20",
        className,
      )}
      asChild
    >
      <Link href={href || "/contacto"}>{label || "Más Información"}</Link>
    </Button>
  );
};

export default SecondaryButton;
