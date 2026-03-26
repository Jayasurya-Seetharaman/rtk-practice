export type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
      rate: number;
      count: number;
    };
  };
  
  export type ProductsState = {
    items: Product[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
  };