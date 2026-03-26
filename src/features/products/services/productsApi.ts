import axiosClient from "../../../app/services/axiosClient";
import type { Product } from "../models/types";

export const productsApi = {
  getAll: async () => {
    const { data } = await axiosClient.get<Product[]>("/products");
    return data;
  },

  getById: async (id: number) => {
    const { data } = await axiosClient.get<Product>(`/products/${id}`);
    return data;
  },

  getCategories: async () => {
    const { data } = await axiosClient.get<string[]>("/products/categories");
    return data;
  },
};