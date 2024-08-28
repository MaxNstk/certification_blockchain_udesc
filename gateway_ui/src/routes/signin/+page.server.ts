
import { user } from '../../stores/user.js'
import { redirect } from '@sveltejs/kit'

function signInError(errors:object) {
  return {
    status: 400,
    body: {
      success: false,
      errors
    }
  }  
}

export const actions = {
    POST: async ({ cookies, request, fetch}) => {

    const formData = await request.formData();
    const username = formData.get('username');
    const password = formData.get('password');

    if (!username || username?.toString().trim() === ''){
      return signInError({username:"required field"});
    }
    if (!password || password?.toString().trim() === ''){
      return signInError({password:"required field"});
    }

    const response = await fetch('http://localhost:3000/auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          username,
          password,
      })
    });

    if (!response.ok) {
      return signInError(await response.json())
    }
    const data  = await response.json();
    const userData = {jwt:data.jwt, ...data.user}
    cookies.set('user', JSON.stringify(userData), { path: '/' });
    user.set(userData);

    throw redirect(302, '/')
  }
}