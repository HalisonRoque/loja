import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    MinLength
} from "class-validator";
import { EmailEhUnico } from "../validacao/email-eh-unico.validator";

export class AtualizaUsuarioDTO {

    @IsNotEmpty({message: 'O nome não pode ser vazio.'})
    @IsOptional()
    nome?: string;

    @IsEmail(undefined, {message: 'O e-mail informado é invalido.'})
    @EmailEhUnico({message: 'já existe um usuário com este e-mail!'})
    @IsOptional()
    email?: string;

    @MinLength(6, {message: 'A senha precisa ao menos de 6 caracteres.'})
    @IsNotEmpty({message: 'A senha não pode ser vazio.'})
    @IsOptional()
    senha?: string;
}