import type {User } from "$lib/types";
import { listUsers } from "$lib/userService";

export const load = async ({locals}) => {
  const users = await listUsers(locals.user as User) as User[];
  return {
    users
  };
};