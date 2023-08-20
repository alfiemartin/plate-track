import { FormInputs, FormNames } from "@/app/submit-details/main-form";
import { TextAreaProps, Textarea } from "@nextui-org/react";
import React from "react";
import { useController, useFormContext } from "react-hook-form";

interface ControlledInputProps extends TextAreaProps {
  name: FormNames;
  label: string;
}

const ControlledTextArea = ({
  name,
  ...textAreaPops
}: ControlledInputProps) => {
  const { control } = useFormContext<FormInputs>();

  const {
    field
  } = useController({
    name,
    control,
  });

  return (
    <Textarea variant="bordered" {...textAreaPops} onChange={field.onChange} value={field.value as string} />
  );
};

export default ControlledTextArea;
