import React from "react";
import { render } from "@testing-library/react";

import SpreadsheetComponents from "./spreadsheet-components";

describe("SpreadsheetComponents", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<SpreadsheetComponents />);
    expect(baseElement).toBeTruthy();
  });
});
