import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsuarioRepository } from "./usuario.repository";

@Controller('/usuarios')
export class UsuarioController {

    constructor(private usuarioRepository: UsuarioRepository) {}
    
    @Post()
    async criaUsuario(@Body() body) {
        this.usuarioRepository.salvar(body)
        return body;
    }

    @Get()
    async listaUsuarios() {
        return this.usuarioRepository.listUsuarios();
    }
}