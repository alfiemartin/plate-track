import { FormInputs, FormNames } from "@/app/submit-details/main-form";
import { Checkbox, Input, InputProps } from "@nextui-org/react";
import React, { useState } from "react";
import { useController, useFormContext } from "react-hook-form";

interface ControlledInputProps extends InputProps {
  name: FormNames;
  label: string;
  isCheckboxGuarded?: boolean;
  checkboxLabel?: string;
}

const ControlledInput = ({
  name,
  label,
  isCheckboxGuarded = false,
  checkboxLabel,
  ...inputProps
}: ControlledInputProps) => {
  const { control } = useFormContext<FormInputs>();

  const {
    field: { name: fieldName, value, onChange },
    fieldState: { invalid, isDirty, error },
  } = useController({
    name,
    control,
  });

  const [checked, setChecked] = useState(false);

  const isDisabled = inputProps.disabled
    ? true
    : isCheckboxGuarded
    ? !checked
    : false;

  return (
    <>
      {isCheckboxGuarded && (
        <Checkbox
          onChange={(e) => setChecked(e.target.checked)}
          checked={checked}
        >
          {checkboxLabel}
        </Checkbox>
      )}
      <Input
        {...inputProps}
        className={isDisabled ? "disabled-input" : "enabled-input"}
        errorMessage={<p>{inputProps.errorMessage}</p>}
        disabled={isDisabled}
        name={fieldName}
        onChange={(e) => onChange(e.target.value)}
        value={value as string ?? ''}
        variant="bordered"
        label={label}
      />
    </>
  );
};

export default ControlledInput;
