import NextAuth from "next-auth"
import authConfig from "@/auth.config"
 

const publicPages = ["/", "/terms", "/privacy", "/resume", "/blog/*", "/post/*", "/tags/*", "/search", "/whaaaat", "/projects", "/about"];
const authPages = ["/auth/*", "/register"];
const protectedPages = ["/x/*", "/settings*","/admin/*", '/ai/*',"/apps/*"];

const testPagesRegex = (pages: string[], pathname: string) => {
  const escapeRegex = (str: string) =>
    str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const pagePattern = pages
    .map((page) => {
      if (page.endsWith("/*")) {
        return `${escapeRegex(page.slice(0, -2))}(?:/.*)?`;
      }
      return escapeRegex(page);
    })
    .join("|");

  // The root pattern ensures the path starts with a public page
  const regex = `^(?:${pagePattern})(?:/|\\?|#|$)`;
  if (!pathname.endsWith("/")) {
    pathname += "/";
  }
  return new RegExp(regex, "i").test(pathname);
};

const { auth} = NextAuth(authConfig)

export default auth(async (req) => {
  const path = req.nextUrl.pathname;

  const isPublicPage = testPagesRegex(publicPages, path);
  const isAuthPage = testPagesRegex(authPages, path);
  const isProtectedPage = testPagesRegex(protectedPages, path);
  const isAuthenticated = !!req.auth;
  
  if (isAuthenticated) {
    if (isAuthPage) {
      const newUrl = new URL("/", req.nextUrl.origin);
      return Response.redirect(newUrl);
    }
    return;
  } else {
    if (!isProtectedPage || isPublicPage) {
      return;
    } else {
      let from = path;
      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }
      const newUrl = new URL(
        `/auth?from=${encodeURIComponent(from)}`,
        req.nextUrl.origin
      );
      return Response.redirect(newUrl);
    }
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.icon|search.json).*)"],
};
