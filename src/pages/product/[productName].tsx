import React from "react";
import Nav from "@/components/Nav";
import Link from "next/link";
import { GetStaticProps, GetStaticPaths } from "next";
import Image from "next/image";

interface WebPage {
  id: string;
  url: string;
  inStock: boolean;
  price: string;
  currencyCode: string;
  shop: string;
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
  return (
    <div className={` max-w-5xl mx-auto`}>
      <header>
        <Nav />
      </header>

      <main className=" p-5 mt-10">
        <section className="mb-10">
          <div className="grid grid-cols-3 bg-gray-800/20 px-4 mb-2">
            <h1 className="text-2xl justify-center pb-10 col-span-2 mt-auto">
              {props.products.productName}
            </h1>
            <div className="h-40 flex items-center justify-center">
              <Image
                src={props.products.productImage}
                alt={`Image of: ${props.products.productName}`}
                width={160}
                height={160}
                sizes="160px"
                className="object-contain"
              />
            </div>
          </div>
          <ul className="divide-y divide-gray-700/70">
            {/* Header */}
            <li className="bg-gray-800/60">
              <div className="grid grid-cols-3 text-center px-2 py-3 font-semibold text-gray-400">
                <p>Shop Name</p>
                <p>Location</p>
                <p>Price</p>
              </div>
            </li>

            {props.products.webPages.map((webpage: WebPage) => (
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
                  className="grid grid-cols-3 text-center px-2 py-2 block"
                >
                  <div>{webpage.shop}</div>
                  <div>Location Placeholder</div>
                  <div className="font-semibold">{webpage.price}</div>
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
    `http://${process.env.API_IP}:3000/webpage/find-all-divided-by-product-slim-product-name/true/${productName}`,
    { headers: { Authorization: `Bearer ${process.env.API_KEY || ""}` } },
  );
  // const productResponse = await fetch(
  //   `http://${process.env.API_IP}:3000/product/find-one-by-product-name/${productName}`,
  //   { headers: { Authorization: `Bearer ${process.env.API_KEY || ""}` } },
  // )

  if (!r.ok) return { notFound: true, revalidate: 3600 };

  const json: Product = await r.json();
  // const product = await productResponse.json()

  return {
    props: { products: json },
    revalidate: 30,
  };
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: "blocking",
});
