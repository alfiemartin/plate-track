import { FormNames } from "@/components/submit-details/main-form/form-types";
import { Checkbox, Input, InputProps } from "@nextui-org/react";
import React, { Dispatch, SetStateAction, useState } from "react";
import { HiUpload } from 'react-icons/hi';


interface FileInputProps extends InputProps {
  name?: FormNames;
  label: string;
  isCheckboxGuarded?: boolean;
  checkboxLabel?: string;
  onFileChange?: (file: File) => unknown;
  file: File | undefined;
}

const FileInput = ({
  name,
  label,
  isCheckboxGuarded = false,
  checkboxLabel,
  onFileChange,
  file,
  ...inputProps
}: FileInputProps) => {
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
          className="pb-0"
          onChange={(e) => setChecked(e.target.checked)}
          checked={checked}
        >
          {checkboxLabel}
        </Checkbox>
      )}
      <Input
        {...inputProps}
        type="file"
        classNames={{
          input: "text-medium opacity-0",
          label: "!translate-y-0 !pointer-events-none",
        }}
        onChange={(e) => onFileChange && onFileChange(e.target.files![0])}
        className={isDisabled ? "disabled-input" : "enabled-input"}
        errorMessage={<p>{inputProps.errorMessage}</p>}
        disabled={isDisabled}
        variant="bordered"
        label={file ? file.name : label}
        endContent={<HiUpload />}
      />
    </>
  );
};

export default FileInput;
