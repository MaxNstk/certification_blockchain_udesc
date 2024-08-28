import { getCertificates } from "$lib/certificateService";
import type { SimplifiedCertificate } from "$lib/types";
import type { PageLoad } from "./$types.js";

export async function load({}): PageLoad{
  return { certificates: await getCertificates() as SimplifiedCertificate[] };
}
