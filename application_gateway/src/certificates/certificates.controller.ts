import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CertificatesService } from './certificates.service';
import { CertificateDTO } from './certificate.dto';

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

    @Post()
    async createCertificate(@Body() certificateDTO: CertificateDTO): Promise<void> {
      await this.certificateService.createCertificate(certificateDTO);
    }

    @Put()
    async updateCertificate(@Body() certificateDTO: CertificateDTO): Promise<void> {
      await this.certificateService.updateCertificate(certificateDTO);
    }
  
}
