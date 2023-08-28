import ControlledDatepicker from "@/components/forms/date-picker/date-picker";
import React from "react";

const RequiredFields = () => {
  return (
    <>
      <ControlledDatepicker
        name="dateOfAccident"
        id="dateOfAccident"
        label="Date of accident"
        labelPlacement="inside"
        isRequired
      />
      <div className="flex gap-2">
        <ControlledDatepicker
          name="startDateOfAccident"
          id="timeStartOfAccident"
          isYearPicker
          label="Start time"
          labelPlacement="inside"
          isRequired
        />
        <ControlledDatepicker
          name="endDateOfAccident"
          id="endDateOfAccident"
          isYearPicker
          label="End time"
          labelPlacement="inside"
          isRequired
        />
      </div>
    </>
  );
};

export default RequiredFields;
