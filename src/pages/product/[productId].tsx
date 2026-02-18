import React from "react";
import Nav from "@/components/Nav";
import Link from "next/link";

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
        <section
          className="grid mb-10
"
        >
          <div>
            <h1 className="text-2xl justify-center pb-10">
              Product List: {props.products.productName}
            </h1>
          </div>
          <ul>
            {props.products.webPages.map((webpage: WebPage) => {
              return (
                <li className="pb-4" key={webpage.id}>
                  <ul>
                    <li>
                      <Link href={webpage.url} className="hover:underline">
                        <div>Shop: {webpage.shop}</div>
                        <div>Price: {webpage.price}</div>
                      </Link>
                    </li>
                  </ul>
                </li>
              );
            })}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default ProductPage;

export const getServerSideProps = async (context: {
  params: { productId: string };
}) => {
  console.log(context.params.productId);
  const response = await fetch(
    `http://${process.env.API_IP}:3000/webpage/find-all-divided-by-product-slim/true/${context.params.productId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.API_KEY} ?? ""`,
      },
    },
  );
  const json: [] = await response.json();
  console.log(json);
  return {
    props: {
      products: json,
    },
  };
};
