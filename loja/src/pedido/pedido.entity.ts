import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { StatusPedido } from './enum/statuspedido.enum';
import { UsuarioEntity } from '../usuario/usuario.entity';

@Entity({ name: 'pedidos' })
export class PedidoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'valor_total', nullable: false })
  valorTotal: number;

  @Column({ name: 'status', enum: StatusPedido, nullable: false })
  status: StatusPedido;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.pedidos)
  usuario: UsuarioEntity
}
