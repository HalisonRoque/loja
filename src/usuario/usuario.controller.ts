import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UsuarioRepository } from "./usuario.repository";
import { CriaUsuarioDTO } from "./dto/CriaUsuario.dto"; //DTO onde faz com o documneto recebido pela rota seja de acordo com o enviado, fazendo as validações para aceitar
import { UsuarioEntity } from "./usuario.entity";
import { v4 as uuid } from 'uuid';
import { ListaUsuarioDTO } from "./dto/ListaUsuario.dto";
import { AtualizaUsuarioDTO } from "./dto/UpdateUsuario.dto";
import { UsuarioService } from "./usuario.service";

@Controller('/usuarios')
export class UsuarioController {

    constructor(
        private usuarioRepository: UsuarioRepository,
        private usuarioService: UsuarioService
    ) { }

    @Post()
    async criaUsuario(@Body() body: CriaUsuarioDTO) {
        return await this.usuarioService.createUsuario(body);
    }

    @Get()
    async listaUsuarios() {
        const usuarioLista = await this.usuarioService.listaUsuarios();
        return usuarioLista;
    }

    @Put('/:id')
    async atualizaUsuario(
        @Param('id') id: string,
        @Body() body: AtualizaUsuarioDTO) {
        const usuarioAtualizado = await this.usuarioService.updateUsuario(id, body)

        return {
            usuario: usuarioAtualizado,
            message: 'Usuário atualizado com sucesso!'
        }
    }

    @Delete('/:id')
    async deleteUsuario(
        @Param('id') id: string
    ) {
        const deleteUsuario = await this.usuarioService.deleteUsuario(id);

        return {
            usuario: deleteUsuario,
            message: 'Usuário removido com sucesso!'
        }
    }
}