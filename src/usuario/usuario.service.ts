import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CriaUsuarioDTO } from "./dto/CriaUsuario.dto";
import { ListaUsuarioDTO } from "./dto/ListaUsuario.dto";
import { AtualizaUsuarioDTO } from "./dto/UpdateUsuario.dto";
import { UsuarioEntity } from "./usuario.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity> //no construtor injetamos os repositorio apontando para a entidade, o readonly habilita apenas leitura
    ) { }

    //LISTAR USUÁRIOS
    async listaUsuarios() {
        const usuariosSalvos = await this.usuarioRepository.find();
        const usuarioLista = usuariosSalvos.map(
            (usuario) => new ListaUsuarioDTO(
                usuario.id_usuario,
                usuario.nome
            )
        );
        return usuarioLista;
    }

    //create
    async createUsuario(
        body: CriaUsuarioDTO
    ) {
        const usuarioEntity = new UsuarioEntity();

        usuarioEntity.email = body.email;
        usuarioEntity.senha = body.senha;
        usuarioEntity.nome = body.nome;

        await this.usuarioRepository.save(usuarioEntity);
    }

    //update
    async updateUsuario(id: string, usuarioEntity: AtualizaUsuarioDTO) {
        await this.usuarioRepository.update(id, usuarioEntity);
    }

    //delete
    async deleteUsuario(id: string) {
        await this.usuarioRepository.delete(id);
    }
}