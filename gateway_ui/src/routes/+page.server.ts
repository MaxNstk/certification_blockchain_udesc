

export const actions = {
  POST: async ({ locals, request }) => {

      const data: FormData = await request.formData();

      const user: UserDTO = {
          username: data.get('username') as string,
          fullName: data.get('fullName') as string,
          password: data.get('password') as string,
          jwt: data.get('jwt') as string,
          campusAcronym: data.get('campus') as string,
          isAdmin: data.get('isAdmin') as string =='on',
          isCoordinator: data.get('isCoordinator') as string =='on'
      } as UserDTO;
      const createdUser = await createUser(user, locals.user as User);
      if (!createdUser){

      }
  }
}