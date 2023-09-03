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
import { Link } from "@nextui-org/react";
import StepTwo from "./steps/step-two";

import "swiper/css";
import "swiper/css/effect-fade";
import StepThree from "./steps/step-three";
import StepOne from "./steps/step-one";
import Review from "./steps/review";

interface FormProps {
  carMakes: CarMakesResponse["data"];
}

const MainForm = ({ carMakes }: FormProps) => {
  const [state, dispatch] = usePlateFormContext();
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  const schema = usePlateSchema(dispatch, state.journey?.inUseFields ?? []);

  const methods = useForm({
    mode: "onChange",
    defaultValues: {},
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    dispatch({
      type: PlateFormTypes.setInUseFields,
      payload: ["dateOfAccident", "startDateOfAccident", "endDateOfAccident"],
    });

    dispatch({
      type: PlateFormTypes.setCarMakes,
      payload: carMakes.map((carMake) => carMake.name),
    });
  }, []);

  useEffect(() => {
    console.log(methods.getValues());
  }, [methods.watch()]);

  return (
    <FormProvider {...methods}>
      <form className="w-full sm:w-[600px] mx-auto">
        <Link
          className="hover:cursor-pointer"
          onClick={() => swiper?.slidePrev()}
        >
          Back
        </Link>
        <Swiper
          onSwiper={setSwiper}
          modules={[EffectFade]}
          effect="fade"
          noSwipingSelector="*"
          allowTouchMove={false}
          className={swiper ? "!overflow-visible" : ""}
          fadeEffect={{ crossFade: true }}
        >
          <SwiperSlide>
            <StepOne swiper={swiper} />
          </SwiperSlide>
          <SwiperSlide>
            <StepTwo swiper={swiper} />
          </SwiperSlide>
          <SwiperSlide>
            <StepThree swiper={swiper} />
          </SwiperSlide>
          <SwiperSlide>
            <Review swiper={swiper} />
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
