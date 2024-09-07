import { getCertificates } from "$lib/certificateService";
import type { SimplifiedCertificate, User } from "$lib/types";


export const load = async ({locals}) => {
  return {
    certificates: await getCertificates(locals.user as User) as SimplifiedCertificate[],
  };
};