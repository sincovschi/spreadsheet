import React from "react";
import { Form } from "./form-and-inputs";
import {
  FormTypes,
  defaultValues,
  textInputProps,
  selectInputProps,
  checkboxInputProps,
  radioGroupProps,
} from "./form-and-inputs.mock";
import { makeStyles, Theme } from "@material-ui/core";

export default {
  title: "Form and inputs component",
};

const useStyles = makeStyles<Theme>((theme) => ({
  formInput: {
    margin: theme.spacing(0, 3, 2),
  },
}));

export function FormAndInputs() {
  const classes = useStyles();

  return (
    <Form<FormTypes>
      onSubmit={console.log}
      defaultValues={defaultValues}
      style={{ width: "375px" }}
    >
      <Form.TextInput
        id={"text-input"}
        name={"textInput"}
        label={textInputProps.label}
        fieldValidate={textInputProps.validate}
      />

      <br />

      <Form.Select
        id={"select-input"}
        name={"selectInput"}
        label={selectInputProps.label}
        menuItems={selectInputProps.items}
        fieldValidate={selectInputProps.validate}
      />

      <Form.CheckboxInput
        id={"checkbox-input"}
        name={"checkboxInput"}
        label={checkboxInputProps.label}
      />

      <Form.RadioGroup name={"radioGroup"} options={radioGroupProps.options} />

      <Form.HiddenInput name={"hiddenInput"} />

      <Form.Button
        label={"Submit"}
        type={"submit"}
        disableOnInvalidForm={true}
      />

      <Form.Button
        className={classes.formInput}
        label={"Back"}
        variant={"text"}
        onClick={() => console.log("Go back.")}
      />
    </Form>
  );
}
