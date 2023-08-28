import ControlledInput from "@/components/forms/input/controlled-input";
import React from "react";

const CarNumberPlateField = () => {
  return (
    <ControlledInput
      name="carPlateNumber"
      id="carPlateNumber"
      label="Car number plate"
      labelPlacement="inside"
    />
  );
};

export default CarNumberPlateField;
