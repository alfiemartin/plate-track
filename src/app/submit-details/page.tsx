import React from "react";
import Form from "./Form";
import { getCarMakes } from "@/services/carapi";
import { headers } from "next/headers";
import { getServerContext } from "@/context";

export default async function SubmitDetails(...props: unknown[]) {
  const carApiToken = headers().get('Authorization');

  const ctx = getServerContext();
  console.log(ctx.user);

  if(!carApiToken) return <>error</>

  const carMakes = await getCarMakes(carApiToken);

  return (
    <section>
      <Form carMakes={carMakes.data} />
    </section>
  );
}
