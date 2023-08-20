"use client";
import React, { useEffect, useState } from "react";
import { CarMakesResponse, CarModelsResponse } from "../../services/carapi";
import { Controller, FormProvider, useForm } from "react-hook-form";
import ControlledInput from "@/components/forms/input/controlled-input";
import ControlledSelect, {
  Option,
  yupSelectOption,
} from "@/components/forms/select/controlled-select";
import { string, object, date, boolean } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ControlledDatepicker from "@/components/forms/date-picker/date-picker";
import ControlledTextArea from "@/components/forms/text-area/controlled-textarea";
import { Button, Checkbox, Divider } from "@nextui-org/react";
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { initFirebase } from "@/lib/firebase";
import FileInput from "@/components/forms/file-uploader/file-uploder";
import { useUserContext } from "@/providers/user/user-provider";
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

initFirebase();
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

  const [carModels, setCarModels] = useState<CarModel[]>();

  const carMake = watch("carMake");
  const signedinWatch = watch("signedIn");

  useEffect(() => {
    (async () => {
      if (carMake?.value) {
        setCarModels(undefined);
        resetField("carModel");
        const models: CarModelsResponse["data"] = await (
          await fetch(`/api/cars/models?make=${carMake.value}`)
        ).json();
        setCarModels(models.map((x) => ({ label: x.name, value: x.name })));
      }
    })();
  }, [carMake]);

  const { user, setUser } = useUserContext();

  useEffect(() => {
    if (!user && signedinWatch) {
      const auth = getAuth();
      signInWithPopup(auth, provider)
        .then((x) => {
          if(setUser) {
            setUser(x.user);
          }
        })
        .catch((error) => {
          setValue('signedIn', false);
          alert("something went wrong");
        });
    }
  }, [signedinWatch]);

  const [file, setFile] = useState<File>();

  return (
    <FormProvider {...methods}>
      <form className="w-full sm:w-96 mx-auto flex flex-col gap-4">
        <Divider />
        <p>Required fields</p>
        <ControlledDatepicker
          name="dateOfAccident"
          id="dateOfAccident"
          label="Date of accident"
          labelPlacement="inside"
        />
        <div className="flex gap-2">
          <ControlledDatepicker
            name="startDateOfAccident"
            id="timeStartOfAccident"
            isYearPicker
            label="Start time"
            labelPlacement="inside"
          />
          <ControlledDatepicker
            name="endDateOfAccident"
            id="endDateOfAccident"
            isYearPicker
            label="End time"
            labelPlacement="inside"
          />
        </div>
        <Divider />
        <p>Fill atleast one of these fields</p>
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
        <Divider />
        <p>Fill these fields if you can</p>
        <ControlledInput
          name="carPlateNumber"
          id="carPlateNumber"
          label="Car number plate"
          labelPlacement="inside"
        />
        <ControlledSelect
          control={control}
          name="carMake"
          id="carMake"
          placeholder="Make"
          options={carMakes?.map((x) => ({ label: x.name, value: x.name }))}
        />
        <ControlledSelect
          control={control}
          name="carModel"
          id="carModel"
          placeholder="Model"
          isLoading={!!!carModels && !!formState.dirtyFields.carMake}
          options={carModels}
        />
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
            input: 'text-medium opacity-0',
            label: '!translate-y-0'
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

export default MainForm;
