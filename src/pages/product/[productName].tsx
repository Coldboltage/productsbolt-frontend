import React, { useEffect, useState } from "react";
import Nav from "@/components/Nav";
import Link from "next/link";
import { GetStaticProps, GetStaticPaths } from "next";
import Image from "next/image";
import ReactCountryFlag from "react-country-flag";
import {
  formatCurrency,
  getCurrencyFromCountry,
} from "@/utils/format-currency";
import { TAX_RATES } from "@/tax.constant";
import Head from "next/head";
import { FaChevronRight } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";

interface WebPage {
  id: string;
  url: string;
  inStock: boolean;
  price: string;
  euroPrice: number;
  currencyCode: string;
  shop: Shop;
  adjustedPrice?: number;
  adjustedPriceUpper?: number;
  adjustedPriceEuro?: number;
  adjustedPriceEuroUpper?: number;
}

interface Shop {
  name: string;
  city: string;
  province: string;
  country: string;
  currency: string;
  vatShown: boolean;
}

interface Product {
  productName: string;
  productImage: string;
  productBrand: string;
  productUrlSafeName: string;
  webPages: WebPage[];
}

interface ProductPageProps {
  products: Product;
  productJsonLd: string;
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

const ProductPage = (props: ProductPageProps) => {
  const [userCountry, setUserCountry] = useState("GB");
  const [allProducts, setAllProducts] = useState<Product>(props.products);

  useEffect(() => {
    const storedCountry = localStorage.getItem("userCountry");

    if (storedCountry && storedCountry !== "undefined") {
      console.log(`storedCountry: ${storedCountry}`);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUserCountry(storedCountry);
      return;
    }

    fetch("/api/geo")
      .then((res) => res.json())
      .then((data) => {
        setUserCountry(data.country);
        return data;
      })
      .then((data) => {
        localStorage.setItem("userCountry", data.country);
      });
  }, []);

  const userCurrency = getCurrencyFromCountry(userCountry);
  console.log(userCurrency);

  // console.log(
  //   allProducts.webPages.forEach((page) =>
  //     console.log(page.shop.currency === userCurrency),
  //   ),
  // );

  const adjustedProductPrices = allProducts.webPages.map((page) => {
    const storeRate = TAX_RATES[page.shop.country] ?? 0;
    const userRate = TAX_RATES[userCountry] ?? 0;

    const gross = +page.price;

    // 1️⃣ Remove store VAT if shown
    const netStore = page.shop.vatShown ? gross / (1 + storeRate) : gross;

    // 2️⃣ Derive FX rate from the two prices
    const fxRate = page.euroPrice && gross ? page.euroPrice / gross : 1;

    // 3️⃣ Convert to EUR
    const netEuro = netStore * fxRate;

    // 4️⃣ Apply user VAT
    const finalEuro = netEuro * (1 + userRate);

    // 5️⃣ Round once
    const adjustedPriceEuro = Math.round(finalEuro * 100) / 100;

    // 🔹 FX buffer
    const FX_BUFFER = 0.03;

    const adjustedPriceEuroUpper =
      Math.round(finalEuro * (1 + FX_BUFFER) * 100) / 100;

    // console.log({
    //   name: page.shop.name,
    //   gross,
    //   // euroPriceGross,
    //   vatShown: page.shop.vatShown,
    //   storeRate,
    //   userRate,
    // });

    return {
      adjustedPriceEuro,
      // adjustedPrice,
      // adjustedPriceUpper,
      adjustedPriceEuroUpper,
    };
  });

  const pagesSorted = allProducts.webPages
    .map((page) => {
      const storeRate = TAX_RATES[page.shop.country] ?? 0;
      const userRate = TAX_RATES[userCountry] ?? 0;

      console.warn(userRate);

      const gross = +page.price;
      const netStore = page.shop.vatShown ? gross / (1 + storeRate) : gross;

      const fxRate = page.euroPrice && gross ? page.euroPrice / gross : 1;

      const finalEuro = netStore * fxRate * (1 + userRate);

      const adjustedPriceEuro = Math.round(finalEuro * 100) / 100;

      const FX_BUFFER = 0.03;
      const adjustedPriceEuroUpper =
        Math.round(finalEuro * (1 + FX_BUFFER) * 100) / 100;

      return {
        ...page,
        adjustedPriceEuro,
        adjustedPriceEuroUpper,
      };
    })
    .sort(
      (a, b) =>
        (a.adjustedPriceEuro ?? Infinity) - (b.adjustedPriceEuro ?? Infinity),
    );

  console.log(pagesSorted);

  // console.log(adjustedProductPrices);

  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-slate-950 text-slate-100">
      <Head>
        <title>
          {props.products.productName} from{" "}
          {formatCurrency(
            +pagesSorted[0].price,
            pagesSorted[0].shop.currency,
            pagesSorted[0].shop.country,
          )}{" "}
          – Compare TCG Prices | Cardsbolt
        </title>

        <meta
          name="description"
          content={`${props.products.productName}; From €${props.products.webPages?.[0].euroPrice}; ${props.products.webPages?.length} retailers compared; Price range €${props.products.webPages?.[0].euroPrice}–€${props.products.webPages?.at(-1)?.euroPrice}. Compare trading card game booster box prices on Cardsbolt.`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: props.productJsonLd }}
        />
      </Head>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(6,182,212,0.25),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.18),transparent_45%),linear-gradient(180deg,#020617_0%,#020617_45%,#0b1120_100%)]" />

      <div className="relative mx-auto max-w-6xl pb-24">
        <header>
          <Nav />
        </header>

        <main className="px-5 pt-10 md:px-8">
          <div className="mb-2 flex items-center gap-2 text-sm text-slate-300">
            <Link href={`/`} className="hover:text-white">
              Home
            </Link>
            <FaChevronRight />
            <Link
              href={`/${props.products.productUrlSafeName}`}
              className="hover:text-white"
            >
              {props.products.productBrand}
            </Link>{" "}
          </div>

          <section className="min-h-[55dvh]">
            <div className="mb-2 grid grid-cols-3 items-center rounded-md border border-slate-700/80 bg-slate-900/50 px-4">
              <div className="col-span-2 justify-center py-3">
                <h1 className="mt-2 mb-4 text-sm font-bold text-white md:text-2xl">
                  {props.products.productName}
                </h1>
                <p className="text-xs text-slate-300">
                  The cheapest {props.products.productName} currently available
                  is{" "}
                  {formatCurrency(
                    +pagesSorted[0].price,
                    pagesSorted[0].shop.currency,
                    pagesSorted[0].shop.country,
                  )}{" "}
                  from {pagesSorted[0].shop.name} in{" "}
                  {pagesSorted[0].shop.country}.
                </p>
                <p className="mt-2 hidden text-xs text-slate-400 md:inline-block">
                  Cardsbolt compares prices for trading card game booster boxes
                  across UK and international TCG retailers so players can
                  quickly find the cheapest place to buy booster boxes online.
                </p>
              </div>

              <div className="flex items-center justify-center">
                <Image
                  src={props.products.productImage}
                  alt={`Image of: ${props.products.productName}`}
                  width={160}
                  height={160}
                  sizes="160px"
                  className="object-contain p-2"
                />
              </div>
            </div>
            <ul className="divide-y divide-slate-700/70 overflow-hidden rounded-md border border-slate-700/80">
              {/* Header */}
              <li className="bg-slate-900/70">
                <div className="grid grid-cols-4 px-2 py-3 text-center text-xs font-semibold text-slate-300 md:grid-cols-4 md:text-lg">
                  <p>Shop Name</p>
                  <p>Location</p>
                  {/* <p>Euro</p> */}
                  <p>Original Price</p>
                  <p>Euro Price</p>
                  {/* <p>Taxed Original Price</p> */}
                </div>
              </li>
              <li className="flex justify-center bg-slate-900/40 text-center">
                <p className="my-2 text-[11px] text-slate-400/80 italic">
                  Sorted by estimated total for your location. EUR prices use
                  hourly exchange rates. VAT, shipping and retailer fees may
                  apply at checkout.
                </p>
              </li>

              {pagesSorted.map((webpage: WebPage) => (
                <li
                  key={webpage.id}
                  className="
                odd:bg-slate-900/60
                even:bg-slate-800/40
                hover:bg-slate-700/60
                 transition
                 text-[12px]
                 md:text-sm
                "
                >
                  <Link
                    href={webpage.url}
                    className="grid text-center md:text-left grid-cols-4 md:grid-cols-4 px-2 py-2 items-center"
                  >
                    <div className="pl-2">{webpage.shop.name}</div>
                    <div className="text-xs pl-2">
                      <span className="hidden md:inline-block">
                        {webpage.shop.city} - {webpage.shop.province} -
                      </span>{" "}
                      <span>
                        {" "}
                        {webpage.shop.country} {` `}
                        <ReactCountryFlag
                          countryCode={webpage.shop.country}
                          svg
                        />
                      </span>
                    </div>
                    <div className="font-semibold md:block pl-2">
                      <span>
                        {" "}
                        {formatCurrency(
                          +webpage.price,
                          webpage.shop.currency,
                          webpage.shop.country,
                        )}
                        {"  "}
                      </span>

                      <span className="text-[10px] text-slate-300/90">
                        {webpage.shop.vatShown
                          ? "VAT included"
                          : "Tax not included"}
                      </span>
                    </div>
                    <div className="pl-2 flex flex-col sm:inline-block ">
                      <span className="font-semibold mr-1">
                        €{webpage.euroPrice}
                      </span>
                      <span className="text-[8px] text-slate-400/80 sm:text-[10px]">
                        {" "}
                        {userCountry &&
                          userCurrency !== webpage.shop.currency &&
                          `Est. €${+webpage.adjustedPriceEuro!} additional fees may apply`}
                      </span>
                    </div>

                    {/* <div className="font-semibold">
                    €{webpage.adjustedPriceEuro} / €
                    {webpage.adjustedPriceEuroUpper}
                  </div> */}
                    {/* <div className="font-semibold hidden md:block">
                    {formatCurrency(
                      webpage.adjustedPrice ?? 0,
                      webpage.shop.currency,
                      webpage.shop.country,
                    )}

                    {webpage.shop.country !== userCountry && (
                      <>
                        <span className="mx-1 text-gray-400">/</span>
                        {formatCurrency(
                          webpage.adjustedPriceUpper ?? 0,
                          webpage.shop.currency,
                          webpage.shop.country,
                        )}
                      </>
                    )}
                  </div>{" "} */}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section id="faq" className="mx-auto mt-20 max-w-4xl pb-12">
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
};

export default ProductPage;

export const getStaticProps: GetStaticProps<ProductPageProps> = async (
  context,
) => {
  const productName = context.params?.productName as string;

  const r = await fetch(
    `http://${process.env.API_IP}:3000/webpage/find-all-divided-by-product-slim-product-name-shop-info/true/${productName}`,
    { headers: { Authorization: `Bearer ${process.env.API_KEY || ""}` } },
  );
  // const productResponse = await fetch(
  //   `http://${process.env.API_IP}:3000/product/find-one-by-product-name/${productName}`,
  //   { headers: { Authorization: `Bearer ${process.env.API_KEY || ""}` } },
  // )

  if (!r.ok) return { notFound: true, revalidate: 3600 };

  const json: Product = await r.json();

  console.log(json);
  // const product = await productResponse.json()

  const lowest = json.webPages?.[0];
  const highest = json.webPages?.at(-1) ?? lowest;

  const productJsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Product",
    name: json.productName,
    image: json.productImage,
    url: `https://cardsbolt.com/product/${json.productName}`,
    brand: {
      "@type": "Brand",
      name: json.productBrand,
    },
    dateModified: new Date().toISOString(),
    offers: {
      "@type": "AggregateOffer",
      lowPrice: Number(lowest.euroPrice),
      highPrice: Number(highest.euroPrice),
      offerCount: json.webPages.length,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
    },
  });

  return {
    props: { products: json, productJsonLd },
    revalidate: 6000,
  };
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: "blocking",
});
