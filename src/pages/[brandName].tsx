import Nav from "@/components/Nav";
import { GetStaticPaths, GetStaticProps } from "next";
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
            {props.products.map((product: Product, index: number) => {
              return (
                <li key={product.id} className="h-full">
                  <Link
                    href={`/product/${product.urlSafeName}`}
                    prefetch
                    className="block h-full"
                  >
                    <div className="flex items-center gap-5 h-full flex-col rounded-lg border border-white/10 bg-gray-600/50 p-4 pb-4 font-extrabold">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        width={160}
                        height={160}
                        sizes="160px"
                        priority={index === 0}
                        fetchPriority={index === 0 ? "high" : undefined}
                        quality={65}
                        className="object-contain"
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

export const getStaticProps: GetStaticProps = async (context) => {
  const brandName = context.params?.brandName as string;
  const res = await fetch(
    `http://${process.env.API_IP}:3000/product/find-all-product-only-by-brand/${brandName}`,
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

  console.log(products);

  return {
    props: { products },
    revalidate: 300,
  };
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: "blocking",
});
