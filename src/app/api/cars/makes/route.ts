import { getCarApiToken, getCarMakes } from "@/app/services/carapi";
import { NextRequest } from "next/server";

let token: string | undefined;

export async function GET(Request: NextRequest) {
  const carMakes = await getCarMakes(token ?? await getCarApiToken());

  return new Response(JSON.stringify(carMakes));
}