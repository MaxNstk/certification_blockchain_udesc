import type { Certificate, SimplifiedCertificate } from "./types";

export async function getCertificates(): Promise<SimplifiedCertificate[]> {
  
  const response = await fetch('http://localhost:3000/certificates/',{
    method: 'GET',
    headers: {
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE3MjQ1ODk3NTIsImV4cCI6MTcyNDY3NjE1Mn0.IhhHQiO-qZCOw9vIKx-c_n1APtQkA70Lm3GV9Kn2Oxw`,
      'Content-Type': 'application/json'
    }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch certificates');
  }
  return await response.json() as SimplifiedCertificate[];
}

export async function createCertificate(certificate: Certificate): Promise<Certificate> {

  const response = await fetch('http://localhost:3000/certificates/',{
    method: 'POST',
    headers: {
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE3MjQ1ODk3NTIsImV4cCI6MTcyNDY3NjE1Mn0.IhhHQiO-qZCOw9vIKx-c_n1APtQkA70Lm3GV9Kn2Oxw`,
      'Content-Type': 'application/json'
    },
    body : JSON.stringify(certificate),
  });
  if (!response.ok) {
    throw new Error('Failed to update certificate');
  }
  return await response.json() as Certificate;
}

export async function updateCertificate(certificate: Certificate): Promise<Certificate> {

  const response = await fetch(`http://localhost:3000/certificates/${certificate.certificateNumber}`,{
    method: 'PUT',
    headers: {
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE3MjQ1ODk3NTIsImV4cCI6MTcyNDY3NjE1Mn0.IhhHQiO-qZCOw9vIKx-c_n1APtQkA70Lm3GV9Kn2Oxw`,
      'Content-Type': 'application/json'
    },
    body : JSON.stringify(certificate),
  });
  if (!response.ok) {
    throw new Error('Failed to update certificate');
  }
  return await response.json() as Certificate;
}

export async function getCertificate(certificateNumber: string): Promise<Certificate> {

  const response = await fetch(`http://localhost:3000/certificates/${certificateNumber}`,{
    method: 'GET',
    headers: {
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE3MjQ1ODk3NTIsImV4cCI6MTcyNDY3NjE1Mn0.IhhHQiO-qZCOw9vIKx-c_n1APtQkA70Lm3GV9Kn2Oxw`,
      'Content-Type': 'application/json'
    },
  });
  if (!response.ok) {
    throw new Error('Failed to update certificate');
  }
  return await response.json() as Certificate;
}


