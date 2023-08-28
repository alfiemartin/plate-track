import { FormInputs, FormNames } from "@/components/submit-details/main-form/form-types";
import React from "react";
import { useController, useFormContext } from "react-hook-form";
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

interface SelectProps extends Props{
  name: FormNames;
  options?: Option[];
}

const ControlledSelect = ({
  name,
  options,
  placeholder,
  isLoading,
}: SelectProps) => {
  const { control } = useFormContext<FormInputs>();

  const { field } = useController({
    name,
    control,
  });

  return (
    <ReactSelect
      {...field}
      aria-label={name}
      id={name}
      value={field.value ? field.value as Option : null}
      options={options}
      placeholder={<label className="text-sm px-1">{placeholder}</label>}
      isLoading={isLoading}
      isDisabled={!options}
      isSearchable={false}
      formatOptionLabel={({ label }: Option) => (
        <label htmlFor={name} className="text-medium px-1">
          {label}
        </label>
      )}
      styles={{
        menu: (base) => ({
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
  );
};

export default ControlledSelect;
