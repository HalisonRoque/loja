import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProdutoEntity } from "./produto.entity";
import { Repository } from "typeorm";
import { ListaProdutoDTO } from "./dto/ListaProduto.dto";
import { AtualizaProdutoDTO } from "./dto/AtualizaProduto.dto";

@Injectable()
export class ProdutoService {
    constructor(
        @InjectRepository(ProdutoEntity)
        private readonly produtoRepository: Repository<ProdutoEntity>
    ) { }

    async createProduto(
        produtoEntity: ProdutoEntity
    ) {
        await this.produtoRepository.save(produtoEntity);
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