import type { GetServerSideProps, GetStaticProps } from "next";
import { Timestamp } from "next/dist/server/lib/cache-handlers/types";

interface Product {
  name: string;
  id: string;
  urlSafeName: string;
  brand: string;
  imageUrl: string;
  updatedLast: Timestamp;
}

interface ProductPageProps {
  products: Product[];
}

function generateSiteMap(products: Product[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${products
  .map((product: Product) => {
    return `
  <url>
    <loc>https://cardsbolt.com/product/${product.urlSafeName}</loc>
    <lastmod>${new Date(product.updatedLast).toISOString()}</lastmod>
  </url>`;
  })
  .join("")}
</urlset>`;
}

export const getServerSideProps: GetServerSideProps<ProductPageProps> = async ({
  res,
}) => {
  const productResponse = await fetch(
    `http://${process.env.API_IP}:3000/product/find-all-product-only`,
    {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY ?? ""}`,
      },
    },
  );

  if (!productResponse.ok) {
    return { props: { products: [] }, revalidate: 60 };
  }

  const products: Product[] = await productResponse.json();

  const sitemap = generateSiteMap(products);

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return { props: { products } };
};
