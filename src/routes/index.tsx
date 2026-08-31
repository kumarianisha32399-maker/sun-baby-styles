import { createFileRoute } from "@tanstack/react-router";
import HomePage from "@/components/site/HomePage";

const title = "Sun Baby Kids Wear | Kids Clothing & Fashion in Pune";
const description =
  "Shop trendy, comfortable and adorable kids clothing at Sun Baby Kids Wear, Chandan Nagar, Pune. Explore baby wear, girls, boys, party wear, ethnic wear and accessories.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: HomePage,
});
