import ControlledInput from "@/components/forms/input/controlled-input";
import React from "react";

const LocationFields = () => {
  return (
    <>
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
    </>
  );
};

export default LocationFields;
