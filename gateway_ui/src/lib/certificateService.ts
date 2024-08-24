// src/lib/certificateService.ts
export async function getCertificates(): Promise<Certificate[]> {

    const response = await fetch('http://localhost:3000/certificates/',{
        method: 'GET',
        headers: {
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE3MjQ1MTk5NzUsImV4cCI6MTcyNDU0MTU3NX0.dO3ysIze_29HHedY0c1W0LE4n4I2rRrlyzAe9IvPHYY`,
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch certificates');
    }
    const data = await response.json();
    return data as Certificate[];
  }