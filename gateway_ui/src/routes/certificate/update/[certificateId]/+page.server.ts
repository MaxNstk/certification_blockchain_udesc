import { updateCertificate } from "$lib/certificateService";
import { certificateFromFormData } from "$lib/certificateUtils";
import type { User } from "$lib/types";
import { getCertificate } from "$lib/certificateService";
import type { Certificate } from "$lib/types";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({params, locals}) => {
  return {
    certificate: await getCertificate(params.certificateId, locals.user as User) as Certificate 
  };
};

export const actions = {
    POST: async ({ locals, request }) => {

        // todo validar usuário
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