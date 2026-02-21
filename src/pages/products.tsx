import Nav from "@/components/Nav";
import { GetStaticProps } from "next";
import Link from "next/link";
import Image from "next/image";

interface HomeProps {
  products: Product[];
}

export default function Home(props: HomeProps) {
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
            <h1 className="text-2xl justify-center pb-4">Products List</h1>
            <p className="text mb-10">
              List of all the products currently with Cardsbolt
            </p>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-4 text-center gap-5">
            {props.products.map((product: Product) => {
              return (
                <li key={product.id} className="h-full">
                  <Link
                    href={`/product/${product.urlSafeName}`}
                    prefetch
                    className="block h-full"
                  >
                    <div className="flex gap-5 h-full flex-col rounded-lg border border-white/10 bg-gray-600/50 p-4 pb-4 font-extrabold">
                      <Image
                        src={product.imageUrl}
                        alt="Magic: The Gathering | Avatar: The Last Airbender Collector Booster Box"
                        width={600}
                        height={600}
                        className="h-40 w-full object-contain"
                        loading="lazy"
                      />
                      <p>{product.name}</p>
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
    revalidate: 300,
  };
};
