import React from "react";

import { Route, Link } from "react-router-dom";

import "./spreadsheet-components.module.scss";

/* eslint-disable-next-line */
export interface SpreadsheetComponentsProps {}

export function SpreadsheetComponents(props: SpreadsheetComponentsProps) {
  return (
    <div>
      <h1>Welcome to spreadsheet-components!</h1>

      <ul>
        <li>
          <Link to="/">spreadsheet-components root</Link>
        </li>
      </ul>
      <Route
        path="/"
        render={() => <div>This is the spreadsheet-components root route.</div>}
      />
    </div>
  );
}

export default SpreadsheetComponents;
