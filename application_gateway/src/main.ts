import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

async function main(): Promise<void> {

  dotenv.config();
  console.log(`MONGO_URI:${process.env.MONGO_URI}`);
  console.log(`PORT:${process.env.APP_PORT}`);
  bootstrap();

}
main().catch((error: unknown) => {
    console.error('******** FAILED to run the application:', error);
    process.exitCode = 1;
});
