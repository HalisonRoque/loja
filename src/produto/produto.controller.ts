import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { randomUUID } from 'crypto';

import { AtualizaProdutoDTO } from './dto/AtualizaProduto.dto';
import { CriaProdutoDTO } from './dto/CriaProduto.dto';
import { ProdutoEntity } from './produto.entity';
import { ProdutoRepository } from './produto.repository';
import { ProdutoService } from './produto.service';

@Controller('produtos')
export class ProdutoController {
  constructor(
    private readonly produtoRepository: ProdutoRepository,
    private readonly produtoService: ProdutoService
  ) { }

  @Post()
  async criaNovo(@Body() dadosProduto: CriaProdutoDTO) {
    const produto = new ProdutoEntity();

    produto.id = randomUUID();
    produto.nome = dadosProduto.nome;
    produto.usuarioId = dadosProduto.usuarioId;
    produto.valor = dadosProduto.valor;
    produto.quantidade = dadosProduto.quantidade;
    produto.descricao = dadosProduto.descricao;
    produto.categoria = dadosProduto.categoria;
    //produto.caracteristicas = dadosProduto.caracteristicas;
    //produto.imagens = dadosProduto.imagens;

    const produtoCadastrado = this.produtoService.createProduto(produto);
    return produtoCadastrado;
  }

  @Get()
  async listaTodos() {
    return this.produtoService.listProduto();
  }

  @Put('/:id')
  async atualiza(
    @Param('id') id: string,
    @Body() dadosProduto: AtualizaProdutoDTO,
  ) {
    return await this.produtoService.updateProduto(
      id,
      dadosProduto,
    );
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return await this.produtoService.deleteProduto(id);
  }
}
