export interface SimplifiedCertificate {
    certificateNumber: string;
    certificateEmissionDate: Date;
    certificateCourse: string;
    certificateStatus: string;
    ownerName: string;
    campusAcronym: string;
  };

export interface Certificate {
    certificateNumber: string;
    certificateEmissionDate: string;
    certificateCourse: string;
    certificateStatus: string;
    ownerName: string;
    ownerRG: string;
    ownerBirthDate: string;
    ownerBirthState: string;
    campusName: string;
    campusAcronym: string;
    campusDirector: string;
    universityPresidentName: string;
    universityCertificateCoordinator: string;
    hasCompletedAllSubjects?: boolean;
    hasSentAllRequiredDocuments?: boolean;
    wentToDegreeGranting?: boolean;
    note?: string;
}

export type User = {
  username:string
}