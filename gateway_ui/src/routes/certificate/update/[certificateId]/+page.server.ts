import { updateCertificate } from "$lib/certificateService";
import { certificateFromFormData } from "$lib/certificateUtils";
import type { Course, User } from "$lib/types";
import { getCertificate } from "$lib/certificateService";
import type { Certificate } from "$lib/types";
import type { PageLoad } from "./$types";
import { getUserCampusCourses } from "$lib/courseService";

export const load: PageLoad = async ({params, locals}) => {
  const certificate: Certificate = await getCertificate(params.certificateId, locals.user as User) as Certificate; 
  const availableCourses:Course[] = await getUserCampusCourses(locals.user as User);
  return {
    certificate,
    availableCourses
  };
};

export const actions = {
    POST: async ({ locals, request }) => {

        const data = await request.formData();

        const certificate = certificateFromFormData(data);

        if (!certificate) {
            return { error: 'All required fields must be provided.' };
        }

        try{
            return await updateCertificate(certificate, locals.user as User);
        }catch(e){
            return { error: 'Erro ao criar diploma: '+e};
        }
    }
}