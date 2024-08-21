

import { Object, Property } from 'fabric-contract-api';

@Object()
export class Certificate {
    @Property()
    public certificateNumber: string = ''; 

    @Property()
    public certificateEmissionDate: string = new Date().toISOString();

    @Property()
    public certificateCourse: string = ''; 

    @Property()
    public certificateStatus: 'valid' | 'revoked' = 'valid'; 

    @Property()
    public ownerName: string = '';

    @Property()
    public ownerRG: string = ''; 

    @Property()
    public ownerBirthDate: string = new Date().toISOString(); 

    @Property()
    public ownerBirthState: string = ''; 

    @Property()
    public campusName: string = ''; 

    @Property()
    public campusAcronym: string = ''; 

    @Property()
    public campusDirector: string = ''; 

    @Property()
    public universityPresidentName: string = ''; 

    @Property()
    public universityCertificateCoordinator: string = ''; 

    @Property()
    public hasCompletedAllSubjects: boolean = true;

    @Property()
    public hasSentAllRequiredDocuments: boolean = true; 

    @Property()
    public wentToDegreeGranting: boolean = true;

    @Property()
    public note: string = ''; 

    @Property()
    public creationUser: string = ''; 

    @Property()
    public creationDate: string = new Date().toISOString(); 

    @Property()
    public updateUser: string = '';

    @Property()
    public updateDate: string = new Date().toISOString(); 
}
