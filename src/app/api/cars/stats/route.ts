import { carFetch } from "@/services/carapi";
import { NextRequest } from "next/server";

export async function GET(Request: NextRequest) {
  const response = await carFetch('api/account/requests', globalThis.carApiKey);
  const data = await response.json();

  return new Response(data);
}
