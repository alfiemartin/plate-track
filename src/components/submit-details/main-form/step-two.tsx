import React, { useState } from "react";
import { CommonStepProps } from "./step-one";
import { Chip } from "@nextui-org/react";
import StepTitle from "./step-title";
import ControlledInput from "@/components/forms/input/controlled-input";
import { FormNames } from "./form-types";
import { usePlateFormContext } from "@/providers/form/form-provider";
import { PlateFormTypes } from "@/providers/form/form-reducer";
import ContinueButton from "./continue-button";
import { HiOutlineCheck } from "react-icons/hi";

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
  const [, dispatch] = usePlateFormContext();

  const toggleChip = (name: FormNames) => {
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
      payload: chipsState
        .filter(
          (chip) =>
            chip.selected === true || (chip.name === name && !chip.selected)
        )
        .map((chip) => chip.name),
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <StepTitle
        title="Step 2"
        subtitle="Choose one or more fields that you want the victim to submit to be able to connect with you"
      />
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
      {chipsState.map(({ name, displayName, selected }) => (
        <ControlledInput
          key={name}
          name={name}
          id={name}
          label={displayName}
          labelPlacement="inside"
          disabled={!selected ? true : false}
        />
      ))}
      <ContinueButton />
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
