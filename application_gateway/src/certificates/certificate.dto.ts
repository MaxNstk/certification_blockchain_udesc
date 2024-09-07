import { IsString, IsInt, IsEnum, IsBoolean, IsDateString } from 'class-validator';

export class CertificateDTO {
  @IsString()
  certificateNumber: string;

  @IsDateString()
  certificateEmissionDate: string;

  @IsInt()
  certificateCourseId: number;

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

}
