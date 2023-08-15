"use client";
import React, { useEffect, useState } from "react";
import { CarMakesResponse, CarModelsResponse } from "../services/carapi";
import { Controller, useForm } from "react-hook-form";
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
  id: number;
  name: string;
}

const Form = ({ carMakes }: FormProps) => {
  const { control, watch, resetField } = useForm<FormInputs>({
    defaultValues: {
      carPlateNumber: "",
    },
    mode: "onChange",
  });

  const [carModels, setCarModels] = useState<CarModel[]>();

  const carNumber = watch("carPlateNumber");

  useEffect(() => {
    if (carNumber) {
      console.log("res");
      resetField("carMake");
    }
  }, [carNumber]);

  // useEffect(() => {
  //   (async () => {
  //     if (carMake) {
  //       setCarModels([]);
  //       resetField("carMake");
  //       const models: CarModelsResponse["data"] = await (
  //         await fetch(`/api/cars/models?make=${carMake}`)
  //       ).json();
  //       setCarModels(models.map((x) => ({ id: x.id, name: x.name })));
  //     }
  //   })();
  // }, [carMake]);

  return (
    <form className="w-96 mx-auto flex flex-col gap-4">
      <ControlledInput
        control={control}
        name="carPlateNumber"
        label="Car Plate Number"
      />
      <Controller
        name={'carMake'}
        control={control}
        defaultValue={{ label: '', value: '' }}
        render={({ field }) => (
          <ReactSelect
            {...field}
            value={field.value?.value ? field.value : null}
            options={carMakes?.map((x) => ({ label: x.name, value: x.name }))}
            placeholder={'Make'}
          />
        )}
      />
      {/* <ControlledSelects
        control={control}
        name="carMake"
        options={carMakes?.map((x) => ({ label: x.name, value: x.name }))}
      />
      <ControlledSelect
        control={control}
        name="carModel"
        options={carModels?.map((x) => ({ label: x.name, value: x.name }))}
      /> */}
    </form>
  );
};

export default Form;
