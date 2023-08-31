import {
  Option,
  yupSelectOption,
} from "@/components/forms/select/controlled-select";
import { usePlateFormContext } from "@/providers/form/form-provider";
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
    return object(MainFormSchema);
  }

  const filteredSchema = Object.entries(MainFormSchema)
    .filter(([field]) => neededFields?.includes(field as FormNames) ?? true)
    .reduce(
      (prev, [key, value]) => ({ ...prev, [key]: value }),
      {} as Pick<SchemaType, T[number]>
    );

  return object(filteredSchema);
};

export const usePlateSchema = <T extends Array<keyof SchemaType>>(
  neededFields?: T
) => {
  const [, dispatch] = usePlateFormContext();

  useEffect(() => {
    dispatch({
      type: PlateFormTypes.setInUseFields,
      payload: !!neededFields ? neededFields : Object.keys(MainFormSchema) as Array<FormNames>,
    });
  }, neededFields);

  const schema = useMemo(() => getSchema(neededFields), [neededFields]);

  return schema;
};

export type FormNames = keyof FormInputs;
