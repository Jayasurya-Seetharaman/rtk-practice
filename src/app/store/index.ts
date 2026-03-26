import { configureStore } from "@reduxjs/toolkit";
import propertiesReducer from "../../features/properties/models/propertiesSlice";
import authReducer from "../../features/auth/models/authSlice";
import productsReducer from "../../features/products/models/productsSlice";

export const store = configureStore({
  reducer: {
    properties: propertiesReducer,
    auth: authReducer,
    products: productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
