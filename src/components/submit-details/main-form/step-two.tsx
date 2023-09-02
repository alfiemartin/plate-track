import React, { useEffect, useState } from "react";
import { CommonStepProps, hasRequiredFields } from "./step-one";
import { Chip, Divider } from "@nextui-org/react";
import StepTitle from "./step-title";
import ControlledInput from "@/components/forms/input/controlled-input";
import { FormInputs, FormNames } from "./form-types";
import { usePlateFormContext } from "@/providers/form/form-provider";
import { PlateFormTypes } from "@/providers/form/form-reducer";
import ContinueButton from "./continue-button";
import { HiOutlineCheck } from "react-icons/hi";
import { useFormContext } from "react-hook-form";
import CarMakesField from "./individual-fields/car-makes-field";

type ChipState = {
  name: FormNames;
  displayName: string;
  selected: boolean;
};

const defaultChipState: Array<ChipState> = [
  {
    name: "streetName",
    displayName: "Street name",
    selected: false,
  },
  {
    name: "postalCode",
    displayName: "Postal code",
    selected: false,
  },
  {
    name: "carPlateNumber",
    displayName: "Number plate",
    selected: false,
  },
];

const StepTwo = ({ swiper }: CommonStepProps) => {
  const [chipsState, setChipsState] = useState<ChipState[]>(defaultChipState);
  const [state, dispatch] = usePlateFormContext();

  const { formState, resetField } = useFormContext<FormInputs>();

  const toggleChip = (name: FormNames) => {
    const chip = chipsState.find((chip) => chip.name === name);
    if (chip?.selected) {
      resetField(name);
    }

    setChipsState((prevChipState) => {
      const newState = prevChipState.map((chip) => {
        return {
          ...chip,
          selected: chip.name === name ? !chip.selected : chip.selected,
        };
      });

      return newState;
    });

    dispatch({
      type: PlateFormTypes.setInUseFields,
      payload: [
        ...(state.journey?.inUseFields ?? []),
        ...chipsState
          .filter(
            (chip) =>
              chip.selected === true || (chip.name === name && !chip.selected)
          )
          .map((chip) => chip.name),
      ],
    });
  };

  useEffect(() => {
    dispatch({
      type: PlateFormTypes.setInUseFields,
      payload: [],
    });
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <StepTitle
        title="Step 2"
        subtitle="Choose one or more fields that you want the victim to submit to be able to connect with you"
      />
      {!state.journey?.inUseFields?.includes("carMake") && (
        <>
          <div className="flex gap-2">
            {chipsState.map(({ displayName, name, selected }) => (
              <Chip
                key={name}
                color={selected ? "primary" : "default"}
                className="hover:cursor-pointer"
                endContent={selected && <HiOutlineCheck />}
                onClick={() => toggleChip(name)}
              >
                {displayName}
              </Chip>
            ))}
          </div>
          {chipsState.map(
            ({ name, displayName, selected }) =>
              selected && (
                <ControlledInput
                  key={name}
                  name={name}
                  id={name}
                  label={displayName}
                  labelPlacement="inside"
                  disabled={!selected ? true : false}
                />
              )
          )}
        </>
      )}
      {state.journey?.inUseFields?.includes("carMake") && (
        <>
          <div>
            <p className="text-right text-xs text-gray-400">Optional</p>
            <Divider />
          </div>
          <CarMakesField />
        </>
      )}
      <ContinueButton
        onClick={() => {
          dispatch({
            type: PlateFormTypes.setInUseFields,
            payload: [...(state.journey?.inUseFields ?? []), "carMake"],
          });
        }}
        isDisabled={
          !hasRequiredFields(
            formState.dirtyFields,
            defaultChipState.map(({ name }) => name),
            false
          )
        }
      />
    </div>
  );
};

/* <CarMakesField />
      <CarModelsField />
      <Controller
        control={methods.control}
        name="signedIn"
        defaultValue={false}
        render={({ field }) => (
          <Checkbox checked={field.value} onChange={field.onChange}>
            In app messaging? (you must sign in with google)
          </Checkbox>
        )}
      /> 
   <ControlledTextArea name="message" label="Message for victim" />
   <FileInput
      onFileChange={setFile}
      file={file}
      label="Click here to upload a file"
      isCheckboxGuarded
      type="file"
      accept="video/*"
      checkboxLabel="Upload video footage?"
    /> 
    */

export default StepTwo;
