import React from "react";

import styles from "./app.module.scss";

import { Form } from "@spreadsheet/common-components";
import { Box, Divider, Paper, Typography } from "@material-ui/core";

import { Route, Link } from "react-router-dom";

import { SpreadsheetComponents } from "@spreadsheet/components";

export function App() {
  return (
    <Paper className={styles.main}>
      <Typography variant={"h5"}>Spreadsheet by Eugen Sincovschi</Typography>
      <Box py={2}>
        <Divider />
      </Box>
      <Form onSubmit={console.log}>
        <Form.TextInput name={"text"} type={"text"} />
        <Form.TextInput name={"number"} type={"number"} />
        <Form.TextInput name={"date"} type={"date"} />
        <Form.Select
          name={"select"}
          menuItems={{
            one: "one",
            two: "two",
          }}
        />
      </Form>

      {/* START: routes */}
      {/* These routes and navigation have been generated for you */}
      {/* Feel free to move and update them to fit your needs */}
      <br />
      <hr />
      <br />
      <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/components">SpreadsheetComponents</Link>
          </li>
          <li>
            <Link to="/page-2">Page 2</Link>
          </li>
        </ul>
      </div>
      <Route
        path="/"
        exact
        render={() => (
          <div>
            This is the generated root route.{" "}
            <Link to="/page-2">Click here for page 2.</Link>
          </div>
        )}
      />
      <Route path="/components" component={SpreadsheetComponents} />
      <Route
        path="/page-2"
        exact
        render={() => (
          <div>
            <Link to="/">Click here to go back to root page.</Link>
          </div>
        )}
      />
      {/* END: routes */}
    </Paper>
  );
}

export default App;
