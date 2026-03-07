import Nav from "@/components/Nav";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { FiChevronDown } from "react-icons/fi";

interface HomeProps {
  products: Product[];
  brandInfo: {
    urlSafeName: string;
    name: string;
    description: string;
  };
}

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

export default function Home(props: HomeProps) {
  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-slate-950 text-slate-100">
      <Head>
        <title>{props.brandInfo.name} Products Page | Cardsbolt</title>
        <meta
          name="description"
          content={
            props.brandInfo
              ? `Compare live prices for ${props.brandInfo.name} across trusted TCG retailers. VAT-adjusted EUR pricing with real-time exchange rates.`
              : "This product is not yet indexed on Productsbolt. Check back soon for price comparisons."
          }
        />
        <meta
          property="og:title"
          content={props.brandInfo?.name ?? "Productsbolt"}
        />
        <meta
          property="og:description"
          content={
            props.brandInfo
              ? `Find the best price for ${props.brandInfo.name} across multiple stores.`
              : "Trading card game price comparison platform."
          }
        />
      </Head>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(6,182,212,0.25),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.18),transparent_45%),linear-gradient(180deg,#020617_0%,#020617_45%,#0b1120_100%)]" />

      <div className="relative mx-auto max-w-6xl pb-24">
        <header>
          <Nav />
        </header>

        <main className="px-5 pt-10 md:px-8">
          <section className="mb-10 grid min-h-[100dvh] content-start">
            <div>
              <h1 className="pb-4 text-3xl font-semibold text-white md:text-4xl">
                Products List
              </h1>
              <p className="mb-10 text-slate-300 md:text-lg">
                <span>All products found for </span>
                <span className="font-extrabold italic">{`${props.brandInfo.name} `}</span>
                <span>with an active listing</span>
              </p>
            </div>
            <ul className="grid grid-cols-1 gap-5 text-center md:grid-cols-4">
              {props.products.map((product: Product) => {
                return (
                  <li key={product.id} className="h-full">
                    <Link
                      href={`/product/${product.urlSafeName}`}
                      className="block h-full"
                    >
                      <div className="flex h-full flex-col gap-2 rounded-lg border border-slate-700/80 bg-slate-900/50 p-4 font-semibold text-slate-100 transition hover:border-cyan-300/60 hover:bg-slate-900/70">
                        <div className="mb-1 flex items-center justify-center">
                          <Image
                            src={product.imageUrl}
                            alt={product.name}
                            width={160}
                            height={160}
                            sizes="160px"
                            className="object-contain"
                          />
                        </div>

                        <p className="mt-auto text-center">{product.name}</p>
                        <p className="text-[11px] font-light text-slate-300">
                          Release Date:{" "}
                          {new Date(product.releaseDate).toLocaleDateString()}
                        </p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>

          <section id="faq" className="mx-auto max-w-4xl mt-20">
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

interface Product {
  name: string;
  id: string;
  urlSafeName: string;
  brand: string;
  imageUrl: string;
  releaseDate: Date;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const brandName = context.params?.brandName as string;
  const res = await fetch(
    `http://${process.env.API_IP}:3000/product/find-all-product-only-by-brand-with-pages/${brandName}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY ?? ""}`,
      },
    },
  );
  const brandInfoResponse = await fetch(
    `http://${process.env.API_IP}:3000/brand/find-one-by-url-safe-name/${brandName}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY ?? ""}`,
      },
    },
  );

  if (!res.ok) {
    return { props: { products: [] }, revalidate: 3600 };
  }

  const products: Product[] = await res.json();
  const brandInfoJson = await brandInfoResponse.json();

  console.log(products[0]);

  // console.log(products);

  return {
    props: { products, brandInfo: brandInfoJson },
    revalidate: 3600,
  };
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: "blocking",
});
