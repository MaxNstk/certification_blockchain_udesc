import type { PageData } from "./certificate/$types";

export const load: PageData = async ({ locals }) => {
    return {
      user: locals.user,
    };
  };
  