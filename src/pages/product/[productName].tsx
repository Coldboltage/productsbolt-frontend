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
  webPages: WebPage[];
}

interface ProductPageProps {
  products: Product;
}

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
    <div className={` max-w-6xl mx-auto`}>
      <header>
        <Nav />
      </header>

      <main className=" md:p-5 md:mt-10">
        <section className="mb-10">
          <div className="grid grid-cols-3 bg-gray-800/20 px-4 mb-2">
            <h1 className="text-sm md:text-2xl justify-center pb-10 col-span-2 mt-auto">
              {props.products.productName}
            </h1>
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
          <ul className="divide-y divide-gray-700/70">
            {/* Header */}
            <li className="bg-gray-800/60">
              <div className="grid grid-cols-3 md:grid-cols-4 text-center px-2 py-3 font-semibold text-gray-400">
                <p>Shop Name</p>
                <p>Location</p>
                {/* <p>Euro</p> */}
                <p>Original Price</p>
                <p>Euro Price</p>
                {/* <p>Taxed Original Price</p> */}
              </div>
            </li>
            <li className="flex justify-center text-center">
              <p className="text-[11px] text-gray-400/70 my-2 italic">
                Sorted by estimated total for your location. EUR prices use
                hourly exchange rates. VAT, shipping and retailer fees may apply
                at checkout.
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
                 text-sm
                "
              >
                <Link
                  href={webpage.url}
                  className="grid grid-cols-3 md:grid-cols-4 px-2 py-2 items-center"
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
                  <div className="font-semibold hidden md:block pl-2">
                    <span>
                      {" "}
                      {formatCurrency(
                        +webpage.price,
                        webpage.shop.currency,
                        webpage.shop.country,
                      )}
                      {"  "}
                    </span>

                    <span className="text-[10px]  text-gray-200/90">
                      {webpage.shop.vatShown
                        ? "VAT included"
                        : "Tax not included"}
                    </span>
                  </div>
                  <div className="pl-2">
                    <span className="font-semibold mr-1">
                      €{webpage.euroPrice}
                    </span>
                    <span className="text-[10px]  text-gray-400/70">
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
      </main>
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

  return {
    props: { products: json },
    revalidate: 6000,
  };
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: "blocking",
});
