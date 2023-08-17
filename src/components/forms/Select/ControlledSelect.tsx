import React from "react";
import { Controller } from "react-hook-form";
import ReactSelect, { Props } from "react-select";
import { object, string } from "yup";

export interface Option {
  value: string;
  label: string;
}

export const emptyOption = { value: "", label: "" } as const;

export const yupSelectOption = object({
  value: string().required(),
  label: string().required(),
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
  isLoading,
}: SelectProps) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={emptyOption}
      render={({ field }) => (
        <ReactSelect
          {...field}
          value={field.value?.value ? field.value : null}
          options={options}
          placeholder={<label className="text-sm px-1">{placeholder}</label>}
          isLoading={isLoading}
          isDisabled={!options}
          isSearchable={false}
          formatOptionLabel={({ value }) => (
            <label className="text-sm px-1">{value}</label>
          )}
          styles={{
            menu: (base) =>  ({
              ...base,
              zIndex: 11,
            }),
            control: (base, state) => ({
              ...base,
              borderWidth: undefined,
              borderColor: undefined,
              borderRadius: undefined,
              boxShadow: undefined,
              outline: undefined,
              transition: undefined,
              "&:hover": {
                outline: undefined,
                borderColor: undefined,
              },
            }),
          }}
          classNames={{
            control: (state) => {
              let base =
                "transition-colors border-default-200 hover:border-default-400 border-medium rounded-medium h-14";

              if (state.menuIsOpen || state.isFocused) {
                base = "!border-foreground ".concat(base);
              }

              return base;
            },
          }}
        />
      )}
    />
  );
};

export default ControlledSelect;
