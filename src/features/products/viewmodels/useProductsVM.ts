import { useCallback, useEffect, useMemo, useState } from "react";
import { useGetProductsQuery } from "../api/productsApi";
import type { Product } from "../models/types";
import { useAlert } from "../../../app/context/AlertContext";

export const useProductsVM = () => {
  const { data, isLoading, isError } = useGetProductsQuery();
  const { showAlert } = useAlert();

  useEffect(() => {
    if (isError) {
      showAlert('error', 'Failed to load products');
    }
  }, [isError, showAlert]);

  const products: Product[] | undefined = data?.products;
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    null
  );

  const filteredProducts = useMemo(() => {
    const safeProducts = products ?? [];
    if (!selectedCategory) return safeProducts;
    return safeProducts.filter((p) => p.category === selectedCategory);
  }, [products, selectedCategory]);

  const handleSelectCategory = useCallback(
    (categorySlug: string | null) => setSelectedCategory(categorySlug),
    []
  );

  return {
    selectedCategory,
    setSelectedCategory: handleSelectCategory,
    filteredProducts,
    isLoading,
    isError,
    error: isError ? "Failed to fetch products" : null,
  };
};