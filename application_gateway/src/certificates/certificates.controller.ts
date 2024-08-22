import { Controller, Get, Param } from '@nestjs/common';
import { CertificatesService } from './certificates.service';

@Controller('certificates')
export class CertificatesController {
    constructor(private readonly certificateService: CertificatesService) {}

    @Get()
    async getAllCertificates() {
      return this.certificateService.getAllCertificates();
    }
  
    @Get(':id')
    async getCertificate(@Param('id') id: string) {
      return this.certificateService.getCertificateByNumber(id);
    }
  
}
