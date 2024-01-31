// Code for the Homepage

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { SliceZone } from "@prismicio/react";
// import Lenis from "@studio-freight/lenis";
// import { useEffect, useState } from "react";
// import { PageDocument } from "../../../prismicio-types";
import { Metadata } from "next";

export default async function Page() {
  // useEffect(() => {
  //   const lenis = new Lenis({
  //     lerp: 0.1,
  //   });

  //   function raf(time: any) {
  //     lenis.raf(time);
  //     requestAnimationFrame(raf);
  //   }

  //   requestAnimationFrame(raf);
  // }, []);

  // const [homepage, setHomepage] = useState<PageDocument | null>(null);

  // useEffect(() => {
  //   async function fetchPageData() {
  const client = createClient();
  const homepage = await client.getByUID("page", "home");
  //     setHomepage(homepage);
  //   }

  //   fetchPageData();
  // }, []);

  if (!homepage) {
    return <div>Loading...</div>; // Or any other loading state
  }

  return (
    <SliceZone
      slices={homepage.data.slices}
      components={{
        ...components,
      }}
    />
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("page");

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}
