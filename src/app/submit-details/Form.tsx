"use client";
import React, { useEffect, useState } from "react";
import { CarMakesResponse, CarModelsResponse } from "../../services/carapi";
import { FormProvider, useForm } from "react-hook-form";
import ControlledInput from "@/components/forms/Input/ControlledInput";
import ControlledSelect, {
  Option,
  yupSelectOption,
} from "@/components/forms/Select/ControlledSelect";
import { string, object, date } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ControlledDatepicker from "@/components/forms/DatePicker/date-picker";

interface FormProps {
  carMakes: CarMakesResponse["data"];
}

export interface FormInputs {
  carPlateNumber: string | undefined;
  carMake: Option | undefined;
  carModel: Option | undefined;
  dateOfAccident: Date | undefined;
}

export type FormNames = keyof FormInputs;

interface CarModel {
  label: string;
  value: string;
}

const schema = object().shape({
  carPlateNumber: string().optional(),
  carMake: yupSelectOption.optional(),
  carModel: yupSelectOption.optional(),
  dateOfAccident: date().optional()
});

const Form = ({ carMakes }: FormProps) => {
  const methods = useForm<FormInputs>({
    defaultValues: {
    },
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
  });

  const { control, watch, resetField, formState } = methods;

  const [carModels, setCarModels] = useState<CarModel[]>();

  const carMake = watch("carMake");

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

  return (
    <FormProvider {...methods} >
      <form className="w-full px-2 sm:px-0 sm:w-96 mx-auto flex flex-col gap-4">
        <ControlledInput
          control={control}
          name="carPlateNumber"
          label="Car number plate"
          labelPlacement="inside"
          errorMessage={
            formState.errors.carPlateNumber?.message && (
              <>{formState.errors.carPlateNumber?.message}</>
            )
          }
        />
        <ControlledSelect
          control={control}
          name="carMake"
          placeholder="Make"
          options={carMakes?.map((x) => ({ label: x.name, value: x.name }))}
        />
        <ControlledSelect
          control={control}
          name="carModel"
          placeholder="Model"
          isLoading={!!!carModels && !!formState.dirtyFields.carMake}
          options={carModels}
        />
        <ControlledDatepicker
          name='dateOfAccident'
          label="Date of accident"
          labelPlacement="inside"
          errorMessage={
            formState.dirtyFields.carPlateNumber && (
              <>{formState.errors.carPlateNumber?.message}</>
            )
          }
        />
      </form>
    </FormProvider>
  );
};

export default Form;
