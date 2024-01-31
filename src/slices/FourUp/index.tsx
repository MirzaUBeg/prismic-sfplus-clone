import Heading from "@/components/Heading";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react";

const components: JSXMapSerializer = {
  heading2: ({ children }) => (
    <Heading as="h2" className="text-center font-heading text-white" size="lg">
      {children}
    </Heading>
  ),
  heading3: ({ children }) => (
    <Heading as="h3" className="text-center font-body text-white" size="lg">
      {children}
    </Heading>
  ),
  paragraph: ({ children }) => (
    <p className="md:mb8 leading-wide mb-4 mt-3 max-w-full text-center font-body text-sm font-normal tracking-wide text-white">
      {children}
    </p>
  ),
};

/**
 * Props for `FourUp`.
 */
export type FourUpProps = SliceComponentProps<Content.FourUpSlice>;

/**
 * Component for "FourUp" Slices.
 */
const FourUp = ({ slice }: FourUpProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="mt-16"
    >
      <div className="flex flex-col items-center">
        <PrismicRichText field={slice.primary.title} components={components} />
        {slice.primary.subtitle && (
          <PrismicRichText
            field={slice.primary.subtitle}
            components={components}
          />
        )}
      </div>
      <div className="mx-8 mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        {slice.items.map((item, index) => (
          <div key={index} className="flex flex-col items-center justify-start">
            <PrismicNextImage field={item.image} className="rounded-xl" />
            <PrismicRichText field={item.header} components={components} />
            <PrismicRichText field={item.content} components={components} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FourUp;
