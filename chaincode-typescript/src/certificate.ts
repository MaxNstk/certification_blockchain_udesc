

import { Object, Property } from 'fabric-contract-api';

@Object()
export class Certificate {
    @Property()
    public certificateNumber: string = ''; // Unique identifier for the certificate

    @Property()
    public certificateEmissionDate: string = new Date().toISOString(); // Date of certificate issuance (ISO 8601 string)

    @Property()
    public certificateCourse: string = ''; // Course in which the owner graduated

    @Property()
    public certificateStatus: 'valid' | 'revoked' = 'valid'; // Status of the certificate (either 'valid' or 'revoked')

    @Property()
    public ownerName: string = ''; // Full name of the certificate owner

    @Property()
    public ownerRG: string = ''; // RG (Registro Geral) of the certificate owner

    @Property()
    public ownerBirthDate: string = new Date().toISOString(); // Birthdate of the certificate owner (ISO 8601 string)

    @Property()
    public ownerBirthState: string = ''; // State where the certificate owner was born

    @Property()
    public campusName: string = ''; // Name of the campus where the certificate owner graduated

    @Property()
    public campusAcronym: string = ''; // Acronym of the campus where the certificate owner graduated

    @Property()
    public campusDirector: string = ''; // Full name of the campus director

    @Property()
    public universityPresidentName: string = ''; // Full name of the university president at the time of certificate issuance

    @Property()
    public universityCertificateCoordinator: string = ''; // Full name of the university's certificate coordinator at the time of issuance

    @Property()
    public hasCompletedAllSubjects: boolean = true; // Verificação se o estudante completou todas as matérias necessárias

    @Property()
    public hasSentAllRequiredDocuments: boolean = true; // Verificação se o estudante enviou toda a documentação necessária

    @Property()
    public wentToDegreeGranting: boolean = true; // Verificação se o estudante participou da solenidade de outorga de grau

    @Property()
    public note: string = ''; // Campo textual para observações adicionais
}
