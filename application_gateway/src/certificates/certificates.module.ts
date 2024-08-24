import { Module } from '@nestjs/common';
import { CertificatesController } from './certificates.controller';
import { CertificatesService } from './certificates.service';
import { UsersModule } from 'src/users/users.module';
import UsersService from 'src/users/users.service';

@Module({
  imports: [UsersModule],
  controllers: [CertificatesController],
  providers: [CertificatesService]
})
export class CertificatesModule {}
