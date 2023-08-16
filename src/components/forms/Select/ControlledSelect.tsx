import React from "react";
import { Controller } from "react-hook-form";
import ReactSelect, { Props } from "react-select";
import * as yup from 'yup';

export interface Option {
  value: string;
  label: string;
}

export const yupSelectOption = yup.object({
  value: yup.string().required(),
  label: yup.string().required(),
});

interface SelectProps extends Props {
  control: any;
  name: string;
  options?: Option[];
}

const ControlledSelect = ({
  name,
  control,
  options,
  placeholder,
  isLoading
}: SelectProps) => {
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
          placeholder={
            <label className="text-sm px-1">{placeholder}</label>
          }
          isLoading={isLoading}
          isDisabled={!options}
          formatOptionLabel={({ value }) => <label className="text-sm px-1">{value}</label>}
        />
      )}
    />
  );
};

export default ControlledSelect;
