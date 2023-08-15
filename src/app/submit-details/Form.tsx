"use client";
import React, { useEffect, useState } from "react";
import { CarMakesResponse, CarModelsResponse } from "../services/carapi";
import { Controller, useForm } from "react-hook-form";
import ControlledInput from "@/components/forms/Input/ControlledInput";
import ReactSelect from "react-select";
import ControlledSelect from "@/components/forms/Select/ControlledSelect";

interface FormProps {
  carMakes: CarMakesResponse["data"];
}

interface FormInputs {
  carPlateNumber: string;
  carMake: string;
  carModel: string;
}

interface CarModel {
  id: number;
  name: string;
}

const Form = ({ carMakes }: FormProps) => {
  const { control, watch, resetField } = useForm<FormInputs>({
    defaultValues: {
      carMake: "",
      carModel: "",
      carPlateNumber: "",
    },
    mode: "onChange",
  });

  const options = carMakes.map((x) => ({ value: x.name, label: x.name }));

  const [carModels, setCarModels] = useState<CarModel[]>();

  const carMake = watch("carMake");
  const carPlateNumber = watch("carPlateNumber");

  useEffect(() => {
    console.log("reet");
    resetField("carMake");
  }, [carPlateNumber]);

  useEffect(() => {
    (async () => {
      if (carMake) {
        setCarModels([]);
        const models: CarModelsResponse["data"] = await (
          await fetch(`/api/cars/models?make=${carMake}`)
        ).json();
        setCarModels(models.map((x) => ({ id: x.id, name: x.name })));
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
        defaultValue=""
        placeholder="Car make"
        options={carMakes?.map((x) => ({ label: x.name, value: x.name }))}
      />
      <ControlledSelect
        control={control}
        name="carModel"
        defaultValue=""
        placeholder="Car model"
        options={carModels?.map((x) => ({ label: x.name, value: x.name }))}
      />
    </form>
  );
};

export default Form;
