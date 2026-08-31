import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useStore } from "@/store/StoreProvider";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Admin Login | Sun Baby Kids Wear" },
      { name: "description", content: "Demo admin login for the Sun Baby Kids Wear store panel." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const { adminLogin, isAdmin } = useStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@sunbabykidswear.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAdmin) navigate({ to: "/admin", replace: true });
  }, [isAdmin, navigate]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminLogin(email, password)) {
      setError("");
      navigate({ to: "/admin", replace: true });
    } else {
      setError("Invalid demo credentials. Use the details shown below.");
    }
  };

  const field =
    "w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-coral";

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4 py-12">
      <div className="w-full max-w-md">
        <Link to="/" className="block text-center font-display text-2xl">
          SUN BABY KIDS WEAR
        </Link>
        <div className="soft-card mt-6 p-6 sm:p-8">
          <h1 className="font-display text-2xl">Admin Login</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Frontend demo sign-in — no accounts or servers involved.
          </p>

          {error && (
            <p className="mt-4 rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </p>
          )}

          <form className="mt-6 grid gap-4" onSubmit={submit}>
            <label className="grid gap-1 text-sm font-semibold">
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={field}
              />
            </label>
            <label className="grid gap-1 text-sm font-semibold">
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={field}
              />
            </label>
            <button type="submit" className="btn-base btn-primary w-full justify-center">
              Sign In
            </button>
          </form>

          <div className="mt-6 rounded-xl bg-mint/25 p-4 text-xs">
            <p className="font-semibold">Demo credentials</p>
            <p className="mt-1">admin@sunbabykidswear.com</p>
            <p>admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
