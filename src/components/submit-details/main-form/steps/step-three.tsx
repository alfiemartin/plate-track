import React, { useState } from "react";
import { CommonStepProps, hasRequiredFields } from "./step-one";
import StepTitle from "./step-title";
import FileInput from "@/components/forms/file-uploader/file-uploder";
import ControlledTextArea from "@/components/forms/text-area/controlled-textarea";
import { useUserContext } from "@/providers/user/user-provider";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import ContinueButton from "../continue-button";
import { useFormContext } from "react-hook-form";
import { FormInputs } from "../form-types";

const AuthProvider = new GoogleAuthProvider();

const StepThree = ({ swiper }: CommonStepProps) => {
  const [file, setFile] = useState<File>();
  const { user, setUser } = useUserContext();
  const { formState } = useFormContext<FormInputs>();

  const handleSubmit = () => {
    if (
      (!hasRequiredFields(formState.errors, ["message"], false) &&
        hasRequiredFields(formState.dirtyFields, ["message"], false)) ||
      file
    ) {
      swiper?.slideNext();
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <StepTitle title="Step 3" subtitle="Get in touch" />
      <ControlledTextArea name="message" label="Message for victim" />
      <FileInput
        onFileChange={setFile}
        file={file}
        label="Upload video footage"
        type="file"
        accept="video/*"
      />
      <ContinueButton
        onClick={() => {
          if (!user) {
            const auth = getAuth();
            signInWithPopup(auth, AuthProvider)
              .then((user) => {
                if (setUser) {
                  setUser(user.user);
                }
                handleSubmit();
              })
              .catch(() => alert("Error signing in, please try again"));
          }
          handleSubmit();
        }}
      />
    </div>
  );
};

export default StepThree;
