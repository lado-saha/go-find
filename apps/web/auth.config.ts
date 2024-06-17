import type { NextAuthConfig } from 'next-auth';

/**
 * This is where we wil add options and routes for our auth pages
 * The callback is called before any navigation to a new Url
 */
export const authConfig = {
  pages: {
    signIn: '/login',
  },

  // This is the middleware to protect our routes from unauthorized access
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig; // We make sure we satisfy the NextAuthConfig type spec
