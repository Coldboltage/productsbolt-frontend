import Nav from "@/components/Nav";
import Link from "next/link";

export default function Home(props) {
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
              List of all the products currently with TCG Bolt
            </p>
          </div>
          <ul>
            {props.products.map((product: { name: string; id: string }) => {
              return (
                <li className="pb-4 underline" key={product.id}>
                  <Link href={`product/${product.id}`}>{product.name}</Link>
                </li>
              );
            })}
          </ul>
        </section>
        <section>
          <div className="grid gap-6 grid-cols-3 text-center">
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

export const getServerSideProps = async (context) => {
  const response = await fetch(
    `http://${process.env.API_IP}:3000/product/find-all-product-only`,
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
