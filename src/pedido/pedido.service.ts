import { Injectable } from '@nestjs/common';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoEntity } from './pedido.entity';
import { In, Repository } from 'typeorm';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { StatusPedido } from './enum/statuspedido.enum';
import { CriaPedidoDTO } from './dto/CriaPedido.dto';
import { ItemPedidoEntity } from './itempedido.entity';
import { ProdutoEntity } from 'src/produto/produto.entity';

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

  async cadastraPedido(
    usuarioId: string,
    dadosDoPedido: CriaPedidoDTO
  ) {
    //BUSCA USUARIO
    const usuario = await this.usuarioRepository
      .findOneBy({ id: usuarioId })

    //MAPEIA E RETORNA OS IDs DE PRODUTOS
    const produtosIds = dadosDoPedido.itensPedido.map(
      (itemPedido) => itemPedido.produtoId
    )

    //BUSCA OS PRODUTOS RELACIONADOS
    const produtosRelacionados = await this.produtoRepository.findBy({ id: In(produtosIds) })

    //INICIA O OBJETO PEDIDO ENTITY PARA FAZER AS MODIFICAÇÕES FUTURAS
    const pedidoEntity = new PedidoEntity();

    //FAZ AS DEVIDAS ADIÇÕES AO OBJETO PEDIDO PARA SER SALVO 
    pedidoEntity.status = StatusPedido.EM_PROCESSAMENTO;
    pedidoEntity.usuario = usuario;

    //MAPEIA OS ITENS PEDIDOS PARA SALVAR EM PRODUTOENTITY
    //AQUI FAZEMOS BUSCAS PARA BUSCAR A QUANTIDADE, PRODUTO, VALOR E RETORNA UM ARRAY COM UM OBJETO PARA ITEMPEDIDOENTITY
    const itensPedidoEntidades = dadosDoPedido.itensPedido.map((itemPedido) => {
      const produtoRelacionado = produtosRelacionados.find((produto) => produto.id === itemPedido.produtoId)
      const itemPedidoEntity = new ItemPedidoEntity();

      itemPedidoEntity.produto = produtoRelacionado;

      itemPedidoEntity.precoVenda = produtoRelacionado.valor;
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
}
