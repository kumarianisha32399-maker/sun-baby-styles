import { createFileRoute, notFound } from "@tanstack/react-router";
import ShopPage from "@/components/site/ShopPage";
import { categories } from "@/data/categories";

export const Route = createFileRoute("/category/$category")({
  loader: ({ params }) => {
    const category = categories.find((c) => c.slug === params.category);
    if (!category) throw notFound();
    return { name: category.name, blurb: category.blurb, slug: category.slug };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Category not found | Sun Baby Kids Wear" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.name} — Kids Wear | Sun Baby Kids Wear Pune`;
    const description = `${loaderData.blurb} Shop ${loaderData.name.toLowerCase()} at Sun Baby Kids Wear, Chandan Nagar, Pune.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: CategoryRoute,
});

function CategoryRoute() {
  const { name, blurb, slug } = Route.useLoaderData();

  return (
    <ShopPage
      category={slug}
      title={name}
      subtitle={blurb}
      breadcrumb={[{ label: "Shop", to: "/shop" }, { label: name }]}
    />
  );
}
