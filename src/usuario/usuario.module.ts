
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsuarioController } from "./usuario.controller";
import { UsuarioRepository } from "./usuario.repository";
import { EmailEhUnicoValidator } from "./validacao/email-eh-unico.validator";
import { UsuarioService } from "./usuario.service";
import { UsuarioEntity } from "./usuario.entity";

@Module({
    imports: [TypeOrmModule.forFeature([UsuarioEntity])], //LUGAR ONDE IMPORTA A ENTITY PARA USAR NO MODULE
    controllers: [UsuarioController],
    providers: [
        UsuarioRepository,
        EmailEhUnicoValidator,
        UsuarioService
    ]
})
export class UsuarioModule { }