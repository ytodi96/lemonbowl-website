import { FadeImage } from "@/components/fade-image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type Props = {
  images: string[];
  name: string;
};

export function ProductGallery({ images, name }: Props) {
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const touchStart = useRef<number | null>(null);
  const multiple = images.length > 1;
  const current = images[Math.min(index, images.length - 1)]!;

  const go = useCallback(
    (delta: number) => {
      setIndex((prev) => (prev + delta + images.length) % images.length);
    },
    [images.length],
  );

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(false);
      if (!multiple) return;
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [lightbox, multiple, go]);

  const onTouchStart = (event: React.TouchEvent) => {
    touchStart.current = event.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: React.TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (start == null || !multiple) return;
    const delta = (event.changedTouches[0]?.clientX ?? start) - start;
    if (Math.abs(delta) < 45) return;
    go(delta < 0 ? 1 : -1);
  };

  return (
    <div>
      <div
        className="group relative overflow-hidden rounded-2xl border border-border bg-secondary shadow-[var(--shadow-soft)]"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <button
          type="button"
          onClick={() => setLightbox(true)}
          aria-label={`View larger photo of ${name}`}
          className="block w-full cursor-zoom-in"
        >
          <FadeImage
            src={current}
            alt={
              multiple ? `${name} — photo ${index + 1} of ${images.length}` : name
            }
            width={1024}
            height={1280}
            className="aspect-[4/5] h-full w-full object-cover"
          />
        </button>

        {multiple && (
          <>
            <ArrowButton side="left" onClick={() => go(-1)} label="Previous photo" />
            <ArrowButton side="right" onClick={() => go(1)} label="Next photo" />
            <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-[color:var(--foreground)]/70 px-3 py-1 text-xs font-medium text-[color:var(--primary-foreground)] backdrop-blur-sm">
              {index + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {multiple && (
        <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show photo ${i + 1} of ${name}`}
              aria-current={i === index}
              className={`h-16 w-16 shrink-0 overflow-hidden rounded-xl border transition-all sm:h-20 sm:w-20 ${
                i === index
                  ? "border-primary ring-2 ring-primary/40"
                  : "border-border opacity-80 hover:opacity-100"
              }`}
            >
              <FadeImage
                src={src}
                alt=""
                width={160}
                height={160}
                                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${name} photos`}
          onClick={() => setLightbox(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[color:var(--foreground)]/90 p-4 sm:p-8"
        >
          <button
            type="button"
            onClick={() => setLightbox(false)}
            aria-label="Close photo viewer"
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-card text-foreground shadow-[var(--shadow-soft)] transition-colors hover:bg-accent"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>

          <div
            className="relative max-h-full w-full max-w-4xl"
            onClick={(event) => event.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <FadeImage
              src={current}
              alt={multiple ? `${name} — photo ${index + 1} of ${images.length}` : name}
              className="mx-auto max-h-[82vh] w-auto rounded-2xl object-contain"
            />
            {multiple && (
              <>
                <ArrowButton side="left" onClick={() => go(-1)} label="Previous photo" always />
                <ArrowButton side="right" onClick={() => go(1)} label="Next photo" always />
                <p className="mt-4 text-center text-sm text-[color:var(--primary-foreground)]">
                  {index + 1} / {images.length}
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ArrowButton({
  side,
  onClick,
  label,
  always,
}: {
  side: "left" | "right";
  onClick: () => void;
  label: string;
  always?: boolean;
}) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`absolute top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-card/90 text-foreground shadow-[var(--shadow-soft)] backdrop-blur-sm transition-all hover:bg-card ${
        side === "left" ? "left-3" : "right-3"
      } ${always ? "" : "opacity-0 focus-visible:opacity-100 group-hover:opacity-100 max-sm:opacity-100"}`}
    >
      <Icon className="h-5 w-5" aria-hidden />
    </button>
  );
}
