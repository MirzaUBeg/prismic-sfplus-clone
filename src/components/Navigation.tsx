import { ClientSidedNavigation } from "./ClientSidedNavigation";
import { createClient } from "@/prismicio";
import {
  FilledLinkToWebField,
  LinkType,
  SliceZone,
  isFilled,
} from "@prismicio/client";
import {
  NavigationMenuSlice,
  NavigationMenuSliceDefaultItem,
  NavigationMenuSliceEventListingItem,
  NavigationMenuSliceSeriesListingItem,
  Simplify,
} from "../../prismicio-types";

interface NavigationProps {
  slices: SliceZone<NavigationMenuSlice> | undefined;
}

export default async function Navigation({ slices }: NavigationProps) {
  const client = createClient();
  if (!slices) return <></>;

  let items: Array<Simplify<NavigationMenuSliceDefaultItem> | undefined> = []; // Define items here

  const menuItemsPromises = slices.map(async (slice) => {
    if (slice.variation === "default") {
      items = slice.items;
    } else if (
      slice.variation === "seriesListing" ||
      slice.variation === "eventListing"
    ) {
      const sliceItems = slice.items.map(async (item) => {
        if (slice.variation === "seriesListing") {
          const seriesItem =
            item as Simplify<NavigationMenuSliceSeriesListingItem>;
          if (
            isFilled.contentRelationship(seriesItem.series) &&
            seriesItem.series.uid
          ) {
            const data = await client.getByUID("series", seriesItem.series.uid);
            const url = `/series/${data.uid || ""}`;
            return createMenuItem(url, data.data.name?.toString() || "");
          }
        } else if (slice.variation === "eventListing") {
          const eventItem =
            item as Simplify<NavigationMenuSliceEventListingItem>;
          if (
            isFilled.contentRelationship(eventItem.event) &&
            eventItem.event.uid
          ) {
            const data = await client.getByUID("event", eventItem.event.uid);
            const url = `/event/${data.uid || ""}`;
            return createMenuItem(url, data.data.name?.toString() || "");
          }
        }
        return undefined;
      });
      items = (await Promise.all(sliceItems)).filter(
        (item) => item !== undefined,
      );
    }

    // Structure the data with parenttext, parentlink, and items
    return {
      parenttext: slice.primary.parenttext,
      parentlink:
        slice.variation === "singleItem" ? slice.primary.parentlink : undefined,
      items: items.filter(
        (item): item is Simplify<NavigationMenuSliceDefaultItem> =>
          item !== undefined,
      ),
    };
  });
  const menuItemsArrays = await Promise.all(menuItemsPromises);

  return <ClientSidedNavigation menuItemsArrays={menuItemsArrays} />;
}

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
