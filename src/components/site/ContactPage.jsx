import { useState } from "react";
import SiteLayout from "./SiteLayout";
import Breadcrumbs from "./Breadcrumbs";
import { useStore } from "@/store/StoreProvider";

const faqs = [
  {
    q: "Which age groups do you stock?",
    a: "Everything from newborn 0–3M essentials up to early-teen 14–15Y styles, across casual, school-ready and festive wear.",
  },
  {
    q: "Do you offer store pickup?",
    a: "Yes. Place your order online and collect it from Shop No. 48, Samruddhi Market during store hours.",
  },
  {
    q: "Which payments do you accept?",
    a: "Cash, credit/debit cards and all major UPI apps at the counter.",
  },
  {
    q: "Can I exchange a size?",
    a: "Unworn items with tags can be exchanged within 7 days at the store — just carry the bill.",
  },
];

export default function ContactPage() {
  const { settings, toast } = useStore();
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !/^\d{10}$/.test(form.phone.replace(/\D/g, "").slice(-10))) {
      toast("Please add your name and a valid 10-digit mobile number", "error");
      return;
    }
    setSent(true);
    setForm({ name: "", phone: "", message: "" });
    toast("Thanks! Our team will call you back shortly");
  };

  const tel = `tel:${settings.phone.replace(/\s/g, "")}`;

  return (
    <SiteLayout>
      <Breadcrumbs items={[{ label: "Contact" }]} />

      <section className="container-x section-pad" id="visit">
        <h1 className="font-display text-3xl sm:text-4xl">Visit Our Store</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Drop in to see the full collection, get sizing help and pick up festive outfits the same day.
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div className="soft-card p-6 sm:p-8">
            <h2 className="font-display text-2xl">{settings.name}</h2>
            <address className="mt-4 space-y-1 text-sm not-italic text-muted-foreground">
              <p>{settings.addressLine1}</p>
              <p>{settings.addressLine2}</p>
              <p>{settings.addressLine3}</p>
            </address>

            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex gap-2">
                <dt className="w-24 font-semibold">Phone</dt>
                <dd>
                  <a href={tel} className="hover:text-coral">
                    {settings.phone}
                  </a>
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-24 font-semibold">Email</dt>
                <dd>
                  <a href={`mailto:${settings.email}`} className="hover:text-coral">
                    {settings.email}
                  </a>
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-24 font-semibold">Hours</dt>
                <dd>{settings.hours}, all days</dd>
              </div>
            </dl>

            <div className="mt-6 flex flex-wrap gap-3">
              <a href={tel} className="btn-base btn-primary">
                Call Store
              </a>
              <a
                href="https://maps.google.com/?q=Samruddhi+Market+Chandan+Nagar+Pune"
                target="_blank"
                rel="noreferrer"
                className="btn-base btn-outline"
              >
                Get Directions
              </a>
            </div>
          </div>

          <div className="soft-card overflow-hidden">
            <div className="relative h-64 bg-mint/30 sm:h-full sm:min-h-[22rem]">
              <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(var(--color-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-border)_1px,transparent_1px)] [background-size:38px_38px]" />
              <div className="absolute left-1/2 top-1/2 w-64 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-card p-5 text-center shadow-lg">
                <span className="text-3xl" aria-hidden="true">
                  📍
                </span>
                <p className="mt-2 font-display text-lg">Samruddhi Market</p>
                <p className="text-xs text-muted-foreground">
                  Sangharsh Chowk, Chandan Nagar–Kharadi Road, Pune 411014
                </p>
              </div>
              <span className="absolute bottom-3 right-4 text-[11px] text-muted-foreground">
                Illustrative location card
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x pb-16" id="about">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="soft-card p-6 sm:p-8">
            <h2 className="font-display text-2xl">Request a Callback</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Looking for a specific size or festive outfit? Leave your number and we will call you.
            </p>
            {sent && (
              <p className="mt-4 rounded-xl bg-mint/40 px-4 py-3 text-sm">
                Thank you! Our team will reach out during store hours.
              </p>
            )}
            <form className="mt-5 grid gap-4" onSubmit={submit}>
              <label className="grid gap-1 text-sm font-semibold">
                Full Name
                <input
                  value={form.name}
                  onChange={set("name")}
                  className="rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-normal outline-none focus:border-coral"
                  placeholder="Your name"
                />
              </label>
              <label className="grid gap-1 text-sm font-semibold">
                Mobile Number
                <input
                  value={form.phone}
                  onChange={set("phone")}
                  inputMode="numeric"
                  className="rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-normal outline-none focus:border-coral"
                  placeholder="10-digit mobile number"
                />
              </label>
              <label className="grid gap-1 text-sm font-semibold">
                Message
                <textarea
                  value={form.message}
                  onChange={set("message")}
                  rows={4}
                  className="rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-normal outline-none focus:border-coral"
                  placeholder="What are you looking for?"
                />
              </label>
              <button type="submit" className="btn-base btn-primary justify-self-start">
                Send Enquiry
              </button>
            </form>
          </div>

          <div className="grid gap-4">
            <div className="soft-card p-6" id="shipping">
              <h2 className="font-display text-xl">Shipping Information</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Delivery across Pune in 2–4 days. Orders above ₹999 ship free; otherwise a flat ₹59
                applies. Store pickup is always free.
              </p>
            </div>
            <div className="soft-card p-6" id="returns">
              <h2 className="font-display text-xl">Returns &amp; Exchange</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Unworn items with original tags can be exchanged within 7 days at the store.
              </p>
            </div>
            <div className="soft-card p-6" id="size-guide">
              <h2 className="font-display text-xl">Size Guide</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Sizes run by age: 0–3M, 3–6M, 6–12M, 1–2Y, 2–3Y, 4–5Y, 6–7Y, 8–9Y, 10–11Y, 12–13Y and
                14–15Y. When in doubt, size up — kids grow fast.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x pb-20" id="faqs">
        <h2 className="font-display text-2xl">Frequently Asked Questions</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {faqs.map((f) => (
            <div key={f.q} className="soft-card p-5">
              <h3 className="font-semibold">{f.q}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
