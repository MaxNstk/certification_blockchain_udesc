import type { Certificate } from "./types";

export function certificateFromFormData(data: FormData): Certificate | null {
    const requiredFields = [
        'certificateNumber',
        'certificateEmissionDate',
        'certificateCourseId',
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
            return null; 
        }
    }

    return {
        certificateNumber: data.get('certificateNumber') as string,
        certificateEmissionDate: data.get('certificateEmissionDate') as string,
        certificateCourseId: data.get('certificateCourseId') as unknown as number,
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
    } as Certificate;
}