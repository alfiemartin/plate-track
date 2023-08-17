import React from "react";
import { getCarMakes } from "@/services/carapi";
import MainForm from "./main-form";


export default async function SubmitDetails() {
  const carMakes = await getCarMakes(globalThis.carApiKey);

  return (
    <section>
      <MainForm carMakes={carMakes.data} />
    </section>
  );
}
