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

export async function createCertificate(certificate: SimplifiedCertificate): Promise<SimplifiedCertificate> {
  return certificate;
}