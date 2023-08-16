import { NextRequest, NextResponse } from 'next/server'
import { getCarApiToken } from './services/carapi'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('carApiToken')?.value ?? await getCarApiToken();

  const response = NextResponse.next();
  response.cookies.set({
    name: 'carApiToken',
    value: token,
    path: '/',
    httpOnly: true,
  });
  
  response.headers.set('Authorization', token);

  return response;
}
 
export const config = {
  matcher: ['/submit-details/'],
}