import { createCertificate } from "$lib/certificateService";
import { certificateFromFormData } from "$lib/certificateUtils";
import type { User } from "$lib/types";

export const actions = {
    POST: async ({ locals, request }) => {

        // todo validar usuário
        const data = await request.formData();

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