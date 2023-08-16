import React from "react";
import Form from "./Form";
import { getCarMakes } from "@/services/carapi";

export default async function SubmitDetails() {
  const carMakes = await getCarMakes(global.apiKey);

  return (
    <section>
      <Form carMakes={carMakes.data} />
    </section>
  );
}
