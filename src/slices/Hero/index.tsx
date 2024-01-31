import Button from "@/components/Button";
import Heading from "@/components/Heading";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react";
import { Simplify } from "../../../prismicio-types";
import ProgrammableSlice from "@/components/ProgrammableSlice";

const components: JSXMapSerializer = {
  heading1: ({ children }) => (
    <Heading as="h1" className="text-left text-white" size="md">
      {children}
    </Heading>
  ),
  paragraph: ({ children }) => (
    <p className="md:mb8 leading-wide mb-4 mt-3 max-w-md text-left font-body text-sm font-normal tracking-wide text-white">
      {children}
    </p>
  ),
};

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice> & {
  injectedProps?: Simplify<Content.HeroSliceDefaultPrimary>;
};

const renderSectionContent = (
  props: Simplify<Content.HeroSliceDefaultPrimary>,
) => (
  <div className="relative w-screen">
    <div className="relative">
      <div className="z-10 h-auto w-full">
        <PrismicNextImage field={props.image} />
      </div>
      <div
        className="absolute inset-0 z-20"
        style={{
          background:
            "linear-gradient(to right, rgba(59, 7, 100, 1) 0%, rgba(0, 0, 0, 0) 100%)",
        }}
      />
      <div className="absolute inset-0 z-30 flex h-full min-h-96 w-full min-w-96 items-center">
        <div className="mx-10 w-1/3">
          <PrismicRichText field={props.title} components={components} />
          <PrismicRichText field={props.body} components={components} />
          <div className="flex gap-3">
            <Button field={props.primary_cta_link}>
              {props.primary_cta_text}
            </Button>
            {props.secondary_cta_link && props.secondary_cta_text && (
              <Button field={props.secondary_cta_link}>
                {props.secondary_cta_text}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice, injectedProps }: HeroProps): JSX.Element => {
  return (
    <ProgrammableSlice<HeroProps>
      slice={slice}
      injectedProps={injectedProps}
      renderSectionContent={renderSectionContent}
    />
  );
};

export default Hero;
