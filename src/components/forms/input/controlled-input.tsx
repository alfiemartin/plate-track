import {
  FormNames,
  FormInputs,
} from "@/components/submit-details/main-form/form-types";
import { usePlateFormContext } from "@/providers/form/form-provider";
import { Checkbox, Input, InputProps } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
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
  const { setValue } = useFormContext<FormInputs>();
  const [state] = usePlateFormContext();

  const { field } = useController({
    name: state.journey?.inUseFields?.includes(name) ? name : "",
  });

  const [checked, setChecked] = useState(false);

  const isDisabled = inputProps.disabled
    ? true
    : isCheckboxGuarded
    ? !checked
    : false;

  useEffect(() => {
    if (isDisabled && isCheckboxGuarded) {
      setValue(name, "");
    }
  }, [isDisabled]);

  return (
    <>
      {isCheckboxGuarded && (
        <Checkbox
          className="pb-0"
          onChange={(e) => setChecked(e.target.checked)}
          checked={checked}
        >
          {checkboxLabel}
        </Checkbox>
      )}
      <Input
        {...inputProps}
        {...field}
        value={field.value ?? ""}
        classNames={{ input: "text-medium" }}
        className={isDisabled ? "disabled-input" : "enabled-input"}
        errorMessage={<p>{inputProps.errorMessage}</p>}
        disabled={isDisabled}
        variant="bordered"
        label={label}
      />
    </>
  );
};

export default ControlledInput;
