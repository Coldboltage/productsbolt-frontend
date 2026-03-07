import Nav from "@/components/Nav";
import Head from "next/head";
import Link from "next/link";

const highlights = [
  {
    title: "Automatic checkups",
    description:
      "Cardsbolt updates price and availability throughout the day. As soon as a shop changes, listings refresh automatically.",
  },
  {
    title: "Currency conversion",
    description:
      "We estimate taxes and convert currencies by region so results are sorted closer to what you would actually pay.",
  },
  {
    title: "Many shops",
    description:
      "We track popular and lesser-known stores, giving smaller shops visibility while helping you discover better prices.",
  },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl pb-20">
      <Head>
        <title>Cardsbolt: Cheapest TCG Boxes</title>
        <meta
          name="description"
          content="Find the cheapest in-stock TCG boxes from trusted shops around the world."
        />
      </Head>

      <header>
        <Nav />
      </header>

      <main className="px-5">
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950 px-6 py-16 md:px-12 md:py-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.2),transparent_45%)]" />
          <div className="relative mx-auto max-w-3xl text-center">
            <p className="mb-4 inline-flex rounded-full border border-cyan-300/30 px-3 py-1 text-xs tracking-wide text-cyan-300 uppercase">
              Cardsbolt beta
            </p>
            <h1 className="pb-5 text-4xl font-bold text-white md:text-6xl">
              Cheapest TCG Boxes
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-slate-300 md:text-xl">
              Find the cheapest TCG boxes around the world.
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-slate-400">
              Cardsbolt compares many of the most popular and relatively
              unknown shops to find the lowest in-stock prices, refreshed
              automatically.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/products"
                className="rounded-md bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                Browse tracked products
              </Link>
              <a
                href="#goal"
                className="rounded-md border border-slate-600 px-5 py-3 font-semibold text-slate-100 transition hover:border-slate-400"
              >
                Read the goal
              </a>
            </div>
          </div>
        </section>

        <section className="mt-14 grid gap-6 md:grid-cols-3">
          {highlights.map((highlight) => (
            <article
              key={highlight.title}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6"
            >
              <h2 className="text-xl font-semibold text-white">
                {highlight.title}
              </h2>
              <p className="mt-3 text-slate-300">{highlight.description}</p>
            </article>
          ))}
        </section>

        <section className="mt-16 grid gap-8 rounded-3xl border border-slate-800 bg-slate-950/60 p-6 md:grid-cols-2 md:p-10">
          <div>
            <h2 className="text-3xl font-bold text-white">Why Cardsbolt?</h2>
            <p className="mt-4 text-slate-300">
              Search engines can show products, but they do not reliably tell
              you if the listing is truly the cheapest or even in stock.
              Cardsbolt is focused on exactly that: giving you the cheapest
              in-stock result from stores you can buy from right now.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">The goal</h2>
            <p id="goal" className="mt-4 text-slate-300">
              We want to make it easier to find TCG boxed products at the best
              current shop price. By tracking shops instead of person-to-person
              marketplaces, we prioritize buyer protection, consistency, and a
              smoother checkout experience.
            </p>
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-emerald-400/20 bg-emerald-950/20 p-6 md:p-10">
          <h2 className="text-3xl font-bold text-white">
            Will this stay a free service?
          </h2>
          <p className="mt-4 text-slate-200">
            Yes. The core Cardsbolt experience—choosing a product, seeing only
            available listings, and finding the cheapest shop—will remain free.
          </p>
          <p className="mt-4 text-slate-300">
            As we add more products and stores, that principle will not change.
            Optional paid features will focus on convenience (for example,
            notifications when a product becomes available or drops to a target
            price), not on restricting core price comparison.
          </p>
        </section>
      </main>
    </div>
  );
}
