import React from "react";
import Form from "./Form";
import { getCarApiToken, getCarMakes } from "@/services/carapi";

export default async function SubmitDetails(...props: unknown[]) {
  const carApiToken = await getCarApiToken();
  const carMakes = await getCarMakes(carApiToken);

  return (
    <section>
      <Form carMakes={carMakes.data} />
    </section>
  );
}
