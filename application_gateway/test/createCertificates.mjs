import fetch from 'node-fetch';

const baseUrl = 'http://localhost:3000';
const username = 'admin';
const password = 'admin';
const START_IDX = 3600;
const THREADS = 10;
const BATCH_SIZE = 50;

async function authenticate() {
  const response = await fetch(`${baseUrl}/auth/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });

  if (!response.ok) {
    throw new Error('Failed to authenticate');
  }

  const data = await response.json();
  return data.jwt;
}

class HttpClient {
  constructor(token) {
    this.token = token;
  }

  async post(endpoint, body) {
    const response = await fetch(`${baseUrl}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      },
      body
    });

    if (!response.ok) {
      throw new Error(`Failed to create certificate at ${endpoint}`);
    }

    return await response.json();
  }

  async get(endpoint) {
    const response = await fetch(`${baseUrl}/${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to create certificate at ${endpoint}`);
    }

    return await response.json();
  }
}

async function createCertificateBatch(client, start, end) {
  for (let i = start; i <= end; i++) {
    const certificate = {
      certificateNumber: i.toString(),
      certificateEmissionDate: '1974-06-28',
      certificateCourseId: '1',
      certificateStatus: 'revoked',
      ownerName: 'Uma Mcintosh',
      ownerRG: 'Qui libero amet opt',
      ownerBirthDate: '2014-12-10',
      ownerBirthState: 'MT',
      campusName: 'Ulla Reynolds',
      campusAcronym: 'Dolor nisi consequat',
      campusDirector: 'Cupidatat est magnam',
      universityPresidentName: 'Mark Ashley',
      universityCertificateCoordinator: 'Molestiae est volupt',
      hasCompletedAllSubjects: true,
      hasSentAllRequiredDocuments: true,
      wentToDegreeGranting: true,
      note: 'Ad repudiandae unde '
    };
    try {
      const createdCertificate = await client.post('certificates/', JSON.stringify(certificate));
      console.log(`Certificate ${i} created successfully`, createdCertificate);
    } catch (error) {
      console.error(`Error creating certificate ${i}:`, error.message);
    }
  }
}

async function createCertificatesInParallel() {
  const jwt = await authenticate();
  const client = new HttpClient(jwt);
  const promises = [];

  for (let t = 0; t < THREADS; t++) {
    const start = START_IDX + t * BATCH_SIZE;
    const end = start + BATCH_SIZE - 1;
    promises.push(createCertificateBatch(client, start, end));
  }

  console.time('Criação dos dipolomas'); 
  await Promise.all(promises);
  console.timeEnd('Criação dos dipolomas');

  console.time('Recuperando diplomas criados'); 
  await client.get('certificates/');
  console.timeEnd('Recuperando diplomas criados');

}

// Run the script
createCertificatesInParallel();
