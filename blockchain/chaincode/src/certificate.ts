import { Object, Property } from 'fabric-contract-api';
@Object()
export class Certificate {
    @Property()
    public certificateNumber: string = ''; // Número identificador único do certificado.
    @Property()
    public certificateEmissionDate: string = new Date().toISOString(); // Data de emissão do certificado.
    @Property()
    public certificateCourse: string = ''; // Nome do curso relacionado ao certificado.
    @Property()
    public certificateStatus: 'valid' | 'revoked' = 'valid'; // Status do certificado: 'valid' (válido) ou 'revoked' (revogado).
    @Property()
    public ownerName: string = ''; // Nome completo do titular do certificado.
    @Property()
    public ownerRG: string = ''; // RG (Registro Geral) do titular do certificado.
    @Property()
    public ownerBirthDate: string = new Date().toISOString(); // Data de nascimento do titular do certificado.
    @Property()
    public ownerBirthState: string = ''; // Estado de nascimento do titular.
    @Property()
    public campusName: string = ''; // Nome completo do campus que emitiu o certificado.
    @Property()
    public campusAcronym: string = ''; // Sigla do campus que emitiu o certificado.
    @Property()
    public campusDirector: string = ''; // Nome do diretor do campus no momento da emissão do certificado.
    @Property()
    public universityPresidentName: string = ''; // Nome do presidente da universidade no momento da emissão do certificado.
    @Property()
    public universityCertificateCoordinator: string = ''; // Nome do coordenador responsável pela emissão do certificado.
    @Property()
    public hasCompletedAllSubjects: boolean = true; // Indica se o titular completou todas as disciplinas necessárias.
    @Property()
    public hasSentAllRequiredDocuments: boolean = true; // Indica se todos os documentos necessários foram enviados.
    @Property()
    public wentToDegreeGranting: boolean = true; // Indica se o titular compareceu à colação de grau.
    @Property()
    public note: string = ''; // Campo para anotações adicionais sobre o certificado.
    @Property()
    public creationUser: string = ''; // Usuário que criou o certificado no sistema.
    @Property()
    public creationDate: string = new Date().toISOString(); // Data de criação do certificado no sistema.
    @Property()
    public updateUser: string = ''; // Último usuário que atualizou o certificado.
    @Property()
    public updateDate: string = new Date().toISOString(); // Data da última atualização do certificado no sistema.
}

