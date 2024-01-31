import { PrismicNextLink, PrismicNextLinkProps } from "@prismicio/next";
import clsx from "clsx";

export default function Button({
  className,
  ...restProps
}: PrismicNextLinkProps) {
  return (
    <PrismicNextLink
      className={clsx(
        "flex items-center justify-center transition-color font-display mt-4 h-9 w-32 rounded-sm bg-sfplus-light-blue px-3 text-center font-heading text-xs font-bold tracking-wide text-white duration-200 ease-in-out hover:opacity-50",
        className,
      )}
      {...restProps}
    />
  );
}
