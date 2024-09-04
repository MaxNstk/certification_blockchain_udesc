import { Body,Request, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CertificatesService } from './certificates.service';
import { CertificateDTO } from './certificate.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('certificates')
export class CertificatesController {
    constructor(private readonly certificateService: CertificatesService) {}

    @UseGuards(AuthGuard)
    @Get()
    async getAllCertificates(@Request() req ): Promise<JSON>  {
      return await this.certificateService.getAllCertificates(req.user, );
    }

    @UseGuards(AuthGuard)
    @Get(':certificateNumber')
    async getCertificate(@Request() req, @Param('certificateNumber') certificateNumber: string): Promise<JSON>  {
      return await this.certificateService.getCertificateByNumber(req.user, certificateNumber);
    }

    @UseGuards(AuthGuard)
    @Post()
    async createCertificate(@Request() req, @Body() certificateDTO: CertificateDTO): Promise<JSON> {
      return await this.certificateService.createCertificate(req.user, certificateDTO);
    }

    @Put(':certificateNumber')
    async updateCertificate(
      @Request() req, 
      @Param('certificateNumber') certificateNumber: string,
      @Body() certificateDTO: CertificateDTO): Promise<JSON> {
        return await this.certificateService.updateCertificate(req.user, certificateDTO,certificateNumber);
    }
  
}
