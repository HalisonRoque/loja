import { Injectable } from "@nestjs/common";

@Injectable()
export class UsuarioRepository {
    private usuarios: any[] = [];

    async salvar(usuario) {
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