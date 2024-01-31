import Heading from "@/components/Heading";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import {
  JSXMapSerializer, 
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react";
import clsx from "clsx";

const components: JSXMapSerializer = {
  heading2: ({ children }) => (
    <Heading as="h2" size="md">
      {children}
    </Heading>
  ),
  paragraph: ({ children }) => (
    <p className="md:mb8 text-md mb-4 max-w-md font-body font-normal leading-10 text-white">
      {children}
    </p>
  ),
  listItem: ({ children }) => (
    <li className="text-md ml-4 list-disc font-body font-normal leading-10 text-white">
      {children}
    </li>
  ),
};

/**
 * Props for `TextWithImage`.
 */
export type TextWithImageProps =
  SliceComponentProps<Content.TextWithImageSlice>;

/**
 * Component for "TextWithImage" Slices.
 */
const TextWithImage = ({ slice }: TextWithImageProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="grid grid-cols-1 items-center gap-10 bg-purple-950 bg-opacity-75 py-20 pl-24 md:grid-cols-2"
    >
      <div className={clsx(slice.variation === "imageLeft" && "md:order-2")}>
        <div>
          <div className="mb-4">
            <PrismicRichText
              field={slice.primary.heading}
              components={components}
            />
          </div>
          <div>
            <PrismicRichText
              field={slice.primary.body}
              components={components}
            />
          </div>
        </div>
      </div>
      <div className={clsx(slice.variation === "imageLeft" && "md:order-1")}>
        <PrismicNextImage
          field={slice.primary.image}
          className="my-8 w-full max-w-lg rounded-3xl drop-shadow-xl"
        />
      </div>
    </section>
  );
};
export default TextWithImage;
