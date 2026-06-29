"use client";

import React, { useState } from 'react';
import Image from 'next/image';

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const hasImages = images && images.length > 0;
  const [activeImage, setActiveImage] = useState(hasImages ? images[0] : '');

  return (
    <div className="flex flex-col gap-4">
      {/* Primary Display image */}
      <div className="relative aspect-square overflow-hidden rounded-xl border bg-muted/30 flex items-center justify-center">
        {hasImages ? (
          <Image
            fill
            priority
            src={activeImage}
            alt={title}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-all duration-300 hover:scale-105"
          />
        ) : (
          <div className="text-muted-foreground text-sm">No Image Available</div>
        )}
      </div>
      
      {/* Dynamic Thumbnails row */}
      {hasImages && images.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {images.map((imgUrl, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(imgUrl)}
              className={`relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 overflow-hidden rounded-lg border-2 bg-muted/20 transition-all ${
                activeImage === imgUrl 
                  ? 'border-primary ring-2 ring-primary/10' 
                  : 'border-border hover:border-muted-foreground'
              }`}
            >
              <Image 
                fill
                src={imgUrl} 
                alt={`${title} thumbnail ${idx + 1}`} 
                sizes="(max-width: 768px) 25vw, 10vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}