import {
  Option,
  yupSelectOption,
} from "@/components/forms/select/controlled-select";
import { boolean, date, object, string } from "yup";

export interface FormInputs {
  carPlateNumber: string;
  carMake: Option | undefined;
  carModel: Option | undefined;
  dateOfAccident: Date;
  startDateOfAccident: Date;
  endDateOfAccident: Date;
  streetName: string | undefined;
  postalCode: string | undefined;
  contactPhoneNumber: string | undefined;
  contactEmail: string | undefined;
  requestContact: boolean | undefined;
  message: string | undefined;
  signedIn: boolean;
}

export const MainFormSchema = object().shape({
  carPlateNumber: string().required(),
  carMake: yupSelectOption.optional(),
  carModel: yupSelectOption.optional(),
  dateOfAccident: date().required(),
  startDateOfAccident: date().required(),
  endDateOfAccident: date().required(),
  streetName: string().optional(),
  postalCode: string().optional(),
  contactPhoneNumber: string().optional(),
  contactEmail: string().optional(),
  message: string().optional(),
  requestContact: boolean().optional(),
  signedIn: boolean().required(),
});

export type FormNames = keyof FormInputs;
