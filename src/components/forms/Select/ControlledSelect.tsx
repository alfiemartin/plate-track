import React from "react";
import { Controller } from "react-hook-form";
import ReactSelect, { Props } from "react-select";
import { Placeholder } from "react-select/animated";

interface SelectProps extends Props {
  control: any;
  name: string;
  defaultValue: string;
  options?: { label: string; value: string }[];
}

const ControlledSelect = ({
  name,
  control,
  options,
  defaultValue,
  ...selectProps
}: SelectProps) => (
  <Controller
    name={name}
    defaultValue={defaultValue}
    control={control}
    render={({ field }) => (
      <ReactSelect
        value={options?.find((x) => x.value === field.value)}
        onChange={(val) => field.onChange(val?.value)}
        options={options}
      />
    )}
  />
);

export default ControlledSelect;
