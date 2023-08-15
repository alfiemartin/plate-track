"use client";
import React, { useEffect, useState } from "react";
import { CarMakesResponse, CarModelsResponse } from "../services/carapi";
import { useForm } from "react-hook-form";
import ControlledInput from "@/components/forms/Input/ControlledInput";
import ControlledSelect, {
  Option,
} from "@/components/forms/Select/ControlledSelect";
import ReactSelect from "react-select";

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

const Form = ({ carMakes }: FormProps) => {
  const { control, watch, resetField } = useForm<FormInputs>({
    defaultValues: {
      carPlateNumber: "",
    },
    mode: "onChange",
  });

  const [carModels, setCarModels] = useState<CarModel[]>();

  const carMake = watch("carMake");

  useEffect(() => {
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
        label="Car Plate Number"
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
