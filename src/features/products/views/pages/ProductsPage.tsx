import { useProductsVM } from "../../viewmodels/useProductsVM";
import { ProductsGrid } from "../components/ProductsGrid";

export function ProductsPage() {
  const { products, isLoading, isError, error } = useProductsVM();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500 text-lg">Loading products...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-500 text-lg">Error: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Products</h1>
      <ProductsGrid products={products} />
    </div>
  );
}