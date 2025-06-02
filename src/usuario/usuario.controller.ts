import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsuarioRepository } from "./usuario.repository";
import { CriaUsuarioDTO } from "./dto/CriaUsuario.dto"; //DTO onde faz com o documneto recebido pela rota seja de acordo com o enviado, fazendo as validações para aceitar
import { UsuarioEntity } from "./usuario.entity";
import { v4 as uuid } from 'uuid';
import { ListaUsuarioDTO } from "./dto/ListaUsuario.dto";

@Controller('/usuarios')
export class UsuarioController {

    constructor(private usuarioRepository: UsuarioRepository) { }

    @Post()
    async criaUsuario(@Body() body: CriaUsuarioDTO) {
        const usuarioEntity = new UsuarioEntity();
        usuarioEntity.email = body.email;
        usuarioEntity.senha = body.senha;
        usuarioEntity.nome = body.nome;
        usuarioEntity.id_usuario = uuid();

        this.usuarioRepository.salvar(usuarioEntity);

        return {
            usuario: new ListaUsuarioDTO(
                usuarioEntity.id_usuario,
                usuarioEntity.nome
            ),
            message: 'Usuário criado com sucesso'
        }
    }

    @Get()
    async listaUsuarios() {
        const usuarioSalvos = await this.usuarioRepository.listUsuarios();
        const usuarioLista = usuarioSalvos.map(
            usuario => new ListaUsuarioDTO(
                usuario.id_usuario,
                usuario.nome
            )
        );

        return usuarioLista;
    }
}