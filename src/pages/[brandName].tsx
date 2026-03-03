import Nav from "@/components/Nav";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

interface HomeProps {
  products: Product[];
  brandInfo: {
    urlSafeName: string;
    name: string;
    description: string;
  };
}

export default function Home(props: HomeProps) {
  return (
    <div className={` max-w-5xl mx-auto`}>
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

      <header>
        <Nav />
      </header>

      <main className=" p-5 mt-10">
        <section
          className="grid mb-10
"
        >
          <div>
            <h1 className="text-2xl justify-center pb-4">Products List</h1>
            <p className="text mb-10">
              <span>All products found for </span>
              <span className="font-extrabold italic">{`${props.brandInfo.name} `}</span>
              <span>with an active listing</span>
            </p>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-4 text-center gap-5">
            {props.products.map((product: Product) => {
              return (
                <li key={product.id} className="h-full">
                  <Link
                    href={`/product/${product.urlSafeName}`}
                    className="block h-full"
                  >
                    <div className="flex gap-2 flex-col h-full rounded-lg border border-white/10 bg-gray-600/50 p-4 font-extrabold">
                      <div className="flex items-center justify-center mb-1">
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
                      <p className="text-[11px] font-light">
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
        <section>
          <div className="hidden md:grid gap-6 grid-cols-3 text-center">
            <div>
              <p>Find the cheapest shop with the product</p>
            </div>
            <div>
              <p>Updates every product within 2 hours</p>
            </div>
            <div>
              <p>High priority products every 5 mins</p>
            </div>
          </div>
        </section>
      </main>
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
