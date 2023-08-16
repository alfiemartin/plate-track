import { getCarApiToken, getCarMakes } from "@/services/carapi";
import { NextRequest } from "next/server";

export async function GET(Request: NextRequest) {
  const carMakes = await getCarMakes(await getCarApiToken());
  return new Response(JSON.stringify(carMakes));
}