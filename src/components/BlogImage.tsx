import { useState } from "react";
import { X } from "lucide-react";

interface BlogImageProps {
  src: string;
  alt: string;
}

export function BlogImage({ src, alt }: BlogImageProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const openLightbox = () => {
    setIsLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    document.body.style.overflow = "unset";
  };

  // Close on ESC key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      closeLightbox();
    }
  };

  return (
    <>
      {/* Main Image */}
      <figure className="my-8">
        <div
          className="group relative cursor-zoom-in overflow-hidden rounded-lg border border-border transition-all hover:shadow-lg"
          onClick={openLightbox}
        >
          {!isLoaded && (
            <div className="absolute inset-0 animate-pulse bg-muted" />
          )}
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className="w-full transition-transform duration-300 group-hover:scale-105"
            onLoad={() => setIsLoaded(true)}
          />
          <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
        </div>
        {alt && (
          <figcaption className="mt-3 text-center text-sm italic text-muted-foreground">
            {alt}
          </figcaption>
        )}
      </figure>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            aria-label="Close lightbox"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Image Container */}
          <div
            className="relative max-h-[90vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={src}
              alt={alt}
              className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
            />
            {alt && (
              <div className="mt-4 text-center text-sm text-white/90">
                {alt}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
