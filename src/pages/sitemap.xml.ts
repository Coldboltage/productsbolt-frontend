import { Product, ProductPageProps } from "@/types/sitemap.products.types";
import type { GetServerSideProps } from "next";

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
    res.statusCode = 500;
    res.end();
    return { props: { products: [] } };
  }

  const products: Product[] = await productResponse.json();

  const sitemap = generateSiteMap(products);

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return { props: { products } };
};

export default function SiteMap() {
  return null;
}
