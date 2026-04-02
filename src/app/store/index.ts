import { configureStore } from "@reduxjs/toolkit";
import propertiesReducer from "../../features/properties/models/propertiesSlice";
import authReducer from "../../features/auth/models/authSlice";
import categoriesReducer from "../../features/products/models/categoriesSlice";
import { productsApi } from "../../features/products/api/productsApi";

export const store = configureStore({
  reducer: {
    properties: propertiesReducer,
    auth: authReducer,
    categories: categoriesReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
