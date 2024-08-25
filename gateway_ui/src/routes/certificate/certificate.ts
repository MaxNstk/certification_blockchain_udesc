type SimplifiedCertificate = {
    certificateNumber: string;
    certificateEmissionDate: string;
    certificateCourse: string;
    certificateStatus: string;
    ownerName: string;
    campusAcronym: string;
  };

  type Certificate = {
    certificateNumber: string;
    certificateEmissionDate: string;
    certificateCourse: string;
    certificateStatus: 'valid' | 'revoked';
    ownerName: string;
    ownerRG: string;
    ownerBirthDate: string;
    ownerBirthState: string;
    campusName: string;
    campusAcronym: string;
    campusDirector: string;
    universityPresidentName: string;
    universityCertificateCoordinator: string;
    hasCompletedAllSubjects: boolean;
    hasSentAllRequiredDocuments: boolean;
    wentToDegreeGranting: boolean;
    note: string;
  }