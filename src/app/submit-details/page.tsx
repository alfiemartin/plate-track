import React from "react";
import Form from "./Form";
import { getCarMakes } from "@/services/carapi";

export default async function SubmitDetails() {
  const carMakes = await getCarMakes(globalThis.carApiKey);
  globalThis.logger?.info('Submit Details Page');

  return (
    <section>
      <Form carMakes={carMakes.data} />
    </section>
  );
}
