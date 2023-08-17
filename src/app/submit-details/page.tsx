import React from "react";
import { getCarMakes } from "@/services/carapi";
import { Form } from "./form";

export default async function SubmitDetails() {
  const carMakes = await getCarMakes(globalThis.carApiKey);

  return (
    <section>
      <Form carMakes={carMakes.data} />
    </section>
  );
}
