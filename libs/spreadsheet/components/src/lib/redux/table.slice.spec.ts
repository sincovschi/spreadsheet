import { fetchTable, tableAdapter, tableReducer } from "./table.slice";

describe("table reducer", () => {
  it("should handle initial state", () => {
    const expected = tableAdapter.getInitialState({
      loadingStatus: "not loaded",
      error: null,
    });

    expect(tableReducer(undefined, { type: "" })).toEqual(expected);
  });

  it("should handle fetchTables", () => {
    let state = tableReducer(undefined, fetchTable.pending(null, null));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: "loading",
        error: null,
        entities: {},
      }),
    );

    state = tableReducer(state, fetchTable.fulfilled([{ id: 1 }], null, null));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: "loaded",
        error: null,
        entities: { 1: { id: 1 } },
      }),
    );

    state = tableReducer(
      state,
      fetchTable.rejected(new Error("Uh oh"), null, null),
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: "error",
        error: "Uh oh",
        entities: { 1: { id: 1 } },
      }),
    );
  });
});
