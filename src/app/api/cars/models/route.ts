import { getCarModels } from "@/services/carapi";
import { getServerContext } from "@/utils/serverCtx";
import { NextRequest } from "next/server";

export async function GET(Request: NextRequest) {
  const ctx = getServerContext();

  const carMake = Request.nextUrl.searchParams.get("make");
  const carModelsResponse = await getCarModels(
    ctx.carcarApiKey,
    carMake ?? "ford"
  );

  const carModels = carModelsResponse.data;

  return new Response(JSON.stringify(carModels));
}
