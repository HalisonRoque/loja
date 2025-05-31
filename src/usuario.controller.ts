import { Controller, Post } from "@nestjs/common";

@Controller('/usuarios')
export class UsuarioController {
    
    @Post()
    async criaUsuario() {
        return {status: 'Usuário criado!'}
    }
}