import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

//aplicação sendo rodada
async function bootstrap() {
  const app = await NestFactory.create(AppModule); //chama o modulo para rodar a aplicação

  //faz a chamada de pipes para validar os DTOs criados
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, //indica que o pipe transforme o JSON recebido para o objeto da classe
      whitelist: true, //indica que as chaves do JSON devem ser iguais ao do objeto no qual o JSON será transformado
      forbidNonWhitelisted: true, //indica que qualquer chave que vier que não tiver igual ao objetivo final deverá causar um erro 

    })

  )
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
