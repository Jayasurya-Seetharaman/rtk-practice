import { configureStore } from "@reduxjs/toolkit";
import propertiesReducer from "../../features/properties/models/propertiesSlice";
import authReducer from "../../features/auth/models/authSlice";

export const store = configureStore({
  reducer: {
    properties: propertiesReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
