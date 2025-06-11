import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProdutoEntity } from "./produto.entity";
import { Repository } from "typeorm";
import { ListaProdutoDTO } from "./dto/ListaProduto.dto";
import { AtualizaProdutoDTO } from "./dto/AtualizaProduto.dto";
import { CriaProdutoDTO } from "./dto/CriaProduto.dto";

@Injectable()
export class ProdutoService {
    constructor(
        @InjectRepository(ProdutoEntity)
        private readonly produtoRepository: Repository<ProdutoEntity>
    ) { }

    async createProduto(
        dadosProduto: CriaProdutoDTO
    ) {
        const produto = new ProdutoEntity();

        produto.nome = dadosProduto.nome;
        produto.valor = dadosProduto.valor;
        produto.quantidadeDisponivel = dadosProduto.quantidadeDisponivel;
        produto.descricao = dadosProduto.descricao;
        produto.categoria = dadosProduto.categoria;
        produto.caracteristicas = dadosProduto.caracteristicas;
        produto.imagens = dadosProduto.imagens;
        
        return this.produtoRepository.save(produto);
    }

    async listProduto() {
        const produtosSalvos = await this.produtoRepository.find();
        return produtosSalvos;
    }

    async updateProduto(
        id: string,
        produtoEntity: AtualizaProdutoDTO
    ) {
        await this.produtoRepository.update(id, produtoEntity);
    }

    async deleteProduto(id: string) {
        await this.produtoRepository.delete(id);
    }


}