import { Module } from '@nestjs/common';
import { CertificatesController } from './certificates.controller';
import { CertificatesService } from './certificates.service';
import { UsersModule } from 'src/users/users.module';
import { CoursesModule } from 'src/course/course.module';

@Module({
  imports: [UsersModule, CoursesModule],
  controllers: [CertificatesController],
  providers: [CertificatesService]
})
export class CertificatesModule {}
