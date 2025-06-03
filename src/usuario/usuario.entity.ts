import { Entity, Column, CreateDateColumn, DeleteDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'usuarios' })
export class UsuarioEntity {

    @PrimaryGeneratedColumn('uuid')
    id_usuario: string;

    @Column({ name: 'nome', length: 100, nullable: false })
    nome: string;

    @Column({ name: 'email', length: 70, nullable: false })
    email: string;

    @Column({ name: 'senha', length: 255, nullable: false })
    senha: string;

    @CreateDateColumn({ name: 'created_at' }) //Anotação para gerar registro de hora na monipulação dos dados dentro da tabela, seguindo o padrão do nome da anotação
    createAt: string;

    @UpdateDateColumn({ name: 'update_at' }) //Anotação para gerar registro de hora na monipulação dos dados dentro da tabela, seguindo o padrão do nome da anotação
    updateAt: string;

    @DeleteDateColumn({ name: 'delete_at' }) //Anotação para gerar registro de hora na monipulação dos dados dentro da tabela, seguindo o padrão do nome da anotação
    deletedAt: string;
}