import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityState,
  PayloadAction,
} from "@reduxjs/toolkit";

export const TABLE_FEATURE_KEY = "table";

/*
 * Update these interfaces according to your requirements.
 */

export interface ColmunEntity extends Record<string, unknown> {
  id: number;
  name: string;
  type: "text" | "date" | "number";
  required: boolean;
  rows: RowEntity[];
}

export interface RowEntity {
  id: number;
  content: string;
}

export interface TableState extends EntityState<ColmunEntity> {
  loadingStatus: "not loaded" | "loading" | "loaded" | "error";
  error?: string | null;
}

export const tableAdapter = createEntityAdapter<ColmunEntity>();

/**
 * Export an effect using createAsyncThunk from
 * the Redux Toolkit: https://redux-toolkit.js.org/api/createAsyncThunk
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(fetchTable())
 * }, [dispatch]);
 * ```
 */
export const fetchTable = createAsyncThunk(
  "table/fetchStatus",
  async (_, thunkAPI) => {
    /**
     * Replace this with your custom fetch call.
     * For example, `return myApi.getTables()`;
     * Right now we just return an empty array.
     */
    return Promise.resolve([]);
  },
);

export const initialTableState: TableState = tableAdapter.getInitialState({
  loadingStatus: "not loaded",
  error: null,
});

export const tableSlice = createSlice({
  name: TABLE_FEATURE_KEY,
  initialState: initialTableState,
  reducers: {
    add: tableAdapter.addOne,
    update: tableAdapter.updateOne,
    remove: tableAdapter.removeOne,
    removeAll: tableAdapter.removeAll,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTable.pending, (state: TableState) => {
        state.loadingStatus = "loading";
      })
      .addCase(
        fetchTable.fulfilled,
        (state: TableState, action: PayloadAction<ColmunEntity[]>) => {
          tableAdapter.setAll(state, action.payload);
          state.loadingStatus = "loaded";
        },
      )
      .addCase(fetchTable.rejected, (state: TableState, action) => {
        state.loadingStatus = "error";
        state.error = action.error.message;
      });
  },
});

/*
 * Export reducer for store configuration.
 */
export const tableReducer = tableSlice.reducer;

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(tableActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const actions = tableSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllTable);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */

export const getTableState = (rootState: any): TableState =>
  rootState[TABLE_FEATURE_KEY];

export const selectors = tableAdapter.getSelectors(
  (state: any) => state[TABLE_FEATURE_KEY],
);
