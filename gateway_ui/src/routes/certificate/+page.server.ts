import { getCertificates } from "$lib/certificateService";
import type { SimplifiedCertificate, User } from "$lib/types";
import type { PageLoad } from "../logout/$types";


export const load: PageLoad = async ({locals}) => {
  return {
    certificates: await getCertificates(locals.user as User) as SimplifiedCertificate[],
  };
};