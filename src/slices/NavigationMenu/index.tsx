// Getting replaced by Navitaion.tsx

import { createClient } from "@/prismicio";
import {
  Content,
  FilledLinkToWebField,
  LinkType,
  isFilled,
} from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
import {
  NavigationMenuSliceDefaultItem,
  Simplify,
} from "../../../prismicio-types";

/**
 * Props for `NavigationMenu`.
 */
export type NavigationMenuProps =
  SliceComponentProps<Content.NavigationMenuSlice>;

/**
 * Component for "NavigationMenu" Slices.
 */
const NavigationMenu = async ({
  slice,
}: NavigationMenuProps): Promise<JSX.Element> => {
  let menuItems = slice.variation === "default" ? slice.items : [];

  //refactor two blocks below
  if (slice.variation === "seriesListing") {
    const client = createClient();
    const sliceItems = slice.items.map(async (item) => {
      if (isFilled.contentRelationship(item.series) && item.series.uid) {
        const series = await client.getByUID("series", item.series.uid);
        const seriesURL = `/series/${series.uid || ""}`;
        return createMenuItem(seriesURL, series.data.name?.toString() || "");
      }
      return undefined;
    });

    const resolvedItems = await Promise.all(sliceItems);
    menuItems = resolvedItems.filter(
      (item): item is Simplify<NavigationMenuSliceDefaultItem> =>
        item !== undefined,
    );
  }

  if (slice.variation === "eventListing") {
    const client = createClient();
    const sliceItems = slice.items.map(async (item) => {
      if (isFilled.contentRelationship(item.event) && item.event.uid) {
        const event = await client.getByUID("event", item.event.uid);
        const eventURL = `/event/${event.uid || ""}`;
        return createMenuItem(eventURL, event.data.name?.toString() || "");
      }
      return undefined;
    });
    const resolvedItems = await Promise.all(sliceItems);
    menuItems = resolvedItems.filter(
      (item): item is Simplify<NavigationMenuSliceDefaultItem> =>
        item !== undefined,
    );
  }

  return (
    <li
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {/* For single item */}
      {slice.variation === "singleItem" && (
        <PrismicNextLink
          field={slice.primary.parentlink}
          className="text-sfplus-dark text-md font-body font-bold hover:text-sfplus-light-blue"
        >
          {slice.primary.parenttext}
        </PrismicNextLink>
      )}

      {/* For multiple item  */}
      {slice.variation !== "singleItem" && (
        <details>
          <summary className="text-sfplus-dark text-md font-body font-bold hover:text-sfplus-light-blue">
            {slice.primary.parenttext}
          </summary>
          <ul className="w-[300px] rounded-t-none bg-base-100 p-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <PrismicNextLink
                  field={item.childlink}
                  className="text-sfplus-dark font-heading text-sm font-bold hover:text-sfplus-light-blue"
                >
                  {item.childtext}
                </PrismicNextLink>
              </li>
            ))}
          </ul>
        </details>
      )}
    </li>
  );
};

export default NavigationMenu;

function createMenuItem(
  url: string | undefined,
  name: string,
): Simplify<NavigationMenuSliceDefaultItem> | undefined {
  if (url) {
    const linkField: FilledLinkToWebField = {
      link_type: LinkType.Web,
      url: url,
    };

    return {
      childlink: linkField,
      childtext: name,
    };
  }
  return undefined;
}
