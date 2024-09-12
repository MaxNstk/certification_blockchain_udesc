import { redirect } from "@sveltejs/kit";
import type { Handle } from "@sveltejs/kit";
import type { User } from "$lib/types";

// Define the routes that should be accessible without authentication
const public_paths: string[] = ['/signin', '/'];

function isPathAllowed(path: string): boolean {
  return public_paths.some(allowedPath =>
    path === allowedPath || path.startsWith(allowedPath + '/')
  );
}

export const handle: Handle = async ({ event, resolve }) => {
  let user: User | null = null;

  const userCookie = event.cookies.get('user');
  if (userCookie) {
    user = JSON.parse(userCookie) as User;
  }

  const url = new URL(event.request.url);

  if (!user && !isPathAllowed(url.pathname)) {
    throw redirect(302, '/signin');
  }

  if (user) {
    event.locals.user = user;
    if (url.pathname === '/signup' || url.pathname === '/signin') {
      throw redirect(302, '/');
    }
  }

  return await resolve(event);
};
