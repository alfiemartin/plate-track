import React from "react";
import { Controller } from "react-hook-form";
import ReactSelect, { Props } from "react-select";

export interface Option {
  value: string;
  label: string;
}

interface SelectProps extends Props {
  control: any;
  name: string;
  options?: Option[];
}


const ControlledSelect = ({
  name,
  control,
  options,
  ...selectProps
}: SelectProps) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <ReactSelect
        {...field}
        options={options}
        placeholder={selectProps.placeholder}
      />
    )}
  />
);

export default ControlledSelect;
