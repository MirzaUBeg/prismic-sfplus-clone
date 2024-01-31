import clsx from "clsx";

type HeadingProps = {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "xl" | "lg" | "md" | "sm" | "xs" | "2xs";
  children: React.ReactNode;
  className?: string;
};

export default function Heading({
  as: Comp = "h1",
  className,
  children,
  size = "lg",
}: HeadingProps) {
  return (
    <Comp
      className={clsx(
        "font-heading font-semibold text-white leading-none",
        size === "xl" && "text-2xl md:text-4xl",
        size === "lg" && "text-xl md:text-3xl",
        size === "md" && "text-lg md:text-2xl",
        size === "sm" && "text-md md:text-xl",
        size === "xs" && "text-sm md:text-lg",
        size === "2xs" && "text-xs md:text-md",
        className,
      )}
    >
      {children}
    </Comp>
  );
}
