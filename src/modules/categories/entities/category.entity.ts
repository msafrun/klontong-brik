import { TABLES } from 'src/common/constants/tables';
import { Product } from 'src/modules/products/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity(TABLES.CATEGORIES)
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Column({ type: 'timestamp with time zone', nullable: true, default: null })
  updated_at: Date;

  @OneToMany(() => Product, (product) => product.id)
  products: Product[];
}
