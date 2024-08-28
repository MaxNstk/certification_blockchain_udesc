import { redirect } from '@sveltejs/kit'
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ }) => {
  //cookies.delete('user',{ path: '/' });
  //throw redirect(302, '/signin');
};