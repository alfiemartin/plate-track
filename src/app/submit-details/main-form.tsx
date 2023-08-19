"use client";
import React, { useEffect, useState } from "react";
import { CarMakesResponse, CarModelsResponse } from "../../services/carapi";
import { FormProvider, useForm } from "react-hook-form";
import ControlledInput from "@/components/forms/input/controlled-input";
import ControlledSelect, {
  Option,
  yupSelectOption,
} from "@/components/forms/select/controlled-select";
import { string, object, date, number, boolean } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ControlledDatepicker from "@/components/forms/date-picker/date-picker";
import ControlledTextArea from '@/components/forms/text-area/controlled-textarea';

interface FormProps {
  carMakes: CarMakesResponse["data"];
}

export interface FormInputs {
  carPlateNumber: string;
  carMake: Option | undefined;
  carModel: Option | undefined;
  dateOfAccident: Date | undefined;
  startDateOfAccident: Date | undefined;
  endDateOfAccident: Date | undefined;
  streetName: string | undefined;
  postalCode: string | undefined;
  numberInvolved: string | undefined;
  contactPhoneNumber: string | undefined;
  contactEmail: string | undefined;
  requestContact: boolean | undefined;
  message: string | undefined;
}

export type FormNames = keyof FormInputs;

interface CarModel {
  label: string;
  value: string;
}

const schema = object().shape({
  carPlateNumber: string().required(),
  carMake: yupSelectOption.optional(),
  carModel: yupSelectOption.optional(),
  dateOfAccident: date().optional(),
  startDateOfAccident: date().optional(),
  endDateOfAccident: date().optional(),
  streetName: string().optional(),
  postalCode: string().optional(),
  numberInvolved: string().optional(),
  contactPhoneNumber: string().optional(),
  contactEmail: string().optional(),
  message: string().optional(),
  requestContact: boolean().optional(),
});

const MainForm = ({ carMakes }: FormProps) => {
  const methods = useForm<FormInputs>({
    defaultValues: {
      carPlateNumber: "",
      message: "",
      contactEmail: "",
      contactPhoneNumber: "",
      numberInvolved: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
  });

  const { control, watch, resetField, formState } = methods;

  const [carModels, setCarModels] = useState<CarModel[]>();

  const carMake = watch("carMake");
  const carPlate = watch("carPlateNumber");

  useEffect(() => {
    (async () => {
      if (carMake?.value) {
        setCarModels(undefined);
        resetField("carModel");
        const models: CarModelsResponse["data"] = await (
          await fetch(`/api/cars/models?make=${carMake.value}`)
        ).json();
        setCarModels(models.map((x) => ({ label: x.name, value: x.name })));
      }
    })();
  }, [carMake]);

  useEffect(() => {
    console.log(methods.getValues());
  }, [carPlate]);

  return (
    <FormProvider {...methods}>
      <form className="w-full sm:w-96 mx-auto flex flex-col gap-4">
        <ControlledInput
          name="carPlateNumber"
          id="carPlateNumber"
          label="Car number plate"
          labelPlacement="inside"
        />
        <ControlledSelect
          control={control}
          name="carMake"
          id="carMake"
          placeholder="Make"
          options={carMakes?.map((x) => ({ label: x.name, value: x.name }))}
        />
        <ControlledSelect
          control={control}
          name="carModel"
          id="carModel"
          placeholder="Model"
          isLoading={!!!carModels && !!formState.dirtyFields.carMake}
          options={carModels}
        />
        <ControlledDatepicker
          name="dateOfAccident"
          id="dateOfAccident"
          label="Date of accident"
          labelPlacement="inside"
        />
        <div className="flex gap-2">
          <ControlledDatepicker
            name="startDateOfAccident"
            id="timeStartOfAccident"
            isYearPicker
            label="Start time"
            labelPlacement="inside"
          />
          <ControlledDatepicker
            name="endDateOfAccident"
            id="endDateOfAccident"
            isYearPicker
            label="End time"
            labelPlacement="inside"
          />
        </div>
        <ControlledInput
          name="streetName"
          id="streetName"
          label="Street name"
          labelPlacement="inside"
        />
        <ControlledInput
          name="postalCode"
          id="postalCode"
          label="Postal code"
          labelPlacement="inside"
        />
        <ControlledInput
          name="numberInvolved"
          id="numberInvolved"
          label="Number of cars in accident"
          labelPlacement="inside"
        />
        <ControlledInput
          name="contactPhoneNumber"
          label="Phone number"
          isCheckboxGuarded
          checkboxLabel="Allow phone number?"
        />
        <ControlledInput
          name="contactEmail"
          label="Email address"
          isCheckboxGuarded
          checkboxLabel="Allow email address?"
        />
        <ControlledTextArea 
          name="message"
          label="Message for victim"
        />
      </form>
    </FormProvider>
  );
};

export default MainForm;
