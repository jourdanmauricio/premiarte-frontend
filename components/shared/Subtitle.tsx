import { cn } from "@/lib/utils";

type SubtitleProps = {
  subtitle: string;
  className?: string;
};

const Subtitle = ({ subtitle, className }: SubtitleProps) => {
  return (
    <h2
      className={cn(
        "text-center text-2xl font-semibold tracking-tight text-orange-500 md:text-5xl",
        className,
      )}
    >
      <span>{subtitle}</span>
    </h2>
  );
};

export default Subtitle;
