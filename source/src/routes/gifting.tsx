import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Placeholder } from "@/components/page-header";

const title = "Gifting — The Lemon Bowl";
const description = "Thoughtfully packed hampers and platters for festivals, milestones and corporate gifting.";

export const Route = createFileRoute("/gifting")({
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
      <PageHeader eyebrow="Gifting" title="Gifting" description={description} />
      <Placeholder label="Gifting collections and hampers" />
    </>
  );
}
