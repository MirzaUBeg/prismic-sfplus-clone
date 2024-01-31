import type { Metadata } from "next";
import { Inter, Nunito_Sans } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import {
  PrismicNextImage,
  PrismicNextLink,
  PrismicPreview,
} from "@prismicio/next";
import { createClient, repositoryName } from "@/prismicio";
import Navigation from "@/components/Navigation";

const nunito = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = createClient();
  const nav = await client.getSingle("globalnav");

  return (
    <html lang="en" className={clsx(nunito.variable, inter.variable)}>
      <body>
        <header className="top-0 z-40 w-full">
          {/* L1 Nav */}
          <div className="h-14 bg-[#BDB246]">
            <PrismicNextImage
              field={nav.data.logo}
              height={70}
              width={70}
              className="ml-10"
            />
          </div>
          {/* <L2Nav /> */}
          <div className="flex bg-[#FFE0B5]">
            <div className="flex h-14 items-center gap-6 pl-5">
              <PrismicNextLink field={nav.data.logotextlink}>
                <PrismicNextImage
                  field={nav.data.logotext}
                  height={60}
                  width={150}
                  className="mr-3"
                />
              </PrismicNextLink>
            </div>
            <div className="navbar z-40 ml-20 flex items-center">
              <Navigation slices={nav.data.slices}></Navigation>
            </div>
          </div>
        </header>
        {children}
        {/* Background color */}
        <div className="fixed inset-0 z-[-1] bg-gradient-to-tr from-purple-950 to-[#001639]" />
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}