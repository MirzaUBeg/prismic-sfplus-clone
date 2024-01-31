import { createClient } from "@/prismicio";
import { SliceZone } from "@prismicio/react";
import { notFound } from "next/navigation";
import { components } from "@/slices";
import Hero, { HeroProps } from "@/slices/Hero";
import { Simplify } from "../../../../../prismicio-types";
import { Content } from "@prismicio/client";

type Params = { eventId: string };

export default async function ExperiencePage({ params }: { params: Params }) {
  const client = createClient();
  const page = await client
    .getSingle("eventpagetemplate")
    .catch(() => notFound());

  const eventObj = await client
    .getByUID("event", params.eventId)
    .catch(() => notFound());
  const heroInjectedProps: Simplify<Content.HeroSliceDefaultPrimary> = {
    image: eventObj.data.image,
    title: eventObj.data.tagline
      ? [{ text: eventObj.data.tagline, type: "heading1", spans: [] }]
      : [],
    body: eventObj.data.description,
    primary_cta_text: eventObj.data.cta,
    primary_cta_link: eventObj.data.ctalink,
    secondary_cta_text: "",
    secondary_cta_link: { link_type: "Web", url: "" },
  };

  return (
    <SliceZone
      slices={eventObj.data.slices}
      components={{
        ...components,
        hero: (props: HeroProps) => (
          <Hero injectedProps={heroInjectedProps} {...props} />
        ),
      }}
    />
  );
}
