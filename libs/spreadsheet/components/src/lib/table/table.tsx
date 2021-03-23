import React from "react";
import { Link } from "react-router-dom";
import { Box, Grid, Typography } from "@material-ui/core";
import { Form } from "@spreadsheet/common-components";
import { useSelector } from "react-redux";
import { ColmunEntity, RowEntity, selectors } from "../redux";

/* eslint-disable-next-line */
export interface TableProps {}

export function Table(props: TableProps) {
  const table = useSelector(selectors.selectAll);
  if (!table.length) {
    return (
      <Box my={1}>
        <Typography>Your table in empty</Typography>
        <Link to={"/new-column"}>Try to add new column</Link>
      </Box>
    );
  }
  return (
    <Form
      onSubmit={(data) => alert(JSON.stringify(data))}
      defaultValues={
        {
          /* Data from DB */
        }
      }
    >
      <Grid
        container
        direction="row"
        wrap="nowrap"
        justify="flex-start"
        alignContent="flex-start"
        spacing={1}
      >
        {table.map((column: ColmunEntity) => {
          return (
            <Grid item direction="column">
              <Typography>
                {column.name}{" "}
                {column.required && <span style={{ color: "red" }}>*</span>}
              </Typography>
              {column.rows.map((row: RowEntity) => {
                return (
                  <Grid item spacing={1}>
                    <Box my={1}>
                      <Form.TextInput
                        key={row.id.toString()}
                        type={column.type}
                        name={row.id.toString()}
                        fieldValidate={{
                          required: column.required,
                        }}
                      />
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          );
        })}
      </Grid>
      <Form.Button
        type={"button"}
        label={"Add 10 rows"}
        variant={"outlined"}
        color={"secondary"}
        onClick={() => {
          alert(
            "Sorry this functional was skipped, due to lack of time. But you have enough to look in code. e.g. Unit tests or Redux ToolKit",
          );
        }}
      />
      <br />
      <Form.Button type={"submit"} label={"Submit"} />
    </Form>
  );
}
