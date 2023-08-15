import { getCarApiToken, getCarModels } from "@/app/services/carapi";
import { carToken } from "@/middleware";
import { NextRequest } from "next/server";

export async function GET(Request: NextRequest) {
  const carMake = Request.nextUrl.searchParams.get("make");
  const carModelsResponse = await getCarModels(
    carToken ?? (await getCarApiToken()),
    carMake ?? "ford"
  );

  const carModels = carModelsResponse.data

  return new Response(JSON.stringify(carModels));
}
