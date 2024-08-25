import { createCertificate } from "$lib/certificateService.js";
import type { Certificate } from "$lib/types";

function fromFormData(data: FormData): Certificate | null {
    const requiredFields = [
        'certificateNumber',
        'certificateEmissionDate',
        'certificateCourse',
        'certificateStatus',
        'ownerName',
        'ownerRG',
        'ownerBirthDate',
        'ownerBirthState',
        'campusName',
        'campusAcronym',
        'campusDirector',
        'universityPresidentName',
        'universityCertificateCoordinator',
    ];

    for (const field of requiredFields) {
        if (!data.get(field)) {
            console.error(`Missing field: ${field}`);
            return null; // Return null if any field is missing
        }
    }

    return {
        certificateNumber: data.get('certificateNumber') as string,
        certificateEmissionDate: data.get('certificateEmissionDate') as string,
        certificateCourse: data.get('certificateCourse') as string,
        certificateStatus: data.get('certificateStatus') as string,
        ownerName: data.get('ownerName') as string,
        ownerRG: data.get('ownerRG') as string,
        ownerBirthDate: data.get('ownerBirthDate') as string,
        ownerBirthState: data.get('ownerBirthState') as string,
        campusName: data.get('campusName') as string,
        campusAcronym: data.get('campusAcronym') as string,
        campusDirector: data.get('campusDirector') as string,
        universityPresidentName: data.get('universityPresidentName') as string,
        universityCertificateCoordinator: data.get('universityCertificateCoordinator') as string,
        hasCompletedAllSubjects: data.get('hasCompletedAllSubjects') === 'on',
        hasSentAllRequiredDocuments: data.get('hasSentAllRequiredDocuments') === 'on', 
        wentToDegreeGranting: data.get('wentToDegreeGranting') === 'on', 
        note: data.get('note') as string
    };
}

export const actions = {
    create: async ({ cookies, request }) => {
        const data = await request.formData();
        
        const certificate = fromFormData(data);

        if (!certificate) {
            return { error: 'All required fields must be provided.' };
        }

        try{
            await createCertificate(certificate);
        }catch(e){
            return { error: 'Erro ao criar diploma: '+e};
        }

    }
}