import { GalleryImage } from "./GalleryImage";
import { gallery } from "@/lib/data/store-content";

export function StudioGallery() {
  return (
    <section aria-label="Studio gallery" className="pb-16 lg:pb-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="columns-1 gap-4 md:columns-2 lg:columns-3 lg:gap-6">
          {gallery.map((item) => (
            <GalleryImage key={item.src} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
