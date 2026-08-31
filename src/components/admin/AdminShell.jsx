import { useEffect, useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useStore } from "@/store/StoreProvider";

const links = [
  { label: "Dashboard", to: "/admin" },
  { label: "Products", to: "/admin/products" },
  { label: "Categories", to: "/admin/categories" },
  { label: "Orders", to: "/admin/orders" },
  { label: "Customers", to: "/admin/customers" },
  { label: "Coupons", to: "/admin/coupons" },
  { label: "Banners", to: "/admin/banners" },
  { label: "Store Settings", to: "/admin/settings" },
];

export default function AdminShell({ title, subtitle, children, actions }) {
  const { isAdmin, adminLogout, settings } = useStore();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isAdmin) navigate({ to: "/admin/login", replace: true });
  }, [isAdmin, navigate]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface px-4">
        <p className="text-sm text-muted-foreground">Redirecting to admin login…</p>
      </div>
    );
  }

  const logout = () => {
    adminLogout();
    navigate({ to: "/admin/login", replace: true });
  };

  const nav = (
    <nav className="grid gap-1">
      {links.map((l) => {
        const active = l.to === "/admin" ? pathname === "/admin" : pathname.startsWith(l.to);
        return (
          <Link
            key={l.to}
            to={l.to}
            className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
              active ? "bg-coral text-primary-foreground" : "text-cream/80 hover:bg-cream/10"
            }`}
          >
            {l.label}
          </Link>
        );
      })}
      <button
        type="button"
        onClick={logout}
        className="mt-2 rounded-xl px-4 py-2.5 text-left text-sm font-semibold text-cream/80 hover:bg-cream/10"
      >
        Logout
      </button>
    </nav>
  );

  return (
    <div className="flex min-h-screen bg-surface">
      <aside className="hidden w-64 shrink-0 flex-col bg-charcoal p-5 text-cream lg:flex">
        <Link to="/" className="font-display text-lg leading-tight">
          {settings.name}
          <span className="mt-1 block text-xs font-normal text-cream/60">Admin Panel</span>
        </Link>
        <div className="mt-8">{nav}</div>
      </aside>

      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-charcoal/60"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-72 bg-charcoal p-5 text-cream">
            <p className="font-display text-lg">Admin Panel</p>
            <div className="mt-6">{nav}</div>
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-card px-4 py-4 sm:px-6">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-lg border border-border px-3 py-2 text-sm lg:hidden"
            aria-label="Open admin menu"
          >
            ☰
          </button>
          <div className="min-w-0 flex-1">
            <h1 className="truncate font-display text-xl">{title}</h1>
            {subtitle && <p className="truncate text-xs text-muted-foreground">{subtitle}</p>}
          </div>
          {actions}
          <Link to="/" className="hidden rounded-lg border border-border px-3 py-2 text-sm sm:block">
            View Store
          </Link>
        </header>
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}

export function AdminCard({ children, className = "" }) {
  return <div className={`soft-card p-5 ${className}`}>{children}</div>;
}

export const field =
  "w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-coral";
