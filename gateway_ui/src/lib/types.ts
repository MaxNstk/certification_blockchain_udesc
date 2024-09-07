export interface SimplifiedCertificate {
    certificateNumber: string;
    certificateEmissionDate: Date;
    certificateCourseId: number;
    certificateStatus: string;
    ownerName: string;
    campusAcronym: string;
  };

export interface Certificate {
    certificateNumber: string;
    certificateEmissionDate: string;
    certificateCourseId: number;
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

export interface Campus{
  acronym: string;
  description: string;
}

export interface User {
  userId: number;
  username: string;
  fullName:string;
  jwt: string;
  campus: Campus;
}

export interface Course{
  name: string;
  courseId: number;
}