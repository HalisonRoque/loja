import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsuarioRepository } from "./usuario.repository";
import { CriaUsuarioDTO } from "./dto/CriaUsuario"; //DTO onde faz com o documneto recebido pela rota seja de acordo com o enviado, fazendo as validações para aceitar

@Controller('/usuarios')
export class UsuarioController {

    constructor(private usuarioRepository: UsuarioRepository) {}
    
    @Post()
    async criaUsuario(@Body() body: CriaUsuarioDTO) {
        this.usuarioRepository.salvar(body)
        return body;
    }

    @Get()
    async listaUsuarios() {
        return this.usuarioRepository.listUsuarios();
    }
}