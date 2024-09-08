import { HttpClient } from "./httpClient";
import type { Course, User } from "./types";


export async function getUserCampusCourses(reqUser: User): Promise<Course[]> {
  // let response:Response;
  // if (reqUser.isAdmin){
  //   response = await (new HttpClient(reqUser.jwt)).get(`courses/`);
  // }else{
  // }
  const response: Response = await (new HttpClient(reqUser.jwt)).get(`courses/campus/${reqUser.campus.acronym}`);
  if (!response.ok) {
    throw new Error('Failed to fetch certificates: '+response);
  }
  return await response.json() as Course[];
}