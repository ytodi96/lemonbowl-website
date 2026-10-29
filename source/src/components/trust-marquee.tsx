/**
 * "Who we cater for" — a continuous right-to-left marquee.
 * Client categories only: add a named brand only with that client's written permission.
 */
const BRANDS = [
  "Art galleries",
  "Consumer brands",
  "Corporate offices",
  "Tech teams",
  "Law firms",
  "Family celebrations",
  "Exhibition previews",
  "Festive gifting",
];

export function TrustMarquee() {
  return (
    <section className="border-y border-border bg-card py-10">
      <p className="eyebrow text-center">Who we cater for</p>
      <div className="marquee mt-6">
        <div className="marquee-track">
          {[...BRANDS, ...BRANDS].map((brand, index) => (
            <span
              key={`${brand}-${index}`}
              aria-hidden={index >= BRANDS.length}
              className="font-display whitespace-nowrap text-xl text-muted-foreground sm:text-2xl"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
