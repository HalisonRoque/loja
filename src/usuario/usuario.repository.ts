import { Injectable } from "@nestjs/common";
import { UsuarioEntity } from "./usuario.entity";

@Injectable()
export class UsuarioRepository {
    private usuarios: UsuarioEntity[] = [];

    async salvar(usuario: UsuarioEntity) {
        this.usuarios.push(usuario);
    }

    async listUsuarios() {
        return this.usuarios;
    }

    async existeComEmail(email: string) {
        const existUsuario = this.usuarios.find(
            usuario => usuario.email === email
        );

        return existUsuario !== undefined;
    }

    async atualiza(
        id: string,
        body: Partial<UsuarioEntity>
    ) {
        const usuario = this.buscaPorId(id)

        Object.entries(body).forEach(([key, value]) => {
            if (key === 'id_usuario') {
                return;
            };

            usuario[key] = value;
        });

        return usuario;
    }

    async deleteUsuario(
        id: string
    ) {
        const usuario = this.buscaPorId(id)

        this.usuarios = this.usuarios.filter(
            usuarioSalvo => usuarioSalvo.id_usuario !== id
        );

        return usuario;
    }

    //função privada para buscar um id salvo
    private buscaPorId(id: string) {
        const possivelUsuario = this.usuarios.find(
            usuarioSalvo => usuarioSalvo.id_usuario === id
        );

        if (!possivelUsuario) {
            throw new Error('Usuário não existe');
        }

        return possivelUsuario;
    }
}