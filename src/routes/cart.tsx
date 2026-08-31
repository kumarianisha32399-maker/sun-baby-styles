import { createFileRoute } from "@tanstack/react-router";
import CartPage from "@/components/site/CartPage";

const title = "Shopping Bag | Sun Baby Kids Wear";
const description =
  "Review the kids wear in your Sun Baby shopping bag, apply coupons and continue to a quick demo checkout.";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: CartPage,
});
