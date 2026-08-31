import { createFileRoute } from "@tanstack/react-router";
import ProductDetailPage from "@/components/site/ProductDetailPage";
import { products } from "@/data/products";

export const Route = createFileRoute("/product/$id")({
  head: ({ params }) => {
    const product = products.find((p) => String(p.id) === params.id);
    const title = product
      ? `${product.name} | Sun Baby Kids Wear`
      : "Product | Sun Baby Kids Wear";
    const description = product
      ? `${product.name} — ${product.fabric}, ages ${product.ageGroup}. Available at Sun Baby Kids Wear, Chandan Nagar, Pune.`
      : "Kids clothing at Sun Baby Kids Wear, Chandan Nagar, Pune.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: ProductRoute,
});

function ProductRoute() {
  const { id } = Route.useParams();
  return <ProductDetailPage id={id} />;
}
