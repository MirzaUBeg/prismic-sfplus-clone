import { createClient } from "@/prismicio";
import { notFound } from "next/navigation";
import { Simplify } from "../../../../../../../prismicio-types";
import * as prismic from "@prismicio/client";
import { Content } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import { Metadata } from "next";
import VideoPlayer, { VideoPlayerProps } from "@/slices/VideoPlayer";
import PageHeader, { PageHeaderProps } from "@/slices/PageHeader";

type Params = { seriesId: string; episodeSlug: string };

export default async function EpisodePage({ params }: { params: Params }) {
  const extractedData = extractSeasonAndEpisode(params.episodeSlug);
  if (!extractedData) notFound();

  const { seasonNumber, episodeNumber } = extractedData;

  const client = createClient();
  const page = await client
    .getSingle("episodepagetemplate")
    .catch(() => notFound());

  try {
    const episode = await client.getSingle("episode", {
      filters: [
        prismic.filter.at("my.episode.season_number", seasonNumber),
        prismic.filter.at("my.episode.episode_number", episodeNumber),
      ],
    });

    if (!episode) notFound();

    const videoPlayerInjectedProps: Simplify<Content.VideoPlayerSliceDefaultPrimary> =
      {
        thumbnail: episode.data.image,
      };

    const pageHeaderInjectedProps: Simplify<Content.PageHeaderSliceDefaultPrimary> =
      {
        heading: episode.data.name
        ? [{ text: episode.data.name, type: "heading1", spans: [] }]
        : [],
        body: episode.data.description,
      };

    return (
      <SliceZone
        slices={page.data.slices}
        components={{
          ...components,
          video_player: (props: VideoPlayerProps) => (
            <VideoPlayer injectedProps={videoPlayerInjectedProps} {...props} />
          ),
          page_header:  (props: PageHeaderProps) => (
            <PageHeader injectedProps={pageHeaderInjectedProps} {...props} />
          ),
        }}
      />
    );
  } catch (error) {
    notFound();
  }
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient();
  const page = await client
    .getSingle("episodepagetemplate")
    .catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("episodepagetemplate");

  return pages.map((page) => {
    return { uid: page.uid };
  });
}

function extractSeasonAndEpisode(slug: string) {
  const regex = /episode-s(\d+)e(\d+)/;
  const match = slug.match(regex);

  if (match) {
    return {
      seasonNumber: parseInt(match[1], 10), // First captured group is season number
      episodeNumber: parseInt(match[2], 10), // Second captured group is episode number
    };
  }

  return null; // Return null or an appropriate default value if the format does not match
}
