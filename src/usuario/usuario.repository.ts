import { Injectable } from "@nestjs/common";
import { UsuarioEntity } from "./usuario.entity";

@Injectable()
export class UsuarioRepository {
    private usuarios: UsuarioEntity[] = [];

    async salvar(usuario: UsuarioEntity) {
        this.usuarios.push(usuario);
    }

    async listUsuarios(){
        return this.usuarios;
    }

    async existeComEmail(email: string) {
        const existUsuario = this.usuarios.find(
            usuario => usuario.email === email
        );

        return existUsuario !== undefined;
    }
}