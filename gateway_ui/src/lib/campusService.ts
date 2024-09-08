import { HttpClient } from "./httpClient";
import type { Campus, User } from "./types";

export async function getCampus(reqUser: User): Promise<Campus[]> {
  const response: Response = await (new HttpClient(reqUser.jwt)).get(`campus/`);
  if (!response.ok) {
    throw new Error('Failed to fetch certificates: '+response);
  }
  return await response.json() as Campus[];
}