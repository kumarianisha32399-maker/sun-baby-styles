import { createFileRoute } from "@tanstack/react-router";
import WishlistPage from "@/components/site/WishlistPage";

const title = "Wishlist | Sun Baby Kids Wear";
const description =
  "Your saved kids wear favourites at Sun Baby Kids Wear — keep track of frocks, rompers, ethnic sets and accessories.";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: WishlistPage,
});
