import { redirect } from '@sveltejs/kit'

export const actions = {
  default: async ({ cookies} ) => {
    //set the cookies to null and redirect
    cookies.set('user', null)
    throw redirect(302, '/')
  }
}