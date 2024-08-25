import { updateCertificate } from "$lib/certificateService";
import { certificateFromFormData } from "$lib/certificateUtils";

export const actions = {
    POST: async ({ cookies, request }) => {

        // todo validar usuário
        const data = await request.formData();

        const certificate = certificateFromFormData(data);

        if (!certificate) {
            return { error: 'All required fields must be provided.' };
        }

        try{
            return await updateCertificate(certificate);
        }catch(e){
            return { error: 'Erro ao criar diploma: '+e};
        }
    }
}