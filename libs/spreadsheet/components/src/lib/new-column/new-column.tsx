import React from "react";
import { Form } from "@spreadsheet/common-components";

/* eslint-disable-next-line */
export interface NewColumnProps {}

export function NewColumn(props: NewColumnProps) {
  return (
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
  );
}
