import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Placeholder } from "@/components/page-header";

const title = "Privacy Policy — The Lemon Bowl";
const description = "How we collect, use and protect your information.";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy Policy" description={description} />
      <Placeholder label="Privacy policy" />
    </>
  );
}
