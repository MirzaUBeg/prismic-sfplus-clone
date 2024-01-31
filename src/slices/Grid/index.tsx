import Heading from "@/components/Heading";
import { Content } from "@prismicio/client";
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react";
import { GridSliceDefaultItem, Simplify } from "../../../prismicio-types";
import ProgrammableSlice from "@/components/ProgrammableSlice";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { RectangleStackIcon } from "@/components/Icons";

const components: JSXMapSerializer = {
  heading2: ({ children }) => (
    <Heading as="h2" className="text-left text-white" size="md">
      {children}
    </Heading>
  ),
  heading3: ({ children }) => (
    <Heading as="h3" className="text-left text-white" size="xs">
      {children}
    </Heading>
  ),
  heading4: ({ children }) => (
    <Heading as="h4" className="text-left text-white" size="2xs">
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
 * Props for `Grid`.
 */
export type GridProps = SliceComponentProps<Content.GridSlice> & {
  injectedProps?: Simplify<Content.GridSliceDefaultPrimary>;
  injectedItemsProps?: GridSliceDefaultItem[];
};

// const renderSectionContent = (
//   props: Simplify<Content.GridSliceDefaultPrimary>,
// ) => (
//   <div className="mx-8 mt-10">
//       <PrismicRichText field={props.heading} components={components} />
//       <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
//         {props.items.map((item, index) => (
//           <div key={index}>
//             <PrismicNextLink field={item.link}>
//               <PrismicNextImage field={item.image} className="rounded-xl" />
//             </PrismicNextLink>
//             <div className="mt-2 flex flex-row items-center font-heading text-xs uppercase text-white">
//               <RectangleStackIcon className="mr-1 h-4 w-4" />
//               {<PrismicRichText field={item.eyebrow} components={components} />}
//             </div>
//             <PrismicRichText field={item.itemheading} components={components} />
//             <PrismicRichText field={item.body} components={components} />
//           </div>
//         ))}
//       </div>
//     </div>
// );

const renderSectionContent = (
  props: Simplify<Content.GridSliceDefaultPrimary>,
  itemProps: GridSliceDefaultItem[],
) => (
  <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
    {itemProps.map((item, index) => (
      <div key={index}>
        <PrismicNextLink field={item.link}>
          <PrismicNextImage field={item.image} className="rounded-xl" />
        </PrismicNextLink>
        <div className="mt-2 flex flex-row items-center font-heading text-xs uppercase text-white">
          <RectangleStackIcon className="mr-1 h-4 w-4" />
          <PrismicRichText field={item.eyebrow} components={components} />
        </div>
        <PrismicRichText field={item.itemheading} components={components} />
        <PrismicRichText field={item.body} components={components} />
      </div>
    ))}
  </div>
);

/**
 * Component for "Grid" Slices.
 */
const Grid = ({
  slice,
  injectedProps,
  injectedItemsProps,
}: GridProps): JSX.Element => {
  if (
    slice.variation === "programmatic" &&
    injectedProps &&
    injectedItemsProps
  ) {
    return (
      <div className="mx-8 mt-10">
        <PrismicRichText
          field={injectedProps.heading}
          components={components}
        />
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {injectedItemsProps.map((item, index) => (
            <div key={index}>
              <PrismicNextLink field={item.link}>
                <PrismicNextImage field={item.image} className="rounded-xl" />
              </PrismicNextLink>
              <div className="mt-2 flex flex-row items-center font-heading text-xs uppercase text-white">
                <RectangleStackIcon className="mr-1 h-4 w-4" />
                {
                  <PrismicRichText
                    field={item.eyebrow}
                    components={components}
                  />
                }
              </div>
              <PrismicRichText
                field={item.itemheading}
                components={components}
              />
              <PrismicRichText field={item.body} components={components} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-8 mt-10">
      <PrismicRichText field={slice.primary.heading} components={components} />
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {slice.items.map((item, index) => (
          <div key={index}>
            <PrismicNextLink field={item.link}>
              <PrismicNextImage field={item.image} className="rounded-xl" />
            </PrismicNextLink>
            <div className="mt-2 flex flex-row items-center font-heading text-xs uppercase text-white">
              <RectangleStackIcon className="mr-1 h-4 w-4" />
              {<PrismicRichText field={item.eyebrow} components={components} />}
            </div>
            <PrismicRichText field={item.itemheading} components={components} />
            <PrismicRichText field={item.body} components={components} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grid;
