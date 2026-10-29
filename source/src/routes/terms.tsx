import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Placeholder } from "@/components/page-header";

const title = "Terms of Service — The Lemon Bowl";
const description = "The terms that apply when you order from The Lemon Bowl.";

export const Route = createFileRoute("/terms")({
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
      <PageHeader eyebrow="Legal" title="Terms of Service" description={description} />
      <Placeholder label="Terms of service" />
    </>
  );
}
