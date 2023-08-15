import { Input, InputProps } from "@nextui-org/react";
import React from "react";
import { Controller } from "react-hook-form";

interface ControlledInputProps extends InputProps {
  name: string;
  label: string;
  control: any;
}

const ControlledInput = ({
  control,
  name,
  label,
  ...inputProps
}: ControlledInputProps) => (
  <Controller
    name={name}
    defaultValue={""}
    control={control}
    render={({ field }) => (
      <Input {...field} variant="bordered" label={label} {...inputProps} />
    )}
  />
);

export default ControlledInput;
