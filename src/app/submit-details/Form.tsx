"use client";
import React, { useEffect, useState } from "react";
import { CarMakesResponse, CarModelsResponse } from "../services/carapi";
import { useForm } from "react-hook-form";
import ControlledInput from "@/components/forms/Input/ControlledInput";
import ControlledSelect, {
  Option,
} from "@/components/forms/Select/ControlledSelect";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";


interface FormProps {
  carMakes: CarMakesResponse["data"];
}

interface FormInputs {
  carPlateNumber: string;
  carMake: Option;
  carModel: Option;
}

interface CarModel {
  label: string;
  value: string;
}

const yupOption = yup.object().shape({
  label: yup.string().required(),
  value: yup.string().required(),
});

const schema = yup.object().shape({
  carPlateNumber: yup.string().email().required(),
  carMake: yupOption,
  carModel: yupOption,
});

const Form = ({ carMakes }: FormProps) => {
  const { control, watch, resetField, formState } = useForm<FormInputs>({
    defaultValues: {
      carPlateNumber: "",
    },
    mode: "onChange",
    reValidateMode: 'onChange',
    resolver: yupResolver(schema) ,
  });

  const [carModels, setCarModels] = useState<CarModel[]>();

  const carMake = watch("carMake");

  useEffect(() => {
    console.log(formState);
    (async () => {
      if (carMake?.value) {
        setCarModels([]);
        resetField('carModel')
        const models: CarModelsResponse["data"] = await (
          await fetch(`/api/cars/models?make=${carMake.value}`)
        ).json();
        setCarModels(models.map((x) => ({ label: x.name, value: x.name })));
      }
    })();
  }, [carMake]);

  return (
    <form className="w-96 mx-auto flex flex-col gap-4">
      <ControlledInput
        control={control}
        name="carPlateNumber"
        label="Car number plate"
        labelPlacement="inside"
        errorMessage={formState.dirtyFields.carPlateNumber && <>{formState.errors.carPlateNumber?.message}</>}
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
        options={carModels}
      />
    </form>
  );
};

export default Form;
