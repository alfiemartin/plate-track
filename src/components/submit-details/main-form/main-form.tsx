"use client";
import React, { useEffect } from "react";
import { CarMakesResponse } from "../../../services/carapi";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, ButtonGroup } from "@nextui-org/react";
import { GoogleAuthProvider } from "firebase/auth";
import RequiredFields from "./required-fields";
import PlateFormProvider, {
  usePlateFormContext,
} from "@/providers/form/form-provider";
import { usePlateSchema } from "./form-types";
interface FormProps {
  carMakes: CarMakesResponse["data"];
}

const provider = new GoogleAuthProvider();

const MainForm = ({ carMakes }: FormProps) => {
  const [state] = usePlateFormContext();

  const MainFormSchema = usePlateSchema(['dateOfAccident']);

  const methods = useForm({
    defaultValues: {
      dateOfAccident: undefined,
    },
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(MainFormSchema),
  });

  const { watch } = methods;

  const dateWatch = watch("dateOfAccident");

  useEffect(() => {
    console.log(dateWatch, methods.getValues());
  }, [dateWatch]);


  return (
    <FormProvider {...methods}>
      <form className="w-full sm:w-96 mx-auto flex flex-col gap-4">
        <RequiredFields />
        <Button
          variant="solid"
          disabled={false}
        >
          Continue
        </Button>
        {state.journey?.dateHasBeenChosen && (
          <ButtonGroup>
            <Button className="flex-1" variant="solid">
              Street Name
            </Button>
            <Button className="flex-1" variant="solid">
              Post Code
            </Button>
          </ButtonGroup>
        )}
        {/* <LocationFields /> */}
        {/* <CarNumberPlateField />
        <CarMakesField />
        <CarModelsField />
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
          label="Click here to upload a file"
          isCheckboxGuarded
          type="file"
          accept="video/*"
          checkboxLabel="Upload video footage?"
        /> */}
      </form>
    </FormProvider>
  );
};

export default (props: FormProps) => (
  <PlateFormProvider>
    <MainForm {...props} />
  </PlateFormProvider>
);
