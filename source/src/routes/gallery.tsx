import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { FadeImage } from "@/components/fade-image";
import { GALLERY, GALLERY_CATEGORIES, PHOTOS, type GalleryCategory } from "@/lib/photos";

const title = "Gallery — Platters, Tables & Celebrations | The Lemon Bowl";
const description =
  "Real Lemon Bowl setups — wedding mezze boards, corporate lunches, birthday grazing tables and everyday platters delivered across Delhi NCR.";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:image", content: PHOTOS.chaatThali },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: PHOTOS.chaatThali },
    ],
  }),
  component: Page,
});

function Page() {
  const [filter, setFilter] = useState<GalleryCategory | "All">("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const photos =
    filter === "All" ? GALLERY : GALLERY.filter((photo) => photo.categories.includes(filter));

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(null);
      if (event.key === "ArrowRight") setLightbox((index) => ((index ?? 0) + 1) % photos.length);
      if (event.key === "ArrowLeft")
        setLightbox((index) => ((index ?? 0) - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, photos.length]);

  const active = lightbox === null ? null : photos[lightbox];

  return (
    <>
      <PageHeader eyebrow="Gallery" title="Gallery" description={description} />

      <section className="mx-auto max-w-6xl px-6 pb-24 lg:px-10">
        <div className="flex flex-wrap gap-2.5">
          <FilterChip active={filter === "All"} onClick={() => setFilter("All")}>
            All
          </FilterChip>
          {GALLERY_CATEGORIES.map((category) => (
            <FilterChip
              key={category}
              active={filter === category}
              onClick={() => setFilter(category)}
            >
              {category}
            </FilterChip>
          ))}
        </div>

        <div className="mt-8 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {photos.map((photo, index) => (
            <figure
              key={photo.src}
              className="mb-5 break-inside-avoid overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)]"
            >
              <button
                type="button"
                onClick={() => setLightbox(index)}
                className="block w-full"
                aria-label={`Open ${photo.caption}`}
              >
                <FadeImage
                  src={photo.src}
                  alt={photo.alt}
                                    className="w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                />
              </button>
              <figcaption className="px-4 py-3 text-sm text-muted-foreground">
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        {photos.length === 0 && (
          <p className="mt-10 text-center text-muted-foreground">
            No photos in this category yet — more coming soon.
          </p>
        )}

        <div className="mt-10 rounded-2xl border border-border bg-card p-8 text-center shadow-[var(--shadow-soft)]">
          <h2 className="font-display text-2xl">Like what you see?</h2>
          <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
            Every platter here is on the menu, or can be curated for your occasion.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link
              to="/order"
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep"
            >
              Order now
            </Link>
            <Link
              to="/catering/quote"
              className="rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </section>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.caption}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[oklch(0.2_0.01_70_/_0.9)] p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            aria-label="Close"
            className="absolute right-4 top-4 rounded-full bg-card p-2.5 text-foreground transition-colors hover:bg-accent"
          >
            <X className="h-5 w-5" strokeWidth={1.8} />
          </button>
          <button
            type="button"
            aria-label="Previous photo"
            onClick={(event) => {
              event.stopPropagation();
              setLightbox((index) => ((index ?? 0) - 1 + photos.length) % photos.length);
            }}
            className="absolute left-3 rounded-full bg-card p-2.5 transition-colors hover:bg-accent sm:left-6"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={1.8} />
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={(event) => {
              event.stopPropagation();
              setLightbox((index) => ((index ?? 0) + 1) % photos.length);
            }}
            className="absolute right-3 rounded-full bg-card p-2.5 transition-colors hover:bg-accent sm:right-6"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={1.8} />
          </button>

          <figure
            className="max-h-full max-w-3xl overflow-hidden rounded-2xl bg-card"
            onClick={(event) => event.stopPropagation()}
          >
            <FadeImage
              src={active.src}
              alt={active.alt}
              className="max-h-[75vh] w-full object-contain bg-secondary"
            />
            <figcaption className="px-5 py-4 text-sm text-muted-foreground">
              {active.caption}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-4 py-2 text-sm transition-colors ${
        active
          ? "border-[color:var(--primary-deep)] bg-primary text-primary-foreground"
          : "border-border bg-card text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}
