"use client";
import React, { useEffect, useState } from "react";
import { CarMakesResponse } from "../../../services/carapi";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PlateFormProvider, {
  usePlateFormContext,
} from "@/providers/form/form-provider";
import { usePlateSchema } from "./form-types";
import { SwiperSlide, Swiper } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";
import { EffectFade } from "swiper/modules";
import { PlateFormTypes } from "@/providers/form/form-reducer";
import StepOne from "./step-one";
import StepTwo from "./step-two";

import "swiper/css";
import "swiper/css/effect-fade";

interface FormProps {
  carMakes: CarMakesResponse["data"];
}

const MainForm = ({ carMakes }: FormProps) => {
  const [state, dispatch] = usePlateFormContext();
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  const schema = usePlateSchema(dispatch, state.journey?.inUseFields ?? []);

  const methods = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    dispatch({
      type: PlateFormTypes.setInUseFields,
      payload: ["dateOfAccident", "startDateOfAccident", "endDateOfAccident"],
    });
  }, []);

  useEffect(() => {
    console.log(methods.getValues());
    console.log(methods.formState.errors);
  }, [methods.watch()]);

  return (
    <FormProvider {...methods}>
      <form className="w-full sm:w-[600px] mx-auto">
        <Swiper
          onSwiper={setSwiper}
          modules={[EffectFade]}
          effect="fade"
          allowTouchMove={false}
          className="!overflow-visible"
          fadeEffect={{ crossFade: true }}
        >
          <SwiperSlide>
            <StepOne swiper={swiper} />
          </SwiperSlide>
          <SwiperSlide>
            <StepTwo swiper={swiper} />
          </SwiperSlide>
        </Swiper>
      </form>
    </FormProvider>
  );
};

export default (props: FormProps) => (
  <PlateFormProvider>
    <MainForm {...props} />
  </PlateFormProvider>
);
