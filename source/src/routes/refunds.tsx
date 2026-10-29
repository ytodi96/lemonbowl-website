import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Placeholder } from "@/components/page-header";

const title = "Cancellation & Refunds — The Lemon Bowl";
const description = "Our cancellation windows and refund process for orders and catering.";

export const Route = createFileRoute("/refunds")({
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
      <PageHeader eyebrow="Legal" title="Cancellation & Refunds" description={description} />
      <Placeholder label="Cancellation and refund policy" />
    </>
  );
}
