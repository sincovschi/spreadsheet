import { tableActions } from "./table.slice";
import { createSelectorHook, useDispatch } from "react-redux";
import { Action, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { TABLE_FEATURE_KEY, tableReducer } from "@spreadsheet/components";

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

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = createSelectorHook<
  RootState,
  Action<typeof tableActions>
>();
