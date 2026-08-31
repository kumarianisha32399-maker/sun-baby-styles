import { createFileRoute } from "@tanstack/react-router";
import CheckoutPage from "@/components/site/CheckoutPage";

const title = "Checkout | Sun Baby Kids Wear";
const description =
  "Complete your Sun Baby Kids Wear demo order with UPI, card, cash on delivery or store pickup in Chandan Nagar, Pune.";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: CheckoutPage,
});
