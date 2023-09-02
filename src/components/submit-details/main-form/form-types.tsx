import {
  Option,
  yupSelectOption,
} from "@/components/forms/select/controlled-select";
import {
  PlateFormActions,
  PlateFormTypes,
} from "@/providers/form/form-reducer";
import { Dispatch, useEffect, useMemo } from "react";
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

const MainFormSchema = {
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
};

type SchemaType = typeof MainFormSchema;

export const getSchema = <T extends Array<keyof SchemaType>>(
  neededFields?: T
) => {
  if (!neededFields) {
    return object(MainFormSchema as Pick<SchemaType, T[number]>);
  }

  const filteredSchema = Object.entries(MainFormSchema)
    .filter(([field]) => neededFields?.includes(field as FormNames) ?? true)
    .reduce(
      (prev, [key, value]) => ({ ...prev, [key]: value }),
      {} as Pick<SchemaType, T[number]>
    );

  return object(filteredSchema);
};

export const usePlateSchema = <T extends Array<FormNames>>(
  dispatch: Dispatch<PlateFormActions>,
  neededFields: T
) => {
  const needed = neededFields.reduce((prev, curr) => `${prev}${curr}`, "");

  useEffect(() => {
    if (neededFields) {
      dispatch({
        type: PlateFormTypes.setInUseFields,
        payload: [...neededFields],
      });
    }
  }, [needed]);

  const schema = useMemo(() => {
    return getSchema(neededFields);
  }, [needed]);

  return schema;
};

export type FormNames = keyof FormInputs;
