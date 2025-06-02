import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MinLength
} from "class-validator";

export class CriaUsuarioDTO {

    @IsNotEmpty({message: 'O nome não pode ser vazio.'})
    nome: string;

    @IsEmail(undefined, {message: 'O e-mail informado é invalido.'})
    email: string;

    @MinLength(6, {message: 'A senha precisa ao menos de 6 caracteres.'})
    @IsNotEmpty({message: 'A senha não pode ser vazio.'})
    senha: string;
}