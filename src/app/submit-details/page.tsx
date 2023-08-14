import React from "react";
import { getCarApiToken } from "../services/carapi";
import Form from "./Form";

export default async function SubmitDetails() {
  // const token = await getCarApiToken();

  return (
    <section>
      <Form />
    </section>
  );
}
