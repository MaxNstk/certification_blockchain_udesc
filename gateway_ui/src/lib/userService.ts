import { HttpClient } from "./httpClient";
import type { User, UserDTO } from "./types";


export async function createUser(formUser: UserDTO, reqUser: User): Promise<User> {

  const response = await (new HttpClient(reqUser.jwt)).post('users/', JSON.stringify(formUser));
  if (!response.ok) {
    throw new Error('Error creating user');
  }
  return await response.json() as User;
}