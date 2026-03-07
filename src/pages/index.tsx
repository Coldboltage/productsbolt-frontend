import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import Head from "next/head";
import Link from "next/link";

const coreFeatures = [
  {
    title: "Automatic Checkup",
    description:
      "Cardsbolt automatically updates the price and availability periodically throughout the day. As soon as we spot an update, the list updates automatically.",
  },
  {
    title: "Currency Conversion",
    description:
      "Depending on the country you're checking Cardsbolt from, we determine rough tax estimates to help order listings correctly. You get pricing that is closer to what you would really pay.",
  },
  {
    title: "Many Shops",
    description:
      "Many shops do not have the marketing reach to appear high in search engines. Cardsbolt looks for shops regularly to include and check prices for.",
  },
];

const detailSections = [
  {
    title: "The Goal of Cardsbolt",
    description:
      "To make it easier to find a TCG boxed product and know it is the cheapest you can buy from a shop. By tracking shops instead of person-to-person marketplaces, we focus on listings with better buyer protection, more consistent service, and a smoother buying experience.",
  },
  {
    title: "Will this stay as a free service?",
    description:
      "Correct. The core functionality of Cardsbolt, choosing a product, seeing only available listings, and knowing the cheapest shop, will always be free. As Cardsbolt adds more products and shops and keeps updating them, this does not change. Enhanced convenience options, like stock alerts or price-target notifications, may become paid.",
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
          <section className="flex min-h-[100dvh] items-center py-16">
            <div className="max-w-3xl">
              <p className="mb-5 text-sm font-medium tracking-[0.22em] text-cyan-300 uppercase">
                Cardsbolt Alpha
              </p>
              <h1 className="text-5xl font-semibold leading-tight text-white md:text-7xl">
                TCG Shops Price Comparison
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
                  href="#faq"
                  className="text-sm font-semibold text-slate-300 underline decoration-slate-500 underline-offset-4 transition hover:text-white"
                >
                  Read FAQs
                </a>
              </div>
            </div>
          </section>

          <section id="faq">
            <div className="my-8 rounded-xl md:pt-6 md:mb-20">
              <p className="text-xs font-semibold tracking-[0.22em] text-cyan-300 uppercase">
                Get to know Cardsbolt
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-white md:text-5xl">
                What is Cardsbolt
              </h2>
              <p className="mt-4 max-w-3xl text-slate-300">
                Cardsbolt is a TCG price comparison site that compares popular
                and lesser-known shops to help you find the cheapest boxes
                currently in stock.
              </p>
            </div>

            <div className="my-30 grid gap-10 border-y border-slate-700/70 py-10 md:grid-cols-3">
              {coreFeatures.map((feature) => (
                <article key={feature.title}>
                  <p className="text-sm font-medium tracking-[0.16em] text-cyan-300 uppercase">
                    Feature
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm text-slate-300 ">
                    {feature.description}
                  </p>
                </article>
              ))}
            </div>

            <article className="relative mb-12 overflow-hidden rounded-2xl bg-slate-900/60 p-6 ring-1 ring-cyan-300/30 md:p-8">
              <div className="pointer-events-none absolute -top-16 -right-10 h-40 w-40 rounded-full bg-cyan-400/20 blur-2xl" />
              <div className="relative flex flex-col gap-5">
                <p className="text-xs font-semibold tracking-[0.22em] text-cyan-300 uppercase">
                  Why Cardsbolt
                </p>
                <h3 className="text-3xl font-semibold text-white md:text-4xl">
                  Search Engines are not great for TCGs
                </h3>
                <div className="max-w-4xl space-y-4 text-slate-300 md:text-lg">
                  <p>
                    Search engines don&apos;t do a great job helping you find
                    the cheapest TCG box when you need it. You may get a result,
                    but you are still left guessing if it is the cheapest or
                    even in stock.
                  </p>
                  <p>
                    Cardsbolt is built to remove that uncertainty and show the
                    cheapest in-stock option first.
                  </p>
                </div>
              </div>
            </article>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {detailSections.map((section) => (
                <article
                  key={section.title}
                  className="rounded-2xl bg-slate-900/45 p-6 ring-1 ring-white/10 md:p-7"
                >
                  <h3 className="text-2xl font-semibold text-white md:text-3xl">
                    {section.title}
                  </h3>
                  <p className="mt-4 text-slate-300 md:text-lg">
                    {section.description}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </main>
      </div>
      <Footer></Footer>
    </div>
  );
}
