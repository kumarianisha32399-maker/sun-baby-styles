import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import AdminShell, { AdminCard, field } from "@/components/admin/AdminShell";
import { inr, useStore } from "@/store/StoreProvider";

export const Route = createFileRoute("/admin/products")({
  head: () => ({
    meta: [
      { title: "Products | Sun Baby Admin" },
      { name: "description", content: "Add, edit and delete demo products for Sun Baby Kids Wear." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminProducts,
});

const blank = {
  name: "",
  category: "baby",
  subcategory: "",
  ageGroup: "3-12m",
  price: 699,
  originalPrice: 999,
  sizes: "",
  colors: "",
  fabric: "",
  description: "",
  image: "",
  stock: 10,
  sku: "",
  featured: false,
  newArrival: false,
  bestseller: false,
  status: "Active",
};

function AdminProducts() {
  const { products, categories, saveProduct, deleteProduct } = useStore();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [editing, setEditing] = useState(null);
  const [confirmId, setConfirmId] = useState(null);

  const rows = useMemo(() => {
    const term = q.trim().toLowerCase();
    return products.filter(
      (p) =>
        (cat === "all" || p.category === cat) &&
        (!term ||
          p.name.toLowerCase().includes(term) ||
          String(p.sku || "").toLowerCase().includes(term)),
    );
  }, [products, q, cat]);

  const startAdd = () =>
    setEditing({ ...blank, sizes: "1–2Y, 2–3Y", colors: "Cream, Sky Blue" });

  const startEdit = (p) =>
    setEditing({
      ...p,
      sizes: (p.sizes || []).join(", "),
      colors: (p.colors || []).join(", "),
    });

  const submit = (e) => {
    e.preventDefault();
    const price = Number(editing.price) || 0;
    const originalPrice = Number(editing.originalPrice) || price;
    saveProduct({
      ...editing,
      price,
      originalPrice,
      stock: Number(editing.stock) || 0,
      discount: originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0,
      rating: editing.rating ?? 4.5,
      reviews: editing.reviews ?? 0,
      sizes: String(editing.sizes)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      colors: String(editing.colors)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    });
    setEditing(null);
  };

  const set = (key) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setEditing((p) => ({ ...p, [key]: value }));
  };

  return (
    <AdminShell
      title="Products"
      subtitle={`${products.length} products in this session`}
      actions={
        <button type="button" onClick={startAdd} className="btn-base btn-primary text-sm">
          Add Product
        </button>
      }
    >
      <AdminCard className="mb-4">
        <div className="flex flex-wrap gap-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name or SKU"
            className={`${field} sm:max-w-xs`}
          />
          <select value={cat} onChange={(e) => setCat(e.target.value)} className={`${field} sm:max-w-[14rem]`}>
            <option value="all">All categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </AdminCard>

      <div className="soft-card overflow-x-auto">
        <table className="w-full min-w-[52rem] text-left text-sm">
          <thead className="bg-surface text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Tags</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((p) => (
              <tr key={p.id}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={p.image} alt="" className="h-11 w-11 rounded-lg object-cover" />
                    <div>
                      <p className="font-semibold">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.sku}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 capitalize">{p.category.replace("-", " ")}</td>
                <td className="px-4 py-3">{inr(p.price)}</td>
                <td className="px-4 py-3">
                  <input
                    type="number"
                    value={p.stock}
                    onChange={(e) => saveProduct({ id: p.id, stock: Number(e.target.value) })}
                    className="w-20 rounded-lg border border-border bg-surface px-2 py-1 text-sm"
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {[
                      ["featured", "Featured"],
                      ["newArrival", "New"],
                      ["bestseller", "Best"],
                    ].map(([key, label]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => saveProduct({ id: p.id, [key]: !p[key] })}
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          p[key] ? "bg-mint/50" : "bg-surface text-muted-foreground"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <select
                    value={p.status || "Active"}
                    onChange={(e) => saveProduct({ id: p.id, status: e.target.value })}
                    className="rounded-lg border border-border bg-surface px-2 py-1 text-sm"
                  >
                    <option>Active</option>
                    <option>Draft</option>
                  </select>
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    onClick={() => startEdit(p)}
                    className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmId(p.id)}
                    className="ml-2 rounded-lg bg-destructive/10 px-3 py-1.5 text-xs font-semibold text-destructive"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-muted-foreground">
                  No products match this search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {confirmId !== null && (
        <Modal onClose={() => setConfirmId(null)} title="Delete this product?">
          <p className="text-sm text-muted-foreground">
            This removes the product from the current demo session only.
          </p>
          <div className="mt-5 flex justify-end gap-2">
            <button type="button" className="btn-base btn-outline text-sm" onClick={() => setConfirmId(null)}>
              Cancel
            </button>
            <button
              type="button"
              className="btn-base btn-primary text-sm"
              onClick={() => {
                deleteProduct(confirmId);
                setConfirmId(null);
              }}
            >
              Delete
            </button>
          </div>
        </Modal>
      )}

      {editing && (
        <Modal onClose={() => setEditing(null)} title={editing.id ? "Edit Product" : "Add Product"}>
          <form className="grid gap-3 sm:grid-cols-2" onSubmit={submit}>
            <Field label="Product Name" className="sm:col-span-2">
              <input value={editing.name} onChange={set("name")} className={field} required />
            </Field>
            <Field label="Category">
              <select value={editing.category} onChange={set("category")} className={field}>
                {categories.map((c) => (
                  <option key={c.id} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Subcategory">
              <input value={editing.subcategory || ""} onChange={set("subcategory")} className={field} />
            </Field>
            <Field label="Age Group">
              <select value={editing.ageGroup} onChange={set("ageGroup")} className={field}>
                {["0-3m", "3-12m", "1-3y", "4-8y", "9-12y", "13-16y"].map((a) => (
                  <option key={a} value={a}>
                    {a.toUpperCase()}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Price (₹)">
              <input type="number" value={editing.price} onChange={set("price")} className={field} />
            </Field>
            <Field label="Original Price (₹)">
              <input
                type="number"
                value={editing.originalPrice}
                onChange={set("originalPrice")}
                className={field}
              />
            </Field>
            <Field label="Stock">
              <input type="number" value={editing.stock} onChange={set("stock")} className={field} />
            </Field>
            <Field label="SKU">
              <input value={editing.sku || ""} onChange={set("sku")} className={field} />
            </Field>
            <Field label="Fabric">
              <input value={editing.fabric || ""} onChange={set("fabric")} className={field} />
            </Field>
            <Field label="Sizes (comma separated)" className="sm:col-span-2">
              <input value={editing.sizes} onChange={set("sizes")} className={field} />
            </Field>
            <Field label="Colors (comma separated)" className="sm:col-span-2">
              <input value={editing.colors} onChange={set("colors")} className={field} />
            </Field>
            <Field label="Image URL" className="sm:col-span-2">
              <input
                value={typeof editing.image === "string" ? editing.image : ""}
                onChange={set("image")}
                placeholder="https://…"
                className={field}
              />
            </Field>
            <Field label="Description" className="sm:col-span-2">
              <textarea
                rows={3}
                value={editing.description || ""}
                onChange={set("description")}
                className={field}
              />
            </Field>
            <div className="flex flex-wrap gap-4 text-sm sm:col-span-2">
              {[
                ["featured", "Featured"],
                ["newArrival", "New Arrival"],
                ["bestseller", "Bestseller"],
              ].map(([key, label]) => (
                <label key={key} className="flex items-center gap-2 font-semibold">
                  <input type="checkbox" checked={!!editing[key]} onChange={set(key)} />
                  {label}
                </label>
              ))}
              <label className="flex items-center gap-2 font-semibold">
                Status
                <select value={editing.status || "Active"} onChange={set("status")} className="rounded-lg border border-border bg-surface px-2 py-1">
                  <option>Active</option>
                  <option>Draft</option>
                </select>
              </label>
            </div>
            <div className="mt-2 flex justify-end gap-2 sm:col-span-2">
              <button type="button" className="btn-base btn-outline text-sm" onClick={() => setEditing(null)}>
                Cancel
              </button>
              <button type="submit" className="btn-base btn-primary text-sm">
                Save Product
              </button>
            </div>
          </form>
        </Modal>
      )}
    </AdminShell>
  );
}

export function Field({ label, children, className = "" }) {
  return (
    <label className={`grid gap-1 text-sm font-semibold ${className}`}>
      {label}
      <span className="font-normal">{children}</span>
    </label>
  );
}

export function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-charcoal/60 p-4 py-10">
      <div className="w-full max-w-2xl rounded-2xl bg-card p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl">{title}</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="text-xl leading-none">
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
