import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../../app/services/axiosClient";
import type { Category, CategoriesState } from "./types";

export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosClient.get<Category[]>(
        "/products/categories"
      );
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue("Failed to fetch categories");
    }
  }
);

const initialState: CategoriesState = {
  items: [],
  status: "idle",
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) ?? "Something went wrong";
      });
  },
});

export default categoriesSlice.reducer;

