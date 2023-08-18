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
      dateFormat={!isYearPicker ? "yyyy/MM/dd" : "hh:mm aa"}
      selected={value as Date}
      showYearDropdown={!isYearPicker}
      showTimeSelect={isYearPicker}
      timeIntervals={isYearPicker ? 10 : undefined}
      showTimeSelectOnly={isYearPicker}
      minDate={moment().year(2018).toDate()}
      maxDate={new Date()}
      onChange={onChange}
      wrapperClassName="flex-1"
      popperClassName="!z-20"
      popperPlacement="bottom-start"
      className="z-20"
      showPopperArrow={false}
      popperModifiers={[
        {
          name: "offset",
          options: {
            offset: [0, 0],
          },
          enabled: true,
        },
        {
          name: "preventOverflow",
          options: {
            altAxis: true,
            padding: 40,
          },
          enabled: false
        },
      ]}
      popperContainer={
        ({ children }) => <div className="absolute">{children}</div>
      }
      customInput={
        <CustomInput
          {...inputProps}
          variant="bordered"
          label={label}
          errorMessage={<p>{inputProps.errorMessage}</p>}
          value={value?.toString()}
        />
      }
    />
  );
};

export default ControlledDatepicker;
