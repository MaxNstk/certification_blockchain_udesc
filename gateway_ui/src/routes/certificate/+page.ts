import { getCertificates } from "$lib/certificateService";
import type { SimplifiedCertificate } from "$lib/types";

/** @type {import('./$types').PageLoad} */
export async function load({ params }){
  return { certificates: await getCertificates() as SimplifiedCertificate[] };
}
