import Nav from "@/components/Nav";
import Link from "next/link";

export default function Home() {
  return (
    <div className={` max-w-5xl mx-auto`}>
      <header>
        <Nav />
      </header>

      <main className=" p-5">
        <section
          className="grid items-center justify-center h-[80vh]
"
        >
          <div>
            <h1 className="text-7xl text-center align-middle justify-center pb-6">
              TCG Bolt
            </h1>
            <p className="text-2xl text-center">
              Find the cheapest shops for the product you want
            </p>
            <div className="flex align-middle justify-center mt-10">
              <Link href="products" className=" bg-amber-500 p-2.5 font-bold">
                Product being tracked
              </Link>
            </div>
          </div>
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
