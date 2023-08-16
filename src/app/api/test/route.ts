import { NextRequest } from "next/server";

export async function GET(Request: NextRequest) {
  return new Response('heyyy 😆');
}