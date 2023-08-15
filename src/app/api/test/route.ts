import { getCarApiToken } from "@/app/services/carapi";
import { NextRequest } from "next/server";

let token: string | undefined;

export async function GET(Request: NextRequest) {
  return new Response('heyyy 😆');
}