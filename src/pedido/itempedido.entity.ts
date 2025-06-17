import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
} from 'typeorm';
import { PedidoEntity } from './pedido.entity.js';
import { ProdutoEntity } from 'src/produto/produto.entity.js';

@Entity({ name: 'item_pedido' })
export class ItemPedidoEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'quantidade', nullable: false })
    quantidade: number;

    @Column({ name: 'preco_venda', nullable: false })
    precoVenda: number;

    @ManyToOne(() => PedidoEntity, (pedido) => pedido.itensPedido, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    pedido: PedidoEntity;

    @ManyToOne(() => ProdutoEntity, (produto) => produto.itensPedido, {
        cascade: ['update']
    })
    produto: ProdutoEntity;
}
