import React from "react";

import styles from "./app.module.scss";

import { Form } from "@spreadsheet/common-components";
import { Box, Divider, Paper, Typography } from "@material-ui/core";

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
    </Paper>
  );
}

export default App;
