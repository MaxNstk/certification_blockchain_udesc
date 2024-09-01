import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(process.env.APP_PORT);
}

async function main(): Promise<void> {
  
  console.log(`MONGO_URI:${process.env.MONGO_URI}`);
  console.log(`PORT:${process.env.APP_PORT}`);
  
  await bootstrap();

}
main().catch((error: unknown) => {
    console.error('******** FAILED to run the application:', error);
    process.exitCode = 1;
});
