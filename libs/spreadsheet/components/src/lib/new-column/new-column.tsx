import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { Form } from "@spreadsheet/common-components";
import {
  actions,
  AppDispatch,
  ColmunEntity,
  getTableState,
  RowEntity,
  selectors,
  tableAdapter,
} from "../redux";
import { useDispatch, useSelector } from "react-redux";

/* eslint-disable-next-line */
export interface NewColumnProps {}

export function NewColumn(props: NewColumnProps) {
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (data: ColmunEntity) => {
    const newColumn: ColmunEntity = {
      ...data,
      rows: generateEmptyRows(),
    };
    dispatch(actions.add(newColumn));
    history.push("/");
  };

  return (
    <Form<ColmunEntity>
      onSubmit={onSubmit}
      defaultValues={{
        id: random5Digits(),
        type: "text",
        required: false,
      }}
    >
      <Form.HiddenInput name={"id"} />
      <Form.Select
        label={"Select column type:"}
        name={"type"}
        menuItems={{
          text: "Text",
          date: "Date",
          number: "Number",
        }}
      />
      <Form.CheckboxInput label={"Is column required?"} name={"required"} />
      <Form.Button type="submit" label={"Add new row"} />
    </Form>
  );
}

const random5Digits = () => Math.floor(Math.random() * 90000) + 10000;

const generateEmptyRows = (): RowEntity[] => {
  return [...Array(10)].map(() => ({ id: random5Digits(), content: "" }));
};
