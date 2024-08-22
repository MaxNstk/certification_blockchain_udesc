import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CertificatesModule } from './certificates/certificates.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [CertificatesModule],
})
export class AppModule {}
