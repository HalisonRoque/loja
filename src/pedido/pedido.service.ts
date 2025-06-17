import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoEntity } from './pedido.entity';
import { In, Repository } from 'typeorm';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { StatusPedido } from './enum/statuspedido.enum';
import { CriaPedidoDTO } from './dto/CriaPedido.dto';
import { ItemPedidoEntity } from './itempedido.entity';
import { ProdutoEntity } from 'src/produto/produto.entity';
import { AtualizaPedidoDTO } from './dto/AtualizaPedido.dto';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(PedidoEntity)
    private readonly pedidoRepository: Repository<PedidoEntity>,
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
  ) { }

  private async buscaUsuarioId(id) {
    const usuario = await this.usuarioRepository
      .findOneBy({ id: id })

    if (usuario === null) {
      throw new NotFoundException('O usuário não foi encontrado!');
    }

    return usuario;
  }

  private async trataDadosPedido(
    dadosDoPedido: CriaPedidoDTO,
    produtosRelacionados: ProdutoEntity[],
  ) {
    dadosDoPedido.itensPedido.forEach((itemPedido) => {
      const produtoRelacionado = produtosRelacionados.find(
        (produto) => produto.id === itemPedido.produtoId);

      if (produtoRelacionado === undefined) {
        throw new NotFoundException(`O produto com id ${itemPedido} não foi encontrado!`)
      }

      if (itemPedido.quantidade > produtoRelacionado.quantidadeDisponivel) {
        throw new BadRequestException(`A quantidade solicitada (${itemPedido.quantidade}) é maior 
          do que a disponível (${produtoRelacionado.quantidadeDisponivel}) para o produto ${produtoRelacionado.nome}.`);
      }
    })
    
  }

  async cadastraPedido(
    usuarioId: string,
    dadosDoPedido: CriaPedidoDTO
  ) {
    //BUSCA USUARIO
    const usuario = await this.buscaUsuarioId(usuarioId)

    //MAPEIA E RETORNA OS IDs DE PRODUTOS
    const produtosIds = dadosDoPedido.itensPedido.map(
      (itemPedido) => itemPedido.produtoId
    )

    //BUSCA OS PRODUTOS RELACIONADOS
    const produtosRelacionados = await this.produtoRepository.findBy(
      { id: In(produtosIds) })
    
    const pedidoEntity = new PedidoEntity();

    //INICIA O OBJETO PEDIDO ENTITY PARA FAZER AS MODIFICAÇÕES FUTURAS
    await this.trataDadosPedido(dadosDoPedido, produtosRelacionados);

    //MAPEIA OS ITENS PEDIDOS PARA SALVAR EM PRODUTOENTITY
    //AQUI FAZEMOS BUSCAS PARA BUSCAR A QUANTIDADE, PRODUTO, VALOR E RETORNA UM ARRAY COM UM OBJETO PARA ITEMPEDIDOENTITY
    const itensPedidoEntidades = dadosDoPedido.itensPedido.map((itemPedido) => {
      const produtoRelacionado = produtosRelacionados.find(
        (produto) => produto.id === itemPedido.produtoId)

      const itemPedidoEntity = new ItemPedidoEntity();

      itemPedidoEntity.produto = produtoRelacionado!;

      itemPedidoEntity.precoVenda = produtoRelacionado!.valor;
      itemPedidoEntity.quantidade = itemPedido.quantidade

      itemPedidoEntity.produto.quantidadeDisponivel -= itemPedido.quantidade; //FAZ A SUBTRÇÃO DE ESTOQUE NO PRODUTO

      return itemPedidoEntity;
    });

    //ATRIBUI O VALOR TOTAL DA COMPRA
    const valorTotal = itensPedidoEntidades.reduce((total, item) => {
      return total + item.precoVenda * item.quantidade
    }, 0); //o zero é acumulador

    //SALVA OS ITENSPEDIDO E VALOR TOTAL NO OBJETO PEDIDOENTITY
    pedidoEntity.itensPedido = itensPedidoEntidades;
    pedidoEntity.valorTotal = valorTotal;

    //POR FIM, SALVA O PEDIDOENTITY COM TODAS AS ATUALIZAÇÕES PARA PERSISTIR NO BANCO DE DADOS
    const pedidoCriado = await this.pedidoRepository.save(pedidoEntity);
    return pedidoCriado;
  }

  async obtemPedidosDeUsuario(usuarioId: string) {
    return this.pedidoRepository
      .find({
        where: {
          usuario: { id: usuarioId },
        },
        relations: {
          usuario: true,
        },
      });
  }

  async atualizaPedido(
    id: string,
    dto: AtualizaPedidoDTO
  ) {
    const pedido = await this.pedidoRepository.findOneBy({ id });

    if (pedido === null) {
      throw new NotFoundException('O produto não foi encontrado!');
    }

    Object.assign(pedido, dto)

    return this.pedidoRepository.save(pedido)
  }
}
