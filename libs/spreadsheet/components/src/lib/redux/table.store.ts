import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { TABLE_FEATURE_KEY, tableReducer } from "./table.slice";

export const store = configureStore({
  reducer: { [TABLE_FEATURE_KEY]: tableReducer },
  // Additional middleware can be passed to this array
  middleware: [...getDefaultMiddleware()],
  devTools: process.env.NODE_ENV !== "production",
  // Optional Redux store enhancers
  enhancers: [],
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
