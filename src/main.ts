import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookie_parser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookie_parser());
  await app.listen(Number(process.env.PORT), () => {
    console.log(`Server started listening on ${process.env.HOST}:${process.env.PORT}`);
  });
}
bootstrap();
