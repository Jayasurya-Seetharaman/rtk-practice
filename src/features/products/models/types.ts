export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  thumbnail: string;
  rating: number;
  stock: number;
  brand: string;
  images: string[];
};

export type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export type Category = {
  slug: string;
  name: string;
  url: string;
};

export type CategoriesState = {
  items: Category[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};