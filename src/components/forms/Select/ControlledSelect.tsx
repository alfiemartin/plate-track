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
}: SelectProps) => {
  if(name === 'carModel')
  console.log(options);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={{ label: "", value: "" }}
      render={({ field }) => (
        <ReactSelect
          {...field}
          value={field.value?.value ? field.value : null}
          options={options}
          placeholder={selectProps.placeholder}
        />
      )}
    />
  );
};

export default ControlledSelect;
