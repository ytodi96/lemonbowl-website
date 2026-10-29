import { useEffect, useRef, useState } from "react";

type FadeImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
};

/**
 * Image that starts as a soft placeholder tint and fades in once decoded,
 * instead of popping into place.
 */
export function FadeImage({ className = "", src, alt, ...rest }: FadeImageProps) {
  const ref = useRef<HTMLImageElement | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
    if (ref.current?.complete) setLoaded(true);
  }, [src]);

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onLoad={() => setLoaded(true)}
      className={`img-fade ${loaded ? "is-loaded" : ""} ${className}`}
      {...rest}
    />
  );
}
