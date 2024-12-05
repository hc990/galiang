import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

const publicRoutes = ["/", "/signin", "/signup"]
const isProtectedRoute = createRouteMatcher(publicRoutes)
export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth()
  if (!userId && isProtectedRoute(req)) {
    // Add custom logic to run before redirecting
    // return NextResponse.redirect(new URL("/", req.url)); 
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};

