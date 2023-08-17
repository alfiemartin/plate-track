import { FormInputs } from "@/app/submit-details/main-form";
import { Input, InputProps } from "@nextui-org/react";
import React from "react";
import { Control, Controller } from "react-hook-form";

interface ControlledInputProps extends InputProps {
  name: string;
  label: string;
  control: Control<FormInputs, any>;
}

const ControlledInput = ({
  control,
  name,
  label,
  ...inputProps
}: ControlledInputProps) => (
  <Controller
    name={name as keyof FormInputs}
    defaultValue={""}
    control={control}
    render={({ field }) => (
      <Input {...field} value={(field.value as string).toUpperCase()} variant="bordered" label={label} {...inputProps} />
    )}
  />
);

export default ControlledInput;
