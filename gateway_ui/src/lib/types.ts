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

export interface AbstractUser {
  username: string;
  fullName:string;
  jwt: string;
  isAdmin: boolean;
  isCoordinator: boolean;
}

export interface UserDTO extends AbstractUser{
  campusAcronym: string;
  password: string;
}

export interface User extends AbstractUser{
  userId: number;
  campus: Campus;

}

export interface Course{
  description: string;
  courseId: number;
}