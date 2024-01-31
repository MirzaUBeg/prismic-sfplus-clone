import Heading from "@/components/Heading";
import {
  Content,
  FilledLinkToWebField,
  ImageField,
  LinkType,
  isFilled,
} from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react";
import {
  LandscapeCardSliceDefaultItem,
  Simplify,
} from "../../../prismicio-types";
import { createClient } from "@/prismicio";

const components: JSXMapSerializer = {
  heading2: ({ children }) => (
    <Heading as="h2" className="text-left text-white" size="md">
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
 * Props for `LandscapeCard`.
 */
export type LandscapeCardProps =
  SliceComponentProps<Content.LandscapeCardSlice>;

/**
 * Component for "LandscapeCard" Slices.
 */
const LandscapeCard = async ({
  slice,
}: LandscapeCardProps): Promise<JSX.Element> => {
  let sliceItems: Simplify<LandscapeCardSliceDefaultItem>[] = [];

  if (slice.variation === "default") {
    sliceItems = slice.items.map((item) => {
      return { link: item.link, name: item.name, image: item.image };
    });
  } else if (slice.variation === "episodeSelection") {
    const client = createClient();

    const sliceItemsPromises = slice.items.map(async (item) => {
      if (isFilled.contentRelationship(item.episode) && item.episode.uid) {
        const episode = await client.getByUID("episode", item.episode.uid);
        const episodeURL = `/series/${episode.uid}`; //TODO: need to form the correct one
        const landscapeCardItem = createLandscapeCardSliceItem(
          episodeURL,
          episode.data.name || "",
          episode.data.image,
        );

        return landscapeCardItem;
      }
      return undefined;
    });

    const resolvedItems = await Promise.all(sliceItemsPromises);
    sliceItems = resolvedItems.filter(
      (item): item is Simplify<LandscapeCardSliceDefaultItem> =>
        item !== undefined,
    );
  } else if (slice.variation === "eventSelection") {
    const client = createClient();

    const sliceItemsPromises = slice.items.map(async (item) => {
      if (isFilled.contentRelationship(item.event) && item.event.uid) {
        const event = await client.getByUID("event", item.event.uid);
        return createLandscapeCardSliceItem(
          `/event/${event.uid}`,
          event.data.name || "",
          event.data.thumbnail,
        );
      }
      return undefined;
    });

    const resolvedItems = await Promise.all(sliceItemsPromises);
    sliceItems = resolvedItems.filter(
      (item): item is Simplify<LandscapeCardSliceDefaultItem> =>
        item !== undefined,
    );
  }

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="mx-10 mb-10 mt-20"
    >
      <PrismicRichText field={slice.primary.heading} components={components} />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {sliceItems.map((item) => (
          <PrismicNextLink field={item.link} key={item.name}>
            <div className="relative">
              <PrismicNextImage
                field={item.image}
                className="block h-full w-full rounded-2xl object-cover"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-4">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-[#0176D3] via-transparent to-transparent"></div>
                <div className="relative z-10">
                  <Heading as="h2" className="text-white" size="md">
                    {item.name}
                  </Heading>
                </div>
              </div>
            </div>
          </PrismicNextLink>
        ))}
      </div>
    </section>
  );
};

export default LandscapeCard;

function createLandscapeCardSliceItem(
  url: string | undefined,
  name: string,
  image: ImageField,
): Simplify<LandscapeCardSliceDefaultItem> | undefined {
  if (url) {
    const linkField: FilledLinkToWebField = {
      link_type: LinkType.Web,
      url: url,
    };

    return {
      link: linkField,
      name: name,
      image: image,
    };
  }
  return undefined;
}
