import { HttpClient } from "./httpClient";
import type { Certificate, SimplifiedCertificate, User } from "./types";

export async function getCertificates(reqUser: User): Promise<SimplifiedCertificate[]> {
  const response = await (new HttpClient(reqUser.jwt)).get('certificates/');
  if (!response.ok) {
    throw new Error('Failed to fetch certificates: '+response);
  }
  const responseJson = await response.json();
  return responseJson as SimplifiedCertificate[];
}

export async function createCertificate(certificate: Certificate, reqUser: User): Promise<Certificate> {

  const response = await (new HttpClient(reqUser.jwt)).post('certificates/',JSON.stringify(certificate));
  if (!response.ok) {
    throw new Error('Failed to update certificate');
  }
  return await response.json() as Certificate;
}

export async function updateCertificate(certificate: Certificate, reqUser: User): Promise<Certificate> {

  const response = await (new HttpClient(reqUser.jwt)).put(`certificates/${certificate.certificateNumber}/`,JSON.stringify(certificate));
  if (!response.ok) {
    throw new Error('Failed to update certificate');
  }
  return await response.json() as Certificate;
}

export async function getCertificate(certificateNumber: string, reqUser: User): Promise<Certificate> {

  const response = await (new HttpClient(reqUser.jwt)).get(`certificates/${certificateNumber}/`);
  if (!response.ok) {
    throw new Error('Failed to update certificate');
  }
  return await response.json() as Certificate;
}


