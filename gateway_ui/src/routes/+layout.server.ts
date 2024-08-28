import type { User } from "$lib/types";
import type { PageLoad } from "./certificate/$types";


export const load: PageLoad = async ({ locals }) => {
  return {
    user: locals.user as User,
  };
};
