import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(Number(process.env.PORT), () => {
    console.log(`Server started listening on ${process.env.HOST}:${process.env.PORT}`);
  });
}
bootstrap();
