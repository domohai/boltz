import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import { ROLES } from '@utils/roles';

export async function middleware(req) {
  const token = await getToken({ req });
  if (!token) {
    return NextResponse.redirect(new URL('/', req.url))
  }
  const role = token.role;
  const { pathname } = req.nextUrl;

  // Điều hướng dựa trên role
  if (pathname.startsWith('/leader')) {
    if (role == ROLES.LEADER) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  } else if (pathname.startsWith('/collection_manager')) {
    if (role == ROLES.COLLECTION_MANAGER) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  } else if (pathname.startsWith('/service_manager')) {
    if (role == ROLES.SERVICE_MANAGER) {
      return NextResponse.next(); 
    } else {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  } else if (pathname.startsWith('/collection_staff')) {
    if (role === ROLES.COLLECTION_STAFF) {
      return NextResponse.next(); 
    } else {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  } else if (pathname.startsWith('/service_staff')) {
    if (role === ROLES.SERVICE_STAFF) {
      return NextResponse.next(); 
    } else {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  }
  return NextResponse.next(new URL('/', req.url));
}


export const config = {
  matcher: ['/leader/:path*', '/collection_manager/:path*', '/service_manager/:path*', '/collection_staff/:path*', '/service_staff/:path*'],
};
