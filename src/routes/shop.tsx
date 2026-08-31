import { createFileRoute } from "@tanstack/react-router";
import ShopPage from "@/components/site/ShopPage";

const titles: Record<string, { title: string; subtitle: string }> = {
  new: {
    title: "New Arrivals",
    subtitle: "Freshly landed styles for newborns, kids and early teens.",
  },
  sale: {
    title: "Sale — Up To 40% Off",
    subtitle: "Best value picks on everyday and festive kids wear.",
  },
  bestsellers: {
    title: "Best Sellers",
    subtitle: "The styles parents in Chandan Nagar keep coming back for.",
  },
};

const head = {
  title: "Shop Kids Clothing Online | Sun Baby Kids Wear Pune",
  description:
    "Browse the full Sun Baby Kids Wear collection — baby rompers, girls frocks, boys shirts, ethnic sets, party wear and accessories with easy filters and search.",
};

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search["q"] === "string" ? (search["q"] as string) : undefined,
    collection:
      typeof search["collection"] === "string" ? (search["collection"] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: head.title },
      { name: "description", content: head.description },
      { property: "og:title", content: head.title },
      { property: "og:description", content: head.description },
    ],
  }),
  component: ShopRoute,
});

function ShopRoute() {
  const { q, collection } = Route.useSearch();
  const preset = collection ? titles[collection] : undefined;

  return (
    <ShopPage
      q={q ?? ""}
      collection={collection ?? ""}
      title={q ? `Search results for “${q}”` : (preset?.title ?? "Shop All Kids Wear")}
      subtitle={
        preset?.subtitle ??
        "Browse the full Sun Baby collection — newborn essentials to early-teen styles."
      }
      breadcrumb={[{ label: preset?.title ?? "Shop" }]}
    />
  );
}
