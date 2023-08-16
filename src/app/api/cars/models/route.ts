import { getCarModels } from "@/services/carapi";
import { NextRequest } from "next/server";

export async function GET(Request: NextRequest) {
  const carMake = Request.nextUrl.searchParams.get("make");
  const carModelsResponse = await getCarModels(
    globalThis.carApiKey,
    carMake ?? "ford"
  );

  const carModels = carModelsResponse.data;

  return new Response(JSON.stringify(carModels));
}
