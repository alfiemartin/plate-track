import { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
}
 
export const config = {
  matcher: ['/submit-details/'],
}