import React from "react";
import { CommonStepProps, defaultChipState } from ".";
import { usePlateFormContext } from "@/providers/form/form-provider";
import { useFormContext } from "react-hook-form";
import StepTitle from "./step-title";
import RequiredFields from "../required-fields";
import { FormInputs, FormNames } from "../form-types";
import ControlledInput from "@/components/forms/input/controlled-input";
import ControlledTextArea from "@/components/forms/text-area/controlled-textarea";
import FileInput from "@/components/forms/file-uploader/file-uploder";

const Review = ({ swiper }: CommonStepProps) => {
  const [state] = usePlateFormContext();
  const { getValues } = useFormContext<FormInputs>();

  const formValues = Object.entries(getValues()).filter(
    ([, value]) => typeof value !== "undefined"
  );
  console.log(formValues);
  const formKeys = formValues.map(([key]) => key as FormNames);
  console.log(formKeys);

  return (
    <div className="flex flex-col gap-4">
      <StepTitle title="Review" subtitle="Review your changes" />
      <RequiredFields />
      {defaultChipState.map((field) => {
        if (formKeys.includes(field.name)) {
          return (
            <ControlledInput
              key={field.name}
              name={field.name}
              id={field.name}
              label={field.displayName}
              labelPlacement="inside"
            />
          );
        }
        return null;
      })}
      {formKeys.includes("message") && (
        <ControlledTextArea name="message" label="Message for victim" />
      )}
      {state.journey?.file && (
        <FileInput
          file={state.journey.file}
          label="Upload video footage"
          type="file"
          accept="video/*"
        />
      )}
    </div>
  );
};

export default Review;
