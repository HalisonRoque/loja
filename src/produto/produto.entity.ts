import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from "typeorm";

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

  @CreateDateColumn({ name: 'created_at' }) //Anotação para gerar registro de hora na monipulação dos dados dentro da tabela, seguindo o padrão do nome da anotação
  createAt: string;

  @UpdateDateColumn({ name: 'update_at' }) //Anotação para gerar registro de hora na monipulação dos dados dentro da tabela, seguindo o padrão do nome da anotação
  updateAt: string;

  @DeleteDateColumn({ name: 'delete_at' }) //Anotação para gerar registro de hora na monipulação dos dados dentro da tabela, seguindo o padrão do nome da anotação
  deletedAt: string;

  /*
  caracteristicas: CaracteristicaProduto[];
  imagens: ImagemProduto[];*/
}
