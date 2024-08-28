import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ cookies }) => {
    cookies.set('user',null,{ path: '/' })
    throw redirect(302, '/signin');
  };
  