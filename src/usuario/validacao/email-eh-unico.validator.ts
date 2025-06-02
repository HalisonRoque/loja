import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UsuarioRepository } from "../usuario.repository";
import { Injectable } from "@nestjs/common";

@Injectable() //decorate que transforma a classe em um provide
@ValidatorConstraint({ async: true}) //decorate que transforma de a validaçãoo como assincrona
export class EmailEhUnicoValidator implements ValidatorConstraintInterface {

    constructor(private usuarioRepository: UsuarioRepository) {}

    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const existUsuario = await this.usuarioRepository.existeComEmail(value);
        return !existUsuario;
    }

}

//criando um decorator para usar dentro de DTO e ver se o usuário é unico oou não atravez do email unico
export const EmailEhUnico = (opcoesDeValidacao: ValidationOptions) => {
    return (objeto: Object, propriedade: string) => {
        registerDecorator({
            target: objeto.constructor,
            propertyName: propriedade,
            options: opcoesDeValidacao,
            constraints: [],
            validator: EmailEhUnicoValidator
        })
    }
}
