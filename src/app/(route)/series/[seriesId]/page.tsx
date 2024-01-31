import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import Hero, { HeroProps } from "@/slices/Hero";
import { GridSliceDefaultItem, Simplify } from "../../../../../prismicio-types";
import { Content, isFilled } from "@prismicio/client";
import Grid, { GridProps } from "@/slices/Grid";

type Params = { seriesId: string };

export default async function SeriesPage({ params }: { params: Params }) {
  const client = createClient();
  const page = await client
    .getSingle("seriespagetemplate")
    .catch(() => notFound());

  const series = await client.getByUID("series", params.seriesId);
  const heroInjectedProps: Simplify<Content.HeroSliceDefaultPrimary> = {
    image: series.data.image,
    title: series.data.name
      ? [{ text: series.data.name, type: "heading1", spans: [] }]
      : [],
    body: series.data.content,
    primary_cta_text: "Watch Trailer",
    primary_cta_link: { link_type: "Web", url: "" },
    secondary_cta_text: "",
    secondary_cta_link: { link_type: "Web", url: "" },
  };

  const episodes = await Promise.all(
    series.data.episodelist.map((el) => {
      if (isFilled.contentRelationship(el.episode) && el.episode.uid) {
        return client.getByUID("episode", el.episode.uid);
      }
    }),
  );

  const gridInjectedProps: Simplify<Content.GridSliceDefaultPrimary> = {
    heading: [{ text: "Episodes", type: "heading2", spans: [] }],
  };

  const sliceItems: GridSliceDefaultItem[] = episodes.reduce<
    GridSliceDefaultItem[]
  >((acc, episode) => {
    if (!episode) {
      return acc;
    }

    const gridItem: GridSliceDefaultItem = {
      image: episode.data.image,
      link: {
        link_type: "Web",
        url: `/series/${series.uid}/episode/episode-s${episode.data.season_number}e${episode.data.episode_number}`,
      },
      eyebrow: [
        {
          type: "heading4",
          text:
            episode.data.episode_number === 0
              ? "TRAILER"
              : `EPISODE ${episode.data.episode_number}`,
          spans: [],
        },
      ],
      itemheading: [
        {
          type: "heading3",
          text: episode.data.name ? episode.data.name : "",
          spans: [],
        },
      ],
      body: episode.data.description,
    };

    acc.push(gridItem);
    return acc;
  }, []);

  return (
    <SliceZone
      slices={page.data.slices}
      components={{
        ...components,
        hero: (props: HeroProps) => (
          <Hero injectedProps={heroInjectedProps} {...props} />
        ),
        grid: (props: GridProps) => (
          <Grid
            injectedProps={gridInjectedProps}
            injectedItemsProps={sliceItems}
            {...props}
          />
        ),
      }}
    />
  );
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient();
  const page = await client
    .getSingle("seriespagetemplate")
    .catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("seriespagetemplate");

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
