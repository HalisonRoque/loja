import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

//aplicação sendo rodada
async function bootstrap() {
  const app = await NestFactory.create(AppModule); //chama o modulo para rodar a aplicação
  
  //faz a chamada de pipes para validar os DTOs criados
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,

    })
  )
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
