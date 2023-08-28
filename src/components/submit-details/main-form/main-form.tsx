"use client";
import React, { useEffect, useState } from "react";
import { CarMakesResponse, CarModelsResponse } from "../../../services/carapi";
import { Controller, FormProvider, useForm } from "react-hook-form";
import ControlledInput from "@/components/forms/input/controlled-input";
import ControlledSelect, {
  Option,
  yupSelectOption,
} from "@/components/forms/select/controlled-select";
import { string, object, date, boolean } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ControlledTextArea from "@/components/forms/text-area/controlled-textarea";
import { Checkbox, Divider } from "@nextui-org/react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import FileInput from "@/components/forms/file-uploader/file-uploder";
import { useUserContext } from "@/providers/user/user-provider";
import RequiredFields from "./required-fields";
import LocationFields from "./location-fields";
import CarNumberPlateField from "./individual-fields/car-number-plate-field";
import PlateFormProvider, {
  usePlateFormContext,
} from "@/providers/form/form-provider";
import { PlateFormTypes } from "@/providers/form/form-reducer";
import { convertToSelectOptions } from "@/utils/forms";
import CarModelsField from "./individual-fields/car-models-field";
interface FormProps {
  carMakes: CarMakesResponse["data"];
}

export type FormNames = keyof FormInputs;

interface CarModel {
  label: string;
  value: string;
}

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

const schema = object().shape({
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

const provider = new GoogleAuthProvider();

const MainForm = ({ carMakes }: FormProps) => {
  const methods = useForm<FormInputs>({
    defaultValues: {
      carPlateNumber: "",
      message: "",
      contactEmail: "",
      contactPhoneNumber: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
  });

  const { control, watch, resetField, formState, setValue } = methods;

  const carMake = watch("carMake");
  const signedinWatch = watch("signedIn");

  const [state, dispatch] = usePlateFormContext();

  const models =
    state.carModels?.carModels &&
    convertToSelectOptions(state.carModels?.carModels);

  useEffect(() => {
    (async () => {
      if (carMake?.value) {
        dispatch({
          type: PlateFormTypes.ClearCarModels,
        });
        resetField("carModel");
        const models: CarModelsResponse["data"] = await (
          await fetch(`/api/cars/models?make=${carMake.value}`)
        ).json();
        dispatch({
          type: PlateFormTypes.SetCarModels,
          payload: {
            for: carMake.value,
            carModels: models.map(({ name }) => name),
          },
        });
      }
    })();
  }, [carMake]);

  const { user, setUser } = useUserContext();

  useEffect(() => {
    if (!user && signedinWatch) {
      const auth = getAuth();
      signInWithPopup(auth, provider)
        .then((x) => {
          if (setUser) {
            setUser(x.user);
          }
        })
        .catch((error) => {
          setValue("signedIn", false);
          alert("something went wrong");
        });
    }
  }, [signedinWatch]);

  const [file, setFile] = useState<File>();

  return (
    <FormProvider {...methods}>
      <form className="w-full sm:w-96 mx-auto flex flex-col gap-4">
        <RequiredFields />
        <LocationFields />
        <CarNumberPlateField />
        <ControlledSelect
          name="carMake"
          id="carMake"
          placeholder="Make"
          options={carMakes?.map((x) => ({ label: x.name, value: x.name }))}
        />
        <CarModelsField />
        <Divider />
        <p>Cantact preferences</p>
        <ControlledInput
          name="contactPhoneNumber"
          label="Phone number"
          isCheckboxGuarded
          checkboxLabel="Allow phone number?"
        />
        <ControlledInput
          name="contactEmail"
          label="Email address"
          isCheckboxGuarded
          checkboxLabel="Allow email address?"
        />
        <Controller
          control={control}
          name="signedIn"
          defaultValue={false}
          render={({ field }) => (
            <Checkbox checked={field.value} onChange={field.onChange}>
              In app messaging? (you must sign in with google)
            </Checkbox>
          )}
        />
        <ControlledTextArea name="message" label="Message for victim" />
        <FileInput
          onFileChange={setFile}
          file={file}
          classNames={{
            input: "text-medium opacity-0",
            label: "!translate-y-0",
          }}
          label="Click here to upload a file"
          isCheckboxGuarded
          type="file"
          accept="video/*"
          checkboxLabel="Upload video footage?"
        />
      </form>
    </FormProvider>
  );
};

export default (props: FormProps) => (
  <PlateFormProvider>
    <MainForm {...props} />
  </PlateFormProvider>
);
