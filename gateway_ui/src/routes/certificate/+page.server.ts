import { getCertificates } from "$lib/certificateService";

export async function load({ params }) {
  const certificates = await getCertificates();
  console.log(certificates);
  return { certificates };
}
