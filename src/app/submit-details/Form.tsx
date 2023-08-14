"use client";
import { Input } from "@nextui-org/react";
import React from "react";
import { CarMakesResponse } from "../services/carapi";
import Select from 'react-select';

interface FormProps {
  carMakes: CarMakesResponse["data"];
}

const Form = ({ carMakes }: FormProps) => {
  return (
    <form className="w-96 mx-auto flex flex-col gap-4">
      <Input variant="bordered" label="Number plate?" />
      <Select placeholder='Make' options={carMakes.map(x => ({ label: x.name, value: x.name }))} />
    </form>
  );
};

export default Form;
