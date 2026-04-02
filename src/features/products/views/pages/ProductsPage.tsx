import { useProductsVM } from "../../viewmodels/useProductsVM";
import { useCategoriesVM } from "../../viewmodels/useCategoriesVM";
import { CategoryFilter } from "../components/CategoryFilter";
import { ProductsGrid } from "../components/ProductsGrid";

export function ProductsPage() {
  const {
    filteredProducts,
    selectedCategory,
    setSelectedCategory,
    isLoading,
    isError,
    error,
  } = useProductsVM();

  const {
    categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
    error: categoriesError,
  } = useCategoriesVM();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Products</h1>
      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory}
        categories={categories}
        isLoading={isCategoriesLoading}
        isError={isCategoriesError}
        error={categoriesError}
      />

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500 text-lg">Loading products...</p>
        </div>
      ) : isError ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-red-500 text-lg">Error: {error}</p>
        </div>
      ) : (
        <ProductsGrid products={filteredProducts} />
      )}
    </div>
  );
}