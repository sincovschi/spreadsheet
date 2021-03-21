import React from "react";

import styles from "./app.module.scss";

import { Box, Divider, Grid, Paper, Typography } from "@material-ui/core";

import { Route, Link } from "react-router-dom";

import { NewColumn, Table } from "@spreadsheet/components";

export function App() {
  return (
    <Paper className={styles.main}>
      <Typography variant={"h5"}>Spreadsheet by Eugen Sincovschi</Typography>
      <Box py={2}>
        <Divider />
      </Box>

      <Grid container>
        <Grid item xs={12}>
          <Link to="/">Home</Link>
        </Grid>
        <Grid item xs={12}>
          <Link to="/new-column">(+) Add new column</Link>
        </Grid>
      </Grid>

      <Box py={2}>
        <Divider />
      </Box>

      <Route path="/" exact component={Table} />

      <Route path="/new-column" component={NewColumn} />
    </Paper>
  );
}

export default App;
