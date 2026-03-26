import { createAsyncThunk } from "@reduxjs/toolkit";
import { productsApi } from "../services/productsApi";

export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await productsApi.getAll();
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Failed to fetch products");
    }
  }
);