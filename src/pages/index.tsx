import Nav from "@/components/Nav";
import Head from "next/head";
import Link from "next/link";

const highlights = [
  {
    title: "Automatic checkups",
    description:
      "Cardsbolt updates price and availability throughout the day. As soon as we detect a change, listings update automatically.",
  },
  {
    title: "Currency conversion",
    description:
      "We estimate tax and convert currencies by region so rankings are closer to what you would pay at checkout.",
  },
  {
    title: "Many shops",
    description:
      "We track both major and lesser-known stores so you can discover better prices that search engines often miss.",
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <Head>
        <title>Cardsbolt: Cheapest TCG Boxes</title>
        <meta
          name="description"
          content="Find the cheapest in-stock TCG boxes from trusted shops around the world."
        />
      </Head>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(6,182,212,0.25),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.18),transparent_45%),linear-gradient(180deg,#020617_0%,#020617_45%,#0b1120_100%)]" />

      <div className="relative mx-auto max-w-6xl pb-24">
        <header>
          <Nav />
        </header>

        <main className="px-5 md:px-8">
          <section className="flex min-h-[82vh] items-center py-16">
            <div className="max-w-3xl">
              <p className="mb-5 text-sm font-medium tracking-[0.22em] text-cyan-300 uppercase">
                Cardsbolt beta
              </p>
              <h1 className="text-5xl font-semibold leading-tight text-white md:text-7xl">
                Cheapest TCG Boxes.
              </h1>
              <p className="mt-6 max-w-2xl text-xl text-slate-300 md:text-2xl">
                Find the cheapest TCG boxes around the world.
              </p>
              <p className="mt-6 max-w-2xl text-base text-slate-400 md:text-lg">
                Cardsbolt compares popular and relatively unknown shops to find
                the lowest in-stock prices, refreshed automatically.
              </p>

              <div className="mt-10 flex flex-col items-start gap-3">
                <Link
                  href="/products"
                  className="rounded-md bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
                >
                  Browse tracked products
                </Link>
                <a
                  href="#overview"
                  className="text-sm font-semibold text-slate-300 underline decoration-slate-500 underline-offset-4 transition hover:text-white"
                >
                  Learn how Cardsbolt works
                </a>
              </div>
            </div>
          </section>

          <section id="overview" className="space-y-14 pb-12">
            <div className="max-w-3xl space-y-6">
              <h2 className="text-3xl font-semibold text-white md:text-4xl">
                Why Cardsbolt exists
              </h2>
              <p className="text-lg text-slate-300">
                Search engines can help you find a listing, but they do not do
                a good job showing if it is the cheapest option or even in
                stock. Cardsbolt focuses on that exact problem.
              </p>
              <p className="text-lg text-slate-300">
                We want to make it easier to find TCG boxed products at the
                best current shop price, while keeping the buying experience
                smoother and more reliable.
              </p>
            </div>

            <div className="grid gap-10 md:grid-cols-3">
              {highlights.map((highlight) => (
                <article key={highlight.title}>
                  <h3 className="text-xl font-semibold text-white">
                    {highlight.title}
                  </h3>
                  <p className="mt-3 text-slate-300">{highlight.description}</p>
                </article>
              ))}
            </div>

            <div className="max-w-4xl space-y-5" id="goal">
              <h2 className="text-3xl font-semibold text-white md:text-4xl">
                Will this stay a free service?
              </h2>
              <p className="text-lg text-slate-200">
                Yes. The core Cardsbolt experience, choose a product, see only
                listings in stock, and check the cheapest shop, will remain
                free.
              </p>
              <p className="text-lg text-slate-300">
                As we add more products and shops, that principle does not
                change. Paid options are for convenience features such as price
                and stock alerts.
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
