import { getCertificate } from "$lib/certificateService";
import type { Certificate } from "$lib/types";

/** @type {import('./$types').PageLoad} */
export async function load({ params }){
  return { certificate: await getCertificate(params.certificateId) as Certificate };
}
