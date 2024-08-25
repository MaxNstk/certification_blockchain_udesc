import { getCertificates } from "$lib/certificateService";

/** @type {import('./$types').PageLoad} */
export async function load({ params }){
  return { certificates: await getCertificates() as SimplifiedCertificate[] };
}
