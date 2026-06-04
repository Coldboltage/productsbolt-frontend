export interface Product {
  name: string;
  id: string;
  urlSafeName: string;
  brand: string;
  imageUrl: string;
  updatedLast: string | Date;
}

export interface ProductPageProps {
  products: Product[];
}
