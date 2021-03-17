export type FormTypes = {
  textInput: string;
  selectInput: string;
  checkboxInput: boolean;
  hiddenInput: string;
};

export const textInputProps = {
  value: "text-value",
  label: "Text input label",
  validate: {
    required: "Required",
    minLength: {
      value: 2,
      message: "Min 2",
    },
  },
};

export const selectInputProps = {
  value: "CH",
  label: "Select input label",
  items: { CH: "Switzerland", DE: "Germany" },
  validate: {
    required: "Required",
  },
};

export const checkboxInputProps = {
  value: true,
  label: "Checkbox input label",
};

export const hiddenInputProps = {
  value: "hidden-value",
};

export const radioGroupProps = {
  options: [
    { value: "1", label: "Radio one" },
    { value: "2", label: "Radio two" },
  ],
  value: "2",
};

export const defaultValues = {
  textInput: textInputProps.value,
  selectInput: selectInputProps.value,
  checkboxInput: checkboxInputProps.value,
  radioGroup: radioGroupProps.value,
  hiddenInput: hiddenInputProps.value,
};
