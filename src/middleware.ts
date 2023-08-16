import { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // console.log('Im mid');
}
 
export const config = {
  matcher: ['/submit-details/', '/:page*'],
}