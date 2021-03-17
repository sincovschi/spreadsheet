import * as React from "react";
import {
  Box,
  Button,
  ButtonProps,
  Checkbox,
  FormControlLabel,
  FormControlLabelProps,
  Input,
  InputProps,
  MenuItem,
  Radio,
  RadioGroup,
  RadioGroupProps,
  TextField,
  TextFieldProps,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  Controller,
  DeepPartial,
  SubmitHandler,
  UnpackNestedValue,
  useForm,
  useFormContext,
  RegisterOptions,
  FormProvider,
} from "react-hook-form";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
}));

export function Form<T extends Record<string, unknown>>({
  onSubmit,
  defaultValues,
  className = "",
  children,
  ...props
}: {
  onSubmit: (data: T) => void;
  defaultValues?: UnpackNestedValue<DeepPartial<T>>;
  className?: string;
  children?: React.ReactChild | React.ReactChild[];
  [key: string]: unknown;
}) {
  const classes = useStyles();

  const formMethods = useForm<T>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: defaultValues,
    resolver: undefined,
    criteriaMode: "firstError",
    shouldFocusError: true,
    shouldUnregister: true,
  });

  const { handleSubmit } = formMethods;

  const formSubmit = function (data: T): void {
    onSubmit(data);
  } as SubmitHandler<T>;

  return (
    <FormProvider {...formMethods}>
      <form
        className={clsx(classes.root, className)}
        onSubmit={handleSubmit(formSubmit)}
        {...props}
      >
        {children}
      </form>
    </FormProvider>
  );
}

Form.TextInput = function FormTextInput({
  name,
  label,
  className = "",
  helperText = "",
  fieldValidate = undefined,
  size = "medium",
  ...rest
}: TextFieldProps & {
  name: string;
  helperText?: string;
  fieldValidate?: RegisterOptions;
}) {
  const { register, errors } = useFormContext();

  return (
    <TextField
      name={name}
      label={label}
      className={className}
      inputRef={register(fieldValidate)}
      required={!!fieldValidate?.required}
      error={!!errors?.[name]?.message}
      helperText={errors?.[name]?.message ?? helperText}
      size={size}
      variant="outlined"
      {...rest}
    />
  );
};

Form.Select = function FormSelect({
  name,
  label,
  menuItems = {},
  helperText = "",
  fieldValidate,
  size = "medium",
  onChange: controlOnChange,
  colourSchemes,
  ...rest
}: TextFieldProps & {
  name: string;
  menuItems: Record<string, string | JSX.Element>;
  helperText?: string;
  fieldValidate?: RegisterOptions;
  colourSchemes?: unknown;
}) {
  const { control, errors } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={fieldValidate}
      render={({ name, value, onChange, onBlur }) => (
        <TextField
          select
          label={label}
          name={name}
          value={value}
          size={size}
          variant="outlined"
          {...rest}
          onChange={(event) => {
            onChange(event);
            controlOnChange?.(event);
          }}
          onBlur={onBlur}
          required={!!fieldValidate?.required}
          error={!!errors?.[name]?.message}
          helperText={errors?.[name]?.message ?? helperText}
        >
          {Object.entries(menuItems).map(([key, value]) => (
            <MenuItem key={key} value={key}>
              <Box width={1} display="flex" justifyContent="space-between">
                {value}
                <span
                  style={{
                    color: "#fff",
                    marginLeft: 10,
                    width: 100,
                    height: 20,
                  }}
                ></span>
              </Box>
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
};

Form.CheckboxInput = function FormCheckboxInput({
  name,
  label,
  disabled = false,
  size = "medium",
  ...rest
}: Omit<FormControlLabelProps, "control"> & {
  name: string;
  size?: "small" | "medium";
}) {
  const { register, control } = useFormContext();

  return (
    <FormControlLabel
      label={label}
      {...rest}
      control={
        <Checkbox
          defaultChecked={!!control.defaultValuesRef.current[name]}
          name={name}
          size={size}
          disabled={disabled}
          inputRef={register()}
          color="primary"
        />
      }
    />
  );
};

Form.Radio = function FormRadio({
  name,
  value,
  label,
  disabled = false,
  size = "medium",
  onChange = () => undefined,
  ...rest
}: Omit<FormControlLabelProps, "control"> & {
  name: string;
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  size?: "small" | "medium";
}) {
  const { register, watch, setValue } = useFormContext();

  const stringValue = String(value);
  const checkedValue = watch(name);

  return (
    <FormControlLabel
      label={label}
      {...rest}
      control={
        <Radio
          checked={stringValue === checkedValue}
          onChange={(event) => {
            setValue(name, stringValue);
            onChange(event);
          }}
          inputRef={register()}
          name={name}
          value={value}
          size={size}
          disabled={disabled}
          color="primary"
        />
      }
    />
  );
};

Form.RadioGroup = function FormRadioGroup({
  name,
  options,
  size = "medium",
  onChange = () => undefined,
  ...rest
}: RadioGroupProps & {
  name: string;
  options: { value: string; label: string; disabled?: boolean }[];
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  size?: "small" | "medium";
}) {
  const radioOptions = options.map((opt) => {
    const { value, label, disabled } = opt;
    return (
      <Form.Radio
        key={value}
        name={name}
        label={label}
        value={value}
        disabled={disabled}
        size={size}
      />
    );
  });

  return (
    <RadioGroup onChange={onChange} name={name} {...rest}>
      {radioOptions}
    </RadioGroup>
  );
};

Form.Button = function FormButton({
  label,
  type = "button",
  size = "medium",
  variant = "contained",
  color = "primary",
  disableOnInvalidForm = false,
  ...rest
}: ButtonProps & {
  label: string;
  disableOnInvalidForm?: boolean;
}) {
  const { formState } = useFormContext();

  return (
    <Button
      type={type}
      size={size}
      variant={variant}
      color={color}
      disabled={disableOnInvalidForm && !formState.isValid}
      {...rest}
    >
      {label}
    </Button>
  );
};

Form.HiddenInput = function FormHiddenInput({
  name,
  value = "",
  ...rest
}: InputProps & {
  name: string;
  value?: string;
}) {
  const { register, watch } = useFormContext();
  const watchedValue = watch(name);

  return (
    <Input
      name={name}
      value={watchedValue ?? value}
      {...rest}
      inputRef={register()}
      type={"hidden"}
    />
  );
};
