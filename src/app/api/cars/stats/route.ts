import { carFetch } from "@/services/carapi";
import { NextRequest } from "next/server";

export async function GET(Request: NextRequest) {
  const data = await carFetch('api/account/requests', globalThis?.carApiKey, 'no-store');
  return new Response(data);
}

export const revalidate = 0;