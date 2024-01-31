import { Content } from "@prismicio/client";
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react";
import { Simplify } from "../../../prismicio-types";
import ProgrammableSlice from "@/components/ProgrammableSlice";
import Heading from "@/components/Heading";
import { BookmarkOutlineIcon } from "@/components/Icons";

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
 * Props for `PageHeader`.
 */
export type PageHeaderProps = SliceComponentProps<Content.PageHeaderSlice> & {
  injectedProps?: Simplify<Content.PageHeaderSliceDefaultPrimary>;
};

const renderSectionContent = (
  props: Simplify<Content.PageHeaderSliceDefaultPrimary>,
) => (
  <div className="flex items-center justify-between">
    <div className="mx-10 mt-10 w-full">
      <PrismicRichText field={props.heading} components={components} />
      <PrismicRichText field={props.body} components={components} />
    </div>
    <div className="mr-10 flex h-10 w-10 items-center justify-center rounded-full align-middle">
      <BookmarkOutlineIcon className="h-5 w-5 text-white" />
    </div>
  </div>
);

/**
 * Component for "PageHeader" Slices.
 */
const PageHeader = ({ slice, injectedProps }: PageHeaderProps): JSX.Element => {
  return (
    <ProgrammableSlice<PageHeaderProps>
      slice={slice}
      injectedProps={injectedProps}
      renderSectionContent={renderSectionContent}
    />
  );
};

export default PageHeader;
