import type { JWT } from "next-auth/jwt";
import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { prepareHostObjectMiddleware } from "./util/middlewareHelp";

export default async function middleware(
  request: NextRequest & { nextauth: { token: JWT | null } },
  event: NextFetchEvent
) {
  // console.log("ffffff s", request.url);
  const url = request.nextUrl.clone();

  if (
    url.pathname.includes("/404") || // exclude all files in the public folder
    url.pathname.startsWith("/api") || // exclude all API routes
    url.pathname.startsWith("/new") || // exclude all API routes
    url.pathname.startsWith("/login") // page-ийг бас орхих хэрэгтэй.
  ) {
    return;
  }

  const hostObjectMiddleware = await prepareHostObjectMiddleware({
    hostname: request.headers.get("host") || "",
    pathname: url.pathname.substring(1),
  });

  if (url.pathname.startsWith("./undefined")) {
    return new Response("/404", { status: 404 });
  }

  url.pathname = `/${hostObjectMiddleware.toDetectPath}`;

  // console.log("hostObject Middleware :>> ", url.pathname);
  if (url.pathname.startsWith("./_next")) {
    return NextResponse.rewrite("/home");
  }
  return NextResponse.rewrite(url);
}
