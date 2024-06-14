import { auth } from "./helpers/auth";
// import { NextResponse } from "next/server";

// export function middleware(request) {
//   console.log(request);

//   return NextResponse.redirect(new URL("/about", request.url));
// }

export const middleware = auth;

export const config = {
  matcher: ["/account"],
};
