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
        private readonly usuarioRepository: Repository<UsuarioEntity> //no contrutor injetamos os repositorio apontando para a entidade, o readonly habilita apenas leitura
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
}