import Heading from "@/components/Heading";
import { createClient } from "@/prismicio";
import { Content, isFilled } from "@prismicio/client";
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react";
import { EpisodeDocument } from "../../../prismicio-types";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import ClientSidedCarousel from "@/components/ClientSideCarousel";

const components: JSXMapSerializer = {
  heading2: ({ children }) => (
    <Heading as="h2" size="md">
      {children}
    </Heading>
  ),
  paragraph: ({ children }) => (
    <p className="md:mb8 mb-4 max-w-md font-body text-2xl font-normal leading-10 text-white">
      {children}
    </p>
  ),
};

/**
 * Props for `UniversalCarousel`.
 */
export type UniversalCarouselProps =
  SliceComponentProps<Content.UniversalCarouselSlice> & {
    seriesId?: string;
  };

/**
 * Component for "UniversalCarousel" Slices.
 */
const UniversalCarousel = async ({
  slice,
  seriesId,
}: UniversalCarouselProps): Promise<JSX.Element> => {
  let episodes: EpisodeDocument[] = [];

  if (slice.variation === "episodeList") {
    const client = createClient();
    const fetchedEpisodes = await Promise.all(
      slice.items.map((item) => {
        if (isFilled.contentRelationship(item.episode) && item.episode.uid) {
          return client.getByUID("episode", item.episode.uid);
        }
        return undefined;
      }),
    );

    episodes = fetchedEpisodes.filter(
      (episode): episode is EpisodeDocument => episode !== undefined,
    );
  }

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="mx-10 mb-10 mt-20"
    >
      <PrismicRichText field={slice.primary.heading} components={components} />
      <ClientSidedCarousel>
        {episodes.map((item, index) => (
          <div key={item.uid} className="my-2">
            <PrismicNextLink
              href={
                item.data.special
                  ? ""
                  : `/series/${
                      isFilled.contentRelationship(item.data.series)
                        ? item.data.series.uid
                        : ""
                    }/episode/episode-s${item.data.season_number}e${
                      item.data.episode_number
                    }`
              }
            >
              <PrismicNextImage
                field={item.data.image}
                className="mr-4 rounded-2xl"
              />
            </PrismicNextLink>
            <div className="my-2">
              {/* Eyebrow */}
              <p className="font-heading text-sm text-white">
                {item.data.special
                  ? "SPECIAL"
                  : `SEASON ${item.data.season_number}: EPISODE ${item.data.episode_number}`}
              </p>
            </div>
            <Heading as="h6" size="xs">
              {item.data.name}
            </Heading>
          </div>
        ))}
      </ClientSidedCarousel>
    </section>
  );
};

export default UniversalCarousel;
