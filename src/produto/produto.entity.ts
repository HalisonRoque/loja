import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany
} from "typeorm";
import { ProdutoCaracteristicaEntity } from "./produto-caracteristica.entity";
import { ProdutoImagemEntity } from "./produto-imagem.entity";

/*class CaracteristicaProduto {
  nome: string;
  descricao: string;
}

class ImagemProduto {
  url: string;
  descricao: string;
}*/

@Entity({ name: 'produtos' })
export class ProdutoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'usuario_id', length: 100, nullable: false })
  usuarioId: string;

  @Column({ name: 'nome', length: 100, nullable: false })
  nome: string;

  @Column({ name: 'valor', nullable: false })
  valor: number;

  @Column({ name: 'quantidade', nullable: false })
  quantidade: number;

  @Column({ name: 'descricao', length: 255, nullable: false })
  descricao: string;

  @Column({ name: 'categoria', length: 255, nullable: false })
  categoria: string;

  //OneToMany ou OneToOne são relacionamentos entre tabelas, nesse caso como many é para muitos, ou seja um produto pode ter várias caracteristicas
  //NA TABELA REFERENCIADA FAREMOS O INVERSO, NESSE CASO ESTAMOS PASSADO UM PODRUTO PODE TER MUITAS CARACTERISTICAS, MAS NA TABELA REFERENCIADO PASSAMOS O MUITOS PARA UM OIU MANYTOONE
  @OneToMany(() => ProdutoCaracteristicaEntity,
    (produtocaracteristicasEntity) => produtocaracteristicasEntity.produto)
  caracteristicas: ProdutoCaracteristicaEntity[]

  @OneToMany(() => ProdutoImagemEntity,
    (produtoImagemEntity) => produtoImagemEntity.produto)
  imagens: ProdutoImagemEntity[]

  @CreateDateColumn({ name: 'created_at' }) //Anotação para gerar registro de hora na monipulação dos dados dentro da tabela, seguindo o padrão do nome da anotação
  createAt: string;

  @UpdateDateColumn({ name: 'update_at' }) //Anotação para gerar registro de hora na monipulação dos dados dentro da tabela, seguindo o padrão do nome da anotação
  updateAt: string;

  @DeleteDateColumn({ name: 'delete_at' }) //Anotação para gerar registro de hora na monipulação dos dados dentro da tabela, seguindo o padrão do nome da anotação
  deletedAt: string;

}
