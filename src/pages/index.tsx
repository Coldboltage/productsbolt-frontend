import Nav from "@/components/Nav";
import Head from "next/head";
import Link from "next/link";
import { FiChevronDown } from "react-icons/fi";

const faqs = [
  {
    question: "What does Cardsbolt do?",
    answer:
      "Cardsbolt is a TCG price comparison site that compares popular and lesser-known shops to help you find the cheapest boxes currently in stock.",
  },
  {
    question: "How often do prices and stock update?",
    answer:
      "Prices and availability are checked periodically throughout the day. As soon as we detect an update from a shop, listings refresh automatically.",
  },
  {
    question: "Why not just use search engines?",
    answer:
      "Search engines can help you discover products, but they usually do not tell you if the listing is the cheapest or currently in stock. Cardsbolt is built specifically for that.",
  },
  {
    question: "How does currency conversion work?",
    answer:
      "Depending on your region, Cardsbolt applies currency conversion and rough tax estimates so listings are sorted closer to what you would really pay.",
  },
  {
    question: "What shops are included?",
    answer:
      "Cardsbolt tracks both widely known stores and smaller shops that are often hard to discover through normal search results.",
  },
  {
    question: "What is the goal of Cardsbolt?",
    answer:
      "The goal is to make it easier to find boxed TCG products at the best current shop price while prioritizing reliability and a smoother buying experience.",
  },
  {
    question: "Will Cardsbolt stay free?",
    answer:
      "Yes. The core experience of picking a product, seeing only in-stock listings, and finding the cheapest shop will stay free.",
  },
  {
    question: "What features could be paid in the future?",
    answer:
      "Convenience features, such as stock alerts and price-drop notifications, may become paid options while core comparison stays free.",
  },
];

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
          <section className="flex min-h-dvh items-center py-16">
            <div className="max-w-3xl">
              <p className="mb-5 text-sm font-medium tracking-[0.22em] text-cyan-300 uppercase">
                Cardsbolt Alpha
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
                  href="#faq"
                  className="text-sm font-semibold text-slate-300 underline decoration-slate-500 underline-offset-4 transition hover:text-white"
                >
                  Read FAQs
                </a>
              </div>
            </div>
          </section>

          <section id="faq" className="mx-auto max-w-4xl pb-12">
            <h2 className="mb-6 text-3xl font-semibold text-white md:text-4xl">
              Frequently asked questions
            </h2>

            <div className="space-y-3">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-md border border-slate-700/80 bg-slate-900/50"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-slate-100 marker:content-none">
                    <span>{faq.question}</span>
                    <FiChevronDown className="shrink-0 text-slate-400 transition group-open:rotate-180" />
                  </summary>
                  <p className="px-5 pb-5 text-slate-300">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
