import { IsString, IsEnum, IsBoolean, IsDateString } from 'class-validator';

export class CertificateDTO {
  @IsString()
  certificateNumber: string;

  @IsDateString()
  certificateEmissionDate: string;

  @IsString()
  certificateCourse: string;

  @IsEnum(['valid', 'revoked'])
  certificateStatus: 'valid' | 'revoked';

  @IsString()
  ownerName: string;

  @IsString()
  ownerRG: string;

  @IsDateString()
  ownerBirthDate: string;

  @IsString()
  ownerBirthState: string;

  @IsString()
  campusName: string;

  @IsString()
  campusAcronym: string;

  @IsString()
  campusDirector: string;

  @IsString()
  universityPresidentName: string;

  @IsString()
  universityCertificateCoordinator: string;

  @IsBoolean()
  hasCompletedAllSubjects: boolean;

  @IsBoolean()
  hasSentAllRequiredDocuments: boolean;

  @IsBoolean()
  wentToDegreeGranting: boolean;

  @IsString()
  note: string;

  constructor(data: any) {
    this.certificateNumber = data.certificateNumber;
    this.certificateEmissionDate = data.certificateEmissionDate;
    this.certificateCourse = data.certificateCourse;
    this.certificateStatus = data.certificateStatus;
    this.ownerName = data.ownerName;
    this.ownerRG = data.ownerRG;
    this.ownerBirthDate = data.ownerBirthDate;
    this.ownerBirthState = data.ownerBirthState;
    this.campusName = data.campusName;
    this.campusAcronym = data.campusAcronym;
    this.campusDirector = data.campusDirector;
    this.universityPresidentName = data.universityPresidentName;
    this.universityCertificateCoordinator = data.universityCertificateCoordinator;
    this.hasCompletedAllSubjects = data.hasCompletedAllSubjects;
    this.hasSentAllRequiredDocuments = data.hasSentAllRequiredDocuments;
    this.wentToDegreeGranting = data.wentToDegreeGranting;
    this.note = data.note;
  }

  public toTransactionFormat(): string[] {
    return [
      this.certificateNumber,
      new Date(this.certificateEmissionDate).toISOString(),
      this.certificateCourse,
      this.certificateStatus,
      this.ownerName,
      this.ownerRG,
      new Date(this.ownerBirthDate).toISOString(),
      this.ownerBirthState,
      this.campusName,
      this.campusAcronym,
      this.campusDirector,
      this.universityPresidentName,
      this.universityCertificateCoordinator,
      this.hasCompletedAllSubjects.toString(),
      this.hasSentAllRequiredDocuments.toString(),
      this.wentToDegreeGranting.toString(),
      this.note,
    ];
  }
}
