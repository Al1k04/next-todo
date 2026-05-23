import { auth } from "./auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;

  if (!isLoggedIn && nextUrl.pathname.startsWith("/tasks")) {
    return Response.redirect(new URL("/api/auth/signin", nextUrl));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
