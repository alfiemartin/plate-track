import React from "react";
import { getCarApiToken, getCarMakes } from "../services/carapi";
import Form from "./Form";

export default async function SubmitDetails() {
  const token = await getCarApiToken();
  const carMakes = (await getCarMakes(token)).data;

  return (
    <section>
      <Form carMakes={carMakes} />
    </section>
  );
}
