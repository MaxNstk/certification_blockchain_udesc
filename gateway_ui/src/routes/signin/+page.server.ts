// signup/+page.server.js
import { user } from '$lib/stores/user.js'
import { redirect } from '@sveltejs/kit'

export const actions = {
    POST: async ({ cookies, request, fetch}) => {

    const data = await request.formData();
    const username = data.get('username');
    const password = data.get('password');

    const response = await fetch('http://localhost:3000/auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          username,
          password,
      })
    })

    if (response.ok) {
      const data  = await response.json();
      
      cookies.set('user', JSON.stringify(data), { path: '/' });
      user.set(data);

      throw redirect(302, '/')
    } else {
      const { errors } = await response.json()
      return {
        status: 400,
        body: {
          success: false,
          errors
        }
      }
    }
  }
}