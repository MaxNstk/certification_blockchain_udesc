import { createCertificate } from "$lib/certificateService";
import { certificateFromFormData } from "$lib/certificateUtils";
import { getUserCampusCourses } from "$lib/courseService";
import type { Course, User } from "$lib/types";
import type { PageData } from "../$types";


export const load: PageData = async ({locals}) => {
    return {
        availableCourses: await getUserCampusCourses(locals.user as User) as Course[],
    };
}

export const actions = {
    POST: async ({ locals, request }) => {

        const data: FormData = await request.formData();

        const certificate = certificateFromFormData(data);

        if (!certificate) {
            return { error: 'All required fields must be provided.' };
        }

        try{
            return await createCertificate(certificate, locals.user as User);
        }catch(e){
            return { error: 'Erro ao criar diploma: '+e};
        }
    }
}