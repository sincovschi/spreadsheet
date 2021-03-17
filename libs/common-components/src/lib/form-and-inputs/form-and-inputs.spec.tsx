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
import { render, screen, waitFor, act } from "@testing-library/react";
import { default as userEvent } from "@testing-library/user-event";
import "@testing-library/jest-dom";

const formJsx = (
  <Form<FormTypes>
    onSubmit={console.log}
    defaultValues={defaultValues}
    name={"testForm"}
  >
    <Form.TextInput
      id={"text-input"}
      name={"textInput"}
      label={textInputProps.label}
      fieldValidate={textInputProps.validate}
    />
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
    <Form.Button label={"Submit"} type={"submit"} disableOnInvalidForm={true} />
  </Form>
);

const getForm = (doc: HTMLDocument) => {
  const form = Array.from(doc.forms).find(
    (f: HTMLFormElement) => f.name === "testForm",
  );
  if (!form) throw new Error("testForm not found!");
  return form;
};

/**
 * Generate RegExp from a string
 * with options ignore case and multiline
 * @param str
 */
const rex = (str: string) => new RegExp(str, "i");

describe("Form", () => {
  beforeEach(() => {
    render(formJsx);
  });

  it("should render and match snapshot", () => {
    expect(screen.getByRole("form")).toMatchSnapshot();
  });

  it("TextInput should have default value and validation", async () => {
    const getTextInput = () => screen.getByLabelText(rex(textInputProps.label));

    expect(getTextInput()).toHaveValue(textInputProps.value);

    await waitFor(async () => {
      userEvent.type(getTextInput(), "{selectall}{del}");
      expect(getTextInput()).toHaveValue("");
      expect(
        screen.findByText(rex(textInputProps.validate.required)),
      ).toBeTruthy();
    });

    await waitFor(async () => {
      userEvent.type(getTextInput(), "a");
      expect(getTextInput()).toHaveValue("a");
      expect(
        screen.findByText(rex(textInputProps.validate.minLength.message)),
      ).toBeTruthy();
    });
  });

  it("Select should have default value and toggle list", async () => {
    const form = getForm(document);
    expect(form).toBeTruthy();

    const getSelectVisualInput = () =>
      screen.getByLabelText(rex(selectInputProps.label));
    const getSelectValueInput = () =>
      form.querySelector<HTMLInputElement>("input[name=selectInput]");

    expect(getSelectVisualInput()).toHaveTextContent(
      selectInputProps.items[selectInputProps.value as "CH" | "DE"],
    );
    expect(getSelectValueInput()).toHaveValue(defaultValues.selectInput);

    userEvent.click(getSelectVisualInput());
    expect(screen.getByRole("listbox")).toBeTruthy();

    const options = screen.getAllByRole("option");
    expect(options[1]).toContainHTML(selectInputProps.items.DE);
    userEvent.click(options[1]);
    expect(screen.queryByRole("listbox")).toBeFalsy();

    await waitFor(async () => {
      // Needs to be waited because dom gets re-rendered
      // and exist multiple copies of same element
      expect(getSelectVisualInput()).toHaveTextContent(
        selectInputProps.items.DE,
      );
      expect(getSelectValueInput()).toHaveValue("DE");
    });
  });

  it("CheckboxInput should have default value and toggle checks", async () => {
    const form = getForm(document);
    expect(form).toBeTruthy();
    const getCheckboxLabel = () => screen.getByText(checkboxInputProps.label);
    const getCheckboxInput = () =>
      form.querySelector<HTMLInputElement>("input[name=checkboxInput]");
    expect(getCheckboxLabel()).toBeVisible();

    userEvent.click(getCheckboxInput());
    expect(getCheckboxInput()).toHaveProperty(
      "checked",
      !defaultValues.checkboxInput,
    );
  });

  it("RadioGroup should have default value and switch option", async () => {
    const form = getForm(document);
    expect(form).toBeTruthy();

    const getRadio2 = () =>
      screen.getByLabelText(rex(radioGroupProps.options[1].label));

    expect(getRadio2()).toHaveProperty(
      "checked",
      defaultValues.radioGroup === radioGroupProps.options[1].value,
    );

    const getRadio1 = () =>
      screen.getByLabelText(rex(radioGroupProps.options[0].label));

    userEvent.click(getRadio1());
    // MUI Radio reacts only to .click()
    getRadio1().click();

    await act(async () => {
      await expect(getRadio1()).toHaveProperty("checked", true);
    });
  });

  it("HiddenInput should have default value", () => {
    const form = getForm(document);
    expect(form).toBeTruthy();

    const hiddenInput = form.querySelector<HTMLInputElement>(
      "input[name=hiddenInput]",
    );
    expect(hiddenInput).toHaveValue(defaultValues.hiddenInput);
  });

  it("Button should have label and is disabled on invalid form", async () => {
    const form = getForm(document);
    expect(form).toBeTruthy();

    const getSubmitButton = () =>
      screen.getByRole("button", { name: /Submit/i });

    const getTextInput = () => screen.getByLabelText(rex(textInputProps.label));

    expect(getSubmitButton()).toBeEnabled();

    await waitFor(() => {
      userEvent.type(getTextInput(), "{selectall}{del}");
    });
    expect(getSubmitButton()).toBeDisabled();
  });
});
