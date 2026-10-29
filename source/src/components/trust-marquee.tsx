/**
 * "Brands that trust us" — a continuous right-to-left marquee.
 * Replace the names (and drop in logo image URLs) as real client permissions come through.
 */
const BRANDS = [
  "DAG — Delhi Art Gallery",
  "Bikaji",
  "Shriram Group",
  "The Oberoi Centre",
  "Zomato Offices",
  "Max Healthcare",
  "IIM Alumni Delhi",
  "Nykaa",
];

export function TrustMarquee() {
  return (
    <section className="border-y border-border bg-card py-10">
      <p className="eyebrow text-center">Brands that trust us</p>
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
