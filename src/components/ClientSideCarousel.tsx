"use client";

import React from "react";
import { Card, CardContent } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

export default function ClientSidedCarousel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="px-10 w-full">
      <Carousel
        opts={{
          align: "center",
        }}
        className="max-w-full"
      >
        <CarouselContent>
          {React.Children.map(children, (child, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
              <div className="p-1">
                {/* Render the child here */}
                {child}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
