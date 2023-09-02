import React, { useEffect, useMemo } from "react";
import RequiredFields from "./required-fields";
import { useFormContext } from "react-hook-form";
import { FormInputs, FormNames } from "./form-types";
import { Swiper } from "swiper/types";
import StepTitle from "./step-title";
import ContinueButton from "./continue-button";

export type CommonStepProps = {
  swiper: Swiper | null;
};

type StepOneProps = {} & CommonStepProps;

export const hasRequiredFields = <T extends Record<PropertyKey, unknown>>(
  dirtyFields: T,
  requiredFields: (keyof T)[],
  all = true
) => {
  const dirtyFieldNames = Object.keys(dirtyFields);
  const sharedFields = dirtyFieldNames.filter((dirtyField) =>
    requiredFields.includes(dirtyField)
  );

  return all
    ? sharedFields.length !== requiredFields.length
    : sharedFields.length > 0;
};

const StepOne = ({ swiper }: StepOneProps) => {
  const { watch, formState, handleSubmit } = useFormContext<FormInputs>();

  const continueIsDisabled = useMemo(() => {
    return hasRequiredFields(formState.dirtyFields, [
      "dateOfAccident",
      "startDateOfAccident",
      "endDateOfAccident",
    ]);
  }, [watch()]);

  return (
    <div className="flex flex-col gap-4">
      <StepTitle title="Step 1" subtitle="Select a date and time range" />
      <RequiredFields />
      <ContinueButton
        isDisabled={continueIsDisabled}
        onClick={handleSubmit(() => {
          swiper?.slideNext();
        })}
      />
    </div>
  );
};

export default StepOne;
