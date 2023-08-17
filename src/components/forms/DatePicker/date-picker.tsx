import { InputProps, Input } from "@nextui-org/react";
import React, { forwardRef } from "react";
import { useController, useFormContext } from "react-hook-form";
import DatePicker from "react-datepicker";
import moment from "moment";
import { FormInputs, FormNames } from "../../../app/submit-details/main-form";
import "react-datepicker/dist/react-datepicker.css";


interface ControlledDatePickerProps extends InputProps {
  name: FormNames;
  label: string;
  isYearPicker?: boolean;
}

const CustomInput = forwardRef<HTMLInputElement, InputProps>(
  ({ onChange, ...props }, ref) => (
    <Input {...props} onChange={onChange} ref={ref} />
  )
);

const ControlledDatepicker = ({
  name,
  label,
  isYearPicker = false,
  ...inputProps
}: ControlledDatePickerProps) => {
  const { control } = useFormContext<FormInputs>();

  const {
    field: { ref, onChange, value },
    fieldState: { invalid, isDirty, error },
  } = useController({
    name,
    control,
  });

  return (
    <DatePicker
      calendarClassName="absolute"
      dateFormat={!isYearPicker ? "yyyy/MM/dd" : 'hh:mm'}
      selected={value as Date}
      showYearDropdown={!isYearPicker}
      showTimeSelect={isYearPicker}
      showTimeSelectOnly={isYearPicker}
      minDate={moment().year(2018).toDate()}
      maxDate={new Date()}
      onChange={onChange}
      customInput={
       <CustomInput
          {...inputProps}
          variant="bordered"
          label={label}
          value={value?.toString() + '  dfdsfdf'}
        />
      }
    />
  );
};

export default ControlledDatepicker;
