import { redirect } from "@sveltejs/kit";

// define the routes of we want to be possible to access without auth
const public_paths = [
  '/signin'
];

function isPathAllowed(path:string):boolean {
  return public_paths.some(allowedPath =>
    path === allowedPath || path.startsWith(allowedPath + '/')
  );
}

export const handle = async ({ event, resolve }) => {
  let user = null
  
  // check if the cookie exist, and if exists, parse it to the user variable
  if(event.cookies.get('user')){
    user = JSON.parse(event.cookies.get('user'))
  }
  const url = new URL(event.request.url);

  // validate the user existence and if the path is acceesible
  if (!user && !isPathAllowed(url.pathname)) {
    throw redirect(302, '/signin');
  }

  if(user){
    //set the user to the locals (i explain this later on the article)
    event.locals.user = user

    // redirect user if he is already logged if he try to access signin or signup
    if(url.pathname == '/signup' || url.pathname == '/signin'){
      throw redirect(302, '/')
    }
  }

  const response = await resolve(event)

  return response
}