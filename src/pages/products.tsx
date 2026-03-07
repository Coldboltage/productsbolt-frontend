import Nav from "@/components/Nav";
import { GetStaticProps } from "next";
import Link from "next/link";
import Image from "next/image";

interface HomeProps {
  products: Product[];
}

export default function Home(props: HomeProps) {
  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(6,182,212,0.25),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.18),transparent_45%),linear-gradient(180deg,#020617_0%,#020617_45%,#0b1120_100%)]" />

      <div className="relative mx-auto max-w-6xl pb-24">
        <header>
          <Nav />
        </header>

        <main className="px-5 pt-10 md:px-8">
          <section className="mb-10 grid">
            <div>
              <h1 className="pb-4 text-3xl font-semibold text-white md:text-4xl">
                Products List
              </h1>
              <p className="mb-10 text-slate-300 md:text-lg">
                List of all the products currently with Cardsbolt
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
                      <div className="flex h-full flex-col rounded-lg border border-slate-700/80 bg-slate-900/50 p-4 font-semibold text-slate-100 transition hover:border-cyan-300/60 hover:bg-slate-900/70">
                        <div className="mb-4 flex h-40 items-center justify-center">
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
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
          <section>
            <div className="hidden grid-cols-3 gap-6 text-center text-slate-300 md:grid">
              <div className="rounded-md border border-slate-700/80 bg-slate-900/40 p-4">
                <p>Find the cheapest shop with the product</p>
              </div>
              <div className="rounded-md border border-slate-700/80 bg-slate-900/40 p-4">
                <p>Updates every product within 2 hours</p>
              </div>
              <div className="rounded-md border border-slate-700/80 bg-slate-900/40 p-4">
                <p>High priority products every 5 mins</p>
              </div>
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
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(
    `http://${process.env.API_IP}:3000/product/find-all-product-only`,
    {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY ?? ""}`,
      },
    },
  );

  if (!res.ok) {
    return { props: { products: [] }, revalidate: 60 };
  }

  const products: Product[] = await res.json();

  return {
    props: { products },
    revalidate: 3600,
  };
};
