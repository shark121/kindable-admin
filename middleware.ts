import { NextResponse } from 'next/server';
import { UserInfo } from './lib/types';
import { NextRequest, NextFetchEvent } from 'next/server';

export function middleware(request: NextRequest, event: NextFetchEvent) {
  const { url } = request;
  const host = request.headers.get('host');
  const protocol = request.headers.get('x-forwarded-proto') || 'http';
  const domain = `${protocol}://${host}`;

  const userCookie = JSON.parse(
    request.cookies.get('user')?.value || '{}'
  ) as UserInfo;
  const pathName = request.nextUrl.pathname;

  if (
    pathName.startsWith('/search') &&
    request.nextUrl.searchParams.get('x_dk') === null
  ) {
    console.log(pathName, userCookie.uid);

    return NextResponse.redirect(
      `${domain}/search?q=${request.nextUrl.searchParams.get('q')}&x_dk=${userCookie.uid}`
    );
  } else if (
    pathName.startsWith('/home') &&
    request.nextUrl.searchParams.get('x_dk') === null
  ) {
    return NextResponse.redirect(`${domain}/home?x_dk=${userCookie.uid}`);
  } 
  else if (
    pathName === "/" &&
    request.nextUrl.searchParams.get('x_dk') === null
  ) {
    return NextResponse.redirect(`${domain}/?x_dk=${userCookie.uid}`);
  }
  else if (
    (pathName.startsWith('/fundraisers/view') || pathName.startsWith('/fundraisers/edit'))  &&
    request.nextUrl.searchParams.get('x_dk') === null
  ) {
    return NextResponse.redirect  (
      `${domain}${pathName}?x_dk=${userCookie.uid}`  
    );

  }

}
