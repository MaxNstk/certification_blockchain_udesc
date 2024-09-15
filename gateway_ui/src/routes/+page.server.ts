import type { Certificate, User } from '$lib/types';
import { getCertificate } from '../lib/certificateService';


export async function load({ cookies }) {
	let certId = cookies.get('certId');

	if (!certId) {
		return
	}

  cookies.set('certId', '' ,{ path: '/' });

  const response = await fetch('http://localhost:3000/auth/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: 'public',
      password: 'RnywrCGXWpnlPgf',
    }),
  });

  const data = await response.json();
  const user: User = { jwt: data.jwt, ...data.user };

  const certificate: Certificate = await getCertificate(certId, user);

  return { certificate };
}

export const actions = {
  getCert: async ({ cookies, request }) => {
    const formData = await request.formData();
    const certificateNumber = formData.get('certificateNumber') as string;
    cookies.set('certId', certificateNumber, { path: '/' });
  },
};
  