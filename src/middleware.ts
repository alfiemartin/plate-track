import type { NextRequest } from 'next/server'
import { getCarApiToken } from './app/services/carapi';

export let carToken: string | undefined;

export async function middleware(request: NextRequest) {
  carToken = await getCarApiToken();
}
 
export const config = {
  matcher: '/api/:path*',
}