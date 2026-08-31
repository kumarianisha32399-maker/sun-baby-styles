import { createFileRoute, Link } from "@tanstack/react-router";
import AdminShell, { AdminCard } from "@/components/admin/AdminShell";
import { inr, useStore } from "@/store/StoreProvider";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard | Sun Baby Kids Wear" },
      { name: "description", content: "Mock dashboard metrics for the Sun Baby Kids Wear demo store." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminDashboard,
});

function AdminDashboard() {
  const { products, orders, customers, wishlist } = useStore();

  const revenue = orders.reduce((n, o) => n + o.amount, 0);
  const lowStock = products.filter((p) => p.stock <= 8);

  const stats = [
    { label: "Total Products", value: products.length, tint: "bg-sky/25" },
    { label: "Total Orders", value: orders.length, tint: "bg-mint/30" },
    { label: "Total Customers", value: customers.length, tint: "bg-softpink/30" },
    { label: "Total Revenue", value: inr(revenue), tint: "bg-sunshine/30" },
    { label: "Low Stock", value: lowStock.length, tint: "bg-coral/20" },
    { label: "Wishlist Items", value: wishlist.length, tint: "bg-sky/25" },
  ];

  return (
    <AdminShell title="Dashboard" subtitle="Session-only demo data">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className={`soft-card p-5 ${s.tint}`}>
            <p className="text-sm font-semibold text-charcoal/70">{s.label}</p>
            <p className="mt-2 font-display text-3xl">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <AdminCard>
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg">Recent Orders</h2>
            <Link to="/admin/orders" className="text-sm font-semibold text-coral">
              View all
            </Link>
          </div>
          <ul className="mt-4 divide-y divide-border text-sm">
            {orders.slice(0, 6).map((o) => (
              <li key={o.id} className="flex items-center justify-between gap-3 py-2.5">
                <div className="min-w-0">
                  <p className="truncate font-semibold">{o.customer}</p>
                  <p className="truncate text-xs text-muted-foreground">{o.id}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{inr(o.amount)}</p>
                  <p className="text-xs text-muted-foreground">{o.status}</p>
                </div>
              </li>
            ))}
          </ul>
        </AdminCard>

        <AdminCard>
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg">Low Stock Alerts</h2>
            <Link to="/admin/products" className="text-sm font-semibold text-coral">
              Manage
            </Link>
          </div>
          <ul className="mt-4 divide-y divide-border text-sm">
            {lowStock.length === 0 && (
              <li className="py-3 text-muted-foreground">Everything is comfortably in stock.</li>
            )}
            {lowStock.map((p) => (
              <li key={p.id} className="flex items-center justify-between gap-3 py-2.5">
                <span className="truncate">{p.name}</span>
                <span className="shrink-0 rounded-full bg-coral/20 px-3 py-1 text-xs font-semibold">
                  {p.stock} left
                </span>
              </li>
            ))}
          </ul>
        </AdminCard>
      </div>
    </AdminShell>
  );
}
