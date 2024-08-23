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

    @Get(':certificateNumber')
    async getCertificate(@Param('certificateNumber') certificateNumber: string) {
      return this.certificateService.getCertificateByNumber(certificateNumber);
    }

    @Post()
    async createCertificate(@Body() certificateDTO: CertificateDTO): Promise<void> {
      await this.certificateService.createCertificate(certificateDTO);
    }

    @Put(':certificateNumber')
    async updateCertificate(
      @Param('certificateNumber') certificateNumber: string,
      @Body() certificateDTO: CertificateDTO): Promise<void> {
        await this.certificateService.updateCertificate(certificateDTO,certificateNumber);
    }
  
}
