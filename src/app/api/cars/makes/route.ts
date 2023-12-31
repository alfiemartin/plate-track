import { getCarMakes } from "@/services/carapi";
import { NextRequest } from "next/server";

export async function GET(Request: NextRequest) {
  const carMakes = await getCarMakes(globalThis.carApiKey);
  return new Response(JSON.stringify(carMakes));
}