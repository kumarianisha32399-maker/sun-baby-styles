import { createFileRoute } from "@tanstack/react-router";
import ContactPage from "@/components/site/ContactPage";

const title = "Contact & Store Visit | Sun Baby Kids Wear Pune";
const description =
  "Visit Sun Baby Kids Wear at Shop No. 48, Samruddhi Market, Chandan Nagar, Pune. Call +91 91680 01210, open 9 AM to 10 PM.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: ContactPage,
});
