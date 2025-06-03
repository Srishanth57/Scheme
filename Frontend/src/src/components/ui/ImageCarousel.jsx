// components/ui/ImageCarousel.jsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  useCarousel,
} from "@/components/ui/carousel";

export function ImageCarousel({ images }) {
  const [api, setApi] = useState();

  // Auto-play functionality with continuous loop
  useEffect(() => {
    if (!api) {
      return;
    }

    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [api]); // Only depend on 'api' for the interval cleanup

  return (
    <Carousel setApi={setApi} className="w-full mx-auto" opts={{ loop: true }}>
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="relative w-full h-[500px]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover object-top" // <--- Added object-top here
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}